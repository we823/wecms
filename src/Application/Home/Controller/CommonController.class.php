<?php
	namespace Home\Controller;
	use Think\Controller;
	
	class CommonController extends Controller{
		public function header(){
			$webname = C('webname');
			$this->assign('webname', $webname);
			$this->display();
		}
		
		public function footer(){
			$this->display();
		}
	}
