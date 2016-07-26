<?php
	
	namespace Home\Controller;
	use Think\Controller;
	
	class LoginController extends Controller{
		
		public function check(){
			$username = request('username');
			$passwd = request('passwd');
			
			$url = 'login.html';
	
			$hasError = false;
			$message = "";
			
			if((empty($username) && strlen($username)==0) || (empty($passwd) && strlen($passwd)==0) ){
				$message = '用户名或密码不能为空';
				$hasError = true;
			}
			$user = null;
			if(!$hasError){
				$User = M('User');
				$user = $User->where('username='.$username.' and passwd='.md5($passwd))->select();
				if(is_null($user) || count($user)==0){
					$message = '用户名或密码错误';
					$hasError = true;
				}
			}
			
			if($hasError){
				$user = $user[0];
	
				$_SESSION['loging'] = 1;
				$_SESSION['username'] = $user['username'];
				
				$hasError = false;
				$message = '登录成功';
				$url = 'index.php?m=manage&c=index&a=index';
			}
			
			$result = array(
			   'hasError'=>$hasError,
			   'message'=>$message,
			   'url'=>$url,
			   'username'=>$username
			);
			jsonHeader();
			echo json_encode($result);
		}
	}
