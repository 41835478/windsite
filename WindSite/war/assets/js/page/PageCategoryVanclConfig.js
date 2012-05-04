var PageCategoryVanclConfig = {
	/**
	 * 初始化类目推广配置
	 * 
	 * @param {}
	 *            func
	 * @return {Boolean}
	 */
	initCommonCatConfig : function(func) {
		$.ajax({
					url : '/router/member/page/config/category?v='
							+ Math.random(),
					type : 'GET',
					data : {
						layout : $('#page-module-editor').pageModuleEditor(
								'option', 'layout'),
						isParent : 'true'
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
						var cats = [];
						if (MODULE && MODULE.hasClass('J_TBox')) {// 如果存在，并且为编辑模块模式,还原属性
							MODULE.find('.kind').each(function() {
										var obj = {};
										obj.name = $(this).find('a').text();
										obj.cid = $(this).attr('cid');
										cats.push(obj);
									});
							MODULE.find('.lv-cat dt').each(function() {
										var obj = {};
										obj.name = $(this).find('a').text();
										obj.cid = $(this).attr('cid');
										cats.push(obj);
									});

						}
						$('#module-content').pageCategoryEditor({
									limit : 10,
									isParent : true,
									cats : cats
								});
						if (func && typeof(func) == 'function') {
							func();
						}
					}
				});
		return true;
	},
	/**
	 * 创建类目推广参数
	 * 
	 * @return {}
	 */
	createCommonCatParams : function() {
		var params = {};
		var cats = [];
		$('#ul_selected li').each(function() {
					cats.push($(this).attr('cid'));
				});
		params.isHd = $('#module-ishd').attr('checked') + "";// 是否显示标题
		params.adType = 'cat';// 推广类型
		params.cids = cats.join(',');
		params.layout = $('#page-module-editor').pageModuleEditor('option',
				'layout');// 布局
		return params;
	},
	/**
	 * 类目推广配置校验
	 */
	validateCommonCatConfig : function() {
		if ($('#ul_selected li').length == 0) {
			alert('您尚未选择要显示的分类');
			return false;
		}
		return true;
	}
};
