<?php
	
	require_once SRC_PATH . '/classes/service/news_service.class.php';
	
	header("Content-type: application/json; charset=utf-8");
	
	$id = $_GET['id'];
	if(!is_null($id) && is_numeric($id)){
		$hasError = false;
		
		$newsService = new NewsService($config['db']);
		
		$news = $newsService->selectOne($id);
		$hits = intval($news['hits']);
		
		$newsService->updateHit($hits+1, $id);
		
		if(is_null($news)){
			$hasError = true;
		}
		
		
		if($hasError){
			$result = array(
			  'hasError'=>$hasError
			);
			
			echo json_encode($result);
		}else{
			$result = array(
			   'hasError'=>$hasError,
			   'datas'=>$news
			);

			echo json_encode($result);
		}
	}
