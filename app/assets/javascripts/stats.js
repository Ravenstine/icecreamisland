var Stats = {

	init: function(stopTimer){
		var self = this
		var statsDiv = $('#stats')
		var currentStage = Stages[Player.stage]
		var currentLevel = currentStage.levels[Player.level]
		this.time = currentLevel.time
		this.moves = 0

		this.populateStats(currentLevel,currentStage)
		this.clearStats(statsDiv)

		statsDiv.addClass(Stages[Player.stage].nicename)
	},

	populateStats: function(currentLevel,currentStage){
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

		$('span#stage_name').html(currentStage.name)

		$('span#level_number').html(Player.level + 1)
		$('span#level_total').html(currentStage.levels.length)
	},

	clearStats: function(statsDiv){
		var self = this
		clearInterval(self.counter)
		statsDiv.removeClass()
	},

	move: function(){
		var currentStage = Stages[Player.stage]
		var currentLevel = currentStage.levels[Player.level]

		// add to moves count if the current level calls for it
		if (currentLevel.haspar == true){
			this.moves = this.moves + 1
			document.getElementById("move_count").innerHTML=this.moves
			if (this.moves > currentLevel.par){
				Game.fail()
			}
		}
	},

	countdown: function(){
		var self = this
		var boardTime = this.time
		
		if (Stages[Player.stage].levels[Player.level].timed == true){
		this.counter=setInterval(timer, 1000) //1000 will  run it every 1 second
		
		function timer()
		{
			boardTime = boardTime - 1

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
}
