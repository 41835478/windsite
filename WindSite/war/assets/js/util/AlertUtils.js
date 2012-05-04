/**
 * 覆盖原生alert
 * 
 * @author fxy
 * @function
 * @param {}
 *            msg
 */
// window.alert = function(msg) {
// $.alerts.okButton = "&nbsp;确定&nbsp;";
// $.alerts.cancelButton = "&nbsp;取消&nbsp;";
// jAlert(msg, "提示信息");
// }
/**
 * 覆盖原生confirm
 * 
 * @author fxy
 * @function
 * @param {}
 *            msg
 */
window.confirm = function(msg, callback, ok, cancel) {
	if (ok) {
		$.alerts.okButton = "&nbsp;" + ok + "&nbsp;";
	} else {
		$.alerts.okButton = "&nbsp;确定&nbsp;";
	}
	if (cancel) {
		$.alerts.cancelButton = "&nbsp;" + cancel + "&nbsp;";
	} else {
		$.alerts.cancelButton = "&nbsp;取消&nbsp;";
	}
	return jConfirm(msg, "确认信息", callback);

}