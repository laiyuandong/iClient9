﻿import SuperMap from '../SuperMap';

/**
 * @class SuperMap.ThemeOffset
 * @description 专题图中文本或符号相对于要素内点的偏移量设置类。
 *              通过该类可以设置专题图中标记文本或符号的偏移量以及偏移量是否随地图缩放而改变。
 * @param options - {Object} 可选参数。如：<br>
 *        offsetFixed - {Boolean} 当前专题图是否固定标记文本或符号的偏移量。<br>
 *        offsetX - {String} 专题图中文本或符号相对于要素内点的水平偏移量。<br>
 *        offsetY - {String} 专题图中文本或符号相对于要素内点的垂直偏移量。
 */
export default  class ThemeOffset {

    /**
     * APIProperty: offsetFixed
     * @member SuperMap.ThemeOffset.prototype.offsetFixed -{Boolean}
     * @description 当前专题图是否固定标记文本或符号的偏移量。所谓固定偏移量，则文本或符号的偏移量不随地图的缩放而变化。默认为 false，表示偏移量随地图的缩放而变化。
     */
    offsetFixed = false;

    /**
     * APIProperty: offsetX
     * @member SuperMap.ThemeOffset.prototype.offsetX -{String}
     * @description 专题图中文本或符号相对于要素内点的水平偏移量。偏移量的单位为地图单位。
     *              该偏移量的值为一个常量值或者字段表达式所表示的值，即如果字段表达式为 SmID，其中 SmID = 2，那么水平偏移量为2。
     */
    offsetX = "0.0";

    /**
     * APIProperty: offsetY
     * @member SuperMap.ThemeOffset.prototype.offsetY -{String}
     * @description 专题图中文本或符号相对于要素内点的垂直偏移量。偏移量的单位为地图单位。
     *              该偏移量的值为一个常量值或者字段表达式所表示的值，即如果字段表达式为 SmID，其中 SmID = 2，那么垂直偏移量为2。
     */
    offsetY = "0.0";

    /*
     * Constructor: SuperMap.ThemeOffset
     * 专题图中文本或符号相对于要素内点的偏移量设置类构造函数。
     */
    constructor(options) {
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
        me.offsetFixed = null;
        me.offsetX = null;
        me.offsetY = null;
    }

    static fromObj(obj) {
        if (!obj) return;
        var res = new ThemeOffset();
        SuperMap.Util.copy(res, obj);
        return res;
    }

    CLASS_NAME = "SuperMap.ThemeOffset"
}

SuperMap.ThemeOffset = ThemeOffset;
