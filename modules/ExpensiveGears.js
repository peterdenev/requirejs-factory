define([],function(){
	function ExpensiveGears(price){		
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
	return ExpensiveGears;
})