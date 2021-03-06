import SuperMap from '../SuperMap';

/**
 * @class SuperMap.BurstPipelineAnalystParameters
 * @description 爆管分析参数类。
 * @param options - {Object} 可选参数。如：<br>
 *         sourceNodeIDs - {Array<Number>} 指定的设施点ID数组。<br>
 *         edgeID - {Number} 指定的弧段ID（注：edgeID 与 nodeID 不能同时使用）。<br>
 *         nodeID - {Number} 指定的结点ID （注：edgeID 与 nodeID 不能同时使用）。<br>
 *         isUncertainDirectionValid - {Boolean} 指定不确定流向是否有效；默认false，无效。
 */
export default  class BurstPipelineAnalystParameters {

    /**
     * @member SuperMap.BurstPipelineAnalystParameters.prototype.sourceNodeIDs -{Array(Number)}
     * @description 指定的设施点ID数组,可以为空。
     */
    sourceNodeIDs = null;

    /**
     * @member SuperMap.BurstPipelineAnalystParameters.prototype.edgeID -{Number}
     * @description指定的弧段ID（注：edgeID 与 nodeID 不能同时使用）。
     */
    edgeID = null;

    /**
     * @member SuperMap.BurstPipelineAnalystParameters.prototype.nodeID -{Number}
     * @description 指定的结点ID （注：edgeID 与 nodeID 不能同时使用）。
     */
    nodeID = null;

    /**
     * @member SuperMap.BurstPipelineAnalystParameters.prototype.isUncertainDirectionValid -{Boolean}
     * @description 指定不确定流向是否有效，默认为false。指定为 true，表示不确定流向有效，遇到不确定流向时分析继续进行；<br>
     *               指定为 false，表示不确定流向无效，遇到不确定流向将停止在该方向上继续查找。
     */
    isUncertainDirectionValid = false;

    /*
     * Constructor: BurstPipelineAnalystParameters
     * 爆管分析参数类构造函数。
     */
    constructor(options) {
        var me = this;
        if (!options) {
            return;
        }
        SuperMap.Util.extend(me, options);
    }

    /**
     * @function destroy
     * @description 释放资源，将引用资源的属性置空。
     */
    destroy() {
        var me = this;
        me.sourceNodeIDs = null;
        me.edgeID = null;
        me.nodeID = null;
        me.isUncertainDirectionValid = null;
    }

    CLASS_NAME = "SuperMap.BurstPipelineAnalystParameters"
}
SuperMap.BurstPipelineAnalystParameters = BurstPipelineAnalystParameters;