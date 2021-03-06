﻿import SuperMap from '../SuperMap';
/**
 * @class SuperMap.JoinItem
 * @constructs SuperMap.JoinItem
 * @classdesc
 * 连接信息类。
 * 该类用于矢量数据集与外部表的连接。外部表可以为另一个矢量数据集（其中纯属性数据集中没有空间几何信息）所对应的 DBMS 表，也可以是用户自建的业务表。需要注意的是，矢量数据集与外部表必须属于同一数据源。表之间的联系的建立有两种方式，一种是连接（join），一种是关联（link）。连接，实际上是依据相同的字段将一个外部表追加到指定的表；而关联是基于一个相同的字段定义了两个表格之间的联系，但不是实际的追加。用于连接两个表的字段的名称不一定相同，但类型必须一致。当两个表格之间建立了连接，通过对主表进行操作，可以对外部表进行查询，制作专题图以及分析等。当两个表格之间是一对一或多对一的关系时，可以使用 join 连接。当为多对一的关系时，允许指定多个字段之间的关联。(注意：SuperMap.JoinItem 目前支持左连接和内连接，不支持全连接和右连接，UDB 引擎不支持内连接。并且用于建立连接的两个表必须在同一个数据源下。)
 * @api
 * @example 下面以SQL查询说明joinItem的使用方法：
 *(start code)
 *   function queryBySQL() {
     *       // 设置与外部表的连接信息
     *       var joinItem = new SuperMap.JoinItem({
     *           foreignTableName: "foreignTable",
     *           joinFilter: "foreignTable.CONTINENT = Countries.CONTINENT",
     *           joinType: "LEFTJOIN"
     *       })
     *       var queryParam, queryBySQLParams, queryBySQLService;
     *       // 设置查询参数，在查询参数中添加joinItem关联条件信息
     *       queryParam = new SuperMap.FilterParameter({
     *            name: "Countries@World",
     *            joinItems: [joinItem]
     *         }),
     *       queryBySQLParams = new SuperMap.QueryBySQLParameters({
     *             queryParams: [queryParam]
     *         }),
     *       queryBySQLService = new SuperMap.QueryBySQLService(url, {
     *             eventListeners: { "processCompleted": processCompleted, "processFailed": processFailed}
     *         });
     *       queryBySQLService.processAsync(queryBySQLParams);
     *  }
 *  function processCompleted(queryEventArgs) {//todo}
 *  function processFailed(e) {//todo}
 * (end)
 */
export default  class JoinItem {
    /**
     * APIProperty: foreignTableName
     * {String} 外部表的名称。
     * 如果外部表的名称是以“表名@数据源名”命名方式，则该属性只需赋值表名。
     * 例如：外部表 Name@changchun，Name 为表名，changchun 为数据源名称，则该属性的赋值应为：Name。
     */
    foreignTableName = null;

    /**
     * APIProperty: joinFilter
     * {String} 矢量数据集与外部表之间的连接表达式，即设定两个表之间关联的字段。
     * 例如，将房屋面数据集（Building）的 district 字段与房屋拥有者的纯属性数据集（Owner）的 region 字段相连接，
     * 两个数据集对应的表名称分别为 Table_Building 和 Table_Owner，
     * 则连接表达式为 Table_Building.district = Table_Owner.region。
     * 当有多个字段相连接时，用 AND 将多个表达式相连。
     */
    joinFilter = null;

    /** APIProperty: joinType
     * {JoinType} 两个表之间连接类型。
     * 连接类型决定了对两个表进行连接查询后返回的记录的情况。
     */
    joinType = null;

    /**
     * @method  SuperMap.JoinItem.initialize
     * @description 连接信息类构造函数。
     * 设置将TableB连接TableA的连接信息，即建立JoinItem 类并设置其属性，
     * 当执行TableA的查询操作时，系统将根据连接条件及查询条件，将满足条件
     * 的TableA中的内容与满足条件的TableB中的内容构成一个查询结果表，并
     * 这个查询表保存在内存中，需要获取结果时，再从内存中取出相应的内容。
     *
     * @param  options - {Object} 参数。
     * Allowed options properties:</br>
     * foreignTableName - {String} 外部表的名称。</br>
     * joinFilter - {String} 矢量数据集与外部表之间的连接表达式，即设定两个表之间关联的字段。</br>
     * joinType - {JoinType} 两个表之间连接类型。</br>
     */
    constructor(options) {
        if (options) {
            SuperMap.Util.extend(this, options);
        }
    }


    /*
     * APIMethod: destroy
     * 释放资源，将引用资源的属性置空。
     */
    destroy() {
        var me = this;
        me.foreignTableName = null;
        me.joinFilter = null;
        me.joinType = null;
    }

    /**
     * @method SuperMap.JoinItem.toServerJSONObject
     * @description 转换成对应的 JSON 格式对象。
     */
    toServerJSONObject() {
        var dataObj = {};
        dataObj = SuperMap.Util.copyAttributes(dataObj, this);
        //joinFilter基本是个纯属性对象，这里不再做转换
        return dataObj;
    }


    CLASS_NAME = "SuperMap.JoinItem"
}
SuperMap.JoinItem = JoinItem;