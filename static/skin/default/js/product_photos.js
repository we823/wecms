define(function(require, exports, module){
	exports.run = function(){
		var $min_pic = $('.product-pic-min div img'),
		    $max_pic = $('.product-pic-max img');
	
		//点击小图改变大图地址
		$min_pic.on('click', function() {
			var dz = $(this).attr('src');
			$max_pic.attr('src', dz);
		});
	
		var $div_w = $('.product-pic-min'),
		    picWidth = $('.product-pic-min div').width(),
		    picLength = $('.product-pic-min div').length;
	
		$('#pre-page').on('click', function() {
			var $this = $(this),
			    id = $this.attr('data-id'),
			    divs = $this.parent().find('div'),
			    length = divs.length;

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
	};
});
