<?php
	
	namespace Manage\Controller;
	
	use Think\Controller;
	
	class UploaderController extends Controller{
		public function index(){
   
			$uploadConfig = MODULE_PATH .'/Controller/config.json';
			$CONFIG = json_decode(preg_replace("/\/\*[\s\S]+?\*\//", "", file_get_contents($uploadConfig)), true);
			
			$base64='upload';
			switch(htmlspecialchars($_GET['f'])){
				case 'files':
					$config = array(
		               "pathFormat" => __ROOT__.$CONFIG['filePathFormat'],
		               "maxSize" => $CONFIG['fileMaxSize'],
		               "allowFiles" => $CONFIG['fileAllowFiles']
			        );
			        $fieldName = $CONFIG['fileFieldName'];
					break;
				case 'img':
				default:
					$config = array(
			            "pathFormat" => __ROOT__.$CONFIG['imagePathFormat'],
			            "maxSize" => $CONFIG['imageMaxSize'],
			            "allowFiles" => $CONFIG['imageAllowFiles']
			        );
			        $fieldName = $CONFIG['imageFieldName'];
					break;
			}
			
			$up = new \Com\Zhang\Uploader($fieldName, $config, $base64, $_FILES);
			
			$result = $up->getFileInfo();
			$result['hasError'] = false;
			$result['filename']=$result['url'];
			$result['originalFilename']=$result['original'];
			$result['message']=$result['state'];
			
			$this->ajaxReturn($result);
		}
	}
