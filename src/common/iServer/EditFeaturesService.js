﻿import SuperMap from '../SuperMap';
import {EditType} from '../REST';
import CommonServiceBase from './CommonServiceBase';
import EditFeaturesParameters from './EditFeaturesParameters';

/**
 * @class SuperMap.EditFeaturesService
 * @constructs SuperMap.EditFeaturesService
 * @classdesc
 * 数据服务中数据集添加、更新、删除服务类。。
 * @extends {SuperMap.CommonServiceBase}
 * @api
 * @example 例如：
 * (start code)
 * var myService = new SuperMap.EditFeaturesService(url, {eventListeners: {
     *     "processCompleted": editFeatureCompleted,
     *     "processFailed": editFeatureError
     *       }
     * };
 * (end)
 *
 */
export default class EditFeaturesService extends CommonServiceBase {

    /**
     * Property: returnContent
     * {Boolean} 要素添加时，isUseBatch 不传或传为 false 的情况下有效。
     *           true 表示直接返回新创建的要素的 ID 数组;false 表示返回创建的 featureResult 资源的 URI。默认不传时为 false。
     */
    returnContent = false;


    /**
     * Property: isUseBatch
     * {Boolean} 是否使用批量添加要素功能，要素添加时有效。
     *           批量添加能够提高要素编辑效率。
     *           true 表示批量添加；false 表示不使用批量添加。默认不传时为 false。
     */
    isUseBatch = false;

    /**
     * @method SuperMap.EditFeaturesService.initialize
     * @description 数据集编辑服务基类构造函数。
     * @param url - {String} 服务端的数据服务资源地址。请求数据服务中数据集编辑服务，URL 应为：</br>
     * http://{服务器地址}:{服务端口号}/iserver/services/{数据服务名}/rest/data/datasources/name/{数据源名}/datasets/name/{数据集名} 。</br>
     * 例如：http://localhost:8090/iserver/services/data-jingjin/rest/data/datasources/name/Jingjin/datasets/name/Landuse_R
     * @param options - {Object} 参数。
     *
     * Allowed options properties:</br>
     * eventListeners - {Object} 需要被注册的监听器对象。
     */
    constructor(url, options) {
        super(url, options);
        if (options) {
            SuperMap.Util.extend(this, options);
        }
        var me = this, end;
        end = me.url.substr(me.url.length - 1, 1);
        if (me.isInTheSameDomain) {
            me.url += (end == "/") ? "features.json?" : "/features.json?";
        } else {
            me.url += (end == "/") ? "features.jsonp?" : "/features.jsonp?";
        }
    }


    /*
     * APIMethod: destroy
     * 释放资源,将引用资源的属性置空。
     */
    destroy() {
        super.destroy();
        var me = this;
        me.returnContent = null;
        me.isUseBatch = null;
        me.fromIndex = null;
        me.toIndex = null;
    }


    /*
     * APIMethod: processAsync
     * 负责将客户端的更新参数传递到服务端。
     *
     * Parameters:
     * params - {SuperMap.EditFeaturesParameters} 编辑要素参数。
     */
    processAsync(params) {
        if (!params) {
            return;
        }
        var me = this,
            method = "POST",
            ids = "",
            editType = params.editType,
            jsonParameters = null;

        me.returnContent = params.returnContent;
        me.isUseBatch = params.isUseBatch;
        jsonParameters = EditFeaturesParameters.toJsonParameters(params);
        if (editType === EditType.DELETE) {
            ids = SuperMap.Util.toJSON(params.IDs);
            me.url += "ids=" + ids;
            method = "DELETE";
            jsonParameters = ids;
        } else if (editType === EditType.UPDATE) {
            method = "PUT";
        } else {
            if (me.isUseBatch) {
                me.url += "isUseBatch=" + me.isUseBatch;
                me.returnContent = false;
            }
            if (me.returnContent) {
                me.url += "returnContent=" + me.returnContent;
                method = "POST";
            }
        }

        me.request({
            method: method,
            data: jsonParameters,
            scope: me,
            success: me.serviceProcessCompleted,
            failure: me.serviceProcessFailed
        });
    }

    CLASS_NAME = "SuperMap.EditFeaturesService"
}
SuperMap.EditFeaturesService = EditFeaturesService;