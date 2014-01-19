var Goal = {

	init: function(){
		var self = this
		var goalTable = $('table#goal_board_table')
		var goalDiv = $('#goal_board')

		this.clearGoal()
		goalDiv.addClass(Stages[Game.stage].nicename)
		this.goalArray = Stages[Game.stage].levels[Game.level].board[0]
		this.populateGoalTable()
	},

	clearGoal: function(){
		var self = this
		var simpleGoalArray = []
		var goalDiv = $('#goal_board')
		var tableCells = $('table#goal_board_table td')
		simpleGoalArray = simpleGoalArray.concat.apply(simpleGoalArray, self.goalArray)
		$(simpleGoalArray).each(function(cellIndex, cell){
			$(tableCells[cellIndex]).removeClass().attr('class', 'cell')
		})
		goalDiv.removeClass()
	},

	populateGoalTable: function(){
		var self = this
		var simpleGoalArray = []
		var tableCells = $('table#goal_board_table td')
		simpleGoalArray = simpleGoalArray.concat.apply(simpleGoalArray, self.goalArray)
		$(simpleGoalArray).each(function(cellIndex, cell){
			$(tableCells[cellIndex]).addClass("demo")
			$(tableCells[cellIndex]).addClass("i" + cell.toString())
		})
	}

}

