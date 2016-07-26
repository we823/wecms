seajs.config({
	alias:{
		'jquery': path,
		'bootstrap': 'asset/bootstrap/3.3.7/js/bootstrap.min',
		'jquery.marquee':'asset/marquee/jquery.marquee.min',
		'favor_url':'common/favor_url',
		'product_photos':'skin/'+skinName+'/js/product_photos.js'
	},
	preload:['jquery']
});

function join_favorite(url, title){
	seajs.use('common/favor_url', function(favor_url){
		favor_url.join_favorite(url, title);
	})
}
