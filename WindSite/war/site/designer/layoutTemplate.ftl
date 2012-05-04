<#if layouts??>
<#list layouts as layout>
<#switch layout.layout>
	<#case 'grid-m'>
	<div class="layout grid-m ks-clear"><div class="col-main"><div class="main-wrap J_TRegion" data-id="${layout.main.id}"></div></div></div>
	<#break>
	<#case 'grid-s5m0'>
	<div class="layout grid-s5m0 ks-clear"><div class="col-main"><div class="main-wrap J_TRegion" data-id="${layout.main.id}"></div></div><div class="col-sub J_TRegion" data-id="${layout.sub.id}"></div></div>
	<#break>
	<#case 'grid-m0s5'>
	<div class="layout grid-m0s5 ks-clear"><div class="col-main"><div class="main-wrap J_TRegion" data-id="${layout.main.id}"></div></div><div class="col-sub J_TRegion" data-id="${layout.sub.id}"></div></div>
	<#break>
	<#case 'grid-s5m0e5'>
	<div class="layout grid-s5m0e5 ks-clear"><div class="col-main"><div class="main-wrap J_TRegion" data-id="${layout.main.id}"></div></div><div class="col-sub J_TRegion" data-id="${layout.sub.id}"></div><div class="col-extra J_TRegion" data-id="${layout.extra.id}"></div></div>
	<#break>
	<#case 'grid-m0s5e5'>
	<div class="layout grid-m0s5e5 ks-clear"><div class="col-main"><div class="main-wrap J_TRegion" data-id="${layout.main.id}"></div></div><div class="col-sub J_TRegion" data-id="${layout.sub.id}"></div><div class="col-extra J_TRegion" data-id="${layout.extra.id}"></div></div>
	<#break>
	<#case 'grid-s5e5m0'>
	<div class="layout grid-s5e5m0 ks-clear"><div class="col-main"><div class="main-wrap J_TRegion" data-id="${layout.main.id}"></div></div><div class="col-sub J_TRegion" data-id="${layout.sub.id}"></div><div class="col-extra J_TRegion" data-id="${layout.extra.id}"></div></div>
	<#break>
	<#case 'grid-s310m0e310'>
	<div class="layout grid-s310m0e310 ks-clear"><div class="col-main"><div class="main-wrap J_TRegion" data-id="${layout.main.id}"></div></div><div class="col-sub J_TRegion" data-id="${layout.sub.id}"></div><div class="col-extra J_TRegion" data-id="${layout.extra.id}"></div></div>
	<#break>
</#switch>
</#list>
</#if>