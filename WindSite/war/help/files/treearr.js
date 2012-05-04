var TITEMS = [
		["站内功能介绍", null, "1", ["推广组", "source/src/site/itemgroups.html", "11"],
				["淘站卫士", "source/src/site/doctor.html", "11"],
				["个人信息管理", "source/src/site/personal.html", "11"],
				["收入报表管理", "source/src/site/report.html", "11"],
				["好友列表管理", "source/src/site/friends.html", "11"]],
		[
				"设计器功能介绍",
				null,
				"1",
				["功能概述", "source/src/designer/intro.html", "11"],
				["布局设计", "source/src/designer/layout.html", "11"],
				["主题/皮肤设计", "source/src/designer/skin.html", "11"],
				[
						"设计器组件",
						null,
						"1",
						["推广组类组件", "source/src/designer/groupWidget.html", "11"],
						["阿里妈妈组件", "source/src/designer/alimama.html", "11"],
						["其他组件", "source/src/designer/others.html", "11"]]],
		["常见问题集锦", null, "1", ["为什么需要淘宝账号授权", "source/src/faq/1.html", "11"],
				["我的好友列表是从哪来的", "source/src/faq/2.html", "11"]]];

var FITEMS = arr_flatten(TITEMS);

function arr_flatten(x) {
	var y = [];
	if (x == null)
		return y;
	for (var i = 0; i < x.length; i++) {
		if (typeof(x[i]) == "object") {
			var flat = arr_flatten(x[i]);
			for (var j = 0; j < flat.length; j++)
				y[y.length] = flat[j];
		} else {
			if ((i % 3 == 0))
				y[y.length] = x[i + 1];
		}
	}
	return y;
}
