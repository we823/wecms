<?php
	
	function getPageRequest(){
		$page = 1;
		$rows = 10;
		if(!empty($_GET["page"])){
			$page = intval($_GET["page"]);
		}
		if(!empty($_GET["rows"])){
			$rows = (int)$_GET["rows"];
		} 
		
		
		$sidx = empty($_GET['sidx']) ? 'addtime' : $_GET['sidx'];
		$sord = empty($_GET['sord']) ?  'desc' : $_GET['sord'] ; 
		
		$pageRequest = array(
		   'page'=>$page,
		   'pageSize'=>$rows,
		   'sidx'=>$sidx,
		   'sord'=>$sord
		);
		
		return $pageRequest;
	}
	
	function jsonHeader(){
		header("Content-type: application/json; charset=utf-8");
	}
	
	/**
	 * $datarows: 数据数组
	 * $rows: 总数据行数
	 * $pageSize:每页的条数
	 * $page: 当前页码
	 */
	function gridJson($dataRows, $rows=0, $pageRequest=null, $pageSize=10, $page=1){
		if(is_null($dataRows)){
			$dataRows = array();
		}
		
		if(!is_null($pageRequest)){
			$pageSize = intval($pageRequest['pageSize']);
			$page = intval($pageRequest['page']);
		}
		
		$rows = ($rows==0) ? count($dataRows) : $rows;

		$total = ceil($rows/$pageSize);
		
		$result = array(
		   'datarows'=>$dataRows,
		   'records'=>$rows,
		   'total'=>$total,
		   'page'=>$page
		);
		
		return json_encode($result);
	}
	
	function showAlert($message){
		echo "<script>alert('$message');</script>";
	}
