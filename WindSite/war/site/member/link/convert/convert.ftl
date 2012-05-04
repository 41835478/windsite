<@ws.header>
<meta name="keywords" content="新淘网,站点基本信息">
<meta name="description" content="新淘网 - 我的新淘网,站点基本信息">
<title>链接转换工具-淘客推广-我是淘客-新淘网</title>
</@ws.header>
<script language="javascript" type="text/javascript" src="/assets/js/site/convert.js?v=${dateVersion()}"></script>
<style>
#tableProfile td{line-height:20px;text-align:left}.btn{background: url(/assets/images/btn_bg.gif) no-repeat;color: white;cursor: pointer;display: inline-block;font-size: 14px;font-weight: bold;height: 25px;line-height: 25px;text-align: center;width: 100px;background-position: 0px -350px;}
#convertWizard {font-size:12px;width:750px;height:600px;overflow-x:hidden;position:relative;}  
#convertWizard .items {width:20000em;clear:both;position:absolute;}
#convertWizard .step {padding:20px 30px;width:680px;float:left;}
#convertWizard h2{position:relative;}
#convertWizard h2,#convertWizard h2 strong {color:#5DAE40;font-weight:bold;border-bottom:1px dotted #ccc;font-size:17px;padding-bottom:5px;}
#convertWizard h2 em {display:block;font-size:14px;color:#666;font-weight:normal;margin-top:5px;}
#convertWizard ul {padding:0px !important;margin:0px !important;}
#convertWizard .firstStep li {list-style-type:none;list-style-image:none;margin-bottom:10px;}
#convertWizard .firstStep li label{color:#f60;font-weight:bold;}
#convertWizard .firstStep label {font-size:15px;display:block;cursor:pointer;}#convertWizard .firstStep label strong {color:#789;	position:relative;top:-1px;}
#convertWizard .firstStep label em {font-size:11px;color:#666;	font-style:normal;font-weight:normal}
#convertWizard select {border:1px solid #ccc;padding:4px;}
#convertWizard label span {color:#b8128f;font-weight:bold;position:relative;top:4px;font-size:20px;}#convertWizard .double label {width:50%;float:left;}#convertWizard .double .text {width:93%;}
#convertWizard .clearfix {clear:both;padding-top:10px;}#convertWizard .right {float:right;}
#convertWizard #status {border: 1px solid #8AB78A;margin:0px !important;height:35px;background:#F0F5F9;padding-left:25px !important;}#status li {list-style-type:none;list-style-image:none;float:left;color:#414141;padding:10px 30px;}#status li.active {background-color:#5DAE40;color:#fff;font-weight:bold;}
.button{background: url(/assets/images/btn_bg.gif) no-repeat 0px 0px;color: white;cursor: pointer;display: inline-block;font-size: 14px;font-weight: bold;height: 25px;line-height: 25px;text-align: center;width: 80px;background-position: 0px 0px;}
.link{padding:3px;width:500px;}.num{width:30px;display:inline-block;}
.error {height:15px;background-color:#FFFE36;font-size:11px;border:1px solid #E1E16D;padding:4px 10px;color:#000;-moz-border-radius:4px;-webkit-border-radius:4px;-moz-border-radius-bottomleft:0;-moz-border-radius-topleft:0;-webkit-border-bottom-left-radius:0; -webkit-border-top-left-radius:0;-moz-box-shadow:0 0 6px #ddd;-webkit-box-shadow:0 0 6px #ddd;}
.link-error{border-color:red;}li.more{display:none;}
.nav_pager {background: #EEE;border-top: 1px solid #999;padding: 5px;}.nav_pager a {padding: 0px 5px;color: #005BD8;}.nav_pager a.highlight {zoom: 1;color: black;font-weight: bold;}
</style>
<script>
var PID='${USER.pid}';
$(function(){
	initConvert();
});
</script>
<@xt.taoketemplate navselected='taoke' bdselected='taoke-convert' group=3>
<div id="convertWizard">
	<ul id="status"> 
		<li class="active"><strong>1.</strong> 填写淘宝商品链接</li> 
		<li><strong>2.</strong> 查看推广转换结果</li>
	</ul>
	<div class="items">
		<div class="step firstStep">
			<h2> 
				步骤 1: 填写淘宝商品链接(您每次最多可以转换10个淘宝链接)<a href="http://home.xintaonet.com/space.php?uid=1&do=blog&id=1652" target="_blank" style="position:absolute;right:0px;color:#F60;">查看帮助</a>
			</h2>
			<table><tr><td align=center><a href="#" id="firstNext" class="button">开始转换</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href="#" id="clearLinks" class="button">清空所有</a></td></tr>
			<tr><td><form id="linksForm"><ul id='links'> 
				<li><span class="num">1.</span><input class="link" num="1"></li>
				<li><span class="num">2.</span><input class="link" num="2"></li>
				<li><span class="num">3.</span><input class="link" num="3"></li>
				<li><span class="num">4.</span><input class="link" num="4"></li>
				<li><span class="num">5.</span><input class="link" num="5"><a href="#" id="linksMore">显示更多</a></li>
				<li class="more"><span class="num">6.</span><input class="link" num="6"></li>
				<li class="more"><span class="num">7.</span><input class="link" num="7"></li>
				<li class="more"><span class="num">8.</span><input class="link" num="8"></li>
				<li class="more"><span class="num">9.</span><input class="link" num="9"></li>
				<li class="more"><span class="num">10.</span><input class="link" num="10"></li>
			</ul></form>
			<div style="clear:both"></div></td></tr></table>
			 
		</div> 
		<div class="step secondStep"> 
			<h2> 
				步骤 2: 查看推广转换结果<a href="#" class="prev" style="position:absolute;right:0px;color:#F60;">返回上一步</a>
			</h2>
			<div id="secondStepDiv">
			</div>
			<ul> 
				<li class="clearfix"> 
					<a href="#" id="secondPre" class="button prev">上一步</a>
				</li> 
				<br clear="all" /> 
			</ul> 
		</div> 
	</div>  
</div> 
</@xt.taoketemplate>