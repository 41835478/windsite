$(function() {
			$('#ds-toolbar .menu-select').hover(function() {
						$(this).addClass('hover');
					}, function() {
						$(this).removeClass('hover');
					});
			$('#release-dialog').dialog({
						bgiframe : true,
						autoOpen : false,
						width : 400,
						height : 200,
						zIndex : 1000,
						modal : true
					});
			$('#fixed-dialog').dialog({
						bgiframe : true,
						autoOpen : false,
						width : 400,
						height : 200,
						zIndex : 1000,
						modal : true
					});
			$('#J_CancelFixed').click(function() {
						$('#fixed-dialog').dialog('close');
					});
			$('#J_ConfirmFixed').click(function() {
						var self = $(this);
						if (self.hasClass('btn-ok-disabled')) {
							return false;
						}
						self.addClass('btn-ok-disabled')
						PageUtils.showMsg('正在修复中...');
						var id = self.attr('pageid');
						PageUtils.fixed(id, function() {
									PageUtils.showMsg('修复成功...');
									self.removeClass('btn-ok-disabled');
									$('#release-dialog').dialog('close');
									document.location.href = document.location.href;
								});
					});
			$('#J_TCreateTemplate').click(function() {
						if (confirm('确认要生成模板？')) {
							PageUtils.showMsg('正在生成中...');
							PageUtils.createTemplate(PAGEID, function() {
										PageUtils.showMsg('生成成功...');
									});
						}
					});
			$('#J_TRelease').click(function() {
						$('#release-dialog').dialog('open');
					});
			$('#J_CancelRelease').click(function() {
						$('#release-dialog').dialog('close');
					});
			$('#J_ConfirmRelease').click(function() {
						var self = $(this);
						if (self.hasClass('btn-ok-disabled')) {
							return false;
						}
						self.addClass('btn-ok-disabled')
						PageUtils.showMsg('正在发布中...');
						if ('user' == MODE) {
							var id = self.attr('pageid');
							PageUtils.deploy(id, self.attr('isHeader'),
									function() {
										self.attr('isHeader', 'false');
										PageUtils.showMsg('发布成功...');
										self.removeClass('btn-ok-disabled');
										$('#release-dialog').dialog('close');
									});
						} else if ('detail' == MODE) {// 详情页
							PageUtils.deployDetail(function() {
										self.attr('isHeader', 'false');
										PageUtils.showMsg('详情页发布成功...');
										self.removeClass('btn-ok-disabled');
										$('#release-dialog').dialog('close');
									});
						} else if ('search' == MODE) {// 搜索列表页
							PageUtils.deploySearch(function() {
										self.attr('isHeader', 'false');
										PageUtils.showMsg('搜索列表页发布成功...');
										self.removeClass('btn-ok-disabled');
										$('#release-dialog').dialog('close');
									});
						}
					});
		});