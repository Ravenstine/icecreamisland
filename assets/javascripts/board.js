var Goal = {

	init: function(){
		var self = this
		var goalTable = $('table#goal_board_table')
		this.goalArray = Stages[Player.stage].board[Player.level]
		this.populateGoalTable()
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
		this.generateBoardArray()
		this.boardTableArray()
		this.populateBoardTable()

		$('#game_board').on('click', 'td', function(){
			self.selectCell(this)
			self.ifSolved()
		})
	},

	ifSolved: function(){
		if (this.boardArray.compare(Goal.goalArray) == true){
			alert('you won!')
		}
	},

	generateBoardArray: function(){
		var goalArray = Stages[Player.stage].board[Player.level]
		var stageMap = Stages[Player.stage].map[Player.level]
		var boardArray = []

		$(goalArray).each(function(rowIndex, row){
			var newRow = []
			$(row).each(function(cellIndex, cell){
				if (stageMap[rowIndex][cellIndex] == "N"){
					newRow.push(goalArray[rowIndex][cellIndex])
				} else if (stageMap[rowIndex][cellIndex] == "R") {
					randomCellValue = Math.floor((Math.random()*3)+1)
					newRow.push(randomCellValue)
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

	$(document).ready(function(){
		Board.init()
		Goal.init()
	})