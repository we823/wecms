<?php

	require_once SRC_PATH . '/classes/service/product_service.class.php';
	
	$productService = new ProductService($config['db']);
	
	$pageRequest = array(
	   'sidx'=>'orderid',
	   'sord'=>'asc'
	);
	
	$products = $productService->selectAll($pageRequest);

	$smarty->assign('products', $products);
	
	$smarty->display(TEMPLATE_PATH . '/product.html');