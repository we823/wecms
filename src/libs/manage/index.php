<?php
	/**
	 * 后台控制页面
	 */
	 
	 @session_start();
	 
	 if(!isset($_SESSION['loging']) || $_SESSION['loging']!=1){
	 	header('location: login.html');
	 }
	 
	 if(!defined('IN_WECMS')) die('Access Defined');
	 
	 define('MANAGE_TEMPLATE_PATH', TEMPLATE_PATH.'/../manage/');
	 define('baseUrl', '.');
	 
	 $smarty->assign('baseUrl', baseUrl);

	 if($c=='index'){
	 	 
		 $smarty->assign('username', $_SESSION['username']);
		 index($smarty);
		 
	 }else if($c=='news'){
	 	
	 	require_once SRC_PATH . '/manage/news.php';
	 }else if($c=='product'){
	 	
		require_once SRC_PATH . '/manage/product.php';
	 }else if($c=='user'){
	 	
		require_once SRC_PATH . '/manage/user.php';
	 }else if($c=='config'){
	 	
		require_once SRC_PATH . '/manage/config.php';
	 }else if($c=='logout'){
	 	session_unset();
		session_destroy();
		header('location: login.html');
		exit;
		
	 }else if($c=='about'){
	 	$smarty->display(MANAGE_TEMPLATE_PATH . '/about.html');
	 }else{
	 	
		header('Location: 404.html');
	 }
	 
	 function index($smarty){
	 	$smarty->display(MANAGE_TEMPLATE_PATH . 'index.html');
	 }
	