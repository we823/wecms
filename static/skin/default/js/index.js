$(function() {
	
	newsDetail();
	
	var min_pic = $('.product-pic-min div img');
	var max_pic = $('.product-pic-max img');

	//点击小图改变大图地址
	$(min_pic).on('click', function() {
		var dz = $(this).attr('src');
		max_pic.attr('src', dz);
	});

	var div_w = $('.product-pic-min');
	var pic_w = $('.product-pic-min div').width();
	var pic_i = $('.product-pic-min div').length;

	$('#pre-page').on('click', function() {
		console.log('pre click');
		var $this = $(this);
		var id = $this.attr('data-id');
		var divs = $this.parent().find('div');
		var length = divs.length;
		console.log(length);
		if (parseInt(id) + 4 > length) {
			return;
		}
		$.each(divs, function(index, element) {
			if ($(element).attr('data-index') == id) {
				$(element).hide();
			}
		});

		$this.attr('data-id', parseInt(id) + 1);
		$('#next-page').attr('data-id', id);
	});

	$('#next-page').on('click', function() {
		console.log('next click');
		var $this = $(this);
		var id = parseInt($this.attr('data-id'));

		var divs = $this.parent().find('div');
		if (id == 0 ) {
			return;
		}
		$.each(divs, function(index, element) {
			
			if ($(element).attr('data-index') == id) {
				$(element).show();
			}
		});

		$this.attr('data-id', id - 1);
		$('#pre-page').attr('data-id', id );
	});
});

function join_favorite(url, title) {
   
	var ua = navigator.userAgent.toLowerCase();
	if (ua.indexOf("360se") > -1) {
		alert("由于360浏览器功能限制，请按 Ctrl+D 手动收藏！");
	} else if (ua.indexOf("msie 8") > -1) {
		window.external.AddToFavoritesBar(url, title); //IE8
	} else if (document.all) {
		try {
			window.external.addFavorite(url, title);
		} catch (e) {
			alert('您的浏览器不支持,请按 Ctrl+D 手动收藏!');
		}
	} else if (window.sidebar) {
		window.sidebar.addPanel(title, url, "");
	} else {
		alert('您的浏览器不支持,请按 Ctrl+D 手动收藏!');
	}

}

function newsDetail(){
	$('.news-detail').on('click', function(){
		var $this = $(this);
		var id = $this.attr('data-id');
		if(id && id>0){
			var url = 'index.php?c=get_news';
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
}
