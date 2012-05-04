<?php
function get_xintaotv_brand($name = '', $isForce = false) {
	if (empty ($name)) { //所有brands
		$brands = array ();
		if (!$isForce) {
			$brands = CACHE :: get(TB_CACHE_TV_KEY_PRE . 'Brands');
		}
		if (empty ($brands)) {
			$db = APP :: ADP('db');
			$sql = 'SELECT * FROM xwb_xttv_brand ORDER BY sortOrder ASC';
			$brands = $db->query($sql);
			CACHE :: set(TB_CACHE_TV_KEY_PRE . 'Brands', $brands);
		}
		return $brands;
	} else {
		$brand = array ();
		if (!$isForce) {
			$brand = CACHE :: get(TB_CACHE_TV_KEY_PRE . 'Brands_' . $name);
		}
		if (empty ($brand)) {
			$db = APP :: ADP('db');
			$sql = 'SELECT * FROM xwb_xttv_brand WHERE name = "' . $db->escape($name) . '"';
			$brand = $db->getRow($sql);
			if (!empty ($brand)) {
				$sql = 'SELECT * FROM xwb_xttv_brand_item WHERE cat = "' . $db->escape($name) . '" ORDER BY sortOrder ASC';
				$brand['items'] = $db->query($sql);
				CACHE :: set(TB_CACHE_TV_KEY_PRE . 'Brands_' . $name, $brand);
			}
		}
		return $brand;
	}
}