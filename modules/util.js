define(['logger', 'http'],function Util(logger,http){
	// wait (prop) instance 
	// var logger = logger;
	logger.info('Util','init');
	http.ajax({
		url:'',
		data:{},
		mehod: 'GET',
		done: function(){
			logger.log('Util','ajax done');
		}
	})

	//return ;
})