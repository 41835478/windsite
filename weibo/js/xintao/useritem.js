(function(X, $) {
	var getCfg = X.getCfg, doc = document, Req = X.request, Util = X.util, T = X.ax.Tpl, Box = X.ui.MsgBox, Pagelet = X.ax.Pagelet, getText = X.lang.getText;
	var mod = X.mod;

	getUserItemWeiboList(1);
	Xwb.use("action").reg("openUserItem", function(e) {
				X.use('userItemBox').display(true);
			}, {
				na : true
			});
	Xwb.use("action").reg("deleteUserItem", function(e) {
		var checkeds = $('#recordListCustome input[name="user_items"]:checked');
		if (checkeds.length == 0) {
			alert('您尚未选择要删除的商品');
			return false;
		}
		var numIids = [];
		checkeds.each(function() {
					numIids.push($(this).attr('data-nid'));
				});
		var load = Xwb.ui.MsgBox.alert('删除提示',
				'<div id="xweibo_loading" class="loading"></div>');
		$.ajax({
			type : 'POST',
			url : '/admin.php?m=mgr/xintao/yingxiaoWeibo.deleteYingxiaoUserItem',
			dataType : 'json',
			data : {
				'num_iids' : numIids.join(',')
			},
			success : function(data) {
				load.setContent('删除成功');
				window.location.reload();
			}
		});
	}, {
		na : true
	});

	X.addUserItem = function(e) {
		$add = $(e.src);
		e.lock(1);// 锁住，防止重复点击
		$nid = $add.attr('data-nid');
		if (!$nid) {
			alert('无法添加当前商品');
			return false;
		}
		var alert = Xwb.ui.MsgBox.alert('添加提示',
				'<div id="xweibo_loading" class="loading"></div>');
		$.ajax({
			type : 'POST',
			url : '/admin.php?m=mgr/xintao/yingxiaoWeibo.addYingxiaoUserItem',
			dataType : 'json',
			data : {
				'nid' : $nid,
				'title' : $add.attr('data-title'),
				'price' : $add.attr('data-price'),
				'nick' : $add.attr('data-nick'),
				'pic_url' : $add.attr('data-pic_url'),
				'volume' : $add.attr('data-volume'),
				'cid' : $add.attr('data-cid')
			},
			success : function(data) {
				if (data.state == 200) {
					alert.setIcon('success');
					alert.setContent('添加成功');
					if ($add.hasClass('addfollow-btn'))
						$add
								.replaceWith('<span class="followed-btn item-faved">已添加</span>');
				} else if (data.state == 201) {
					alert.setIcon('alert');
					alert.setContent('该商品已添加');
				} else if (data.state == 203) {
					alert.setIcon('alert');
					alert.setContent('您最多可以添加40个商品，请删除一些再添加');
				} else {
					alert.setIcon('alert');
					alert.setContent('添加失败');
				}
				e.lock(0);// 解锁
			}
		});
	}
	Xwb.ax.Tpl.reg({
		UserItemBoxContent : [
				'<div class="mod-search" style="padding:0px 55px;height:53px;">',
				'<div class="search-area" style="padding-top:0px;height:50px;background: none;">',
				'<div class="search-block">',
				'<div class="search-inner">',
				'<input type="text" class="input-txt" value="" name="q"  id="J_ItemSearchQ" autocomplete="off"/>',
				'</div>',
				'<a href="#" class="s-btn skin-btn" id="J_ItemSearchButton">搜索</a>',
				'</div></div></div>',
				'<div class="box" id="J_ItemSearchBox" style="height:450px;overflow:auto;position:relative;" align="center"></div>']
				.join('')
	});
	/**
	 * @class Xwb.mod.userItemBox 商品弹出框
	 * @extends Xwb.ui.Box
	 * @singleton
	 */

	// 这写法是调用时才实例化
	X.reg('userItemBox', function() {
		var inst = X.use('Box', {
			actionMgr : true,
			title : '添加淘宝店铺商品',
			closeable : true,
			autoCenter : true,
			appendTo : doc.body,
			mask : true,
			cs : 'win-item',
			contentHtml : 'UserItemBoxContent',
			tips : '',
			onViewReady : function(v) {
				this.initSearch();
			},
			onactiontrig : function(e) {
				switch (e.data.e) {
					case 'addtb' :// 添加
						if (ISSELLER) {
							X.addUserItem(e);
						} else {
							Xwb.ui.MsgBox
									.alert('升级提示',
											'您需要<a href="#" rel="e:openAppstore">订购卖家服务</a>后，才能手动添加商品');
							return false;
						}
						break;
				}
			},
			initSearch : function() {
				var self = this;
				this.jq().css('top', 100);// 调整顶部
				$('#J_ItemSearchQ').focusText("搜索  我的店铺  商品");
				$('#J_ItemSearchQ').keydown(function(e) {
							var kc = e.keyCode;
							if (kc === 13)
								$('#J_ItemSearchButton').click();
						});
				$('#J_ItemSearchButton').click(function() {
							self.searchItems(1, true);
							return false;
						}).click();
			},
			searchItems : function(pageNo, isDefault) {
				var self = this;
				var q = $('#J_ItemSearchQ').val();
				if (q == '搜索  我的店铺  商品') {
					q = '';
				}
				q = encodeURIComponent(q);
				var order_by = '', start_price = '', end_price = '', page_no = 1;
				if (!isDefault) {
					order_by = $('#J_FilterOrderBy a.crt').attr('data-value');
					start_price = $('#J_StartPrice').val();
					end_price = $('#J_EndPrice').val();
					page_no = pageNo ? pageNo : $('#J_ParamPageNo').val();
				}

				$('#J_ItemSearchBox')
						.html('<div id="xweibo_loading" class="loading"></div>');
				$.get('/admin.php?m=mgr/xintao/yingxiaoWeibo.userItemBox', {
							'q' : q,
							'order_by' : order_by,
							'page_no' : page_no
						}, function(rst) {
							if (rst['errno'] > 0) {
								alert('获取失败:' + rst['err']);
								return;
							}
							$('#J_ItemSearchBox').html(rst['rst']);
							$('#rank-priceform').hover(function() {
										$('#rank-priceform').addClass('focus');
									}, function() {
										$('#rank-priceform')
												.removeClass('focus');
									});
							$('#J_PriceButton').click(function() {
										self.searchItems();
										return false;
									});
							$('#J_FilterOrderBy li a').click(function() {
										$('#J_FilterOrderBy li a')
												.removeClass('crt');
										$(this).addClass('crt');
										self.searchItems();
										return false;
									});
							self
									.jq('.page-top .page-next,.page-top .page-prev,.page-bottom a')
									.click(function() {
										self.searchItems($(this)
												.attr('data-page'));
										return false;
									});
							$('#J_ItemSearchBox a.J_TrackItem').click(
									function() {
										X.trackItem($(this));
									});
						});
			}
		});

		X.reg('userItemBox', inst, true);
		return inst;
	});
})(Xwb, $);

function getUserItemWeiboList(page_no) {
	$('#recordWeiboList')
			.html('<tr><td colspan=2><div id="xweibo_loading" class="loading"></div></td></tr>');
	$.get('/admin.php?m=mgr/xintao/yingxiaoWeibo.userItemWeiboList', {
				'page' : page_no
			}, function(rst) {
				if (rst['errno'] > 0) {
					alert('获取失败:' + rst['err']);
					return;
				}
				$('#recordWeiboList').html(rst['rst']);
				$('#recordWeiboList .pre-next a').click(function() {
							var page = 1;
							if ($(this).hasClass('next')) {
								page = page_no + 1;
							} else if ($(this).hasClass('pre')) {
								page = page_no - 1;
							} else {
								page = $(this).text();
							}
							getUserItemWeiboList(page);
							return false;
						});

			});
}