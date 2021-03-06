import SuperMap from '../SuperMap';

/**
 * @class SuperMap.BuildCacheJobParameter
 * @description 地图缓存参数类
 * @param options - {Object} 可选参数。如：<br>
 *         datasetName - {String} 数据集名称。<br>
 *         cacheName - {String} 缓存名称。<br>
 *         cacheType - {String} 存储类型。<br>
 *         serverAdresses - {String} MongoDB地址。<br>
 *         database -- {String} 数据库。<br>
 *         version -{String} 版本。<br>
 *         bounds -{SuperMap.Bounds} 缓存范围。<br>
 *         imageType -{number} 缓存类型.<br>
 *         level -{number} 缓存比例尺级别。
 */
export default  class BuildCacheJobParameter {
    /**
     * APIProperty: datasetName
     * @member SuperMap.BuildCacheJobParameter.prototype.datasetName -{String}
     * @description 数据集名称。
     */
    datasetName= "";

    /**
     * APIProperty: cacheName
     * @member SuperMap.BuildCacheJobParameter.prototype.cacheName -{String}
     * @description 缓存名称。
     */
    cacheName= "";


    /**
     * APIProperty: cacheType
     * @member SuperMap.BuildCacheJobParameter.prototype.cacheType -{String}
     * @description 存储类型。
     */
    cacheType= "";


    /**
     * APIProperty: serverAddresses
     * @member SuperMap.BuildCacheJobParameter.prototype.serverAddresses -{String}
     * @description MongoDB地址。
     */

    serverAdresses= "";


    /**
     * APIProperty: database
     * @member SuperMap.BuildCacheJobParameter.prototype.database -{String}
     * @description 数据库。
     */

    database= "";


    /**
     * APIProperty: version
     * @member SuperMap.BuildCacheJobParameter.prototype.version -{String}
     * @description 版本。
     */

    version= "";


    /**
     * APIProperty: bounds
     * @member SuperMap.BuildCacheJobParameter.prototype.bounds -{SuperMap.Bounds}
     * @description 缓存范围。
     */

    bounds= "";


    /**
     * APIProperty: imageType
     * @member SuperMap.BuildCacheJobParameter.prototype.imageType -{number}
     * @description 缓存类型。
     */

    imageType= 'Heatmap';


    /**
     * APIProperty: level
     * @member SuperMap.BuildCacheJobParameter.prototype.level -{number}
     * @description 缓存比例尺级别。
     */
    level = null;

    constructor(options) {
        if (!options) {
            return;
        }
        SuperMap.Util.extend(this, options);
    }


    /**
     * APIMethod: destroy
     * @function destroy
     * @description 释放资源，将引用资源的属性置空。
     */
    destroy() {
        this.datasetName = null;
        this.cacheName = null;
        this.cacheType = null;
        this.serverAdresses = null;
        this.database = null;
        this.version = null;
        this.bounds = null;
        this.imageType = null;
        this.level = null;
    }

    static  toObject(buildCacheJobParameter, tempObj) {
        for (let name in buildCacheJobParameter) {
            if (name === "datasetName") {
                tempObj['input'] = tempObj['input'] || {};
                tempObj['input'][name] = buildCacheJobParameter[name];
                continue;
            }
            if (SuperMap.Util.indexOf(["cacheName", "cacheType", "serverAdresses", "database", "version"], name) > -1) {
                tempObj['output'] = tempObj['output'] || {};
                tempObj['output'][name] = buildCacheJobParameter[name];
                continue;
            }
            tempObj['drawing'] = tempObj['drawing'] || {};
            tempObj['drawing'][name] = buildCacheJobParameter[name];
        }
    }
}

SuperMap.BuildCacheJobParameter = BuildCacheJobParameter;
