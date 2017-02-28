define([
	//'CarTurboEngineExpensiveGears',
	'CarCheapEngineExpensiveGears',
	'CarCheapEngineExpensiveGears',
	'normalCar',
],function(
	//CarTurboEngineExpensiveGears,
	CarCheapEngineExpensiveGears,
	car3,
	normalCar	
){
	//debugger;
	
	/*var c = CarTurboEngineExpensiveGears();	
	console.log(c);
	window.c = c;*/

	var c2 = CarCheapEngineExpensiveGears();	
	console.log(c2);
	window.c2 = c2;

	var c3 = car3();	
	console.log(c3);
	window.c3 = c3;

	var nCar = normalCar();
	console.log(nCar);
	window.nCar = nCar;
	nCar.start();

})