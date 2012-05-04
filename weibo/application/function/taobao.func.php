<?php
function tv_default_search($params) {
	$query = array ();
	$query['key'] = '';
	$query['c'] = 1;
	$query['tvType'] = '';
	$query['cat'] = '';
	$query['area'] = '';
	$query['year'] = '';
	$query['cs'] = '';
	$query['age'] = '';
	$query['language'] = '';
	//保留10个扩展参数
	$query['extra_1'] = '';
	$query['extra_2'] = '';
	$query['extra_3'] = '';
	$query['extra_4'] = '';
	$query['extra_5'] = '';
	$query['extra_6'] = '';
	$query['extra_7'] = '';
	$query['extra_8'] = '';
	$query['extra_9'] = '';
	$query['extra_10'] = '';
	//扩展参数结束
	$query['fee'] = '';
	$query['o'] = '';
	$query['page_no'] = 1;
	$query['show_num'] = 40;
	if ($params) {
		$query = array_merge($query, $params);
	}
	return array_slice($query, 0, 23);
}
function tv_convert_search($ss) {
	$query = array ();
	$array = explode('-', $ss);
	if (count($array) >= 23) {
		$query['key'] = $array[0];
		$query['c'] = $array[1] ? $array[1] : 1;
		$query['tvType'] = $array[2];
		$query['cat'] = $array[3];
		$query['area'] = $array[4];
		$query['year'] = $array[5];
		$query['cs'] = $array[6];
		$query['age'] = $array[7];
		$query['language'] = $array[8];
		//保留10个扩展参数
		$query['extra_1'] = $array[9];
		$query['extra_2'] = $array[10];
		$query['extra_3'] = $array[11];
		$query['extra_4'] = $array[12];
		$query['extra_5'] = $array[13];
		$query['extra_6'] = $array[14];
		$query['extra_7'] = $array[15];
		$query['extra_8'] = $array[16];
		$query['extra_9'] = $array[17];
		$query['extra_10'] = $array[18];
		//扩展参数结束
		$query['fee'] = $array[19];
		$query['o'] = $array[20];
		$query['page_no'] = $array[21];
		$query['show_num'] = 40;
	} else {
		$query = tv_default_search();
	}
	return $query;
}
function taobaoke_default_search($params) {
	$query = array ();
	$query['keyword'] = '';
	$query['cid'] = '';
	$query['start_price'] = '';
	$query['end_price'] = '';
	$query['auto_send'] = '';
	$query['area'] = '';
	$query['start_credit'] = '';
	$query['end_credit'] = '';
	$query['sort'] = '';
	$query['guarantee'] = '';
	$query['start_commissionRate'] = '';
	$query['end_commissionRate'] = '';
	$query['start_commissionNum'] = '';
	$query['end_commissionNum'] = '';
	$query['start_totalnum'] = '';
	$query['end_totalnum'] = '';
	$query['cash_coupon'] = '';
	$query['vip_card'] = '';
	$query['overseas_item'] = '';
	$query['sevendays_return'] = '';
	$query['real_describe'] = '';
	$query['onemonth_repair'] = '';
	$query['cash_ondelivery'] = '';
	$query['mall_item'] = '';
	$query['page_no'] = 1;
	$query['show_num'] = 40;
	if ($params) {
		$query = array_merge($query, $params);
	}
	return array_slice($query, 0, 26);
}
function poster_default_search($params) {
	$query = array ();
	$query['key_word'] = '';
	$query['channel_ids'] = '';
	$query['date'] = '';
	//保留10个扩展参数
	$query['extra_1'] = '';
	$query['extra_2'] = '';
	$query['extra_3'] = '';
	$query['extra_4'] = '';
	$query['extra_5'] = '';
	$query['extra_6'] = '';
	$query['extra_7'] = '';
	$query['extra_8'] = '';
	$query['extra_9'] = '';
	$query['extra_10'] = '';
	//扩展参数结束
	$query['page_no'] = 1;
	$query['show_num'] = 20;
	$query['show_size'] = '';
	if ($params) {
		$query = array_merge($query, $params);
		$query['key_word'] = str_replace('-', ' ', $query['key_word']); //替换-
	}
	return array_slice($query, 0, 16);
}
function poster_convert_search($ss) {
	$query = array ();
	$array = explode('-', $ss);
	if (count($array) >= 16) {
		$query['key_word'] = $array[0];
		$query['channel_ids'] = $array[1];
		$query['date'] = $array[2];
		//保留10个扩展参数
		$query['extra_1'] = $array[3];
		$query['extra_2'] = $array[4];
		$query['extra_3'] = $array[5];
		$query['extra_4'] = $array[6];
		$query['extra_5'] = $array[7];
		$query['extra_6'] = $array[8];
		$query['extra_7'] = $array[9];
		$query['extra_8'] = $array[10];
		$query['extra_9'] = $array[11];
		$query['extra_10'] = $array[12];
		//扩展参数结束
		$query['page_no'] = $array[13];
		$query['show_num'] = 20;
		$query['show_size'] = $array[15];

	} else {
		$query = poster_default_search();
	}
	return $query;
}
function taobao_default_search($params) {
	$query = array ();
	$query['q'] = '';
	$query['cid'] = '';
	$query['props'] = '';
	$query['nicks'] = '';
	$query['is_mall'] = '';
	$query['stuff_status'] = '';
	$query['post_free'] = '';
	$query['is_cod'] = '';
	$query['promoted_service'] = '';
	$query['genuine_security'] = '';
	$query['is_prepay'] = '';
	$query['has_discount'] = '';
	$query['one_station'] = '';
	$query['ww_status'] = '';
	$query['state'] = '';
	$query['city'] = '';
	$query['start_price'] = '';
	$query['end_price'] = '';
	//保留10个扩展参数
	$query['extra_1'] = '';
	$query['extra_2'] = '';
	$query['extra_3'] = '';
	$query['extra_4'] = '';
	$query['extra_5'] = '';
	$query['extra_6'] = '';
	$query['extra_7'] = '';
	$query['extra_8'] = '';
	$query['extra_9'] = '';
	$query['extra_10'] = '';
	//扩展参数结束
	$query['order_by'] = '';
	$query['style'] = '';
	$query['page_no'] = 1;
	$query['show_num'] = 40;
	$query['show_size'] = '';
	if ($params) {
		$query = array_merge($query, $params);
		$query['q'] = str_replace('-', ' ', $query['q']); //替换-
	}
	return array_slice($query, 0, 33);
}
function taobao_convert_search($ss) {
	$query = array ();
	$array = explode('-', $ss);
	if (count($array) >= 33) {
		$query['q'] = $array[0];
		$query['cid'] = $array[1];
		$query['props'] = $array[2];
		$query['nicks'] = $array[3];
		$query['is_mall'] = $array[4];
		$query['stuff_status'] = $array[5];
		$query['post_free'] = $array[6];
		$query['is_cod'] = $array[7];
		$query['promoted_service'] = $array[8];
		$query['genuine_security'] = $array[9];
		$query['is_prepay'] = $array[10];
		$query['has_discount'] = $array[11];
		$query['one_station'] = $array[12];
		$query['ww_status'] = $array[13];
		$query['state'] = $array[14];
		$query['city'] = $array[15];
		$query['start_price'] = $array[16];
		$query['end_price'] = $array[17];
		//保留10个扩展参数
		$query['extra_1'] = $array[18];
		$query['extra_2'] = $array[19];
		$query['extra_3'] = $array[20];
		$query['extra_4'] = $array[21];
		$query['extra_5'] = $array[22];
		$query['extra_6'] = $array[23];
		$query['extra_7'] = $array[24];
		$query['extra_8'] = $array[25];
		$query['extra_9'] = $array[26];
		$query['extra_10'] = $array[27];
		//扩展参数结束
		$query['order_by'] = $array[28];
		$query['style'] = $array[29];
		$query['page_no'] = $array[30];
		$query['show_num'] = 40;
		$query['show_size'] = $array[32];
	} else {
		$query = taobao_default_search();
	}
	return $query;
}

function vancl_default_search($params) {
	$query = array ();
	$query['q'] = '';
	$query['cid'] = 0;
	$query['isspecial'] = '';
	$query['sprice'] = '';
	$query['eprice'] = '';
	//保留10个扩展参数
	$query['extra_1'] = '';
	$query['extra_2'] = '';
	$query['extra_3'] = '';
	$query['extra_4'] = '';
	$query['extra_5'] = '';
	$query['extra_6'] = '';
	$query['extra_7'] = '';
	$query['extra_8'] = '';
	$query['extra_9'] = '';
	$query['extra_10'] = '';
	//扩展参数结束
	$query['sortOrder'] = '';
	$query['page_no'] = 1;
	$query['show_num'] = 40;
	if ($params) {
		$query = array_merge($query, $params);
		$query['q'] = str_replace('-', ' ', $query['q']); //替换-
	}
	return array_slice($query, 0, 18);
}
function vancl_convert_search($ss) {
	$query = array ();
	$array = explode('-', $ss);
	if (count($array) >= 18) {
		$query['q'] = $array[0];
		$query['cid'] = $array[1];
		$query['isspecial'] = $array[2];
		$query['sprice'] = $array[3];
		$query['eprice'] = $array[4];
		//保留10个扩展参数
		$query['extra_1'] = $array[5];
		$query['extra_2'] = $array[6];
		$query['extra_3'] = $array[7];
		$query['extra_4'] = $array[8];
		$query['extra_5'] = $array[9];
		$query['extra_6'] = $array[10];
		$query['extra_7'] = $array[11];
		$query['extra_8'] = $array[12];
		$query['extra_9'] = $array[13];
		$query['extra_10'] = $array[14];
		//扩展参数结束
		$query['sortOrder'] = $array[15];
		$query['page_no'] = $array[16];
		$query['show_num'] = 40;
	} else {
		$query = vancl_default_search();
	}
	return $query;
}