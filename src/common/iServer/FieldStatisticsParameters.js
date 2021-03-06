import SuperMap from '../SuperMap';

/**
 * @class SuperMap.FieldStatisticsParameters
 * @constructs SuperMap.FieldStatisticsParameters
 * @classdesc
 * 字段统计信息查询参数类。
 * @api
 */

export default  class FieldStatisticsParameters {
    /**
     * @property {String} APIProperty: fieldName
     * 字段名
     */
    fieldName = null;
    /**
     * @property {String<SuperMap.StatisticMode>}|{Array<String<SuperMap.StatisticMode>} APIProperty: statisticMode
     * 字段统计方法类型
     */
    statisticMode = null;

    /**
     * @method SuperMap.FieldStatisticsParameters.initialize
     * @param options - {Object} 参数。
     */
    constructor(options) {
        if (options) {
            SuperMap.Util.extend(this, options);
        }
    }

    /*
     * APIMethod: destroy
     * 释放资源,将引用资源的属性置空。
     */

    destroy() {
        var me = this;
        me.fieldName = null;
        me.statisticMode = null;
    }


    CLASS_NAME = "SuperMap.FieldStatisticsParameters"
}

SuperMap.FieldStatisticsParameters = FieldStatisticsParameters;
