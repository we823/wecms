<?php

function request($name, $method = 'request', $default = '') {
	$method = strtolower($method);
	switch($method) {
		case 'get' :
			return isset($_GET[$name]) ? $_GET[$name] : $default;
			break;
		case 'post' :
			return isset($_POST[$name]) ? $_POST[$name] : $default;
			break;
		default :
			return isset($_REQUEST[$name]) ? $_REQUEST[$name] : $default;
	}
}

function jsonHeader(){
	header('content-type: application/json; charset=utf-8');
}
