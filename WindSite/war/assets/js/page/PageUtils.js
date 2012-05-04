var MODULE = null;
var MODULE_ADTYPE = null;
var KEDITOR = null;
// 自定义模块当前所在ftl
var USERMODULE = null;
// 保存原来样式，鼠标划出恢复原来样式
var BORDER_STYLE;
var BORDER_COLOR;
var BORDER_WIDTH;

/**
 * Page工具类
 * 
 * @type
 */
var PageUtils = {
	/**
	 * 显示版本提示信息
	 * 
	 * @param {}
	 *            vn 当前版本
	 * @param {}
	 *            msg 功能描述
	 * @param {}
	 *            version 最低版本
	 */
	loadVersionInfo : function(vn, msg, version) {
		if (!vn) {
			if (typeof(VERSIONNO) != 'undefined' && VERSIONNO) {
				vn = VERSIONNO;
			} else {
				vn = 1;
			}
		}
		var vm = '普及版(免费)';
		switch (vn) {
			case 1.5 :
				vm = '分成版(未绑定域名)';
				break;
			case 1.55 :
				vm = '分成版(已绑定域名)';
				break;
			case 1.6 :
				vm = '普及版(付费)';
				break;
			case 2 :
				vm = '返利版';
				break;
			case 3 :
				vm = '卖家版';
				break;
		}
		if (!version) {
			version = vn;
		}
		var lis = [];
		if (version <= 3) {
			lis
					.push('<li>升级为卖家版【<a href="http://fuwu.taobao.com/service/service.htm?service_id=300" style="color:red;font-weight:bold;" target="_blank">升级</a>】</li>');
		}
		if (version <= 2) {
			lis
					.push('<li>升级为返利版【<a href="http://fuwu.taobao.com/service/service.htm?service_id=300" style="color:red;font-weight:bold;" target="_blank">升级</a>】</li>');
		}
		if (version <= 1.6) {
			lis
					.push('<li>升级为普及版(付费)【<a href="http://fuwu.taobao.com/service/service.htm?service_id=300" style="color:red;font-weight:bold;" target="_blank">升级</a>】</li>');
		}
		if (version <= 1.55) {
			lis.push('<li>升级为分成版(已绑定域名)</li>');
		}
		if (version <= 1.5) {
			lis.push('<li>升级为分成版(未绑定域名)</li>');
		}
		lis.reverse();// 反转
		$('#J_VersionNoBox').remove();
		var strs = [
				'<div id="J_VersionNoBox" title="升级提示" style="display:none;position:relative;"><div class="help_info" align="left" style="position:relative;">',
				'<h2>您当前使用的版本：<strong style="color:red;font-size:14px;font-weight:700;">',
				vm,
				'</strong></h2>',
				'<h3>请升级版本【<a href="http://home.xintaonet.com/space.php?uid=1&do=blog&id=10442" style="color:red;font-weight:bold;" target="_blank">升级帮助</a>】咨询QQ：153647646</h3><p><ul>',
				lis.join(''),
				'</ul></p><h3>提示：升级或订购后，需退出重新登录才可以生效</h3></div></div>']
		$('body').append(strs.join(''));
		$('#J_VersionNoBox').dialog({
					bgiframe : true,
					autoOpen : true,
					width : 550,
					height : 300,
					zIndex : 1000,
					modal : true
				});// 显示
	},
	/**
	 * 生成当前页面元信息
	 */
	getPageMeta : function() {
		var hd = [];
		$('#hd .layout').each(function() {
					hd.push(PageUtils._getLayout($(this)));
				});
		var bd = [];
		$('#bd .layout').each(function() {
					if ($(this).attr('data-id'))
						bd.push(PageUtils._getLayout($(this)));
				});
		return '{"hd":[' + hd.join(',') + '],"bd":[' + bd.join(',')
				+ '],"ft":[]}';
	},
	/**
	 * 生成布局
	 * 
	 * @param {}
	 *            layout
	 */
	_getLayout : function(layout) {
		var id = layout.attr('data-id');
		var lt = layout.attr('class').split(' ')[1];
		var str = '{"id":' + id + ',"layout":"' + lt + '",';
		layout.find('.J_TRegion').each(function() {
					var rt = $(this).attr('class').split(' ')[0];
					if ('main-wrap' == rt) {
						if ($(this).attr('data-id'))
							str += PageUtils._getRegion($(this));
					} else if ('col-sub' == rt) {
						if ($(this).attr('data-id'))
							str += ',' + PageUtils._getRegion($(this));
					} else if ('col-extra' == rt) {
						if ($(this).attr('data-id'))
							str += ',' + PageUtils._getRegion($(this));
					}
				});
		return str + "}";
	},
	/**
	 * 生成区域
	 * 
	 * @param {}
	 *            region
	 */
	_getRegion : function(region) {
		var id = region.attr('data-id');
		var re = region.attr('class').split(' ')[0];
		if ('main-wrap' == re) {
			re = 'main';
		} else if ('col-sub' == re) {
			re = 'sub';
		} else if ('col-extra' == re) {
			re = 'extra';
		}
		var mms = [];
		region.find('.J_TBox').each(function() {
					if ($(this).attr('data-id'))
						mms.push(PageUtils._getModule($(this)));
				});
		return '"' + re + '":{"id":' + id + ',"modules":[' + mms.join(',')
				+ ']}';
	},
	/**
	 * 生成模块
	 * 
	 * @param {}
	 *            module
	 */
	_getModule : function(module) {
		return '{"id":' + module.attr('data-id') + '}';
	},
	/**
	 * 发布详情页
	 * 
	 * @param {}
	 *            callback
	 */
	deployDetail : function(callback) {
		var sender = new WindSender("/router/member/page/deployDetail/?v="
				+ Math.random());
		sender.load("POST", {}, function(response) {
					if (response.isSuccess()) {
						callback();
					} else {
						alert(response.msg);
					}
				});
	},
	/**
	 * 发布搜索页
	 * 
	 * @param {}
	 *            callback
	 */
	deploySearch : function(callback) {
		var sender = new WindSender("/router/member/page/deploySearch/?v="
				+ Math.random());
		sender.load("POST", {}, function(response) {
					if (response.isSuccess()) {
						callback();
					} else {
						alert(response.msg);
					}
				});
	},
	/**
	 * 发布页面
	 * 
	 * @param {}
	 *            id
	 * @param {}
	 *            isHeader
	 */
	deploy : function(id, isHeader, callback) {
		var sender = new WindSender("/router/member/page/deploy/" + id + '?v='
				+ Math.random());
		sender.load("POST", {
					isHeader : isHeader
				}, function(response) {
					if (response.isSuccess()) {
						callback();
					} else {
						alert(response.msg);
					}
				});
	},
	/**
	 * 页面修复
	 * 
	 * @param {}
	 *            id
	 * @param {}
	 *            callback
	 */
	fixed : function(id, callback) {
		var sender = new WindSender("/router/member/page/fixed/" + id + '?v='
				+ Math.random());
		sender.load("POST", {}, function(response) {
					if (response.isSuccess()) {
						callback();
					} else {
						alert(response.msg);
					}
				});
	},
	/**
	 * 生成模板
	 * 
	 * @param {}
	 *            id
	 * @param {}
	 *            isHeader
	 * @param {}
	 *            callback
	 */
	createTemplate : function(id, callback) {
		var sender = new WindSender("/router/member/page/template/" + id
				+ '?v=' + Math.random());
		sender.load("POST", {}, function(response) {
					if (response.isSuccess()) {
						callback();
					} else {
						alert(response.msg);
					}
				});
	},
	/**
	 * 根据模板生成自定义页面
	 * 
	 * @param {}
	 *            id
	 * @param {}
	 *            title
	 * @param {}
	 *            cid
	 * @param {}
	 *            keywords
	 * @param {}
	 *            desc
	 * @param {}
	 *            callback
	 */
	addPageByTemplate : function(id, isIndex, title, cid, keywords, desc,
			callback, error) {
		var sender = new WindSender("/router/member/page/add?v="
				+ Math.random());
		sender.load("POST", {
					page_template : id,
					isIndex : isIndex,
					page_desc : desc,
					page_keywords : keywords,
					page_title : title,
					page_cid : cid
				}, function(response) {
					if (response.isSuccess()) {
						callback(response.body.id);
					} else {
						alert(response.msg);
						if (typeof(error) == 'function') {
							error();
						}
					}
				});
	},
	updatePageByTemplate : function(id, callback, error) {
		var sender = new WindSender("/router/member/page/update/template/"
				+ PAGEID + "?v=" + Math.random());
		sender.load("POST", {
					page_template : id
				}, function(response) {
					if (response.isSuccess()) {
						callback();
					} else {
						alert(response.msg);
						if (typeof(error) == 'function') {
							error();
						}
					}
				});
	},
	/**
	 * 加载指定类目下的子分类
	 * 
	 * @param {}
	 *            cid
	 * @param {}
	 *            callback
	 */
	loadCatsByParentCid : function(cid, callback) {
		var sender = new WindSender("/router/member/page/cats/" + cid + '?v='
				+ Math.random());
		sender.load("GET", {}, function(response) {
					if (response.isSuccess()) {
						callback(response.body);
					} else {
						alert(response.msg);
					}
				});
	},
	/**
	 * 加载页面Content信息
	 */
	loadContent : function(id, user_id, nick, pid, isDesigner) {
		$.ajax({
			url : '/router/member/page/content/' + id + '?v' + Math.random(),
			type : 'POST',
			data : {
				user_id : user_id,
				nick : nick,
				pid : pid,
				isDesigner : isDesigner
			},
			dataType : 'html',
			beforeSend : function(xhr) {
				xhr.setRequestHeader("WindType", "AJAX");// 请求方式
				xhr.setRequestHeader("WindDataType", "HTML");// 请求返回内容类型
			},
			error : function(request, textStatus, errorThrown) {
			},
			success : function(data) {
				$('#content').empty().append(data);
				if (!ISINDEX) {// 首页的话可编辑页头，内容，页尾
					$('#content').find('#hd .J_TRegion').attr('data-edit',
							false);// 设置页头不可编辑
				}
				$('#content').find('.J_TRegion').each(function() {
							$(this).pageRegion();
						});
				if ($('#J_GoTop').length == 0) {
					$('body')
							.append('<p id="J_GoTop" style="display:none;" class="gotop"><a accesskey="t" title="回顶部"><i class="ii"></i></a></p>');
				}
				$('#J_GoTop').crGoTop();
			}
		});
	},
	/**
	 * 加载容器内容
	 * 
	 * @param {}
	 *            J_Region
	 * @param {}
	 *            layout
	 * @param {}
	 *            region
	 */
	loadRegion : function(J_Region) {
		// J_Region
		// .empty()
		// .append('<div align="center"
		// class="page-loading">正在加载...</div>');//暂时不显示加载
		$.ajax({
					url : '/router/member/page/region/'
							+ J_Region.attr('data-id') + '?v' + Math.random(),
					type : 'GET',
					data : {},
					dataType : 'html',
					beforeSend : function(xhr) {
						xhr.setRequestHeader("WindType", "AJAX");// 请求方式
						xhr.setRequestHeader("WindDataType", "HTML");// 请求返回内容类型
					},
					error : function(request, textStatus, errorThrown) {
					},
					success : function(data) {
						J_Region.empty().append(data).pageRegion();
					}
				});
	},
	/**
	 * 佣金查看
	 * 
	 * @param {}
	 *            e
	 */
	addViewCommission : function(e, isAbs) {
		var c = e.attr('co');
		var pre = '佣金:';
		var last = '元';
		if (!c) {
			c = e.attr('cr');
			pre = '佣金比例:';
			last = '%';
		}
		var style = '';
		if (false == isAbs) {
			style = 'text-align: center;line-height: 14px;height: 14px;background: #F60;color: white;border: 1px solid blue;cursor: pointer;';
		} else {
			style = 'position: absolute;text-align: center;line-height: 14px;height: 14px;background: #F60;color: white;border: 1px solid blue;cursor: pointer;top:-2px;left:0px;';
		}
		if (c) {
			e.append('<div class="c-c" title="' + pre + c + last + '" style="'
					+ style + '">' + pre + c + last + '</div>');
		}
	},
	showMsg : function(msg) {
		$('#J_DSMsg').empty().append(msg).stop().animate({
					marginTop : '40px'
				}, 100).animate({
					marginTop : '0px'
				}, 5000);
	},
	/**
	 * 设置站点皮肤主题
	 * 
	 * @param {}
	 *            page
	 * @param {}
	 *            theme
	 * @param {}
	 *            skin
	 * @param {}
	 *            callback
	 */
	setSiteTheme : function(theme, skin, callback) {
		var sender = new WindSender('/router/member/page/theme/set?v='
				+ Math.random());
		sender.load("POST", {
					page : PAGEID,
					theme : theme,
					skin : skin
				}, function(response) {
					if (response.isSuccess()) {
						callback();
					} else {
						alert(response.msg);
						return;
					}
				});
	},
	initKissyEditor : function() {
		KISSY.ready(function(S) {
			S.use('editor', function() {
				var KE = S.Editor;
				KEDITOR = KE("#kissyTextArea", {
					attachForm : false,
					// 编辑器内弹窗z-index底线，防止互相覆盖
					baseZIndex : 300000,
					customStyle : 'body.ke-editor{background:none;background-image:none;}',
					customLink : (typeof(CUSTOMLINKS) != 'undefined'
							? CUSTOMLINKS
							: []),
					focus : true,
					pluginConfig : {
						"font-size" : {
							items : [{
								value : "14px",
								attrs : {
									style : 'position: relative; border: 1px solid #DDDDDD; margin: 2px; padding: 2px;'
								},
								name : ""
										+ " <span style='font-size:14px'>标准</span>"
										+ "<span style='position:absolute;top:1px;right:3px;'>14px</span>"
							}, {
								value : "16px",
								attrs : {
									style : 'position: relative; border: 1px solid #DDDDDD; margin: 2px; padding: 2px;'
								},
								name : ""
										+ " <span style='font-size:16px'>大</span>"
										+ "<span style='position:absolute;top:1px;right:3px;'>16px</span>"
							}, {
								value : "18px",
								attrs : {
									style : 'position: relative; border: 1px solid #DDDDDD; margin: 2px; padding: 2px;'
								},
								name : ""
										+ " <span style='font-size:18px'>特大</span>"
										+ "<span style='position:absolute;top:1px;right:3px;'>18px</span>"
							}, {
								value : "20px",
								attrs : {
									style : 'position: relative; border: 1px solid #DDDDDD; margin: 2px; padding: 2px;'
								},
								name : ""
										+ " <span style='font-size:20px'>极大</span>"
										+ "<span style='position:absolute;top:1px;right:3px;'>20px</span>"
							}],
							width : "115px"
						},
						"draft" : {
							interval : 5,
							limit : 10,
							helpHtml : "<div "
									+ "style='width:200px;'>"
									+ "<div style='padding:5px;'>草稿箱能够自动保存您最新编辑的内容，"
									+ "如果发现内容丢失，" + "请选择恢复编辑历史</div></div>"
						},
						"resize" : {
							direction : ["y"]
						}
					}
				})
						.use("elementpaths,sourcearea,preview,"
								+ "separator,"
								+ "undo,separator,removeformat,font,format,forecolor,bgcolor,separator,"
								+ "list,indent,justify,separator,link,image,flash,"
								+ "separator,table,resize,draft,separator,maximize");
			});
		});
	},
	/**
	 * 加载配置
	 */
	loadCommonModuleConfig : function(module, callback) {
		$.ajax({
					url : '/router/member/page/config/common/' + module + '?v='
							+ Math.random(),
					type : 'GET',
					data : {
						layout : $('#page-module-editor').pageModuleEditor(
								'option', 'layout')
					},
					dataType : 'html',
					beforeSend : function(xhr) {
						xhr.setRequestHeader("WindType", "AJAX");// 请求方式
						xhr.setRequestHeader("WindDataType", "HTML");// 请求返回内容类型
					},
					error : function(request, textStatus, errorThrown) {
						alert('网络错误:' + textStatus);
						return;
					},
					success : function(data) {
						$('#module-content').empty().append(data);
						callback();

					}
				});
		return true;
	},
	/**
	 * 根据指定顺序排序
	 * 
	 * @param {}
	 *            page
	 * @param {}
	 *            layouts
	 * @param {}
	 *            callback
	 */
	updatePageMeta : function(page, meta, callback) {
		var sender = new WindSender('/router/member/page/meta/update?v='
				+ Math.random());
		sender.load("POST", {
					page : page,
					meta : meta
				}, function(response) {
					if (response.isSuccess()) {
						callback();
					} else {
						alert(response.msg);
						return;
					}
				});
	},
	/**
	 * 删除布局
	 * 
	 * @param {}
	 *            layout
	 * @param {}
	 *            callback
	 */
	deleteLayout : function(layout, callback) {
		var sender = new WindSender('/router/member/page/layout/delete/'
				+ layout + '?v=' + Math.random());
		sender.load("POST", {
					meta : PageUtils.getPageMeta(),
					page : PAGEID
				}, function(response) {
					if (response.isSuccess()) {
						callback();
					} else {
						alert(response.msg);
						return;
					}
				});
	},
	addPage : function(title, cid, keywords, desc, layout, callback, isIndex) {
		var sender = new WindSender('/router/member/page/add?v='
				+ Math.random());
		sender.load("POST", {
					page_desc : desc,
					page_keywords : keywords,
					page_title : title,
					page_cid : cid,
					page_layout : layout,
					isIndex : isIndex
				}, function(response) {
					if (response.isSuccess()) {
						callback(response.body.id);
					} else {
						alert(response.msg);
						return;
					}
				});
	},
	/**
	 * 新增布局
	 * 
	 * @param {}
	 *            page
	 * @param {}
	 *            layout
	 */
	addLayout : function(page, layout, callback) {
		var sender = new WindSender('/router/member/page/layout/add?v='
				+ Math.random());
		sender.load("POST", {
					page : page,
					layout : layout
				}, function(response) {
					if (response.isSuccess()) {
						callback(response.body);
					} else {
						alert(response.msg);
						return;
					}
				});
	},
	/**
	 * 新增模块
	 */
	addModule : function(name, title, region, next, params, callback,
			userModule) {
		var sender = new WindSender('/router/member/page/module/add?v='
				+ Math.random());
		var data = {};
		data.name = name;
		data.title = title;
		data.region = region;
		data.page = PAGEID;
		if ('shopUser' == name) {
			if (!userModule) {
				alert('自定义模块缺少标识参数');
				return;
			}
			data.userModule = userModule;
		}
		if (typeof(ISLAYOUT) == 'undefined') {
			data.type = 'designer';
		} else {
			data.type = 'layout';
		}
		data.next = next;
		data.metadata = this.json2str(params);
		sender.load("POST", data, function(response) {
			if (response.isSuccess()) {
				callback(response.body);
			} else {
				alert(response.msg);
				$('#page-module-editor .thirdStep .btn-ok,#page-header-editor .thirdStep .btn-ok')
						.removeClass('btn-ok-disabled');
				return;
			}
		});
	},
	/**
	 * 更新模块内容
	 * 
	 * @param {}
	 *            id
	 * @param {}
	 *            title
	 * @param {}
	 *            params
	 * @param {}
	 *            callback
	 */
	updateModule : function(id, title, params, callback) {
		var sender = new WindSender('/router/member/page/module/update/' + id
				+ '?v=' + Math.random());
		var data = {};
		data.title = title;
		if (typeof(ISLAYOUT) == 'undefined') {
			data.type = 'designer';
		} else {
			data.type = 'layout';
		}
		data.metadata = this.json2str(params);
		sender.load("POST", data, function(response) {
			if (response.isSuccess()) {
				callback(response.body);
			} else {
				alert(response.msg);
				$('#page-module-editor .thirdStep .btn-ok,#page-header-editor .thirdStep .btn-ok')
						.removeClass('btn-ok-disabled');
				return;
			}
		});
	},
	validateNumber : function(num) {
		var numRe = /^-?[0-9]*(\.[0-9]+)?$/;
		return numRe.test(num);
	},
	validateUrl : function(url) {
		var urlRe = /^([a-z]([a-z]|\d|\+|-|\.)*):(\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?((\[(|(v[\da-f]{1,}\.(([a-z]|\d|-|\.|_|~)|[!\$&'\(\)\*\+,;=]|:)+))\])|((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=])*)(:\d*)?)(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*|(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)|((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)|((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)){0})(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i;
		return urlRe.test(url);
	},
	validateAlimamaFlashBM : function(src) {
		if (src && src.length > 0) {
			var isValid = true;
			try {
				var split_I = src.split('/');
				var split_A = split_I[split_I.length - 1].split('.swf')[0];
				var split_H = split_A.split('_');
				if (split_H && split_H.length >= 2) {
					return 'http://banner.alimama.com/ml?adboard_id='
							+ split_H[0] + '&bannerSize=' + split_H[2];
				} else {
					alert('请确认广告牌地址是否有效');
				}
			} catch (e) {
				alert(e + '请确认广告牌地址是否有效');
			}
		} else {
			alert('您尚未填写阿里妈妈广告牌Flash动画地址');
		}
		return false;
	},
	/**
	 * Json对象转换为字符串
	 * 
	 * @param {Json}O
	 * @return {String}
	 */
	json2str : function(o) {
		var r = [];
		if (typeof o == "string")
			return "\""
					+ o.replace(/([\'\"\\])/g, "\\$1").replace(/(\n)/g, " \\n")
							.replace(/(\r)/g, "\\r").replace(/(\t)/g, "\\t")
					+ "\"";
		if (typeof o == "object") {
			if (o == null) {
				r = r.join() + "null";// 因为null只会出现在值,属性不可能为null,所以直接加null
			} else {
				if (!$.isArray(o)) {// 是否是数组
					for (var i in o) {
						r.push(i + ":" + PageUtils.json2str(o[i]));
					}
					var oString = o.toString;
					if (!!document.all
							&& !/^\n?function\s*toString\(\)\s*\{\n?\s*\[native code\]\n?\s*\}\n?\s*$/
									.test(oString)) {
						r.push("toString:" + oString.toString());
					}
					r = "{" + r.join() + "}"
				} else {
					var len = o.length;
					var i = 0;
					while (i < len) {
						r.push(PageUtils.json2str(o[i]));
						i++;
					}
					r = "[" + r.join() + "]"
				}
			}
			try {
				return r;
			} finally {
				r = null;
				delete r;
			}
		}
		try {
			return o.toString();
		} finally {
			o = null;
			delete o;
		}
	}
}