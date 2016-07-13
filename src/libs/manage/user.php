<?php
	
	require_once SRC_PATH . '/classes/service/user_service.class.php';
	
	$templateName = 'list.html';
	$listUrl = '?m=manage&c=user&a=list';
	$addUrl = '?m=manage&c=user&a=add';
	$editUrl = '?m=manage&c=user&a=edit';
	
	$smarty->assign('listUrl', $listUrl);
	$smarty->assign('addUrl', $addUrl);
	$smarty->assign('editUrl', $editUrl);
	
	switch($a){
		case 'list':
			break;
		
		case 'preAdd':
			$templateName = 'preAdd.html';
			break;
		case 'add':
			add($config);
			header('location:'.$listUrl);
			exit;
			break;
		case 'preEdit':
			preEdit($config);
			
			$templateName = 'preEdit.html';
			break;
			
		case 'edit':
			edit($config);
			header('location:'.$listUrl);
			exit;
			break;
		case 'del':
			del($config);
			exit;
			break;
		case 'getJson':
			getJson($config);
			exit;
			break;
	}
	
	$smarty->display(MANAGE_TEMPLATE_PATH . '/user/'.$templateName);
	
	function add($config){
		$username = $_POST['username'];
		$passwd = md5($_POST['passwd']);
		
		$data = array(
		   'username'=>$username,
		   'passwd'=>$passwd,
		   'logins'=>1,
		   'addtime'=>date('Y-m-d H:i:s')
		);
		
		$userService = new UserService($config['db']);
		$userService->insert($data);
	}

    function edit($config){
    	$id = $_POST['id'];
    	$username = $_POST['username'];
		$passwd = md5($_POST['passwd']);
		
		$data = array(
		   'username'=>$username,
		   'passwd'=>$passwd,
		   'logins'=>$_POST['logins'],
		   'addtime'=>$_POST['addtime'],
		   'edittime'=>date('Y-m-d H:i:s')
		);
		
		$userService = new UserService($config['db']);
		$userService->updateById($data, $id);
    }

    function del($config){
    	$userService = new UserService($config['db']);
		$userService->deleteById($_POST['id']);
    }
	
	function getJson($config){

		$userService = new UserService($config['db']);
		
		$pageRequest = getPageRequest();
		$users = $userService->selectAll($pageRequest);
		$count = $userService->getResultCount();
		
		jsonHeader();
		echo gridJson($users, $count, $pageRequest);
	}
