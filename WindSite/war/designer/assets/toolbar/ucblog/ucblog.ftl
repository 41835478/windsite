<script type="text/javascript">
$(function() {
			getBlogs(-1, 1, 15);
			$('#uc-classes li a').click(function() {
						getBlogs($(this).attr('classid'), 1, 15);
					});
			$('#uc-class-refresh').click(function(){
				getBlogs(-1, 1, 15);
			});			
		});
function getBlogs(classid, pageNo, pageSize) {
	$('#uc-blogs').empty();
	$('#uc-blogs').append('<li class="loading">正在加载...</li>');
	$.ajax({
				url : '/router/member/uc/blogs',
				type : 'GET',
				data : {
					'pageNo' : pageNo,
					'pageSize' : pageSize,
					'classid' : classid
				},
				dataType : 'html',
				beforeSend : function(xhr) {
					xhr.setRequestHeader("WindType", "AJAX");// 请求方式
					xhr.setRequestHeader("WindDataType", "HTML");// 请求返回内容类型
				},
				error : function(request, textStatus, errorThrown) {
					alert(textStatus);
					$('#uc-blogs .loading').remove();
				},
				success : function(data) {
					$('#uc-blogs').empty().append(data);
				}
			});
}
</script>
<#if error??>
	${error}:<a id="uc-class-refresh" style="font-weight:bold;color:00E;">刷新</a>
</#if>
<ul id="uc-classes" style="margin-top:5px;margin-left:10px;">
<li><a classid="-1">全部</a></li>
<#if ucClasses??&&(ucClasses?size>0)>
<#list ucClasses as u>
	<li><a classid="${u.classid}">${u.classname}</a></li>
</#list>
</#if>
</ul>

<ul id="uc-blogs" style="margin-top:35px;margin-left:10px;list-style:none;">
</ul>