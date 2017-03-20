define([],function(){
	function Car(engine,logger,EnvConf){		

		function start(){
			logger.log('Car with '+engine.getHp()+' starts!');
			EnvConf.logVersion();
		}
		return {			
			engine:engine,
			start:start
		}
	}
	return Car;
})