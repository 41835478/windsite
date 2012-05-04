var PagePosterConfig = {
	initCommonPosterConfig : function(func) {
		$.ajax({
			url : '/router/member/page/config/poster?v=' + Math.random(),
			type : 'GET',
			data : {
				layout : $('#page-module-editor').pageModuleEditor('option',
						'layout'),
				module : $('#page-module-editor').pageModuleEditor('option',
						'module')
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
				if (MODULE && MODULE.hasClass('J_TBox')) {// 如果存在，并且为编辑模块模式,还原属性
					var options = MODULE['page'
							+ PageModuleUtils
									.getModuleName(MODULE.attr('name'))]('option');
					if (options.channels) {
						$('#page-module-editor input[name="posterchannels-radio"][value="'
								+ options.channels + '"]')
								.attr('checked', true);
					}
					if (options.poster_type) {
						$('#posterchannels-type').val(options.poster_type);
					}
					if (options.itemnum) {
						$('#posterchannels-itemnum').val(options.itemnum);
					}
				}
				if (func && typeof(func) == 'function') {
					func();
				}
			}
		});
		return true;
	},
	validateCommonPosterConfig : function(func) {
		var pages = $('#page-module-editor input[name="posterchannels-radio"]:checked');
		if (pages.length == 0) {
			alert('您尚未选择要显示的画报频道推广');
			return false;
		}
		return true;
	},
	createCommonPosterParams : function() {
		var params = {};
		params.isHd = $('#module-ishd').attr('checked') + "";// 是否显示标题
		params.adType = 'poster';// 推广类型
		params.channels = $('#page-module-editor input[name="posterchannels-radio"]:checked')
				.val();// 频道
		params.poster_type = $('#posterchannels-type').val();// 排序类型
		if ($('#posterchannels-itemnum').length == 1) {
			params.itemnum = $('#posterchannels-itemnum').val();// 显示数量
		} else {
			params.itemnum = 10;// 显示数量
		}
		return params;
	}
};