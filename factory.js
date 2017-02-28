define([],function () {	   
    return {
		load: function (name, req, onLoad, config) { 
			console.log('LOADER',name, 'init')
			//debugger;
			//read factory config
			var factoryCfg = config.config.hasOwnProperty('factory') && config.config.factory.hasOwnProperty(name) ? config.config.factory[name] : {};
			var className = factoryCfg.hasOwnProperty('class') ? factoryCfg.class : '__FACTORY_LOADER_CLASS_NAME_FOR_'+name+'_NOT_SET__';
			var scope = factoryCfg.hasOwnProperty('scope') ? factoryCfg.scope : 'singleton';
			var configFuncArgs = factoryCfg.hasOwnProperty('args') ? factoryCfg.args : [];
			var returnType = factoryCfg.hasOwnProperty('returnType') ? factoryCfg.returnType : 'function';

			req([className], function (classRef) {
			//req([name], function (value) {
				//debugger;
				console.log('LOADER',name, 'origin module loaded');

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

				//debugger;

				function getInstance(){	
					console.log('Factory',name,'Try to get object');	

					var callerArgs = Array.prototype.slice.call(arguments);
					var classArgs = factoryCfg.scope=='prototype' && callerArgs.length>0 ? callerArgs : configFuncArgs;

					//get the ref beans
					for(var a in classArgs){
						if(typeof classArgs[a] == 'string' && classArgs[a].indexOf('factory!') == 0){
							//load bean
							//TODo
						}
					}


					//make new
					if(factoryCfg.scope=='prototype' || instance==null){	
						console.log('Factory',name,'Make new object');	
						instance = createSomething(classArgs);
					}
					console.log('Factory',name,'return object');
					return instance;
				}

				//if(returnType=='instance'){
				//	return getInstance(); // not good (case when prop and wait for new?)
				//}else 
				if(returnType=='function'){
					onLoad(getInstance); // can be called with "classname()" ot with "new className()"
				/*}else if(returnType=='new'){
					onLoad(function(){
						return getInstance();
					})	*/
				}else{ // get instance func
					onLoad({
						getInstance: getInstance
					})
				}
	           
	        });
					
        }
	};
});
