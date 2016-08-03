<?php
	namespace Manage\Controller;
	
	class ProductController extends BaseController{
		
		public function getJson(){
			$Product = M('Product');
			
			$start = I('start',0);
			$length = I('length', 10);
			
			$order = I('order');
			$orderColumn = $order[0]['column'];
			$orderDir = $order[0]['dir'];
			$columns = I('columns');
			
			$order = $columns[intval($orderColumn)]['data'].' '.$orderDir;
			//var_dump($columns[intval($orderColumn)]['orderable']);
            if($columns[intval($orderColumn)]['orderable']){
            	$productList = $Product->order($order)->limit($start, $start + $length)->select();
            }else{
            	$productList = $Product->limit($start, $start + $length)->select();
            }
			
			$count = $Product->count();
			$draw = intval(I('draw', 1));
			
			$result = array(
			  'data'=>array_values($productList),
			  'recordsFiltered'=>$count,
			  'recordsTotal'=>count($productList),
			  'draw'=>$draw
			);
			
			echo json_encode($result);
		}
	}
