<?php
	
	define('PC_PATH', dirname(__FILE__).DIRECTORY_SEPARATOR);
	
	
	if(!defined('ROOT_PATH')) define('ROOT_PATH', PC_PATH.'..'.DIRECTORY_SEPARATOR);
	
	require_once SRC_PATH.'/smarty/Smarty.class.php';
	
	$smarty = new Smarty;
	$smarty->setTemplateDir(TEMPLATE_PATH);
	$smarty->assign('skin_path', SKIN_PATH);
