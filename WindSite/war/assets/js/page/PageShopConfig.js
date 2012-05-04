var PageShopConfig = {
	/**
	 * 初始化商品推广配置
	 * 
	 * @param {}
	 *            func
	 * @return {Boolean}
	 */
	initCommonShopConfig : function(func) {
		$.ajax({
			url : '/router/member/page/config/shop?v=' + Math.random(),
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
				$('#module-content input[type="radio"][name="dataType"]')
						.change(function() {
							if ($(this).is(':checked')) {
								$('#module-content .J_Filter').hide();
								$('#module-content .' + $(this).val()).show();
								if ($(this).val() == 'J_Group') {// 如果是店铺分组
									$('#module-content .J_SearchFilter').hide();
									$('#module-content .J_Order').show();
								} else {// 如果是搜索
									$('#module-content .J_Order').hide();
									$('#module-content .J_SearchFilter').show();
								}
							}
						});
				if (MODULE && MODULE.hasClass('J_TBox')) {// 如果存在，并且为编辑模块模式,还原属性
					var options = MODULE['page'
							+ PageModuleUtils
									.getModuleName(MODULE.attr('name'))]('option');
					if (options.cid) {// 分类
						$('#ci-s-cid').val(options.cid);
					}
					if (options.scommission) {// 开始佣金比率
						$('#ci-s-commission-start').val(options.scommission);
					}
					if (options.ecommission) {// 结束佣金比率
						$('#ci-s-commission-end').val(options.ecommission);
					}
					if (options.scredit) {// 开始信用
						$('#ci-s-credit-start').val(options.scredit);
					}
					if (options.ecredit) {// 结束信用
						$('#ci-s-credit-end').val(options.ecredit);
					}
					if (options.sort) {// 排序方式
						$('#ci-s-orderType').val(options.sort);
					}
					if (options.picsize) {// 图片大小
						$('#ci-s-picSize').val(options.picsize);
					}
					if (options.itemnum) {// 显示数量
						$('#ci-s-itemNum').val(options.itemnum);
					}
					if (options.gid) {// 店铺分组
						$('#ci-s-groups').val(options.gid);

					}
					// 数据来源还原
					if (!options.dataType || 'search' == options.dataType) {
						$('#ci-s-dataType-search').attr('checked', true);
						$('#ci-s-dataType-group').attr('checked', false);
						$('#module-content .J_Group').hide();
						$('#module-content .J_Order').hide();
						$('#module-content .J_Search').show();
						$('#module-content .J_SearchFilter').show();
					} else if ('group' == options.dataType) {
						$('#ci-s-dataType-group').attr('checked', true);
						$('#ci-s-dataType-search').attr('checked', false);
						$('#module-content .J_Search').hide();
						$('#module-content .J_SearchFilter').hide();
						$('#module-content .J_Order').show();
						$('#module-content .J_Group').show();
					}
				} else {// 新增，默认根据搜索条件配置
					$('#ci-s-dataType-search').attr('checked', true);
					$('#module-content .J_Group').hide();
					$('#module-content .J_Order').hide();
					$('#module-content .J_Search').show();
					$('#module-content .J_SearchFilter').show();
				}
				if (func && typeof(func) == 'function') {
					func();
				}
			}
		});
		return true;
	},
	createCommonShopParams : function() {
		var params = {};
		var dataType = $('#module-content input[type="radio"][name="dataType"]:checked')
				.val();
		if ('J_Search' == dataType) {// 根据搜索
			params.dataType = 'search';
		} else if ('J_Group' == dataType) {
			params.dataType = 'group';
		}
		params.isHd = $('#module-ishd').attr('checked') + "";// 是否显示标题
		params.adType = 'shop';// 推广类型
		// 搜索
		params.cid = $('#ci-s-cid').val() + '';// 所属分类
		params.scommission = $('#ci-s-commission-start').val() + '';// 开始佣金比率
		params.ecommission = $('#ci-s-commission-end').val() + '';// 结束佣金比率
		params.scredit = $('#ci-s-credit-start').val() + '';// 开始信用
		params.ecredit = $('#ci-s-credit-end').val() + '';// 结束信用
		// 推广组
		params.gid = $('#ci-s-groups').val() + '';// 推广组
		params.sort = $('#ci-s-orderType').val() + '';// 排序方式
		// 公用
		if ($('#ci-s-picSize').length == 1)
			params.picsize = $('#ci-s-picSize').val() + '';// 图片大小
		if ($('#ci-s-itemNum').length == 1)
			params.itemnum = $('#ci-s-itemNum').val() + '';// 显示数量
		else
			params.itemnum = '10';// 显示数量
		return params;
	},
	/**
	 * 商品推广配置校验
	 */
	validateCommonShopConfig : function() {
		var dataType = $('#module-content input[type="radio"][name="dataType"]:checked')
				.val();
		if ('J_Group' == dataType) {// 根据推广组
			if (!$('#ci-s-groups').val() || '0' == $('#ci-s-groups').val()) {
				alert('您尚未选择店铺分组');
				$('#ci-s-groups').focus();
				return false;
			}
		} else if ('J_Search' == dataType) {// 根据搜索条件
			var cid = $('#ci-s-cid').val();
			if (!cid || cid == '0') {
				alert('尚未选择店铺分类');
				return false;
			}
			var scommission = $('#ci-s-commission-start').val();
			var ecommission = $('#ci-s-commission-end').val();
			if (scommission) {
				if (!PageUtils.validateNumber(sprice)) {
					alert('开始佣金必须为数字');
					$('#ci-s-commission-start').focus();
					return false;
				}
			}
			if (ecommission) {
				if (!PageUtils.validateNumber(eprice)) {
					alert('结束佣金必须为数字');
					$('#ci-s-commission-end').focus();
					return false;
				}
			}
		}
		return true;
	}
};
