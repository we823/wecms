<?php
	
	require_once 'db_mysqli.class.php';
	
	class DbUtil{
	
	    private $config;
		
		function setConfig($config){
			$this->config = $config;
		}
		
		function connect(){
			$db_mysql = new db_mysqli();
			$db_mysql->open($this->config);
			return $db_mysql;
		}
		
		/**
		 * 执行sql查询
		 * @param $data 		需要查询的字段值[例`name`,`gender`,`birthday`]
		 * @param $table 		数据表
		 * @param $where 		查询条件[例`name`='$name']
		 * @param $limit 		返回结果范围[例：10或10,10 默认为空]
		 * @param $order 		排序方式	[默认按数据库默认方式排序]
		 * @param $group 		分组方式	[默认为空]
		 * @param $key 			返回数组按键名排序
		 * @return array		查询结果集数组
		 */
		function selectAll($data, $table, $where = '', $limit = '', $order = '', $group = '', $key = ''){
			$db_mysql = $this->connect();
			
			$result = $db_mysql->select($data, $table, $where, $limit, $order, $group, $key);
			
			$db_mysql->close();
			
			return $result;
		}
		
		/**
		 * 获取单条记录查询
		 * @param $data 		需要查询的字段值[例`name`,`gender`,`birthday`]
		 * @param $table 		数据表
		 * @param $where 		查询条件
		 * @param $order 		排序方式	[默认按数据库默认方式排序]
		 * @param $group 		分组方式	[默认为空]
		 * @return array/null	数据查询结果集,如果不存在，则返回空
		 */
		function selectOne($data, $table, $where = '', $order = '', $group = ''){
			$db_mysql = $this->connect();
			$result = $db_mysql->get_one($data, $table, $where, $order, $group);
			$db_mysql->close();
			return $result;
		}
		
		/**
		 * 执行添加记录操作
		 * @param $data 		要增加的数据，参数为数组。数组key为字段值，数组值为数据取值
		 * @param $table 		数据表
		 * @return boolean
		 */
		function insert($data, $table, $return_insert_id = false, $replace = false){
			$db_mysql = $this->connect();
			$result = $db_mysql->insert($data, $table, $return_insert_id, $replace);
			
			$db_mysql->close();
			
			return $result;
		}
		
		
		/**
		 * 执行更新记录操作
		 * @param $data 		要更新的数据内容，参数可以为数组也可以为字符串，建议数组。
		 * 						为数组时数组key为字段值，数组值为数据取值
		 * 						为字符串时[例：`name`='phpcms',`hits`=`hits`+1]。
		 *						为数组时[例: array('name'=>'phpcms','password'=>'123456')]
		 *						数组可使用array('name'=>'+=1', 'base'=>'-=1');程序会自动解析为`name` = `name` + 1, `base` = `base` - 1
		 * @param $table 		数据表
		 * @param $where 		更新数据时的条件
		 * @return boolean
		 */
		function update($data, $table, $where = ''){
			$db_mysql = $this->connect();
			$result = $db_mysql->update($data, $table, $where);
			$db_mysql->close();
			
			return $result;
		}
		
		/**
		 * 执行删除记录操作
		 * @param $table 		数据表
		 * @param $where 		删除数据条件,不充许为空。
		 * 						如果要清空表，使用empty方法
		 * @return boolean
		 */
		function delete($table, $where){
			$db_mysql = $this->connect();
			$result = $db_mysql->delete($table, $where);
			$db_mysql->close();
			return $result;
		}
		
		function getResultCount($table){
			$db_mysql = $this->connect();
			$result = $db_mysql->select('count(*) as count', $table);
			if(!is_null($result) && count($result)>0){
				if(isset($result[0]['count'])){
					return $result[0]['count'];
				}
			}
			return 0;
		}
	}
	
	