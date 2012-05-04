<?php
require_once 'greader.class.php';
function initReader() {
	return new JDMReader('fxy060608@gmail.com', 'iloveyou0404');
}
function listAll() {
	$reader = initReader();
	print_r($reader->listAll());
}
function listUnread($limit = 40) {
	$reader = initReader($limit);
	print_r($reader->listUnread($limit));
}