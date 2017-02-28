define(['module','classRef'],
	function(module, classRef){

	console.log('Factory','Load factory file');

	//helpers

	// http://stackoverflow.com/questions/1606797/use-of-apply-with-new-operator-is-this-possible
	var createSomething = (function() {
	    function F(args) {
	        return classRef.apply(this, args);
	    }
	    F.prototype = classRef.prototype;

	    return function(args) {
	        return new F(args);
	    }
	})();

	var instance = null;

	//read factory config
	var factoryCfg = module.config();
	var scope = factoryCfg.hasOwnProperty('scope') ? factoryCfg.scope : 'singleton';
	var configFuncArgs = factoryCfg.hasOwnProperty('args') ? factoryCfg.args : [];
	var returnType = factoryCfg.hasOwnProperty('returnType') ? factoryCfg.returnType : 'function';

	function getInstance(){	
		console.log('Factory','Try to get object');	

		var callerArgs = Array.prototype.slice.call(arguments);
		var classArgs = factoryCfg.scope=='prototype' && callerArgs.length>0 ? callerArgs : configFuncArgs;
		//make new
		if(factoryCfg.scope=='prototype' || instance==null){	
			console.log('Factory','Make new object');	
			instance = createSomething(classArgs);
		}
		console.log('Factory','return object');
		return instance;
	}
	

	//if(returnType=='instance'){
	//	return getInstance(); // not good (case when prop and wait for new?)
	//}else 
	if(returnType=='function'){
		return getInstance; // can be called with "classname()" ot with "new className()"
	/*}else if(returnType=='new'){
		return function(){
			return getInstance();
		}	*/
	}else{ // get instance func
		return {
			getInstance: getInstance
		}
	}

})