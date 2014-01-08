$(document).on('ready', function(){
	Box.fitToScreen()

})

$(window).on('resize', function(){
	Box.fitToScreen()

})

var Box = {
	fitToScreen: function(){
		var windowHeight = $(window).height()
		var windowWidth = $(window).width()

		if (windowHeight < windowWidth){
			var aspectRatio = 2/3

			var height = Math.round(windowWidth / aspectRatio)
			var width = Math.round(windowHeight / aspectRatio)

			$('#object').css('height', windowHeight + "px")
			$('#object').css('width', width + "px")

		} else if (windowHeight > windowWidth) {
			var aspectRatio = 3/2

			var height = Math.round(windowWidth / aspectRatio)
			var width = Math.round(windowHeight / aspectRatio)

			$('#object').css('height', height + "px")
			$('#object').css('width', windowWidth + "px")
		}

	}

}