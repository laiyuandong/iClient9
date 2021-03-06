import SuperMap from '../SuperMap';
import Route from './Route';

/**
 * @class SuperMap.RouteCalculateMeasureParameters
 * @constructs SuperMap.RouteCalculateMeasureParameters
 * @classdesc
 * 基于路由对象计算指定点M值操作的参数类。通过该类提供参数信息。
 * @api
 */
export default  class RouteCalculateMeasureParameters {


    /**
     * APIProperty: sourceRoute
     * {SuperMap.Route} 【必选参数】路由对象。该对象可以是用户自己生
     *      成或在数据源中查询得到的符合标准的路由对象；
     */
    sourceRoute = null;

    /**
     * APIProperty: point
     * {Object} 【必选参数】二维地理坐标点对象，包含x,y坐标值属性的对象。
     */
    point = null;

    /**
     * APIProperty: tolerance
     * {Double} 【可选参数】容限值。
     */
    tolerance = null;

    /**
     * APIProperty: isIgnoreGap
     * {Boolean} 【可选参数】是否忽略子对象之间的距离。默认为false，即不忽略子
     *      对象之间的距离。
     */
    isIgnoreGap = false;

    /**
     * @method SuperMap.RouteCalculateMeasureParameters.initialize
     * @param options - {Object} 参数。
     *
     * Allowed options properties:</br>
     * sourceRoute - {Object} 【必选参数】路由对象。该对象可以是用户自己生成或在数据源中查询得到的符合标准的路由对象。</br>
     * point - {Object} 【必选参数】二维地理坐标点对象，包含x,y坐标值属性的对象。</br>
     * tolerance - {Double} 【可选参数】容限值。</br>
     * isIgnoreGap - {Double}  【可选参数】是否忽略子对象之间的距离。默认为false，即不忽略子对象之间的距离。</br>
     *
     */

    constructor(options) {
        if (!options) {
            return this;
        }
        SuperMap.Util.extend(this, options);
    }


    /*
     * APIMethod: destroy
     * 释放资源，将引用资源的属性置空。
     */
    destroy() {
        var me = this;
        me.sourceRoute = null;
        me.point = null;
        if (me.tolerance) {
            me.tolerance = null;
        }
        if (me.isIgnoreGap) {
            me.isIgnoreGap = false;
        }
    }
    CLASS_NAME = "SuperMap.RouteCalculateMeasureParameters"
}

SuperMap.RouteCalculateMeasureParameters = RouteCalculateMeasureParameters;