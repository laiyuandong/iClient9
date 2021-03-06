﻿import SuperMap from '../SuperMap';
import UGCLayer from './UGCLayer';

/**
 * Class: SuperMap.UGCMapLayer
 * UGC 地图图层类。
 *
 * Inherits from:
 *  - <SuperMap.UGCLayer>
 */
export default  class UGCMapLayer extends UGCLayer {

    /**
     * APIProperty: completeLineSymbolDisplayed
     * {Boolean} 是否显示完整线型。
     */
    completeLineSymbolDisplayed = null;
    /**
     * APIProperty: maxScale
     * {Number} 地图最大比例尺。
     */
    maxScale = null;
    /**
     * APIProperty: minScale
     * {Number} 地图最小比例尺。
     */
    minScale = null;
    /**
     * APIProperty: minVisibleGeometrySize
     * {Number} 几何对象的最小可见大小，以像素为单位。
     */
    minVisibleGeometrySize = null;
    /**
     * APIProperty: opaqueRate
     * {Integer} 图层的不透明度。
     */
    opaqueRate = null;
    /**
     * APIProperty: symbolScalable
     * {Boolean} 是否允许图层的符号大小随图缩放。
     */
    symbolScalable = null;
    /**
     * APIProperty: symbolScale
     * {Number} 图层的符号缩放基准比例尺。
     */
    symbolScale = null;
    /**
     * APIProperty: overlapDisplayed
     * {Boolean} 地图对象在同一范围内时，是否重叠显示，默认为False。
     */
    overlapDisplayed = null;
    /**
     * APIProperty: overlapDisplayedOptions
     * {SuperMap.OverlapDisplayedOptions} 地图的压盖过滤显示选项，当 overlapDisplayed 为 false 时有效。
     */
    overlapDisplayedOptions = null;

    /**
     * Constructor: SuperMap.UGCMapLayer
     * UGC 地图图层类构造函数。
     *
     * Parameters:
     * options - {Object} 参数。
     *
     * Allowed options properties:
     * completeLineSymbolDisplayed - {Boolean} 是否显示完整线型。
     * maxScale - {Number} 地图最大比例尺。
     * minScale - {Number} 地图最小比例尺。
     * minVisibleGeometrySize - {Number} 几何对象的最小可见大小，以像素为单位。
     * opaqueRate - {Integer} 图层的不透明度。
     * symbolScalable - {Boolean} 是否允许图层的符号大小随图缩放。
     * symbolScale - {Number} 图层的符号缩放基准比例尺。
     * overlapDisplayed - {Boolean} 地图对象在同一范围内时，是否重叠显示，默认为False。
     * overlapDisplayedOptions - {SuperMap.OverlapDisplayedOptions} 地图的压盖过滤显示选项，当
     * overlapDisplayed 为 false 时有效。
     */
    constructor(options) {
        options = options || {};
        super(options);
    }


    destroy() {
        super.destroy();
        SuperMap.Util.reset(this);
    }


    /**
     * Method: fromJson
     * 将服务端JSON对象转换成当前客户端对象
     * Parameters:
     * jsonObject - {Object} 要转换的 JSON 对象。
     */
    fromJson(jsonObject) {
        super.fromJson(jsonObject);
    }


    /**
     * Method: toServerJSONObject
     * 转换成对应的 JSON 格式对象。
     */
    toServerJSONObject() {
        return super.toServerJSONObject();
    }

    CLASS_NAME = "SuperMap.UGCMapLayer"
}

SuperMap.UGCMapLayer = UGCMapLayer;
