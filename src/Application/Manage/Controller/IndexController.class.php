<?php
namespace Manage\Controller;
use Think\Controller;

define('baseUrl', '.');

class IndexController extends Controller {
    public function index(){
    	$manageUrl = U(C('manage_url'));
		$this->assign('manageUrl', $manageUrl);
    	$this->display();
    }
}