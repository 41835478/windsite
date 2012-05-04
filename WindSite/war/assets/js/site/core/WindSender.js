/**
 * Wind异步请求类
 */
function WindSender(url, noError) {
	/**
	 * 请求地址
	 * 
	 * @type
	 */
	this.url = url;

	this.load = function(type, parameters, callback, error) {
		$.ajax({
			url : this.url,
			type : type,
			data : parameters,
			dataType : 'json',
			beforeSend : function(xhr) {
				xhr.setRequestHeader("WindType", "AJAX");
			},
			error : function(request, textStatus, errorThrown) {
				if (noError) {
				} else {
					alert('网络错误!请重试');
				}
				if (error && typeof error == "function") {
					error();
				}
			},
			success : function(result) {
				var response = new WindResponse(result);
				if (!response.isSuccess()
						&& (response.errorCode == 27 || response.errorCode == 100)) {
					document.location.href = "/router/site/redirect";
				} else {// 如果非session错误则回调
					callback(response);
				}
			}
		});
	}
}