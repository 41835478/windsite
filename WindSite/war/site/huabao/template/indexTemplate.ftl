<#if bigs??&&bigs?size!=0&&smalls??&&smalls?size!=0&&bigs?size==smalls?size&&recommands??&&recommands?size!=0>
<div class="box J_TBox ks-clear">
	<div class="shop-complex-a">
		<div class="bd" data-lazy="false" style="color: #B0AEAE;border-color: #B0AEAE;background-color: #494949;">
			<table width=100%><tbody>
				<tr><td width=680px valign="top">
					<div id="carrousel-box">
		                <div class="carrousel-wrap" style="position: relative;overflow: hidden;">
		                    <ul class="carrousel-images clearfix img-638-369" style="width: 20000em;position: absolute;clear: both;">
		                    	<#list bigs as b>
								<li <#if b_index==0>class="current"</#if>><div><a target="_blank" href="<#if b.id??&&''!=b.id>/huabao/${b.id}.html<#else>javascript:;</#if>"><img src="${b.pic}" alt=""></a></div></li>
		                        </#list>
		                    </ul>
		                </div>
		                <ol class="carrousel-indicator clearfix img-107-65">
		                	<#list smalls as s><li><span class="hover-icon"></span><img src="${s}" alt=""></li></#list>	
		                </ol>
		            </div>
				</td><td width=270px valign="top" style="background-color:#373737;padding-top:10px;color:#B0AEAE;">
					<h3 style="font-size: 14px;line-height: 1em;padding-left: 10px;padding-bottom:10px;">今日推荐画报</h3>
					<div class="grid grid-100">
						<ul class="shop-list" style="margin-top:0px;">
						<#list recommands as d>
						<#assign pic=d.coverUrls>
						<#if d.coverUrls?contains(',')><#assign pic=d.coverUrls?split(',')[0]></#if>
							<li style="height:140px;">
							<div class="item">
								<div class="pic"><a target="_blank" href="/huabao/${d.id}.html" title="${d.title}"><img src="${pic}" alt="${d.title}" width=100px height=100px></a></div>
								<div class="desc"><a target="_blank" href="/huabao/${d.id}.html" class="permalink">${d.shortTitle}</a></div>
							</div>
							</li>
							<#if d_index==5><#break></#if>
						</#list>
						</ul>
					</div>
				</td></tr>
			</tbody>
		</table>
	</div>
</div>
</div>
</#if>
<@hb.huabaoComplexB posters=fashion hd="fashion" posterChannel="服饰"></@hb.huabaoComplexB>
<@hb.huabaoComplexB posters=man hd="man" posterChannel="男人"></@hb.huabaoComplexB>
<@hb.huabaoComplexB posters=life hd="life" posterChannel="居家"></@hb.huabaoComplexB>
<@hb.huabaoComplexB posters=lady hd="lady" posterChannel="女人"></@hb.huabaoComplexB>
<@hb.huabaoComplexB posters=baby hd="baby" posterChannel="亲子"></@hb.huabaoComplexB>
<@hb.huabaoComplexB posters=star hd="star" posterChannel="明星"></@hb.huabaoComplexB>
<@hb.huabaoComplexB posters=idea hd="idea" posterChannel="创意站"></@hb.huabaoComplexB>
