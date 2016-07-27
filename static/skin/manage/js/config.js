seajs.config({
	alias: {
		'jquery': jqueryPath,
		'bootstrap': 'asset/bootstrap/3.3.7/js/bootstrap.min',
		'adminlte':'asset/adminlte/2.3.5/js/app.min',
		'webuploader': 'asset/webuploader/webuploader',
		'validate':'asset/validate/1.15.1/jquery.validate.min',
		'validate-additional':'asset/validate/1.15.1/additional-methods.min',
		'icheck': 'asset/iCheck/icheck',
		
		'font-awesome-css':'asset/font-awesome/4.6.3/css/font-awesome.min.css',
		'ionicon-css':'asset/ionicons/2.0.1/css/ionicons.min.css',
		'icheck-css':'asset/iCheck/square/blue.css'
	},
	preload:['jquery']
});

var company = "上海臺蓬機械電子科技有限公司";

function loadCss(require){
	require.async(['font-awesome-css','ionicon-css', 'icheck-css']);
}
