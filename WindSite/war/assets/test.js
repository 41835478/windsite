(function() {
	var C = $("#thor_aim");
	var D = $(".tips_cover");
	var t = $("#painter_layer");
	var c = $("#canvas_container");
	var w = $("#simi_phone_tips_cover");
	var n = $(".simi_phone");
	var v = $("#thor_aim_tips_layer");
	var m = $(".thor_aim_container_inner");
	var u = $("#allowJs");
	var y = $("#nativeMark");
	var b = 0;
	var F = {
		min_aim_body_width : "760px",
		min_aim_body_height : "400px",
		min_aim_body_width_value : "980px",
		min_aim_body_height_value : "850px"
	};
	var j = function() {
		if (f.loadFlag == 0) {
			f.loadFlag = 1;
			f.success();
			var H = new Date();
			z.loadpc_end_time = H.getTime();
			z.pc_display_time = z.loadpc_end_time - z.loadpc_start_time;
			var I = {
				appid : appid,
				url : encodeURIComponent(edit_url),
				pc_display_time : z.pc_display_time,
				res : 0
			};
			z.loadpc(I)
		}
	};
	window.iframeLoad = j;
	var i = {
		isNullOrEmpty : function(H) {
			return null == H || "null" == H || "" == H || undefined == H
					|| [] == H
		},
		replaceAll : function(I, H) {
			return this.replace(new RegExp(I, "gm"), H)
		},
		innerAppend : function(H, I) {
			$(H).append(I)
		},
		innerCss : function(H, I) {
			C.contents().find(H).css(I)
		},
		setUrlParam : function(J, K, H) {
			var M = new String();
			var N = H;
			if (N.indexOf("?") != -1) {
				N = N.substr(N.indexOf("?") + 1);
				if (N.toLowerCase().indexOf(J.toLowerCase()) == -1) {
					M = H + "&" + J + "=" + K;
					return M
				} else {
					var L = N.split("&");
					for (var I = 0; I < L.length; I++) {
						if (L[I].substr(0, L[I].indexOf("=")).toLowerCase() == J
								.toLowerCase()) {
							L[I] = L[I].substr(0, L[I].indexOf("=")) + "=" + K
						}
					}
					M = H.substr(0, H.indexOf("?") + 1) + L.join("&");
					return M
				}
			} else {
				N += "?" + J + "=" + K;
				return N
			}
		}
	};
	var l = {
		getCptId : function() {
			var H = 0;
			H = this.ctpMax + 1;
			this.ctpMax++;
			return H
		},
		ctpMax : 0
	};
	var x = {
		getQuery : function(J) {
			var I = this.xpathGenerator($(J), "");
			var H = "//" + I;
			return H
		},
		getAttr : function(N) {
			var Q = N.get(0).tagName;
			var K = N.attr("id") ? N.attr("id") : "", L = N.attr("class") ? N
					.attr("class") : "";
			if (markModel == 1) {
				L = $.trim(L)
			}
			var P = !i.isNullOrEmpty(N.attr("id")), O = !i.isNullOrEmpty(N
					.attr("class"));
			if (L != "" && K != "") {
				var R = Q + "[id='" + K + "'][class='" + L + "']"
			} else {
				if (L == "" && K != "") {
					var R = Q + "[id='" + K + "']"
				} else {
					if (L != "" && K == "") {
						var R = Q + "[class='" + L + "']"
					} else {
						if (L == "" && K == "") {
							var R = Q
						}
					}
				}
			}
			var I = "[@id='" + K + "']", H = "[@class='" + L + "']";
			var J = "";
			if (N.siblings(R).size() > 0) {
				var M = N.prevAll(R).size() + 1;
				J = "[" + M + "]"
			} else {
				J = ""
			}
			if (P && O) {
				return I + J
			} else {
				if (P && !O) {
					return I + J
				} else {
					if (!P && O) {
						return H + J
					} else {
						return J
					}
				}
			}
		},
		xpathGenerator : function(L, K) {
			var I = L.get(0).tagName;
			if (I.toLowerCase() == "body" || i.isNullOrEmpty(L)
					|| i.isNullOrEmpty(I)) {
				return K
			}
			I = I.toLowerCase();
			if (I != "img") {
				var H = this.getAttr(L);
				I = I + H;
				K = i.isNullOrEmpty(K) ? I : I + "/" + K
			}
			var J = L.parent();
			if (i.isNullOrEmpty(J)) {
				return K
			}
			return this.xpathGenerator(J, K)
		},
		xpathParser : function(I) {
			var L = [];
			var K = document.getElementById("thor_aim").contentWindow.document;
			if (K.evaluate) {
				var H = null;
				try {
					H = K.evaluate(I, K, null,
							XPathResult.ORDERED_NODE_ITERATOR_TYPE, null)
				} catch (M) {
				}
				if (H) {
					var J = H.iterateNext();
					while (J) {
						if (J.nodeType == 1) {
							if (J.nodeName.toLowerCase() != "html"
									&& J.nodeName.toLowerCase() != "body") {
								L.push(J)
							}
						}
						J = H.iterateNext()
					}
				}
			}
			return L
		}
	};
	var h = {
		isAllowTrace : 1,
		highlight : function(M, H, I, J, K, L) {
			M.css({
						"z-index" : 9000,
						left : H,
						top : I,
						width : J,
						height : K,
						position : "absolute",
						"background-color" : "#facd93"
					});
			M.css(L, "1px dashed #000")
		},
		process : function(M) {
			if ($(M).get(0).tagName.toLowerCase() != "html"
					&& $(M).attr("class") != "traceHighlight"
					&& h.isAllowTrace == 1) {
				var O = $(M).offset();
				var N = $(M).outerWidth();
				var J = C.contents().width();
				if (N > J) {
					N = J
				}
				$(".traceHighlight").remove();
				t
						.append("<div id='traceHighlight_top' class='traceHighlight'></div><div id='traceHighlight_right' class='traceHighlight'></div><div id='traceHighlight_bottom' class='traceHighlight'></div><div id='traceHighlight_left' class='traceHighlight'></div>");
				var H = $("#traceHighlight_top");
				var L = $("#traceHighlight_right");
				var K = $("#traceHighlight_bottom");
				var I = $("#traceHighlight_left");
				this.highlight(H, O.left - 2, O.top - 2, N + 4, 2,
						"border-bottom");
				this.highlight(L, O.left + N, O.top, 2, $(M).outerHeight(),
						"border-left");
				this.highlight(K, O.left - 2, O.top + $(M).outerHeight(),
						N + 4, 2, "border-top");
				this.highlight(I, O.left - 2, O.top, 2, $(M).outerHeight(),
						"border-right")
			}
		}
	};
	var s = {
		newBlock : null,
		highlight : function(L, H, I, J, K) {
			L.css({
						"z-index" : 9000,
						left : H,
						top : I,
						width : J,
						height : K,
						border : "solid 2px #fff",
						position : "absolute",
						"background-color" : "#5C9FC0",
						opacity : 0.3,
						"border-radius" : "3px"
					})
		},
		process : function(P, H, M) {
			if (M == "click") {
				q.saveAction("block");
				$(".edit_hidden").remove();
				$(".edit_fail").remove()
			}
			var J = $(".addBlockHighlight");
			var R = $(".redBlockFail");
			if (J.length > 0 || R.length > 0) {
				J = $.merge(J, R);
				this.delSon(J, P)
			}
			var Q = $(P).offset();
			var K = $(P).outerWidth();
			var S = C.contents().width();
			if (K > S) {
				K = S
			}
			t.append("<div id=blockId" + b
					+ " class='addBlockHighlight'></div>");
			var L = $("#blockId" + b);
			if (K + Q.left > S) {
				K = S - Q.left
			}
			this.highlight(L, Q.left - 2, Q.top - 2, K, $(P).outerHeight());
			var N = {
				info : H,
				target : P,
				blockId : b
			};
			this.blockDataCache.save(L, N);
			b++;
			B.clean();
			o.cleanIndex();
			if (M == "click") {
				s.newBlock = L;
				p.preview(L, M)
			} else {
				var I = new Date();
				var O = I.getTime();
				L.attr("data-receive", O);
				s.addSuccess(L, M)
			}
		},
		addSuccess : function(M, L, H) {
			var K = s.blockDataCache.read(M);
			var N = {
				type : K.info.type,
				sign_type : K.info.sign_type,
				xpath : K.info.xpath.toString(),
				url : edit_url
			};
			this.success_log(N);
			var I = new Date();
			z.loadmark_end_time = I.getTime();
			z.appuid_display_time = z.loadmark_end_time - z.loadmark_start_time;
			var J = {
				appid : appid,
				sign_type : K.info.sign_type,
				url : encodeURIComponent(edit_url),
				xpath : encodeURIComponent(K.info.xpath.toString()),
				updatedict_time : z.updatedict_time,
				appuid_display_time : z.appuid_display_time,
				is_native : markModel,
				res : 0
			};
			if (z.loadmark_start_time != 0) {
				z.mark(J)
			}
			$(".wait_del").remove();
			$(".wait_fail_del").remove();
			var K = s.blockDataCache.read(M);
			s.after_add(M);
			if (L == "click") {
				p.findBlock(K.info.xpath, 1, H)
			}
		},
		error_log : function(H) {
			$.ajax({
				url : "/static/webappservice/css/images/thor/thor_error_log.gif",
				timeout : 8000,
				type : "GET",
				dataType : "json",
				data : H
			})
		},
		success_log : function(H) {
			$.ajax({
				url : "/static/webappservice/css/images/thor/thor_success_log.gif",
				timeout : 8000,
				type : "GET",
				dataType : "json",
				data : H
			})
		},
		addFail : function(M, L) {
			var K = s.blockDataCache.read(M);
			var H = {
				type : K.info.type,
				sign_type : K.info.sign_type,
				xpath : K.info.xpath.toString(),
				url : edit_url
			};
			this.error_log(H);
			var I = new Date();
			z.loadmark_end_time = I.getTime();
			z.appuid_display_time = z.loadmark_end_time - z.loadmark_start_time;
			var J = {
				appid : appid,
				sign_type : K.info.sign_type,
				url : encodeURIComponent(edit_url),
				xpath : encodeURIComponent(K.info.xpath.toString()),
				updatedict_time : z.updatedict_time,
				appuid_display_time : z.appuid_display_time,
				is_native : markModel,
				res : 1
			};
			if (z.loadmark_start_time != 0) {
				z.mark(J)
			}
			$(".wait_del").addClass("addBlockHighlight");
			$(".wait_del").removeClass("wait_del");
			$(".wait_fail_del").addClass("redBlockFail");
			$(".wait_fail_del").removeClass("wait_fail_del");
			q.delOneAction()
		},
		blockDataCache : {
			save : function(I, H) {
				I.data(H)
			},
			read : function(H) {
				return H.data()
			}
		},
		delSon : function(H, I) {
			$.each(H, function(P, N) {
						var M = s.blockDataCache.read($(N));
						var O = M.target;
						var K = $(O).parents();
						var L = K.index(I);
						var J = M.blockId;
						if (L != -1) {
							if ($("#blockId" + J).hasClass("addBlockHighlight")) {
								$("#blockId" + J)
										.removeClass("addBlockHighlight");
								$("#blockId" + J).addClass("wait_del")
							}
							if ($("#blockId" + J).hasClass("redBlockFail")) {
								$("#blockId" + J).removeClass("redBlockFail");
								$("#blockId" + J).addClass("wait_fail_del")
							}
						}
					})
		},
		after_add : function(I) {
			var H = s.blockDataCache.read(I);
			I.click(function() {
						if (!i.isNullOrEmpty(p.tipsHighlight.addFail.tips_fail)) {
							p.tipsHighlight.addFail.tips_fail.remove();
							p.tipsHighlight.addFail.simi_phone_tips_cover
									.remove()
						}
						E.process(H)
					})
		},
		after_fail_add : function(L) {
			var I = s.blockDataCache.read(L);
			var K = I.info;
			var J = I.target;
			var H = I.blockId;
			L.click(function() {
						if (!i.isNullOrEmpty(p.tipsHighlight.addFail.tips_fail)) {
							p.tipsHighlight.addFail.tips_fail.remove();
							p.tipsHighlight.addFail.simi_phone_tips_cover
									.remove()
						}
						E.process(I)
					})
		},
		delAll : function() {
			var H = $(".addBlockHighlight");
			H.remove()
		}
	};
	var E = {
		highlight : function(L, K, J, I, H) {
			L.css({
						"z-index" : 9000,
						left : K,
						top : J,
						width : I,
						height : H,
						border : "solid 2px #fff",
						position : "absolute",
						"background-color" : "#000",
						opacity : 0.7,
						"border-radius" : "3px"
					})
		},
		infoblockLayout : function(K, J, I, H) {
			K.css({
						top : I,
						left : J,
						"background-color" : H
					})
		},
		process : function(O) {
			E.clean();
			var I = O.info;
			var Q = O.target;
			var J = O.blockId;
			var U = $(Q).offset();
			var X = $(Q).outerHeight();
			var K = $(Q).outerWidth();
			var W = C.contents().width();
			if (K > W) {
				K = W
			}
			$(".traceHighlight,.selectHighlight").remove();
			h.isAllowTrace = 0;
			B.isAllowclick = 0;
			o.del();
			if ($("#blockId" + J).hasClass("redBlockFail")) {
				var P = "<div class='infoblock fail_infoblock'><div class='arrow'></div><div class='reset_btn'><div class='reset'></div><div class='del'></div></div>"
			} else {
				if (I.type == "WIDE_BLOCK") {
					var V = i.isNullOrEmpty(I.title) ? "" : I.title;
					var T = i.isNullOrEmpty(I.link) ? "" : I.link;
					var R = "内容";
					var P = "<div class='infoblock'><div class='arrow'></div><div class='item'>属性："
							+ R
							+ "</div><div class='item'>标题："
							+ V
							+ "</div><div class='item'>链接："
							+ T
							+ "</div><div class='reset_btn'><div class='reset'></div><div class='del'></div></div>"
				} else {
					if (I.type == "NAV") {
						var R = "导航";
						var P = "<div class='infoblock'><div class='arrow'></div><div class='item'>属性："
								+ R
								+ "</div><div class='item'></div><div class='item'></div><div class='reset_btn'><div class='reset'></div><div class='del'></div></div>"
					}
				}
			}
			t.append("<div class='showBlockHighlight'></div>" + P);
			var N = $(".infoblock");
			if (K >= 350 && X >= 70) {
				var H = U.top + (X - 70) - 2;
				var M = U.left - 2;
				var S = "transparent"
			} else {
				var H = U.top + (X - 70) - 2 + 80;
				var M = U.left - 2;
				var S = "#000"
			}
			if (M + 340 > W) {
				M = M - 110
			}
			this.infoblockLayout(N, M, H, S);
			var L = $(".showBlockHighlight");
			if (K + U.left > W) {
				K = W - U.left
			}
			this.highlight(L, U.left - 2, U.top - 2, K, X);
			if ($("#blockId" + J).hasClass("addBlockHighlight")) {
				c.scrollTop(H - 200);
				c.scrollLeft(M - 200);
				p.findBlock(I.xpath)
			}
			this.after_show(O)
		},
		clean : function() {
			$(".showBlockHighlight").remove();
			$(".infoblock").remove();
			$(".edit_hidden").addClass("addBlockHighlight");
			$(".addBlockHighlight").removeClass("edit_hidden");
			$(".edit_fail").addClass("redBlockFail");
			$(".redBlockFail").removeClass("edit_fail")
		},
		after_show : function(K) {
			var M = K.info;
			var L = K.target;
			var I = K.blockId;
			var H = $(".infoblock .reset_btn .del");
			var J = $(".infoblock .reset_btn .reset");
			H.click(function() {
						q.saveAction("block");
						$("#blockId" + I).remove();
						var O = $(".addBlockHighlight");
						var N = [];
						$.each(O, function(R, Q) {
									var P = s.blockDataCache.read($(Q));
									if (P.info.gid != undefined) {
										if (P.info.gid == M.gid) {
											$("#blockId" + P.blockId).remove()
										}
									}
								});
						E.clean();
						h.isAllowTrace = 1;
						B.isAllowclick = 1;
						if ($("#blockId" + I).hasClass("redBlockFail")) {
							if (!i
									.isNullOrEmpty(p.tipsHighlight.addFail.tips_fail)) {
								p.tipsHighlight.addFail.tips_fail.remove();
								p.tipsHighlight.addFail.simi_phone_tips_cover
										.remove()
							}
						} else {
							p.del_state = 1;
							p.preview(null, "del")
						}
					});
			J.click(function() {
				E.clean();
				if ($("#blockId" + I).hasClass("redBlockFail")) {
					$("#blockId" + I).addClass("edit_fail");
					$("#blockId" + I).removeClass("redBlockFail");
					B.isAllowclick = 1;
					B.process(L, "add", M)
				} else {
					$("#blockId" + I).addClass("edit_hidden");
					$("#blockId" + I).removeClass("addBlockHighlight");
					var O = $(".addBlockHighlight");
					var N = [];
					$.each(O, function(R, Q) {
								var P = s.blockDataCache.read($(Q));
								if (P.info.gid != undefined) {
									if (P.info.gid == M.gid) {
										$("#blockId" + P.blockId)
												.addClass("edit_hidden");
										$("#blockId" + P.blockId)
												.removeClass("addBlockHighlight")
									}
								}
							});
					B.isAllowclick = 1;
					B.process(L, "edit", M)
				}
			})
		}
	};
	var B = {
		isAllowclick : 1,
		containerAllowclick : 1,
		highlight : function(L, H, I, J, K) {
			L.css({
						"z-index" : 9000,
						left : H,
						top : I,
						width : J,
						height : K,
						border : "solid 2px #fff",
						position : "absolute",
						"background-color" : "#000",
						opacity : 0.7,
						"border-radius" : "3px"
					})
		},
		process : function(K, I, J) {
			if ($(K).get(0).tagName.toLowerCase() != "html"
					&& $(K).attr("class") != "selectHighlight"
					&& B.isAllowclick == 1) {
				if (!i.isNullOrEmpty(p.tipsHighlight.addFail.tips_fail)) {
					p.tipsHighlight.addFail.tips_fail.remove();
					p.tipsHighlight.addFail.simi_phone_tips_cover.remove()
				}
				var N = $(K).offset();
				var M = $(K).outerWidth();
				var H = C.contents().width();
				if (M > H) {
					M = H
				}
				$(".traceHighlight,.selectHighlight").remove();
				t
						.append("<div id='selectHighlight' class='selectHighlight'></div>");
				var L = $("#selectHighlight");
				if (M + N.left > H) {
					M = H - N.left
				}
				this.highlight(L, N.left - 2, N.top - 2, M, $(K).outerHeight());
				h.isAllowTrace = 0;
				B.isAllowclick = 0;
				if (I == "add") {
					o.add(t, K)
				} else {
					if (I == "edit") {
						o.edit(t, K, J)
					}
				}
			} else {
				if (B.isAllowclick == 0 && B.containerAllowclick == 1) {
					B.clean();
					E.clean();
					o.cleanIndex()
				}
			}
		},
		clean : function() {
			$(".traceHighlight,.selectHighlight").remove();
			o.del();
			h.isAllowTrace = 1;
			B.isAllowclick = 1;
			B.containerAllowclick = 1;
			if (!i.isNullOrEmpty(p.tipsHighlight.setBlock.edit_cpt_btn)) {
				p.tipsHighlight.setBlock.edit_cpt_btn.remove()
			}
		}
	};
	var o = {
		target : null,
		targetArray : [],
		targetIndex : 0,
		allowZoom : 0,
		getTargetArray : function(I) {
			this.targetArray.push(I);
			var H = $(I).parent();
			if (i.isNullOrEmpty(H.get(0))) {
				return this.targetArray
			}
			return this.getTargetArray(H)
		},
		add : function(H, I) {
			this.target = I;
			if (i.isNullOrEmpty(this.targetArray)) {
				this.getTargetArray(I)
			}
			a.install(H);
			a.after_install("add");
			a.position(I)
		},
		edit : function(H, J, I) {
			this.target = J;
			if (i.isNullOrEmpty(this.targetArray)) {
				this.getTargetArray(J)
			}
			a.install(H);
			a.after_install("edit", I);
			a.position(J)
		},
		del : function() {
			if (!i.isNullOrEmpty(a.set_tool)) {
				a.set_tool.remove()
			}
		},
		cleanIndex : function() {
			this.targetArray = [];
			this.targetIndex = 0;
			this.allowZoom = 0
		}
	};
	var G = {
		blockData : null,
		install : function(J, H, K) {
			J.append(this.code);
			this.blockData = K;
			this.init();
			this.edit_cpt.css({
						top : H.top + 60,
						left : "-200px"
					});
			var I = $("#canvas_container").scrollTop();
			$("#canvas_container").scrollTop(I + 1);
			$("#canvas_container").scrollTop(I - 1)
		},
		init : function(H) {
			this.edit_cpt = $("#edit_cpt");
			this.content_title = $("#edit_cpt #content_title");
			this.content_link = $("#edit_cpt #content_link");
			this.cancel_btn = $("#edit_cpt .cancel_btn");
			this.finish_btn = $("#edit_cpt .finish_btn");
			this.help_content = $("#edit_cpt .help_content");
			this.help_link = $("#edit_cpt .help_link");
			this.edit_state = 0;
			this.after_install()
		},
		after_install : function() {
			G.help_content.click(function() {
				helpIntro.showHelp({
							parentDiv : "html",
							num : 5,
							url : "/static/webappservice/images/helpIntro.html?"
									+ Date.parse(new Date())
						})
			});
			G.help_link.click(function() {
				helpIntro.showHelp({
							parentDiv : "html",
							num : 5,
							url : "/static/webappservice/images/helpIntro.html?"
									+ Date.parse(new Date())
						})
			});
			G.content_title.focus(function() {
						if (G.content_title.val() == "内容块标题") {
							G.content_title.val("")
						}
						r.isAllowShortCut = 0
					});
			G.content_link.focus(function() {
						if (G.content_link.val() == "内容块链接") {
							G.content_link.val("")
						}
						r.isAllowShortCut = 0
					});
			G.content_title.blur(function() {
						if (G.content_title.val() == "") {
							G.content_title.val("内容块标题")
						}
						r.isAllowShortCut = 1
					});
			G.content_link.blur(function() {
						if (G.content_link.val() == "") {
							G.content_link.val("内容块链接")
						}
						r.isAllowShortCut = 1
					});
			G.cancel_btn.click(function() {
						G.edit_cpt.remove();
						p.tipsHighlight.clean()
					});
			G.finish_btn.click(function() {
						var M = G.blockData;
						var P = G.content_title.val() == "内容块标题"
								? ""
								: G.content_title.val();
						var L = G.content_link.val() == "内容块链接"
								? ""
								: G.content_link.val();
						var O = $("#blockId" + M.blockId);
						var K = {
							blockId : M.blockId,
							info : {
								title : M.info.title,
								link : M.info.link,
								sign_type : M.info.sign_type,
								type : M.info.type,
								xpath : M.info.xpath
							},
							target : M.target
						};
						q.saveAction("cpt", K);
						var N = {
							blockId : M.blockId,
							info : {
								title : P,
								link : L,
								type : M.info.type,
								sign_type : M.info.sign_type,
								xpath : M.info.xpath
							},
							target : M.target
						};
						s.blockDataCache.save(O, N);
						p.saveCptInfo(M.info);
						G.edit_cpt.remove();
						p.tipsHighlight.clean();
						p.tipsHighlight.setBlock.fullScreenEditXpth = [];
						G.edit_state = 1
					});
			var I = G.blockData;
			var J = I.info.title == "" ? "内容块标题" : I.info.title;
			var H = I.info.link == "" ? "内容块链接" : I.info.link;
			G.content_title.val(J);
			G.content_link.val(H)
		},
		code : '<div id="edit_cpt"><div class="set"><div class="set_info_content"><div class="set_type_head"><div class="title">编辑</div></div><div class="set_type_body"><div class="content_form"><div class="form_item"><span>名称</span><span><input type="text" id="content_title" value="内容块标题" /></span><div class="help_content"></div></div><div class="form_item"><span>地址</span><span><input type="text" id="content_link" value="内容块链接" /></span><div class="help_link"></div></div></div><div class="finish_btn"></div><div class="cancel_btn"></div></div></div></div></div>'
	};
	var a = {
		install : function(I) {
			if (sys == "msa") {
				var K = '<tr><td data="0" class="on">智能</td><td data="1">幻灯片</td><td data="2">列表</td></tr><tr><td data="3">短链接</td><td data="4">文本</td><td data="5">标题</td></tr><tr><td data="7">翻页</td><td data="6">面包屑</td><td data="8">表单</td></tr>'
			} else {
				var K = '<tr><td data="0" class="on">智能</td><td data="1">幻灯片</td><td data="2">列表</td></tr><tr><td data="3">短链接</td><td data="4">文本</td><td data="5">标题</td></tr><tr><td data="7">翻页</td></tr>'
			}
			var J = '<tr><td data="2" class="on">列表</td><td data="1">幻灯片</td><td data="7">翻页</td></tr>';
			var H = '<div class="form_item"><span>名称</span><span><input type="text" id="content_title" value="内容块标题" /></span><div class="help_content"></div></div><div class="form_item"><span>地址</span><span><input type="text" id="content_link" value="内容块链接" /></span><div class="help_link"></div></div><div class="form_item"><span>效果</span><span class="signtype_control"><span class="sp_left"></span><span class="sp_right"></span></span></div>';
			if (markModel == 0) {
				I.append(this.set_cpt_code(K, H))
			} else {
				if (markModel == 1) {
					I.append(this.set_cpt_code(J, ""))
				}
			}
			this.init();
			if (markModel == 0) {
			} else {
				if (markModel == 1) {
					a.block_sign_type = 2;
					a.select_img
							.attr("src",
									"/static/webappservice/css/images/thor/medical_set_cpt/2.png")
				}
			}
		},
		isAllowAddBtn : 1,
		init : function() {
			this.set_tool = $("#set_cpt");
			this.zoom = $(".zoom");
			this.zoomin = $("#set_cpt .zoomin");
			this.zoomout = $("#set_cpt .zoomout");
			this.set_type_nav = $("#set_cpt .set_type_nav");
			this.set_type_content = $("#set_cpt .set_type_content");
			this.set_type = $("#set_cpt .set_type");
			this.set_info_nav = $("#set_cpt .set_info_nav");
			this.set_info_content = $("#set_cpt .set_info_content");
			this.back_btn = $("#set_cpt .back_btn");
			this.content_title = $("#content_title");
			this.content_link = $("#content_link");
			this.set_nav_add_btn = $(".set_info_nav .add_btn");
			this.set_content_add_btn = $(".set_info_content .add_btn");
			this.help_content = $("#set_cpt .help_content");
			this.help_link = $("#set_cpt .help_link");
			this.signtype_control = $("#set_cpt .signtype_control");
			this.sign_type = $("#set_cpt .sign_type");
			this.sign_type_select_btn = $("#set_cpt .sign_type td");
			this.select_img = $("#set_cpt .selectNo img");
			this.block_sign_type = 0
		},
		zoomin_process : function() {
			if (o.targetIndex < o.targetArray.length - 3) {
				o.targetIndex++
			}
			var H = o.targetArray[o.targetIndex];
			if (!i.isNullOrEmpty(H)) {
				B.clean();
				B.process(H, "add", null)
			}
		},
		zoomout_process : function() {
			if (o.targetIndex > 0) {
				o.targetIndex--
			}
			var H = o.targetArray[o.targetIndex];
			if (!i.isNullOrEmpty(H)) {
				B.clean();
				B.process(H, "add", null)
			}
		},
		after_install : function(J, K) {
			a.help_content.click(function() {
				helpIntro.showHelp({
							parentDiv : "html",
							num : 5,
							url : "/static/webappservice/images/helpIntro.html?"
									+ Date.parse(new Date())
						})
			});
			a.help_link.click(function() {
				helpIntro.showHelp({
							parentDiv : "html",
							num : 5,
							url : "/static/webappservice/images/helpIntro.html?"
									+ Date.parse(new Date())
						})
			});
			a.signtype_control.addClass("fold");
			a.sign_type.show();
			a.signtype_control.click(function() {
						if ($(".signtype_control").hasClass("unfold")) {
							a.sign_type.slideDown(100);
							a.signtype_control.removeClass("unfold");
							a.signtype_control.addClass("fold")
						} else {
							a.sign_type.slideUp(100);
							a.signtype_control.removeClass("fold");
							a.signtype_control.addClass("unfold")
						}
					});
			a.sign_type_select_btn.click(function() {
						a.sign_type_select_btn.removeClass("on");
						$(this).addClass("on");
						var M = $(this).attr("data");
						a.select_img.attr("src",
								"/static/webappservice/css/images/thor/medical_set_cpt/"
										+ M + ".png");
						a.block_sign_type = M
					});
			o.allowZoom = 1;
			a.zoomin.click(function() {
						a.zoomin_process()
					});
			a.zoomout.click(function() {
						a.zoomout_process()
					});
			a.content_title.focus(function() {
						if (a.content_title.val() == "内容块标题") {
							a.content_title.val("")
						}
						r.isAllowShortCut = 0
					});
			a.content_link.focus(function() {
						if (a.content_link.val() == "内容块链接") {
							a.content_link.val("")
						}
						r.isAllowShortCut = 0
					});
			a.content_title.blur(function() {
						if (a.content_title.val() == "") {
							a.content_title.val("内容块标题")
						}
						r.isAllowShortCut = 1
					});
			a.content_link.blur(function() {
						if (a.content_link.val() == "") {
							a.content_link.val("内容块链接")
						}
						r.isAllowShortCut = 1
					});
			a.set_content_add_btn.click(function() {
						if (a.isAllowAddBtn == 1) {
							if (t.find(".edit_fail").size() > 0) {
								$(".edit_fail").css({
											"background-color" : "#5C9FC0",
											"border-color" : "#fff",
											opacity : "0.3"
										})
							}
							var Q = a.content_title.val() == "内容块标题"
									? ""
									: a.content_title.val();
							var N = a.content_link.val() == "内容块链接"
									? ""
									: a.content_link.val();
							if (markModel == 1) {
								var O = "native_list"
							} else {
								var O = "wide_struct"
							}
							var P = {
								xpath : [x.getQuery(o.target)],
								type : "WIDE_BLOCK",
								title : Q,
								link : N,
								sign_type : a.block_sign_type
							};
							var M = new Date();
							z.updatedict_start_time = M.getTime();
							s.process(o.target, P, "click")
						}
					});
			if (J == "edit") {
				if (K.type === "NAV") {
					a.set_info_nav.css("display", "block")
				} else {
					if (K.type === "WIDE_BLOCK") {
						a.set_info_content.css("display", "block");
						var L = K.title == "" ? "内容块标题" : K.title;
						var I = K.link == "" ? "内容块链接" : K.link;
						var H = K.sign_type;
						a.content_title.val(L);
						a.content_link.val(I);
						$.each(a.sign_type_select_btn, function(O, N) {
									if ($(N).attr("data") == H) {
										a.sign_type_select_btn
												.removeClass("on");
										$(this).addClass("on");
										var M = H;
										a.select_img.attr("src",
												"/static/webappservice/css/images/thor/medical_set_cpt/"
														+ M + ".png");
										a.block_sign_type = M
									}
								})
					}
				}
				if (!i.isNullOrEmpty(K.group)) {
					a.zoom.css("display", "none")
				}
			}
		},
		position : function(K) {
			var L = $(K).offset().top;
			var J = $(K).offset().left;
			var Q = $(K).outerWidth();
			var M = $(K).outerHeight();
			var P = C.contents().height();
			var O = C.contents().width();
			var I = J + (Q - 294);
			var N = L + (M - 30);
			if (I < 0) {
				I = 10
			} else {
				if (I + 200 > O) {
					I = O - 210
				}
			}
			this.set_tool.css({
						left : I,
						top : N
					});
			c.scrollTop(N - 350);
			c.scrollLeft(I - 200);
			var H = $("#canvas_container").scrollTop();
			$("#canvas_container").scrollTop(H + 1);
			$("#canvas_container").scrollTop(H - 1)
		},
		set_cpt_code : function(I, H) {
			return '<div id="set_cpt"><div class="zoom"><div class="zoomin"></div><div class="zoomout"></div></div><div class="set"><div class="set_info_content"><div class="set_type_body"><div class="content_form">'
					+ H
					+ '<div class="sign_type"><div class="select"><table>'
					+ I
					+ '</table></div><div class="demo selectNo"><img src="/static/webappservice/css/images/thor/medical_set_cpt/0.png" /></div></div></div><div class="add_btn"></div></div></div></div></div>'
		}
	};
	var q = {
		num : 10,
		historyIndex : 0,
		historyArray : [],
		saveAction : function(K, H) {
			if (K == "block") {
				var M = $(".addBlockHighlight,.edit_hidden");
				if (i.isNullOrEmpty(p.cpt_data)) {
					var J = p.cptInitData
				} else {
					var J = p.cpt_data
				}
				var L = {
					block : [],
					cpt : J
				};
				if (!i.isNullOrEmpty(M)) {
					$.each(M, function(Q, O) {
								var N = s.blockDataCache.read($(O));
								var P = {
									target : N.target,
									info : N.info
								};
								L.block.push(P)
							})
				}
			} else {
				if (K == "cpt") {
					if (i.isNullOrEmpty(p.cpt_data)) {
						var J = p.cptInitData
					} else {
						var J = p.cpt_data
					}
					var L = {
						cpt : J,
						moredata : H
					}
				}
			}
			var I = {
				action : K,
				oneAction : L
			};
			this.historyArray.push(I);
			if (this.historyArray.length > this.num) {
				this.historyArray.splice(0, 1)
			}
		},
		delOneAction : function() {
			this.historyArray.splice(-1, 1)
		},
		doAction : function() {
			var J = this.historyArray.length;
			this.historyIndex = J - 1;
			if (this.historyIndex >= 0) {
				var H = this.historyArray[this.historyIndex];
				if (H.action == "block") {
					if (!i.isNullOrEmpty(H.oneAction.cpt)) {
						p.updateCpt(H.oneAction.cpt, "historyBlock")
					}
					this.blockLoad(H.oneAction.block)
				} else {
					if (H.action == "cpt") {
						p.tipsHighlight.clean();
						p.tipsHighlight.loading.install();
						p.updateCpt(H.oneAction.cpt, "historyCpt");
						if (!i.isNullOrEmpty(H.oneAction.moredata)) {
							var I = $("#blockId" + H.oneAction.moredata.blockId);
							s.blockDataCache.save(I, H.oneAction.moredata)
						}
					}
				}
			}
			this.delOneAction()
		},
		blockLoad : function(H) {
			if (!i.isNullOrEmpty(H)) {
				s.delAll();
				$.each(H, function(J, I) {
							s.process(I.target, I.info, "historyblockLoad")
						});
				p.preview(null, "historyblockLoad")
			}
		}
	};
	var d = {
		init : function(H) {
			$.ajax({
				url : edit_tpl_url,
				timeout : 8000,
				type : "POST",
				dataType : "json",
				data : {
					action : "loadTpl",
					isNew : H,
					markModel : markModel
				},
				success : function(J) {
					if (i.isNullOrEmpty(J)) {
						f.pcLoadTips.clean();
						p.tipsHighlight.init("blockempty")
					} else {
						var I = [];
						$.each(J.info, function(R, O) {
									var P = !i.isNullOrEmpty(O.title)
											? O.title
											: "";
									var N = !i.isNullOrEmpty(O.link)
											? O.link
											: "";
									var M = !i.isNullOrEmpty(O.sign_type)
											? O.sign_type
											: 0;
									var K = !i.isNullOrEmpty(O.cpt_id)
											? O.cpt_id
											: 0;
									l.ctpMax = Math.max(K, l.ctpMax);
									if (O.xpath.length == 1) {
										var L = x.xpathParser(O.xpath[0]);
										$.each(L, function(U, T) {
													if ($(I).index(T) == -1) {
														I.push(T);
														if (!i.isNullOrEmpty(T)) {
															var S = {
																xpath : O.xpath,
																type : O.type,
																title : P,
																link : N,
																sign_type : M,
																gid : R
															};
															s.process(T, S,
																	"autoLoad")
														}
													}
												})
									} else {
										if (O.xpath.length > 1) {
											var Q = [];
											$.each(O.xpath, function(W, T) {
														var S = x
																.xpathParser(T);
														var V = S[0];
														if (!i.isNullOrEmpty(V)) {
															var U = x
																	.getQuery(V);
															Q.push(U)
														}
													});
											$.each(O.xpath, function(X, T) {
														var S = x
																.xpathParser(T);
														var W = S[0];
														if ($(I).index(W) == -1) {
															I.push(W);
															if (!i
																	.isNullOrEmpty(W)) {
																var U = x
																		.getQuery(W);
																var V = {
																	xpath : O.xpath,
																	type : O.type,
																	title : P,
																	link : N,
																	sign_type : M,
																	gid : R
																};
																s
																		.process(
																				W,
																				V,
																				"autoLoad")
															}
														}
													})
										}
									}
								});
						f.pcLoadTips.clean();
						p.preview(null, "loadTpl", H)
					}
				},
				complete : function() {
				}
			})
		}
	};
	var e = {
		init : function() {
			$.ajax({
				url : edit_tpl_url,
				timeout : 8000,
				type : "POST",
				dataType : "json",
				data : {
					action : "autoLoadMark",
					markModel : markModel
				},
				success : function(I) {
					if (i.isNullOrEmpty(I)) {
					} else {
						q.saveAction("block");
						s.delAll();
						var H = [];
						$.each(I.info, function(N, L) {
							if (N <= 50) {
								if (L.xpath.length == 1) {
									var K = x.xpathParser(L.xpath[0]);
									var J = l.getCptId();
									$.each(K, function(R, Q) {
												if ($(H).index(Q) == -1) {
													H.push(Q);
													if (!i.isNullOrEmpty(Q)) {
														var O = x.getQuery(Q);
														var P = {
															xpath : [O],
															type : L.type,
															sign_type : 9
														};
														s.process(Q, P,
																"autoLoad")
													}
												}
											})
								} else {
									if (L.xpath.length > 1) {
										var M = [];
										$.each(L.xpath, function(S, P) {
													var O = x.xpathParser(P);
													var R = O[0];
													if (!i.isNullOrEmpty(R)) {
														var Q = x.getQuery(R);
														M.push(Q)
													}
												});
										var J = l.getCptId();
										$.each(L.xpath, function(T, P) {
													var O = x.xpathParser(P);
													var S = O[0];
													if ($(H).index(S) == -1) {
														H.push(S);
														if (!i.isNullOrEmpty(S)) {
															var Q = x
																	.getQuery(S);
															var R = {
																xpath : M,
																type : L.type,
																sign_type : 9,
																gid : N
															};
															s.process(S, R,
																	"autoLoad")
														}
													}
												})
									}
								}
							}
						});
						f.pcLoadTips.clean();
						p.preview(null, "autoLoad")
					}
				},
				complete : function() {
				}
			})
		}
	};
	var p = {
		del_state : 0,
		cpt_data : [],
		cptInitData : [],
		globalNav : [],
		newblockArr : [],
		receiveTime : 0,
		sendData : function(I, H) {
			document.getElementById(H).contentWindow.postMessage(I, "*")
		},
		receiveData : function() {
			window.addEventListener("message", function(L) {
				var H = L.data;
				if (i.isNullOrEmpty(H)) {
					p.tipsHighlight.init("blockempty");
					B.isAllowclick = 1;
					B.containerAllowclick = 1;
					if (!i.isNullOrEmpty(s.newBlock)) {
						E.clean();
						s.newBlock.remove();
						B.clean();
						o.cleanIndex()
					}
				} else {
					var K = H.action;
					var J = H.data;
					switch (K) {
						case "sendXpath" :
							p.receiveTime = parseInt(J.time_stamp);
							p.globalNav = J.globalNav;
							var I = J.xpath;
							p.cptInitData = J.cpt;
							p.cpt_data = J.cpt;
							I.push(J.mainNavXpath);
							I.push(J.navXpath);
							var M = $(".addBlockHighlight");
							if (M.length > 0) {
								p.checkAddBlock(I, p.receiveTime)
							} else {
								p.tipsHighlight.clean();
								p.tipsHighlight.init("blockempty")
							}
							if (!i
									.isNullOrEmpty(p.tipsHighlight.setBlock.fullScreenEditXpth)) {
								var N = p.tipsHighlight.setBlock.fullScreenEditXpth[0];
								if (k.isOpen == 1) {
									p.findBlock(N[0])
								}
							}
							if (G.edit_state == 1) {
								p.tipsHighlight.editSuccess.install();
								p.tipsHighlight.editSuccess.tips_edit_success
										.show(500);
								setTimeout(function() {
									p.tipsHighlight.editSuccess.tips_edit_success
											.hide(500, function() {
												p.tipsHighlight.editSuccess.tips_edit_success
														.remove()
											})
								}, 2000);
								G.edit_state = 0
							}
							if (p.del_state == 1) {
								p.tipsHighlight.delSuccess.install();
								$("#tips_del_success").show(500);
								setTimeout(function() {
											$("#tips_del_success").hide(500,
													function() {
														$("#tips_del_success")
																.remove()
													})
										}, 2000);
								p.del_state = 0
							}
							break;
						case "sendCpt" :
							q.saveAction("cpt");
							p.updateCpt(J);
							break;
						case "blockFound" :
							if (k.isOpen == 1) {
								p.tipsHighlight.init("findBlock", J)
							}
							break;
						case "setBlock" :
							p.tipsHighlight.init("setBlock", J);
							break
					}
				}
			}, false)
		},
		showForm : function(I, H) {
			var J = {
				action : "showForm",
				data : {
					form : I
				}
			};
			this.sendData(J, H)
		},
		findBlock : function(I, K, H) {
			var J = {
				action : "findBlock",
				data : {
					xpath : I
				}
			};
			if (k.isOpen == 1) {
				this.sendData(J, "fs_preview_box")
			} else {
				this.sendData(J, "preview_box")
			}
			if (K == 1) {
				p.tipsHighlight.addSuccess.install(H);
				p.tipsHighlight.addSuccess.tips_add_success.show(500);
				setTimeout(function() {
							p.tipsHighlight.addSuccess.tips_add_success
									.hide(500)
						}, 2000)
			}
		},
		action : "",
		newblock : null,
		updateCpt : function(H, I) {
			$.ajax({
						url : edit_tpl_url,
						type : "POST",
						dataType : "json",
						data : {
							action : "updateCpt",
							info : H,
							markModel : markModel
						},
						beforeSend : function() {
						},
						success : function() {
							if (I == "historyCpt") {
								if (k.isOpen == 1) {
									var J = $("#fs_preview_box").attr("data");
									$("#fs_preview_box").attr("src", J);
									k.view_change_clean()
								} else {
									var J = $("#preview_box").attr("data");
									$("#preview_box").attr("src", J);
									A.view_change_clean()
								}
							}
							p.cpt_data = H
						}
					})
		},
		preview : function(J, K, I) {
			p.tipsHighlight.clean();
			p.tipsHighlight.loading.install();
			this.action = K;
			this.newblock = J;
			var M = $(".addBlockHighlight");
			var L = [];
			var H = [];
			if (!i.isNullOrEmpty(M)) {
				$.each(M, function(P, O) {
							var N = s.blockDataCache.read($(O));
							if (N.info.gid != undefined) {
								if ($.inArray(N.info.gid, H) == -1) {
									H.push(N.info.gid);
									L.push(N.info)
								}
							} else {
								L.push(N.info)
							}
						})
			}
			$.ajax({
						url : edit_tpl_url,
						type : "POST",
						dataType : "json",
						data : {
							action : "preview",
							info : L,
							isNew : I,
							isForbidJs : g.isForbidJs,
							markModel : markModel
						},
						beforeSend : function() {
						},
						success : function(S) {
							if (K == "click") {
								var R = new Date();
								z.loadmark_start_time = R.getTime();
								z.updatedict_end_time = R.getTime();
								z.updatedict_time = z.updatedict_end_time
										- z.updatedict_start_time
							}
							p.newblockArr = $(".addBlockHighlight");
							var U = p.newblock;
							if (U != null) {
								var R = new Date();
								var Q = R.getTime();
								U.attr("data-receive", Q)
							} else {
								var R = new Date();
								var Q = R.getTime()
							}
							if (K != "del_fail") {
								if (k.isOpen == 1) {
									var P = $("#fs_preview_box").attr("data")
											.split("&");
									var N = P[P.length - 1];
									var O = "time_stamp=" + Q;
									P.splice(P.length - 1, 1);
									P.push(O);
									P.push(N);
									var T = P.join("&");
									$("#fs_preview_box").attr("src", T);
									k.view_change_clean()
								} else {
									var P = $("#preview_box").attr("data")
											.split("&");
									var N = P[P.length - 1];
									var O = "time_stamp=" + Q;
									P.splice(P.length - 1, 1);
									P.push(O);
									P.push(N);
									var T = P.join("&");
									$("#preview_box").attr("src", T);
									A.view_change_clean()
								}
							}
						}
					})
		},
		save : function() {
			var J = $(".addBlockHighlight");
			var I = [];
			var H = [];
			if (!i.isNullOrEmpty(J)) {
				$.each(J, function(M, L) {
							var K = s.blockDataCache.read($(L));
							if (K.info.gid != undefined) {
								if ($.inArray(K.info.gid, H) == -1) {
									H.push(K.info.gid);
									I.push(K.info)
								}
							} else {
								I.push(K.info)
							}
						})
			}
			$.ajax({
						url : edit_tpl_url,
						type : "POST",
						dataType : "json",
						data : {
							action : "save",
							info : I,
							isHome : isHome,
							isCreateGuide : isCreateGuide,
							isForbidJs : g.isForbidJs,
							markModel : markModel
						},
						beforeSend : function() {
						},
						success : function(K) {
							$.ajax({
										url : report_apply_action_url,
										type : "get",
										timeout : 1000
									});
							window.isunload = 1;
							if (from_report != 0) {
								window.location.href = report_url
							} else {
								window.location.href = saveback
							}
						}
					})
		},
		checkAddBlock : function(K, I) {
			var L = p.newblockArr;
			var J = p.action;
			var H = [];
			if (J == "click") {
				$.each(L, function(N, O) {
					var P = s.blockDataCache.read($(O));
					if (parseInt($(O).attr("data-receive")) <= I
							&& P.info.sign_type.toString() != "9") {
						var M = 0;
						if (!i.isNullOrEmpty(K)) {
							$.each(K, function(R, Q) {
										if (!i.isNullOrEmpty(Q)
												&& !i.isNullOrEmpty(Q.xpath)) {
											switch (P.info.sign_type.toString()) {
												case "0" :
													sign_type_value = "SIGNAREA";
													break;
												case "1" :
													sign_type_value = "CAROUSEL";
													break;
												case "2" :
													sign_type_value = "LIST";
													break;
												case "3" :
													sign_type_value = "SHORTLINK";
													break;
												case "4" :
													sign_type_value = "NORMAL";
													break;
												case "5" :
													sign_type_value = "TITLE";
													break;
												case "6" :
													sign_type_value = "MYPOS";
													break;
												case "7" :
													sign_type_value = "PAGETURNING";
													break;
												case "8" :
													sign_type_value = "NORMAL";
													break;
												default :
													sign_type_value = "SIGNAREA";
													break
											}
											if ($.inArray(P.info.xpath
															.toString(),
													Q.xpath) == -1) {
												M = 0
											} else {
												if (sign_type_value == Q.sign_type) {
													M = 1
												} else {
													M = 2
												}
												return false
											}
										} else {
											M = 0
										}
									})
						} else {
							M = 0
						}
						if (M == 1 || (M == 2 && markModel == 0)) {
							p.tipsHighlight.clean();
							s.addSuccess($(O), J, M)
						} else {
							p.tipsHighlight.clean();
							s.addFail($(O), J);
							H.push($(O))
						}
					}
				});
				if (H.length > 0) {
					$.each(H, function(O, M) {
								var N = s.blockDataCache.read($(M));
								$(M).addClass("redBlockFail");
								$(M).removeClass("addBlockHighlight");
								$(M).css({
											"background-color" : "#ff0000",
											opacity : "0.7",
											"border-color" : "#524d4d"
										});
								s.blockDataCache.save($(M), N);
								s.after_fail_add($(M))
							});
					p.preview(null, "del_fail");
					p.tipsHighlight.init("addFail")
				}
			} else {
				p.tipsHighlight.clean()
			}
		},
		saveCptInfo : function(H) {
			$.ajax({
						url : edit_tpl_url,
						type : "POST",
						dataType : "json",
						data : {
							action : "saveCptInfo",
							markModel : markModel,
							info : H
						},
						beforeSend : function() {
						},
						success : function(I) {
							p.tipsHighlight.loading.install();
							var J = $("#fs_preview_box").attr("data");
							$("#fs_preview_box").attr("src", J)
						}
					})
		},
		tipsHighlight : {
			init : function(I, H) {
				this.clean();
				switch (I) {
					case "addFail" :
						this.addFail.install();
						break;
					case "findBlock" :
						this.findBlock.install(H);
						break;
					case "setBlock" :
						this.setBlock.install(H);
						break;
					case "blockempty" :
						this.blockempty.install();
						break;
					case "loading" :
						p.tipsHighlight.loading.install();
						break
				}
			},
			loading : {
				init : function() {
					this.simi_phone_tips_cover = $("#simi_phone_tips_cover");
					this.tips_simi_phone_loading = $(".tips_simi_phone_loading")
				},
				install : function() {
					if (k.isOpen == 1) {
						k.fs_simi_phone
								.append('<div id="simi_phone_tips_cover"></div>');
						k.fs_simi_phone.append(this.code);
						var I = 330;
						var H = 828;
						var K = 0;
						var J = 0
					} else {
						n.append('<div id="simi_phone_tips_cover"></div>');
						n.append(this.code);
						var I = 270;
						var H = 462;
						var K = 31;
						var J = 17
					}
					this.init();
					this.simi_phone_tips_cover.css({
						"background-color" : "#8e8f90",
						"background-image" : 'url("./images/thor/container_cpt/left_background.png")',
						"background-size" : "auto",
						position : "absolute",
						top : K,
						left : J,
						width : I,
						height : H
					})
				},
				code : '<div class="tips_simi_phone_loading"><div class="tips_loading_title">加载中...</div></div>'
			},
			blockempty : {
				init : function() {
					this.simi_phone_tips_cover = $("#simi_phone_tips_cover");
					this.tips_simi_phone_init = $(".tips_simi_phone_init")
				},
				install : function() {
					if (k.isOpen == 1) {
						k.fs_simi_phone
								.append('<div id="simi_phone_tips_cover"></div>');
						k.fs_simi_phone.append(this.code);
						var I = 330;
						var H = 828;
						var K = 0;
						var J = 0
					} else {
						n.append('<div id="simi_phone_tips_cover"></div>');
						n.append(this.code);
						var I = 270;
						var H = 462;
						var K = 31;
						var J = 17
					}
					this.init();
					this.simi_phone_tips_cover.css({
								"background-color" : "#5a95d1",
								position : "absolute",
								top : K,
								left : J,
								width : I,
								height : H
							})
				},
				code : '<div class="tips_simi_phone_init"><div class="tips_init_title">请添加PC页面模块到手机端</div></div>'
			},
			setBlock : {
				init : function() {
					this.edit_cpt_btn = $("#edit_cpt_btn");
					this.edit_btn = $("#edit_cpt_btn .edit_btn");
					this.del_btn = $("#edit_cpt_btn .del_btn");
					this.simi_phone_tips_cover = $("#simi_phone_tips_cover");
					this.fullScreenEditXpth = []
				},
				code : '<div id="edit_cpt_btn"><div class="edit_cpt_arrow"></div><div class="content"><div class="edit_btn"></div><div class="del_btn"></div></div></div>',
				install : function(I) {
					var L = (I.top - I.scrollTop) + 31;
					if (I.height + L > 462) {
						var H = 462 - L
					} else {
						var H = I.height
					}
					if (k.isOpen == 1) {
						k.fs_simi_phone.append(this.code);
						var J = 330;
						var K = 0
					} else {
						n.append(this.code);
						var J = 270;
						var K = 17
					}
					this.init();
					if (k.isOpen == 1) {
						this.edit_cpt_btn.css({
									top : L + 60,
									left : "-121px"
								})
					} else {
						this.edit_cpt_btn.css({
									top : L + 60,
									right : "10px"
								})
					}
					this.after_install(I.xpath, {
								top : L
							})
				},
				after_install : function(I, H) {
					var K = $(".addBlockHighlight");
					var J = null;
					$.each(K, function(N, M) {
								var L = s.blockDataCache.read($(M));
								if (L.info.xpath.toString() == I.toString()) {
									J = L;
									return false
								}
							});
					if (k.isOpen != 1) {
						E.process(J)
					}
					this.edit_btn.click(function() {
								if (k.isOpen == 1) {
									p.tipsHighlight.setBlock.edit_cpt_btn
											.remove();
									G.install(k.fs_simi_phone, H, J)
								} else {
									k.open();
									p.tipsHighlight.setBlock.fullScreenEditXpth = I
								}
							});
					this.del_btn.click(function() {
								q.saveAction("block");
								$("#blockId" + J.blockId).remove();
								var M = $(".addBlockHighlight");
								var L = [];
								$.each(M, function(P, O) {
											var N = s.blockDataCache.read($(O));
											if (N.info.gid != undefined) {
												if (N.info.gid == J.info.gid) {
													$("#blockId" + N.blockId)
															.remove()
												}
											}
										});
								p.tipsHighlight.clean();
								if (!i.isNullOrEmpty(G.edit_cpt)) {
									G.edit_cpt.remove()
								}
								E.clean();
								p.preview(null, "del");
								p.del_state = 1
							});
					B.isAllowclick = 0;
					h.isAllowTrace = 0
				}
			},
			findBlock : {
				init : function() {
					this.simi_phone_tips_cover = $("#simi_phone_tips_cover")
				},
				install : function(H) {
					var K = $(".addBlockHighlight");
					var I = null;
					$.each(K, function(N, M) {
								var L = s.blockDataCache.read($(M));
								if (L.info.xpath.toString() == H.xpath
										.toString()) {
									I = L;
									return false
								}
							});
					var J = (H.top - H.scrollTop) + 31;
					if (k.isOpen == 1) {
						G.install(k.fs_simi_phone, {
									top : J
								}, I)
					}
					this.after_install()
				},
				after_install : function() {
					B.isAllowclick = 0;
					h.isAllowTrace = 0
				}
			},
			addFail : {
				init : function() {
					this.tips_head_cancel = $("#tips_fail .tips_head_cancel");
					this.tips_fail = $("#tips_fail");
					this.simi_phone_tips_cover = $("#simi_phone_tips_cover")
				},
				code : '<div id="tips_fail"><div class="tips_head"><div class="tips_head_icon"></div><div class="tips_head_title">内容添加失败！</div><div class="tips_head_cancel"></div></div><div class="tips_body">红色块为添加失败块，请核对！</div></div>',
				install : function() {
					n.append('<div id="simi_phone_tips_cover"></div>');
					n.append(this.code);
					this.init();
					this.simi_phone_tips_cover.css({
								"background-color" : "#ff0",
								opacity : 0.5,
								position : "absolute",
								top : "31px",
								left : "17px",
								width : "270px",
								height : "462px"
							});
					this.after_install()
				},
				after_install : function() {
					this.tips_head_cancel.click(function() {
								p.tipsHighlight.clean()
							})
				}
			},
			addSuccess : {
				init : function() {
					this.tips_add_success = $("#tips_add_success")
				},
				code_1 : '<div id="tips_add_success" class="tips_success"><div class="tips_success_icon"></div><div class="tips_success_title">添加成功！</div></div>',
				code_2 : '<div id="tips_add_success" class="tips_success"><div class="tips_success_icon"></div><div class="tips_success_title">已智能识别成功！</div></div>',
				install : function(H) {
					n.append('<div id="simi_phone_tips_cover"></div>');
					if (H == 2) {
						n.append(this.code_2)
					} else {
						n.append(this.code_1)
					}
					this.init()
				}
			},
			editSuccess : {
				init : function() {
					this.tips_edit_success = $("#tips_edit_success")
				},
				code : '<div id="tips_edit_success" class="tips_success"><div class="tips_success_icon"></div><div class="tips_success_title">修改成功！</div></div>',
				install : function() {
					if (k.isOpen == 1) {
						k.fs_simi_phone
								.append('<div id="simi_phone_tips_cover"></div>');
						k.fs_simi_phone.append(this.code)
					} else {
						n.append('<div id="simi_phone_tips_cover"></div>');
						n.append(this.code)
					}
					this.init()
				}
			},
			delSuccess : {
				init : function() {
					this.tips_del_success = $("#tips_del_success")
				},
				code : '<div id="tips_del_success" class="tips_success"><div class="tips_success_icon"></div><div class="tips_success_title">删除成功！</div></div>',
				install : function() {
					if (k.isOpen == 1) {
						k.fs_simi_phone
								.append('<div id="simi_phone_tips_cover"></div>');
						k.fs_simi_phone.append(this.code)
					} else {
						n.append('<div id="simi_phone_tips_cover"></div>');
						n.append(this.code)
					}
					this.init()
				}
			},
			clean : function() {
				if (!i.isNullOrEmpty(p.tipsHighlight.addFail.tips_fail)) {
					p.tipsHighlight.addFail.tips_fail.remove();
					p.tipsHighlight.addFail.simi_phone_tips_cover.remove()
				}
				if (!i
						.isNullOrEmpty(p.tipsHighlight.findBlock.simi_phone_tips_cover)) {
					p.tipsHighlight.findBlock.simi_phone_tips_cover.remove()
				}
				if (!i.isNullOrEmpty(p.tipsHighlight.setBlock.edit_cpt_btn)) {
					p.tipsHighlight.setBlock.edit_cpt_btn.remove();
					p.tipsHighlight.setBlock.simi_phone_tips_cover.remove()
				}
				if (!i
						.isNullOrEmpty(p.tipsHighlight.blockempty.tips_simi_phone_init)) {
					p.tipsHighlight.blockempty.tips_simi_phone_init.remove();
					p.tipsHighlight.blockempty.simi_phone_tips_cover.remove()
				}
				if (!i
						.isNullOrEmpty(p.tipsHighlight.loading.tips_simi_phone_loading)) {
					p.tipsHighlight.loading.tips_simi_phone_loading.remove();
					p.tipsHighlight.loading.simi_phone_tips_cover.remove()
				}
				if (!i
						.isNullOrEmpty(p.tipsHighlight.setBlock.simi_phone_tips_cover)) {
					p.tipsHighlight.setBlock.simi_phone_tips_cover.remove()
				}
				if (!i.isNullOrEmpty(p.tipsHighlight.setBlock.edit_cpt_btn)) {
					p.tipsHighlight.setBlock.edit_cpt_btn.remove()
				}
				if (!i.isNullOrEmpty(G.edit_cpt)) {
					G.edit_cpt.remove()
				}
			}
		}
	};
	var A = {
		chgModulPrt : '<div class="modulPrompt_cover"><div class="modulPrompt"><span class="promicon"></span><p>更改"内容展现"会导致已标注的组件失效，确定切换？</p><div class="Pbutton"><button>确定</button><button class="cancel">取消</button></div></div></div>',
		init : function() {
			this.auto_mark = $(".auto_mark");
			this.last_step = $(".last_step");
			this.need_help = $(".need_help");
			this.unfold = $(".view_change .unfold");
			this.fold = $(".view_change .fold");
			this.fullsceen_btn = $(".fullsceen_btn");
			this.next_btn = $(".next_btn");
			this.last_btn = $(".last_btn");
			this.all_clean_btn = $(".all_clean");
			this.meta_info_option = $(".meta_info_option input");
			this.meta_info_option_thumbnail = $(".meta_info_option .thumbnail");
			this.meta_info_option_summary = $(".meta_info_option .summary");
			this.all_clean();
			this.autoLoad();
			this.historyAction();
			this.doHelp();
			this.view_change();
			this.fullScreen();
			this.next_step();
			this.allowJs();
			this.meta_info_option_control();
			if (!i.isNullOrEmpty(y.get(0))) {
				this.nativeMarkControl()
			}
		},
		next_step : function() {
			A.next_btn.click(function() {
						p.save()
					});
			A.last_btn.click(function() {
						window.location.href = last_step_url
					})
		},
		autoLoad : function() {
			A.auto_mark.hover(function() {
						A.auto_mark.toggleClass("on")
					});
			A.auto_mark.click(function() {
						f.pcLoadTips.show();
						e.init()
					})
		},
		all_clean : function() {
			A.all_clean_btn.hover(function() {
						A.all_clean_btn.toggleClass("on")
					});
			A.all_clean_btn.click(function() {
						q.saveAction("block");
						$(".addBlockHighlight").remove();
						$(".redBlockFail").remove();
						$(".edit_hidden").remove();
						$(".infoblock").remove();
						$(".selectHighlight").remove();
						$("#set_cpt").remove();
						p.preview(null, "del")
					})
		},
		historyAction : function() {
			A.last_step.hover(function() {
						A.last_step.toggleClass("on")
					});
			A.last_step.click(function() {
						q.doAction()
					})
		},
		doHelp : function() {
			A.need_help.hover(function() {
						A.need_help.toggleClass("on")
					});
			A.need_help.click(function() {
				helpIntro.showHelp({
							parentDiv : "html",
							num : 0,
							url : "/static/webappservice/images/helpIntro.html?"
									+ Date.parse(new Date())
						})
			})
		},
		view_change : function() {
			A.unfold.click(function() {
						if (!A.unfold.hasClass("on")) {
							A.unfold.toggleClass("on");
							A.fold.toggleClass("on");
							p.showForm("unfold", "preview_box")
						}
					});
			A.fold.click(function() {
						if (!A.fold.hasClass("on")) {
							A.fold.toggleClass("on");
							A.unfold.toggleClass("on");
							p.showForm("fold", "preview_box")
						}
					})
		},
		view_change_clean : function() {
			A.unfold.addClass("on");
			A.fold.removeClass("on")
		},
		fullScreen : function() {
			A.fullsceen_btn.click(function() {
						k.open()
					})
		},
		allowJs : function() {
			u.change(function() {
						if (u.attr("checked") == "checked") {
							g.isForbidJs = 0;
							window.isunload = 0;
							var H = i.setUrlParam("isForbidJs", 0, C
											.attr("src"))
						} else {
							g.isForbidJs = 1;
							window.isunload = 1;
							var H = i.setUrlParam("isForbidJs", 1, C
											.attr("src"))
						}
						g.init();
						s.delAll();
						p.tipsHighlight.clean();
						g.clean();
						C.attr("src", H);
						f.init()
					})
		},
		meta_info_option_control : function() {
			A.meta_info_option.change(function() {
						if (A.meta_info_option_thumbnail.attr("checked") == "checked") {
							var H = 1
						} else {
							var H = 0
						}
						if (A.meta_info_option_summary.attr("checked") == "checked") {
							var J = 1
						} else {
							var J = 0
						}
						var I = {
							is_thumbnail : H,
							is_summary : J
						};
						$.ajax({
									url : edit_tpl_url,
									type : "POST",
									dataType : "json",
									data : {
										action : "saveMetaInfo",
										meta_info : I
									},
									success : function() {
										p.tipsHighlight.loading.install();
										var K = $("#preview_box").attr("data");
										$("#preview_box").attr("src", K);
										A.view_change_clean()
									}
								})
					})
		},
		nativeMarkControl : function() {
			var H = y.get(0).selectedIndex;
			y.change(function() {
				$("body").append(A.chgModulPrt);
				$(".modulPrompt .Pbutton button").eq(0).click(function() {
					if (y.val() == 0) {
						markModel = 0;
						if ($(".right_bar").find(".auto_mark").size() == 0) {
							$(".all_clean")
									.before('<div class="auto_mark item">自动生成</div>');
							A.auto_mark = $(".auto_mark");
							A.autoLoad()
						}
						$(".fullscreen_info").css("display", "block");
						$(".view_change").css("display", "block");
						$(".auto_mark").css("display", "block")
					} else {
						markModel = 1;
						$(".fullscreen_info").css("display", "none");
						$(".view_change").css("display", "none");
						$(".auto_mark").css("display", "none")
					}
					$(".traceHighlight,.selectHighlight").remove();
					o.del();
					s.delAll();
					$(".modulPrompt_cover").remove();
					p.tipsHighlight.init("blockempty");
					B.isAllowclick = 1;
					B.containerAllowclick = 1
				});
				$(".modulPrompt .Pbutton button").eq(1).click(function() {
							$(".modulPrompt_cover").remove();
							y.get(0).selectedIndex = H
						})
			})
		}
	};
	var r = {
		isAllowShortCut : 1,
		init : function() {
			this.zoom($(document));
			this.zoom($("#thor_aim").contents());
			this.fs_close()
		},
		zoom : function(H) {
			H.keydown(function(I) {
						if (r.isAllowShortCut == 1) {
							if (I.keyCode == 69) {
								$("#set_cpt .zoomout").trigger("click")
							}
							if (I.keyCode == 81) {
								$("#set_cpt .zoomin").trigger("click")
							}
						}
					})
		},
		fs_close : function() {
			$(document).keydown(function(H) {
						if (H.keyCode == 27) {
							$(".fs_close").trigger("click")
						}
					})
		}
	};
	var k = {
		isOpen : 0,
		init : function() {
			this.fs_cover = $("#fs_cover");
			this.fs_simi_phone = $(".fs_simi_phone");
			this.fs_preview_box = $("#fs_preview_box");
			this.fs_last_step = $(".fs_last_step");
			this.fs_view_change_fold = $(".fs_view_change .fold");
			this.fs_view_change_unfold = $(".fs_view_change .unfold");
			this.fs_need_help = $(".fs_need_help");
			this.fs_close = $(".fs_close")
		},
		open : function() {
			this.install();
			k.isOpen = 1;
			p.tipsHighlight.loading.install();
			var H = $("#fs_preview_box").attr("data");
			$("#fs_preview_box").attr("src", H)
		},
		install : function() {
			$(".traceHighlight,.selectHighlight").remove();
			o.del();
			$("body").append(this.code);
			this.init();
			var H = window.screen.availWidth;
			this.fs_cover.css({
						position : "absolute",
						top : 0,
						left : 0,
						width : "100%",
						height : 898,
						background : "#000",
						opacity : 0.9,
						"z-index" : 9501
					});
			this.fs_simi_phone.css({
						background : "#979797",
						position : "absolute",
						top : "58px",
						left : "39%",
						width : 330,
						height : 828,
						"z-index" : 9502
					});
			this.fs_preview_box.css({
						width : 330,
						height : 828
					});
			this.after_install()
		},
		after_install : function() {
			k.fs_close.click(function() {
						k.fs_cover.remove();
						k.fs_simi_phone.remove();
						k.isOpen = 0;
						p.tipsHighlight.loading.install();
						var H = $("#preview_box").attr("data");
						$("#preview_box").attr("src", H);
						A.view_change_clean();
						k.view_change_clean()
					});
			k.fs_view_change_unfold.click(function() {
						if (!k.fs_view_change_unfold.hasClass("on")) {
							k.fs_view_change_unfold.toggleClass("on");
							k.fs_view_change_fold.toggleClass("on");
							p.showForm("unfold", "fs_preview_box")
						}
					});
			k.fs_view_change_fold.click(function() {
						if (!k.fs_view_change_fold.hasClass("on")) {
							k.fs_view_change_fold.toggleClass("on");
							k.fs_view_change_unfold.toggleClass("on");
							p.showForm("fold", "fs_preview_box")
						}
					});
			k.fs_last_step.click(function() {
						q.doAction()
					});
			k.fs_need_help.click(function() {
				helpIntro.showHelp({
							parentDiv : "html",
							num : 4,
							url : "/static/webappservice/images/helpIntro.html?"
									+ Date.parse(new Date())
						})
			});
			k.fs_cover.click(function() {
						p.tipsHighlight.clean()
					})
		},
		view_change_clean : function() {
			k.fs_view_change_unfold.addClass("on");
			k.fs_view_change_fold.removeClass("on")
		},
		code : '<div id="fs_cover"><div id="fs_toolbar"><div class="fs_last_step">撤销操作</div><div class="fs_view_change"><div class="unfold on">内容块模式</div><div class="fold">标题模式</div></div><div class="fs_need_help">需要帮助？</div><div class="fs_close"></div></div></div><div class="fs_simi_phone"><iframe src="" data="'
				+ preview_url + '" id="fs_preview_box"></iframe></div>'
	};
	var g = {
		isForbidJs : isForbidJs,
		init : function() {
			this.tips_reload = $("#tips_reload");
			this.reload_btn = $("#tips_reload .reload_btn");
			this.forbidJs = $("#forbidJs")
		},
		reload : function() {
			if (this.forbidJs.attr("checked") == "checked") {
				u.attr("checked", false);
				g.isForbidJs = 1;
				var H = i.setUrlParam("isForbidJs", 1, C.attr("src"))
			} else {
				u.attr("checked", true);
				g.isForbidJs = 0;
				var H = i.setUrlParam("isForbidJs", 0, C.attr("src"))
			}
			g.clean();
			C.attr("src", H);
			f.init()
		},
		show : function() {
			$(".tips_thor_aim_loading").remove();
			v.append(this.code);
			this.init();
			this.reload_btn.click(function() {
						g.reload()
					})
		},
		code : '<div id="tips_reload"><div class="tips_head"><div class="tips_head_icon"></div><div class="tips_head_title">PC页面加载失败!</div></div><div class="tips_body"><div class="">原因可能是</div><div class="">·包含不能被加载的JS脚本<br>·网速太慢</div><div class="mvt8px"><div class="left reload_btn"></div><div class="left mvl8px"><input type="checkbox" value="1" checked="checked" id="forbidJs" /><span class="mvl8px">禁用JS脚本</span></div></div></div></div>',
		clean : function() {
			this.tips_reload.remove()
		}
	};
	var z = {
		loadpc_start_time : 0,
		loadpc_end_time : 0,
		pc_display_time : 0,
		loadmark_start_time : 0,
		loadmark_end_time : 0,
		updatedict_start_time : 0,
		updatedict_end_time : 0,
		updatedict_time : 0,
		appuid_display_time : 0,
		loadpc : function(H) {
			$.ajax({
				url : "/static/webappservice/css/images/thor/usability_log_loadpc.gif",
				timeout : 8000,
				type : "GET",
				dataType : "json",
				data : H
			})
		},
		mark : function(H) {
			$.ajax({
				url : "/static/webappservice/css/images/thor/usability_log_mark.gif",
				timeout : 8000,
				type : "GET",
				dataType : "json",
				data : H
			})
		}
	};
	var f = {
		loadFlag : 0,
		init : function() {
			var H = new Date();
			z.loadpc_start_time = H.getTime();
			f.loadFlag = 0;
			f.pcLoadTips.show();
			p.tipsHighlight.loading.install();
			setTimeout(function() {
				if (f.loadFlag == 0) {
					f.loadFlag = 1;
					f.success();
					var I = new Date();
					z.loadpc_end_time = I.getTime();
					z.pc_display_time = z.loadpc_end_time - z.loadpc_start_time;
					var J = {
						appid : appid,
						url : encodeURIComponent(edit_url),
						pc_display_time : z.pc_display_time,
						res : 0
					};
					z.loadpc(J)
				} else {
					if (f.loadFlag == 1) {
						g.show();
						var I = new Date();
						z.loadpc_end_time = I.getTime();
						z.pc_display_time = z.loadpc_end_time
								- z.loadpc_start_time;
						var J = {
							appid : appid,
							url : encodeURIComponent(edit_url),
							pc_display_time : z.pc_display_time,
							res : 1
						};
						z.loadpc(J)
					}
				}
			}, 20000)
		},
		pcLoadTips : {
			show : function() {
				m.css("visibility", "hidden");
				v
						.append('<div class="tips_thor_aim_loading"><div class="tips_loading_title">PC页面加载中...</div></div>');
				v.css({
							display : "block"
						});
				c.css({
							overflow : "hidden"
						})
			},
			clean : function() {
				v.css("display", "none");
				m.css("visibility", "visible");
				c.css({
							overflow : "scroll"
						})
			}
		},
		pageLayout : function() {
			var I = C.contents().height();
			var K = C.contents().width();
			if (K < F.min_aim_body_width) {
				K = F.min_aim_body_width_value
			}
			if (I < F.min_aim_body_height) {
				I = F.min_aim_body_height_value
			}
			var H = K + 8;
			var J = I + 8;
			t.css({
						width : H,
						background : "transparent"
					});
			C.css({
						width : H,
						height : J
					});
			C.contents().find("body").css({
						width : K,
						cursor : "pointer"
					})
		},
		pageFilter : function() {
			C.contents().find("object,embed,iframe").remove();
			for (var H = 1; H < 9990; H++) {
				document.getElementById("thor_aim").contentWindow
						.clearInterval(H)
			}
			C.contents().find("*").hover(function() {
						return false
					})
		},
		success : function() {
			this.pageFilter();
			this.pageLayout();
			var H = window.location.hash;
			if (H === "") {
				d.init(0);
				window.location.hash = "#isnew"
			} else {
				d.init(1)
			}
			p.receiveData();
			var I = null;
			C.contents().find("*").mouseover(function(K) {
						K = K || window.event;
						var J = K.target || K.srcElement;
						h.process(J);
						return false
					});
			C.contents().find("*").click(function(K) {
						K = K || window.event;
						var J = K.target || K.srcElement;
						B.process(J, "add", null);
						return false
					});
			r.init();
			f.loadFlag = 2
		}
	};
	A.init();
	f.init()
})();