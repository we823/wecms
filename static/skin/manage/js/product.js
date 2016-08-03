define(function(require, exports, module){
    require.async(['dataTables-css', 'dataTables-bootstrap', 'dataTables-bootstrap-css']);
	var DataTable = require('dataTables');
    
	exports.initTable = function(url){
		$('#data-table').DataTable({
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
		            return getEditButtons(row.id);
		        }
		    }],
			"language": dataTables_cn()
		});
	};
});