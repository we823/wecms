define(function(require, exports, module){

	exports.init = function(){
		var $company_container = $("span.company");
		if($company_container){
			$.each($company_container,function(index,element){
				$(element).html(company);	
			});
		}
	};
});
