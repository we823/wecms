<?php
	/**
	 * 首页处理页面
	 */
	 
	 require_once SRC_PATH . '/classes/service/config_service.class.php';
	 
	 $configService = new ConfigService($config['db']);
	 $webConfig = $configService->selectOne(1);
	 $smarty->assign('webConfig', $webConfig);
	 
	 if($c=='index'){
	 	
		require_once SRC_PATH.'/classes/service/product_service.class.php';
		 
		$productService = new ProductService($config['db']);
		$products = $productService->selectAll();
		
		$smarty->assign('products', $products);
	 	$smarty->display(TEMPLATE_PATH.'/index.html');
		
	 }else if($c=='aboutus'){
	 	require_once SRC_PATH . '/front/aboutus.php';
		
	 }else if($c=='contactus'){
	 	require_once SRC_PATH . '/front/contactus.php';
		
	 }else if($c=='product'){
	 	require_once SRC_PATH . '/front/product.php';
		
	 }else if($c=='product_detail'){
	 	require_once SRC_PATH . '/front/product_detail.php';
		
	 }else if($c=='news'){
	 	
		require_once SRC_PATH . '/front/news.php';
	 }else if($c=='get_news'){
	 	
		require_once SRC_PATH . '/front/get_news.php';
		
	 }else{
	 	header('Location: 404.html');
	 }
	