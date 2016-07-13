<?php
	/**
	 * product service
	 */
	 
	 defined('IN_WECMS') or exit('Access Denied');	 
	 
	 require_once SRC_PATH . '/classes/service/base_service.class.php';
	 
	 class ProductService extends BaseService {
		
		public function __construct($config){
			parent::__construct($config, 'product');
		}
		
	 }
	