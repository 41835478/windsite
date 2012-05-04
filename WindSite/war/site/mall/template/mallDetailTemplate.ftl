<#assign mallTitle=mall.title?replace('CPS|ROI|CPA|CPC','','ir')>
<script>
$(function(){
	var reg=/CPS|ROI|CPA|CPC/gi;
	<#if '5549'==mall.b2cId>
	$('#J_MallFirst,#J_MallGo').attr('href','http://s.click.taobao.com/t_9?p='+PID+'&l=http://www.tmall.com');
	<#else>
	$.getJSON('/router/ymall/action/${mall.b2cId}?v=' + Math.random(),
			function(d) {
				if(d&&d.length>0){
					try{
						//$('#J_MallFirst,#J_MallGo').attr('href',d[0].pk.clickUrl);
						if(d.length>1){//仅有一个活动
							var str=[];
							str.push('<li>主　营：');
							for(var i=0;i<d.length;i++){
								if(d[i].title){
									str.push('　<a target="_blank" class="zhuying" href="');
									str.push(d[i].pk.clickUrl);
									str.push('">');
									str.push(d[i].title.replace(reg,''));
									str.push('</a>　|');
								}
							}
							str.push('</li>');
							$('#J_MallInfo').append(str.join(''));
						}
					}catch(e){
					}
				}
			});
	</#if>
});
</script>
<div class="layout grid-m ks-clear">
	<div class="col-main">
		<div class="main-wrap J_TRegion">
			<div name="shopCustom" class="box J_TBox ks-clear">
				<div class="shop-custom no-border">
					<div class="bd">
						<div class="custom-area">
							<div class="main_curpath"><h3>您的当前位置：<a href="/" target="_self">首页</a> &gt; <a href="/ymall.html" title="商城大全">商城大全</a> &gt; <#if cat??><a href="/ymall.html?cat=${cat.id}">${cat.title}</a> &gt; </#if>${mallTitle}</h3></div>
							<div class="store_show_box">
							    <div class="store_show_box_logo">
									<p class="t1"><a target="_blank"><img src="${mall.logo}" class="pic" alt="${mallTitle}"></a></p><p class="t4"><a href="/ymall-go-${mall.b2cId}.html" target="_blank" id="J_MallFirst"><img src="/assets/min/stylesheets/images/dinggou.gif" class="jump" alt="${mallTitle}"></a></p>
								</div>
								<div class="store_show_box_info">
									<ul id="J_MallInfo">
										<li>商家名称：<h1 style="font-size:16px;"><a href="/ymall-go-${mall.b2cId}.html" id="J_MallGo" title="${mallTitle}">${mallTitle}</a></h1></li>
										<li>${mallTitle}简介：<span style="color:#999;"><#if detail??>${detail.description}</#if></span></li>
									</ul>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
<div class="layout grid-m0s5 ks-clear">
	<div class="col-main">
		<div class="main-wrap J_TRegion"> 
			<div name="shopB2CMall" class="box J_TBox ks-clear">
				<div class="shop-b2c-mall">
					<div class="hd"><h3><span>同类推荐</span></h3></div>
					<div class="bd">
						<#if malls??&&malls?size!=0>
						<ul>
						<#list malls as m>
						<#assign title=m.title?replace('CPS|ROI|CPA|CPC','','ir')>
						<li><a rel="nofollow" href="/ymall-${m.b2cId}.html" target="_blank"><img src="${m.logo}" width="120px" height="60px" alt="${title}" title="${title}"/></a><span class="b2c-fl">最高返利：<strong>${m.topRate}</strong></span></li>
						</#list>
						</ul>
						</#if>
					</div>
				</div>
			</div>
			<div name="shopB2CMall" class="box J_TBox ks-clear">
				<div class="shop-b2c-mall">
					<div class="hd"><h3><span>最新收录</span></h3></div>
					<div class="bd">
						<#if news??&&news?size!=0>
						<ul>
						<#list news as m>
						<#assign title=m.title?replace('CPS|ROI|CPA|CPC','','ir')>
						<li><a rel="nofollow" href="/ymall-${m.b2cId}.html" target="_blank"><img src="${m.logo}" width="120px" height="60px" alt="${title}" title="${title}"/></a><span class="b2c-fl">最高返利：<strong>${m.topRate}</strong></span></li>
						</#list>
						</ul>
						</#if>
					</div>
				</div>
			</div>
		</div>
	</div>
	<div class="col-sub J_TRegion">
		<div name="shopCategory" class="box J_TBox ks-clear">
			<div class="shop-category">
				<div class="hd"><h3><span>商城分类</span></h3></div>
				<div class="bd" style="padding:0px;">
				<#if cats??&&cats?size!=0>
					<ul id="J_Cats" class="cats J_TWidget">
						<#list cats as c>
						<li class="cat expand">
							<ul class="cat-bd">
								<li><a href="/ymall.html?cat=${c.id}">${c.title}</a></li>
							</ul>
						</li>
						</#list>
					</ul>
				</#if>	
				</div>
			</div>
		</div>
	</div>
</div>