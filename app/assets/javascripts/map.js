var Map = {

	init: function(){
		var self = this
		var mapDiv = $('#current_stage')
		var dots = mapDiv.find('.level')
		var currentLevel = Player.level
		var currentStage = Stages[Player.stage]


		for (var i=0;i<=currentLevel;i++){ 
				var level = $(dots[i])
				level.addClass('selected')


				level.on('click', function(){
					Game.stage = Player.stage
					Game.level = $(this).index()
                	Game.start()
					mapDiv.toggleClass('active')
                	$('#game-panel').toggleClass('active')
				})
		}

	}
}