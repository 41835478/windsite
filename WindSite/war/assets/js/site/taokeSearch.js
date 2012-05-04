function taokeSearch(q, cid, page_no) {
	if (!q) {
		q = '';
	}
	if (!page_no) {
		page_no = 1;
	}
	getHtmlContent('taokes-result',
			'/router/member/sellermanager/taoke/search', 'POST', {
				q : q,
				cid : cid,
				pageNo : page_no
			}, function(data) {
				$('#taokes-result').empty().append(data);
			}, function() {
			});
}