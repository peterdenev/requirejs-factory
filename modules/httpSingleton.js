define(['http'],function(Http){

	var instance = null;

	function getInstance(){
		if(instance==null){
			instance = new Http();
		}
		return instance;
	}

	return getInstance;
	

}
