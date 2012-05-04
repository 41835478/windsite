<style>.path{color:#347ABA;cursor:pointer;}.path:hover{color: #FF8400;}</style>

<script type="text/javascript" src="/assets/js/site/shop.js"></script>
<script>
$(function() {
$('#myFavoriteShop').click(function(){
	getHtmlShops();
});
$('#searchShopsButton').button();
$('#schContent').click(function(){
		if(''==$(this).val()){
			$('#schLabel').text('');
		}
	}).blur(function(){
		if(''==$(this).val()){
			$('#schLabel').text('输入您想要的店铺名或掌柜名');
		}
	});
});
</script>
<div class="search_con">
当前位置:<a class="path" id="myFavoriteShop" style="color:#347ABA;">我的店铺收藏</a>><span>选择类目</span>
<br/>
<br/>  
   <!--<select id='selectShopsType'  name="selectObj" style="height:21px;"> 
		<option  value="nick" >搜索卖家</option> 
		<option  value="title" >搜索店铺</option> 
	</select>--> 
	<div  style="position:relative;">
	 <label for="schContent" id="schLabel" style="position:absolute;left:5px;top:8px;color: #BABABA;z-index: 2;cursor: text;">输入您想要的店铺名或掌柜名</label>
    <input id='schContent' name="textfield" type="text" value=""  class="txt_sea" style="height:19px;" size="52"  maxLength="50"/> 
    <select id='selectType'  name="select" style="height:21px;"> 
   		 <option typeid="14"  value="14" selected>女装/流行女装</option> 
  	   <option typeid="35"  value="35" >网络游戏点卡</option> 
  	   <option typeid="1048"  value="1048" >3C数码配件市场</option> 
  	   <option typeid="1106"  value="1106" >运动鞋</option> 
  	   <option typeid="36"  value="36" >网络游戏装备/游戏币/帐号/代练</option> 
  	   <option typeid="1047"  value="1047" >鲜花速递/蛋糕配送/园艺花艺</option> 
  	   <option typeid="1104"  value="1104" >个人护理/保健/按摩器材</option> 
  	   <option typeid="1046"  value="1046" >家用电器/hifi音响/耳机</option> 
  	   <option typeid="33"  value="33" >音乐/影视/明星/乐器</option> 
  	   <option typeid="1105"  value="1105" >闪存卡/U盘/移动存储</option> 
  	   <option typeid="1045"  value="1045" >户外/军品/旅游/机票</option> 
  	   <option typeid="34"  value="34" >书籍/杂志/报纸</option> 
  	   <option typeid="1102"  value="1102" >腾讯QQ专区</option> 
  	   <option typeid="1103"  value="1103" >IP卡/网络电话/在线影音充值</option> 
  	   <option typeid="37"  value="37" >男装</option> 
  	   <option typeid="1049"  value="1049" >床上用品/靠垫/窗帘/布艺</option> 
  	   <option typeid="1050"  value="1050" >家具/家具定制/宜家代购</option> 
  	   <option typeid="1051"  value="1051" >保健品/滋补品</option> 
  	   <option typeid="1054"  value="1054" >饰品/流行首饰/时尚饰品</option> 
  	   <option typeid="1055"  value="1055" >女士内衣/男士内衣/家居服</option> 
  	   <option typeid="1052"  value="1052" >网络服务/电脑软件</option> 
  	   <option typeid="1053"  value="1053" >演出/旅游/吃喝玩乐折扣券</option> 
  	   <option typeid="1153"  value="1153" >运动服</option> 
  	   <option typeid="1154"  value="1154" >服饰配件/皮带/帽子/围巾</option> 
  	   <option typeid="22"  value="22" >汽车/配件/改装/摩托/自行车</option> 
  	   <option typeid="23"  value="23" >珠宝/钻石/翡翠/黄金</option> 
  	   <option typeid="1082"  value="1082" >流行男鞋/皮鞋</option> 
  	   <option typeid="24"  value="24" >居家日用/厨房餐饮/卫浴洗浴</option> 
  	   <option typeid="26"  value="26" >装潢/灯具/五金/安防/卫浴</option> 
  	   <option typeid="27"  value="27" >成人用品/避孕用品/情趣内衣</option> 
  	   <option typeid="29"  value="29" >食品/茶叶/零食/特产</option> 
  	   <option typeid="1040"  value="1040" >ZIPPO/瑞士军刀/饰品/眼镜</option> 
  	   <option typeid="1041"  value="1041" >移动联通充值中心/IP长途</option> 
  	   <option typeid="30"  value="30" >玩具/动漫/模型/卡通</option> 
  	   <option typeid="1042"  value="1042" >网店装修/物流快递/图片存储</option> 
  	   <option typeid="1043"  value="1043" >笔记本电脑</option> 
  	   <option typeid="32"  value="32" >宠物/宠物食品及用品</option> 
  	   <option typeid="1044"  value="1044" >品牌手表/流行手表</option> 
  	   <option typeid="31"  value="31" >箱包皮具/热销女包/男包</option> 
  	   <option typeid="17"  value="17" >数码相机/摄像机/图形冲印</option> 
  	   <option typeid="18"  value="18" >运动/瑜伽/健身/球迷用品</option> 
  	   <option typeid="1122"  value="1122" >时尚家饰/工艺品/十字绣</option> 
  	   <option typeid="15"  value="15" >彩妆/香水/护肤/美体</option> 
  	   <option typeid="16"  value="16" >电玩/配件/游戏/攻略</option> 
  	   <option typeid="13"  value="13" >手机</option> 
  	   
  	   <option typeid="11"  value="11" >电脑硬件/台式机/网络设备</option> 
  	   <option typeid="12"  value="12" >MP3/MP4/iPod/录音笔</option> 
  	   <option typeid="21"  value="21" >办公设备/文具/耗材</option> 
  	   <option typeid="20"  value="20" >古董/邮币/字画/收藏</option> 
  	   <option typeid="1062"  value="1062" >童装/婴儿服/鞋帽</option> 
  	   <option typeid="1020"  value="1020" >母婴用品/奶粉/孕妇装</option> 
  	   <option typeid="1056"  value="1056" >女鞋</option> 
  	</select> 
<input id="searchShopsButton" type="button" onclick="searchShopsByCats(1);return false;" value="搜索" class="btn_alltype_sea"/>
</div> 
</div> 
	<div class="shop_list"> 
</div>