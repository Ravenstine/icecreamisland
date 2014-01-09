var Game = {

	init: function(){
		var self = this
		Player.init()
		Board.init()
		Goal.init()
		self.fitToScreen()
		// Board.fitToScreen()
		// Goal.fitToScreen()
		$(window).on('resize', function(){
			self.fitToScreen()
			// Board.fitToScreen()
			// Goal.fitToScreen()
		})
	},

	fitToScreen: function(){
		var windowHeight = $(window).height()
		var windowWidth = $(window).width()
		var div = $('#game')

		if (windowHeight < windowWidth){

			var aspectRatio = 3/2
			var height = Math.round(windowWidth / aspectRatio)
			var width = Math.round((windowHeight * aspectRatio))

			if (width > windowWidth){
				width = windowWidth
				height = Math.round(width/aspectRatio)
			} else {
				height = windowHeight
			}

		$('#game_board').css('width', '66%')
		$('#goal_board').css('width', '33%')

		} else if (windowHeight > windowWidth) {

			var aspectRatio = 2/3
			var height = Math.round(windowWidth / aspectRatio)
			var width = Math.round((windowHeight * aspectRatio))

			if (height > windowHeight){
				height = windowHeight
				widht = Math.round(height * aspectRatio)
			} else {
				width = windowWidth
			}

			$('#game_board').css('width', '100%')
			$('#goal_board').css('width', '45%')
		}

		div.css('height', height + "px")
		div.css('width', width + "px")
        div.css('margin-top', (($(window).height() - div.outerHeight())/2) + "px")

	},

}

$(document).ready(function(){
	Game.init()
	Game.fitToScreen()
})