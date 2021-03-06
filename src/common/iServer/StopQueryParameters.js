﻿import SuperMap from '../SuperMap';

/**
 * @class SuperMap.StopQueryParameters
 * @constructs SuperMap.StopQueryParameters
 * @classdesc
 * 站点查询参数类。
 * @api
 * @param options - {Object} 参数。
 * Allowed options properties:</br>
 * keyWord - {String} 站点名称关键字。</br>
 * returnPosition - {Boolean} 是否返回站点坐标信息。</br>
 */
export default  class StopQueryParameters {

    /**
     * APIProperty: keyWord
     * {String} 站点名称关键字。
     */
    keyWord = null;

    /**
     * APIProperty: returnPosition
     * {Boolean} 是否返回站点坐标信息。
     */
    returnPosition = false;


    constructor(options) {
        options = options || {};
        SuperMap.Util.extend(this, options);
    }

    /*
     * APIMethod: destroy
     * 释放资源，将引用资源的属性置空。
     */
    destroy() {
        SuperMap.Util.reset(this);
    }

    CLASS_NAME = "SuperMap.StopQueryParameters"
}

SuperMap.StopQueryParameters = StopQueryParameters;