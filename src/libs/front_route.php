<?php
	/**
	 * 前端路由
	 */
	 
	 $m = isset($_GET['m']) ? $_GET['m'] : 'index'; //模块
	 $c = isset($_GET['c']) ? $_GET['c'] : 'index'; //控制器
	 $a = isset($_GET['a']) ? $_GET['a'] : 'index'; //方法
	 
	 
	 if($m=='index'){
	 	require_once SRC_PATH.'/front/index.php';
		 
	 }else if($m=='manage'){
	 	require_once SRC_PATH.'/manage/index.php';
		
	 }else if($m=='upload'){
	 	require_once SRC_PATH . '/upload/upload.php';
		exit();
	 }else if($m=='login'){
	 	
		require_once SRC_PATH . '/manage/login.php';
		exit;
	 }else{
	 	header('Location: 404.html');
	 }
