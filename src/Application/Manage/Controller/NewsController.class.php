<?php
	namespace Manage\Controller;
	
	class NewsController extends BaseController{
		
		public function preEdit(){
			$id = I('id');
			$News = M('News');
			$news = $News->where('id='.$id)->find();
			$this->assign('news', $news);
			$this->display();
		}
		
		public function getJson(){
			$News = M('News');
			
			$start = I('start',0);
			$length = I('length', 10);
			
			$order = I('order');
			$orderColumn = $order[0]['column'];
			$orderDir = $order[0]['dir'];
			$columns = I('columns');
			
			$order = $columns[intval($orderColumn)]['data'].' '.$orderDir;
			//var_dump($columns[intval($orderColumn)]['orderable']);
            if($columns[intval($orderColumn)]['orderable']){
            	$newsList = $News->order($order)->limit($start, $start + $length)->select();
            }else{
            	$newsList = $News->limit($start, $start + $length)->select();
            }
			
			$draw = intval(I('draw', 1));
			
			$result = array(
			  'data'=>array_values($newsList),
			  'recordsFiltered'=>count($newsList),
			  'recordsTotal'=>count($newsList),
			  'draw'=>$draw
			);
			
			echo json_encode($result);
		}
	}
