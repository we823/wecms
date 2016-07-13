<?php
	/**
	 * 系统初始化信息文件
	 */
	 
	 define('IN_WECMS', true);
	 define('ROOT_PATH', dirname(__FILE__));
	 
	 include ROOT_PATH.DIRECTORY_SEPARATOR.'config.php';
	 include ROOT_PATH.DIRECTORY_SEPARATOR.'/src/base.inc.php';
	 include_once SRC_PATH . '/function/common.function.php';
	 include_once ROOT_PATH.DIRECTORY_SEPARATOR.'/src/libs/front_route.php';
	 
	 if($config['debug']==false){
	 	error_reporting(0);
	 }else{
	 	ini_set('display_errors', 1);
		error_reporting(E_ALL & ~E_NOTICE);
	 }
	