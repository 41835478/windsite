<script type="text/javascript">
$(function() {
			$('#uc-blogs-page a').click(function() {
						getBlogs($(this).attr('classid'), $(this).attr('pageNo'), $(this).attr('pageSize'));
					});
			$('#uc-blogs-refresh').click(function(){
				getBlogs(-1, 1, 15);
			});		
		});
</script>
<#if error??>
	<!--${error}:<a id="uc-blogs-refresh" style="font-weight:bold;color:00E;">刷新</a>-->
</#if>
<#if page??&&(page.totalPageCount>1)>
<li id="uc-blogs-page" style="float:none;margin-bottom:10px;">
<#list 0..(page.totalPageCount-1) as i>
	&nbsp;
	<#if page.pageNo==(i+1)>
	<span>${i+1}<span>
	<#else>
	<a classid='${classid}' pageNo='${i+1}' pageSize='${page.pageSize}'>${i+1}</a>
	</#if>
	
</#list>
</li>
</#if>
<#if blogs??&&(blogs?size>0)>
<#list blogs as b>
<li><input type="checkbox" name="uc-blogs-blog" uid='${b.uid}' bid='${b.blogid}' title='${b.subject}'>${b.subject}</li>
</#list>
<#else>
<dt>抱歉，您在新淘家园中没有日志！现在去写日志：<a style="font-weight:bold;color:#00E;" href="/router/site/loginuc?redirect=http://home.xintaonet.com" target="_blank">新淘家园</a></dt>
</#if>