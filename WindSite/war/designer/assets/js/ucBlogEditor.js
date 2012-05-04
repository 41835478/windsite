/**
 * UCHome日志选择组件
 */
(function($) {
	$.widget("ui.ucBlogEditor", {
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
			var ucBlogEditor = self.element;// 组件
			ucBlogEditor.dialog({
				bgiframe : true,
				autoOpen : false,
				resizable : false,
				width : 620,
				height : 500,
				zIndex : 100000,
				modal : true,
				buttons : {
					'取消' : function() {
						$(this).dialog('close');
					},
					'确定' : function() {
						if (editingUCBlog != null) {
							editingUCBlog.empty();
							$('input[type="checkbox"][name="uc-blogs-blog"]:checked')
									.each(function() {
										editingUCBlog
												.append('<dt><a href="http://home.xintaonet.com/space.php?uid='
														+ $(this).attr('uid')
														+ '&do=blog&id='
														+ $(this).attr('bid')
														+ '" target="_blank"><span>'
														+ $(this).attr('title')
														+ '</span></a></dt>');
									});
							$(this).dialog('close');
						}
					}
				},
				open : function() {
					ucBlogEditor.load('/router/member/uc/class', function() {

							});
				}
			});

		}
	});
})(jQuery);
