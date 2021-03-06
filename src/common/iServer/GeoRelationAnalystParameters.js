﻿import SuperMap from '../SuperMap';
import {SpatialRelationType} from '../REST';
import FilterParameter from './FilterParameter';

/**
 * @class SuperMap.GeoRelationAnalystParameters
 * @constructs SuperMap.GeoRelationAnalystParameters
 * @classdesc
 * 空间关系分析服务参数类。
 * 使用该类可以为空间关系分析服务提供所需的参数信息。
 * @api
 */
export default class GeoRelationAnalystParameters {

    /**
     * APIProperty: dataset
     * {String} 源数据集名称。
     */
    dataset = null;

    /**
     * APIProperty: sourceFilter
     * {SuperMap.FilterParameter} 空间关系分析中的源数据集查询参数。仅 ids、attributeFilter 和 fields 字段有效。
     */
    sourceFilter = null;

    /**
     * APIProperty: referenceFilter
     * {SuperMap.FilterParameter} 空间关系分析中的参考数据集查询参数。仅 name, ids, attributeFilter
     * 和 fields 字段有效。
     */
    referenceFilter = null;

    /**
     * APIProperty: spatialRelationType
     * {SuperMap.SpatialRelationType} 指定的空间关系类型。
     */
    spatialRelationType = null;

    /**
     * APIProperty: isBorderInside
     * {Boolean} 边界处理方式，即位于面边线上的点是否被面包含。此参数仅用于空间关系为包含或被包含的情况。
     */
    isBorderInside = null;

    /**
     * APIProperty: returnFeature
     * {Boolean} 是否返回Feature信息。
     */
    returnFeature = null;

    /**
     * APIProperty: returnGeoRelatedOnly
     * {Boolean} 是否仅返回满足指定空间关系的空间对象，默认为 True。
     */
    returnGeoRelatedOnly = null;

    /**
     * APIProperty: startRecord
     * {Integer} 分析结果起始记录位置，默认为0。
     */
    startRecord = 0;

    /**
     * Property: expectCount
     * {Integer} 空间关系分析期望返回结果记录数，默认为500条，如果实际不足500条结果则返回所有分析结果。
     */
    expectCount = 500;

    /**
     * @method SuperMap.GeoRelationAnalystParameters.initialize
     * @param options - {Object} 参数。
     * Allowed options properties:</br>
     * sourceFilter - {SuperMap.FilterParameter} 空间关系分析中的参考数据集查询参数。仅 name, ids,attributeFilter 和 fields 字段有效。</br>
     * referenceFilter - {SuperMap.FilterParameter} 空间关系分析中的参考数据集查询参数。仅 name, ids,attributeFilter 和 fields 字段有效。</br>
     * spatialRelationType - {SuperMap.SpatialRelationType} 指定的空间关系类型。</br>
     * isBorderInside - {Boolean} 边界处理方式，即位于面边线上的点是否被面包含。此参数仅用于空间关系为包含或被包含的情况。</br>
     * returnFeature - {Boolean} 是否返回Feature信息。</br>
     * returnGeoRelatedOnly - {Boolean} 仅返回满足指定空间关系的空间对象，默认为 True。</br>
     * startRecord - {Integer} 分析结果起始记录位置，默认为0。</br>
     * expectCount - {Integer} 空间关系分析期望返回结果记录数，默认为500条，如果实际不足500条结果则返回所有分析结果。</br>
     */
    constructor(options) {
        var me = this;
        if (options) {
            SuperMap.Util.extend(me, options);
        }
    }


    /*
     * APIMethod: destroy
     * 释放资源，将引用资源的属性置空。
     */
    destroy() {
        var me = this;
        if (me.sourceFilter) {
            me.sourceFilter.destroy();
        }
        me.sourceFilter = null;

        if (me.referenceFilter) {
            me.referenceFilter.destroy();
        }
        me.referenceFilter = null;

        me.dataset = null;
        me.spatialRelationType = null;
        me.isBorderInside = null;
        me.returnFeature = null;
        me.returnGeoRelatedOnly = null;
        me.startRecord = null;
        me.expectCount = null;
    }

    CLASS_NAME = "SuperMap.GeoRelationAnalystParameters"
}

SuperMap.GeoRelationAnalystParameters = GeoRelationAnalystParameters;