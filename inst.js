define([],function () {	   
    return {
		load: function (name, req, onLoad, config) { 
			//debugger;	
			req([name], function (classRef) {
				//debugger
				onLoad(classRef()); // or new classRef
			})
					
        }
	};
});
