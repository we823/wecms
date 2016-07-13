<?php
	
	$templateName = 'list.html';
	$listUrl = '?m=manage&c=news&a=list';
	$editUrl = '?m=manage&c=news&a=edit';
	$addUrl = '?m=manage&c=news&a=add';
	
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
			header('Location:'.$listUrl);
			exit;
			break;
		case 'preEdit':
			preEdit($config, $smarty);
			
			$templateName = 'preEdit.html';
			break;
			
		case 'edit':
			edit($config);
			header('Location:'.$listUrl);
			exit();
			break;
		case 'del':
			delete($config);
			header('Location:'.$listUrl);
			exit();
			break;
		case 'getJson':
			getJson($config);
			exit();
			break;
	}
	
	$smarty->display(MANAGE_TEMPLATE_PATH . '/news/'.$templateName);
	
	function add($config){
		$data = array(
		   'title'=>$_POST['title'],
		   'linktype'=>$_POST['linktype'],
		   'content'=>$_POST['content'],
		   'linkurl'=>$_POST['linkurl'],
		   'addtime'=>$_POST['addtime'],
		   'hits'=>1
		);
		
		require_once SRC_PATH . '/classes/service/news_service.class.php';
		$newsService = new NewsService($config['db']);
		$newsService->insert($data);
	}
	
	function preEdit($config, $smarty){
		require_once SRC_PATH . '/classes/service/news_service.class.php';
		
		$id = $_GET['id'];
		$newsService = new NewsService($config['db']);
		$news = $newsService->selectOne($id);
		$smarty->assign('news', $news);
	}
	
	function edit($config){
		$id = $_POST['id'];
		$data = array(
		   'title'=>$_POST['title'],
		   'linktype'=>$_POST['linktype'],
		   'content'=>$_POST['content'],
		   'linkurl'=>$_POST['linkurl'],
		   'addtime'=>$_POST['addtime'],
		   'edittime'=>$_POST['edittime'],
		   'hits'=>$_POST['hits']
		);
		
		require_once SRC_PATH . '/classes/service/news_service.class.php';
		$newsService = new NewsService($config['db']);
		$newsService->updateById($data, $id);
	}
	
	function delete($config){
		$id = $_GET['id'];
		
		require_once SRC_PATH . '/classes/service/news_service.class.php';
		$newsService = new NewsService($config['db']);
		$newsService->deleteById($id);
	}
	
	function getJson($config){
		require_once SRC_PATH . '/classes/service/news_service.class.php';
		
		jsonHeader();
		
		$newsService = new NewsService($config['db']);
		
		$pageRequest = getPageRequest();

		$newsList = $newsService->selectAll($pageRequest);
		$count = $newsService->getResultCount();
		
		echo gridJson($newsList, $count, $pageRequest);
	}
