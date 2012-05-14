var PageAlimamaConfig = {
	/**
	 * 初始化Alimama推广配置
	 * 
	 * @param {}
	 *            func
	 * @return {Boolean}
	 */
	initCommonAlimamaConfig : function(func) {
		var ali_pid = "";
		var titlecolor = "";
		var descolor = "";
		var bgcolor = "";
		var bordercolor = "";
		var linkcolor = "";
		var bottomcolor = "";
		var anglesize = "";
		var bgpic = "";
		var icon = "";
		var sizecode = "";
		var width = "";
		var height = "";
		var type = "";
		if (MODULE && MODULE.hasClass('J_TBox')) {// 如果存在，并且为编辑模块模式,还原属性
			var options = MODULE['page'
					+ PageModuleUtils.getModuleName(MODULE.attr('name'))]('option');
			if (options.ali_pid) {
				ali_pid = options.ali_pid;
			}
			if (options.titlecolor) {
				titlecolor = options.titlecolor;
			}
			if (options.descolor) {
				descolor = options.descolor;
			}
			if (options.bgcolor) {
				bgcolor = options.bgcolor;
			}
			if (options.bordercolor) {
				bordercolor = options.bordercolor;
			}
			if (options.linkcolor) {
				linkcolor = options.linkcolor;
			}
			if (options.bottomcolor) {
				bottomcolor = options.bottomcolor;
			}
			if (options.anglesize) {
				anglesize = options.anglesize;
			}
			if (options.bgpic) {
				bgpic = options.bgpic;
			}
			if (options.icon) {
				icon = options.icon;
			}
			if (options.sizecode) {
				sizecode = options.sizecode;
			}
			if (options.width) {
				width = options.width;
			}
			if (options.height) {
				height = options.height;
			}
			if (options.type) {
				type = options.type;
			}
		}
		$.ajax({
					url : '/router/member/page/config/union?v=' + Math.random(),
					type : 'GET',
					data : {
						union_type : 'alimama',
						pid : ali_pid,
						titlecolor : titlecolor,
						descolor : descolor,
						bgcolor : bgcolor,
						bordercolor : bordercolor,
						linkcolor : linkcolor,
						bottomcolor : bottomcolor,
						anglesize : anglesize,
						bgpic : bgpic,
						icon : icon,
						sizecode : sizecode,
						width : width,
						height : height,
						type : type
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
						if (func && typeof(func) == 'function') {
							func();
						}
					}
				});
		return true;
	},

	createCommonAlimamaParams : function() {
		var params = {};
		var code = $('#shop-union-textarea').val();
		if (!code) {
			alert('广告代码不能为空');
			return false;
		}
		var ali_pidReg = /alimama_pid\s*=\s*"(.*)"/;
		var ali_pid = this.getParams(code, ali_pidReg);
		if (ali_pid == null) {
			alert('alimama_pid不能为空');
			return false;
		}
		var widthReg = /alimama_width\s*=\s*([0-9]+)/;
		var width = this.getParams(code, widthReg);
		if (width == null) {
			alert('width不能为空');
			return false;
		}
		var heightReg = /alimama_height\s*=\s*([0-9]+)/;
		var height = this.getParams(code, heightReg);
		if (height == null) {
			alert('height不能为空');
			return false;
		}
		var titlecolorReg = /alimama_titlecolor\s*=\s*"(.*)"/;
		var titlecolor = this.getParams(code, titlecolorReg);
		if (titlecolor == null) {
			// alert('titlecolor不能为空');
			// return false;
			titlecolor = '';
		}
		var descolorReg = /alimama_descolor\s*=\s*"(.*)"/;
		var descolor = this.getParams(code, descolorReg);
		if (descolor == null) {
			// alert('descolor不能为空');
			// return false;
			descolor = '';
		}
		var bgcolorReg = /alimama_bgcolor\s*=\s*"(.*)"/;
		var bgcolor = this.getParams(code, bgcolorReg);
		if (bgcolor == null) {
			// alert('bgcolor不能为空');
			// return false;
			bgcolor = '';
		}
		var bordercolorReg = /alimama_bordercolor\s*=\s*"(.*)"/;
		var bordercolor = this.getParams(code, bordercolorReg);
		if (bordercolor == null) {
			// alert('bordercolor不能为空');
			// return false;
			bordercolor = '';
		}
		var linkcolorReg = /alimama_linkcolor\s*=\s*"(.*)"/;
		var linkcolor = this.getParams(code, linkcolorReg);
		if (linkcolor == null) {
			// alert('linkcolor不能为空');
			// return false;
			linkcolor = '';
		}
		var bottomcolorReg = /alimama_bottomcolor\s*=\s*"(.*)"/;
		var bottomcolor = this.getParams(code, bottomcolorReg);
		if (bottomcolor == null) {
			// alert('bottomcolor不能为空');
			// return false;
			bottomcolor = '';
		}
		var anglesizeReg = /alimama_anglesize\s*=\s*"(.*)"/;
		var anglesize = this.getParams(code, anglesizeReg);
		if (anglesize == null) {
			// alert('anglesize不能为空');
			// return false;
			anglesize = '';
		}
		var bgpicReg = /alimama_bgpic\s*=\s*"(.*)"/;
		var bgpic = this.getParams(code, bgpicReg);
		if (bgpic == null) {
			// alert('bgpic不能为空');
			// return false;
			bgpic = '';
		}
		var iconReg = /alimama_icon\s*=\s*"(.*)"/;
		var icon = this.getParams(code, iconReg);
		if (icon == null) {
			// alert('icon不能为空');
			// return false;
			icon = '';
		}
		var sizecodeReg = /alimama_sizecode\s*=\s*"(.*)"/;
		var sizecode = this.getParams(code, sizecodeReg);
		if (sizecode == null) {
			// alert('sizecode不能为空');
			// return false;
			sizecode = '';
		}

		var typeReg = /alimama_type\s*=\s*([0-9])/;
		var type = this.getParams(code, typeReg);
		if (type == null) {
			// alert('type不能为空');
			// return false;
			type = '';
		}
		params.isHd = ($('#module-ishd').attr('checked') + "");
		params.ali_pid = ali_pid;
		params.titlecolor = titlecolor;
		params.descolor = descolor;
		params.bgcolor = bgcolor;
		params.bordercolor = bordercolor;
		params.linkcolor = linkcolor;
		params.bottomcolor = bottomcolor;
		params.anglesize = anglesize;
		params.bgpic = bgpic;
		params.icon = icon;
		params.sizecode = sizecode;
		params.width = width;
		params.height = height;
		params.type = type;
		return params;
	},
	getParams : function(code, reg) {
		var result = code.match(reg);
		if (result != null) {
			return result[1];
		}
		return null;
	},
	/**
	 * Alimama推广配置校验
	 */
	validateCommonAlimamaConfig : function() {
		var code = $('#shop-union-textarea').val();
		if (!code) {
			alert('广告代码不能为空');
			return false;
		}
		var ali_pidReg = /alimama_pid\s*=\s*"(.*)"/;
		var ali_pid = this.getParams(code, ali_pidReg);
		if (ali_pid == null) {
			alert('alimama_pid不能为空');
			return false;
		}
		// var titlecolorReg = /alimama_titlecolor\s*=\s*"(.*)"/;
		// var titlecolor = this.getParams(code, titlecolorReg);
		// if (titlecolor == null) {
		// alert('titlecolor不能为空');
		// return false;
		// }
		// var descolorReg = /alimama_descolor\s*=\s*"(.*)"/;
		// var descolor = this.getParams(code, descolorReg);
		// if (descolor == null) {
		// alert('descolor不能为空');
		// return false;
		// }
		// var bgcolorReg = /alimama_bgcolor\s*=\s*"(.*)"/;
		// var bgcolor = this.getParams(code, bgcolorReg);
		// if (bgcolor == null) {
		// alert('bgcolor不能为空');
		// return false;
		// }
		// var bordercolorReg = /alimama_bordercolor\s*=\s*"(.*)"/;
		// var bordercolor = this.getParams(code, bordercolorReg);
		// if (bordercolor == null) {
		// alert('bordercolor不能为空');
		// return false;
		// }
		// var linkcolorReg = /alimama_linkcolor\s*=\s*"(.*)"/;
		// var linkcolor = this.getParams(code, linkcolorReg);
		// if (linkcolor == null) {
		// alert('linkcolor不能为空');
		// return false;
		// }
		// var bottomcolorReg = /alimama_bottomcolor\s*=\s*"(.*)"/;
		// var bottomcolor = this.getParams(code, bottomcolorReg);
		// if (bottomcolor == null) {
		// alert('bottomcolor不能为空');
		// return false;
		// }
		// var anglesizeReg = /alimama_anglesize\s*=\s*"(.*)"/;
		// var anglesize = this.getParams(code, anglesizeReg);
		// if (anglesize == null) {
		// alert('anglesize不能为空');
		// return false;
		// }
		// var bgpicReg = /alimama_bgpic\s*=\s*"(.*)"/;
		// var bgpic = this.getParams(code, bgpicReg);
		// if (bgpic == null) {
		// alert('bgpic不能为空');
		// return false;
		// }
		// var iconReg = /alimama_icon\s*=\s*"(.*)"/;
		// var icon = this.getParams(code, iconReg);
		// if (icon == null) {
		// alert('icon不能为空');
		// return false;
		// }
		// var sizecodeReg = /alimama_sizecode\s*=\s*"(.*)"/;
		// var sizecode = this.getParams(code, sizecodeReg);
		// if (sizecode == null) {
		// alert('sizecode不能为空');
		// return false;
		// }
		// var typeReg = /alimama_type\s*=\s*([0-9])/;
		// var type = this.getParams(code, typeReg);
		// if (type == null) {
		// alert('type不能为空');
		// return false;
		// }
		var widthReg = /alimama_width\s*=\s*([0-9]+)/;
		var width = this.getParams(code, widthReg);
		if (width == null) {
			alert('width不能为空');
			return false;
		}
		var heightReg = /alimama_height\s*=\s*([0-9]+)/;
		var height = this.getParams(code, heightReg);
		if (height == null) {
			alert('height不能为空');
			return false;
		}

		return true;
	}
};
