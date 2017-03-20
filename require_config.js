// contents of main.js:
require.config({
    paths: { 
        factory: 'requirejs-factory',  
        ConsoleLogger: 'modules/ConsoleLogger',
    },
    map:{
    	'*':{    	
    		normalCar: 'CarCheapEngineCheapGears', // can get alias from factory
    		logger: 'ConsoleLogger',

    	}, 	
    },
    shim:{    	
    },
    config:{
    	factory:{
    		isDebug: false, // set to true to see the procecss
			refPrefix: 'factory!', 
    		beans:{ // 	Conclusion: beans are good only for proto, buy default all is singleton
		    	EnvConf:{
		    		class:'modules/AppEnv',
		    		scope:'singleton', // singleton / prototype	(change to see the effect)    		
		    		args:[
						'factory!logger',
					],
		    	},

		    	// BEANS //

		    	CheapGears:{ // todo get the names directly from path // todo: get args auto
		    		class: 'modules/Gears',
		    		scope:'prototype',
		    		args:[
		    			'20'
		    		]
		    	},
		    	ExpensiveGears:{
		    		class: 'modules/Gears',
		    		scope:'prototype',
		    		args:[
		    			'40'
		    		]
		    	},
		    	CheapEngineCheapGears:{
		    		class: 'modules/Engine',
		    		args:[
		    			'factory!CheapGears',
		    			'200', //hp
		    		],
		    		scope:'prototype',
		    	},
		    	CheapEngineExpensiveGears:{
		    		class: 'modules/Engine',
		    		args:[
		    			'factory!ExpensiveGears',
		    			'200',
		    		],
		    		scope:'prototype',
		    	},
		    	TurboEngineExpensiveGears:{
		    		class: 'modules/Engine',
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
		    			'factory!EnvConf',
		    		],
		    		scope:'prototype',
		    	},
		    	CarCheapEngineExpensiveGears:{
		    		class:'modules/Car',
		    		args:[
		    			'factory!CheapEngineExpensiveGears',
		    			'factory!logger',
						'factory!EnvConf',
		    		],
		    		scope:'prototype',
		    	},
		    	CarTurboEngineExpensiveGears:{
		    		class:'modules/Car',
		    		args:[
		    			'factory!TurboEngineExpensiveGears',
		    			'factory!logger',
						'factory!EnvConf',
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
	// window.factory = factory;
	require(['main']);	
})