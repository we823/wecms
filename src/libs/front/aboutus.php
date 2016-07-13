<?php
	
	require_once SRC_PATH . '/classes/service/product_service.class.php';
		
	$productService = new ProductService($config['db']);
	
	$products = $productService->selectAll();
	
	$smarty->assign('products', $products);
	
	$smarty->display(TEMPLATE_PATH . '/aboutus.html');
