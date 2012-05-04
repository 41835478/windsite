<script>
$(function() {
			initPlanWizard();
		})
</script>
<div id="planWizard">
<div id="operate-overlay"><h2>正在操作中,请稍候...</h2></div>
<input type="hidden" id="planId" value="<#if plan??>${plan.id}</#if>"/>
	<ul id="status">
		<li><a href="/router/member/selleradsmanager/plan/blog" style="color:#f60;">返回广告列表</a></li>
		<li class="active"><strong>1.</strong>填写计划信息</li> 
		<li><strong>2.</strong> 选择推广商品</li> 
	</ul>
	<div class="items">
		<div class="step firstStep">
			<h2> 
				步骤 1: 填写计划信息
			</h2>
			<table>
			<tr><td width=100px height=50px><label for="planName"><span class="red">*</span>广告名称:</label></td><td><input style="padding:2px;width:300px;" name="planName" id="planName" value="<#if plan??>${plan.name}</#if>"/><em>广告计划的名称，长度不能超过30</em></td></tr>
			<tr><td width=100px height=60px><label for="planCid"><span class="red">*</span>分类:</label></td><td><select id="planCid" name="planCid" style="width:200px;"><option value="0">所有分类</option><#list cats as c><#if plan??&&c.cid==plan.cid><option value="${c.cid}" selected>${c.name}</option><#else><option value="${c.cid}">${c.name}</option></#if></#list></select><em>广告计划的推广分类，可以帮助更精确的投放</em></td></tr>
			<tr><td width=100px height=60px><label for="planTags"><span class="red">*</span>标签:</label></td><td><input style="padding:2px;width:300px;" name="planTags" id="planTags" value="<#if plan??>${plan.tags}<#else>例：减肥 数码 衬衫</#if>"/><em>标签用来匹配合适的网站，提高投放精准度，最多输入8个标签，每个标签2-8个字，标签间使用空格分隔</em>
			<#if tags??&&tags?size!=0><br/><em style="color:black;">我常用的标签:<span style="color:grey;">点击贴到输入框中</span></em>
			<ul class="planTags"><#list tags as t><li>${t.name}</li></#list></ul>
			</#if></td></tr>
			<tr><td width=100px height=60px><label for="planIsDefault">是否主推:</label></td><td><input type="checkbox" id="planIsDefault" <#if plan??><#if plan.isDefault>checked</#if></#if>/><em>系统每天将为主推计划提供50个随机首页展示位,同时只可以设置一个主推计划,如果已经设置了主推,新的主推计划将再第二天生效</em></td></tr>
			<tr><td width=100px height=30px><label for="planDesc">描述信息:</label></td><td><textarea id="planDesc" rows="4" cols="50"><#if plan??>${plan.description}</#if></textarea><em>广告计划的描述信息,长度最多80</em></td></tr>
			<tr><td width=100px height=30px><a href="/router/member/selleradsmanager/plan/blog" class="button">返回</a></td><td><a href="#" id="firstNext" class="button">下一步</a> </td></tr>
			</table>
		</div> 
		<div class="step secondStep"> 
			<h2> 
				步骤 2: 选择推广商品【只能选择5个推广商品】<a href="#" class="prev" style="position:absolute;right:0px;color:#F60;">返回上一步</a>
			</h2>
			<div id="checkedItems"><ul class="itemSearchResult"><#if plan??&&plan.items??><#list plan.items as i>
			<li title="30天总销量:${i.volume}&#13;30天推广量:${i.commission_num}" nid="${i.num_iid}"><div class="pic" align="center"><img src="${i.pic_url?replace('bao/uploaded', 'imgextra')}_60x60.jpg" alt="${i.title}"/></div>
	<div class="item"><div class="title"><a onClick="_gaq.push(['_trackEvent', 'xt-${USER.pid}', 'item-d-${i.nick}-${i.num_iid}', '${i.title}']);" target="_blank" title="${i.title}">${i.title}</a></div>
	<div><span class="k">价格:</span><span class="v">${i.price}</span></div>
	<div><span class="k">佣金:</span><span class="v">${i.commission}</span></div><img class="customechecked" src="/assets/images/delete.gif"/></div>
	</li></#list></#if></ul></div>
			<div align="center" style="width:100%;height:30px;clear:both;"><input type="text" id="q" value="" style="padding:2px;width:300px;"><a id="itemSearchButton" class="button">搜索</a></div>
			<div id="itemSearchResult" style="width:100%;height:100%;"></div>
			<ul> 
				<li class="clearfix"> 
					<a href="#" id="secondPre" class="button prev">上一步</a>
					&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
					<a href="#" id="finish" class="button" ptype="blog">完成</a> 
				</li> 
				<br clear="all" /> 
			</ul> 
		</div> 
	</div>  
</div> 