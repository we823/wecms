define(function(require, exports, module){
	
	exports.newsDetail = function(){
		$('.news-detail').on('click', function(){
		var $this = $(this);
		var id = $this.attr('data-id');
		if(id && id>0){
			var url = 'index.php?m=home&c=index&a=get_news';
			$.get(url, {id:id}, function(result){
				if(result){

					var hasError = result.hasError;
					if(hasError){
						alert('发生错误，无法获取新闻信息');
					}else{
						var datas = result.datas;
						if(datas){
							var linktype = datas.linktype;
							if(linktype && linktype==1){
								location.href = datas.linkurl;
							}else{
								$('#news-content').html(datas.content);
							}
							
						}
					}
				}else{
					alert('未能获取新闻信息');
				}
			});
		}else{
			alert('参数错误，无法获取新闻信息');
		}
	  });
	};
});
