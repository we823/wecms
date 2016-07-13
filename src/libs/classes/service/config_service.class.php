<?php
	
	require_once SRC_PATH . '/classes/service/base_service.class.php';
	
	class ConfigService extends BaseService{
		
		function __construct($config){
			parent::__construct($config, 'config');
		}
	}
