<?php
	
	include_once SRC_PATH . '/upload/Uploader.class.php';
	
	$uploadConfig = SRC_PATH.'/upload/config.json';
	
	$CONFIG = json_decode(preg_replace("/\/\*[\s\S]+?\*\//", "", file_get_contents($uploadConfig)), true);
	
	$base64='upload';
	switch(htmlspecialchars($_GET['f'])){
		case 'files':
			$config = array(
               "pathFormat" => $CONFIG['filePathFormat'],
               "maxSize" => $CONFIG['fileMaxSize'],
               "allowFiles" => $CONFIG['fileAllowFiles']
	        );
	        $fieldName = $CONFIG['fileFieldName'];
			break;
		case 'img':
			$config = array(
            "pathFormat" => $CONFIG['imagePathFormat'],
            "maxSize" => $CONFIG['imageMaxSize'],
            "allowFiles" => $CONFIG['imageAllowFiles']
	        );
	        $fieldName = $CONFIG['imageFieldName'];
			break;
	}
	
	$up = new Uploader($fieldName, $config, $base64);
	
	$result = $up->getFileInfo();
	$result['hasError'] = false;
	$result['filename']=$result['url'];
	$result['originalFilename']=$result['original'];
	$result['message']=$result['state'];
	echo json_encode($result);
