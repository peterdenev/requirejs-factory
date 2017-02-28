define([],function(){
	function CheapEngine(gears, hp){		
		function getHp(){
			return hp;
		}
		function setHp(value){
			hp = value;
		}

		return {
			getHp:getHp,
			setHp:setHp,
			gears:gears
		}
	}
	return CheapEngine;
})