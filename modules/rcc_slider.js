define([],function(){

	console.log('MODULE','Slider','file loaded');

	function Slider(cfg){
		console.log('MODULE','Slider','class func run');

		var myVar = cfg ? cfg.myVar : '';
		
		function getMyVar(){
			return myVar;
		}
		function setMyVar(value){
			myVar = value;
		}
		return {
			getMyVar:getMyVar,
			setMyVar:setMyVar
		}
	}

	return Slider;
})