define([],function(){

	function Http(){

		function ajax(opt){
			opt.done('fake done value');
		}

		return {
			ajax: ajax
		}
	}

	return Http;
})