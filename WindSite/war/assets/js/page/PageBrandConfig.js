var PageBrandConfig = {
	initCommonBrandConfig : function(func) {
		var self = this;
		var bids = '';
		if (MODULE && MODULE.hasClass('J_TBox')) {// 如果存在，并且为编辑模块模式,还原属性
			bids = MODULE['pageShopBrand']('option', 'bids');
		}
		$.ajax({
			url : '/router/member/page/config/brand?v=' + Math.random(),
			type : 'GET',
			data : {
				layout : $('#page-module-editor').pageModuleEditor('option',
						'layout'),
				module : $('#page-module-editor').pageModuleEditor('option',
						'module'),
				bids : bids
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

					if (options.cid) {
						$('#page-module-editor input[name="cid-radio"][value="'
								+ options.cid + '"]').attr('checked', true);
					}
					if (options.count) {
						$('#brands-count').val(options.count);
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
				$('#J_Custom_Cats').change(function() {
							var cid = $(this).val();
							if ('0' == cid) {
								$('#J_Custom_Result').empty();
							} else {
								self.getBrandsByCid(cid);
							}
						});
				$('#J_Custom_Selected li').each(function() {
							self.initSelectedLi($(this));
						});
				if (func && typeof(func) == 'function') {
					func();
				}
			}
		});
		return true;
	},
	validateCommonBrandConfig : function(func) {
		var dataType = $('#page-module-editor input[type="radio"][name="dataType"]:checked')
				.val();
		if ('J_Search' == dataType) {// 根据搜索
			var pages = $('#page-module-editor input[name="cid-radio"]:checked');
			if (pages.length == 0) {
				alert('您尚未选择要显示的品牌库分类');
				return false;
			}
		} else if ('J_Custom' == dataType) {// 手动挑选
			var selecteds = $('#page-module-editor .J_Custom li.selected');
			if (selecteds.length == 0) {
				alert('您尚未选择要显示的品牌');
				return false;
			}
		}

		return true;
	},
	createCommonBrandParams : function() {
		var params = {};
		var dataType = $('#page-module-editor input[type="radio"][name="dataType"]:checked')
				.val();
		if ('J_Search' == dataType) {// 根据搜索
			params.dataType = 'search';
		} else if ('J_Custom' == dataType) {
			params.dataType = 'custom';
			var selecteds = $('#page-module-editor .J_Custom li.selected');
			if (selecteds.length == 0) {
				alert('您尚未选择要显示的品牌');
				return false;
			}
			var bids = [];
			selecteds.each(function() {
						bids.push($(this).attr('bid'));
					});
			params.bids = bids.join(',');
		}
		params.isHd = $('#module-ishd').attr('checked') + "";// 是否显示标题
		params.cid = $('#page-module-editor input[name="cid-radio"]:checked')
				.val();
		params.count = $('#brands-count').val() + '';
		return params;
	},
	getBrandsByCid : function(cid) {
		var self = this;
		$('#J_Custom_Result').empty();
		$.ajax({
			url : '/router/member/page/config/brand/' + cid + '?v='
					+ Math.random(),
			type : 'GET',
			data : {},
			dataType : 'html',
			beforeSend : function(xhr) {
				xhr.setRequestHeader("WindType", "AJAX");// 请求方式
				xhr.setRequestHeader("WindDataType", "HTML");// 请求返回内容类型
			},
			error : function(request, textStatus, errorThrown) {
			},
			success : function(data) {
				$('#J_Custom_Result').empty().append(data);
				$('#J_Custom_Result input[type="button"]').click(function() {
					var bid = $(this).attr('bid');
					var title = $(this).attr('btitle');
					var selected = $('#J_Custom_Selected li[bid="' + bid + '"]');
					if (selected.length > 0) {
						alert('已选择[' + title + ']');
						return false;
					}
					var picPath = $(this).attr('bpic');
					var li = $('<li bid="'
							+ bid
							+ '" style="float:left;margin-right:5px;margin-bottom:5px;"><a class="custome-del">删除</a>&nbsp;<img src="'
							+ picPath + '" alt="' + title
							+ '" width="95px" height="65px"></li>');
					$('#J_Custom_Selected').append(li);
					self.initSelectedLi(li);
				});
			}
		});
	},
	initSelectedLi : function(li) {
		li.find('.custome-del').click(function() {
					$(this).parent().remove();
				});
	}
};