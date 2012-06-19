<link type="text/css" href="http://static.xintaonet.com/assets/min/css/default_${layout}.css?v=${dateVersion()}" rel="stylesheet">
<div id="ew:container4MyTaobao4" class="expressway-mytaobao">
  <div class="ew-panel">
    <div class="ew-tab" id="ew:tabContainer0">
		<span class="tab_left"></span><span class="tab_right"></span>
        <ul class="ew-tab-menu">
		    <li class="logoLink"><a href="http://pindao.huoban.taobao.com/channel/channelCode.htm?pid=${pid}" target="_blank">&nbsp;&nbsp;</a></li>
	        <li class="ew-tab-item-1 selected" id="ew-tab-item1"><a onclick="toggleIframe('ew-tab-item1','tabPanel1');return false" href="http://chongzhi.huoban.taobao.com/mobile_card.php?css=${layout}&pid=${pid}&unid="><span>手机充值</span></a></li>
	        <li class="ew-tab-item-0" id="ew-tab-item0"><a onclick="toggleIframe('ew-tab-item0','tabPanel0');return false" href="http://chongzhi.huoban.taobao.com/game_card.php?css=${layout}&pid=${pid}&unid="><span>游戏快充</span></a></li>
	        <li class="ew-tab-item-2" id="ew-tab-item2"><a onclick="toggleIframe('ew-tab-item2','tabPanel2');return false" href="http://chongzhi.huoban.taobao.com/air_ticket.php?css=${layout}&pid=${pid}&unid="><span>机票</span></a></li>
       </ul>
    	<div class="ew-tab-panel ew-tab-panel-1" id="tabPanel1" style="display: block;">
    	   <iframe name="ew-frame" allowtransparency="allowTransparency" class="ew-frame" src="http://chongzhi.huoban.taobao.com/mobile_card.php?css=${layout}&pid=${pid}&unid=" frameborder="0" scrolling="no"></iframe>
    	</div>
        <div class="ew-tab-panel ew-tab-panel-0" id="tabPanel0" style="display: none;">
    	   <iframe name="ew-frame" class="ew-frame" src="http://chongzhi.huoban.taobao.com/game_card.php?css=${layout}&pid=${pid}&unid=" allowtransparency="allowTransparency" frameborder="0" scrolling="no"></iframe>
    	</div>
        <div class="ew-tab-panel ew-tab-panel-2" id="tabPanel2" style="display: none;">
    	   <iframe name="ew-frame" class="ew-frame" src="http://chongzhi.huoban.taobao.com/air_ticket.php?css=${layout}&pid=${pid}&unid=" allowtransparency="allowTransparency" frameborder="0" scrolling="no"></iframe>
    	</div>
    </div>
 </div>
</div>