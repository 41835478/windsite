<?php
function getXintaoTvCats($p) {
	$result = array ();
	$categroySelectArea = '';
	$titleCats = '';
	$cats = $p['cats'];
	$queryStr = $p['queryStr'];
	if (!empty ($cats['name']) && !empty ($cats['categorys'])) {
		$categroySelectArea = "";
		$categoryName = $cats['name'];
		$categorys = $cats['categorys'];
	}
	// 路径中的分类参数 和 对应的ID
	$paramsSelectValues = Array ();
	$aliasSort = array (
		'year' => 0,
		'area' => 1,
		'language' => 2,
		'age' => 3,
		'cs' => 4,
		'cat' => 5
	);
	if ($categorys != null) {
		$categroySelectArea = "<div class=\"seaKey bord ks-clear\" id=\"seaKey\">";
		foreach ($categorys as $category) {
			$categroySelectArea .= "<ul class=\"ks-clear\"><li><span>" . $category['cateName'] . "</span></li>";
			$sv = $queryStr[$category['cateAlias']];
			$queryStr[$category['cateAlias']] = 'CAT'; //设置临时替换
			$urlTemp = URL('video.search', array_filter($queryStr)); //过滤空属性，并生成模板URL
			foreach ($category['searchKeys'] as $searchKey => $searchValue) {
				if ($category['cateAlias'] == 'tvType') {
					$searchValue = - $searchValue;
				}
				$categroySearchUrl = str_replace('CAT', $searchValue, $urlTemp); //替换为当前CID
				$categoryStyle = ""; // 判断哪个属性已经被选中，选中的将会高亮				
				if (isset ($sv) && $sv == $searchValue) {
					$categoryStyle = " class=\"now\"";
					if ($searchKey > 0) {
						if (isset ($aliasSort[$category['cateAlias']])) {
							$paramsSelectValues[$searchValue] = $aliasSort[$category['cateAlias']];
						}
					}
				}
				if (empty ($sv) && $searchKey == 0) {
					$categoryStyle = " class=\"now\"";
				}
				$categroySelectArea .= "<li" . $categoryStyle . "><a rel=\"nofollow\" href=\"" . $categroySearchUrl . "\">" . $category['cateValues'][$searchKey] . "</a></li>";
			}
			$queryStr[$category['cateAlias']] = $sv;
			$categroySelectArea .= "</ul>";
		}
		$categroySelectArea .= "</div><div class=\"shLay ks-clear\" id=\"shid\"></div>";
	}
	if (!empty ($paramsSelectValues)) {
		uasort($paramsSelectValues, 'paramsSelectValuesCmp');
		$titleCats = implode('', array_keys($paramsSelectValues));
	}
	$result['area'] = $categroySelectArea;
	$result['title'] = $titleCats;
	return $result;
}
function paramsSelectValuesCmp($a, $b) {
	if ($a == $b) {
		return 0;
	}
	return ($a < $b) ? -1 : 1;
}