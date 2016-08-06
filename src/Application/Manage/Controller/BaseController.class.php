<?php
	namespace Manage\Controller;
	use Think\Controller;
	
	class BaseController extends Controller{
		
		public function preAdd(){
			$this->display();
		}
		
		public function add(){
			
		}
		
		public function jsonResult($message='结果无异常', $hasError=false){
			$result = array(
			   'message'=>$message,
			   'hasError'=>$hasError
			);
			
			$this->ajaxReturn($result);
		}
	}
