define(function(require, exports, module){
	exports.dataTables_cn = function(){
		return {
			"sProcessing":   "处理中...",
			"sLengthMenu":   "显示 _MENU_ 条记录",
			"sZeroRecords":  "没有匹配的记录",
			"sInfo":         "第 _START_ 至 _END_ 条记录，共 _TOTAL_ 条",
			"sInfoEmpty":    "暂无记录",
			"sInfoFiltered": "(由 _MAX_ 条记录过滤)",
			"sInfoPostFix":  "",
			"sSearch":       "搜索:",
			"sUrl":          "",
			"sEmptyTable":     "表中数据为空",
			"sLoadingRecords": "载入中...",
			"sInfoThousands":  ",",
			"oPaginate": {
				"sFirst":    "首页",
				"sPrevious": "上页",
				"sNext":     "下页",
				"sLast":     "末页"
			},
			"oAria": {
				"sSortAscending":  ": 以升序排列此列",
				"sSortDescending": ": 以降序排列此列"
			}
		};
	};
	
	exports.getEditButtons = function(modalName, editUrl, id, title){
		var $buttons = '<a href="#" data-id="'+id+'" data-toggle="modal" data-target="'+ modalName +'" data-url="'+editUrl+'?id='+id+'" data-title="'+(title||'新闻修改')+'" class="table-edit btn btn-primary btn-sm"><i class="fa fa-pencil"></i> 编辑</a>'
		              +'  <a href="javascript:void(0)" data-id="'+id+'" class="table-del btn btn-danger btn-sm"><i class="fa fa-remove"></i> 删除</a>';
	    return $buttons;
	};
});
