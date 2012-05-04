(function($) {
	$.widget("ui.adPlansEditor", {
		/**
		 * 参数
		 */
		options : {
			validNums : 0,
			pType : '0'
		},

		/**
		 * 组件初始化
		 */
		_init : function() {
			var self = this;
			o = self.options;
			var editor = self.element;// 组件
			// 切换组件
			var api = editor.scrollable({
						api : true
					});
			api.onBeforeSeek(function(event, i) {
					});
			// 切换按钮
			$('#plansViewButton').click(function() {
						if ('查看已选广告' == $(this).text()) {
							self.changeAdPlansView(1);
						} else {
							self.changeAdPlansView(0);
						}
					});
			// 弹出框
			editor.dialog({
						bgiframe : true,
						autoOpen : false,
						width : 760,
						zIndex : 1000,
						height : 600,
						modal : true,
						position : 'top',
						open : function() {
							self.plansSearch('', '', '', o.pType);
						},
						buttons : {
							'取消' : function() {
								$(this).dialog('close');
							},
							'确定' : function() {
								var checkeds = $('#plans-checked tr.plan');
								if (checkeds.length == 0) {
									alert('您尚未选择广告计划');
									return;
								}
								if (checkeds.length > o.validNums) {
									alert('您选择的广告计划数量过多，请移除'
											+ (checkeds.length - o.validNums)
											+ '个');
									return;
								}

								var plans = '';
								var isFirst = true;
								checkeds.each(function() {
											if (isFirst) {
												isFirst = false;
											} else {
												plans += ',';
											}
											plans += $(this).attr('pid');
										});
								// TODO 暂时只处理淘客添加广告计划，后续将处理设计器中的广告计划组件添加逻辑
								addTaokeAdPlan(o.pType, o.id, plans);
								$(this).dialog('close');
							}
						}
					});
			// 搜索按钮
			$('#plansSearchButton').click(function() {
				self.plansSearch($('#plansSearchText').val(),
						$('input[type="radio"][name="p_type"]:checked').val(),
						$('#plan_type').val(), o.pType);
			});
		},
		plansSearch : function(q, type, cid, pType, pageNo) {
			var self = this;
			getHtmlContent('plans-search', '/router/ad/plans', 'POST', {
						q : q,
						type : type,
						pType : pType,
						cid : cid,
						pageNo : pageNo
					}, function(data) {
						$('#plans-search').empty().append(data);
						self.initTaokeAdsPlanResult(q, type, cid, pType);
					});
		},
		/**
		 * 初始化广告计划搜索结果
		 */
		initTaokeAdsPlanResult : function(q, type, cid, pType) {
			var validNums = this.options.validNums;
			var self = this;
			$('.page-number').click(function() {
						self.plansSearch(q, type, cid, pType, $('a', $(this))
										.text());
						return false;
					});
			$('.pgNext').click(function() {
				if (!$(this).hasClass('pgEmpty')) {
					self.plansSearch(q, type, cid, pType, $(this).attr('page'));
				}
				return false;
			});
			$('#plans-search .plan .plan-view').click(function() {
				self.showAdPlanItems($(this).parents('tr.plan'), 'plan-result');
			});

			$('#plans-search .plan input[type="checkbox"][name="plans"]')
					.change(function() {
								var tr = $(this).parents('tr:first');
								if ($(this).is(':checked')) {// 如果是选中
									var checkeds = $('#plans-checked tr.plan');
									if (checkeds.length >= validNums) {
										self.changeAdPlansView(1);
										$(this).attr('checked', false);
									} else {
										self.addCheckedTaokeAdPlan(tr);
										if (checkeds.length == (validNums - 1)) {
											self.changeAdPlansView(1);
										}
									}
								} else {
									self.removeCheckedTaokeAdPlan(tr);
								}
							});
		},
		/**
		 * 切换搜索广告计划视图
		 * 
		 * @param {}
		 *            view
		 */
		changeAdPlansView : function(view) {
			var button = $('#plansViewButton');
			var api = this.element.scrollable({
						api : true
					});
			if (0 == view) {
				api.seekTo(0);
				button.text('查看已选广告');
			} else {
				api.seekTo(1);
				button.text('返回搜索结果');
			}
		},
		/**
		 * 添加选中
		 * 
		 * @param {}
		 *            tr
		 */
		addCheckedTaokeAdPlan : function(tr) {
			var self = this;
			var tr = tr.clone();
			tr
					.find('input[type="checkbox"][name="plans"]')
					.replaceWith('<img src="/assets/images/delete.gif" style="cursor:pointer;" class="deleteImg"/>');
			$('#plans-checked').prepend(tr);
			tr.find('.plan-view').click(function() {
				self
						.showAdPlanItems($(this).parents('tr.plan'),
								'plan-checked');
			});
			$('.deleteImg', tr).click(function() {
						self.removeCheckedTaokeAdPlan(tr);
					});
		},
		/**
		 * 移除选中
		 * 
		 * @param {}
		 *            tr
		 */
		removeCheckedTaokeAdPlan : function(tr) {
			var pid = tr.attr('pid');
			$('#plans-checked tr[pid="' + pid + '"]').remove();// 移除已选
			$('#plans-search tr[pid="' + pid
					+ '"] input[type="checkbox"][name="plans"]').attr(
					'checked', false);
		},
		/**
		 * 显示当前计划所有的推广商品
		 * 
		 * @param {}
		 *            tr
		 * @param {}
		 *            prefix
		 * @return {Boolean}
		 */
		showAdPlanItems : function(tr, prefix, count) {
			var parent = tr;
			var next = parent.next();
			if (next.length == 0 || next.hasClass('plan')) {
				tr.parents('.wTable:first').find('tr.plan-items').hide();
				var id = prefix + parent.attr('pid');
				var tr = $('<tr class="plan-items"><td colspan='
						+ (count ? count : 5) + ' id="' + id + '"></td></tr>');
				parent.after(tr);
				getHtmlContent(id, '/router/member/sitemanager/plan/items/'
								+ parent.attr('pid'), 'GET', {},
						function(data) {
							$('#' + id).empty().append(data);
						});
			} else {
				if (next.is(':hidden')) {
					tr.parents('.wTable:first').find('tr.plan-items').hide();
					next.fadeIn();
				} else {
					next.fadeOut();
				}
			}
			return false;
		}

	});
})(jQuery);
