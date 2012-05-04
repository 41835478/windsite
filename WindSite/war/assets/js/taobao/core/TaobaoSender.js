/**
 * 淘宝请求类
 * 
 * @author fxy
 * @class
 */
function TaobaoSender(url, validate) {
	if (url == null) {
		url = TaobaoConstants.URL;
	}
	if (validate == null) {
		validate = false;
	}
	/**
	 * 请求URL
	 * 
	 * @type String
	 */
	this.url = url;

	/**
	 * 是否校验参数
	 * 
	 * @type Boolean
	 */
	this.validate = validate;
	/**
	 * 发送请求
	 * 
	 * @param {TaobaoRequest}parameters
	 */
	this.load = function(parameters, callback) {
		if (parameters instanceof TaobaoRequest) {
			if (this.validate) {// 如果要求校验参数
				try {
					parameters.validate();
				} catch (e) {
					alert(e);
					return;
				}
			}
			$.ajax({
				url : this.url,
				type : 'POST',
				data : parameters.getParameters(),
				dataType : 'json',
				timeout : 8000,
				beforeSend : function(xhr) {
					xhr.setRequestHeader("WindType", "AJAX")
				},
				error : function(request, textStatus, errorThrown) {
					alert(textStatus + "\n" + errorThrown);
				},
				success : function(result) {
					var response = new TaobaoResponse(result);
					if (!response.isSuccess()
							&& (response.errorCode == 27 || response.errorCode == 100)) {
						document.location.href = "/router/site/redirect";
					} else {// 如果非session错误则回调
						callback(response);
					}
				}
			});
		} else {
			alert("parameters 必须为TaobaoRequest子类");
		}
	}
}