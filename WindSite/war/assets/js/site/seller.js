var isAddHomeFriend = false;
/**
 * 同步推广店铺
 * 
 * @param {}
 *            sid
 */
function synShop(sid) {
	var sender = new WindSender("/router/member/sellermanager/shop/syn");
	sender.load('GET', {}, function(response) {
				if (response.isSuccess()) {
					alert('您的店铺推广信息同步成功');
					document.location.href = "/router/member/sellermanager";
				} else {
					alert(response.msg);
				}
			});
}
/**
 * 查询推广组类淘客
 * 
 * @param {}
 *            pageNo
 * @param {}
 *            num_iid
 */
function createSellerGroupMembers(pageNo, num_iid, member) {
	if (!pageNo) {
		pageNo = 1;
	}
	$('#filterNum-title').empty();
	$('#filterTr').hide();
	if (num_iid && num_iid != '') {
		member = '';
		$('#filterNum-title').empty().append('>>'
				+ $('#profileBody .filterNumIid[nid="' + num_iid + '"]')
						.attr('title'));
	}
	if (member && member != '') {
		num_iid = '';
		$('#filterNum-title').empty().append('>>'
				+ $('#profileBody .filterMember[member="' + member + '"]')
						.attr('title'));
	}
	$('#profileBody')
			.empty()
			.append("<tr id='loading'><td colspan=4><div  align='left'>正在加载数据,请稍候...</div></td></tr>");
	$.ajax({
		url : "/router/member/seller/members/group?v=" + Math.random(),
		type : 'POST',
		data : {
			nick : $('#nick').val(),
			pageNo : pageNo,
			num_iid : num_iid,
			member : member
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
			$('#profileBody').empty().append(data);
			$('#profileBody .page-number').click(function() {
				createSellerGroupMembers($('a', $(this)).text(), num_iid,
						member);
				return false;
			});
			$('#profileBody .pgNext').click(function() {
				if (!$(this).hasClass('pgEmpty')) {
					createSellerGroupMembers($(this).attr('page'), num_iid,
							member);
				}
				return false;
			});
			$('#profileBody .filterNumIid').click(function() {
						createSellerGroupMembers(1, $(this).attr('nid'));
					});
			$('#profileBody .filterMember').click(function() {
						createSellerGroupMembers(1, '', $(this).attr('member'));
					});
			$('#profileBody .addHomeFriend').click(function() {
				var self = $(this);
				addHomeFriend($(this).attr('uid'), $(this).attr('fuid'), '',
						function() {
							self.parent().empty().append('等待好友验证');
						});
			});
			if (num_iid || member) {
				$('#filterTr').show();
			}
		}
	});
}
/**
 * 查询店铺类淘客
 * 
 * @param {}
 *            pageNo
 * @param {}
 *            num_iid
 */
function createSellerShopMembers(pageNo) {
	if (!pageNo) {
		pageNo = 1;
	}
	$('#profileBody')
			.empty()
			.append("<tr id='loading'><td colspan=3><div  align='left'>正在加载数据,请稍候...</div></td></tr>");
	$.ajax({
				url : "/router/member/seller/members/shop?v=" + Math.random(),
				type : 'POST',
				data : {
					sid : $('#sid').val(),
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
					$('#profileBody').empty().append(data);
					$('#profileBody .page-number').click(function() {
								createSellerShopMembers($('a', $(this)).text());
								return false;
							});
					$('#profileBody .pgNext').click(function() {
								if (!$(this).hasClass('pgEmpty')) {
									createSellerShopMembers($(this)
											.attr('page'));
								}
								return false;
							});
					$('#profileBody .addHomeFriend').click(function() {
						var self = $(this);
						addHomeFriend($(this).attr('uid'),
								$(this).attr('fuid'), '', function() {
									self.parent().empty().append('等待好友验证');
								});
					});
				}
			});
}
/**
 * 查询组件类淘客
 * 
 * @param {}
 *            pageNo
 * @param {}
 *            wid
 */
function createSellerWidgetMembers(pageNo, wid) {
	if (!pageNo) {
		pageNo = 1;
	}
	if (!wid) {
		wid = '';
		$('#filterNum-title').empty();
		$('#filterTr').hide();
	} else {
		$('#filterNum-title').empty()
				.append('>>'
						+ $('#profileBody .filterWid[wid="' + wid + '"]')
								.attr('title'));
	}
	$('#profileBody')
			.empty()
			.append("<tr id='loading'><td colspan=4><div  align='left'>正在加载数据,请稍候...</div></td></tr>");
	$.ajax({
		url : "/router/member/seller/members/widget?v=" + Math.random(),
		type : 'POST',
		data : {
			user_id : $('#user_id').val(),
			pageNo : pageNo,
			wid : wid
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
			$('#profileBody').empty().append(data);
			$('#profileBody .page-number').click(function() {
						createSellerWidgetMembers($('a', $(this)).text(), wid);
						return false;
					});
			$('#profileBody .pgNext').click(function() {
						if (!$(this).hasClass('pgEmpty')) {
							createSellerWidgetMembers($(this).attr('page'), wid);
						}
						return false;
					});
			$('#profileBody .filterWid').click(function() {
						createSellerWidgetMembers(1, $(this).attr('wid'));
					});
			$('#profileBody .addHomeFriend').click(function() {
				var self = $(this);
				addHomeFriend($(this).attr('uid'), $(this).attr('fuid'), '',
						function() {
							self.parent().empty().append('等待好友验证');
						});
			});
			if (wid) {
				$('#filterTr').show();
			}
		}
	});
}