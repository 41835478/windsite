/**
 * 搜索框编辑器
 */
(function($) {
	$.widget("ui.netLinkViewEditor", {
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
			var linkEditor = self.element;// 组件
			var isEffect = false;// DesignerUtils.isShowDragWidget();
			linkEditor.dialog({
						show : isEffect ? 'drop' : null,
						hide : isEffect ? 'explode' : null,
						bgiframe : true,
						autoOpen : false,
						resizable : false,
						width : 780,
						height : 400,
						zIndex : 100000,
						modal : true,
						open : function() {
							var ul = $('ul', $(this));
							$('li', ul).remove();
							if (editingNetLink != null) {
								var as = $('li a', editingNetLink);
								if (as.length > 0) {
									as.each(function() {
												var li = $(this).parent();
												var isV = true;
												if ('left' == li.css('float')) {
													isV = false;
												}
												ul.append(self._createLi(
														$(this).text(), $(this)
																.attr('href'),
														isV));
											});
								} else {
									ul.append(self._createLi('', '', false));
								}
							} else {
								alert('未指定要编辑的友情链接');
							}
						},
						buttons : {
							'取消' : function() {
								$(this).dialog('close');
							},
							'确认' : function() {
								var titles = $('.linkeditor-title', $(this));
								if (titles.length == 0) {
									alert('尚未添加友情链接');
								}
								var count = 0;
								titles.each(function() {
											var title = $(this).val();
											if (!title || title == '') {
												alert('请填写链接标题');
												$(this).focus();
												count++;
												return false;
											}
										});
								if (count > 0) {
									return;
								} else {
									count = 0;
								}
								var hrefs = $('.linkeditor-href', $(this));
								hrefs.each(function() {
											var href = $(this).val();
											if (href == '') {
												alert('链接地址不能为空');
												$(this).focus();
												count++;
												return false;
											}
											if (!DesignerUtils.isURL(href)) {
												alert('链接地址不合法.');
												$(this).focus();
												count++;
												return false;
											}
											if (href.indexOf('http://') == -1) {
												$(this).val('http://' + href);
											}
										});
								if (count > 0) {
									return;
								} else {
									count = 0;
								}
								$('li', editingNetLink).remove();
								$('ul li', $(this)).each(function() {
									editingNetLink.append(self
											._createLiNetLink($(this)));
								});
								$(this).dialog('close');
							}
						}
					});
			$('#netLinkConfirmButton').button().click(function() {
						self.addSiteUrl();
					});
			$('#netLinkCancelButton').button().click(function() {
						linkEditor.dialog('close');
					});
			$('#netLink_add').button().click(function() {
						self.addSiteUrl();
					});
		},
		_createLiNetLink : function(li) {
			var title = $('.linkeditor-title', li).val();
			var href = $('.linkeditor-href', li).val();
			var isV = $('input[type="checkbox"]', li).attr('checked');
			var li = '<li style="float:' + (isV ? 'none' : 'left')
					+ '"><a target="_blank" href="' + href
					+ '" class="title" title="' + title + '">' + title
					+ '</a></li>'
			return li;
		},
		_createLi : function(title, href, isV) {
			var self = this;
			var li = '<li><a class="linkeditor-add">新增</a><a class="linkeditor-remove">删除</a><a class="linkeditor-up">上移</a><a class="linkeditor-down">下移</a>';
			li += '<input class="linkeditor-title" value="' + title
					+ '"/><input class="linkeditor-href" value="' + href
					+ '"/><input type="checkbox" ' + (isV ? 'checked' : '')
					+ '>是否竖排';
			li += '</li>';
			li = $(li);
			$('.linkeditor-add', li).click(function() {
						$(this).parent().after(self._createLi('', ''));
					});
			$('.linkeditor-remove', li).click(function() {
						var li = $(this).parent();
						var ul = li.parent();
						if (ul.find('li').length == 1) {
							alert('不能删除该列，您至少要保留一个友情链接');
							return;
						}
						li.remove();
					});
			$('.linkeditor-up', li).click(function() {
						var li = $(this).parent();
						var prev = li.prev();
						if (prev.length == 1) {
							prev.before(li);
						} else {
							li.parent().append(li);
						}
					});
			$('.linkeditor-down', li).click(function() {
						var li = $(this).parent();
						var next = li.next();
						if (next.length == 1) {
							next.after(li);
						} else {
							li.parent().prepend(li);
						}
					});
			return li;
		},
		addSiteUrl : function() {
			var self = this;
			var title = $('#netLink_title').val();
			if (title == '') {
				alert('链接标题不能为空');
				return;
			}
			var href = $('#netLink_href').val();
			if (href == '') {
				alert('链接地址不能为空');
				return;
			}
			if (!DesignerUtils.isURL(href)) {
				alert('链接地址不合法.');
				return;
			}
			if (href.indexOf('http://') == -1) {
				href = 'http://' + href;
			}
			var oA = editingNetLink.find('li a[href="' + href
					+ '"][ntype="self"]');
			if (oA.length > 0) {
				alert('友情链接重复,请更改友情链接地址');
				return;
			}
			var layout = $('input[type="radio"][name="netLinkLayout"]:checked');
			if (layout.length > 0 && layout.val() == '1') {
				_float = ' style="float:none"';
			} else {
				_float = ' style="float:left"';
			}
			var li = $('<li' + _float
					+ '><a target="_blank" ntype="self" href="' + href + '">'
					+ title + '</a></li>');
			editingNetLink.append(li);
			this.addLiHover(li);
			alert('友情链接【' + title + '】添加成功');
			$('#netLink_title').val('');
			$('#netLink_href').val('');
		},
		getHtmlNetLinkSearch : function(type, keyword) {
			var self = this;
			self.getHtmlContent("/router/member/designer/netlink/search",
					"POST", {
						"type" : type,
						"keyword" : keyword
					}, function(data) {
						$("#rightContent").empty();
						$("#rightContent").append(data);
					});
		},
		getHtmlContent : function(url, type, data, callback) {
			$("#rightContent").empty();
			$("#rightContent")
					.append("<div id='loading' align='left'>正在加载数据,请稍候...</div>");
			$.ajax({
						url : url,
						type : type,
						data : data,
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
							callback(data);
						}
					});
		},
		addLiHover : function(li) {
			li.hover(function() {
				var X = $(this).position().top;
				var Y = $(this).position().left;
				$(this)
						.append("<div id=\"deleteImg\" style=\"cursor: pointer;position:absolute;top:"
								+ (X - 15)
								+ "px;left:"
								+ (Y)
								+ "px;\"><img src=\"/assets/images/delete.gif\"/></div>");
				$("#deleteImg").click(function() {
							$(this).parent().remove();// 删除当前li
						});
			}, function() {
				$("#deleteImg").remove();
			});
		}
	});
})(jQuery);
