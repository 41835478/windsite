/**
 * 画报编辑器
 */
(function($) {
	$.widget("ui.huabaoEditor", {
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
			var huabaoDialog = self.element;// 组件
			huabaoDialog.dialog({
				bgiframe : true,
				autoOpen : false,
				resizable : false,
				width : 780,
				height : 500,
				zIndex : 100000,
				modal : true,
				buttons : {
					'取消' : function() {
						huabaoDialog.dialog('close');
					},
					'确定' : function() {
						if (editingHuabaoEditor == null) {
							alert('未选择画报组件');
							return;
						}
						var selected = $('#huabao-search .items .active');
						if (selected.length == 0) {
							alert('尚未选择要显示的指定画报');
							return;
						}
						editingHuabaoEditor
								.empty()
								.append("<div id='loading' align='left'>正在加载数据,请稍候...</div>");
						$.ajax({
									url : '/router/huabao/html/'
											+ selected.attr('h') + '?v='
											+ Math.random(),
									type : 'POST',
									data : {
										nick : USERNICK
									},
									dataType : 'html',
									beforeSend : function(xhr) {
										xhr
												.setRequestHeader("WindType",
														"AJAX");// 请求方式
										xhr.setRequestHeader("WindDataType",
												"HTML");// 请求返回内容类型
									},
									error : function(request, textStatus,
											errorThrown) {
										$("#loading").remove();
										alert(textStatus);
									},
									success : function(data) {
										$("#loading").remove();
										editingHuabaoEditor.append(data);
										HID = selected.attr('h');
										HOTTYPE = selected.attr('t');
										editingHuabaoEditor.parent()
												.huabaoView();
									}
								});
						huabaoDialog.dialog('close');
					}
				}
			});
			$('#huabaoSearchButton').click(function() {
						var selected = $('#huabaoEditorType li a.current');
						var t = 0;
						if (selected.length == 1) {
							t = selected.attr('t');
						}
						self._search($('#huabaoSearchText').val(), t, 1);
						return false;
					});
			$('#huabaoEditorType li a').click(function() {
				$('#huabaoEditorType li a').removeClass('current');
				$(this).addClass('current');
				self
						._search($('#huabaoSearchText').val(), $(this)
										.attr('t'), 1);
				return false;
			}).hover(function() {
				$(this).removeClass('hover').addClass('hover').siblings()
						.removeClass('hover');
			}, function() {
				$(this).removeClass('hover');
			});
		},
		_search : function(words, type, pageNo) {
			var self = this;
			$("#huabao-search")
					.empty()
					.append("<div id='loading' align='left'>正在加载数据,请稍候...</div>");
			$.ajax({
						url : '/router/huabao/designer/search',
						type : 'POST',
						data : {
							words : words,
							type : type,
							pageNo : pageNo
						},
						dataType : 'html',
						beforeSend : function(xhr) {
							xhr.setRequestHeader("WindType", "AJAX");// 请求方式
							xhr.setRequestHeader("WindDataType", "HTML");// 请求返回内容类型
						},
						error : function(request, textStatus, errorThrown) {
							$("#loading").remove();
							alert(textStatus);
						},
						success : function(data) {
							$("#loading").remove();
							$("#huabao-search").html(data);
							$('#huabao-search .page-number').click(function() {
								self._search(words, type, $('a', $(this))
												.text());
								return false;
							});
							$('#huabao-search .pgNext').click(function() {
								if (!$(this).hasClass('pgEmpty')) {
									self._search(words, type, $(this)
													.attr('page'));
								}
								return false;
							});
							$('#huabao-search .h-d-a-i').click(function() {
								$('#huabao-search .h-d-a-i')
										.removeClass('active');
								$(this).addClass('active');
							});
						}
					});
		}
	});
})(jQuery);
