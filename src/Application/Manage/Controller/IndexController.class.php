<?php
namespace Manage\Controller;
use Think\Controller;

define('baseUrl', '.');

class IndexController extends Controller {
    public function index(){
    	$this->display();
    }
}