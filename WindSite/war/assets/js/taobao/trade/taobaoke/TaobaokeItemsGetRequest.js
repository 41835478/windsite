/**
 * taobao.taobaoke.items.get Request
 * 
 * @author fxy
 * @class
 */
function TaobaokeItemsGetRequest() {
	/**
	 * 方法名
	 * 
	 * @type String
	 */
	this.method = "taobao.taobaoke.items.get";
	/**
	 * Y 需返回的字段列表.可选值:TaobaokeItem淘宝客商品结构体中的所有字段;字段之间用","分隔.
	 * 
	 * @type String
	 */
	this.fields = "iid,title,nick,pic_url,price,click_url,commission,commission_num,commission_rate,commission_volume";
	/**
	 * 淘宝用户昵称.如果昵称错误,那么客户就收不到佣金
	 * 
	 * @type String
	 */

	this.nick = "";
	/**
	 * Y 输入格式:"mm_会员id_网站id_广告位id" 网站id和广告位id不输入具体数字时可以输入0
	 * 如:"mm_18276335_45872_0",注意:如果会员id错误,那么客户就收不到佣金.
	 * 
	 * @type String
	 */

	this.pid = "";
	/**
	 * 商品标题中包含的关键字. 注意:查询时keyword,cid至少选择其中一个参数
	 * 
	 * @type String
	 */

	this.keyword = "";
	/**
	 * 商品所属分类id
	 * 
	 * @type String
	 */

	this.cid = "";
	/**
	 * N 起始价格.传入价格参数时,需注意起始价格和最高价格必须一起传入,并且strat_price小于等于end_price
	 * 
	 * @type String
	 */

	this.start_price = "";
	/**
	 * N 最高价格
	 * 
	 * @type String
	 */

	this.end_price = "";
	/**
	 * N 是否自动发货
	 * 
	 * @type String
	 */

	this.auto_send = "";
	/**
	 * N 商品所在地 例如:杭州
	 * 
	 * @type String
	 */

	this.area = "";
	/**
	 * N 卖家信用:(";"前是可以传入的合法字符串";"后是说明)
	 * 
	 * @type String
	 */

	this.start_credit = "";
	/**
	 * N <br>
	 * 1heart ; 一心<br>
	 * 2heart ; 两心<br>
	 * 3heart ; 三心<br>
	 * 4heart ; 四心<br>
	 * 5heart ; 五心<br>
	 * 1diamond ; 一钻<br>
	 * 2diamond ; 两钻<br>
	 * 3diamond ; 三钻<br>
	 * 4diamond ; 四钻<br>
	 * 5diamond ; 五钻<br>
	 * 1crown ; 一冠<br>
	 * 2crown ; 两冠<br>
	 * 3crown ; 三冠<br>
	 * 4crown ; 四冠<br>
	 * 5crown ; 五冠<br>
	 * 1goldencrown ; 一黄冠<br>
	 * 2goldencrown ; 二黄冠<br>
	 * 3goldencrown ; 三黄冠<br>
	 * 4goldencrown ; 四黄冠<br>
	 * 5goldencrown ; 五黄冠<br>
	 * 
	 * @type String
	 */
	this.end_credit = "";
	/**
	 * N 默认排序:default<br>
	 * 价格从高到低:price_desc<br>
	 * 价格从低到高:price_asc<br>
	 * 信用等级从高到低:credit_desc<br>
	 * (:前是说明,:后是可以传入的合法字符串)
	 * 
	 * @type String
	 */

	this.sort = "";
	/**
	 * N 是否查询消保卖家 true/false
	 * 
	 * @type String
	 */

	this.is_guarantee = "";
	/**
	 * N 起始佣金选项
	 * 
	 * @type String
	 */

	this.start_commission = "";
	/**
	 * N 最高佣金选项
	 * 
	 * @type String
	 */

	this.end_commission = "";
	/**
	 * N 起始佣金比率选项
	 * 
	 * @type String
	 */

	this.start_commissionRate = "";
	/**
	 * N 最高佣金比率选项
	 * 
	 * @type String
	 */

	this.end_commissionRate = "";
	/**
	 * N 起始累计推广量选项
	 * 
	 * @type String
	 */

	this.start_commissionNum = "";

	/**
	 * N 最高累计推广量选项
	 * 
	 * @type String
	 */
	this.end_commissionNum = "";

	/**
	 * N 结果页数.1~99
	 * 
	 * @type Number
	 */
	this.page_no = 1;

	/**
	 * 每页返回结果数.最大每页40
	 * 
	 * @requires N
	 * @type Number
	 */
	this.page_size = 10;
}
TaobaokeItemsGetRequest.prototype = new TaobaoRequest();
/**
 * 业务参数校验
 * 
 * @function
 */
TaobaokeItemsGetRequest.prototype.validate = function() {
	// TODO 业务参数校验
}