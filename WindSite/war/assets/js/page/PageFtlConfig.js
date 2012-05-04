var PageFtlConfig = {
	/**
	 * 初始化模块推广配置
	 * 
	 * @param {}
	 *            func
	 * @return {Boolean}
	 */
	initCommonFtlConfig : function(func) {
		$('#module-content')
				.empty()
				.append('<form style="margin-left:25px;"><div class="help_info" align="left" style="position:relative;"><h3>直接点击完成即可完成该模块的添加</h3></div></form>');
		if (func) {
			func();
		}
		return true;
	},
	createCommonFtlParams : function() {
		var params = {};
		params.isHd = $('#module-ishd').attr('checked') + "";// 是否显示标题
		return params;
	},
	/**
	 * 商品推广配置校验
	 */
	validateCommonFtlConfig : function() {
		return true;
	}
};
