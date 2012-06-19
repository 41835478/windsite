<style>#channel-nav{background: #FED98A;}.rc-tp,.bd {background: url(http://static.xintaonet.com/assets/min/images/shops_header_bg.png) no-repeat -999em 0px;}.rc-tp{background-position: -96px -428px;display: block;height: 30px;margin-bottom: -30px;position: relative;}.rc-bt {background-position: -96px -424px;display: block;height: 4px;margin-top: -4px;position: relative;}.bd {background-position: 0px -459px;background-repeat: repeat-x;border-bottom: none;border: 1px #F69968;height: 33px;}.trade {float: left;font-size: 14px;line-height: 33px;margin-top: 3px;overflow: hidden;padding-left: 5px;position: relative;}
#channel-nav ul{list-style:none;margin:5px;margin-top:0px;}#channel-nav li{float:left;background-position: 100% -523px;color: white;height: 30px;margin: 0px -2px 0px 2px;}#channel-nav dd{float: left;}#channel-nav li a{color:white;float: left;font-weight: 700;padding: 0px 0px 0px 7px;background: url(http://static.xintaonet.com/assets/min/images/shops_header_bg.png) no-repeat -999em 0px;}#channel-nav li a:hover{color: #FFEA00;}.cats_list li a:hover{color:#F60;}#channel-nav li a span{font-size:12px;cursor: pointer;float: left;height: 30px;line-height: 28px;overflow: hidden;padding: 0px 10px 0px 0px;background: url(http://static.xintaonet.com/assets/min/images/shops_header_bg.png) no-repeat -999em 0px;}</style>
<div id="channel-nav"> <span class="rc-tp"><span></span></span> <div class="bd"> <dl class="trade"> <dt style="display:none;">交易</dt> <dd> <ul> 
<#if versionNo??&&(versionNo>=2)&&www??&&www!=''&&navLinks??&&navLinks?size!=0>
<#list navLinks as t><li><a target="_blank" href="<#if t.url?starts_with('/')>http://${www}${t.url}<#else>${t.url}</#if>">${t.title}</a></li><#if (t_index>8)><#break></#if></#list>
<#else>
<li><a target="_blank" href="/"><span>首页</span></a></li>
<li><a target="_blank" href="/zone/channel/channel.html?channel=channelcode&pid=${pid}"><span>综合频道</span></a></li>
<li><a target="_blank" href="/zone/channel/channel.html?channel=channelmall&pid=${pid}"><span>商城频道</span></a></li>
<li><a target="_blank" href="/zone/channel/channel.html?channel=lady&pid=${pid}"><span>女人频道</span></a></li>
<li><a target="_blank" href="/zone/channel/channel.html?channel=man&pid=${pid}"><span>男人频道</span></a></li>
<li><a target="_blank" href="/zone/channel/channel.html?channel=beauty&pid=${pid}"><span>美容频道</span></a></li>
<li><a target="_blank" href="/zone/channel/channel.html?channel=jewelry&pid=${pid}"><span>饰品鞋包</span></a></li>
<li><a target="_blank" href="/zone/channel/channel.html?channel=digital&pid=${pid}"><span>数码频道</span></a></li>
<li><a target="_blank" href="/zone/channel/channel.html?channel=food11&pid=${pid}"><span>食品频道</span></a></li>
<li><a target="_blank" href="/zone/channel/channel.html?channel=baby&pid=${pid}"><span> 居家玩具</span></a></li>
<li><a target="_blank" href="/zone/channel/channel.html?channel=electric&pid=${pid}"><span>电器城</span></a></li>
<li><a target="_blank" href="/zone/channel/channel.html?channel=taiwan&pid=${pid}"><span>台湾馆</span></a></li>
<li><a target="_blank" href="/zone/channel/channel.html?channel=channelfy&pid=${pid}"><span>淘宝风云榜</span></a></li> 
</#if>
</ul> </dd> </dl></div> <span class="rc-bt"><span></span></span></div>