<?php
if (!empty ($list)) {
	foreach ($list as $row) {
		if (!$row['cid'] > 0) {
			$isSynCat = true;
		}
		echo '<tr><td><ul><li><a class="item-title" target="_blank" title="' . $row['title'] . '" href="/go/nid-' . $row['nid'] . '">' . ($row['isValid'] ? '【<strong style="color:red">有效</strong>】' : '【<strong style="color:red">无效</strong>】') . $row['title'] . '</a></li><li>价格：' . $row['price'] . '　销量：' . $row['volume'] . '</li><li>卖家：<a target="_blank" href="/go/shopnick-' . urlencode($row['nick']) . '">' . $row['nick'] . '</a></li></ul></td>';
		echo '<td>';
		$isSyn = $row['isSyn'];
		if ($isSyn == 0) {
			echo '尚未获取分享内容或者无分享内容.请稍候...';
		}
		elseif ($isSyn == 1 && !empty ($row['weibo']) && !empty ($row['archive'])) {
			$url = 'http://t' . XT_USER_ID . '.xintaowang.com/go/nid-' . $row['nid'];
			echo '<p>【' . $row['archive'] . '】说:' . $row['weibo'] . ',详情:<a target="_blank" href="' . $url . '">' . $url . '</a>。</p>';
		}
		echo '</td></tr>';
	}
	echo '<tr><td colspan="2"><div class="pre-next">' . $pager . '</div></td></tr>';
} else {
	echo '<tr><td colspan=2>未找到符合的商品分享，请等待系统的自动同步</td></tr>';
}
?>			