(function($) {
	$.widget("ui.pageCidsEditor", {
		/**
		 * 参数
		 */
		options : {
			cid : ''
		},
		_create : function() {
		},
		/**
		 * Page-Cids-Editor初始化
		 */
		_init : function() {
			var self = this;
			var editor = self.element;// 内容区
			// 弹出框初始化
			editor.dialog({
				bgiframe : true,
				autoOpen : false,
				width : 950,
				position : 'top',
				zIndex : 1000,
				modal : true,
				buttons : {
					'取消' : function() {
						editor.dialog('close');
					},
					'确定' : function() {
						var selected = $('#J_OlCatePath li:last');
						if (selected.length == 0) {
							alert('您尚未选择分类');
							return;
						}
						var cat = selected.find('span');
						$('#ci-s-cid').val(cat.text()).attr('cid',
								cat.attr('cid'));
						$('#J_OpenCids').attr('cid', cat.attr('cid'));
						editor.dialog('close');
					}
				},
				open : function() {
					var cid = $('#ci-s-cid').attr('cid');
					if (!cid) {
						cid = '';
					}
					$.ajax({
								url : '/router/member/page/cids?v='
										+ Math.random(),
								type : 'GET',
								data : {
									cid : cid
								},
								dataType : 'html',
								beforeSend : function(xhr) {
									xhr.setRequestHeader("WindType", "AJAX");// 请求方式
									xhr
											.setRequestHeader("WindDataType",
													"HTML");// 请求返回内容类型
								},
								error : function(request, textStatus,
										errorThrown) {
								},
								success : function(data) {
									editor.empty().append(data);
									editor.find('ul li').click(function() {
												self.clickPageCidsLi($(this));
											});
									var i = 0;
									$('#J_OlCascadingList .page-cats ul').each(
											function() {
												var li = $(this)
														.find('li.selected');
												if (li.length == 1) {
													$('#J_OlCatePath')
															.append('<li '
																	+ (i == 0
																			? 'class="root"'
																			: '')
																	+ '><span cid='
																	+ li
																			.attr('cid')
																	+ '>'
																	+ li
																			.find('span')
																			.text()
																	+ '</span></li>');
													i++;
												} else {
													return false;
												}
											});
								}
							});

				}
			});

		},
		clickPageCidsLi : function(li) {
			li.addClass('selected').siblings().removeClass('selected');
			var current = li.parents('.page-cats:first');
			current.nextAll().remove();
			var index = current.index();
			if (index > 0) {
				$('#J_OlCatePath li').eq(index - 1).nextAll().remove();
				$('#J_OlCatePath').append('<li><span cid=' + li.attr('cid')
						+ '>' + li.find('span').text() + '</span></li>');
			} else {
				$('#J_OlCatePath').empty().append('<li class="root"><span cid='
						+ li.attr('cid') + '>' + li.find('span').text()
						+ '</span></li>');
			}

			if (li.hasClass('parent')) {
				var self = this;
				var length = $('#J_OlCascadingList .page-cats').length;
				PageUtils.loadCatsByParentCid(li.attr('cid'), function(cats) {
							if (cats && cats.length > 0) {
								var ul = $('<ul></ul>');
								for (var i = 0; i < cats.length; i++) {
									var cat = cats[i];
									var isParent = cat.isParent && length < 4;
									var liStr = $('<li'
											+ (isParent
													? ' class="parent" '
													: ' ') + 'cid="' + cat.cid
											+ '"><span>' + cat.name
											+ '</span></li>');
									liStr.click(function() {
												self.clickPageCidsLi($(this))
											});
									ul.append(liStr);
								}
								$('#J_OlCascadingList')
										.append($('<li class="page-cats"></li>')
												.append(ul));
							}
						});
			}
		}
	});

})(jQuery);
