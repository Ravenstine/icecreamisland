var Game = {

	init: function(){
		Player.init()
		Board.init()
		Goal.init()
	}

}

$(document).ready(function(){
	Game.init()
})