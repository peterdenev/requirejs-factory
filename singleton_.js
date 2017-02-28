define(['module','classRef'],
	function(module, classRef){

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

	function getInstance(){
		if(instance==null){
			var args = module.config().args || [];			
			instance = createSomething(args);
		}
		return instance;
	}

	return {
		getInstance: getInstance
	}
})