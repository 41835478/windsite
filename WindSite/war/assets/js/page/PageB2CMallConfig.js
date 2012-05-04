var PageB2CMallConfig = {
	initCommonB2CMallConfig : function(func) {
		var self = this;
		$.ajax({
			url : '/router/member/page/config/b2cMall?v=' + Math.random(),
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
					if (options.count) {
						$('#b2cmall-count').val(options.count);
					}
					if (options.cid) {
						$('#page-module-editor input[type="radio"][name="tabnav-cat"][value="'
								+ options.cid + '"]').attr('checked', true);
					}
					if (options.malls) {
						var malls = eval('(' + options.malls + ')');
						if (malls && malls.length > 0) {
							var ul = $('#ul_selected');
							for (var i = 0; i < malls.length; i++) {
								var mall = malls[i];
								var liStr = $('<li cid="' + mall.cid
										+ '" ctitle="' + mall.title
										+ '" crate="' + mall.topRate
										+ '" clogo="' + mall.logo + '" b2cId="'
										+ mall.b2cId + '"><span>' + mall.title
										+ '（<strong style="color:red;">最高返利'
										+ mall.topRate + '</strong>）'
										+ '</span></li>');
								ul.append(liStr);
								self.initB2CMallSelectedLi(liStr);
							}
						}
					}

					if ('search' == options.dataType) {// 自动
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
				// 初始化分类多选
				$('#module-content .catlist .btn_del').click(function() {
							var active = $('#ul_selected li.active');
							if (active.length == 0) {
								alert('您尚未选择要删除的商城');
								return false;
							}
							if (confirm('您确定要删除选中的商城？')) {
								active.remove();
							}
							return false;
						});
				$('#module-content .catlist .btn_up').click(function() {
							var active = $('#ul_selected li.active');
							if (active.length == 0) {
								alert('您尚未选择要上移的商城');
								return false;
							}
							var prev = active.prev();
							if (prev.length == 1) {
								prev.before(active);
							}
							return false;
						});
				$('#module-content .catlist .btn_down').click(function() {
							var active = $('#ul_selected li.active');
							if (active.length == 0) {
								alert('您尚未选择要下移的商城');
								return false;
							}
							var next = active.next();
							if (next.length == 1) {
								next.after(active);
							}
							return false;
						});

				$('#module-content .b2cMallCats li').each(function() {
							self.initB2CMallCatLi($(this));
						});
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
	validateCommonB2CMallConfig : function(func) {
		var dataType = $('#page-module-editor input[type="radio"][name="dataType"]:checked')
				.val();
		if ('J_Search' == dataType) {// 根据搜索
			var cid = $('#page-module-editor input[type="radio"][name="tabnav-cat"]:checked');
			if (cid.length == 0) {
				alert('您尚未选择要显示的商城分类');
				return false;
			}
		} else if ('J_Custom' == dataType) {// TODO 手动挑选
			var selecteds = $('#ul_selected li');
			if (selecteds.length == 0) {
				alert('您尚未选择要显示的商城');
				return false;
			}
		}

		return true;
	},
	createCommonB2CMallParams : function() {
		var params = {};
		var dataType = $('#page-module-editor input[type="radio"][name="dataType"]:checked')
				.val();
		if ('J_Search' == dataType) {// 根据搜索
			params.dataType = 'search';
		} else if ('J_Custom' == dataType) {
			params.dataType = 'custom';
		}
		params.isHd = $('#module-ishd').attr('checked') + "";// 是否显示标题
		var checked = $('#page-module-editor input[type="radio"][name="tabnav-cat"]:checked');
		if (checked.length == 1) {
			params.cid = checked.val();
		}
		params.adType = 'mall';
		var malls = [];
		$('#ul_selected li').each(function() {
					var obj = {};
					obj.b2cId = $(this).attr('b2cId');
					obj.cid = $(this).attr('cid');
					obj.title = $(this).attr('ctitle');
					obj.topRate = $(this).attr('crate');
					obj.logo = $(this).attr('clogo');
					malls.push(obj);
				});
		params.malls = PageUtils.json2str(malls);
		params.count = $('#b2cmall-count').val() + '';
		return params;
	},
	/**
	 * 商城分类
	 * 
	 * @param {}
	 *            li
	 */
	initB2CMallCatLi : function(li) {
		var self = this;
		var ul = $('#J_B2cMalls');
		li.hover(function() {
			$(this).addClass('overactive').siblings().removeClass('overactive');
		}, function() {
			$(this).removeClass('overactive');
		}).click(function() {
			$(this).addClass('active').siblings().removeClass('active');
			ul.empty();
			var malls = MALLS[$(this).attr('cid')];
			if (malls && malls.length > 0) {
				for (var i = 0; i < malls.length; i++) {
					var mall = malls[i];
					var btn_add = ('<a href="javascript:void(0);" class="btn_add" cid="'
							+ mall.cid
							+ '" ctitle="'
							+ mall.title
							+ '" crate="'
							+ mall.topRate
							+ '" clogo="'
							+ mall.logo + '" b2cId="' + mall.b2cId + '">添加</a>');
					var liStr = $('<li><span>' + mall.title
							+ '（<strong style="color:red;">最高返利' + mall.topRate
							+ '</strong>）' + '</span>' + btn_add + '</li>');
					ul.append(liStr);
					self.initB2CMallLi(liStr);
				}
			}
		});
	},
	/**
	 * 商城
	 * 
	 * @param {}
	 *            li
	 */
	initB2CMallLi : function(li) {
		var self = this;
		li.hover(function() {
			$(this).addClass('overactive').siblings().removeClass('overactive');
		}, function() {
			$(this).removeClass('overactive');
		});
		$('.btn_add', li).click(function(e) {
			var ul = $('#ul_selected');
			if (ul.find('li').length >= 20) {
				alert('商城最多可以选择20个');
				e.stopPropagation();
				return false;
			}
			var cid = $(this).attr('cid');
			var b2cId = $(this).attr('b2cId');
			var clogo = $(this).attr('clogo');
			var ctitle = $(this).attr('ctitle');
			var crate = $(this).attr('crate');
			if (ul.find('li[b2cId="' + b2cId + '"]').length == 1) {
				alert('当前商城【' + ctitle + '】已经添加');
				e.stopPropagation();
				return false;
			}
			var liStr = $('<li cid="' + cid + '" ctitle="' + ctitle
					+ '" crate="' + crate + '" clogo="' + clogo + '" b2cId="'
					+ b2cId + '"><span>' + ctitle
					+ '（<strong style="color:red;">最高返利' + crate + '</strong>）'
					+ '</span></li>');
			ul.append(liStr);
			self.initB2CMallSelectedLi(liStr);
			e.stopPropagation();
		});

	},
	/**
	 * 选中
	 * 
	 * @param {}
	 *            li
	 */
	initB2CMallSelectedLi : function(li) {
		var self = this;
		li.hover(function() {
			$(this).addClass('overactive').siblings().removeClass('overactive');
		}, function() {
			$(this).removeClass('overactive');
		}).click(function() {
					$(this).addClass('active').siblings().removeClass('active');
				});
	}
};