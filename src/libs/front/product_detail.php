<?php
	
	require_once SRC_PATH . '/classes/service/product_photolink_service.class.php';
	require_once SRC_PATH . '/classes/service/product_service.class.php';
	
	$id = $_GET['id'];
	
	$hasError = false;
	$message = '';
	
	if(is_null($id)){
		$hasError = true;
		$message = 'id为空，无法获取产品信息';
	}else{
		if(is_numeric($id)){
			$productService = new ProductService($config['db']);
			$product = $productService->selectOne($id);
			if(is_null($product)){
				$hasError = true;
				$message = '未能找到产品信息';
			}
			
			if(!$hasError){
				
				$productPhotolinkService = new ProductPhotolinkService($config['db']);
				$productPhotolinks = $productPhotolinkService->selectByProductId($id);
				
				$hasMore = count($productPhotolinks)>4 ? true : false;
				
				$smarty->assign('product', $product);
				$smarty->assign('hasMore', $hasMore);
				$smarty->assign('productPhotolinks', $productPhotolinks);
			}
		}else{
			$hasError = true;
		    $message = 'id非法，无法获取产品信息';
		}
	}
	
	$smarty->assign('hasError', $hasError);
	$smarty->assign('message', $message);
	
	$smarty->display(TEMPLATE_PATH . '/product_detail.html');