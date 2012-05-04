$(function() {
			var header = $('#header');
			if (header.length == 1 && $('#xt-fha').length == 0) {
				$.ajax({
							url : 'http://' + WWW + '/router/ad/fha?v'
									+ Math.random(),
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
								header.append(data);
							}
						});
			}
		});