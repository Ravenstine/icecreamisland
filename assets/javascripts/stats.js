var Stats = {

	init: function(){
		var self = this
		var statsDiv = $('#stats')
		this.clearStats()
		this.time = Stages[Player.stage].levels[Player.level].time

		statsDiv.addClass(Stages[Player.stage].nicename)
	},

	clearStats: function(){
		var self = this
		var statsDiv = $('#stats')
		statsDiv.removeClass()
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
