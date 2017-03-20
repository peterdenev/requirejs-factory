define([
	//'CarTurboEngineExpensiveGears',
	'CarCheapEngineExpensiveGears',
	'CarCheapEngineExpensiveGears',
	'normalCar',
	'EnvConf'
],function(
	//CarTurboEngineExpensiveGears,
	CarCheapEngineExpensiveGears,
	car2,
	normalCar,
	EnvConf	
){
	//debugger;
	
	//get an instance
	var env = EnvConf();
	console.log('Origin version');
	env.logVersion();
	
	var c = CarCheapEngineExpensiveGears();	
	console.log(c);
	window.c = c;

	//change the singleton prop
	env.setVersion('0.2');

	var c2 = car2();	
	console.log(c2);
	window.c2 = c2;

	var nCar = normalCar();
	console.log(nCar);
	window.nCar = nCar;
	nCar.start();

})