<@ws.header>
<meta name="keywords" content="新淘网,站点基本信息">
<meta name="description" content="新淘网 - 我的新淘网,站点基本信息">
<title>基本设置-返利管理-我是淘客-新淘网</title>
<style>
.error {height:15px;background-color:#FFFE36;border:1px solid #E1E16D;font-size:11px;color:#000;padding:3px 10px;margin-left:-2px;-moz-border-radius:4px;-webkit-border-radius:4px;-moz-border-radius-bottomleft:0;-moz-border-radius-topleft:0;-webkit-border-bottom-left-radius:0;-webkit-border-top-left-radius:0;-moz-box-shadow:0 0 6px #ddd;-webkit-box-shadow:0 0 6px #ddd;}
fieldset{padding:5px;margin-bottom:10px;border:1px solid #EFEFEF;}fieldset legend{font-weight:700;font-size:14px;color:#014D7F}fieldset table td{height:25px;line-height:17px;} td.key{width:100px;text-align:right;}td.value{width:150px;padding-left:20px;}
td.fl-num{text-align:center;width:80px;}th strong{color:red} fieldset .wTable td.value{text-align:left;}a.a-num-un,a.a-num-wait,a.a-num-finish{font-weight:800;font-size:16px;text-decoration: underline;}a.a-num-un{color:red;}a.a-num-wait{color:#090;}a.a-num-finish{color:gray}
</style>
</@ws.header>
<!--淘宝-->
<link href="http://a.tbcdn.cn/s/kissy/1.1.5/cssreset/reset-min.css" rel="stylesheet"/>
<link href="http://a.tbcdn.cn/s/kissy/1.1.5/editor/theme/cool/editor-pkg-min-datauri.css" rel="stylesheet"/>
<!--淘宝-->
<script src="http://a.tbcdn.cn/s/kissy/1.1.5/kissy-min.js?v=${dateVersion()}"></script>
<script src="http://a.tbcdn.cn/s/kissy/1.1.5/editor/editor-all-pkg-min.js?v=${dateVersion()}"></script>
<script src="http://a.tbcdn.cn/s/kissy/1.1.5/editor/biz/bangpai/editor-plugin-pkg-min.js?v=${dateVersion()}"></script>
<script>
var KEDITOR = null;
KISSY.ready(function(S) {
	S.use('editor', function() {
				var KE = S.Editor;
				KEDITOR = KE("#editor", {}).use("undo,font,link,forecolor,bgcolor");
			});
(function() {
		var S = KISSY;
		S.namespace('wordcount');
		// 参数：textarea的ID，初始化编辑器源代码数，最大限制数，编辑器editor对象
		KISSY.wordcount.bind = function(textarea, size, max, editor) {
			// 在当前text编辑器后面加入操作节点
			S.DOM
					.insertAfter(
							S.DOM
									.create('<div class="J_WS">源码:已输入 <em class="J_WordSize">'
											+ size
											+ '</em>/最多输入 <em class="J_WsMax">'
											+ max
											+ '</em> <span class="J_WsTips"></span></div>'),
							S.one(textarea).parent('.ke-editor-wrap'));
			var wordsizenode = S.one(textarea).parent('.ke-editor-wrap')
					.next('.J_WS').children('.J_WordSize');
			var tips = "请减少源码数量，否则无法发布成功";
			S.DOM.css('.J_WordSize', {
						'font-weight' : 'bold',
						'color' : 'green'
					});
			S.DOM.css('.J_WsMax', 'font-weight', 'bold');
			S.DOM.css('.J_WS', {
						'font-size' : '13px',
						'padding-left' : '5px'
					});
			S.DOM.css('.J_WsTips', 'color', 'red');
			var _change = function(node, s) {
				if (s <= max) {
					node.text(s).css('color', 'green');
					node.siblings('.J_WsTips').text('');
				} else {
					node.text(s).css('color', 'red');
					node.siblings('.J_WsTips').text(tips);
				}
			}, timer;
			// 绑定save事件
			editor.ready(function() {
						_change(wordsizenode, editor.getData().length);
						editor.on('save restore', function(ev) {
									// console.log(ev);
									if (ev.buffer) {
										timer && clearTimeout(timer);
										timer = setTimeout(function() {
													_change(
															wordsizenode,
															editor.getData().length);
												}, 500);
									} else {
										_change(wordsizenode,
												editor.getData().length);
									}
								});
					});
		};
	})();
	KISSY.wordcount.bind('#editor', 0, 1000, KEDITOR);
});


$(function(){
	//getHtmlContent('fanli-trade-result', '/router/member/sitemanager/trade/count?v=' + Math.random(), 'GET', {}, function(data) {
	//			$('#fanli-trade-result').empty().append(data);
	//		});
	//getHtmlContent('fanli-income-result', '/router/member/sitemanager/income?v=' + Math.random(), 'GET', {}, function(data) {
	//			$('#fanli-income-result').empty().append(data);
	//		});
	$('#updateCommission').click(function(){
		var bu ='';
		if(KEDITOR&&KEDITOR!=null){
			bu = KEDITOR.getData();
			if(bu){
				if(bu.length>1000){
					alert('公告长度必须小于1000');return;
				}
			}
		}
		var baiduTongJi = $('#baiduTongJi').val();
		var bt='';
		if(baiduTongJi){
			var reg = /3F[a-z0-9]+/;
			baiduTongJi = baiduTongJi.replace(/\s+/g,'').replace(/<\/?.+?>/g,"").replace(/[\r\n]/g, "");
			var result = baiduTongJi.match(reg);
			if (result != null) {
				for (var i = 0; i < result.length; i++) {
					var temp = result[i];
					bt=temp.replace('3F','');
				}
			}
			if(bt==''){
				alert('百度统计代码配置错误');return;
			}
		}
		if(checkCommissionNum($('#commissionRate'))){
			if(checkCommissionNum($('#adCommissionRate'))){
			if(parseInt($('#commissionRate').val())+parseInt($('#adCommissionRate').val())>90){
				alert('建议您调低分成比例，返利比例+推广返利比例大于90，这样将造成您无法获取自己的推广佣金');
				return;
			}
			var qq_appkey = $('#qq_appkey').val();
			var sina_appkey = $('#sina_appkey').val();
			var uyan = $('#uyan').val();
			var reg_appkey = /^[0-9]{3,15}$/;
			if(qq_appkey){
				if(!reg_appkey.test(qq_appkey)){
					alert('QQ开放平台AppKey格式不正确');
					return;
				}
			}
			if(sina_appkey){
				if(!reg_appkey.test(sina_appkey)){
					alert('新浪微博开放平台AppKey格式不正确');
					return;
				}
			}
			if(uyan){
				if(!reg_appkey.test(uyan)){
					alert('友言UYUserId格式不正确');
					return;
				}
			}
				var sender = new WindSender("/router/member/fl/profile/update");
				sender.load("POST", {
							commissionRate : $('#commissionRate').val(),
							adCommissionRate : $('#adCommissionRate').val(),
							bulletin:bu,
							baiduTongJi:bt,
							isLogin:$('#isLogin').attr('checked'),
							isAd:$('#indexAd').attr('checked'),
							qq_appkey:qq_appkey,
							sina_appkey:sina_appkey,
							uyan:uyan
						}, function(response) {
							if (response.isSuccess()) {
								alert('保存返利设置成功');
								document.location.href='/router/member/fl/profile';
							} else {
								alert(response.msg);
							}
						});	
			}
		}
	});
});
function checkCommissionNum(num){
var numRe = /^-?[0-9]*(\.[0-9]+)?$/;
var numVal = num.val();
if(!numRe.test(numVal)){
	alert('请输入数字');	
	num.focus();
	return false;
}
numVal = parseInt(numVal);
if(numVal<0||numVal>90){
	alert('请输入大于0小于90的数字');
	num.focus();
	return false;
}
return true;
}
</script>
<@xt.taoketemplate navselected='taoke' bdselected='fanli-profile' group=2>
<#if !(USER.sites[0].www??&&''!=USER.sites[0].www)><@ws.info><span style="color:red;font-size:14px;font-weight:bold;">警告：您的站点还没有绑定顶级域名，绑定顶级域名后才能正式启用返利版：<a href="http://home.xintaonet.com/space.php?uid=1&do=blog&id=1803" target="_blank">查看绑定顶级域名帮助</a></span></@ws.info></#if>
<table width="720" align="center" border="1" cellpadding="0" cellspacing="0" style="border-collapse: collapse" bordercolor="#dddddd">
<tr><th height="30" align="right" class="bigtext">返利比例：</th><td height="30" class="bigtext">&nbsp;<input type="text" id="commissionRate" value="${commission.commissionRate}" size="10" maxlength="2" class="btn3" style="width:100px">%（填写0-90）如 50% 表示推广总佣金的50% ，返还给买家的部分 </td></tr>
<tr><th height="30" align="right" class="bigtext">推广返利比例：</th><td height="30" class="bigtext">&nbsp;<input type="text" id="adCommissionRate" value="${commission.adCommissionRate}" size="10" maxlength="2" class="btn3" style="width:100px">%（填写0-90）如 10% 表示推广总佣金的10% ，返还给会员推广人的部分 </td></tr>
<tr><th height="30" colspan="2" align="left" class="bigtext"><span class="bigtext" style="padding-left:27px; color:#FF0000">提醒：淘宝联盟（阿里妈妈）会收取总佣金的10%作为技术服务费用，建议您的返利比例+推广返利比例&lt;=90%。</span></th></tr>
<tr><th height="30" align="right" class="bigtext">显示登录提示：</th><td height="30" class="bigtext">&nbsp;<input type="checkbox" id="isLogin" <#if commission.isLogin>checked</#if>>选中：非登录状态下用户点击购买链接时将弹出登录提示框，未选中：直接访问该商品所在的淘宝详情页面 </td></tr>
<tr><th align="right" >百度统计:</th><td><textarea id="baiduTongJi" style="width:100%;height:90px;margin:0 auto;"><#if ''!=commission.baiduTongJi><script type="text/javascript">
var _bdhmProtocol = (("https:" == document.location.protocol) ? " https://" : " http://");
document.write(unescape("%3Cscript src='" + _bdhmProtocol + "hm.baidu.com/h.js%3F${commission.baiduTongJi}' type='text/javascript'%3E%3C/script%3E"));
</script>
</#if></textarea></td></tr>
<tr><th height="30" colspan="2" align="left" class="bigtext"><span class="bigtext" style="padding-left:27px; color:#FF0000">提醒：返利版站点可同时启用百度统计，请将百度统计代码复制进入上边的文本框，留空则不启用百度统计。</span></th></tr>
<tr><th align="right" >会员公告:</th><td><textarea id="editor" style="width:100%;height:100px;margin:0 auto;">${commission.bulletin}</textarea></td></tr>
<tr><th height="30" align="right" class="bigtext">首页广告:</th><td height="30" class="bigtext">&nbsp;<input type="checkbox" id="indexAd" <#if (commission.isAd??&&!commission.isAd)><#else>checked</#if>>显示选中：系统将在自定义页面右下角投放淘宝客商品广告，未选中：不显示投放的淘宝客商品广告 </td></tr>
<tr><th height="30" align="right" class="bigtext">友言UYUserId:</th><td height="30" class="bigtext">&nbsp;<input type="text" id="uyan" value="${commission.uyan}" size="50" class="btn3" style="width:200px"><a href="http://home.xintaonet.com/space.php?uid=1&do=blog&id=35907" target="_blank">查看帮助</a>配置后，您的站点文章下方自动出现友言社会化评论框</td></tr>
<tr><th height="30" align="right" class="bigtext">QQ登录Appkey:</th><td height="30" class="bigtext">&nbsp;<input type="text" id="qq_appkey" value="${commission.qq_appkey}" size="50" class="btn3" style="width:200px"><a href="http://home.xintaonet.com/space.php?uid=1&do=blog&id=35905" target="_blank">查看帮助</a>配置后，系统自动支持QQ帐号登录(需绑定自己的域名) </td></tr>
<tr><th height="30" align="right" class="bigtext">新浪微博登录AppKey:</th><td height="30" class="bigtext">&nbsp;<input type="text" id="sina_appkey" value="${commission.sina_appkey}" size="50" class="btn3" style="width:200px"><a href="http://home.xintaonet.com/space.php?uid=1&do=blog&id=35906" target="_blank">查看帮助</a>配置后，系统自动支持新浪微博帐号登录(需绑定自己的域名) </td></tr>
<tr><td height="30" colspan="2" height="30" class="bigtext">&nbsp;&nbsp;&nbsp;&nbsp;<input id="updateCommission" type="button" style="padding:2px;cursor:pointer;" value="保 存 设 置 "> &nbsp;&nbsp;&nbsp;</td></tr>
</table>
<!--<fieldset><legend>返利记录</legend>
<div  id="fanli-trade-result" style="width:100%;height:100%;"></div>
</fieldset>
<fieldset><legend>收入信息</legend>
<div  id="fanli-income-result" style="width:100%;height:100%;"></div>
</fieldset>-->
</@xt.taoketemplate>
