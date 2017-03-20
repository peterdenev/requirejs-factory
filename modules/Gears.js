define([],function(){
	function Gears(price){		
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

	return Gears;
})