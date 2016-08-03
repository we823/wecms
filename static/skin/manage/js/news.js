define(function(require, exports, module){
    //require.async(['dataTables-css', 'dataTables-bootstrap', 'dataTables-bootstrap-css']);
	require('dataTables-css');
	var DataTable = require('dataTables');
	
	var common = require('common'),
	    custom_datatables = require('custom_datatables');
	require('colResizable');
    
	exports.initTable = function(url, editUrl){
		$('#data-table').DataTable({
			'dom':'t<"bottom"ilp<"clear">>',
			'pagingType':'full_numbers',
			'processing':true,
			'serverSide':true,
			'ajax': url,
			'rowId': 'id',
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
		            return custom_datatables.getEditButtons(row.id);
		        }
		    }],
			"language": custom_datatables.dataTables_cn(),
			'initComplete': function(){
				$('div.toolbar').html('<button class="btn btn-primary btn-sm">新增</button>');
				$('#data-table').colResizable({
					liveDrag:true
				});
				
				var tableEdits = $('#data-table .table-edit');
				if(tableEdits){
					$.each(tableEdits, function(index,tableEdit){
						var $tableEdit = $(tableEdit),
						    id = $tableEdit.attr('data-id');
						$tableEdit.attr('data-toggle', 'modal').attr('data-target','#content-modal');
						$tableEdit.attr('data-title','新闻修改').attr('data-url',editUrl+'?id='+id);
					} );
				}
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
});
