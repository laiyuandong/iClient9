﻿import SuperMap from '../SuperMap';
import ServerTextStyle from './ServerTextStyle';

/**
 * @class SuperMap.ThemeLabelItem
 * @description 分段标签专题图的子项。<br>
 *              标签专题图用专题值对点、线、面等对象做标注，值得注意的是，分段标签专题图允许用户通过 rangeExpression <br>
 *              字段指定用于分段的数值型字段，同一范围段内的标签具有相同的显示风格，其中每一个范围段就是一个专题图子项，<br>
 *              每一个子项都具有其名称、风格、起始值和终止值。注意：每个分段所表示的范围为 [Start, End)。例如：标签专题图的分段点有两个子项，<br>
 *              他们所代表的分段区间分别为[0,5)，[5,10)。那么需要分别设置 SuperMap.ThemeLabelItem[0].start=0，<br>
 *              SuperMap.ThemeLabelItem[0].end=5，SuperMap.ThemeLabelItem[1].start=5，SuperMap.ThemeLabelItem[1].end=10。
 * @param options - {Object} 可选参数。如：<br>
 *        caption - {String} 专题图子项的名称。<br>
 *        end - {Number} 标签专题图子项的终止值。<br>
 *        start - {Number} 标签专题图子项的分段起始值。<br>
 *        visible - {Boolean} 标签专题图子项是否可见。<br>
 *        style - {SuperMap.ServerTextStyle} 标签专题图子项文本的显示风格。
 */
export default  class ThemeLabelItem {

    /**
     * APIProperty: caption
     * @member SuperMap.ThemeLabelItem.prototype.caption -{String}
     * @description 标签专题子项的标题。
     */
    caption = null;

    /**
     * APIProperty: end
     * @member SuperMap.ThemeLabelItem.prototype.end -{Number}
     * @description 标签专题图子项的终止值。如果该子项是分段中最后一个子项，那么该终止值就是分段的最大值；
     *              如果不是最后一项，该终止值必须与其下一子项的起始值相同，否则系统抛出异常。默认为0。
     */
    end = 0;

    /**
     * APIProperty: start
     * @member SuperMap.ThemeLabelItem.prototype.start -{Number}
     * @description 标签专题图子项的分段起始值。如果该子项是分段中第一项，那么该起始值就是分段的最小值；
     *              如果该子项的序号大于等于 1 的时候，该起始值必须与前一子项的终止值相同，否则系统会抛出异常。默认为0。
     */
    start = 0;

    /**
     * APIProperty: visible
     * @member SuperMap.ThemeLabelItem.prototype.visible -{Boolean}
     * @description 标签专题图子项是否可见。如果标签专题图子项可见，则为 true，否则为 false。默认值为 true。
     */
    visible = true;

    /**
     * APIProperty: style
     * @member SuperMap.ThemeLabelItem.prototype.style -{SuperMap.ServerTextStyle}
     * @description 标签专题图子项文本的显示风格。各种风格的优先级从高到低为：<br>
     *              uniformMixedStyle（标签文本的复合风格），SuperMap.ThemeLabelItem.style（分段子项的文本风格），uniformStyle（统一文本风格）。
     */
    style = null;

    /*
     * Constructor: SuperMap.ThemeLabelItem
     * 分段标签专题图的子项类构造函数，用于创建 SuperMap.ThemeLabelItem 类的新实例。
     */
    constructor(options) {
        var me = this;
        me.style = new ServerTextStyle();
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
        me.caption = null;
        me.end = null;
        me.start = null;
        if (me.style) {
            me.style.destroy();
            me.style = null;
        }
        me.visible = null;
    }

    static fromObj(obj) {
        if (!obj) return;
        var t = new ThemeLabelItem();
        SuperMap.Util.copy(t, obj);
        return t;
    }

    CLASS_NAME = "SuperMap.ThemeLabelItem"
}

SuperMap.ThemeLabelItem = ThemeLabelItem;
