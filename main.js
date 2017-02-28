define([
	'factory!rcc_questions_slider',
	'factory!rcc_pages_slider',
	'factory!http',
	'main2'
],function(
	rcc_questions_slider, 
	rcc_pages_slider,
	Http,
	main2
){
	//debugger;
	//var slider = new rcc_slider({myVar:'val1'});
	//var slider = rcc_slider.getInstance();
	//var slider = rcc_slider;
	//var slider = rcc_slider();
	var slider = new rcc_questions_slider({myVar:'main_q'});
	var slider_p = new rcc_pages_slider({myVar:'main_p'});
	console.log(slider);
	window.slider = slider;
	window.slider_p = slider_p;
	window.http = new Http();
})