jQuery(document).ready(function($) {
	var ajaxurl = '<?php echo admin_url("admin-ajax.php");?>';
	$('.status').click(function() {
		$('#X_Tixian-Cash-L').text($(this).attr('data-max'));
		$('#X_Tixian-Account-L').text($(this).attr('data-account') + '('
				+ $(this).attr('data-account-name') + ')');
		$('#X_Tixian-Submit').attr('data-id', $(this).attr('data-id'))
				.val('已手动转账[' + (parseFloat($(this).attr('data-max'))) + '元]');;
		tb_show('确认支付提现',
				'#TB_inline?height=320&width=420&inlineId=X_Tixian_Cash');
	});
	$('#X_Tixian-Freeze').focus(function() {
				xt_tixian_validate($(this));
			}).blur(function() {
				xt_tixian_validate($(this));
			})
	$('#X_Tixian-Cancel').click(function() {
				tb_remove();
				return false;
			})
	$('#X_Tixian-Submit').click(function() {
		if (xt_tixian_validate($('#X_Tixian-Freeze'))) {
			xt_tixian_status($(this).attr('data-id'), ($('#X_Tixian-Freeze')
							.val().trim()), $('#X_Tixian-Content').val().trim());
		}
	});
	function xt_tixian_validate($obj) {
		$('#X_Tixian-Freeze-Msg').hide();
		var amount = $obj.val();
		var regex = /^\d*\.?\d*$/;
		if (!regex.test(amount)) {
			$('#X_Tixian-Freeze-Msg').show().text('输入金额类型不正确');
			return false;
		}
		var max = $('#X_Tixian-Cash-L').text();
		if (parseFloat(amount) > parseFloat(max)) {
			$('#X_Tixian-Freeze-Msg').show().text('输入金额超过申请提现金额');
			return false;
		}
		if (amount > 0) {
			$('#X_Tixian-Submit').val('已手动转账['
					+ (parseFloat(max) - parseFloat(amount)) + '元]')
			var content = $('#X_Tixian-Content').val();
			if (!content) {
				$('#X_Tixian-Freeze-Msg').show().text('冻结大于0时,必须填写冻结理由');
				return false;
			}
		} else {
			$('#X_Tixian-Submit').val('已手动转账[' + (parseFloat(max)) + '元]');
		}
		return true;
	}
	function xt_tixian_status(id, freeze, content) {
		$.ajax({
					type : "post",
					dataType : "json",
					url : ajaxurl + '?rand=' + Math.random(),
					data : {
						action : 'xt_admin_ajax_tixian_update',
						id : id,
						freeze : freeze,
						content : content
					},
					success : function(response) {
						if (response.code > 0) {
							alert(response.msg);
						} else {
							alert('操作成功');
							tb_remove();
							document.location.href = document.location.href;
						}
					}
				})
	}
});