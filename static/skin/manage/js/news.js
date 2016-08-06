define(function(require, exports, module){
    //require.async(['dataTables-css', 'dataTables-bootstrap', 'dataTables-bootstrap-css']);
	require('dataTables-css');
	var DataTable = require('dataTables');
	
	var common = require('common'),
	    custom_datatables = require('custom_datatables');
	require('colResizable');
	var dt;
	exports.initTable = function(url, editUrl){
		dt = $('#data-table').DataTable({
			'dom':'t<"bottom"ilp<"clear">>',
			'pagingType':'full_numbers',
			'processing':true,
			'serverSide':true,
			'ajax': url,
			'rowId': 'id',
			'order': [[3, 'desc']],
			'columns':[
			   {
			   	'data':'id',
			    'title':'序号'
			   },
			   {'data':'title','title':'标题'},
			   {'data':'hits','title':'点击数'},
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
		            return custom_datatables.getEditButtons('#content-modal', editUrl, row.id);
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
	};
	
	exports.initAddModal = function(){
		
		$('#content-modal').on('shown.bs.modal', function(event){
			var source = $(event.relatedTarget);
			var $this = $(this);
			var url = source.attr('data-url'),
			    title = source.attr('data-title');
            $this.find('.modal-title').html(title);
			$this.find('.modal-body').load(url);

		});
		
	};
	
	exports.changeLinkurl = function(linktype){
		$('input[name=linktype]').on('click', function(){
			var type = $(this).val();
			if(type==0){
				$('#linkurl').hide();
			}else{
				$('#linkurl').show();
			}
		});
		if(linktype){
			if(linktype==0){
				$('#linkurl').hide();
			}else{
				$('#linkurl').show();
			}
		}else{
			$('#linkurl').hide();
		}
		
	};
	
	exports.initEditor = function(){
		UE.getEditor('content_container',{
			width: '500px',
			height: '200px'
		});
	};
	
	exports.addForm = function(editUrl){
		require('validate');
		$('#add-form-data').validate({
			submitHandler: function(form){
				var $form = $(form),
				    action = $form.attr('action'),
				    data = $form.serializeArray();
				$.post(action, data, function(result){
					if(result){
						if(result.hasError){
							alert(result.messsage);
							return false;
						}

						$('#content-modal').modal('hide');
						if(dt){
							dt.ajax.reload();
						}
						return false;
					}
				});
				return false;
			}
		});
	};
	
	exports.editForm = function(){
		require('validate');
		$('#edit-form-data').validate({
			submitHandler: function(form){
				var $form = $(form),
				    action = $form.attr('action'),
				    data = $form.serializeArray();
				$.post(action, data, function(result){
					if(result){
						if(result.hasError){
							alert(result.messsage);
							return false;
						}

						$('#content-modal').modal('hide');
						if(dt){
							dt.ajax.reload();
						}
						return false;
					}
				});
				return false;
			}
		});
	};
	
	exports.delNews = function(delUrl){
		$('#data-table').on('click', '.table-del', function(){
			if(confirm('确定要删除此条新闻吗？')){
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
	}; // delNews
});
