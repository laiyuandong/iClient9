import SuperMap from '../SuperMap';
import IPortalServiceBase from './iPortalServiceBase';

/**
 * @class SuperMap.iPortalService
 * @classdesc iPortal服务
 * @extends {SuperMap.iPortalServiceBase}
 *
 */
export default  class IPortalService extends IPortalServiceBase {

    addedMapNames = null;
    addedSceneNames = null;
    authorizeSetting = [];
    checkStatus = "";
    createTime = 0;
    description = "";
    enable = true;
    id = 0;
    isBatch = false;
    isDataItemService = false;
    linkPage = null;
    mapInfos = [];
    metadata = null;
    nickname = "";
    offline = false;
    proxiedUrl = null;
    resTitle = "";
    scenes = [];
    serviceRootUrlId = null;
    tags = [];
    thumbnail = null;
    type = "";
    updateTime = 0;
    userName = "";
    verifyReason = null;
    version = null;
    visitCount = 0;

    /**
     * @method SuperMap.iPortalService.initialize
     * @param seviceUrl
     * @param params
     */

    constructor(serviceUrl, params) {
        super(serviceUrl);
        params = params || {};
        SuperMap.Util.extend(this, params);
        this.serviceUrl = serviceUrl;
        if (this.id) {
            this.serviceUrl = serviceUrl + "/" + this.id;
        }
    }

    /**
     * @method SuperMap.iPortalService.load
     */

    load() {
        var me = this;
        return me.request("GET", me.serviceUrl + ".json")
            .then(function (serviceInfo) {
                if (serviceInfo.error) {
                    return serviceInfo;
                }
                for (var key in serviceInfo) {
                    me[key] = serviceInfo[key];
                }
            });
    }

    /**
     * @method SuperMap.iPortalService.update
     */
    update() {
        var serviceUpdateParam = {
            authorizeSetting: this.authorizeSetting,
            metadata: this.metadata,
            tags: this.tags,
            thumbnail: this.thumbnail
        };
        var options = {
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        };
        return this.request("PUT", this.serviceUrl, JSON.stringify(serviceUpdateParam), options);
    }

}

SuperMap.iPortalService = IPortalService;

