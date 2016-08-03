define(function(require, exports, module){
    require('pace-css');
    require('pace');
    
	exports.init = function(){
		var $company_container = $("span.company");
		if($company_container){
			$.each($company_container,function(index,element){
				$(element).html(company);	
			});
		}
		
		$(document).ajaxStart(function(){
			Pace.restart();
		});
		
		$('.load-menu-detail').on('click',function(){
			var $this = $(this),
			    url = $this.data('url');
			$.get(url, function(text){
				$('#content-container').empty().append(text);
			});
		});
	};
});

var wecms = {};
wecms.manage = {};
wecms.manage.change = function(url){
	$('#content-container').load(url);
};
