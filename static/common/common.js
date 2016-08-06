define(function(require, exports, module){
	exports.initModalInfo = function(){
		
		$('#content-modal').on('shown.bs.modal', function(event){
			var source = $(event.relatedTarget);
			var $this = $(this);
			var url = source.attr('data-url'),
			    title = source.attr('data-title');
            $this.find('.modal-title').html(title);
			$this.find('.modal-body').load(url);

		});
		
	};
});
