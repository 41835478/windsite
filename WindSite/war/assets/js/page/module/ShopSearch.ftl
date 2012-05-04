<#setting url_escaping_charset='utf8'> 
	<#if isHeader??&&'true'==isHeader>
	<div class="shop-search-x">
	<div class="hd" style="display:none;"><h3><span>${title}</span></h3></div>
	<div class="bd">
		<div class="search-x">
			<div class="form">
				<form class="" name="SearchForm" action="/search" method="get" target="_blank">
					<input type="hidden" name="cid" value="0">
					<label for="J_ShopSKey"></label>
					<input id="J_ShopSKey" name="q" type="text" class="text J_SEKeyword" value="" onfocus="this.select();">
					<button type="submit" class="button">搜 索</button>
				</form>
			</div>
			<#if words??&&''!=words>
			<#assign hotWords=words?split(',')>
			<#if hotWords?size!=0>
			<div class="keys">
			热门搜索：
			<#list hotWords as h>
				<a href="/search?q=${h?url}" target="_blank">${h}</a>
			</#list>
			</div>
			</#if>
			</#if>
		</div>
	</div>
	</div>
	<#else>
	<div class="shop-search">
	<div class="hd" <#if 'false'==isHd>style="display:none;"</#if>><h3><span>${title}</span></h3></div>
	<div class="bd">
		<div class="search-form">
			<form name="SearchForm" action="/search" method="get" target="_blank">
				<input type="hidden" name="cid" value="0">
				<ul>
					<li class="keyword"><label for="keyword">关键字：</label><input type="text" size="18" name="q" id="KeywordBox" value="" onfocus="this.select();"></li>
					<#if !(isprice??&&'false'==isprice)><li class="price"><label for="price">价格：</label><input id="price1" type="text" name="start_price" class="price J_CheckInput" size="4" value="">到<input id="price2" name="end_price" class="price J_CheckInput" type="text" size="4" value=""></li></#if>
					<li class="submit"><button type="submit" class="button">搜索</button></li>
					<#if words??&&''!=words>
					<#assign hotWords=words?split(',')>
					<#if hotWords?size!=0>
					<li class="hotkeywords">
						<label>热门：</label>
						<#list hotWords as h>
						<a href="/search?q=${h?url}" target="_blank">${h}</a>
						</#list>
					</li>
					</#if>
					</#if>
				</ul>
			</form>
		</div>
	</div>
	</div>
	</#if>
