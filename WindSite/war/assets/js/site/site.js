/**
 * 显示版本提示信息
 * 
 * @param {}
 *            version1
 * @param {}
 *            version2
 * @param {}
 *            msg
 * @param {}
 *            callback
 */
function loadVersionInfo(msg) {
	$('#J_VersionNoBox').remove();
	var strs = [
			'<div id="J_VersionNoBox" title="升级提示" style="display:none;position:relative;"><div class="help_info" align="left" style="position:relative;"><h3>选择升级或订购下列任意一个版本，即可使用<strong style="color:red;font-size:14px;font-weight:700;">',
			msg,
			'</strong>【<a href="http://forum.xintaonet.com/viewthread.php?tid=707&extra=page%3D1" style="color:red;font-weight:bold;" target="_blank">升级帮助</a>】</h3><p><ul><li>升级淘客返利版（月租型）[<a target="_blank" href="http://pay.taobao.com/mysub/subdeal/upgrade_order_sub_deal.htm?servId=22000691&appstore=myapp2upgrade" style="color:red;font-weight:700;">升级</a>]</li><li>升级卖家版[<a target="_blank" href="http://pay.taobao.com/mysub/subdeal/upgrade_order_sub_deal.htm?servId=22000691&appstore=myapp2upgrade" style="color:red;font-weight:700;">升级</a>]</li></ul></p><h3>提示：升级或订购后，需退出重新登录才可以生效</h3></div></div>']
	$('body').append(strs.join(''));
	$('#J_VersionNoBox').dialog({
				bgiframe : true,
				autoOpen : true,
				width : 550,
				height : 230,
				zIndex : 1000,
				modal : true
			});// 显示
}
function openHuabaoLoginFanliDialog(picId) {
	openLoginFanliDialog('http://' + WWW + '/huabao/' + HID + '/' + picId
			+ '.html');
}
function openLoginFanliDialog(url) {
	$('#loginFanliDialog').remove();
	$('body')
			.append('<div id="loginFanliDialog" title="会员登录"><table><tr height=30px><td width="110px" height=30px><span style="color: red">*</span> 会员名</td><td><input type="text" style="padding:2px;" id="username" name="username" value=""></td></tr>'
					+ '<tr height=30px><td width="110px" height=30px><span style="color: red">*</span> 密码</td><td><input type="password"  style="padding:2px;" id="pwd" name="pwd" value=""></td></tr>'
					+ '<tr><td colspan=2 height=40px align=center><span class="btn btn-ok"><input type="button" value="登录"></span>&nbsp;&nbsp;&nbsp;<a href="/router/fanli/registe" style="color:#f30;" target="_blank">注册新会员</a>&nbsp;&nbsp;&nbsp;<!--<a href="" style="color:#f30;">找回密码</a>--></td></tr></table>');
	$('#loginFanliDialog .btn-ok').hover(function() {
				$(this).removeClass('btn-ok-hover').addClass('btn-ok-hover');
			}, function() {
				$(this).removeClass('btn-ok-hover');
			}).click(function() {
				if ($(this).hasClass('btn-ok-disabled')) {
					return;
				}
				var username = $('#loginFanliDialog #username').val();
				var pwd = $('#loginFanliDialog #pwd').val();
				if (!username) {
					alert('用户名不能为空');
					$(this).removeClass('btn-ok-disabled');
					return;
				}
				if (!pwd) {
					alert('密码不能为空');
					$(this).removeClass('btn-ok-disabled');
					return;
				}
				$(this).addClass('btn-ok-disabled');
				loginFanliMember(username, pwd, url);
			});
	$('#loginFanliDialog').dialog({
				bgiframe : true,
				autoOpen : false,
				width : 350,
				height : 180,
				zIndex : 1000,
				modal : true
			});
	$('#loginFanliDialog').dialog('open');
}
function loginFanliMember(username, pwd, url) {
	var sender = new WindSender("/router/fanli/loginfl");
	sender.load("POST", {
				username : username,
				password : pwd
			}, function(response) {
				if (response.isSuccess()) {
					if (url) {
						document.location.href = url;
					} else {
						document.location.href = document.location.href;
					}
				} else {
					alert(response.msg);
				}
				$('#loginFanliDialog .btn-ok').removeClass('btn-ok-disabled');
			});
}
function openCodeAdsDialog(id) {
	$('#openCodeAdsDialog').remove();
	$('body').append('<div id="openCodeAdsDialog" title="标准组件推广"></div>');
	getHtmlContent('openCodeAdsDialog',
			'/router/member/designer/htmldesigner/code/' + id, 'GET', {},
			function(data) {
				$('#openCodeAdsDialog').empty().append(data);
				$('#openCodeAdsDialog').dialog({
							bgiframe : true,
							autoOpen : false,
							width : 600,
							height : 500,
							zIndex : 1000,
							modal : true
						});
				$('#openCodeAdsDialog').dialog('open');
			});
}
function openItemAdsDialog(e) {
	$('#openItemAdsDialog').remove();
	$('body')
			.append('<div id="openItemAdsDialog" title="选择您的推广链接"><table><tr><td height=100px><span style="font-size:14px;">新淘网推广链接:</span><br/><textarea style="width:430px;" wrap="hard" cols="60" rows="3" readonly="readonly" onclick="this.select();" id="xtUrl">'
					+ e.attr('xtUrl')
					+ '</textarea><br/><p style="width:430px;color:red;">推荐使用新淘网提供的推广链接，推广该链接您将可以通过新淘网的推广统计功能查看到该链接的商品推广点击情况。新淘网的推广链接佣金金额与淘宝联盟一致，新淘网不参与任何佣金分成。</p></td><td valign=top><a class="button" style="color:white;" onClick="copyToClipBoard($(\'#xtUrl\'));return false;">复制链接</a></td></tr><tr><td><span style="font-size:14px;"><br/><br/>淘宝联盟推广链接:</span><br/><textarea  style="width:430px;" wrap="hard" cols="60" rows="6" readonly="readonly" onclick="this.select();" id="mamaUrl">'
					+ e.attr('mamaUrl')
					+ '</textarea></td><td valign=top><br/><br/><a class="button" style="color:white;" onClick="copyToClipBoard($(\'#mamaUrl\'));return false;">复制链接</a></tr></table></div>');
	$('#openItemAdsDialog').dialog({
				bgiframe : true,
				autoOpen : false,
				width : 600,
				height : 300,
				zIndex : 1000,
				modal : true
			});
	$('#openItemAdsDialog').dialog('open');
}
/**
 * 显示自定义组件佣金
 * 
 * @param {}
 *            widget
 */
function previewCommission(widget) {
	$('.a-s,.l-a-s,.l-a-s-p,.d-a-i,.l-d-a-i,.l-d-a-i-p', widget).each(
			function() {
				var c = $(this).attr('co');
				var pre = '佣金:';
				var last = '元';
				if (!c) {
					c = $(this).attr('cr');
					pre = '佣金比例:';
					last = '%';
				}
				if (c) {
					$(this)
							.append('<div class="c-c" title="'
									+ pre
									+ c
									+ last
									+ '" style="position: absolute;text-align: center;line-height: 14px;height: 14px;background: #F60;color: white;border: 1px solid blue;cursor: pointer;top:-14px;left:0px;">'
									+ pre + c + last + '</div>');
				}
			});
}
function copyToClipBoard(jq) {
	if ($.browser.msie) {
		window.clipboardData.clearData();
		window.clipboardData.setData("Text", jq.val());
		alert('复制成功');
	} else {
		alert('您使用的浏览器不支持复制功能，请使用Ctrl+C或鼠标右键。');
	}
	jq.select();
}
function searchShopsByCats(pageNo, keywords, catid, shopSortBy, isMall) {
	if (!keywords)
		keywords = $('#schContent').val();
	if (!catid)
		catid = $('#selectType').val();
	if (!shopSortBy)
		shopSortBy = $('#J_shopOrder').val();
	if ((!keywords || keywords.length == 0) && (!catid || catid.length == 0)) {
		catid = '14';
	}
	if (!pageNo || pageNo == null) {
		pageNo = 1
	}
	if (!shopSortBy || shopSortBy == '') {
		shopSortBy = 'level_desc';
	}
	getHtmlSearchShops('nick', keywords, catid, shopSortBy, pageNo, isMall);
}
/**
 * 新增推广链接
 * 
 * @param {}
 *            name
 * @param {}
 *            type
 * @param {}
 *            url
 */
function addXintaoLink(name, type, value) {
	var sender = new WindSender("/router/member/links/add");
	sender.load("POST", {
				name : name,
				type : type,
				value : value
			}, function(response) {
				if (response.isSuccess()) {
					document.location.href = "/router/member/links?lid="
							+ response.body.id;
				} else {
					alert(response.msg);
				}
			});
}
function updateWWW(did) {
	$('#updateWWWDialog').dialog({
				bgiframe : true,
				autoOpen : false,
				width : 550,
				zIndex : 1000,
				modal : true
			});
	$('#wwwDialog-confirm').button().click(function() {
		var www = $('#wwwDialog-input').val();
		var icp = $('#wwwDialog-ICP').val();
		if (!www || www.length == 0) {
			alert('请输入您的独立域名');
			$('#wwwDialog-input').focus();
			return;
		}
		var reg = /^[\u4E00-\u9FA5a-zA-Z\.\/0-9]{3,}[\u4E00-\u9FA5a-zA-Z\/0-9]{2,}$/;
		if (!reg.test(www)) {
			alert('您的独立域名格式不正确');
			$('#wwwDialog-input').focus();
			return;
		}
		if (!icp || icp.length == 0) {
			alert('请输入您的ICP备案号');
			$('#wwwDialog-ICP').focus();
			return;
		}
		if (icp.indexOf('ICP') == -1) {
			alert('您的ICP备案号格式不正确');
			$('#wwwDialog-ICP').focus();
			return;
		}
		$(this).button('disable');
		createWWWSender(did, www, icp, "update");
	});
	$('#wwwDialog-cancel').button().click(function() {
				$('#updateWWWDialog').dialog('close');
			});
	$('#updateWWWDialog').dialog('open');
}
function createWWW(sid) {
	$('#wwwDialog').remove();
	$('body').append('<div id="wwwDialog" title="绑定顶级域名"></div>');
	$('#wwwDialog').load('/site/member/site/www.html', function() {
		$('#wwwDialog').dialog({
					bgiframe : true,
					autoOpen : false,
					width : 550,
					zIndex : 1000,
					modal : true
				});
		$('#wwwDialog-confirm').button().click(function() {
			var www = $('#wwwDialog-input').val();
			var icp = $('#wwwDialog-ICP').val();
			if (!www || www.length == 0) {
				alert('请输入您的独立域名');
				$('#wwwDialog-input').focus();
				return;
			}
			var reg = /^[\u4E00-\u9FA5a-zA-Z\.\/0-9]{3,}[\u4E00-\u9FA5a-zA-Z\/0-9]{2,}$/;
			if (!reg.test(www)) {
				alert('您的独立域名格式不正确');
				$('#wwwDialog-input').focus();
				return;
			}
			if (!icp || icp.length == 0) {
				alert('请输入您的ICP备案号');
				$('#wwwDialog-ICP').focus();
				return;
			}
			if (icp.indexOf('ICP') == -1) {
				alert('您的ICP备案号格式不正确');
				$('#wwwDialog-ICP').focus();
				return;
			}
			$(this).button('disable');
			createWWWSender(sid, www, icp, "create");
		});
		$('#wwwDialog-cancel').button().click(function() {
					$('#wwwDialog').dialog('close');
				});
		$('#wwwDialog').dialog('open');
	});
}
function createWWWSender(sid, www, icp, type) {
	var sender = new WindSender("/router/member/www/" + type + "/" + sid);
	sender.load("POST", {
				"www" : www,
				"icp" : icp
			}, function(response) {
				if (response.isSuccess()) {
					alert("您的顶级域名【http://" + www + "】已经进入审核程序，审核通过后可直接访问");
					document.location.href = document.location.href;
				} else {
					alert(response.msg);
					$('#wwwDialog-confirm').button('enable');
				}
			});
}
/**
 * 创建二级域名
 * 
 * @param {}
 *            sid
 */
function createDomainName(sid) {
	$('#secondDomainDialog').remove();
	$('body').append('<div id="secondDomainDialog" title="自定义二级域名"></div>');
	$('#secondDomainDialog').load('/site/member/site/secondDomain.html',
			function() {
				$('#secondDomainDialog').dialog({
							bgiframe : true,
							autoOpen : false,
							width : 400,
							zIndex : 1000,
							modal : true
						});
				$('#secondDomainDialog-confirm').button().click(function() {
							var domainName = $('#secondDomainDialog-input')
									.val();
							if (!domainName || domainName.length == 0) {
								alert('自定义二级域名不能为空');
								return;
							}
							var reg1 = /^shop$/;
							if (reg1.test(domainName)) {
								alert('自定义二级域名不能以shop开头');
								return;
							}
							if (domainName.length < 5) {
								alert('自定义二级域名长度不能小于5');
								return;
							}
							if (domainName.length > 30) {
								alert('自定义二级域名长度不能大于30');
								return;
							}
							var reg = /^[a-zA-Z]+[0-9]+$/;
							if (!reg.test(domainName)) {
								alert('自定义二级域名必须是字母+数字的形式');
								return;
							}
							$(this).button('disable');
							createDomainNameSender(sid, domainName
											.toLowerCase());
						});
				$('#secondDomainDialog-cancel').button().click(function() {
							$('#secondDomainDialog').dialog('close');
						});
				$('#secondDomainDialog').dialog('open');
			});
}
function createDomainNameSender(sid, domainName) {
	var sender = new WindSender("/router/member/domainname/create/" + sid);
	sender.load("POST", {
				"domainName" : domainName
			}, function(response) {
				if (response.isSuccess()) {
					alert("恭喜您，您的二级域名【http://" + domainName
							+ ".xintaonet.com】已经启用");
					document.location.href = document.location.href;
				} else {
					alert(response.msg);
					$('#secondDomainDialog-confirm').button('enable');
				}
			});
}
/**
 * 新增模板页面
 * 
 * @param {}
 *            name
 * @param {}
 *            desc
 * @param {}
 *            metadata
 */
function addTemplate(name, desc, metadata, cid) {
	var sender = new WindSender("/router/member/template/add");
	sender.load("POST", {
				"name" : name,
				"desc" : desc,
				"metadata" : metadata,
				"cid" : cid,
				"parenttid" : $('#parenttid').val(),
				"siteId" : $('#site_Id').val()
			}, function(response) {
				if (response.isSuccess()) {
					alert("添加新的页面设计成功");
					document.location.href = "/router/member/sitemanager/templates";
				} else {
					alert(response.msg);
				}
			});
}
/**
 * 设置为首页
 * 
 * @param {}
 *            id
 */
function setPageIndex(id) {
	var sender = new WindSender("/router/member/pages/index/" + id);
	sender.load("GET", {}, function(response) {
				if (response.isSuccess()) {
					alert("修改首页成功");
					document.location.href = "/router/member/sitemanager/templates";
				} else {
					alert(response.msg);
				}
			});
}
/**
 * 是否是数字
 * 
 * @param {}
 *            val
 * @return {}
 */
function isNumber(val) {
	return /^-?((\d+\.?\d?)|(\.\d+))$/.test(val);
}
/**
 * 广告追踪
 * 
 * @param {}
 *            category
 * @param {}
 *            action
 * @param {}
 *            opt_label
 * @param {}
 *            opt_value
 */
function Track(category, action, opt_label, opt_value) {
	pageTracker._trackEvent(category, action, opt_label, opt_value);
	return false;
}
/**
 * 添加家园好友
 * 
 * @param {}
 *            uid
 * @param {}
 *            fuid
 * @param {}
 *            comment
 */
function addHomeFriend(uid, fuid, comment, callback, error) {
	var sender = new WindSender("/router/member/uc/friend/add");
	sender.load("GET", {
				uid : uid,
				fuid : fuid,
				comment : comment
			}, function(response) {
				if (response.isSuccess()) {
					if (parseInt(response.body.status) > 0) {
						alert('添加家园好友成功');
						if (callback && typeof callback == "function") {
							callback();
						}
					} else {
						alert('添加家园好友失败');
						if (error && typeof error == "function") {
							error();
						}
					}
				} else {
					alert(response.msg);
				}
			});
}
/**
 * 创建推广阵地会员（指定推广阵地,打开dialog）
 * 
 * @param {}
 *            fid(新增时为FavoriteForum标识，修改时为ForumAccount标识)
 */
function addDialogAccount(fid, type, header) {
	$('#add-account-dialog').remove();
	$('body').append('<div id="add-account-dialog" title="' + header
			+ '"></div>');
	getHtmlContent('add-account-dialog', '/router/member/accountdialog/' + type
					+ '/' + fid + "?v" + Math.random(), 'GET', {}, function(
					data) {
				$("#add-account-dialog").empty().append(data).dialog({
					bgiframe : true,
					autoOpen : false,
					width : 600,
					zIndex : 1000,
					modal : true,
					buttons : {
						'取消' : function() {
							$(this).dialog('close');
						},
						'确认' : function() {
							var nick = $('#add-account-dialog-nick').val();
							if (!nick || nick.length == 0) {
								alert('会员昵称不能为空');
								return;
							}

							var aid = $('#add-account-dialog-id').val();
							if (aid && aid.length > 0) {// 修改
								modifyAccount(aid, nick,
										$('#add-account-dialog-account').val(),
										$('#add-account-dialog-pwd').val(),
										$('#add-account-dialog-desc').val());
							} else {// 新增
								addAccount(fid, nick,
										$('#add-account-dialog-account').val(),
										$('#add-account-dialog-pwd').val(),
										$('#add-account-dialog-desc').val());
							}
						}
					}
				});
				$('#add-account-dialog').dialog('open');
			});
}
/**
 * 添加会员
 * 
 * @param {}
 *            fid
 * @param {}
 *            nick
 * @param {}
 *            account
 * @param {}
 *            pwd
 * @param {}
 *            desc
 */
function addAccount(fid, nick, account, pwd, desc) {
	var sender = new WindSender("/router/member/forum/favorite/addaccount/"
			+ fid);
	sender.load("POST", {
				nick : nick,
				account : account,
				pwd : pwd,
				desc : desc
			}, function(response) {
				if (response.isSuccess()) {
					alert('添加会员信息成功');
					document.location.href = document.location.href;
				} else {
					alert(response.msg);
				}
			});
}
/**
 * 添加会员
 * 
 * @param {}
 *            aid
 * @param {}
 *            nick
 * @param {}
 *            account
 * @param {}
 *            pwd
 * @param {}
 *            desc
 */
function modifyAccount(aid, nick, account, pwd, desc) {
	var sender = new WindSender("/router/member/forum/favorite/modifyaccount/"
			+ aid);
	sender.load("POST", {
				nick : nick,
				account : account,
				pwd : pwd,
				desc : desc
			}, function(response) {
				if (response.isSuccess()) {
					alert('修改会员信息成功');
					document.location.href = document.location.href;
				} else {
					alert(response.msg);
				}
			});
}
/**
 * 删除会员记录
 * 
 * @param {}
 *            aid
 */
function deleteAccount(aid) {
	var sender = new WindSender("/router/member/forum/favorite/deleteaccount/"
			+ aid);
	sender.load("GET", {}, function(response) {
				if (response.isSuccess()) {
					alert('删除会员信息成功');
					document.location.href = document.location.href;
				} else {
					alert(response.msg);
				}
			});
}
/**
 * 创建推广记录（指定推广阵地,打开dialog）
 * 
 * @param {}
 *            fid(新增时为FavoriteForum标识，修改时为ForumThread标识)
 */
function addDialogThread(fid, type, header) {
	$('#add-thread-dialog').remove();
	$('body').append('<div id="add-thread-dialog" title="' + header
			+ '"></div>');
	getHtmlContent('add-thread-dialog', '/router/member/threaddialog/' + type
					+ '/' + fid + "?v" + Math.random(), 'GET', {}, function(
					data) {
				$("#add-thread-dialog").empty().append(data).dialog({
							bgiframe : true,
							autoOpen : false,
							width : 600,
							zIndex : 1000,
							modal : true
						});
				$('#add-thread-dialog-cancel').button().click(function() {
							$("#add-thread-dialog").dialog('close');
						});
				$('#add-thread-dialog-confirm').button().click(function() {
					var title = $('#add-thread-dialog-title').val();
					var url = $('#add-thread-dialog-url').val();
					var desc = $('#add-thread-dialog-desc').val();
					if (!title || title.length == 0) {
						alert('推广记录标题不能为空');
						return;
					}
					if (title.length > 30) {
						alert('推广记录标题长度不能超过30');
						return;
					}
					if (!url || url.length == 0) {
						alert('推广记录地址不能为空');
						return;
					}
					if (!isURL(url)) {
						alert('推广地址不合法！');
						return;
					}
					if (desc && desc.length > 0) {
						if (desc.length > 100) {
							alert('推广描述长度不能超过100');
							return;
						}
					}
					var tid = $('#add-thread-dialog-id').val();
					$(this).button('disable');
					if (tid && tid.length > 0) {// 修改
						modifyThread(
								tid,
								title,
								url,
								$('#add-thread-dialog-date').val(),
								$('#add-thread-dialog-account').val(),
								$('#add-thread-dialog input[name="add-thread-dialog-type"]:checked')
										.val(), desc);
					} else {// 新增
						addThread(
								fid,
								title,
								url,
								$('#add-thread-dialog-date').val(),
								$('#add-thread-dialog-account').val(),
								$('#add-thread-dialog input[name="add-thread-dialog-type"]:checked')
										.val(), desc);
					}
				});
				$('#add-thread-dialog-date').dateinput({
							lang : 'zh-CN',
							format : 'yyyy-mm-dd'
						}).val(new Date().format('yyyy-mm-dd'));
				$("#add-thread-dialog :input").tooltip({
							// place tooltip on the right edge
							position : "center right",
							// a little tweaking of the position
							offset : [-2, 10],
							// use the built-in fadeIn/fadeOut effect
							effect : "fade",
							// custom opacity setting
							opacity : 0.7
						});
				$('#add-thread-dialog').dialog('open');
			});
}
function isURL(url) {
	if (url && url.indexOf('s.click') != -1) {
		return true;
	}
	var strRegex = "^((https|http|ftp|rtsp|mms)?://)"
			+ "?(([0-9a-z_!~*'().&=+$%-]+: )?[0-9a-z_!~*'().&=+$%-]+@)?" // ftp的user@
			+ "(([0-9]{1,3}\.){3}[0-9]{1,3}" // IP形式的URL-
			// 199.194.52.184
			+ "|" // 允许IP和DOMAIN（域名）
			+ "([0-9a-z_!~*'()-]+\.)*" // 域名- www.
			+ "([0-9a-z][0-9a-z-]{0,61})?[0-9a-z]\." // 二级域名
			+ "[a-z]{2,6})" // first level domain- .com or .museum
			+ "(:[0-9]{1,4})?" // 端口- :80
			+ "((/?)|" // a slash isn't required if there is no file
			// name
			+ "(/[0-9a-z_!~*'().;?:@&=+$,%#-]+)+/?)$";
	var re = new RegExp(strRegex);
	if (re.test(url)) {
		return (true);
	} else {
		return (false);
	}
}
/**
 * 添加推广记录
 * 
 * @param {}
 *            fid
 * @param {}
 *            title
 * @param {}
 *            url
 * @param {}
 *            date
 * @param {}
 *            account
 * @param {}
 *            type
 * @param {}
 *            desc
 */
function addThread(fid, title, url, date, account, type, desc) {
	var sender = new WindSender("/router/member/forum/favorite/addthread/"
			+ fid);
	sender.load("POST", {
				title : title,
				url : url,
				date : date,
				account : account,
				type : type,
				desc : desc
			}, function(response) {
				if (response.isSuccess()) {
					alert('添加记录成功');
					document.location.href = document.location.href;
				} else {
					alert(response.msg);
					$('#add-thread-dialog-confirm').button('enable');
				}
			});
}
/**
 * 修改推广记录
 * 
 * @param {}
 *            tid
 * @param {}
 *            title
 * @param {}
 *            url
 * @param {}
 *            date
 * @param {}
 *            account
 * @param {}
 *            type
 * @param {}
 *            desc
 */
function modifyThread(tid, title, url, date, account, type, desc) {
	var sender = new WindSender("/router/member/forum/favorite/modifythread/"
			+ tid);
	sender.load("POST", {
				title : title,
				url : url,
				date : date,
				account : account,
				type : type,
				desc : desc
			}, function(response) {
				if (response.isSuccess()) {
					alert('修改记录成功');
					document.location.href = document.location.href;
				} else {
					alert(response.msg);
					$('#add-thread-dialog-confirm').button('enable');
				}
			});
}
/**
 * 删除推广记录
 * 
 * @param {}
 *            tid
 */
function deleteThread(tid) {
	var sender = new WindSender("/router/member/forum/favorite/deletethread/"
			+ tid);
	sender.load("GET", {}, function(response) {
				if (response.isSuccess()) {
					alert('删除记录成功');
					document.location.href = document.location.href;
				} else {
					alert(response.msg);
				}
			});
}
/**
 * 收藏阵地
 * 
 * @param {}
 *            fid
 */
function addMyFavoriteForum(fid, type, callback) {
	var sender = new WindSender("/router/member/forum/favorite/add/" + fid
			+ "?type=" + type);
	sender.load("GET", {}, function(response) {
				if (response.isSuccess()) {
					if (response.body.code == "0") {
						alert('您已经收藏该阵地了');
					} else {
						alert('收藏成功');
					}
					if (callback && typeof callback == "function") {
						callback();
					}
				} else {
					alert(response.msg);
				}
			});
}
/**
 * 删除收藏阵地
 * 
 * @param {}
 *            cwid
 */
function deleteMyFavoriteForum(ffid) {
	var sender = new WindSender("/router/member/forum/favorite/delete/" + ffid);
	sender.load("GET", {}, function(response) {
				if (response.isSuccess()) {
					alert('已经删除该收藏');
					document.location.href = "/router/member/forums";
				} else {
					alert(response.msg);
				}
			});
}
/**
 * 收藏组件
 * 
 * @param {}
 *            cwid
 */
function addMyFavoriteWidget(cwid, callback) {
	var sender = new WindSender("/router/member/widget/favorite/add/" + cwid);
	sender.load("GET", {}, function(response) {
				if (response.isSuccess()) {
					if (response.body.code == "0") {
						alert('您已经收藏该组件了');
					} else {
						alert('收藏成功');
					}
					if (callback && typeof callback == "function") {
						callback();
					}
				} else {
					alert(response.msg);
				}
			});
}
/**
 * 删除收藏组件
 * 
 * @param {}
 *            cwid
 */
function deleteMyFavoriteWidget(cwid) {
	var sender = new WindSender("/router/member/widget/favorite/delete/" + cwid);
	sender.load("GET", {}, function(response) {
				if (response.isSuccess()) {
					alert('已经删除该收藏');
					document.location.href = "/router/member/widget/favorite";
				} else {
					alert(response.msg);
				}
			});
}
/**
 * 删除当前组件
 * 
 * @param {}
 *            cwid
 */
function deleteMyWidget(cwid) {
	var sender = new WindSender("/router/member/widget/delete/" + cwid);
	sender.load("GET", {}, function(response) {
				if (response.isSuccess()) {
					alert('已经删除该组件');
					document.location.href = "/router/member/widget/my";
				} else {
					alert(response.msg);
				}
			});
}
/**
 * 打开推广组Dialog
 * 
 * @param {}
 *            numiid
 */
function openMyItemGroupByItem(numiids) {
	$('#openMyItemGroupByItemDialog').remove();
	$('body')
			.append('<div id="openMyItemGroupByItemDialog" title="选择一个您的推广组加入该商品"></div>');
	getHtmlContent('openMyItemGroupByItemDialog',
			'/router/member/itemgroupsdialog', 'GET', {
				length : numiids.length
			}, function(data) {
				$("#openMyItemGroupByItemDialog").empty();
				$("#openMyItemGroupByItemDialog").append(data);
				$('#openMyItemGroupByItemDialog').dialog({
					bgiframe : true,
					autoOpen : false,
					width : 600,
					zIndex : 1000,
					modal : true,
					buttons : {
						'取消' : function() {
							$(this).dialog('close');
						},
						'确认' : function() {
							var checked = $('#openMyItemGroupByItemDialog input[type="radio"][name="itemgroup"]:checked');
							if (checked.length == 1) {
								addMyItemGroupByItem(numiids.join(','), checked
												.val());
							} else {
								alert('未选择要加入的推广组');
								return;
							}
						}
					}
				});
				$('#openMyItemGroupByItemDialog').dialog('open');
			});
}
/**
 * 加入我的推广组
 * 
 * @param {}
 *            numiid
 * @param {}
 *            gid
 */
function addMyItemGroupByItem(numiids, gid) {
	var sender = new WindSender("/router/member/itemgroup/additem/" + gid);
	sender.load("POST", {
				"num_iids" : numiids
			}, function(response) {
				if (response.isSuccess()) {
					try {
						$('#openMyItemGroupByItemDialog').dialog('close');
						confirm("增加商品至推广组成功", function(r) {
							if (r) {
								document.location.href = "/router/member/sitemanager/groups";
							} else {
								$('#itemsTable input[type="checkbox"][name="items"]:checked')
										.attr('checked', false);
							}
						}, "查看推广组", "继续添加");
					} catch (e) {
					}
				} else {
					alert(response.msg);
				}
			});
}
/**
 * 用户注册分析
 * 
 * @param {}
 *            start
 * @param {}
 *            end
 */
function userRegisterAnalytics(type, start, end) {
	var sender = new WindSender("/router/member/admin/userAnalytics/data");
	sender.load('POST', {
				type : 0,
				"startDate" : start,
				"endDate" : end,
				"analyticsType" : type
			}, function(response) {
				if (response.isSuccess()) {
					var count = [];
					var created = [];
					$('#resultBody').empty();
					for (var i = 0; i < response.body.length; i++) {
						count.push(response.body[i].count);
						created.push(response.body[i].created);
						$('#resultBody').append('<tr><td>'
								+ response.body[i].created + '</td><td>'
								+ response.body[i].count + '</td></tr>');
					}
					if ($('#result img').length > 0) {
						$('#result').gchart('change', {
									type : 'line',
									dataLabels : created,
									series : [$.gchart.series('注册人数', count)],
									axes : [$.gchart.axis('注册人数')]
								});
					} else {
						$('#result').gchart({
									type : 'line',
									dataLabels : created,
									series : [$.gchart.series('注册人数', count)],
									axes : [$.gchart.axis('注册人数')]
								});
					}
				} else {
					alert(response.msg);
				}
			});
}
/**
 * 用户登录分析
 * 
 * @param {}
 *            start
 * @param {}
 *            end
 */
function userLoginAnalytics(type, start, end) {
	var sender = new WindSender("/router/member/admin/userAnalytics/data");
	sender.load('POST', {
				type : 1,
				"startDate" : start,
				"endDate" : end,
				"analyticsType" : type
			}, function(response) {
				if (response.isSuccess()) {
					var count = [];
					var created = [];
					$('#resultBody').empty();
					for (var i = 0; i < response.body.length; i++) {
						count.push(response.body[i].count);
						created.push(response.body[i].created);
						$('#resultBody').append('<tr><td>'
								+ response.body[i].created + '</td><td>'
								+ response.body[i].count + '</td></tr>');
					}
					if ($('#result img').length > 0) {
						$('#result').gchart('change', {
									type : 'line',
									dataLabels : created,
									series : [$.gchart.series('注册人数', count)],
									axes : [$.gchart.axis('注册人数')]
								});
					} else {
						$('#result').gchart({
									type : 'line',
									dataLabels : created,
									series : [$.gchart.series('注册人数', count)],
									axes : [$.gchart.axis('注册人数')]
								});
					}
				} else {
					alert(response.msg);
				}
			});
}
/**
 * 推广组搜索商品事件
 * 
 * @author fxy
 * @function
 * @param {}
 *            gid
 * @param {}
 *            cid
 * @param {}
 *            keyword
 */
function itemGroupSearch(gid, cid, keyword) {
	// 定向至推广组搜索商品页
	document.location.href = "/router/member/itemgroup/searchitems/" + gid
			+ "?cid=" + cid + "&keyword=" + keyword;
}
/**
 * 审核酷站
 * 
 * @param {}
 *            sid
 * @param {}
 *            isAudit
 * @param {}
 *            remark
 */
function auditCoolSite(sid, isAudit, remark) {
	var sender = new WindSender("/router/member/admin/coolsite/" + sid
			+ "/audit");
	sender.load('POST', {
				"isAudit" : isAudit,
				"remark" : remark
			}, function(response) {
				if (response.isSuccess()) {
					alert("审核完成");
					getHtmlCoolSitesAudit();
				} else {
					alert(response.msg);
				}
			});
}

/**
 * 推广组兑换
 * 
 * @param {}
 *            c_num
 * @param {}
 *            c_type
 */
function updateCreditsGroup(c_num, c_type) {
	var sender = new WindSender("/router/member/credits/group");
	sender.load('POST', {
				"c_num" : c_num,
				"c_credits" : parseInt(c_num) * 1000,
				"c_type" : c_type
			}, function(response) {
				if (response.isSuccess()) {
					alert("兑换成功");
					getHtmlCredits();
				} else {
					alert(response.msg);
					getHtmlCredits();
				}
			});
}
/**
 * 邀请
 * 
 * @author fxy
 * @function
 */
function sendInvite(uids) {
	var sender = new WindSender("/router/member/invite/send");
	sender.load('GET', {
				"uids" : uids
			}, function(response) {
				if (response.isSuccess()) {
					alert("发送成功");
				} else {
					alert(response.msg);
				}
			});
}
/**
 * 同步PID
 * 
 * @param {}
 *            id
 */
function synPID(id) {
	var sender = new WindSender("/router/member/pid/syn");
	sender.load('GET', {}, function(response) {
		if (response.isSuccess()) {
			alert("同步阿里妈妈PID成功");
			document.location.href = "/router/member/view/personal?goto=person&pindex=0";
		} else {
			alert(response.msg);
		}
	});
}
/**
 * 同步淘江湖信息
 */
function synJianghu(id) {
	var sender = new WindSender("/router/member/suser/syn");
	sender.load('GET', {}, function(response) {
		if (response.isSuccess()) {
			alert("同步淘江湖公开信息成功");
			document.location.href = "/router/member/view/personal?goto=person&pindex=1";
		} else {
			if (2002 == response.errorCode) {
				window
						.confirm(
								'您尚未开通淘江湖。请登录<a href="http://jianghu.taobao.com" target="_blank">jianghu.taobao.com</a>后重新同步',
								function(r) {
									if (r) {
										window.open(
												'http://jianghu.taobao.com',
												'_blank');
									}
								});

			} else {
				alert(response.msg);
			}
		}
	});
}
/**
 * 同步淘宝信息
 */
function synTaobao(id) {
	var sender = new WindSender("/router/member/tuser/syn");
	sender.load('GET', {}, function(response) {
				if (response.isSuccess()) {
					alert("同步淘宝公开信息成功");
					document.location.href = "/router/member/sitemanager";
				} else {
					alert(response.msg);
				}
			});
}
/**
 * 删除推广组
 * 
 * @author fxy
 * @function
 */
function deleteItemGroup(id) {
	var sender = new WindSender("/router/member/itemgroup/delete/" + id);
	sender.load("GET", {}, function(response) {
				if (response.isSuccess()) {
					alert("删除成功");
					document.location.href = "/router/member/sitemanager/groups";
				} else {
					alert(response.msg);
				}
			});
}
/**
 * 删除无效商品
 * 
 * @param id
 * @return
 */
function deleteInvalidItems(id) {
	var sender = new WindSender("/router/member/itemgroup/delete/invalid/" + id);
	sender.load("GET", {}, function(response) {
				if (response.isSuccess()) {
					alert("删除成功");
					document.location.href = document.location.href;
				} else {
					alert(response.msg);
				}
			});
}
/**
 * 修改淘站信息
 * 
 * @param {}
 *            title
 * @param {}
 *            desc
 */
function updateSite(id, title, desc, metadata, cid, pSiteId, pAdId, appKey,
		appSecret) {
	var sender = new WindSender("/router/member/site/update/" + id);
	sender.load("POST", {
				"title" : title,
				"description" : desc,
				"metadata" : metadata,
				"cid" : cid,
				"pSiteId" : pSiteId,
				'pAdId' : pAdId,
				'appKey' : appKey,
				'appSecret' : appSecret
			}, function(response) {
				if (response.isSuccess()) {
					gtUpdateSite();
				} else {
					alert(response.msg);
				}
			});
}
/**
 * 创建推广组
 * 
 * @author fxy
 * @function
 * @param {}
 *            name
 */
function createItemGroup(name) {
	var sender = new WindSender("/router/member/itemgroup/create");
	sender.load("POST", {
				"name" : name
			}, function(response) {
				if (response.isSuccess()) {
					alert("创建成功");
					$("#dialog").dialog("close");
					document.location.href = "/router/member/sitemanager/groups";
				} else {
					alert(response.msg);
				}
			});
}
/**
 * 重命名推广组
 * 
 * @author fxy
 * @function
 * @param {}
 *            id
 * @param {}
 *            name
 */
function renameItemGroup(id, name) {
	var sender = new WindSender("/router/member/itemgroup/rename/" + id);
	sender.load("POST", {
				"name" : name
			}, function(response) {
				if (response.isSuccess()) {
					alert("修改名称成功");
					$("#renameGroupDialog").dialog("close");
					getHtmlItemGroup(id);
				} else {
					alert(response.msg);
				}
			});
}
/**
 * 保存商品顺序
 * 
 * @param {}
 *            sorts
 */
function updateItemsSorts(gid, sorts) {
	var sender = new WindSender("/router/member/itemgroup/sort?" + sorts);
	sender.load("GET", {}, function(response) {
				if (response.isSuccess()) {
					alert("保存商品顺序成功");
					getHtmlItemGroup(gid);
				} else {
					alert(response.msg);
				}
			});
}
/**
 * 移动当前推广组选中商品至其他目标推广组
 * 
 * @param {}
 *            fromId
 * @param {}
 *            toId
 * @param {}
 *            checkedData
 * @param {}
 *            uncheckedData
 */
function moveItemGroup(toId, checkedData, uncheckedData) {
	var sender = new WindSender("/router/member/itemgroup/move/" + toId);
	sender.load("POST", {
				"checkedData" : checkedData
			}, function(response) {
				if (response.isSuccess()) {
					alert("移动商品成功");
					$("#moveGroupDialog").dialog("close");
					getHtmlItemGroup(toId);
				} else {
					alert(response.msg);
				}
			});
}
/**
 * 增加新的店铺
 * 
 * @param {}
 *            nick
 */
function addNewShop(nick) {
	var sender = new WindSender("/router/member/shops/add");
	sender.load("POST", {
				"nick" : nick
			}, function(response) {
				if (response.isSuccess()) {
					alert("增加新的店铺成功");
					$('#schContent').val(nick);
					$('#selectType').val("0");
					$('#selectShopsType').val("nick");
					searchShopsByCats(1);
				} else {
					if (response.msg) {
						if (response.msg.indexOf(":") != -1) {
							if ("SHOP_IS_NOT_EXIST" == response.msg.split(":")[1]) {
								alert("没有找到与【" + nick + "】匹配的卖家");
								return;
							}
						}
					}
					alert(response.msg);
					if (1001 == response.errorCode
							|| "1001" == response.errorCode) {
						$('#schContent').val(nick);
						$('#selectType').val("0");
						$('#selectShopsType').val("nick");
						searchShopsByCats(1);
						$('#submitNewShopDialog').dialog('close');
					}
				}
			});
}
/**
 * 添加店铺收藏
 * 
 * @param {}
 *            ids
 */
function addShopsFav(ids) {
	var sender = new WindSender("/router/member/shops/favorite/add");
	sender.load("POST", {
				"ids" : ids
			}, function(response) {
				if (response.isSuccess()) {
					alert("收藏店铺成功");
					document.location.href = "/router/member/sitemanager/shops";
				} else {
					alert(response.msg);
				}
			});
}
/**
 * 添加店铺收藏
 * 
 * @param {}
 *            sid
 */
function addShopsFavBySid(sid) {
	var sender = new WindSender("/router/member/shops/favorite/add/" + sid);
	sender.load("GET", {}, function(response) {
				if (response.isSuccess()) {
					alert("收藏店铺成功");
				} else {
					alert(response.msg);
				}
			});
}
/**
 * 保存店铺收藏顺序
 * 
 * @param {}
 *            sorts
 */
function updateFavShopsSorts(sorts) {
	var sender = new WindSender("/router/member/shops/favorite/sort?" + sorts);
	sender.load("GET", {}, function(response) {
				if (response.isSuccess()) {
					alert("保存店铺收藏顺序成功");
					document.location.href = "/router/member/sitemanager/shops";
				} else {
					alert(response.msg);
				}
			});
}
/**
 * 删除店铺收藏
 * 
 * @param {}
 *            ids
 */
function deleteShopsFav(ids) {
	var sender = new WindSender("/router/member/shops/favorite/delete");
	sender.load("POST", {
				"ids" : ids
			}, function(response) {
				if (response.isSuccess()) {
					alert("删除店铺收藏成功");
					document.location.href = "/router/member/sitemanager/shops";
				} else {
					alert(response.msg);
				}
			});
}
/**
 * 增加指定商品并关联当前推广组
 * 
 * @author fxy
 * @function
 * @param {}
 *            name
 */
function addItems2ItemGroup(id, data) {
	var sender = new WindSender("/router/member/itemgroup/additems/" + id);
	sender.load("POST", {
				"items" : data
			}, function(response) {
				if (response.isSuccess()) {
					alert("增加商品至推广组成功");
					if (window.opener) {
						window.opener.document.location.href = "/router/member/sitemanager/groups";// 重定向至父页
						window.opener.focus();// 聚焦父页
						window.close();// 关闭当前窗口
					} else {
						document.location.href = "/router/member/sitemanager/groups";
					}
				} else {
					alert(response.msg);
				}
			});
}
/**
 * 添加商品推荐
 * 
 * @param {}
 *            id
 * @param {}
 *            cid
 */
function addAdItems(id, cid) {
	var sender = new WindSender("/router/member/admin/adItemsManager/add/" + id);
	sender.load("POST", {
				"cid" : cid
			}, function(response) {
				if (response.isSuccess()) {
					alert("增加商品推荐成功");
					getHtmlADItemsManager();
				} else {
					alert(response.msg);
				}
			});
}
/**
 * 从指定推广组删除商品
 * 
 * @author fxy
 * @function
 * @param {}
 *            gid
 * @param {}
 *            checkedData
 * @param {}
 *            uncheckedData
 */
function deleteItemsFromItemGroup(gid, checkedData) {
	var sender = new WindSender("/router/member/itemgroup/deleteitems/" + gid);
	sender.load("POST", {
				"checkedData" : checkedData
			}, function(response) {
				if (response.isSuccess()) {
					alert("删除成功");
					getHtmlItemGroup(gid, $('#itemsSortBy').val());
				} else {
					alert(response.msg);
				}
			});
}
/**
 * 查询淘宝客报表<br>
 * 调用页面:report.ftl
 * 
 * @author fxy
 * @function
 */
function getTaobaokeReport(dateText) {
	var request = new TaobaokeReportGetRequest();
	request.date = dateText;
	$("#report TR").remove();
	$("#report").append("<TR><TD COLSPAN=7 ALIGN=LEFT>加载中...</TD></TR>");
	new TaobaoSender().load(request, function(response) {
		if (response.isSuccess()) {
			if (response.body.taobaoke_report_get_response) {
				if (response.body.taobaoke_report_get_response
						.hasOwnProperty("taobaoke_report")) {
					if (response.body.taobaoke_report_get_response.taobaoke_report
							.hasOwnProperty("taobaoke_report_members")) {
						var reports = response.body.taobaoke_report_get_response.taobaoke_report.taobaoke_report_members.taobaoke_report_member;
						createReport(reports);
					}
				} else {
					$("#report TR").remove();
					$("#report")
							.append("<TR><TD COLSPAN=7 ALIGN=LEFT>糟糕，今日没有收益！</TD></TR>");
					// createReport(TestDataInitReport());
				}
			}
		} else {
			if (response.subCode != null) {
				alert('淘宝错误:' + response.subMsg);
			} else {
				alert(response.msg);
			}

			$("#report TR").remove();
			return;
		}
	});
}
/**
 * 创建报表表格内容<br>
 * 调用页面:report.ftl
 * 
 * @author fxy
 * @function
 */
function createReport(reports) {
	$("#report TR").remove();
	if (reports.length > 0) {
		for (var i = 0; i < reports.length; i++) {
			var rep = reports[i];
			var outer_code = rep.outer_code;
			switch (rep.outer_code) {
				case 'xintao001' :
					outer_code = '新淘网商品推广';
					break;
				case 'xintao002' :
					outer_code = '新淘网类目推广';
					break;
				case 'xintao003' :
					outer_code = '新淘网店铺推广';
					break;
				case 'xintao004' :
					outer_code = '新淘网关键词推广';
					break;
				case 'weigou001' :
					outer_code = '微购商品推广';
					break;
				case 'weigou002' :
					outer_code = '微购类目推广';
					break;
				case 'weigou003' :
					outer_code = '微购店铺推广';
					break;
				case 'weigou004' :
					outer_code = '微购关键词推广';
					break;
				case 'weigou005' :
					outer_code = '微购商城推广';
					break;
				case ('' != rep.outer_code && rep.outer_code.indexOf('xtfl') != -1) :
					outer_code = '新淘网返利推广';
					break;
				default :
					outer_code = outer_code ? outer_code : '';
			}
			var ss = rep.pay_time.split(' ')[0].split('-');
			var startDate = new Date(ss[0], ss[1] - 1, ss[2]);
			startDate.addDays(-30);
			var endDate = new Date(ss[0], ss[1] - 1, ss[2]);
			var body = "<TR class='" + (i % 2 == 0 ? "odd" : "even") + "'>";
			body += "<TD>" + outer_code + "</TD>";// 推广渠道
			body += "<TD>" + rep.pay_time + "</TD>";// 支付时间
			body += "<TD><a style='color:#00e;' href='/router/member/analyticsmanager/advanced?dimensions=date,category,label,city&categoryFilter=item:"
					+ rep.num_iid
					+ "&startDate="
					+ startDate.format('yyyy-mm-dd')
					+ "&endDate="
					+ endDate.format('yyyy-mm-dd')
					+ "'>"
					+ rep.item_title
					+ "</a></TD>";// 商品名称
			body += "<TD>" + rep.shop_title + "</TD>";// 所属店铺
			body += "<TD align=center>" + rep.pay_price + "</TD>";// 单价
			body += "<TD align=center>" + rep.commission + "</TD>";// 佣金
			body += "<TD align=center>"
					+ ((Math.round(rep.commission_rate * 10000)) / 100.00)
					+ "%</TD>";// 佣金比率
			body += "<TD align=center>" + rep.item_num + "</TD>";// 成交数量
			body += "</TR>";
			$("#report").append(body);
		}

	}
}
/**
 * 获取Html内容
 * 
 * @author fxy
 * @function
 * 
 * @param {}
 *            url
 * @param {}
 *            type
 * @param {}
 *            data
 * @param {}
 *            callback
 */
function getHtmlContent(content, url, type, data, callback, error) {
	$("#" + content).empty();
	$("#" + content)
			.append("<div id='loading' align='left'>正在加载数据,请稍候...</div>");
	if (url.indexOf('?') != -1) {
		url = url + '&ieversion=' + Math.random();
	} else {
		url = url + '?ieversion=' + Math.random();
	}
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
					if (error && typeof error == "function") {
						error();
					}
				},
				success : function(data) {
					$("#loading").remove();
					callback(data);
				}
			});
}

/**
 * 推广链接管理页面
 */
function getHtmlAddXintaoLink() {
	getRightContentHtmlContent('/router/member/links/addlink', "GET", {},
			rightContentAppend);
}
/**
 * 获取推广页面
 */
function getHtmlXintaoLink(type, value) {
	getHtmlContent("thirdStepDiv", '/router/member/links/link/' + type, "POST",
			{
				value : value
			}, function(data) {
				$('#thirdStepDiv').empty().append(data);
				type = parseInt(type);
				switch (type) {
					case 1 :
						initAddItemLink();
						break;
					case 2 :
						initAddShopLink();
						break;
					case 3 :
						initAddGroupLink();
						break;
					case 4 :
						initAddFavShopLink();
						break;
					case 5 :
						initAddKeyWordLink();
				}
			});
}
/**
 * 获取商品检测页面
 * 
 * @return
 */
function getHtmlItemsDoctor(isNew) {
	getHtmlContent("itemsDoctorResult", "/router/member/doctor/items", "GET", {
				"isNew" : isNew
			}, function(data) {
				$("#itemsDoctorResult").empty();
				$("#itemsDoctorResult").append(data);
			});
}
/**
 * 填充DIV rightContent
 * 
 * @param url
 * @param type
 * @param data
 * @param callback
 * @return
 */
function getRightContentHtmlContent(url, type, data, callback) {
	getHtmlContent("rightContent", url, type, data, callback);
}
function getHtmlSearch(type, keyword) {
	getRightContentHtmlContent("/router/site/search/result", "POST", {
				"type" : type,
				"keyword" : keyword
			}, rightContentAppend);
}
/**
 * 获得淘宝客商品搜索页
 * 
 * @author fxy
 * @function
 * @param {}
 *            request
 */
function getHtmlitemsSearch(request) {
	getRightContentHtmlContent("/router/top/taoke/items/get", "POST", request,
			rightContentAppend);
}

/**
 * 获得个人信息页
 * 
 * @author fxy
 * @function
 */
function getHtmlPersonal(id, index) {
	getRightContentHtmlContent("/router/member/details/" + id, "GET", {},
			function(data) {
				$("#rightContent").empty();
				$("#rightContent").append(data);
				if (1 == index || "1" == index) {
					$('#profileTabs').tabs('select', 1);
				}
			});
}
/**
 * 获得好友页
 * 
 * @author fxy
 * @function
 */
function getHtmlFriends() {
	getRightContentHtmlContent("/router/member/invite", "GET", {},
			rightContentAppend);
}
/**
 * 获得收入列表页
 * 
 * @author fxy
 * @function
 */
function getHtmlReport() {
	getRightContentHtmlContent("/router/member/view/report", "GET", {},
			rightContentAppend);
}
/**
 * 获得我的淘站页
 * 
 * @author fxy
 * @function
 */
function getHtmlSites(index, isUpdate) {
	getRightContentHtmlContent("/router/member/site", "GET", {},
			function(data) {
				$("#rightContent").empty();
				$("#rightContent").append(data);
				if (1 == index || "1" == index) {
					$('#mySiteTab').tabs('select', 2);// 酷站
				} else if (2 == index || "2" == index) {
					$('#mySiteTab').tabs('select', 1);// 页面
				} else {
					if (isUpdate) {
						$('#siteProfile').hide();
						$('#updateSiteTable').show();
					}
				}
			});
}
function getHtmlTemplateDetail(tid) {
	getRightContentHtmlContent('/router/member/template/get/' + tid, "GET", {},
			rightContentAppend);
}
/**
 * 查询我收藏的淘宝店铺
 */
function getHtmlShops(sortOrder) {
	if (!sortOrder || sortOrder == "") {
		sortOrder = "sortOrder_asc";
	}
	getRightContentHtmlContent("/router/member/shops", "GET", {
				"sortOrder" : sortOrder
			}, rightContentAppend);
}
/**
 * 进入淘宝店铺选择类目
 */
function getHtmlShopCats() {
	getRightContentHtmlContent("/router/member/shops/cats", "GET", {},
			rightContentAppend);
}
function getHtmlSearchShops(type, keywords, catid, shopSortBy, pageNo, isMall) {
	if (!isMall) {
		isMall = '';
	}
	getRightContentHtmlContent("/router/member/shops/search", "POST", {
				"type" : type,
				"keywords" : keywords,
				"catid" : catid,
				"shopSortBy" : shopSortBy,
				"pageNo" : pageNo,
				"isMall" : isMall
			}, rightContentAppend);
}
/**
 * 兑换中心
 */
function getHtmlCredits() {
	getRightContentHtmlContent("/router/member/credits", "GET", {},
			rightContentAppend);
}
/**
 * 获得我的推广组页
 * 
 * @author fxy
 * @function
 */
function getHtmlItemGroups() {
	getRightContentHtmlContent("/router/member/myitemgroups", "GET", {},
			rightContentAppend);
}

/**
 * 获得推广组明细页
 * 
 * @author fxy
 * @function
 */
function getHtmlItemGroup(id, sortBy) {
	if (!sortBy) {
		sortBy = '';
	}
	getRightContentHtmlContent("/router/member/itemgroup/" + id, "GET", {
				sortBy : sortBy
			}, rightContentAppend);
}

/**
 * 查看在线会员列表
 * 
 * @author fxy
 * @function
 */
function getHtmlOnlineMembers() {
	getRightContentHtmlContent("/router/site/onlinemembers", "GET", {},
			rightContentAppend);
}
/**
 * 淘站卫士
 * 
 * @author fxy
 * @function
 * @return
 */
function getHtmlDoctor() {
	getRightContentHtmlContent("/router/member/doctor", "GET", {},
			rightContentAppend);
}
/**
 * 设计器获取组件列表
 * 
 * @author fxy
 * @function
 * @return
 */
function getHtmlDesignerWidgets() {
	getRightContentHtmlContent("/router/member/designer/widgets", "GET", {},
			rightContentAppend);
}
/**
 * 组件类型
 * 
 * @return
 */
function getHtmlType() {
	getRightContentHtmlContent("/router/member/admin/type/get", "GET", {},
			rightContentAppend);
}

/**
 * 酷站审核
 */
function getHtmlCoolSitesAudit() {
	getRightContentHtmlContent("/router/member/admin/coolsites/audit", "GET",
			{}, rightContentAppend);
}
/**
 * 域名审核页面
 */
function getHtmlDomainAudit() {
	getRightContentHtmlContent("/router/member/admin/domain/audit", "GET", {},
			rightContentAppend);
}
/**
 * 用户分析
 */
function getHtmlUserAnalytics() {
	getRightContentHtmlContent("/router/member/admin/userAnalytics", "GET", {},
			rightContentAppend);
}
/**
 * 用户管理
 */
function getHtmlUserManager(date) {
	if (!date) {
		date = '';
	}
	getRightContentHtmlContent("/router/member/admin/userManager", "GET", {
				"date" : date
			}, rightContentAppend);
}
/**
 * 商品推荐
 */
function getHtmlADItemsManager(nick) {
	if (!nick) {
		nick = '';
	}
	getRightContentHtmlContent("/router/member/admin/adItemsManager", "POST", {
				"nick" : nick
			}, rightContentAppend);
}
/**
 * 新淘排行榜
 */
function getHtmlXintaoFy() {
	getRightContentHtmlContent("/router/member/xintaofy", "GET", {},
			rightContentAppend);
}
/**
 * 卖家推广统计
 * 
 */
function getHtmlSellerAdsItems(startDate, endDate, pageNo, nick) {
	if (!nick) {
		nick = '';
	}
	getRightContentHtmlContent("/router/member/seller/adsitems", "POST", {
				'startDate' : startDate,
				'endDate' : endDate,
				'pageNo' : pageNo,
				'nick' : nick
			}, rightContentAppend);
}
/**
 * 设计器日志
 */
function getHtmlDesignerError() {
	getRightContentHtmlContent("/router/member/admin/designer/error", "GET",
			{}, rightContentAppend);
}
/**
 * 查询指定类型所有组件
 * 
 * @return
 */
function getHtmlWidgets(type) {
	getRightContentHtmlContent("/router/member/admin/widgets/get/" + type,
			"GET", {}, rightContentAppend);
}
/**
 * 查询指定组件
 * 
 * @return
 */
function getHtmlWidget(id) {
	getRightContentHtmlContent("/router/member/admin/widget/get/" + id, "GET",
			{}, rightContentAppend);
}
/**
 * 创建组件类型
 * 
 * @author fxy
 * @function
 * @param name
 * @param title
 * @param sortOrder
 * @param desc
 * @return
 */
function createWidgetType(name, title, sortOrder, desc) {
	var sender = new WindSender("/router/member/admin/type/create");
	sender.load("POST", {
				"name" : name,
				"title" : title,
				"sortOrder" : sortOrder,
				"description" : desc
			}, function(response) {
				if (response.isSuccess()) {
					alert("创建组件类型成功");
					$("#addTypedialog").dialog("close");
					getHtmlWidgets(response.body.id);
				} else {
					alert(response.msg);
				}
			});
}
/**
 * 删除组件类型
 * 
 * @author fxy
 * @function
 * @param id
 * @return
 */
function deleteWidgetType(id) {
	var sender = new WindSender("/router/member/admin/type/delete/" + id);
	sender.load("GET", {}, function(response) {
				if (response.isSuccess()) {
					alert("删除组件类型成功");
					getHtmlType();
				} else {
					alert(response.msg);
				}
			});
}
/**
 * 创建组件
 * 
 * @author fxy
 * @function
 * @param name
 * @param title
 * @param picUrl
 * @param isActive
 * @param isCharge
 * @param sortOrder
 * @param desc
 * @return
 */
function createWidget(name, title, type, picUrl, isActive, isCharge, sortOrder,
		desc, layout) {
	var sender = new WindSender("/router/member/admin/widget/create");
	sender.load("POST", {
				"name" : name,
				"title" : title,
				"type" : type,
				"picUrl" : picUrl,
				"isActive" : isActive,
				"isCharge" : isCharge,
				"sortOrder" : sortOrder,
				"description" : desc,
				"layout" : layout,
				"a_s" : $('#w_a_s').val(),
				"l_a_s" : $('#w_l_a_s').val(),
				"l_a_s_p" : $('#w_l_a_s_p').val(),
				"d_a_i" : $('#w_d_a_i').val(),
				"l_d_a_i" : $('#w_l_d_a_i').val(),
				"l_d_a_i_p" : $('#w_l_d_a_i_p').val()
			}, function(response) {
				if (response.isSuccess()) {
					alert("创建组件成功");
					$("#addWidgetdialog").dialog("close");
					getHtmlWidget(response.body.id);
				} else {
					alert(response.msg);
				}
			});
}
/**
 * 创建组件数据类型
 * 
 * @param {}
 *            title
 * @param {}
 *            type
 * @param {}
 *            isDefault
 * @param {}
 *            sortOrder
 */
function createWidgetDataType(name, title, type, isDefault, sortOrder) {
	var sender = new WindSender("/router/member/admin/widgetdatatype/create");
	sender.load("POST", {
				"name" : name,
				"title" : title,
				"type" : type,
				"isDefault" : isDefault,
				"sortOrder" : sortOrder
			}, function(response) {
				if (response.isSuccess()) {
					alert("创建组件数据类型成功");
					$("#addWidgetDataTypedialog").dialog("close");
					getHtmlType();
				} else {
					alert(response.msg);
				}
			});
}
/**
 * 删除组件
 * 
 * @author fxy
 * @function
 * @param id
 * @return
 */
function deleteWidget(id, type) {
	var sender = new WindSender("/router/member/admin/widget/delete/" + id);
	sender.load("GET", {}, function(response) {
				if (response.isSuccess()) {
					alert("删除组件成功");
					getHtmlWidgets(type);
				} else {
					alert(response.msg);
				}
			});
}
/**
 * 创建组件属性
 * 
 * @author fxy
 * @function
 * @param name
 * @param title
 * @param picUrl
 * @param isActive
 * @param isCharge
 * @param sortOrder
 * @param desc
 * @return
 */
function createWidgetAttribute(title, type, clickUrl, picUrl, widget, datatype,
		sortOrder, desc) {
	var sender = new WindSender("/router/member/admin/attribute/create");
	sender.load("POST", {
				"title" : title,
				"type" : type,
				"clickUrl" : clickUrl,
				"picUrl" : picUrl,
				"widget" : widget,
				"sortOrder" : sortOrder,
				"datatype" : datatype,
				"description" : desc
			}, function(response) {
				if (response.isSuccess()) {
					alert("创建组件属性成功");
					$("#addWidgetAttributedialog").dialog("close");
					getHtmlWidget(widget);
				} else {
					alert(response.msg);
				}
			});
}
/**
 * 删除组件属性
 * 
 * @author fxy
 * @function
 * @param id
 * @return
 */
function deleteWidgetAttribute(id, widget) {
	var sender = new WindSender("/router/member/admin/attribute/delete/" + id);
	sender.load("GET", {}, function(response) {
				if (response.isSuccess()) {
					alert("删除组件属性成功");
					getHtmlWidget(widget);
				} else {
					alert(response.msg);
				}
			});
}
/**
 * @author fxy
 * @function
 * @param {}
 *            data
 */
function rightContentAppend(data) {
	$("#rightContent").empty();
	$("#rightContent").append(data);
}
