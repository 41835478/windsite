var PageItemConfig = {
	/**
	 * 初始化商品推广配置
	 * 
	 * @param {}
	 *            func
	 * @return {Boolean}
	 */
	initCommonItemConfig : function(func) {
		var cidStr = '';
		if (MODULE && MODULE.hasClass('J_TBox')) {// 如果存在，并且为编辑模块模式,还原属性
			var options = MODULE['page'
					+ PageModuleUtils.getModuleName(MODULE.attr('name'))]('option');
			if (options.cid) {// 所属分类
				cidStr = options.cid;
			}
		}
		$.ajax({
			url : '/router/member/page/config/item?v=' + Math.random(),
			type : 'GET',
			data : {
				layout : $('#page-module-editor').pageModuleEditor('option',
						'layout'),
				cid : cidStr,
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
								if ($(this).val() == 'J_Seller') {// 如果是卖家
									$('#module-content .J_Order').hide();
									$('#module-content .J_Seller_Order').show();
								} else {// 如果是搜索或推广组
									$('#module-content .J_Order').show();
									$('#module-content .J_Seller_Order').hide();
								}
							}
						});
				$('#J_OpenCids').click(function() {
							var self = this;
							$('#page-cids-editor').dialog('open');// 打开分类选择器
						});
				if (MODULE && MODULE.hasClass('J_TBox')) {// 如果存在，并且为编辑模块模式,还原属性
					var options = MODULE['page'
							+ PageModuleUtils
									.getModuleName(MODULE.attr('name'))]('option');
					if (options.q) {// 关键词
						$('#ci-s-keyword').val(options.q);
					}
					if (options.sprice) {// 开始价格
						$('#ci-s-price-start').val(options.sprice);
					}
					if (options.eprice) {// 结束价格
						$('#ci-s-price-end').val(options.eprice);
					}
					if (options.scommission) {// 开始佣金比率
						$('#ci-s-commission-start').val(options.scommission);
					}
					if (options.ecommission) {// 结束佣金比率
						$('#ci-s-commission-end').val(options.ecommission);
					}
					if (options.sort) {// 排序方式
						$('#ci-s-orderType').val(options.sort);
					}
					if (options.baobaocat) {// 母婴分类特有
						$('#ci-s-baobaocat').val(options.baobaocat);
					}

					if (options.picsize) {// 图片大小
						$('#ci-s-picSize').val(options.picsize);
					}
					if (options.itemnum) {// 显示数量
						$('#ci-s-itemNum').val(options.itemnum);
					}
					if (options.gid) {// 商品推广组
						$('#ci-s-groups').val(options.gid);

					}
					if (options.sellernick) {
						$('#ci-s-seller-nick').val(options.sellernick);
					}
					if (options.sellerq) {
						$('#ci-s-seller-keyword').val(options.sellerq);
					}
					if (options.sellersprice) {
						$('#ci-s-seller-price-start').val(options.sellersprice);
					}
					if (options.sellereprice) {
						$('#ci-s-seller-price-end').val(options.sellereprice);
					}
					if (options.sellersort) {
						$('#ci-s-seller-orderType').val(options.sellersort);
					}
					$('#page-module-editor .thirdStep form')
							.removeClass('jqtransformdone').jqTransform({// 格式化表单
								imgPath : '/assets/js/jquery/jqtransform/img'
							});
					if (options.isVolume) {
						if ('false' == options.isVolume) {
							$('#ci-s-isVolume').attr('checked', false).parent()
									.find('a.jqTransformCheckbox')
									.removeClass('jqTransformChecked');
						} else {
							$('#ci-s-isVolume').attr('checked', true).parent()
									.find('a.jqTransformCheckbox')
									.addClass('jqTransformChecked');
						}
					} else {
						$('#ci-s-isVolume').attr('checked', true).parent()
								.find('a.jqTransformCheckbox')
								.addClass('jqTransformChecked');
					}
					// 数据来源还原
					if (!options.dataType || 'search' == options.dataType) {
						$('#ci-s-dataType-search').attr('checked', true)
								.parent().find('a.jqTransformRadio')
								.addClass('jqTransformChecked');// 处理jqTransform;
						$('#ci-s-dataType-group').attr('checked', false)
								.parent().find('a.jqTransformRadio')
								.removeClass('jqTransformChecked');// 处理jqTransform;
						$('#ci-s-dataType-seller').attr('checked', false)
								.parent().find('a.jqTransformRadio')
								.removeClass('jqTransformChecked');// 处理jqTransform;
						$('#module-content .J_Group').hide();
						$('#module-content .J_Seller').hide();
						$('#module-content .J_Seller_Order').hide();
						$('#module-content .J_Order').show();
						$('#module-content .J_Search').show();
					} else if ('group' == options.dataType) {
						$('#ci-s-dataType-group').attr('checked', true)
								.parent().find('a.jqTransformRadio')
								.addClass('jqTransformChecked');// 处理jqTransform;
						$('#ci-s-dataType-search').attr('checked', false)
								.parent().find('a.jqTransformRadio')
								.removeClass('jqTransformChecked');// 处理jqTransform;
						$('#ci-s-dataType-seller').attr('checked', false)
								.parent().find('a.jqTransformRadio')
								.removeClass('jqTransformChecked');// 处理jqTransform;
						$('#module-content .J_Search').hide();
						$('#module-content .J_Seller').hide();
						$('#module-content .J_Seller_Order').hide();
						$('#module-content .J_Order').show();
						$('#module-content .J_Group').show();
					} else if ('seller' == options.dataType) {
						$('#ci-s-dataType-seller').attr('checked', true)
								.parent().find('a.jqTransformRadio')
								.addClass('jqTransformChecked');// 处理jqTransform;
						$('#ci-s-dataType-group').attr('checked', false)
								.parent().find('a.jqTransformRadio')
								.removeClass('jqTransformChecked');// 处理jqTransform;
						$('#ci-s-dataType-search').attr('checked', false)
								.parent().find('a.jqTransformRadio')
								.removeClass('jqTransformChecked');// 处理jqTransform;
						$('#module-content .J_Search').hide();
						$('#module-content .J_Group').hide();
						$('#module-content .J_Order').hide();
						$('#module-content .J_Seller_Order').show();
						$('#module-content .J_Seller').show();
					}
				} else {// 新增，默认根据搜索条件配置
					$('#page-module-editor .thirdStep form')
							.removeClass('jqtransformdone').jqTransform({// 格式化表单
								imgPath : '/assets/js/jquery/jqtransform/img'
							});
					$('#ci-s-dataType-search').attr('checked', true);
					$('#module-content .J_Seller').hide();
					$('#module-content .J_Group').hide();
					$('#module-content .J_Seller_Order').hide();
					$('#module-content .J_Order').show();
					$('#module-content .J_Search').show();
				}
				if (func && typeof(func) == 'function') {
					func();
				}
			}
		});
		return true;
	},

	createCommonItemParams : function() {
		var params = {};
		var dataType = $('#module-content input[type="radio"][name="dataType"]:checked')
				.val();
		if ('J_Search' == dataType) {// 根据搜索
			params.dataType = 'search';
		} else if ('J_Group' == dataType) {
			params.dataType = 'group';
		} else if ('J_Seller' == dataType) {
			params.dataType = 'seller';
		}
		params.isHd = $('#module-ishd').attr('checked') + "";// 是否显示标题
		params.adType = 'item';// 推广类型
		// 搜索
		params.q = $('#ci-s-keyword').val() + '';// 关键词
		if ($('#ci-s-cid').attr('cid')) {
			params.cid = $('#ci-s-cid').attr('cid') + '';// 所属分类
		} else {
			params.cid = '0';// 所属分类
		}
		params.sprice = $('#ci-s-price-start').val() + '';// 开始价格
		params.eprice = $('#ci-s-price-end').val() + '';// 结束价格
		params.scommission = $('#ci-s-commission-start').val() + '';// 开始佣金比率
		params.ecommission = $('#ci-s-commission-end').val() + '';// 结束佣金比率
		// 推广组
		params.gid = $('#ci-s-groups').val() + '';// 推广组
		// 搜索与推广组公用
		params.sort = $('#ci-s-orderType').val() + '';// 排序方式
		// 卖家
		params.sellernick = $('#ci-s-seller-nick').val() + '';// 卖家昵称
		params.sellerq = $('#ci-s-seller-keyword').val() + '';// 关键词
		params.sellersprice = $('#ci-s-seller-price-start').val() + '';// 开始价格
		params.sellereprice = $('#ci-s-seller-price-end').val() + '';// 结束价格
		params.sellersort = $('#ci-s-seller-orderType').val() + '';// 排序方式
		// 公用
		if ($('#ci-s-picSize').length == 1)
			params.picsize = $('#ci-s-picSize').val() + '';// 图片大小
		if ($('#ci-s-itemNum').length == 1)
			params.itemnum = $('#ci-s-itemNum').val() + '';// 显示数量
		else
			params.itemnum = '10';// 显示数量
		if ($('#ci-s-isVolume').length == 1)
			params.isVolume = $('#ci-s-isVolume').attr('checked') + '';// 是否显示最近销量
		if ($('#ci-s-baobaocat').length == 1) {// 母婴分类特有
			params.baobaocat = $('#ci-s-baobaocat').val();
		}
		return params;
	},
	/**
	 * 商品推广配置校验
	 */
	validateCommonItemConfig : function() {
		var dataType = $('#module-content input[type="radio"][name="dataType"]:checked')
				.val();
		if ('J_Group' == dataType) {// 根据推广组
			if (!$('#ci-s-groups').val() || '0' == $('#ci-s-groups').val()) {
				alert('您尚未选择推广组');
				$('#ci-s-groups').focus();
				return false;
			}
		} else if ('J_Seller' == dataType) {
			var nick = $('#ci-s-seller-nick').val();
			if (!nick) {
				alert('卖家昵称不能为空!');
				$('#ci-s-seller-nick').focus();
				return false;
			}
			var sprice = $('#ci-s-seller-price-start').val();
			var eprice = $('#ci-s-seller-price-end').val();
			if (sprice) {
				if (!PageUtils.validateNumber(sprice)) {
					alert('开始价格必须为数字');
					$('#ci-s-seller-price-start').focus();
					return false;
				}
			}
			if (eprice) {
				if (!PageUtils.validateNumber(eprice)) {
					alert('结束价格必须为数字');
					$('#ci-s-seller-price-end').focus();
					return false;
				}
			}
		} else if ('J_Search' == dataType) {// 根据搜索条件
			var q = $('#ci-s-keyword').val();
			var cid = $('#ci-s-cid').attr('cid');
			if (!q && (!cid || cid == '0')) {
				alert('关键词和所属分类至少要填写一个');
				$('#ci-s-keyword').focus();
				return false;
			}
			var sprice = $('#ci-s-price-start').val();
			var eprice = $('#ci-s-price-end').val();
			if (sprice) {
				if (!PageUtils.validateNumber(sprice)) {
					alert('开始价格必须为数字');
					$('#ci-s-price-start').focus();
					return false;
				}
			}
			if (eprice) {
				if (!PageUtils.validateNumber(eprice)) {
					alert('结束价格必须为数字');
					$('#ci-s-price-end').focus();
					return false;
				}
			}
			if ($('#ci-s-baobaocat').length == 1) {// 母婴分类特有
				if ($('#ci-s-baobaocat').val() == '0') {
					alert('您尚未选择母婴分类');
					return false;
				}
			}
			// var scommission = $('#ci-s-commission-start').val();
			// var ecommission = $('#ci-s-commission-end').val();
			// if (scommission) {
			// if (!PageUtils.validateNumber(scommission)) {
			// alert('开始佣金比率必须为数字');
			// $('#ci-s-commission-start').focus();
			// return false;
			// }
			// }
			// if (ecommission) {
			// if (!PageUtils.validateNumber(ecommission)) {
			// alert('结束佣金比率必须为数字');
			// $('#ci-s-commission-end').focus();
			// return false;
			// }
			// }
		}
		return true;
	}
};
