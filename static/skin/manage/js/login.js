define(function(require, exports, module){
	require('bootstrap');
	require('icheck');
	require('validate');
	
	loadCss(require);
	exports.init = function(){
		$('input').iCheck({
	      checkboxClass: 'icheckbox_square-blue',
	      radioClass: 'iradio_square-blue',
	      increaseArea: '20%' // optional
	    });
	    
	    var $company_container = $("span.company");
		if($company_container){
			$.each($company_container,function(index,element){
				$(element).html(company);	
			});
		}
	};
	
	var login = function(){
		var username = $('#username').val(),
		    passwd = $('#passwd').val();

		$.post('index.php?m=home&c=login&a=check', {username: username, passwd: passwd}, function(result){
			if(result){
				if(result.hasError){
					alert(result.message);
					return false;
				}else{
					location.href = result.url;
					return true;
				}
			}
		});
	};
	
	exports.validate = function(){
		var $validator = $("#form-data").validate({
			submitHandler: function(form){
				login();
				return false;
			}
		});
		
		$("#reset").on("click",function(){
			$validator.resetForm();
		});
	};
});
