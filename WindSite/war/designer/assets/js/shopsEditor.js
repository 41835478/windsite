/**
 * 店铺编辑器
 */
(function($) {
	$.widget("ui.shopsEditor", {
		/**
		 * 参数
		 */
		options : {},
		/**
		 * 创建组件
		 */
		_create : function() {

		},
		/**
		 * 组件初始化
		 */
		_init : function() {
			var self = this;
			o = self.options;
			var shopsDialog = self.element;// 组件
			var sender = new WindSender("/router/member/designer/shops?version="
					+ Math.random());
			shopsDialog.load('/designer/assets/toolbar/shops/shopseditor.html',
					function() {
						shopsDialog.dialog({
							bgiframe : true,
							autoOpen : false,
							resizable : false,
							width : 850,
							height : 500,
							zIndex : 100000,
							modal : true,
							buttons : {
								'取消' : function() {
									shopsDialog.dialog('close');
								},
								'确定' : function() {
									var selected = $('#shops-selected-body')
											.children();
									if (selected.length > 0) {
										editingShopsEditor.empty();
										selected.each(function() {
													var img = $('.deleteImg',
															$(this));
													var shop = {};
													shop.title = img
															.attr("title");
													shop.shortTitle = $(
															'input', $(this))
															.val();
													shop.sid = img.attr('sid');
													shop.commission = img
															.attr('commission');
													shop.click_url = img
															.attr('click_url');
													shop.credit = img
															.attr('credit');
													editingShopsEditor
															.append(editingShopsEditor
																	.parent()
																	.shopsListView(
																			'shopLi',
																			shop));
												});
									}
									shopsDialog.dialog('close');
								}
							}
						}).tabs();
						self._resotrSelected();
						$('#shops-body')
								.empty()
								.append("<tr><td colspan=4><div id='loading' align='left'>正在加载数据,请稍候...</div></td></tr>");

						sender.load('GET', {}, function(response) {
							if (response.isSuccess()) {
								$('#shops-body').empty();
								if (response.body.length > 0) {
									for (var i = 0; i < response.body.length; i++) {
										var shop = response.body[i];
										var commission = (Math
												.round(shop.commission_rate
														* 10000))
												/ 100;
										var click_url = shop.click_url.replace(
												'13667242', convertPID());
										var level = 1;
										try {
											level = taobaoCredit(parseInt(shop.level))
										} catch (e) {
										}
										$('#shops-body')
												.append('<tr><td><input type="checkbox" title="'
														+ shop.title
														+ '" name="shops-checkedbox" value="'
														+ shop.sid
														+ '" commission="'
														+ commission
														+ '" click_url="'
														+ click_url
														+ '" credit="'
														+ level
														+ '"/></td><td><a href="'
														+ click_url
														+ '" target="_blank">'
														+ shop.title
														+ '</a></td><td>'
														+ commission
														+ '%</td><td><img src="/assets/min/images/credit/'
														+ level
														+ '.gif"/></td></tr>');
									}
									$('#shops-body input[type="checkbox"][name="shops-checkedbox"]')
											.change(function() {
												if ($(this).is(':checked')) {
													self._addSelected($(this));
												} else {
													self._removeSelect($(this));
												}
											});
								}
							} else {
								alert(response.msg);
								$('#shops-body').empty();
							}

						}, function() {
							alert('店铺加载失败');
							$('#shops-body').empty();
						});
						shopsDialog.dialog('open');
					});

		},
		_resotrSelected : function() {
			var self = this;
			if (editingShopsEditor != null) {
				editingShopsEditor.children().each(function() {
					var title = $(this).attr("title");
					var shortTitle = $('.title', $(this)).text();
					var sid = $(this).attr('sid');
					var commission = $(this).attr('commission');
					var click_url = $('a', this).attr('href');
					var credit = $(this).attr('credit');
					self._addShopTR(shortTitle, title, sid, commission,
							click_url, credit);
				});

			}
		},
		_addSelected : function(shop) {
			var title = shop.attr("title");
			var sid = shop.val();
			var commission = shop.attr('commission');
			var click_url = shop.attr('click_url');
			var credit = shop.attr('credit');
			this._addShopTR(title, title, sid, commission, click_url, credit);
		},
		_addShopTR : function(shortTitle, title, sid, commission, click_url,
				credit) {
			$('#shops-selected-body #' + sid).remove();
			$('#shops-selected-body')
					.append('<tr id="'
							+ sid
							+ '"><td><img src="/assets/images/delete.gif" style="cursor:pointer;" class="deleteImg" title="'
							+ title
							+ '" sid="'
							+ sid
							+ '" commission="'
							+ commission
							+ '" click_url="'
							+ click_url
							+ '" credit="'
							+ credit
							+ '"/></td><td><input type="text" name="shops-selected-title" value="'
							+ shortTitle + '"/></td><td>' + commission
							+ '%</td><td><img src="/assets/min/images/credit/'
							+ credit + '.gif"/></td></tr>');
			$('#' + sid + ' .deleteImg').click(function() {
						$('#' + sid).remove();
					});
		},
		_removeSelect : function(shop) {
			$('#shops-selected-body #' + shop.val()).remove();
		}
	});
})(jQuery);
