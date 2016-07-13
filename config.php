<?php
	/**
	 * 系统配置文件
	 */
	 
	 defined('IN_WECMS') or exit('Access Denied');
	 
	 $config['debug'] = true;
	 $config['template_name'] = 'default';
	 $config['skin_name'] = 'default';
	 $config['webname'] = '上海臺蓬機械設備有限公司';
	 
	 $config['db'] = array(
		   'hostname' => '120.24.87.82',
		   'username' => 'root',
		   'password' => 'ZhaowenYuYu2015',
		   'database' => 'taipeng_cms',
		   'charset' => 'utf8',
		   'port' => 3306,
		   'debug' => true,
		   'autoconnect' => 1
	 );
	 
	 
	 
	 
	define('TEMPLATE_PATH', ROOT_PATH.'/template/'.$config['template_name']);
	define('SRC_PATH', ROOT_PATH.'/src/libs');
	define('SKIN_PATH', 'static/skin/'.$config['skin_name']);
	 
	 
	