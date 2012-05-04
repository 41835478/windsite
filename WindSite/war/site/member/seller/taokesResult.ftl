<#if taokes??&&taokes?size!=0>
<script>
$(function(){
	$('.page-number').click(function(){
			taokeSearch($('#q').val(),$('#cat').val(),$('a',$(this)).text());
			return false;
		});
	$('.pgNext').click(function(){
		if(!$(this).hasClass('pgEmpty')){
			taokeSearch($('#q').val(),$('#cat').val(),$(this).attr('page'));
		}
		return false;
	});
	$('.why_d .addHomeFriend').click(function() {
		var overlay = $('#operate-overlay').overlay({
				api : true,
				mask : {
					color : '#fff',
					loadSpeed : 0,
					opacity : 0.5
				},
				closeOnClick : false,
				load : true
			});
		var self = $(this);
		addHomeFriend($(this).attr('uid'), $(this).attr('fuid'), '',
				function() {
					overlay.close();
					self.parent().empty().append('等待好友验证');
				},function(){
					overlay.close();
				});
	});		
})
</script>
<div style="float:right;"><@ws.pager pageNo=(page.pageNo?number) pageSize=page.pageSize?number pageCount=page.totalPageCount></@ws.pager></div>
<#list taokes as t>
<#if (t.uc_id??&&t.uc_id!='')>
<div class="why_d">
<div class="l"><div class="l50_s"><a href="http://home.xintaonet.com/?${t.uc_id}" target="_blank" title="${t.nick}"><img src="http://www.xintaonet.com/discuz72/uc_server/avatar.php?uid=${t.uc_id}" width="50" height="50"></a></div></div>
<div class="l" style="margin-left:5px;"><p class="ts41p f12"> <a href="http://home.xintaonet.com/?${t.uc_id}" class="sl" target="_blank" title="${t.nick}">${t.nick}</a></p>
<div class="c9" style="width:220px;margin-top:10px;"><p style=""><a target="_blank" title="${t.nick}" href="http://amos1.taobao.com/msg.ww?v=2&uid=${t.nick}&s=1" ><img border="0" src="http://amos1.taobao.com/online.ww?v=2&uid=${t.nick}&s=1" alt="${t.nick}" /></a></p></div>
</div>
<div class="l c9" style="margin-top:25px;width:300px">
<div class="l"><span>站点：</span><span style="font-family:Arial;color:#8692A2;font-size:14px;" title=""><b><#if 1==t.status><a href="http://<#if t.www??&&''!=t.www>${t.www}<#else>${t.domainName}.xintaonet.com</#if>" target="_blank">${t.title}</a><#else>尚未发布</#if></b></span></div>
<div class="c"></div>
</div>
<div class="r" style="margin-top:25px;">
<#if USER.uc_id??>
	<#if t.uc_id??>
		<#if USER.uc_id!=t.uc_id>
			<#if friendIds??&&friendIds?contains('['+t.uc_id+']')>我的家园好友
				<#elseif unFriendIds??&&unFriendIds?contains('['+t.uc_id+']')>等待好友验证
				<#else><a href="#" uid="${USER.uc_id}" fuid="${t.uc_id}" class="addHomeFriend">加为家园好友</a>
			</#if>
			<#else>本人
		</#if>
		<#else>此会员尚未激活家园
	</#if>
	<#else>您尚未激活家园
	</#if>
</div>
<div class="c"></div>
</div>
<#else>
<div class="why_d">
<div class="l"><div class="l50_s"><img src="http://www.xintaonet.com/discuz72/uc_server/images/noavatar_middle.gif" width="50" height="50"></div></div>
<div class="l" style="margin-left:5px;"><p class="ts41p f12">${t.nick}</p>
<div class="c9" style="width:220px;"><p style="">买家信用:<span class="star_com"><#if t.level??><img src="/assets/min/images/credit/<@ws.credit t.level></@ws.credit>.gif"/></#if></span></p></div>
<div class="c9" style="width:220px;margin-top:10px;"><p><a target="_blank" title="${t.nick}" href="http://amos1.taobao.com/msg.ww?v=2&uid=${t.nick}&s=1" ><img border="0" src="http://amos1.taobao.com/online.ww?v=2&uid=${t.nick}&s=1" alt="联系站长-${t.nick}" /></a></p></div>
</div>
<div class="l c9" style="margin-top:25px;">
<div class="l"><span>站点：</span><span style="font-family:Arial;color:#8692A2;font-size:14px;" title=""><b><#if 1==t.status><a href="http://<#if t.www??&&''!=t.www>${t.www}<#else>${t.domainName}.xintaonet.com</#if>" target="_blank">${t.title}</a><#else>尚未发布</#if></b></span></div>
<div class="c"></div>
</div>
<div class="r" style="margin-top:25px;">
<#if USER.uc_id??>
	<#if t.uc_id??>
		<#if USER.uc_id!=t.uc_id>
			<#if friendIds??&&friendIds?contains('['+t.uc_id+']')>我的家园好友
				<#elseif unFriendIds??&&unFriendIds?contains('['+t.uc_id+']')>等待好友验证
				<#else><a href="#" uid="${USER.uc_id}" fuid="${t.uc_id}" class="addHomeFriend">加为家园好友</a>
			</#if>
			<#else>本人
		</#if>
		<#else>此会员尚未激活家园
	</#if>
	<#else>您尚未激活家园
	</#if>
</div>
<div class="c"></div>
</div>
</#if>
</#list>
<#else>
抱歉！没有找到符合条件的淘宝客
</#if>