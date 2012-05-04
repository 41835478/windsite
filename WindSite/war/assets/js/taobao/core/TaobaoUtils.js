/**
 * 工具类
 * 
 * @author fxy
 * @class
 */
var TaobaoUtils = {
	/**
	 * 生成淘宝sign
	 * 
	 * @param {Array}keys
	 *            属性数组
	 * @param {Object}properties
	 *            属性集合
	 * @param {String}secret
	 *            密钥
	 * @return {String}
	 */
	signature : function(keys, properties, secret) {
		var orgin = secret;
		if (keys != null && properties != null) {
			for (var key in keys) {
				var property = keys[key];
				orgin += property + properties[property];
			}
		} else {
			return null;
		}
		orgin += secret;
		try {
			return hex_md5(orgin).toUpperCase();
		} catch (e) {
			throw new Error("sign error:" + e);
		}
		return null;
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
				if (!o.sort) {
					for (var i in o) {
						r.push(i + ":" + TaobaoUtils.json2str(o[i]));
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
						r.push(TaobaoUtils.json2str(o[i]));
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