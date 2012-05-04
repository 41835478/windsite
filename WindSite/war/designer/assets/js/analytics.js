(function($) {
	$.widget("ui.analytics", {
				/**
				 * 参数
				 */
				options : {},

				/**
				 * 组件初始化
				 */
				_init : function() {
					var self = this;
					o = self.options;
					var analytics = self.element;// 组件
					var sender = new WindSender("/router/member/designer/analytics");
					// 保存
					$('#analytics_update').button().click(function() {
								var type = $('input[type=radio][checked]',
										analytics);
								if (type.length == 0) {
									alert('您尚未选择默认的站点统计');
									return;
								}
								var anay = $('#' + type.val());
								if (anay.val() == '') {
									alert('当前默认的站点统计标识不能为空');
									return;
								}
								var sid = $('#designer').designer('option',
										'sid');
								sender.load('POST', {
											sid : sid,
											type : type.val(),
											gid : $('#analytics_google').val(),
											lid : $('#analytics_linezing')
													.val(),
											laid : $('#analytics_51la').val()
										}, function(response) {
											if (response.isSuccess()) {
												alert('站点统计信息更新成功');
												$('#ui-designer-topbar').tabs({
															selected : -1
														});
											} else {
												alert(response.msg);
											}
										});

							});
					// 取消
					$('#analytics_cancel').button().click(function() {
								$('#ui-designer-topbar').tabs({
											selected : -1
										});
							});
				}
			});
})(jQuery);
