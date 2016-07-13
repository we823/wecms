<?php
	
	 require_once SRC_PATH . '/classes/common/db_util.class.php';
	 
	class BaseService{
		
		private $dbUtil;
		private $config;
		private $table;
		
		function __construct($config, $table){
			$this->dbUtil = new DbUtil;
			$this->config = $config;
			$this->dbUtil->setConfig($config);
			$this->table = $table;
		}
		
		public function getDbUtil(){
			return $this->dbUtil;
		}
		
		public function insert($data, $return_insert_id=false){
			return $this->dbUtil->insert($data, $this->table, $return_insert_id);
		}
		
		public function deleteById($id){
			return $this->dbUtil->delete($this->table, 'id='.$id);
		}
		
		public function selectAll($pageRequest=null){
			
			$order = '';
			$limit = '';
			$where = '';
			if($pageRequest != null){
				if(!empty($pageRequest['sidx'])){
					$order = $pageRequest['sidx'].' '.$pageRequest['sord'];
				}
				
				if(isset($pageRequest['page'])){
					$limit = (($pageRequest['page']-1)*$pageRequest['pageSize']).' ,'.$pageRequest['pageSize'];
				}
				
			}
			
			return $this->dbUtil->selectAll('*', $this->table, $where, $limit, $order );
		}
		
		public function selectOne($id){
			return $this->dbUtil->selectOne('*', $this->table, 'id='.$id);
		}
		
		public function updateById($data, $id){
			return $this->dbUtil->update($data, $this->table, 'id='.$id);
		}
		
		public function getResultCount(){
			return $this->dbUtil->getResultCount($this->table);
		}
	
	}
