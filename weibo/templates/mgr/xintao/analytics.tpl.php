<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>统计分析</title>
<link href="<?php echo W_BASE_URL;?>css/admin/admin.css" rel="stylesheet" type="text/css" />
<script type="text/javascript" src="<?php echo W_BASE_URL;?>js/jquery.min.js"></script>
<script type="text/javascript" src="<?php echo W_BASE_URL;?>js/admin/admin_lib.js"></script>
<script src="<?php echo W_BASE_URL;?>js/admin-all.js"></script>
<!--[if IE]><script language="javascript" type="text/javascript" src="/js/xintao/jqplot/excanvas.min.js"></script><![endif]-->
<link rel="stylesheet" type="text/css" href="http://www.xintaowang.com/js/xintao/jqplot/jquery.jqplot.min.css" /> 
<script language="javascript" type="text/javascript" src="<?php echo W_BASE_URL;?>js/xintao/jqplot/jquery.jqplot.min.js"></script> 
<script type="text/javascript" src="<?php echo W_BASE_URL;?>js/xintao/jqplot/plugins/jqplot.pieRenderer.min.js"></script>
<script type="text/javascript" src="<?php echo W_BASE_URL;?>js/xintao/jqplot/plugins/jqplot.donutRenderer.min.js"></script>
</head>
<body class="main-body">
	<div class="path"><p>当前位置：营销管理<span>&gt;</span>统计分析</p></div>
    <div class="main-cont ks-clear">
    	<div style="float:left">
    		<div id="todayWeiboChart" style="height:300px; width:400px;"></div>
    	</div>
    	<div style="float:left">
    		<div id="weiboChart" style="height:300px; width:400px;"></div>
    	</div>
	</div>
</body>
<?php

function weiboAnalytics($where=''){
	$ANALYTICS = array (
		2 => array (
			'name' => '商品',
			'nums' => 0
		),
		1 => array (
			'name' => '店铺',
			'nums' => 0
		),
		7 => array (
			'name' => '分享',
			'nums' => 0
		),
		3 => array (
			'name' => '画报',
			'nums' => 0
		),
		4 => array (
			'name' => '笑话',
			'nums' => 0
		),
		5 => array (
			'name' => '影视',
			'nums' => 0
		),
		6 => array (
			'name' => '其他',
			'nums' => 0
		)
	);
	$db = APP :: ADP('db');
	$sql = 'SELECT `type`,count(*) as nums FROM ' . $db->getTable(T_WEIBO_COPY) . ' WHERE `user_id`=' . XT_USER_ID . $where .' GROUP BY `type`';
	$result= $db->query($sql);
	if (!empty ($result)) {
		foreach ($result as $row) {
			if (in_array($row['type'], array (
					1,
					2,
					3,
					4,
					5,
					6,
					7
				))) {
				$ANALYTICS[$row['type']]['nums'] = $row['nums'];
			}
		}
	}
	$RESULT = array();
	foreach ($ANALYTICS as $any) {
		$RESULT[] = array (
			$any['name'] . '[' . $any['nums'] . 'x' . (XT_IS_WEIBO == 'true' ? 4 : 2) . ']',
			(int) $any['nums']
		);
	}
	return $RESULT;
}
?>
<script type="text/javascript">
$(document).ready(function(){
  var data = <?php echo json_encode(weiboAnalytics());?>;
  var data1 = <?php echo json_encode(weiboAnalytics(' AND addtime>'.strtotime(date('Y-m-d')).' '));?>;
  var plot = jQuery.jqplot ('weiboChart', [data], 
    { 
    title:	{
        text: '总营销微博内容统计(仅新浪,不包含淘客协助发布)',   // title for the plot,
        show: true
    },
      seriesDefaults: {
        // Make this a pie chart.
        renderer: jQuery.jqplot.PieRenderer, 
        rendererOptions: {
          // Put data labels on the pie slices.
          // By default, labels show the percentage of the slice.
          showDataLabels: true
        }
      }, 
      legend: { show:true, location: 'e' }
    }
  );
  var plot1 = jQuery.jqplot ('todayWeiboChart', [data1], 
    { 
    	title:	{
        text: '今日营销微博内容统计(仅新浪,不包含淘客协助发布)',   // title for the plot,
        show: true
    },
      seriesDefaults: {
        // Make this a pie chart.
        renderer: jQuery.jqplot.PieRenderer, 
        rendererOptions: {
          // Put data labels on the pie slices.
          // By default, labels show the percentage of the slice.
          showDataLabels: true
        }
      }, 
      legend: { show:true, location: 'e' }
    }
  );
});
</script>
</html>
