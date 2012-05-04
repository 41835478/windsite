var PageDianPuConfig = {
	initCommonDianPuConfig : function(func) {
		var self = this;
		$.ajax({
			url : '/router/member/page/config/dianpu?v=' + Math.random(),
			type : 'GET',
			data : {
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
				if (typeof(dianpuCats) == 'undefined') {
					alert('淘店铺分类获取失败');
					return false;
				}
				$('#dianpu-root').change(function() {// 一级分类改变事件
							var root = $(this).find('option:selected')
									.attr('data-name');
							if (root) {
								var cats = dianpuCats[root];// 获取子分类
								$('#dianpu-cat')
										.empty()
										.append('<option value="">请选择二级分类</option>');
								if (cats.length > 0) {
									for (var i = 0; i < cats.length; i++) {
										var cat = cats[i];
										$('#dianpu-cat')
												.append('<option data-name="'
														+ cat.name
														+ '" value="' + cat.id
														+ '">' + cat.title
														+ '</option>');// 追加子分类
									}
								}
							}
						});
				if (MODULE && MODULE.hasClass('J_TBox')) {// 如果存在，并且为编辑模块模式,还原属性
					var options = MODULE['page'
							+ PageModuleUtils
									.getModuleName(MODULE.attr('name'))]('option');
					if (options.root) {// 根分类
						$('#dianpu-root').val(options.root).change();// 同时产生事件，生成二级分类
					}
					if (options.cat) {// 二级分类
						$('#dianpu-cat').val(options.cat);
					}
					if (options.isMall) {
						$('#dianpu-ismall').attr('checked',
								('true' == options.isMall ? true : false));
					}
					if (options.count) {// 显示数量
						$('#dianpu-count').val(options.count);
					}
				} else {
					$('#dianpu-root').change();// 同时产生事件，生成二级分类
				}
				if (func && typeof(func) == 'function') {
					func();
				}
			}
		});
		return true;
	},
	validateCommonDianPuConfig : function(func) {
		return true;
	},
	createCommonDianPuParams : function() {
		var params = {};
		params.adType = 'dianpu';// 推广类型
		params.isHd = $('#module-ishd').attr('checked') + "";// 是否显示标题
		params.root = $('#dianpu-root').val();
		params.cat = $('#dianpu-cat').val();
		params.isMall = $('#dianpu-ismall').attr('checked') ? 'true' : 'flase';
		params.count = $('#dianpu-count').val() + '';
		return params;
	}
};