define(function(require, exports, module){
	require('bootstrap');
	require('jquery.marquee');

	exports.productMarquee = function(){
		$('.marquee').marquee({
				//speed in milliseconds of the marquee
				duration: 12000,
				//gap in pixels between the tickers
				gap: 0,
				//time in milliseconds before the marquee will start animating
				delayBeforeStart: 1000,
				//'left' or 'right'
				direction: 'left',
				//true or false - should the marquee be duplicated to show an effect of continues flow
				duplicated: true,
				startVisible: true,
				pauseOnHover:true
			});
	};
	
	exports.aboutusMarquee = function(){
		$('.marquee').marquee({
				//speed in milliseconds of the marquee
				duration: 25000,
				//gap in pixels between the tickers
				gap: 0,
				//time in milliseconds before the marquee will start animating
				delayBeforeStart: 1000,
				//'left' or 'right'
				direction: 'up',
				//true or false - should the marquee be duplicated to show an effect of continues flow
				duplicated: true,
				startVisible: true,
				pauseOnHover: true
			});
	};
});
