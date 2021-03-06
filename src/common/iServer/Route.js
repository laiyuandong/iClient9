﻿import SuperMap from '../SuperMap';
import PointWithMeasure from './PointWithMeasure';

const Collection = SuperMap.Geometry.Collection;

/**
 * @class SuperMap.Route
 * @constructs SuperMap.Route
 * @classdesc
 * 路由对象类。
 * 路由对象为一系列有序的带有属性值 M 的 x，y 坐标对，其中 M 值为该结点的距离属性（到已知点的距离）。
 * @extends {SuperMap.Geometry.Collection}
 * @api
 */
export default  class Route extends Collection {


    /**
     * APIProperty: id
     * {Number} 路由对象在数据库中的id。
     * 。
     */
    id = null;
    /**
     * Property: center
     */
    center = null;
    /**
     * Property: style
     */
    style = null;

    /**
     * APIProperty: length
     * {Number} 路由对象的长度。
     * 单位与数据集的单位相同。
     */
    length = null;

    /**
     * APIProperty: maxM
     * {Number} 最大线性度量值，即所有结点到起始点的量算距离中最大值。
     */
    maxM = null;

    /**
     * APIProperty: minM
     * {Number} 最小线性度量值，即所有结点到起始点的量算距离中最小值。
     */
    minM = null;

    /**
     * Property: parts
     * {Array(Number)} 服务端几何对象中各个子对象所包含的节点个数。
     */
    parts = null;
    /**
     * Property: points
     * {Array(Object)} 路由对象的所有路由点。
     * (start code)
     * [
     *  {
     *      "measure": 0,
     *      "y": -4377.027184298267,
     *      "x": 4020.0045221720466
     *  },
     *  {
     *      "measure": 37.33288381391519,
     *      "y": -4381.569363260499,
     *      "x": 4057.0600591960642
     *  }
     * ]
     * (end)
     */
    points = null;

    /**
     * APIProperty: type
     * {String} 服务端几何对象类型。
     */
    type = null;

    /**
     * APIProperty: components
     * {Array(<SuperMap.Geometry>)} 存储几何对象的数组。
     */
    components = null;
    /**
     * Property: componentTypes
     */
    componentTypes = ["SuperMap.Geometry.LinearRing", "SuperMap.Geometry.LineString"];

    /**
     * @method SuperMap.Route.initialize
     * @param points - {Array} 形成路由对象的线数组。
     * @param  options - {Object} 参数。
     * Allowed options properties:</br>
     * id - {Number} 路由对象在数据库中的id。</br>
     * length - {Number} 路由对象的长度。</br>
     * maxM - {Number} 最大线性度量值，即所有结点到起始点的量算距离中最大值。</br>
     * minM - {Number} 最小线性度量值，即所有结点到起始点的量算距离中最小值。</br>
     * type - {String} 数据类型，如："LINEM"</br>
     */
    constructor(points, options) {
        super(points, options);
        if (options) {
            SuperMap.Util.extend(this, options);
        }
    }

    /**
     *
     * @method SuperMap.Route.toJson
     * @description 转换为json对象。
     */
    toJson() {
        var result = "{";
        if (this.id != null && this.id != undefined) {
            result += "\"id\":" + this.id + ",";
        }
        if (this.center != null && this.center != undefined) {
            result += "\"center\":" + this.center + ",";
        }
        if (this.style != null && this.style != undefined) {
            result += "\"style\":" + this.style + ",";
        }
        if (this.length != null && this.length != undefined) {
            result += "\"length\":" + this.length + ",";
        }
        if (this.maxM != null && this.maxM != undefined) {
            result += "\"maxM\":" + this.maxM + ",";
        }
        if (this.minM != null && this.minM != undefined) {
            result += "\"minM\":" + this.minM + ",";
        }
        if (this.type != null && this.type != undefined) {
            result += "\"type\":\"" + this.type + "\",";
        }
        if (this.parts != null && this.parts != undefined) {
            result += "\"parts\":[" + this.parts[0];

            for (var i = 1; i < this.parts.length; i++) {
                result += "," + this.parts[i];
            }
            result += "],";
        }
        if (this.components != null && this.components.length > 0) {
            result += "\"points\":[";
            for (var j = 0, len = this.components.length; j < len; j++) {
                for (var k = 0, len2 = this.components[j].components.length; k < len2; k++) {
                    result += this.components[j].components[k].toJson() + ",";
                }
            }
            result = result.replace(/,$/g, '');
            result += "]";
        }
        result = result.replace(/,$/g, '');
        result += "}";
        return result;
    }


    /*
     * APIMethod: destroy
     * 释放资源，将引用资源的属性置空。
     */
    destroy() {
        var me = this;
        me.id = null;
        me.center = null;
        me.style = null;
        me.length = null;
        me.maxM = null;
        me.minM = null;
        me.type = null;
        me.parts = null;
        this.components.length = 0;
        this.components = null;
        this.componentTypes = null;
    }


    /**
     * @method SuperMap.Route.fromJson
     * @description  将 JSON 对象转换为 SuperMap.Route 对象。
     * @param jsonObject - {Object} JSON 对象表示的路由对象。
     * @return {SuperMap.Route} 转化后的 Route 对象。
     */
    static fromJson(jsonObject) {
        if (!jsonObject) {
            return;
        }

        var geoParts = jsonObject.parts || [],
            geoPoints = jsonObject.points || [],
            len = geoParts.length,
            lineList = [];
        if (len > 0) {
            for (var i = 0, pointIndex = 0, pointList = []; i < len; i++) {
                for (var j = 0; j < geoParts[i]; j++) {
                    pointList.push(PointWithMeasure.fromJson(geoPoints[pointIndex + j]));
                }
                pointIndex += geoParts[i];
                //判断线是否闭合，如果闭合，则返回LinearRing，否则返回LineString
                if (pointList[0].equals(pointList[geoParts[i] - 1])) {
                    lineList.push(new SuperMap.Geometry.LinearRing(pointList));
                } else {
                    lineList.push(new SuperMap.Geometry.LineString(pointList));
                }
                pointList = [];
            }

        } else {
            return null;
        }

        return new Route(lineList, {
            id: jsonObject.id,
            center: jsonObject.center,
            style: jsonObject.style,
            length: jsonObject.length,
            maxM: jsonObject.maxM,
            minM: jsonObject.minM,
            type: jsonObject.type,
            parts: jsonObject.parts
        });
    }

    CLASS_NAME = "SuperMap.Route"
}

SuperMap.Route = Route;