﻿import SuperMap from '../SuperMap';

/**
 * @class SuperMap.GetFeaturesParametersBase
 * @constructs SuperMap.GetFeaturesParametersBase
 * @classdesc 要素查询参数基类
 * @extends {SuperMap}
 * @api
 */
export default  class GetFeaturesParametersBase {


    /**
     * APIProperty: datasetNames
     * {Array(String)} 数据集集合中的数据集名称列表。
     */
    datasetNames = null;

    /**
     * APIProperty: returnContent
     * {Boolean} 是否立即返回新创建资源的表述还是返回新资源的URI。
     *           如果为 true，则直接返回新创建资源，即查询结果的表述。
     *           如果为 false，则返回的是查询结果资源的 URI。默认为 true。
     */
    returnContent = true;
    /**
     * APIProperty: fromIndex
     * {Integer} 查询结果的最小索引号。
     *           默认值是0，如果该值大于查询结果的最大索引号，则查询结果为空。
     */
    fromIndex = 0;

    /**
     * APIProperty: toIndex
     * {Integer} 查询结果的最大索引号。
     *           默认值是19，如果该值大于查询结果的最大索引号，则以查询结果的最大索引号为终止索引号。
     */
    toIndex = 19;

    /**
     * APIProperty: returnCountOnly
     * {Boolean} 只返回查询结果的总数，默认为false。
     */
    returnCountOnly = false;

    /**
     * APIProperty: maxFeatures
     * {Integer} 进行SQL查询时，用于设置服务端返回查询结果条目数量，默认为1000。
     */
    maxFeatures = null;

    /**
     * @method SuperMap.GetFeaturesParametersBase.initialize
     * @param options - {Object} 参数。
     * Allowed options properties:</br>
     * datasetNames - {Array(String)} 数据集集合中的数据集名称列表。</br>
     * returnContent - {SuperMap.FilterParameter} 是否直接返回查询结果。</br>
     * fromIndex - {Integer} 查询结果的最小索引号。</br>
     * toIndex - {Integer} 查询结果的最大索引号。</br>
     */
    constructor(options) {
        if (!options) {
            return;
        }
        SuperMap.Util.extend(this, options);
    }


    /*
     * APIMethod: destroy
     * 释放资源，将引用资源的属性置空。
     */
    destroy() {
        var me = this;
        me.datasetNames = null;
        me.returnContent = null;
        me.fromIndex = null;
        me.toIndex = null;
        me.maxFeatures = null;
    }


    CLASS_NAME = "SuperMap.GetFeaturesParametersBase"
}

SuperMap.GetFeaturesParametersBase = GetFeaturesParametersBase;