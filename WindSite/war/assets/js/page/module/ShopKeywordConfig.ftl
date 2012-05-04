<style>.keyword-cats {border-bottom: 1px solid #E9E9E9;line-height: 23px;margin: 0px 15px;padding: 5px 0px;}.keyword-cats dt {color: black;float: left;text-align:right;font-weight: bold;width: 80px;}
.keyword-cats dd {float: left;padding-left: 10px;width: 600px;}</style>
<div class="keyword-cats">
<div class="help_info" align="left" style="position:relative;">
<h3>您最多可以选择<strong id="keyword-cids-limit"><#if layout??><#if '3'==layout>8<#else>6</#if><#else>6</#if></strong>个关键词分类</h3>
</div>
<div>
<#if cats??&&cats?size!=0>
<#list cats as p>
<#if p.cats??&&p.cats?size!=0>
<dl class="ks-clear">
<dt data-value="1">${p.name}</dt>
<dd><span style="display:block;"><#list p.cats as c><span style="margin-right:10px;"><input type="checkbox" name="keyword-cids-checkbox" value="${c.id}">${c.name}<#if c.hasNext> |</#if></span></#list></span></dd>
</dl>
</#if>
</#list>
<#else>
为查找到关键词分类
</#if>
</div>
<div><strong style="width:80px;display:inline-block;color: black;text-align:right;">类型：</strong><input type="radio" name="keyword-sort-radio" value="idxChg" checked/>飙升<input type="radio" name="keyword-sort-radio" value="idxRank"/>热搜</div>
</div>