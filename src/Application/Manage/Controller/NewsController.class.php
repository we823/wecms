<?php
	namespace Manage\Controller;
	
	class NewsController extends BaseController{
		public function add(){
			$News = M('News');
			$News->create();
			$id = $News->add();
			
			$hasError = false;
			$message = '无错误';
			if($id<=0){
				$hasError = true;
				$message = '新增新闻发生错误';
			}
			
			$result = array(
			  'hasError'=>$hasError,
			  'message'=>$message
			);
			
			echo json_encode($result);
		}
		public function preEdit(){
			$id = I('id');
			$News = M('News');
			$news = $News->where('id='.$id)->find();
			$this->assign('news', $news);
			$this->display();
		}
		
		public function edit(){
			$News = M('News');
			$News->create();
			$id = I('id');
			
			$hasError = false;
			$message = '新闻更新成功';
			if(is_null($id) || !is_numeric($id)){
				$hasError = true;
				$message = '新闻ID错误, 无法更新';
			}else{
				$updateCount = $News->where('id='.$id)->save();
				if($updateCount===false){
					$hasError = true;
				    $message = '新闻更新失败';
				}
			}
			
			$result = array(
			  'hasError'=>$hasError,
			  'message'=>$message
			);
			
			echo json_encode($result);
		}
		public function delete(){
			$id = I('id');
			$hasError = false;
			$message = '';
			if(is_numeric($id)){
				$News = M('News');
				$row = $News->delete($id);
				if($row>0){
					$message = "删除成功";
				}else{
					$hasError = true;
					$message = '删除记录号：'.$id.'未成功';
				}
			}else{
				$hasError = true;
				$message = '主键不正确，无法删除';
			}
			
			$result = array(
			   'hasError'=>$hasError,
			   'message'=>$message
			);
			
			echo json_encode($result);
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
