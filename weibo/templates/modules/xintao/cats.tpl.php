<?php


/**
 * 分类列表模块模板
 * 需要参数参见component_96_pls
 * @version $Id$
 */
if (!defined('IN_APPLICATION')) {
	exit ('ACCESS DENIED!');
}
$params = $mod['param'];
$route = $mod['route'];
$row_size = 4;
if (isset ($params['row_size'])) {
	$row_size = $params['row_size'];
}
//生成查询参数(已经由97传入)
?>
<div class="search-nav"><ul class="crumbs"><li class="list-item"><?php if(!empty($queryStr['q'])||!empty($queryStr['cid'])){ echo '<a href="'.URL($route,array('q'=>$queryStr['q'])).'">所有分类</a>';}else{if($route=='products'){echo '<a href="'.URL('products').'">所有分类</a>';}else{echo '所有分类';}}?></li><?php if(count($cat)==1){echo '<li>'.$cat[0]['name'].'</li>';}?>找到相关宝贝<em><?php echo $params['total_results'];?></em>件</ul><div class="blank0"></div></div>

    	<?php


if (count($cats) > 1) {
	echo '<div id="J_SearchCats" class="selectarea" style="border-top:1px;margin-top:-2px;"><div class="typearea">';
	$count = 0;
	$rows = 1;
	$length = count($cats) - 1;
	$m = $row_size -1;
	$queryStr['cid'] = 'CID'; //设置临时替换
	$urlTemp = URL($route, array_filter($queryStr)); //过滤空属性，并生成模板URL
	foreach ($cats as $row) {
		$url = str_replace('CID', $row['cid'], $urlTemp); //替换为当前CID
		if ($count % $row_size == 0) {
			echo '<div class="selectareali" row="' . $rows . '"' . ($rows > 3 ? ' style="display:none"' : '') . '><span class="blank5"></span><div class="selectareaRight"><ul>';
			$rows++;
		}
		if ($count % $row_size == $m || $count == $length) {
			echo '<li><a href="' . $url . '">' . $row['name'] . '</a>(' . $row['count'] . ')</li>';
			echo ' </ul></div><span class="blank5"></span></div>';
		} else {
			echo '<li><a href="' . $url . '">' . $row['name'] . '</a>(' . $row['count'] . ')</li>';
		}
		$count++;
	}
	if ($rows > 3) {
		echo '<div class="selectareabtn"><img id="itoggle" style="cursor:pointer" src="http://static.xintaowang.com/css/default/xintao/downbar.jpg"></div>';
	}
	echo '</div></div>';
}
elseif (count($props) > 0) {
	echo '<div id="J_SearchCats" class="selectarea selectarea-props" style="border-top:1px;margin-top:-2px;"><div class="typearea">';
	$count = 1;
	//处理属性值
	$selectedProps=array();
	///第一步：取出原属性值，并存储
	$propsTemp = $queryStr['props'];
	///第二步：设置PROPS占位符
	$queryStr['props'] = 'PROPS'; //追加属性
	$urlTemp = URL($route, array_filter($queryStr)); //过滤空属性，并生成模板URL
	foreach ($props as $row) {
		if (array_key_exists('prop_values', $row)) { //如果存在属性值
			$propsStr = $propsTemp;
			echo '<div class="selectareali"' . ($count > 3 ? ' style="display:none"' : '') . '><span class="blank5"></span><div class="selectareaLeft">' . $row['name'] . ':</div><div class="selectareaRight">';
			$values = $row['prop_values']['prop_value'];
			$pid = $row['pid'];
			$pname = $row['name'];
			///第三步：如果是已存在属性，则移除，并标识当前属性有被选中属性值
			$selected = '';
			$isMatch = preg_match('/(' . $pid . ':([0-9]+);)/', $propsTemp, $m);
			if ($isMatch) { //如果匹配,取属性值，同时移除该属性对
				$selected = $m[2];
				$propsStr = str_replace($pid . ':' . $selected . ';', '', $propsStr);
			}
			$length = count($values);
			$vlength = min(8, $length); //如果大于等于8个，则按8个
			echo '<ul>';
			for ($i = 0; $i < $vlength; $i++) {
				$v = $values[$i];
				$url = str_replace('PROPS', $propsStr . $pid . ':' . $v['vid'] . ';', $urlTemp); //替换为当前PROPS
				if ($v['vid']==$selected) {//选中
					$selectedProps[]=array('props'=>$pid.':'.$v['vid'],'p'=>$pname,'v'=>$v['name'],'u'=>str_replace('PROPS', $propsStr, $urlTemp));
					//$url = str_replace('PROPS', $propsStr, $urlTemp); //不追加已选中的PROPS
						//echo '<li class="hovera"><a href="' . $url . '">' . $v['name'] . '</a><span class="kindsdel"><a href="'.$url.'"><img src="http://images.vancl.com/search/kindsdel.gif"></a></span></li>';
				}else{
					$url = str_replace('PROPS', $propsStr . $pid . ':' . $v['vid'] . ';', $urlTemp); //替换为当前PROPS
					echo '<li><a rel="nofollow" href="' . $url . '">' . $v['name'] . '</a></li>';	
				}
			}
			echo '</ul>';
			if ($length > 8) {
				echo '<ul class="more-props">';
				for ($i = 8; $i < $length; $i++) {
					$v = $values[$i];
					if ($v['vid']==$selected) {//选中
					$selectedProps[]=array('props'=>$pid.':'.$v['vid'],'p'=>$pname,'v'=>$v['name'],'u'=>str_replace('PROPS', $propsStr, $urlTemp));
						//$url = str_replace('PROPS', $propsStr, $urlTemp); //不追加已选中的PROPS
						//echo '<li class="hovera"><a href="' . $url . '">' . $v['name'] . '</a><span class="kindsdel"><a href="'.$url.'"><img src="http://images.vancl.com/search/kindsdel.gif"></a></span></li>';
					}else{
						$url = str_replace('PROPS', $propsStr . $pid . ':' . $v['vid'] . ';', $urlTemp); //替换为当前PROPS
						echo '<li><a rel="nofollow" href="' . $url . '">' . $v['name'] . '</a></li>';	
					}
				}
				echo '</ul>';
				echo '<a class="more close">更多</a>';
			}
			echo '</div><span class="blank5"></span></div>';
			$count++;
		}
	}
	if ($count > 3) {
		echo '<div class="selectareabtn"><img id="itoggle" style="cursor:pointer" src="http://static.xintaowang.com/css/default/xintao/downbar.jpg"></div>';
	}
	if(!empty($selectedProps)){//存在已选中属性
		echo '<div class="selectedarea" id="J_SelectedArea"><dl><dt>您已选择:</dt>';
		if(count($selectedProps)==1){//如果只有一个属性值,需直接移除props-属性
			$s=$selectedProps[0];
			echo '<dd data-value="'.$s['props'].'"><a href="'.str_replace('/props-','',$s['u']).'" title="'.$s['p'].':'.$s['v'].'"><h5>'.$s['p'].':</h5>'.$s['v'].'<span class="close-icon"></span></a></dd>';
		}else{
			foreach($selectedProps as $s){
				echo '<dd data-value="'.$s['props'].'"><a href="'.$s['u'].'" title="'.$s['p'].':'.$s['v'].'"><h5>'.$s['p'].':</h5>'.$s['v'].'<span class="close-icon"></span></a></dd>';
			}	
		}
		
		echo '</dl></div></div></div>';
	}else{
		echo '</div></div>';
	}

}
?>