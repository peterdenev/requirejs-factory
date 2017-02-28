define([
	'factory!rcc_questions_slider',
	'factory!rcc_pages_slider',
	'factory!http'
],function(
	rcc_questions_slider, 
	rcc_pages_slider,
	Http
){
	//debugger;
	//var slider = new rcc_slider({myVar:'val1'});
	//var slider = rcc_slider.getInstance();
	//var slider = rcc_slider;
	//var slider = rcc_slider();
	var slider2 = new rcc_questions_slider({myVar:'main2_q'});
	var slider2_p = new rcc_pages_slider({myVar:'main2_p'});
	console.log(slider2);
	window.slider2 = slider2;
	window.slider2_p = slider2_p;
	window.http2 = new Http();
})