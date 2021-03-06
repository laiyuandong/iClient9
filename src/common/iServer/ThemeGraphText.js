﻿import SuperMap from '../SuperMap';
import ServerTextStyle from './ServerTextStyle';
import {ThemeGraphTextFormat} from '../REST';

/**
 * @class SuperMap.ThemeGraphText
 * @description 统计图文字标注风格类。
 * @param options - {Object} 可选参数。<br>
 *        graphTextDisplayed - {Boolean} 是否显示统计图上的文字标注。<br>
 *        graphTextFormat - {SuperMap.ThemeGraphTextFormat} 统计专题图文本显示格式。<br>
 *        graphTextStyle - {SuperMap.ServerTextStyle} 统计图上的文字标注风格。
 */
export default  class ThemeGraphText {

    /**
     * APIProperty: graphTextDisplayed
     * @member SuperMap.ThemeGraphText.prototype.graphTextDisplayed -{Boolean}
     * @description 是否显示统计图上的文字标注。默认为 false，即不显示。
     */
    graphTextDisplayed = false;

    /**
     * APIProperty: graphTextFormat
     * @member SuperMap.ThemeGraphText.prototype.graphTextFormat -{SuperMap.ThemeGraphTextFormat}
     * @description 统计专题图文本显示格式。<br>
     *              文本显示格式包括百分数、真实数值、标题、标题+百分数、标题+真实数值。默认为 SuperMap.ThemeGraphTextFormat.CAPTION。
     */
    graphTextFormat = ThemeGraphTextFormat.CAPTION;

    /**
     * APIProperty: graphTextStyle
     * @member SuperMap.ThemeGraphText.prototype.graphTextStyle -{SuperMap.ServerTextStyle}
     * @description 统计图上的文字标注风格。
     */
    graphTextStyle = null;

    /*
     * Constructor: SuperMap.ThemeGraphText
     * 统计图文字标注风格类构造函数。
     */
    constructor(options) {
        var me = this;
        me.graphTextStyle = new ServerTextStyle();
        if (options) {
            SuperMap.Util.extend(this, options);
        }
    }

    /**
     * APIMethod: destroy
     * @function destroy
     * @description 释放资源，将引用资源的属性置空。
     */
    destroy() {
        var me = this;
        me.graphTextDisplayed = null;
        me.graphTextFormat = null;
        if (me.graphTextStyle) {
            me.graphTextStyle.destroy();
            me.graphTextStyle = null;
        }
    }

    static fromObj(obj) {
        var res = new ThemeGraphText();
        SuperMap.Util.copy(res, obj);
        res.graphTextStyle = ServerTextStyle.fromObj(obj.graphTextStyle);
        return res;

    }

    CLASS_NAME = "SuperMap.ThemeGraphText"
}

SuperMap.ThemeGraphText = ThemeGraphText;
