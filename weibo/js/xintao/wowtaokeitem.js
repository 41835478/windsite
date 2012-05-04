$(function() {
			$('#J_WowCat').change(function() {
				$('#J_WowFilter a:first').addClass('current').siblings()
						.removeClass('current');
				getWowTaokeItemList(1);
			}).change();
			$('#J_WowFilter a').click(function() {
						$(this).addClass('current').siblings()
								.removeClass('current');
						getWowTaokeItemList(1);
					});
		});
(function(X, $) {
	var getCfg = X.getCfg, doc = document, Req = X.request, Util = X.util, T = X.ax.Tpl, Box = X.ui.MsgBox, Pagelet = X.ax.Pagelet, getText = X.lang.getText;
	var mod = X.mod;
	// getWowTaokeItemList(1);
	Xwb.use("action").reg("openTaokeItem", function(e) {
				X.use('taokeItemBox').display(true);
			}, {
				na : true
			});
	Xwb.use("action").reg("deleteTaokeItem", function(e) {
		var checkeds = $('#recordList input[name="taoke_items"]:checked');
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
					url : '/admin.php?m=mgr/xintao/wowMgr.deleteWowTaokeItem',
					dataType : 'json',
					data : {
						'num_iids' : numIids.join(','),
						'cat' : $('#J_WowCat').val()
					},
					success : function(data) {
						load.setContent('删除成功');
						getWowTaokeItemList(1);
					}
				});
	}, {
		na : true
	});

	X.addWowTaobaokeItem = function(e) {
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
			url : '/admin.php?m=mgr/xintao/wowMgr.addWowTaokeItem',
			dataType : 'json',
			data : {
				'nid' : $nid,
				'title' : $add.attr('data-title'),
				'price' : $add.attr('data-price'),
				'nick' : $add.attr('data-nick'),
				'pic_url' : $add.attr('data-pic_url'),
				'commission' : $add.attr('data-commission'),
				'commission_num' : $add.attr('data-commission_num'),
				'volume' : $add.attr('data-volume'),
				'cat' : $('#J_WowCat').val()
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
					alert.setContent('您最多可以添加400个商品，请删除一些再添加');
				} else {
					alert.setIcon('alert');
					alert.setContent('添加失败');
				}
				e.lock(0);// 解锁
			}
		});
	}

})(Xwb, $);

function getWowTaokeItemList(page_no) {
	if (!XT_IS_WEIBO) {
		return;
	}
	$('#recordList')
			.html('<tr><td colspan=3><div id="xweibo_loading" class="loading"></div></td></tr>');
	$.get('/admin.php?m=mgr/xintao/wowMgr.taokeItem', {
				'page' : page_no,
				'isValid' : $('#J_WowFilter a.current').attr('data-value'),
				'cat' : $('#J_WowCat').val()
			}, function(rst) {
				if (rst['errno'] > 0) {
					alert('获取失败:' + rst['err']);
					return;
				}
				$('#recordList').html(rst['rst']);
				$('#recordList .pre-next a').click(function() {
							var page = 1;
							if ($(this).hasClass('next')) {
								page = page_no + 1;
							} else if ($(this).hasClass('pre')) {
								page = page_no - 1;
							} else {
								page = $(this).text();
							}
							getWowTaokeItemList(page);
							return false;
						});

			});
}