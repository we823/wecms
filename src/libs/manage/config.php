<?php
	
	$id = $_GET['id'];
	
	require_once SRC_PATH . '/classes/service/config_service.class.php';
	$configService = new ConfigService($config['db']);
	
	if($a=='preEdit'){

		$webConfig = $configService->selectOne($id);
		$smarty->assign('webConfig', $webConfig);
		
		$smarty->display(MANAGE_TEMPLATE_PATH . '/config/preEdit.html');
	}else if($a=='edit'){
		$id 			= $_POST['id'];
		$webname 		= $_POST['webname'];
		$copyright 		= $_POST['copyright'];
		$short_about 	= $_POST['short_about'];
		$full_about 	= $_POST['full_about'];
		$contactus 		= $_POST['contactus'];
		$hit 			= $_POST['hit'];
		$keywords 		= $_POST['keywords'];
		$description 	= $_POST['description'];
		
		$data = array(
		    'webname'=>$webname,
		    'copyright'=>$copyright,
		    'short_about'=>$short_about,
		    'full_about'=>$full_about,
		    'contactus'=>$contactus,
		    'hit'=>$hit,
		    'keywords'=>$keywords,
		    'description'=>$description
		);
		
		$configService->updateById($data, $id);
		
		header('Location:?m=manage&c=config&a=preEdit&id='.$id);
	}
	