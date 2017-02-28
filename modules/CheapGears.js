define([],function(){
	function CheapGears(price){		
		function getPrice(){
			return price;
		}
		function setPrice(value){
			price = value;
		}

		return {
			getPrice:getPrice,
			setPrice:setPrice
		}
	}

	return CheapGears;
})