<?php
	
	namespace Manage\Controller;
	use Think\Controller;
	
	class CommonController extends Controller{
		public function base_css(){
			$this->display();
		}
		
		public function base_js(){
			$this->display();
		}
	}
