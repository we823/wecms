seajs.config({
	alias: {
		'jquery': jqueryPath,
		'bootstrap': 'asset/bootstrap/3.3.7/js/bootstrap_cmd.min',
		'adminlte':'asset/adminlte/2.3.5/js/app_cmd.min',
		'webuploader': 'asset/webuploader/webuploader',
		'webuploader-css': 'asset/webuploader/webuploader.css',
		'validate':'asset/validate/1.15.1/jquery.validate.min',
		'validate-additional':'asset/validate/1.15.1/additional-methods.min',
		'icheck': 'asset/iCheck/icheck',
		
		'font-awesome-css':'asset/font-awesome/4.6.3/css/font-awesome.min.css',
		'ionicon-css':'asset/ionicons/2.0.1/css/ionicons.min.css',
		'icheck-css':'asset/iCheck/square/blue.css',
		
		'pace':'asset/adminlte/2.3.5/plugins/pace/pace.min',
		'pace-css':'asset/adminlte/2.3.5/plugins/pace/pace.min.css',
		
		'dataTables':'asset/datatables/1.10.12/js/jquery.dataTables_cmd.min',
		'dataTables-css':'asset/datatables/1.10.12/css/jquery.dataTables.min.css',
		'dataTables-bootstrap':'asset/datatables/1.10.12/js/dataTables.bootstrap',
		'dataTables-bootstrap-css':'asset/datatables/1.10.12/css/dataTables.bootstrap.min.css',
		
		'colResizable':'asset/colresizable/colResizable-1.6.min',
		'common':'common/common',
		'custom_datatables':'common/custom_datatables',
		'custom_uploader':'common/custom_uploader',
		
		'laytpl':'asset/layer/laytpl'
	},
	preload:['jquery','bootstrap','adminlte']
});

var company = "上海臺蓬機械電子科技有限公司";

function loadCss(require){
	require.async(['font-awesome-css','ionicon-css', 'icheck-css']);
}

function loadJs(require){
	
}

function dataTables_cn(){
	
}

function getEditButtons(id){
	var $buttons = '<a href="javascript:void(0)" data-id="'+id+'" class="table-edit">编辑</a> <a href="javascript:void(0)" data-id="'+id+'" class="table-del">删除</a>';
	return $buttons;
}
