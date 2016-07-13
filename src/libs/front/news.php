<?php

	require_once SRC_PATH . '/classes/service/news_service.class.php';
	
	$newsService = new NewsService($config['db']);
	
	$page = 1;
	$rows = 10;
	if(!empty($_GET["page"])){
		$page = intval($_GET["page"]);
	}
	if(!empty($_GET["rows"])){
		$rows = (int)$_GET["rows"];
	} 
	
	$sidx = empty($_GET['sidx']) ? 'addtime' : $_GET['sidx'];
	$sord = empty($_GET['sord']) ? 'desc' : $_GET['sord']; 
	
	$pageRequest = array(
	   'page'=>$page,
	   'pageSize'=>$rows,
	   'sidx'=>$sidx,
	   'sord'=>$sord
	);
	
	$newsList = $newsService->selectAll($pageRequest);
	$news = null;
	if(!empty($newsList)){
		$news = $newsList[0];
		if($news['linktype']==1){
			$news = $newsList[1];
		}
	}
	
	$smarty->assign('newsList', $newsList);
	$smarty->assign('firstNews', $news);
	
	$smarty->display(TEMPLATE_PATH . '/news.html');