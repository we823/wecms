<?php
	
	$templateName = 'list.html';
	$listUrl = '?m=manage&c=product&a=list';
	$addUrl = '?m=manage&c=product&a=add';
	$editUrl = '?m=manage&c=product&a=edit';
	
	$smarty->assign('listUrl', $listUrl);
	$smarty->assign('addUrl', $addUrl);
	$smarty->assign('editUrl', $editUrl);
	
	switch($a){
		case 'list':
			
			break;
		
		case 'preAdd':
			$templateName = 'preAdd.html';
			break;
		case 'add':
			add($config);
			header('Location:'.$listUrl);
			exit;
			break;
		case 'preEdit':
			preEdit($config, $smarty);
			
			$templateName = 'preEdit.html';
			break;
		case 'edit':
			edit($config);
			header('Location:'.$listUrl);
			exit;
			break;
		case 'del':
			delete($config);
			header('Location:'.$listUrl);
			break;
		case 'getJson':
			getJson($config);
			exit;
			break;
	}
	
	$smarty->display(MANAGE_TEMPLATE_PATH . '/product/'.$templateName);
	
	function add($config){
		require_once SRC_PATH . '/classes/service/product_service.class.php';
		require_once SRC_PATH . '/classes/service/product_photolink_service.class.php';
		
		$title = $_POST['title'];
		$shortTitle = $_POST['shortTitle'];
		$orderid = $_POST['orderid'];
		$linkurl = $_POST['linkurl'];
		$content = $_POST['content'];
		$specialty = $_POST['specialty'];
		$addtime = date("Y-m-d H:i:s");
		
		$photoids = $_POST['photoids'];
		
		$data = array(
		   'title'		=>$title,
		   'short_title'=>$shortTitle,
		   'orderid'	=>$orderid,
		   'linkurl'	=>$linkurl,
		   'content'	=>$content,
		   'specialty'	=>$specialty,
		   'addtime'	=>$addtime
		);
		
		
		$productService = new ProductService($config['db']);
		$id = $productService->insert($data, true);
		
		if(!is_null($photoids) && $id>0){
			
			$productPhotolinkService = new ProductPhotolinkService($config['db']);
			foreach($photoids as $photoid){
				$photo_title = $_POST['photolink-title_'.$photoid];
				$photo_link = $_POST['photolink-linkurl_'.$photoid];
				
				$photolink_data = array(
				   'product_id'=>$id,
				   'title'=>$photo_title,
				   'linkurl'=>$photo_link,
				   'addtime'=>date('Y-m-d H:i:s')
				);
				
				$productPhotolinkService->insert($photolink_data);
			}
		}
	}

   function edit($config){
   	    $id = $_POST['id'];
		$title = $_POST['title'];
		$shortTitle = $_POST['shortTitle'];
		$orderid = $_POST['orderid'];
		$linkurl = $_POST['linkurl'];
		$content = $_POST['content'];
		$specialty = $_POST['specialty'];
		$addtime = $_POST['addtime'];
		$edittime = date("Y-m-d H:i:s");
		$photoids = $_POST['photoids'];
		
		require_once SRC_PATH . '/classes/service/product_service.class.php';
		require_once SRC_PATH . '/classes/service/product_photolink_service.class.php';
		
		$data = array(
		   'title'		=>$title,
		   'short_title'=>$shortTitle,
		   'orderid'	=>$orderid,
		   'linkurl'	=>$linkurl,
		   'content'	=>$content,
		   'specialty'	=>$specialty,
		   'addtime'	=>$addtime
		);
		
		$productService = new ProductService($config['db']);
		$count = $productService->updateById($data, $id);
		
		if(!is_null($photoids) && $count>0){
			
			$productPhotolinkService = new ProductPhotolinkService($config['db']);
			
			$olds = $productPhotolinkService->selectByProductId($id);
			$current = array();
			
			$news = array(); //新增
			$updates = array(); //更新
			$deletes = array(); //删除
			
			//从form表单获取的photolinkid
			foreach($photoids as $photoid){
				$photo_title = $_POST['photolink-title_'.$photoid];
				$photo_link = $_POST['photolink-linkurl_'.$photoid];
				
				$productPhotolink['id']=$photoid;
				$productPhotolink['product_id'] = $id;
				$productPhotolink['title'] = $photo_title;
				$productPhotolink['linkurl'] = $photo_link;
				$productPhotolink['addtime'] = date('Y-m-d H:i:s');
				
				array_push($current, $productPhotolink);
				
				$isnew = true;
				foreach($olds as $old){
					if($old['id']==$photoid){
						$isnew = false;
						array_push($updates, $productPhotolink);
						$productPhotolinkService->updateById($productPhotolink, $photoid);
						break;
					}
				}
				
				if($isnew){
					array_push($news, $productPhotolink);
				    unset($productPhotolink['id']);
					$productPhotolinkService->insert($productPhotolink);
				}
			}
			
			foreach($olds as $old){
				$del = true;
				foreach($current as $c){
					if($c['id']==$old['id']){
						$del = false;
						break;
					}
				}
				if($del){
					array_push($deletes, $old);
					$productPhotolinkService->deleteById($old['id']);
				}
			}
		}
   }

   function delete($config){
	    require_once SRC_PATH . '/classes/service/product_service.class.php';
		require_once SRC_PATH . '/classes/service/product_photolink_service.class.php';
		
		$id = $_GET['id'];
		$productService = new ProductService($config['db']);
		$productService->deleteById($id);
		
		$productPhotolinkService = new ProductPhotolinkService($config['db']);
		$productPhotolinkService->deleteByProductId($id);
   }
   
   function preEdit($config, $smarty){
   	    require_once SRC_PATH . '/classes/service/product_service.class.php';
		require_once SRC_PATH . '/classes/service/product_photolink_service.class.php';
		
		$id = $_GET['id'];
		$productService = new ProductService($config['db']);
		$product = $productService->selectOne($id);
		
		$productPhotolinkService = new ProductPhotolinkService($config['db']);
		$productPhotolinks = $productPhotolinkService->selectByProductId($id);
		
		$smarty->assign('product', $product);
		$smarty->assign('productPhotolinks', $productPhotolinks);
   }
   
   function getJson($config){
   	   require_once SRC_PATH . '/classes/service/product_service.class.php';
	   
	   jsonHeader();
	   
	   $productService = new ProductService($config['db']);
	   $pageRequest = getPageRequest();
	   
	   $products = $productService->selectAll($pageRequest);
	   $count = $productService->getResultCount();
	   
	   echo gridJson($products, $count, $pageRequest);
   }
