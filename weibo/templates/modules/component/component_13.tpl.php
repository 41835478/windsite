<?php
	/**
	 * 专题banner模块
	 * 需要参数参见component_13_pls
	 * @version $Id: component_13.tpl.php 17995 2011-08-25 11:54:47Z yaoying $
	 */
if(!defined('IN_APPLICATION')){
	exit('ACCESS DENIED!');
}


?>

<div class="custom-banner">
	<?php if(isset($mod['param']['link'])): ?><a href="<?php echo $mod['param']['link']; ?>"><?php endif; ?>
	<img 
	    src="<?php echo $mod['param']['src'];?>" 
	    alt="<?php echo F('escape', $mod['title']);?>" 
	    <?php if(isset($mod['param']['height']) && (int)$mod['param']['height'] > 0): ?>height="<?php echo (int)$mod['param']['height']; ?>"<?php endif; ?>
	    <?php if(isset($mod['param']['width']) && (int)$mod['param']['width'] > 0): ?>width="<?php echo (int)$mod['param']['width']; ?>"<?php endif; ?>
	/>
	<?php if(isset($mod['param']['link'])): ?></a><?php endif; ?>
</div>
