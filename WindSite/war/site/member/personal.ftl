<@ws.header>
<meta name="keywords" content="新淘网,淘宝,淘客,淘宝客,购物,自助建站,电子商务,网赚">
<meta name="description" content="新淘网 - 我的新淘网,我的淘站,收入报表,淘站卫士,个人信息,好友列表,我的推广组">
<title>我的新淘网- 新淘网</title>
</@ws.header>
<style>
#sidebar {width: 140px;margin: 0px;}ul {list-style: none;margin: 0;padding: 0;}	
#sidebar li a {height: 32px;height: 24px;text-decoration: none;}
#sidebar li a:link, #sidebar li a:visited {color: #656556;display: block;background:  url(/assets/images/sidebar.gif);padding: 8px 0 0 20px;}
#sidebar li a:hover,#sidebar li a.selected {color: #474739;background:  url(/assets/images/sidebar.gif) 0 -32px;padding: 8px 0 0 20px;}

</style>
<script type="text/javascript">
	$(function() {
		$("#personA").click(function(){//个人信息
			getHtmlPersonal('${USER.user_id}',0);
			$('#sidebar li a').removeClass('selected');
			$(this).addClass('selected');
		});
		$("#friendsA").click(function(){//好友列表
			getHtmlFriends();
			$('#sidebar li a').removeClass('selected');
			$(this).addClass('selected');
		});
		$("#reportA").click(function(){//收入报表
			getHtmlReport();
			$('#sidebar li a').removeClass('selected');
			$(this).addClass('selected');
		});
		$("#sitesA").click(function(){//我的淘站
			getHtmlSites();
			$('#sidebar li a').removeClass('selected');
			$(this).addClass('selected');
		});
		$("#shopsA").click(function(){//店铺收藏
			getHtmlShops();
			$('#sidebar li a').removeClass('selected');
			$(this).addClass('selected');
		});
		$("#doctorA").click(function(){//淘站卫士
			getHtmlDoctor();
			$('#sidebar li a').removeClass('selected');
			$(this).addClass('selected');
		});
		$("#itemGroupsA").click(function(){//我的推广组
			getHtmlItemGroups();
			$('#sidebar li a').removeClass('selected');
			$(this).addClass('selected');
		});
		$("#sellerAdsItemsA").click(function(){//卖家推广统计
			getHtmlSellerAdsItems();
			$('#sidebar li a').removeClass('selected');
			$(this).addClass('selected');
		});
		$("#xintaoFyA").click(function(){//新淘排行榜
			getHtmlXintaoFy();
			$('#sidebar li a').removeClass('selected');
			$(this).addClass('selected');
		});
		$("#creditsA").click(function(){//兑换中心
			getHtmlCredits();
			$('#sidebar li a').removeClass('selected');
			$(this).addClass('selected');
		});
		$("#onlineMembersA").click(function(){//在线会员列表
			getHtmlOnlineMembers();
		});
		var goto = $.url.param("goto");
		var pindex = $.url.param("pindex");
		var isUpdate = $.url.param("isUpdate");
		var sindex = $.url.param("sindex");
		var gid= $.url.param("gid");
		if($.url.param("goto")){
			switch(goto){
				case "person"://个人信息
					if(pindex){
						getHtmlPersonal('${USER.user_id}',pindex);
					}else{//没有指定用户,则显示当前用户个人信息
						getHtmlPersonal('${USER.user_id}',0);
					}
					$("#personA").removeClass('selected').addClass('selected');
					break;
				case "friends"://好友列表
					getHtmlFriends();break;
					$("#friendsA").removeClass('selected').addClass('selected');
				case "report"://收入报表
					getHtmlReport();break;
					$("#reportA").removeClass('selected').addClass('selected');
				case "sites"://我的淘站
					if(sindex){
						getHtmlSites(sindex);
					}else{
						if(isUpdate){
							getHtmlSites(0,true);
						}else{
							getHtmlSites();
						}
					}
					$("#sitesA").removeClass('selected').addClass('selected');
					break;
				case "doctor"://淘站卫士
					getHtmlDoctor();
					$("#doctorA").removeClass('selected').addClass('selected');
					break;
				case "xintaoFy"://新淘排行榜
					getHtmlXintaoFy();
					$("#xintaoFyA").removeClass('selected').addClass('selected');
					break;	
				case "credits"://兑换中心
					getHtmlCredits();
					$("#creditsA").removeClass('selected').addClass('selected');
					break;		
				case "shops"://店铺收藏
					getHtmlShops();
					$("#shopsA").removeClass('selected').addClass('selected');
					break;	
				case "onlineMembers"://在线会员列表
					getHtmlOnlineMembers();
					$("#onlineMembersA").removeClass('selected').addClass('selected');
					break;		
				case "itemGroups"://推广组
					if(gid){//如果指定推广组,则显示当前推广组
						getHtmlItemGroup(gid);
					}else{//如果未指定推广组,则显示所有推广组
						getHtmlItemGroups();
					}
					$("#itemGroupsA").removeClass('selected').addClass('selected');
					break;
				case "sellerAdsItems"://推广统计
					getHtmlSellerAdsItems();
					$("#sellerAdsItemsA").removeClass('selected').addClass('selected');
					break;	
				default://缺省我的淘站		
					getHtmlSites();
					$("#sitesA").removeClass('selected').addClass('selected');			
			}
		}else{
			if(sindex){
				getHtmlSites(sindex);
			}else{
				if(isUpdate){
					getHtmlSites(0,true);
				}else{
					getHtmlSites();
				}
			}
			$("#sitesA").removeClass('selected').addClass('selected');		
		}
	});
</script>	
<div class="ui-widget-content ui-corner-all" style="width:950px;height:100%;" align="left">
<table>
	<tr>
		<td width=140px; valign="top">
			<div id="sidebar">
				<ul>
					<li><a href="#" id="sitesA" title="查看并管理我的淘站">我的淘站</a></li>
					<li><a href="#" id="shopsA" title="查看并管理我收藏的淘宝店铺">店铺收藏</a></li>
					<li><a href="#" id="reportA" title="查看我的淘宝客收入">收入报表</a></li>
					<li><a href="#" id="doctorA" title="查看我的淘站健康度">淘站卫士</a></li>
					<li><a href="#" id="personA" title="查看我在淘宝的个人信息和店铺信息">个人信息</a></li>
					<li><a href="#" id="creditsA" title="论坛积分和家园积分兑换奖励">兑换中心</a></li>
					<!--<li><a href="#" id="friendsA" title="查看我在淘江湖的好友列表">好友列表</a></li>-->
					<li><a href="#" id="itemGroupsA" title="查看我的自定义商品推广组">我的推广组</a></li>
					<li><a href="#" id="xintaoFyA" title="查看新淘网商品和店铺排行榜">新淘排行榜</a></li>
					<#if USER.role=="admin"||USER.role=="seller">
					<li><a href="#" id="sellerAdsItemsA" title="查看卖家在新淘网中商品推广统计">卖家推广统计</a></li>
					</#if>
				</ul>
			</div>
		</td>
		<td width=100% height=100% valign=top>
			<div id="rightContent" style="min-height:400px;height:100%">
			</div>
		</td>
	</tr>
</table>
</div>
<#include "/site/template/footer.ftl">