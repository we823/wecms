<?php
	namespace Manage\Controller;
	use Think\Controller;
	
	class BaseController extends Controller{
		
		public function preAdd(){
			$this->display();
		}
		
		public function add(){
			
		}
	}
