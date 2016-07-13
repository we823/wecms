<?php
	
	require_once SRC_PATH . '/classes/service/base_service.class.php';
	
	class ProductPhotolinkService extends BaseService{
		
		private $dbUtil;
		private $table;
		
		function __construct($config){
			parent::__construct($config, 'product_photo_link');
			$this->dbUtil = parent::getDbUtil();
			$this->table = 'product_photo_link';
		}
		
		function selectByProductId($productId){
			return $this->dbUtil->selectAll('*', $this->table, 'product_id='.$productId);
		}
		
		function deleteByProductId($productId){
			return $this->dbUtil->delete($this->table, 'product_id='.$productId);
		}
	}
