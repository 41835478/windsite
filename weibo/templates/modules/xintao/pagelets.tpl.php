<?php
$modules = DS('PageModule.getPageModulesByPosition', '', $p, $position);//TODO 尚未设置缓存
if (isset ($modules[$position])) {
	foreach ($modules[$position] as $mod) {
		Xpipe :: pagelet('component/component_' . $mod['component_id'] . '.run', $mod);
	}
}
?>