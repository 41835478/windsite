var PageGoogleConfig = {
	/**
	 * 初始化Google推广配置
	 * 
	 * @param {}
	 *            func
	 * @return {Boolean}
	 */
	initCommonGoogleConfig : function(func) {
		var client = '';
		var slot = '';
		var width = '';
		var height = '';
		if (MODULE && MODULE.hasClass('J_TBox')) {// 如果存在，并且为编辑模块模式,还原属性
			var options = MODULE['page'
					+ PageModuleUtils.getModuleName(MODULE.attr('name'))]('option');
			if (options.client) {
				client = options.client;
			}
			if (options.slot) {
				slot = options.slot;
			}
			if (options.width) {
				width = options.width;
			}
			if (options.height) {
				height = options.height;
			}
		}
		$.ajax({
					url : '/router/member/page/config/union?v=' + Math.random(),
					type : 'GET',
					data : {
						union_type : 'google',
						client : client,
						slot : slot,
						width : width,
						height : height
					},
					dataType : 'html',
					beforeSend : function(xhr) {
						xhr.setRequestHeader("WindType", "AJAX");// 请求方式
						xhr.setRequestHeader("WindDataType", "HTML");// 请求返回内容类型
					},
					error : function(request, textStatus, errorThrown) {
						alert('网络错误:' + textStatus);
						return;
					},
					success : function(data) {
						$('#module-content').empty().append(data);
						if (func && typeof(func) == 'function') {
							func();
						}
					}
				});
		return true;
	},

	createCommonGoogleParams : function() {
		var params = {};
		var code = $('#shop-union-textarea').val();
		if (!code) {
			alert('广告代码不能为空');
			return false;
		}
		var clientReg = /google_ad_client\s*=\s*"(.*)"/;
		var slotReg = /google_ad_slot\s*=\s*"([0-9]+)"/;
		var widthReg = /google_ad_width\s*=\s*([0-9]+)/;
		var heightReg = /google_ad_height\s*=\s*([0-9]+)/;
		var client = this.getParams(code, clientReg);
		if (client == null) {
			alert('google_ad_client不能为空');
			return false;
		}
		var slot = this.getParams(code, slotReg);
		if (slot == null) {
			alert('google_ad_slot不能为空');
			return false;
		}
		var width = this.getParams(code, widthReg);
		if (width == null) {
			alert('google_ad_width不能为空');
			return false;
		}
		var height = this.getParams(code, heightReg);
		if (height == null) {
			alert('google_ad_height不能为空');
			return false;
		}
		params.isHd = ($('#module-ishd').attr('checked') + "");
		params.client = client;
		params.slot = slot;
		params.width = width;
		params.height = height;
		return params;
	},
	getParams : function(code, reg) {
		var result = code.match(reg);
		if (result != null) {
			return result[1];
		}
		return null;
	},
	/**
	 * Google推广配置校验
	 */
	validateCommonGoogleConfig : function() {
		var code = $('#shop-union-textarea').val();
		if (!code) {
			alert('广告代码不能为空');
			return false;
		}
		var clientReg = /google_ad_client\s*=\s*"(.*)"/;
		var slotReg = /google_ad_slot\s*=\s*"([0-9]+)"/;
		var widthReg = /google_ad_width\s*=\s*([0-9]+)/;
		var heightReg = /google_ad_height\s*=\s*([0-9]+)/;
		var client = this.getParams(code, clientReg);
		if (client == null) {
			alert('google_ad_client不能为空');
			return false;
		}
		var slot = this.getParams(code, slotReg);
		if (slot == null) {
			alert('google_ad_slot不能为空');
			return false;
		}
		var width = this.getParams(code, widthReg);
		if (width == null) {
			alert('google_ad_width不能为空');
			return false;
		}
		var height = this.getParams(code, heightReg);
		if (height == null) {
			alert('google_ad_height不能为空');
			return false;
		}
		return true;
	}
};
