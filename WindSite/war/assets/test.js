jQuery(function($) {
	$('#X_Theme-Btn').click(function() {
				var self = $(this);
				self.button('loading');
				var linkColor = $.jPicker.List[0].color.active.val('hex');
				if (!linkColor) {
					alert('您尚未设置全站颜色');
				}
				linkColor = '#' + linkColor;
				XT.synThemes(SID, linkColor, function(response) {
							alert(response);
							self.button('reset');
						}, function(request, error, status) {
							self.button('reset');
						});
				return false;
			});
	$('#linkColor').jPicker({
				window : {
					position : {
						x : 'screenCenter',
						y : 'center'
					}
				},
				images : {
					clientPath : '<?php echo XT_CORE_JS_URL; ?>/jpicker/images/'
				},
				localization : {
					text : {
						title : '在面板中选取颜色',
						newColor : '新的',
						currentColor : '当前',
						ok : '确定',
						cancel : '取消'
					}
				}
			});
});