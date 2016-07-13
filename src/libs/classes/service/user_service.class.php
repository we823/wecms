<?php
	
	require_once SRC_PATH . '/classes/service/base_service.class.php';
	
	class UserService extends BaseService{
		
		private $dbUtil;
		private $table = 'manager';
		
		function __construct($config){
			parent::__construct($config, $this->table);
			$this->dbUtil = parent::getDbUtil();
		}
		
		function selectByUsernameAndPasswd($username, $passwd){
			$passwd = md5($passwd);
			
			$where = "username='$username' and passwd='$passwd'";
			
			return $this->dbUtil->selectAll('*', $this->table, $where);
		}
	}
