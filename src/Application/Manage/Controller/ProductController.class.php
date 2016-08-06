<?php
	namespace Manage\Controller;
	
	class ProductController extends BaseController{
		
		public function add(){
			$Product = M('Product');
			$Product->create();
			$Product['addtime'] = date('Y-m-d H:i:s');
			$id = $Product->add();
			
			if($id>0){
				
				parent::jsonResult();
			}else{
				parent::jsonResult('增加产品信息失败', true);
			}
		}
		
		public function preEdit(){
			$id = I('id');
			if(is_null($id) || !is_numeric($id)){
				parent::jsonResult('产品ID错误，无法修改', true);
			}
			
			$Product = M('Product');
			$product = $Product->where('id='.$id)->find();
			
			$ProductPhotolink = M('ProductPhotoLink');
			$ProductPhotolinks = $ProductPhotolink->where('product_id='.$id)->select();
			
			$this->assign('product', $product);
			$this->assign('productPhotolinks', $ProductPhotolinks);
			
			$this->display();
		}
		
		public function edit(){
			$id = I('id');
			
			$Product = M('Product');
			$Product->create();
			$Product['edittime'] = date('Y-m-d H:i:s');
			
			$result = $Product->save($id);
			if($result===false){
				parent::jsonResult('更新产品信息失败', true);
			}
			
			parent::jsonResult();
		}
		
		public function del(){
			$id = I('id');
			if(is_null($id) || !is_numeric($id)){
				parent::jsonResult('产品ID错误，无法删除', true);
			}
			
			$Product = M('Product');
			$result = $Product->delete($id);
			if($result === FALSE){
				parent::jsonResult('产品ID删除失败', true);
			}
			
			parent::jsonResult('产品ID删除成功');
		}
		
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
			
			$this->ajaxReturn($result);
		}
	}
