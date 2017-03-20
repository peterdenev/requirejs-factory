define([],function(){	

	function Factory(config){
		config = typeof config !== 'undefined' ? config : requirejs.s.contexts._.config.config.factory;

		var _beans = config.hasOwnProperty('beans') ? config.beans : {};
		var _refKeyWord = config.hasOwnProperty('refPrefix') ? config.refPrefix : 'factory!';
		var _isDebug = config.hasOwnProperty('isDebug') ? config.isDebug : false;
		var _defaultScope = config.hasOwnProperty('defaultScope') ? config.defaultScope : 'singleton';

		init();
		
		function init(){
			registerBeans(_beans);
		}

		function registerBeans(beans){
			for(var beanName in beans){					
				registerBean(beanName, beans[beanName]);	
			}
		}

		function registerBean(beanName, factoryCfg){
			if(!factoryCfg.hasOwnProperty('class')){
				console.warn('Factory','Bean/Module "'+beanName+'" have no "class" property in config!');
				return;
			}

			var className = factoryCfg.class;
			var scope = factoryCfg.hasOwnProperty('scope') ? factoryCfg.scope : _defaultScope;
			var configFuncArgs = factoryCfg.hasOwnProperty('args') ? factoryCfg.args : [];
			//var returnType = factoryCfg.hasOwnProperty('returnType') ? factoryCfg.returnType : 'function'; //function

			//get the ref beans names
			var depsNames = [];		
			for(var a in configFuncArgs){
				if(typeof configFuncArgs[a] == 'string' && configFuncArgs[a].indexOf(_refKeyWord) == 0){			
					depsNames.push(configFuncArgs[a].substring(_refKeyWord.length));
				}
			}

			//debugger;

			//register new module with given bean name, get all dpendencies
			define(beanName,[className].concat(depsNames),function(/*classRef, dep1, dep2*/){
				if(_isDebug){ console.log('Factory LOADER',beanName, 'origin module and ref deps loaded'); }

				var deps = Array.prototype.slice.call(arguments);
				var classRef = deps.shift();

				if(typeof classRef == 'undefined'){
					console.warn('Factory', 'Resolving module "'+beanName+'" fail! \n'+
						'Hint: check bean name spelling, path aliases/file existance! \n'+
						'Hint: Module with name "'+beanName+'" may already exist (in "paths")! Use anohter name for the bean or remove the alias from "paths".');
					return;
				}else if(typeof classRef !== 'function'){
					console.warn('Factory', 'Module "'+beanName+'" not a function/class! Hint: consider removing from beans list and just use it direct. (set in path or map)');
					//return;
				}

				//debugger;		

				//helpers
				// TODO: keep the class name
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

				// return createSomething(resolvedClassArgs);

				var instance = null;
				//debugger;

				function getInstance(){	
					if(_isDebug){ console.log('Factory',beanName,'Try to get object');	}
					
					//make new
					if(factoryCfg.scope=='prototype' || instance==null){
						if(_isDebug){ console.log('Factory',beanName,'Make new object'); }

						if(typeof classRef == 'function'){
							// N.B! this code must be there in getInstance, because we need to getInstance "()" each dep (the dep will self manage if singleton or not) 	
							//merge resolved beans/modules and static params
							var resolvedClassArgs = [];
							var depsI = 0;
							for(var a in configFuncArgs){
								if(typeof configFuncArgs[a] == 'string' && configFuncArgs[a].indexOf(_refKeyWord) == 0){	
									if(typeof deps[depsI] == 'function'){			
										resolvedClassArgs.push(deps[depsI]()); // N.B! using "()" to call the returned instance
									}else{
										resolvedClassArgs.push(deps[depsI]); // direct return the instance or object
									}
									depsI++;
								}else{
									resolvedClassArgs.push(configFuncArgs[a]);
								}
							} 		

							//MAKE NEW
							instance = createSomething(resolvedClassArgs);
						}else{
							instance = classRef; // not very good just to ref obj
						}
					}
					if(_isDebug){ console.log('Factory',beanName,'return object'); }
					return instance;
				}
				
				return getInstance; // can be called with "classname()" ot with "new className()"
				
			})

		}		

		return{
			registerBean: registerBean,
			registerBeans: registerBeans,
			isDebug: _isDebug,
			_initialized: require.s.contexts._.defined,
			_notInitialized: require.s.contexts._.registry,
		}
	}

	return Factory;
})

/**
TODO:
- Class name (instanceof) to be tested and fixed
- autowire
- arg for bean return normal module(object). posible?

*/