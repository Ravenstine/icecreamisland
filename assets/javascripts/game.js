var Game = {

	init: function(){
		var self = this
		Player.init()
		Board.init()
		Goal.init()
		Stats.init()
		self.fitToScreen()


		$(window).on('resize', function(){
			self.fitToScreen()
		})
	},

	success: function(){
		alert('SUCCESS')
		Player.level = Player.level + 1
		Goal.init()
		Board.init()
		Stats.init()
	},

	fail: function(){
		alert('FAIL')
		Goal.init()
		Board.init()
		Stats.init()
	},

	fitToScreen: function(){
		var windowHeight = $(window).height()
		var windowWidth = $(window).width()
		var div = $('#game')
		var statsDiv = $('#stats')
		var portrait = $('#portrait')
		var landscape = $('#landscape')

		if (windowHeight < windowWidth){
			/* if widescreen */
			var aspectRatio = 3/2
			var height = Math.round(windowWidth / aspectRatio)
			var width = Math.round((windowHeight * aspectRatio))

			if (width > windowWidth){
				width = windowWidth
				height = Math.round(width/aspectRatio)
			} else {
				height = windowHeight
			}

			portrait.css('display', 'none')
			landscape.css('display', 'table')


			var boardElement = $('#game_board').detach()
			landscape.find('.board').append(boardElement)			

			var goalElement = $('#goal_board').detach()
			landscape.find('.goal').append(goalElement)	

			var statsElement = $('#stats').detach()
			landscape.find('.stats').append(statsElement)	

		} else if (windowHeight > windowWidth) {
			/* if portrait */
			var aspectRatio = 2/3
			var height = Math.round(windowWidth / aspectRatio)
			var width = Math.round((windowHeight * aspectRatio))

			if (height > windowHeight){
				height = windowHeight
				widht = Math.round(height * aspectRatio)
			} else {
				width = windowWidth
			}


			landscape.css('display', 'none')
			portrait.css('display', 'table')


			var boardElement = $('#game_board').detach()
			portrait.find('.board').append(boardElement)

			var goalElement = $('#goal_board').detach()
			portrait.find('.goal').append(goalElement)

			var statsElement = $('#stats').detach()
			portrait.find('.stats').append(statsElement)	



		}

		div.css('height', height + "px")
		div.css('width', width + "px")
        // div.css('margin-top', (($(window).height() - div.outerHeight())/2) + "px")

        statsDiv.fitText(0.8)
	},

}

$(document).ready(function(){
	Game.init()
	Game.fitToScreen()
})