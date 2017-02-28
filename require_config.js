// contents of main.js:
require.config({
    paths: {
        rcc_slider: 'modules/rcc_slider', //base class
        http: 'modules/http', //base class
        factory: 'modules/requirejs-factory',  
        ConsoleLogger: 'modules/ConsoleLogger',
    },
    map:{
    	'*':{    	
    		normalCar: 'CarCheapEngineCheapGears', // can get alias from factory
    		logger: 'ConsoleLogger'
    	}, 	
    },
    shim:{    	
    },
    config:{
    	factory:{
    		isDebug: false,
    		beans:{
	    		rcc_questions_slider:{
	    			class:'rcc_slider', //full path or alias from paths
		    		scope:'singleton', // singleton / prototype	    		
		    		args:[{
		    			myVar: 'config_q',
		    		}],
		    		//properties:
		    		//setters:
		    	},
		    	rcc_pages_slider:{
		    		class:'rcc_slider',
		    		scope:'singleton', // singleton / prototype	    		
		    		args:[{
		    			myVar: 'config_p',
		    		}],
		    		//properties:
		    		//setters:
		    	},
		    	http:{
		    		class:'http',
		    		scope:'singleton', // singleton / prototype	    		
		    		args:[],
		    		//properties:
		    		//setters:
		    	},

		    	// BEANS //

		    	CheapGears:{ // todo get the names directly from path // todo: get args auto
		    		class: 'modules/CheapGears',
		    		scope:'prototype',
		    		args:[
		    			'20'
		    		]
		    	},
		    	ExpensiveGears:{
		    		class: 'modules/ExpensiveGears',
		    		scope:'prototype',
		    		args:[
		    			'40'
		    		]
		    	},
		    	CheapEngineCheapGears:{
		    		class: 'modules/CheapEngine',
		    		args:[
		    			'factory!CheapGears',
		    			'200', //hp
		    		],
		    		scope:'prototype',
		    	},
		    	CheapEngineExpensiveGears:{
		    		class: 'modules/CheapEngine',
		    		args:[
		    			'factory!ExpensiveGears',
		    			'200',
		    		],
		    		scope:'prototype',
		    	},
		    	TurboEngineExpensiveGears:{
		    		//class: 'modules/TurboEngine', // the same as Cheap, all diff to meke it expensive are as params
		    		class: 'modules/CheapEngine',
		    		args:[
		    			'factory!ExpensiveGears',
		    			'1200',
		    		],
		    		scope:'prototype',
		    	},		    	
		    	CarCheapEngineCheapGears:{
		    		class:'modules/Car',
		    		args:[
		    			'factory!CheapEngineCheapGears',
		    			'factory!logger',
		    		],
		    		scope:'prototype',
		    	},
		    	CarCheapEngineExpensiveGears:{
		    		class:'modules/Car',
		    		args:[
		    			'factory!CheapEngineExpensiveGears',
		    			'factory!logger',
		    		],
		    		scope:'prototype',
		    	},
		    	CarTurboEngineExpensiveGears:{
		    		class:'modules/Car',
		    		args:[
		    			'factory!TurboEngineExpensiveGears',
		    			'factory!logger'
		    		],
		    		scope:'prototype',
		    	},

		    	/*ConsoleLogger:{
		    		class:'ConsoleLogger',
		    	}*/
		    },
    	},
    		
    }

});

require(['factory'],function(Factory){
	var factory = new Factory(); // or just Factory();
	window.factory = factory;
	require(['main3']);	
})