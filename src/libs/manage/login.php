<?php
	
	defined('IN_WECMS') or die('Access Denied!');
	
	@session_start();
	
	$username = $_POST['username'];
	$passwd = $_POST['password'];
	
	$url = 'login.html';
	
	$hasError = false;
	$message = "";
	
	if((empty($username) && strlen($username)==0) || (empty($passwd) && strlen($passwd)==0) ){
		$message = '用户名或密码不能为空';
		$hasError = true;
	}
	
	if(!$hasError){
		require_once SRC_PATH . '/classes/service/user_service.class.php';
	
		$userService = new UserService($config['db']);
		$user = $userService->selectByUsernameAndPasswd($username, $passwd);
		if(is_null($user) || count($user)==0){
			$message = '用户名或者密码错误';
			$hasError = true;
		}
	}
	
	if(!$hasError){
		$user = $user[0];
	
		$_SESSION['loging'] = 1;
		$_SESSION['username'] = $user['username'];
		
		$hasError = false;
		$message = '登录成功';
		$url = 'index.php?m=manage';
	}
	
	$result = array(
	   'hasError'=>$hasError,
	   'message'=>$message,
	   'url'=>$url,
	   'username'=>$username
	);
	
	jsonHeader();
	echo json_encode($result);
