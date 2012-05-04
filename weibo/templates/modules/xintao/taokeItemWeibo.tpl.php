<?php
if (!empty ($list)) {
	foreach ($list as $key => $row) {
		$localShowUrl = 'javascript:alert(\'需要订购增值服务(卖家服务/淘客服务)\');return false;';
		$localTaUrl = 'javascript:alert(\'需要订购增值服务(卖家服务/淘客服务)\');return false;';
		$showUrl = 'http://api.t.sina.com.cn/' . $row['uid'] . '/statuses/' . $row['id'];
		$taUrl = 'http://weibo.com/' . $row['uid'];
		$qqShowUrl = '';
		if ($row['qq_id'] > 0) {
			$qqShowUrl = '，<a href="http://t.qq.com/p/t/' . $row['qq_id'] . '" target="_blank">腾讯地址</a>';
		} else {
			$qqShowUrl = '，腾讯地址';
		}
		$shShowUrl = '';
		if (!empty ($row['sh_id'])) {
			$shShowUrl = '，<a href="http://t.sohu.com/m/' . $row['sh_id'] . '" target="_blank">搜狐地址</a>';
		} else {
			$shShowUrl = '，搜狐地址';
		}
		$wyShowUrl = '';
		if (!empty ($row['wy_id'])) {
			$wyShowUrl = '，<a href="http://t.163.com/' . (WB_WY_NICK != '' ? WB_WY_NICK : '4374334249') . '/status/' . $row['wy_id'] . '" target="_blank">网易地址</a>';
		} else {
			$wyShowUrl = '，网易地址';
		}
		if (XT_IS_WEIBO == 'true') {
			$localShowUrl = URL('show', array (
				'id' => $row['id']
			), 'index.php', 2);
			$localTaUrl = URL('ta', array (
				'id' => $row['uid']
			), 'index.php', 2);
		}
		echo '<tr><td>' . htmlspecialchars($row['weibo']) . '<br/><a href="' . $showUrl . '" target="_blank">新浪地址</a>' . $qqShowUrl . $shShowUrl . $wyShowUrl . '，<a href="' . $localShowUrl . '" target="_blank">本站地址</a></td><td>' . date('Y-m-d H:i:s', $row['addtime']) . '</td></tr>';
	}
	echo '<tr><td colspan="2"><div class="pre-next">' . $pager . '</div></td></tr>';
} else {
	echo '<tr><td colspan=2>未找到淘宝客商品自动营销记录</td></tr>';
}
?>