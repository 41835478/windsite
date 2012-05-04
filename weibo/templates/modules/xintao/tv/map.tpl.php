<?php
if (!empty ($result)) {
?>
<dl class="listA">
<?php


	$vKey = ($type == 'teleplay' ? 'sid' : 'vid');
	$vUrl = ($type == 'teleplay' ? '/video/sid-' : '/video/vid-');
	foreach ($result as $key => $values) {
		echo '<a name="' . $key . '"></a>';
		echo '<dt>' . $key . '</dt>';
		echo '<dd><ul class="fix">';
		if (!empty ($values)) {
			foreach ($values as $v) {
				echo '<li><a href="' . $vUrl . $v[$vKey] . '" title="' . $v['tv_name'] . '">' . $v['tv_name'] . '</a></li>';
			}
		}
		echo '</ul></dd>';
	}
?>
</dl>
<?php


}
?>