<?php
function getAppstoreDateline($appstores) {
	$dateline = _getAppstoreDateline('ts-14975-4', $appstores);
	if (empty ($dateline)) {
		$dateline = _getAppstoreDateline('ts-14975-5', $appstores);
		if (empty ($dateline)) {
			$dateline = _getAppstoreDateline('ts-14975-1', $appstores);
		}
	}
	return $dateline;
}
function _getAppstoreDateline($type, $appstores) {
	foreach ($appstores as $key) {
		if ($key['item_code'] == $type) { //先卖家
			return $key['deadline'];
		}
	}
	return '';
}