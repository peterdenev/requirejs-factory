define([],function(){
	function Car(engine,logger){		

		function start(){
			logger.log('Car with '+engine.getHp()+' starts!');
		}
		return {			
			engine:engine,
			start:start
		}
	}
	return Car;
})