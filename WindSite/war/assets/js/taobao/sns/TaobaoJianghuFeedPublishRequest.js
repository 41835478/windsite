/**
 * taobao.jianghu.feed.publish 发布一个Feed(动态)
 * 
 * @author fxy
 * @class
 */
function TaobaoJianghuFeedPublishRequest() {
	/**
	 * API
	 * 
	 * @type String
	 */
	this.method = "taobao.jianghu.feed.publish";
	/**
	 * 如果Feed的内容描述的是两人之间发生的关系，则用这个参数指明被参与的一方。注：Feed的发起方不需要指定，默认为当前用户。(须数字，最长20位)
	 * 
	 * @type String
	 */
	this.participator = "";
	/**
	 * 应用自定义feed(动态)的类型(必须为数字取值范围[0,127])
	 * 
	 * @type String
	 */
	this.type = "";
	/**
	 * 标题.feed标题在title里可以使用${actor}和${participator}模板变量,<br>
	 * 其中${actor}表示产生Feed的人，$ {participator}表示动态的参与者,<br>
	 * 如果要使用这个模板变量需要传递participator参数.<br>
	 * 使用示例： <br>
	 * ${actor}踢了${participator} 一下.<br>
	 * 在例子中,动态展示时，系统会将$ {actor}及${participator}替换成相应的人名。<br>
	 * 没有链接.最长200个字符,一个中文字符和一个英文字符的长度都是1.
	 * 
	 * @type String
	 */
	this.title = "";
	/**
	 * 标题链接,最长200个字符,一个中文字符和一个英文字符的长度都是1.
	 * 
	 * @type String
	 */
	this.title_link = "";
	/**
	 * 动态显示的内容数据。在body里可以使用${actor}和${participator}模板变量，其中${actor}表示产生Feed的人，${participator}
	 * 表示动态的参与者，如果要使用这个模板变量需要传递participator参数。使用示例：${actor}踢了${participator}一下。
	 * 在例子中，动态展示时，系统会将${actor}及${participator}替换成相应的人名，并加上对应主页的连接地址。动态显示的内容数据。只支持两个html元素<a>和<img>，其他的html元素将被过滤掉。
	 * script、style、head、select标签的内容被去掉。其他的标签保留内容如：<script>alert</script>和红色
	 * 结果为：红色 （最长2000个字符，一个中文字符和一个英文字符的长度都是1）
	 * 
	 * @type String
	 */
	this.body = "";
	/**
	 * 媒体对象的数据,媒体对象的数据,用json格式表示.<br>
	 * mediaType:0:图片，1:音频，2:flash .<br>
	 * 其中media是媒体对象的图片地址，mediaLink是点击媒体对象时候的目标URL .<br> [
	 * {"mediaName":"baobei","media":"media src","mediaLink":"mdedia
	 * link","mediaDesc":"","mediaType":"0" } ,
	 * {"mediaName":"baobei","media":"media src","mediaLink":"mdedia
	 * link","mediaDesc":"","mediaType":"0"} ]
	 * 
	 * @type String
	 */
	this.medias = "";
	/**
	 * 动态在旺旺上的显示类型.<br>
	 * 如果多个则用逗号分隔.0:主窗口Feed,2:联系人头像前的Feed.<br>
	 * 当wwFeedTypes不为空，title,titleLink 不能为空。
	 * 
	 * @type String
	 */
	this.ww_feed_types = "";
}
TaobaoJianghuFeedPublishRequest.prototype = new TaobaoRequest();
/**
 * 业务参数校验
 * 
 * @function
 */
TaobaoJianghuFeedPublishRequest.prototype.validate = function() {
	// TODO 业务参数校验
}