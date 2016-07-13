<?php
	
	require_once SRC_PATH . '/classes/service/base_service.class.php';
	
	class NewsService extends BaseService{
		
		private $dbUtil;
		private $table;
		function __construct($config){
			parent::__construct($config, 'news');
			$this->dbUtil = parent::getDbUtil();
			$this->table = 'news';
		}
		
		function updateHit($hits, $id){
			$data = array(
			   'hits' => $hits
			);
			
			return $this->dbUtil->update($data, $this->table, 'id='.$id);
		}
	}
