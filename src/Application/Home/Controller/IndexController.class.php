<?php
namespace Home\Controller;
use Think\Controller;
class IndexController extends Controller {
	
    public function index(){
    	$this->getWebConfig();

        $this->getProducts();
    	$this->display('index');
    }
	
	public function aboutus(){
		$this->getWebConfig();
		$this->getProducts();
		
		$this->display('aboutus');
	}
	
	public function news(){
		$this->getWebConfig();
		
		$page = 1;
		$rows = 10;
		if(!empty($_GET["page"])){
			$page = intval($_GET["page"]);
		}
		if(!empty($_GET["rows"])){
			$rows = (int)$_GET["rows"];
		}
	    
		$sidx = empty($_GET['sidx']) ? 'addtime' : $_GET['sidx'];
	    $sord = empty($_GET['sord']) ? 'desc' : $_GET['sord'];
	
		$News = M('News');
		$newsList = $News->order("$sidx $sord")->page($page, $rows)->select();
		
		$news = null;
		if(!empty($newsList) && count($newsList)>0){
			$news = $newsList[0];
			if($news['linktype']==1){
				$news = $newsList[1];
			}
		}
	
		$this->assign('newsList', $newsList);
		$this->assign('firstNews', $news);
		
		$this->display('news');
	}
	
	public function get_news(){
		$News = M('News');
		
		$id = $_GET['id'];
		
		$result = array();
		
		$hasError = false;
		$message = '';
		
		if(is_null($id) || !is_numeric($id)){
			$hasError = true;
			$message = 'ID信息错误';
			
			$result['hasError'] = $hasError;
			$result['message'] = $message;
			
			$this->ajaxReturn($result);
			exit;
		}
		
		$news = $News->where('id='.$_GET['id'])->find();
        
		if(is_null($news) || empty($news)){
			$hasError = true;
			$message = '未能找到信息相关信息';
			
			$result['hasError'] = $hasError;
			$result['message'] = $message;
			
			$this->ajaxReturn($result);
			exit;
		}
		
		$hits = intval($news['hits']);
		
		$News->where('id='.$id)->setField('hits', $hits+1);
		
		$result['datas'] = $news;
		$result['hasError'] = $hasError;
		$result['message'] = message;
		
		$this->ajaxReturn($result);
	}
	
	function product(){
		$this->getWebConfig();
		
		$this->getProducts();
		
		$this->display('product');
	}
	
	function product_detail(){
		
		$template = 'product_detail';
		
		$id = $_GET['id'];
		
		if(is_null($id) || !is_numeric($id)){
			$this->showResult($template, 'ID信息错误');
			exit;
		}
		$Product = M('Product');
		
		$product = $Product->where('id='.$id)->find();
		
		if(is_null($product) || empty($product)){
			$this->showResult($template, '未能找到产品信息');
			exit;
		}
		
		
		$ProductPhotoLink = M('ProductPhotoLink');
		$productPhotolinks = $ProductPhotoLink->where('product_id='.$id)->select();
		
		$hasMore = count($productPhotolinks)>4;
		
		$this->assign('products', $Product->select());
		$this->assign('product', $product);
		$this->assign('hasMore', $hasMore);
		$this->assign('productPhotolinks', $productPhotolinks);
		
		$this->display($template);
	}
	
	private function getWebConfig(){
		$Config = M('config');
		$webConfigs = $Config->where('id=1')->select();
		if(count($webConfigs) >	0){
			$this->assign('webConfig', $webConfigs[0]);
		}
	}
	
	private function getProducts(){
		$Product = M('product');
		$products = $Product->select();
		
		foreach($products as $k=> & $product){
			
			$linkurl = $product['linkurl'];

			$hasHttp = 1; //地址中包含http
			
			if(strpos($linkurl, 'http') === false){
				$hasHttp = 0;
			}
			
			if($hasHttp === 0){
				$b = (strpos($linkurl, '/')===0); //以斜线开头的绝对路径
				if($b == false){
					$linkurl = '/'.$linkurl;
				}

				$linkurl = C('base') . $linkurl;
			}
			
			$product['linkurl'] = $linkurl;
		}
		
		$this->assign('products', $products);
	}
	
	private function showResult($url, $message = '未知错误', $hasError = true){
		$this->assign('hasError', $hasError);
		$this->assign('message', $message);
		
		$this->display($url);
	}
}