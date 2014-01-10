var Goal = {

	init: function(){
		var self = this
		var goalTable = $('table#goal_board_table')
		this.clearGoal()
		this.goalArray = Stages[Player.stage].levels[Player.level].board[0]
		this.populateGoalTable()
	},

	clearGoal: function(){
		var self = this
		var simpleGoalArray = [];
		simpleGoalArray = simpleGoalArray.concat.apply(simpleGoalArray, self.goalArray)
		$(simpleGoalArray).each(function(cellIndex, cell){
			$($('table#goal_board_table td')[cellIndex]).removeClass("demo i1 i2 i3")
		})
	},

	populateGoalTable: function(){
		var self = this
		var simpleGoalArray = [];
		simpleGoalArray = simpleGoalArray.concat.apply(simpleGoalArray, self.goalArray)
		$(simpleGoalArray).each(function(cellIndex, cell){
			$($('table#goal_board_table td')[cellIndex]).addClass("demo")
			$($('table#goal_board_table td')[cellIndex]).addClass("i" + cell.toString())
		})
	}

}


var Board = {

	init: function(){
		var self = this
		var boardTable = $('table#game_board_table')
		this.clearBoard()
		this.generateBoardArray()
		this.boardTableArray()
		this.populateBoardTable()
		this.selectStartingCell()
		this.time = Stages[Player.stage].levels[Player.level].time

		$('#game_board_table').on('click', 'td', function(){
			self.selectCell(this)
			self.ifSolved()
		})
	},

	selectStartingCell: function(){
		var startingRow
		var goalArray = Stages[Player.stage].levels[Player.level].board
		var rowIndex = Stages[Player.stage].levels[Player.level].startingCell[0]
		var cellIndex = Stages[Player.stage].levels[Player.level].startingCell[1]
		var gameBoard = $('#game_board_table tbody tr')[rowIndex]
		var startingCell = $(gameBoard).find('td')[cellIndex]

		$(startingCell).addClass('current')

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
				self.init()
				return
			}

		 document.getElementById("timer").innerHTML=boardTime + " secs" // watch for spelling
		}

	},


	clearBoard: function(){
		var self = this
		var simpleBoardArray = [];
		simpleBoardArray = simpleBoardArray.concat.apply(simpleBoardArray, self.boardArray)
		$(simpleBoardArray).each(function(cellIndex, cell){
			$($('table#game_board_table td')[cellIndex]).removeClass("demo i1 i2 i3")
		})
	},

	ifSolved: function(){
		if (this.boardArray.compare(Goal.goalArray) == true){
			alert('you won!')
		}
	},

	generateBoardArray: function(){
		var goalArray = Stages[Player.stage].levels[Player.level].board[0]
		var stageMap = Stages[Player.stage].levels[Player.level].map[0]
		var boardArray = []
		var randomShift = Math.floor((Math.random()*3)+1)

		$(goalArray).each(function(rowIndex, row){
			var newRow = []
			$(row).each(function(cellIndex, cell){
				/* use original value from goal */
				if (stageMap[rowIndex][cellIndex] == "o"){
					newRow.push(goalArray[rowIndex][cellIndex])
				} else if (stageMap[rowIndex][cellIndex] == "r") {
					/* randomize cell */
					var randomCellValue = Math.floor((Math.random()*3)+1)
					newRow.push(randomCellValue)
				} else if(stageMap[rowIndex][cellIndex] == "s") {
					/* apply random shift to board */
					var shiftedCellValue = (((goalArray[rowIndex][cellIndex]) + randomShift) % 3) + 1
					newRow.push(shiftedCellValue)
				}
			})
			boardArray.push(newRow)
		})
		this.boardArray = boardArray
	},

	populateBoardTable: function(){
		var self = this
		var simpleBoardArray = [];
		simpleBoardArray = simpleBoardArray.concat.apply(simpleBoardArray, self.boardArray)
		$(simpleBoardArray).each(function(cellIndex, cell){
			$($('table#game_board_table td')[cellIndex]).addClass("demo")
			$($('table#game_board_table td')[cellIndex]).addClass("i" + cell.toString())
		})
	},

	boardTableArray: function(){
		var self = this
		var outputArray = []
		$('table#game_board_table tr').each(function(rowIndex, row){
			var rowArray = []
			$($(row).find('td')).each(function(cellIndex, cell){
				rowArray.push(cell)
			})
			outputArray.push(rowArray)
		})
		this.tableArray = outputArray
	},

	selectCell: function(nextCell){
		var currentCell = $('table#game_board_table').find('.current')
		var currentRow = $('table#game_board_table').find('.current').parent()
		var nextRow = $(nextCell).parent()
		var currentCellIndex = currentCell.index()
		var nextCellIndex = $(nextCell).index()
		var currentRowIndex = $(currentRow).index()
		var nextRowIndex = $(nextRow).index()

		if (this.boardArray[nextRowIndex][nextCellIndex] != 0){
			if (this.isAdjacent(currentRowIndex,nextRowIndex,currentCellIndex,nextCellIndex) == true){

				var newCellValue = this.calculateNewCellValue(currentRowIndex,nextRowIndex,currentCellIndex,nextCellIndex)
				this.toggleCellValue(newCellValue, nextCell)
				this.boardArray[nextRowIndex][nextCellIndex] = newCellValue
				$(currentCell).toggleClass('current')
				$(nextCell).toggleClass('current') 			
			}
		}

	},

	toggleCellValue: function(newCellValue, nextCell){
		$(nextCell).removeClass('i1 i2 i3')
		$(nextCell).addClass("i" + newCellValue)
	},

	calculateNewCellValue: function(currentRowIndex,nextRowIndex,currentCellIndex,nextCellIndex){
		var lastCell = this.boardArray[currentRowIndex][currentCellIndex]
		var nextCell = this.boardArray[nextRowIndex][nextCellIndex]
		var newValue

		if (lastCell == nextCell) {
			newValue = lastCell
		} else if (lastCell + nextCell == 3){
			newValue = 3
		} else if (lastCell + nextCell == 4){
			newValue = 2
		} else if (lastCell + nextCell == 5){
			newValue = 1
		}

		return newValue

	},

	isAdjacent: function(currentRowIndex,nextRowIndex,currentCellIndex,nextCellIndex){
		if (nextRowIndex == currentRowIndex+1 || nextRowIndex == currentRowIndex-1){
			if (nextCellIndex == currentCellIndex ){
				return true
			}
		} else if (nextRowIndex == currentRowIndex) {
			if (nextCellIndex == currentCellIndex+1 || nextCellIndex == currentCellIndex-1 ){
				return true
			}
		} else {
			return false
		}
	}

}

