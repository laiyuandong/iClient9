﻿import SuperMap from '../SuperMap';
import FacilityAnalyst3DParameters from './FacilityAnalyst3DParameters';

/**
 * @class SuperMap.FacilityAnalystUpstream3DParameters
 * @description 上游关键设施查找资源参数类
 * @augments SuperMap.FacilityAnalyst3DParameters
 * @param options - {Object} 可选参数。如：<br>
 *        edgeID - {Number} 指定的弧段ID。<br>
 *        nodeID - {Integer} 指定的结点ID。<br>
 *        weightName -{String} 指定的权值字段信息对象的名称。<br>
 *        isUncertainDirectionValid -{Boolean} 指定不确定流向是否有效。指定为 true，表示不确定流向有效，遇到不确定流向时分析继续进行；
 *                                              指定为 false，表示不确定流向无效，遇到不确定流向将停止在该方向上继续查找。<br>
 *        sourceNodeIDs - {Array(Number)} 指定的设施点ID数组
 */
export default  class FacilityAnalystUpstream3DParameters extends FacilityAnalyst3DParameters {

    /**
     * APIProperty: sourceNodeIDs
     * @member SuperMap.FacilityAnalystUpstream3DParameters.prototype.sourceNodeIDs -{Array<Number>}
     * @description 指定的设施点ID数组
     * @api
     */
    sourceNodeIDs = null;

    /*
     * Constructor: SuperMap.FacilityAnalystUpstream3DParameters
     * 上游关键设施查找资源参数类构造函数。
     *
     */
    constructor(options) {
        super(options);
        options = options || {};
        SuperMap.Util.extend(this, options);
    }


    /**
     * @inheritDoc
     */
    destroy() {
        super.destroy();
        this.sourceNodeIDs = null;
    }

    CLASS_NAME = "SuperMap.FacilityAnalystUpstream3DParameters"
}

SuperMap.FacilityAnalystUpstream3DParameters = FacilityAnalystUpstream3DParameters;