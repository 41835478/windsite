<div id="copyright" class="layout grid-m">
	<div class="col-main">
		<div class="main-wrap J_TRegion">
			<div class="box J_TBox">
				<div class="shop-custom no-border">
					<div class="bd">
						<div class="custom-area">
							<#if (versionNo??&&(versionNo>1))>
							<div style="width:auto; text-align:center; margin:10px auto; height:50px;">
								<!--<img src="http://static.xintaonet.com/assets/min/stylesheets/images/fot_1.jpg">-->
								<img src="http://static.xintaonet.com/assets/min/stylesheets/images/fot_2.jpg">
								<img src="http://static.xintaonet.com/assets/min/stylesheets/images/taoke.gif">
								<img src="http://static.xintaonet.com/assets/min/stylesheets/images/fot_3.jpg">
								<img src="http://static.xintaonet.com/assets/min/stylesheets/images/fot_4.jpg">
							</div>
							<div style="width:auto; text-align:center; margin:10px auto; height:50px;">
								<img src="http://static.xintaonet.com/assets/min/stylesheets/images/buliang.gif">
								<img src="http://static.xintaonet.com/assets/min/stylesheets/images/bottom.gif">
								<img src="http://static.xintaonet.com/assets/min/stylesheets/images/110.jpg">
								<img src="http://static.xintaonet.com/assets/min/stylesheets/images/315online.gif">
							</div>
							</#if>
							<p>
								<#if (versionNo??&&(versionNo>1))&&friendLinks??&&friendLinks?size!=0>
									<#list friendLinks as t>
										<a target="_blank" href="<#if t.url?starts_with('/')>http://${www}${t.url}<#else>${t.url}</#if>">${t.title}</a>&nbsp;&nbsp;&nbsp;<#if t_index==9><br/></#if>
									</#list>
								<#else>
									<#if (versionNo??&&versionNo>=1.6&&channels??&&channels?size!=0)>
									<#list channels as t>
									<a target="_blank" href="/channel/${t.value}.html">${t.name}</a>&nbsp;&nbsp;&nbsp;<#if t_index==9><br/></#if>
									</#list>
									<#else>
									<a href="http://www.xintaonet.com">新淘网</a>&nbsp;&nbsp;&nbsp;
									<a href="http://www.xintaonet.com">广告服务</a>&nbsp;&nbsp;&nbsp;
									<a href="http://www.xintaonet.com/router/site/view/about">关于我们</a>&nbsp;&nbsp;&nbsp;
									<a href="http://www.xintaonet.com/router/site/view/support">联系我们</a>&nbsp;&nbsp;&nbsp;
									Powered by <a href="http://www.xintaonet.com" target="_blank">www.xintaonet.com</a>&nbsp;&nbsp;&nbsp;
									</#if>
								</#if>
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>