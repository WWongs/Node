
$(function() {
	
	//页面不足一屏，铺满一屏
	$('.layout').css('min-height',$(window).height());
	
	jQuery(".slideBox").slide({mainCell:".bd ul",effect:"left",autoPlay:true});
})
	
