<?php $router = APP::getRuningRoute(true); ?>
<div class="row">
	<?php if (HAS_DIRECT_MESSAGES){ if ($router['function'] == 'message' && V('g:type', 1) == 1): ?><?php LO('include__msgCommon__message');?><?php else: ?><a href="<?php echo WAP_URL('index.messages', 'type=1'); ?>"><?php LO('include__msgCommon__message');?></a><?php endif; } ?>&nbsp;<?php if ($router['function'] == 'message' && V('g:type') == 2): ?><?php LO('include__msgCommon__comment');?><?php else: ?><a href="<?php echo WAP_URL('index.messages', 'type=2'); ?>"><?php LO('include__msgCommon__comment');?></a><?php endif; ?>&nbsp;<?php if ($router['function'] == 'message' && V('g:type', 1) == 4): ?><?php LO('include__msgCommon__notice');?><?php else: ?><a href="<?php echo WAP_URL('index.messages', 'type=4'); ?>"><?php LO('include__msgCommon__notice');?></a><?php endif; ?>&nbsp;<?php if ($router['function'] == 'message' && V('g:type') == 3): ?><?php LO('include__msgCommon__atme');?><?php else: ?><a href="<?php echo WAP_URL('index.messages', 'type=3'); ?>"><?php LO('include__msgCommon__atme');?></a><?php endif; ?>
</div>