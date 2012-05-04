function adBlog(sid) {
	if (!sid || sid == '') {
		return;
	}
	var url = '/router/ad/page/blog?sid=' + sid;
	var isAd = true;// 暂时无用
	if (isAd) {
		$.ajax({
					url : url,
					type : 'GET',
					data : {},
					dataType : 'html',
					beforeSend : function(xhr) {
						xhr.setRequestHeader("WindType", "AJAX");// 请求方式
						xhr.setRequestHeader("WindDataType", "HTML");// 请求返回内容类型
					},
					error : function(request, textStatus, errorThrown) {
					},
					success : function(data) {
						$('#adShopDisplay').append(data);
					}
				});
	}
}