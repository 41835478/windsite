<?php if (!empty($list)){?>
	<?php
foreach ($list as $visit) {
?>
                	<tr>
                		<td><a href="http://item.taobao.com/item.htm?id=<?php echo $visit['label'];?>" target="_blank"><?php echo isset($visit['title'])?$visit['title']:'未知商品';?></a></td>
                		<?php


	if (isset ($visit['title'])) {
		echo '<td>' . $visit['price'] . '元</td><td>' . $visit['nick'] . '</td>';
	} else {
		echo '<td></td><td></td>';
	}
?>
                        <td><?php echo $visit['nb_actions']?></td>
                         <td><?php echo $visit['nb_visits']?></td>
  					</tr>
	<?php }?>
	<tr class="tb-tit-bg"><td colspan="5"><div class="page">
<?php


	if ((int) $page_no > 1) {
		echo '<a href="#" data-page="' . ((int) $page_no -1) . '" class="btn-s1"><span>上一页</span></a>';
	}

	if (!empty ($list) && count($list) == 20) {
		echo '<a href="#" data-page="' . ((int) $page_no +1) . '" class="btn-s1"><span>下一页</span></a>';
	}
?>
</div></td></tr>
<?php

} else {
	if ($error) {
		echo '<tr><td colspan="5"><p class="no-data">' . $error . '</p></td></tr>';
	} else {
		echo '<tr><td colspan="5"><p class="no-data">搜索不到任何数据</p></td></tr>';
	}
}
?>

