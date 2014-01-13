var Stats = {

	init: function(){
		var self = this
		var statsDiv = $('#stats')
		var currentStage = Stages[Player.stage]
		var currentLevel = currentStage.levels[Player.level]
		this.time = currentLevel.time
		this.moves = 0

		if (currentLevel.timed == true){
			$('p#seconds').css('display', 'visible')
			document.getElementById("timer").innerHTML=this.time
		} else {
			$('p#seconds').css('display', 'none')
		}

		if (currentLevel.haspar == true){
			$('p#moves').css('display', 'visible')
			document.getElementById("move_count").innerHTML=this.moves
			document.getElementById("par").innerHTML=currentLevel.par
		} else {
			$('p#moves').css('display', 'none')
		}

		this.clearStats(statsDiv)

		statsDiv.addClass(Stages[Player.stage].nicename)
	},

	clearStats: function(statsDiv){
		var self = this
		statsDiv.removeClass()
	},

	move: function(){
		this.moves += 1
		document.getElementById("move_count").innerHTML=this.moves
	},

	countdown: function(){
		var self = this
		var boardTime = this.time
		var counter=setInterval(timer, 1000) //1000 will  run it every 1 second
		function timer()
		{
			boardTime= (boardTime) - 1
			console.log(boardTime)
			if (boardTime < 0)
			{
				clearInterval(counter)
				Game.fail()
				return
			}

		 document.getElementById("timer").innerHTML=boardTime // watch for spelling
		}

	}

}
