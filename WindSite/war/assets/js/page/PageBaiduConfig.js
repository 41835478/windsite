var PageBaiduConfig = {
	/**
	 * 初始化百度联盟推广配置
	 * 
	 * @param {}
	 *            func
	 * @return {Boolean}
	 */
	initCommonBaiduConfig : function(func) {
		var cpro_id = "";
		if (MODULE && MODULE.hasClass('J_TBox')) {// 如果存在，并且为编辑模块模式,还原属性
			var options = MODULE['page'
					+ PageModuleUtils.getModuleName(MODULE.attr('name'))]('option');
			if (options.cpro_id) {
				cpro_id = options.cpro_id;
			}
		}
		$.ajax({
					url : '/router/member/page/config/union?v=' + Math.random(),
					type : 'GET',
					data : {
						union_type : 'baidu',
						cpro_id : cpro_id
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

	createCommonBaiduParams : function() {
		var params = {};
		var code = $('#shop-union-textarea').val();
		if (!code) {
			alert('广告代码不能为空');
			return false;
		}
		var cpro_idReg = /cpro_id\s*=\s*'(.*)'/;
		var cpro_id = this.getParams(code, cpro_idReg);
		if (cpro_id == null) {
			alert('cpro_id不能为空');
			return false;
		}
		params.isHd = ($('#module-ishd').attr('checked') + "");
		params.cpro_id = cpro_id;
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
	 * 百度推广配置校验
	 */
	validateCommonBaiduConfig : function() {
		var code = $('#shop-union-textarea').val();
		if (!code) {
			alert('广告代码不能为空');
			return false;
		}
		var cpro_idReg = /cpro_id\s*=\s*'(.*)'/;
		var cpro_id = this.getParams(code, cpro_idReg);
		if (cpro_id == null) {
			alert('cpro_id不能为空');
			return false;
		}
		return true;
	}
};
