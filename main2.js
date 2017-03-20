// PSEUDO JS EXAMPLES ()

//scope type (proto or singleton) direct when creating module:

//singleton without params -----------
define('ConsoleLogger',[],function ConsoleLogger(){
	return {
		log: console.log.bind(console)
	}
})

//call
define(['ConsoleLogger'],function(ConsoleLogger){
	ConsoleLogger.log('singleton without params call');
})


//singleton with singleton params  -------------
define('Http',['iLogger'],function Http(logger){
	function ajax(data){
		logger.log('try to get ajax with params:', data);
	}
	return {
		ajax:ajax
	}
})

//config
var config = {
	map:{
		Http:{
			iLogger: 'ConsoleLogger'
		}
	}
}

//call
define(['Http'],function(Http){
	Http.ajax({url:'/nowhere'});
})

//prototype wihtout params   ----------------
define('Gears',[],function Gears(){
	var price = 20;
	function getPrice(){
		return price;
	}
	function setPrice(value){
		price = value;
	}
	return{
		getPrice:getPrice,
		setPrice:setPrice,
	}
})

//problems:
// - two singletons based on same class

//proto without patams
define(SliderEngine,[],function (){
	function SliderEngine(configs){
		function getNext(){}
		return {
			getNext:getNext
		}
	}
	return SliderEngine;
})

var config = {
	config:{
		PageSlider:{
			SliderEngine:{v:'pages'}
		},
		QuestionSlider:{
			SliderEngine:{v:'questions'}
		}
	}
}
// from config (singleton with proto dep)
define(PageSlider,[module, SliderEngine],function PageSlider(module, SliderEngine){
	return new SliderEngine(module.config().SliderEngine);
})

// OR in module config (singleton with proto dep)
define(PageSlider,[SliderEngine],function PageSlider(SliderEngine){
	return new SliderEngine({v:'pages'});
})

//-----
// from config (singleton with proto dep)
define(QuestionSlider,[module, SliderEngine],function QuestionSlider(module, SliderEngine){
	return new SliderEngine(module.config().SliderEngine);
})

// OR in module config (singleton with proto dep)
define(QuestionSlider,[SliderEngine],function QuestionSlider(SliderEngine){
	return new SliderEngine({v:'questions'});
})



//proto with proto dep //very tricky :)
define(CheapEngine,['Gears'],function (Gears){
	function CheapEngine(){
		var gears = new Gears();
		function getGears(){
			return gears;
		}
		return {
			getGears:getGears
		}
	}
	return CheapEngine;
})
//call
define(['CheapEngine'],function(CheapEngine){
	var cheapEngine = new CheapEngine();
})

//proto with singleton dep
define(SliderEngine2,['iLogger'],function (logger){
	function SliderEngine2(configs){
		function getNext(){
			logger.log('need next');
		}
		return {
			getNext:getNext
		}
	}
	return SliderEngine2;
})
//call
define(['SliderEngine2'],function(SliderEngine2){
	var sliderEngine2 = new SliderEngine2({v:'2'});
})

//multi args ==================

//proto with  proto and singleton
define(CheapEngine2,['Gears','iLogger'],function (Gears, logger){
	function CheapEngine2(){
		var gears = new Gears();
		function getGears(){
			logger.log('need gears');
			return gears;
		}
		return {
			getGears:getGears
		}
	}
	return CheapEngine2;
})
//call
define(['CheapEngine2'],function(CheapEngine2){
	var cheapEngine = new CheapEngine2();
})

//singleton with singleton and proto  -----------
define('Http',['Gears','iLogger'],function Http(Gears, logger){
	var gears = new Gears();
	function ajax(data){
		logger.log('try to get ajax with params:', data);
	}
	return {
		ajax:ajax
	}
})

//config
var config = {
	map:{
		Http:{
			iLogger: 'ConsoleLogger'
		}
	}
}

//call
define(['Http'],function(Http){
	Http.ajax({url:'/nowhere'});
})

//Problem: PROTO in other ptoto or singleton