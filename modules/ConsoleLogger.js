define([],function(){

	return{
		log: console.log.bind(console),
		warn: console.warn.bind(console),
		error: console.error.bind(console),
	}

	/*function ConsoleLogger(){		
		return {
			log: console.log.bind(console),
			warn: console.warn.bind(console),
			error: console.error.bind(console),
		}		
	}

	return ConsoleLogger;*/
})