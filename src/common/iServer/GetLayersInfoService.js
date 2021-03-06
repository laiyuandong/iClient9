﻿import SuperMap from '../SuperMap';
import CommonServiceBase from './CommonServiceBase';
import ServerTheme from './ServerTheme';
import Grid from './Grid';
import Image from './Image';
import Vector from './Vector';

/**
 * @class SuperMap.GetLayersInfoService 获取图层信息服务类构造函数。
 * @augments SuperMap.CommonServiceBase
 * @constructs  SuperMap.GetLayersInfoService
 * Parameters:
 * @param url - {String} 与客户端交互的地图服务地址。请求地图服务,URL 应为：<br>
 *         http://{服务器地址}:{服务端口号}/iserver/services/{地图服务名}/rest/maps/{地图名}；<br>
 *         如 http://localhost:8090/iserver/services/map-world/rest/maps/World 。<br>
 *         如果查询临时图层的信息，请指定完成的url，包含临时图层ID信息，如：<br>
 *         http://localhost:8090/iserver/services/map-world/rest/maps/World/tempLayersSet/resourceID
 * @param options - {Object} 交互服务时所需可选参数。如：<br>
 *         eventListeners - {Object} 需要被注册的监听器对象。
 *         isTempLayers - {Boolean} 当前url对应的图层是否是临时图层。
 */
export default  class GetLayersInfoService extends CommonServiceBase {

    /*
     * @instance isTempLayers 当前url对应的图层是否是临时图层。{Boolean}
     */
    isTempLayers = false;

    /**
     * @function  initialize
     * @description GetLayersInfoService的构造函数
     * Parameters:
     * @param url - {String} 与客户端交互的地图服务地址。请求地图服务,URL 应为：<br>
     *         http://{服务器地址}:{服务端口号}/iserver/services/{地图服务名}/rest/maps/{地图名}；<br>
     *         如 http://localhost:8090/iserver/services/map-world/rest/maps/World 。<br>
     *         如果查询临时图层的信息，请指定完成的url，包含临时图层ID信息，如：<br>
     *         http://localhost:8090/iserver/services/map-world/rest/maps/World/tempLayersSet/resourceID
     * @param options - {Object} 互服务时所需可选参数。如：<br>
     *         eventListeners - {Object} 需要被注册的监听器对象。<br>
     *         isTempLayers - {Boolean} 当前url对应的图层是否是临时图层。
     */
    constructor(url, options) {
        super(url, options);
        if (options) {
            SuperMap.Util.extend(this, options);
        }
    }

    /**
     * @inheritDoc
     */
    destroy() {
        super.destroy();
        SuperMap.Util.reset(this);
    }

    /**
     * @function  processAsync
     * @description APIMethod: 负责将客户端的更新参数传递到服务端。
     */
    processAsync() {
        var me = this,
            method = "GET",
            end = me.url.substr(me.url.length - 1, 1);
        if (!me.isTempLayers) {
            me.url += (end === "/") ? '' : '/';
            me.url += me.isInTheSameDomain ? "layers.json?" : "layers.jsonp?";
        } else {
            me.url += me.isInTheSameDomain ? ".json?" : ".jsonp?";
        }
        me.request({
            method: method,
            params: null,
            scope: me,
            success: me.serviceProcessCompleted,
            failure: me.serviceProcessFailed
        });
    }

    /*
     * Method: getLayerComplted
     * 编辑完成，执行此方法。
     * result - {Object} 服务器返回的结果对象。
     */
    serviceProcessCompleted(result) {
        var me = this, existRes, layers, len;
        result = SuperMap.Util.transformResult(result);

        existRes = !!result && result.length > 0;
        layers = existRes ? result[0].subLayers.layers : null;
        len = layers ? layers.length : 0;
        me.handleLayers(len, layers);
        me.events.triggerEvent("processCompleted", {result: result[0]});
    }

    /*
     * TODO 专题图时候可能会用到
     * Method: handleLayers
     * 处理iserver 新增图层组数据 (subLayers.layers 中可能还会含有 subLayers.layers)
     *
     * len - {Number} subLayers.layers的长度
     * layers - {Array} subLayers.layers
     */
    handleLayers(len, layers) {
        var me = this, tempLayer;
        if (len) {
            for (var i = 0; i < len; i++) {
                if (layers[i].subLayers && layers[i].subLayers.layers && layers[i].subLayers.layers.length > 0) {
                    me.handleLayers(layers[i].subLayers.layers.length, layers[i].subLayers.layers);
                }
                else {
                    var type = layers[i].ugcLayerType;
                    switch (type) {
                        case 'THEME':
                            tempLayer = new ServerTheme();
                            tempLayer.fromJson(layers[i]);
                            layers[i] = tempLayer;
                            break;
                        case 'GRID':
                            tempLayer = new Grid();
                            tempLayer.fromJson(layers[i]);
                            layers[i] = tempLayer;
                            break;
                        case 'IMAGE':
                            tempLayer = new Image();
                            tempLayer.fromJson(layers[i]);
                            layers[i] = tempLayer;
                            break;
                        case 'VECTOR':
                            tempLayer = new Vector();
                            tempLayer.fromJson(layers[i]);
                            layers[i] = tempLayer;
                            break;
                        default:
                            break;
                    }
                }

            }
        }
    }

    CLASS_NAME = "SuperMap.GetLayersInfoService"
}

SuperMap.GetLayersInfoService = GetLayersInfoService;