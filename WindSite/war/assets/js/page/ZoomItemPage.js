$(function() {
	var popA = $('#J_PopPic a');
	$('#list:content .hesper:small2big').tooltip({
		onBeforeShow : function() {
			var trigger = this.getTrigger();
			popA.attr('href', '/titem/' + trigger.attr('nid') + '.html');
			popA
					.empty()
					.append('<img oncontextmenu="return(false)" src="/assets/min/images/grey.gif" border="0" style="">');
			var src = trigger.attr('src').replace(/(_sum|_60x60|_80x80)\.jpg/,
					"_b.jpg");
			var img = new Image();
			img.onload = function() {
				var popImage = popA.find('img');
				popImage.attr('src', src);
				var o = img.width;
				var p = img.height;
				if (o >= p && o > 220) {
					popImage.width(220);
				}
				if (p >= o && p > 220) {
					popImage.height(220);
				}
			};
			img.src = src;
		}
	});
});