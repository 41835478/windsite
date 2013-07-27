var PageAlimamaTanxConfig = {
	/**
	 * 初始化Alimama推广配置
	 * 
	 * @param {}
	 *            func
	 * @return {Boolean}
	 */
	initCommonAlimamaTanxConfig : function(func) {
		var ali_pid = "";

		if (MODULE && MODULE.hasClass('J_TBox')) {// 如果存在，并且为编辑模块模式,还原属性
			var options = MODULE['page'
					+ PageModuleUtils.getModuleName(MODULE.attr('name'))]('option');
			if (options.ali_pid) {
				ali_pid = options.ali_pid;
			}
		}
		$.ajax({
					url : '/router/member/page/config/union?v=' + Math.random(),
					type : 'GET',
					data : {
						union_type : 'tanx',
						pid : ali_pid
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

	createCommonAlimamaTanxParams : function() {
		var params = {};
		var code = $('#shop-union-textarea').val();
		if (!code) {
			alert('广告代码不能为空');
			return false;
		}
		var ali_pidReg = /tanx_s\.id\s*=\s*"(.*)"/;
		var ali_pid = this.getParams(code, ali_pidReg);
		if (ali_pid == null) {
			alert('alimama_pid不能为空');
			return false;
		}
		params.isHd = ($('#module-ishd').attr('checked') + "");
		params.ali_pid = ali_pid.replace('tanx-s-', '');
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
	 * AlimamaTanx推广配置校验
	 */
	validateCommonAlimamaTanxConfig : function() {
		var code = $('#shop-union-textarea').val();
		if (!code) {
			alert('广告代码不能为空');
			return false;
		}
		var ali_pidReg = /tanx_s\.id\s*=\s*"(.*)"/;
		var ali_pid = this.getParams(code, ali_pidReg);
		if (ali_pid == null) {
			alert('tanx_s.id不能为空');
			return false;
		}
		return true;
	}
};
