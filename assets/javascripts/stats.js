var Stats = {

	init: function(stopTimer){
		var self = this
		this.counter = ''
		this.stopTimer = stopTimer
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
		var currentStage = Stages[Player.stage]
		var currentLevel = currentStage.levels[Player.level]
		this.moves = this.moves + 1
		document.getElementById("move_count").innerHTML=this.moves
		if (this.moves > currentLevel.par){
			Game.fail()
		}
	},

	countdown: function(){
		var self = this
		var boardTime = this.time
		// this.stopTimer == false
		this.counter=setInterval(timer, 1000) //1000 will  run it every 1 second
		

		function timer()
		{
			boardTime = boardTime - 1
			console.log(boardTime)
			console.log(this.stopTimer)
			if (this.stopTimer == true){
				this.stopTimer = false
				clearInterval(this.counter)
				return
			}

			if (boardTime == 0)
			{
				clearInterval(this.counter)
				Game.fail()
				return
			}

		 document.getElementById("timer").innerHTML=boardTime // watch for spelling
		}

	}

}
