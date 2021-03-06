import ol from 'openlayers/dist/ol-debug';
import SuperMap from '../../common/SuperMap';
import '../../common/security/SecurityManager';
import Util from  '../core/Util';

export default class TileSuperMapRest extends ol.source.TileImage {

    constructor(options) {
        options = options || {};
        if (options.url === undefined) {
            return;
        }

        options.attributions = options.attributions ||
            new ol.Attribution({
                html: "Map Data <span>© <a href='http://support.supermap.com.cn/product/iServer.aspx'>SuperMap iServer</a></span> with <span>© <a href='http://iclient.supermapol.com'>SuperMap iClient</a></span>"
            });

        var layerUrl = options.url + "/tileImage.png?";
        options.serverType = options.serverType || SuperMap.ServerType.ISERVER;
        //为url添加安全认证信息片段
        layerUrl = appendCredential(layerUrl, options.serverType);

        super({
            attributions: options.attributions,
            cacheSize: options.cacheSize,
            crossOrigin: options.crossOrigin,
            logo: options.logo,
            opaque: options.opaque,
            projection: options.projection,
            reprojectionErrorThreshold: options.reprojectionErrorThreshold,
            state: options.state,
            tileClass: options.tileClass,
            tileGrid: options.tileGrid,
            tileLoadFunction: options.tileLoadFunction,
            tilePixelRatio: options.tilePixelRatio,
            tileUrlFunction: tileUrlFunction,
            url: options.url,
            urls: options.urls,
            wrapX: options.wrapX !== undefined ? options.wrapX : false,
            cacheEnabled: options.cacheEnabled,
            layersID: options.layersID
        });

        this.options = options;
        this._url = options.url;
        //当前切片在切片集中的index
        this.tileSetsIndex = -1;
        this.tempIndex = -1;
        function appendCredential(url, serverType) {
            var newUrl = url, credential, value;
            switch (serverType) {
                case SuperMap.ServerType.ISERVER:
                    value = SuperMap.SecurityManager.getToken(url);
                    credential = value ? new SuperMap.Credential(value, "token") : null;
                    break;
                case SuperMap.ServerType.IPORTAL:
                    value = SuperMap.SecurityManager.getToken(url);
                    credential = value ? new SuperMap.Credential(value, "token") : null;
                    if (!credential) {
                        value = SuperMap.SecurityManager.getKey(url);
                        credential = value ? new SuperMap.Credential(value, "key") : null;
                    }
                    break;
                case SuperMap.ServerType.ONLINE:
                    value = SuperMap.SecurityManager.getKey(url);
                    credential = value ? new SuperMap.Credential(value, "key") : null;
                    break;
                default:
                    value = SuperMap.SecurityManager.getToken(url);
                    credential = value ? new SuperMap.Credential(value, "token") : null;
                    break;
            }
            if (credential) {
                newUrl += "&" + credential.getUrlParameters();
            }
            return newUrl;
        }

        function getAllRequestParams() {
            var me = this, params = {};

            params["redirect"] = options.redirect === true;
            //切片是否透明
            params["transparent"] = options.transparent === true;
            params["cacheEnabled"] = !(options.cacheEnabled === false);
            params["_cache"] = params["cacheEnabled"];

            //设置切片原点
            if (this.origin) {
                params["origin"] = JSON.stringify({x: this.origin[0], y: this.origin[1]});
            }

            if (options.prjCoordSys) {
                params["prjCoordSys"] = JSON.stringify(options.prjCoordSys);
            }

            if (options.layersID) {
                params["layersID"] = options.layersID.toString();
            }


            if (options.clipRegion instanceof ol.geom.Geometry) {
                options.clipRegionEnabled = true;
                options.clipRegion = Util.toSuperMapGeometry(new ol.format.GeoJSON().writeGeometryObject(options.clipRegion));
                options.clipRegion = SuperMap.Util.toJSON(SuperMap.REST.ServerGeometry.fromGeometry(options.clipRegion));
                params["clipRegionEnabled"] = options.clipRegionEnabled;
                params["clipRegion"] = JSON.stringify(options.clipRegion);
            }

            if (!options.overlapDisplayed) {
                params["overlapDisplayed"] = false;
                if (options.overlapDisplayedOptions) {
                    params["overlapDisplayedOptions"] = me.overlapDisplayedOptions.toString();
                }
            } else {
                params["overlapDisplayed"] = true;
            }

            if (options.cacheEnabled && options.tileversion) {
                params["tileversion"] = options.tileversion.toString();
            }

            return params;
        }

        function getFullRequestUrl() {
            if (this._paramsChanged) {
                this._layerUrl = createLayerUrl.call(this);
                this._paramsChanged = false;
            }
            return this._layerUrl || createLayerUrl.call(this);
        }

        function createLayerUrl() {
            this._layerUrl = layerUrl + getRequestParamString.call(this);
            return this._layerUrl;
        }

        function getRequestParamString() {
            this.requestParams = this.requestParams || getAllRequestParams.call(this);
            var params = [];
            for (var key in this.requestParams) {
                params.push(key + "=" + this.requestParams[key]);
            }
            return params.join('&');
        }

        var me = this;

        function tileUrlFunction(tileCoord, pixelRatio, projection) {
            if (!me.tileGrid) {
                if (me.extent) {
                    me.tileGrid = ol.source.TileSuperMapRest.createTileGrid(options.extent);
                    if (me.resolutions) {
                        me.tileGrid.resolutions = me.resolutions;
                    }
                } else {
                    if (projection.getCode() === "EPSG:3857") {
                        me.tileGrid = ol.source.TileSuperMapRest.createTileGrid([-20037508.3427892, -20037508.3427892, 20037508.3427892, 20037508.3427892]);
                        me.extent = [-20037508.3427892, -20037508.3427892, 20037508.3427892, 20037508.3427892];
                    }
                    if (projection.getCode() === "EPSG:4326") {
                        me.tileGrid = ol.source.TileSuperMapRest.createTileGrid([-180, -90, 180, 90]);
                        me.extent = [-180, -90, 180, 90];
                    }
                }
            }
            me.origin = me.tileGrid.getOrigin(0);
            var z = tileCoord[0];
            var x = tileCoord[1];
            var y = -tileCoord[2] - 1;
            var resolution = me.tileGrid.getResolution(z);
            var dpi = 96;
            var unit = projection.getUnits();
            if (unit === 'degrees') {
                unit = SuperMap.Unit.DEGREE;
            }
            if (unit === 'm') {
                unit = SuperMap.Unit.METER;
            }
            var scale = Util.resolutionToScale(resolution, dpi, unit);
            var tileSize = ol.size.toSize(me.tileGrid.getTileSize(z, me.tmpSize));
            var layerUrl = getFullRequestUrl.call(me);
            return layerUrl + "&x=" + x + "&y=" + y + "&width=" + tileSize[0] + "&height=" + tileSize[1] + "&scale=" + scale;
        }

    }

    setTileSetsInfo(tileSets) {
        this.tileSets = tileSets;
        if (Util.isArray(this.tileSets)) {
            this.tileSets = tileSets[0];
        }
        this.dispatchEvent({type: 'tilesetsinfoloaded', value: {tileVersions: this.tileSets.tileVersions}});
        this.changeTilesVersion();
    }


    //请求上一个版本切片，并重新绘制。
    lastTilesVersion() {
        this.tempIndex = this.tileSetsIndex - 1;
        this.changeTilesVersion();
    }

    //请求下一个版本切片，并重新绘制。
    nextTilesVersion() {
        this.tempIndex = this.tileSetsIndex + 1;
        this.changeTilesVersion();
    }

    //切换到某一版本的切片，并重绘。
    //通过this.tempIndex保存需要切换的版本索引
    changeTilesVersion() {
        var me = this;
        //切片版本集信息是否存在
        if (me.tileSets == null) {
            //版本信息为空，重新查询，查询成功继续跳转到相应的版本
            me.getTileSetsInfo();
            return;
        }
        if (me.tempIndex === me.tileSetsIndex || this.tempIndex < 0) {
            return;
        }
        //检测index是否可用
        var tileVersions = me.tileSets.tileVersions;
        if (tileVersions && me.tempIndex < tileVersions.length && me.tempIndex >= 0) {
            var name = tileVersions[me.tempIndex].name;
            var result = me.mergeTileVersionParam(name);
            if (result) {
                me.tileSetsIndex = me.tempIndex;
                me.dispatchEvent({type: 'tileversionschanged', value: {tileVersion: tileVersions[me.tempIndex]}});
            }
        }
    }

    //手动设置当前切片集索引
    //目前主要提供给控件使用
    updateCurrentTileSetsIndex(index) {
        this.tempIndex = index;
    }

    //更改URL请求参数中的切片版本号,并重绘
    mergeTileVersionParam(version) {
        if (version) {
            this.requestParams["tileversion"] = version;
            this._paramsChanged = true;
            this.refresh();
            return true;
        }
        return false;
    }

    static optionsFromMapJSON(url, mapJSONObj) {
        var options = {};
        options.url = url;
        options.crossOrigin = 'anonymous';
        var extent = [mapJSONObj.bounds.left, mapJSONObj.bounds.bottom, mapJSONObj.bounds.right, mapJSONObj.bounds.top];
        var resolutions = getResolutions();

        function getResolutions() {
            var level = 17;
            var dpi = 96;
            var width = (extent[2] - extent[0]);
            var height = (extent[3] - extent[1]);
            var tileSize = width >= height ? width : height;
            var maxReolution;
            if (tileSize === width) {
                maxReolution = tileSize / mapJSONObj.viewer.width;
            } else {
                maxReolution = tileSize / mapJSONObj.viewer.height;
            }
            var resolutions = [];
            var unit = SuperMap.Unit.METER;
            if (mapJSONObj.coordUnit === SuperMap.Unit.DEGREE) {
                unit = SuperMap.Unit.DEGREE;
            }
            if (mapJSONObj.visibleScales.length > 0) {
                for (var i = 0; i < mapJSONObj.visibleScales.length; i++) {
                    resolutions.push(Util.scaleToResolution(mapJSONObj.visibleScales[i], dpi, unit));
                }
            } else {
                for (var i = 0; i < level; i++) {
                    resolutions.push(maxReolution / Math.pow(2, i));
                }
            }
            return resolutions;
        }

        options.tileGrid = new ol.tilegrid.TileGrid({
            extent: extent,
            resolutions: resolutions
        });
        return options;
    }

    static createTileGrid(extent, maxZoom, minZoom, tileSize, origin) {
        var tilegrid = ol.tilegrid.createXYZ({
            extent: extent,
            maxZoom: maxZoom,
            minZoom: minZoom,
            tileSize: tileSize
        });
        return new ol.tilegrid.TileGrid({
                extent: extent,
                minZoom: minZoom,
                origin: origin,
                resolutions: tilegrid.getResolutions(),
                tileSize: tilegrid.getTileSize()
            }
        );
    }
}

ol.source.TileSuperMapRest = TileSuperMapRest;