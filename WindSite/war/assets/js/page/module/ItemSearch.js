/**
 * 搜索框组件
 * 
 * @author fxy
 */
(function($) {
	$.widget("ui.pageItemSearch", $.ui.pageModule, {
				/**
				 * 参数
				 */
				options : {
					line : '4',// 关键词行数
					cat : '0',// 默认分类类目
					isHd : 'false'
					// 默认不显示标题栏
				},
				_initModule : function() {
					PageModuleUtils.initItemSearch(this.element);
				},
				/**
				 * 返回当前模块源码
				 */
				toSource : function(isValidate) {

				}

			});
})(jQuery);

/**
 * 初始化搜索框模块内容编辑页面
 */
function initItemSearchModuleConfig(func) {
	$('#module-content').empty().load(
			'/assets/js/page/module/ItemSearchConfig.html?v=' + Math.random(),
			function() {
				if (MODULE && MODULE.hasClass('J_TBox')) {// 如果存在，并且为编辑模块模式,还原属性
					var options = MODULE.pageItemSearch('option');
					$('#itemSearch-line').val(options.line);
					$('#itemSearch-cat').val(options.cat);
				}
				$('#itemSearch-line').change(function() {
							var _keywords_line = $(this).val();
							var res = /^[0-9]{1,2}$/.test(_keywords_line);
							if (!res) {
								alert("输入的值必须是0-9的一位或两位数字！");
								$(this).val(1);
								return;
							} else {
								if (parseInt(_keywords_line) > 10) {
									alert("关键词行数不能超过10");
									$(this).val(10);
									return;
								}
							}
						});
				if (func) {
					func();
				}
			});
	return true;
}
/**
 * 校验搜索模块配置
 * 
 * @return {Boolean}
 */
function validateItemSearchModuleConfig() {
	var title = $('#module-title').val() + '';
	var line = $('#itemSearch-line').val() + '';
	var cat = $('#itemSearch-cat').val() + '';
	var isHd = $('#module-ishd').attr('checked') + "";
	var res = /^[0-9]{1,2}$/.test(line);
	if (!res) {
		alert("输入的值必须是0-9的一位或两位数字！");
		$('#itemSearch-line').val('1');
		return false;
	} else {
		if (parseInt(line) > 10) {
			alert("关键词行数不能超过10");
			$('#itemSearch-line').val('10');
			return false;
		}
	}
	return true;
}
/**
 * 新增模块
 * 
 * @param {}
 *            name
 * @param {}
 *            title
 * @param {}
 *            region
 * @param {}
 *            next
 * @param {}
 *            func
 */
function createItemSearchModuleContent(name, title, region, next, func) {
	var line = $('#itemSearch-line').val();
	var cat = $('#itemSearch-cat').val();
	var isHd = $('#module-ishd').attr('checked') + "";
	PageUtils.addModule(name, title, region, next, {
				isHd : isHd,
				line : line,
				cat : cat
			}, function(data) {
				if (func) {
					func(data);
				}
			});

}
/**
 * 更新模块
 * 
 * @param {}
 *            id
 * @param {}
 *            title
 * @param {}
 *            func
 */
function updateItemSearchModuleContent(id, title, func) {
	var line = $('#itemSearch-line').val();
	var cat = $('#itemSearch-cat').val();
	var isHd = $('#module-ishd').attr('checked') + "";
	PageUtils.updateModule(id, title, {
				isHd : isHd,
				line : line,
				cat : cat
			}, function(data) {
				if (func) {
					func(data);
				}
			});
}