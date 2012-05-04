var PageComplexAConfig = {
	/**
	 * 初始化商品推广配置
	 * 
	 * @param {}
	 *            func
	 * @return {Boolean}
	 */
	initCommonComplexAConfig : function(func) {

		$.ajax({
			url : '/router/member/page/config/complexA?v=' + Math.random(),
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

					if (options.shopNick) {
						$('#page-module-editor input[name="shop-nick"]')
								.val(options.shopNick);
					}
					// 左侧大图
					if (options.picUrl) {
						$('#complexA-picUrl').val(options.picUrl);
						$('#complexA-seller-picUrl').val(options.picUrl);// 卖家模式
					}
					if (options.picTitle) {
						$('#complexA-picTitle').val(options.picTitle);
					}
					if (options.picHref) {
						$('#complexA-picHref').val(options.picHref);
					}
					// 中间商品
					if (options.mItemsGid) {
						$('#mitems-groups').val(options.mItemsGid);
					}
					if (options.mItemsOrder) {
						$('#mitems-orderType').val(options.mItemsOrder);
					}
					// 右侧商品
					if (options.rItemsGid) {
						$('#ritems-groups').val(options.rItemsGid);
					}
					if (options.rItemsOrder) {
						$('#ritems-orderType').val(options.rItemsOrder);
					}
					// 底部店铺
					if (options.shopsGid) {
						$('#shops-groups').val(options.shopsGid);
					}
					if (options.shopsOrder) {
						$('#shops-orderType').val(options.shopsOrder);
					}
					// 价格
					if (options.sellersprice) {
						$('#complexA-price-start').val(options.sellersprice);
					}
					if (options.sellereprice) {
						$('#complexA-price-end').val(options.sellereprice);
					}
					if (options.sellersort) {
						$('#complexA-item-orderType').val(options.sellersort);
					}
					// 店铺分类
					if (options.cid) {
						$('#complexA-cid').val(options.cid);
					}
					// 信用
					if (options.scredit) {
						$('#complexA-credit-start').val(options.scredit);
					}
					if (options.ecredit) {
						$('#complexA-credit-end').val(options.ecredit);
					}
					if (!options.dataType || 'search' == options.dataType) {// 自动
						$('#page-module-editor input[type="radio"][name="dataType"][value="J_Search"]')
								.attr('checked', true);
						$('#page-module-editor .J_Custom').hide();
						$('#page-module-editor .J_Search').show();
					} else if ('custom' == options.dataType) {
						$('#page-module-editor input[type="radio"][name="dataType"][value="J_Custom"]')
								.attr('checked', true);
						$('#page-module-editor .J_Search').hide();
						$('#page-module-editor .J_Custom').show();
					}
				}
				$('#page-module-editor input[type="radio"][name="dataType"]')
						.change(function() {
									if ($(this).is(':checked')) {
										$('#module-content .J_Filter').hide();
										$('#module-content .' + $(this).val())
												.show();
									}
								});
				if (func && typeof(func) == 'function') {
					func();
				}
			}
		});
		return true;
	},

	createCommonComplexAParams : function() {
		var params = {};
		var dataType = $('#page-module-editor input[type="radio"][name="dataType"]:checked')
				.val();
		if ('J_Search' == dataType) {// 根据搜索
			params.dataType = 'search';
			if ($('#complexA-seller-picUrl').val()) {
				params.picUrl = $('#complexA-seller-picUrl').val();
			}
			if ($('#complexA-price-start').val()) {
				params.sellersprice = $('#complexA-price-start').val() + '';// 开始价格
			}
			if ($('#complexA-price-end').val()) {
				params.sellereprice = $('#complexA-price-end').val() + '';// 结束价格
			}
			params.sellersort = $('#complexA-item-orderType').val() + '';// 排序
			if ('0' != $('#complexA-cid').val()) {
				params.cid = $('#complexA-cid').val();
			}
			if ($('#complexA-credit-start').val()) {
				params.scredit = $('#complexA-credit-start').val() + '';// 开始信用
			}
			if ($('#complexA-credit-end').val()) {
				params.ecredit = $('#complexA-credit-end').val() + '';// 结束信用
			}
		} else if ('J_Custom' == dataType) {
			params.dataType = 'custom';
			// 左侧大图
			params.picUrl = $('#complexA-picUrl').val();
			params.picTitle = $('#complexA-picTitle').val();
			params.picHref = $('#complexA-picHref').val();
			// 中间商品
			params.mItemsGid = $('#mitems-groups').val();
			params.mItemsOrder = $('#mitems-orderType').val();
			// 右侧商品
			params.rItemsGid = $('#ritems-groups').val();
			params.rItemsOrder = $('#ritems-orderType').val();
			// 底部店铺
			params.shopsGid = $('#shops-groups').val();
			params.shopsOrder = $('#shops-orderType').val();
		}
		params.isHd = $('#module-ishd').attr('checked') + "";// 是否显示标题
		params.shopNick = $('#page-module-editor input[name="shop-nick"]')
				.val();
		return params;
	},
	/**
	 * 商品推广配置校验
	 */
	validateCommonComplexAConfig : function() {
		var dataType = $('#page-module-editor input[type="radio"][name="dataType"]:checked')
				.val();
		if ('J_Search' == dataType) {// 根据卖家昵称
			var nick = $('#page-module-editor input[name="shop-nick"]').val();
			if (!nick) {
				alert('您尚未填写卖家昵称');
				return false;
			}
		} else if ('J_Custom' == dataType) {// 手动挑选
			if (!$('#complexA-picUrl').val()) {
				alert('左侧大图图片地址不能为空');
				return false;
			}
			if (!$('#complexA-picTitle').val()) {
				alert('左侧大图图片标题不能为空');
				return false;
			}
			if (!$('#complexA-picHref').val()) {
				alert('左侧大图链接地址不能为空');
				return false;
			}
			if ($('#mitems-groups').val() == '0') {
				alert('中间商品区域未选择推广组');
				return false;
			}
			if ($('#ritems-groups').val() == '0') {
				alert('右侧商品区域未选择推广组');
				return false;
			}
			if ($('#shops-groups').val() == '0') {
				alert('底部店铺区域未选择店铺分组');
				return false;
			}
		}
		return true;
	}
};
