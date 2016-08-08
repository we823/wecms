define(function(require, exports, module){
    require('dataTables-css');
	var DataTable = require('dataTables');
	
	var common = require('common'),
	    custom_datatables = require('custom_datatables'),
	    custom_uploader = require('custom_uploader');
	require('colResizable');
	var dt;
    
	exports.initTable = function(editUrl, jsonUrl, delUrl){
		dt = $('#data-table').DataTable({
			'dom':'t<"bottom"ilp<"clear">>',
			'pagingType':'full_numbers',
			'processing':true,
			'serverSide':true,
			'ajax': jsonUrl,
			'rowId': 'id',
			'columns':[
			   {
			   	'data':'id',
			    'title':'序号'
			   },
			   {'data':'title','title':'标题'},
			   {'data':'short_title','title':'简称'},
			   {'data':'addtime','title':'添加时间'},
			   {'class':'details-control',
			   	'data': null,
			    'defaultContent': '',
			    'title':'操作',
			    'orderable': false
			   }
			],
			'columnDefs': [{
		        //   指定第4列，从0开始，0表示第一列，1表示第二列……
		        targets: 4,
		        render: function(data, type, row, meta) {
		            return custom_datatables.getEditButtons('#content-modal', editUrl, row.id, '产品修改');
		        }
		    }],
			"language": custom_datatables.dataTables_cn(),
			'initComplete': function(){
				$('div.toolbar').html('<button class="btn btn-primary btn-sm">新增</button>');
				$('#data-table').colResizable({
					liveDrag:true
				});
			}
		});
		
		// 初始化modal相关信息
		common.initModalInfo();
		exports.delProduct(delUrl);
	};
	
	exports.initAddForm = function(base, uploadUrl){
		UE.getEditor("content_container");
		UE.getEditor("specialty_container");
		
		custom_uploader.init('linkurl', 'upload-linkurl', base, uploadUrl);
		exports.addProduct(base, uploadUrl);
	};
	
	exports.initEditForm = function(base, uploadUrl){
		UE.getEditor("content_container");
		UE.getEditor("specialty_container");
		
		custom_uploader.init('linkurl', 'upload-linkurl', base, uploadUrl);
		exports.addProduct(base, uploadUrl);
	};
	
	exports.addProduct = function(base, uploadUrl){
		var laytpl = require('laytpl');
		$('#button-add-product').on('click', function(){
			var $list = $('.photo-list'),
		        tpl = document.getElementById('photolink_template').innerHTML,
			    data = {
				    time: new Date().getTime()
			     };
			laytpl(tpl).render(data, function(html){
				$list.append(html);
				custom_uploader.init("photolink-linkurl_"+data.time,"upload-"+data.time,base, uploadUrl);
			});
		});
		
	};
	
	exports.delProduct = function(delUrl){
		$('#data-table').on('click', '.table-del', function(){
			if(confirm('确定要删除此产品信息吗？')){
				var $this = $(this),
			    id = $this.attr('data-id');
				$.post(delUrl, {id: id}, function(result){
					if(result){
						if(result.hasError){
							alert(result.message);
						}else{
							if(dt){
								dt.ajax.reload();
							}
						}
					}
				});
			}
			
		});
	}; // delProduct
});