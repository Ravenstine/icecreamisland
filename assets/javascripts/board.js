var Board = {

	init: function(){
		var self = this
		var boardDiv = $('#game_board')
		var boardTable = $('table#game_board_table')

		this.clearBoard(boardTable)
		this.generateBoardArray()
		this.boardTableArray()
		this.populateBoardTable()
		this.selectStartingCell()

		boardDiv.addClass(Stages[Player.stage].nicename)

		this.controls(boardTable)

	},

	controls: function(boardTable){
		var self = this
		var boardTableCells = $('#game_board_table td')
		boardTable.off()
		boardTableCells.off()
		$(document).off()

		boardTable.one('tap', function(){
			Stats.countdown()
		})

		boardTable.on('tap', 'td', function(){
			self.selectCell(this)
		})


		boardTableCells.on('swiperight', function(e) {
			var currentCell = $(this)
			var currentRow = currentCell.parent()
			var nextCell = currentRow.find('td')[currentCell.index() + 1]

 			self.selectCell(nextCell)
		})

		boardTableCells.on('swipeleft', function(e) {
			var currentCell = $(this)
			var currentRow = currentCell.parent()
			var nextCell = currentRow.find('td')[currentCell.index() - 1]

 			self.selectCell(nextCell)
		})

		boardTableCells.on('swipedown', function(e) {
			var currentCell = $(this)
			var boardTable = $('table#game_board_table tr')
			var currentRow = currentCell.parent()
			var nextCell = $(boardTable[currentRow.index() + 1]).find('td')[currentCell.index()]

 			self.selectCell(nextCell)
		})

		boardTableCells.on('swipeup', function(e) {
			var currentCell = $(this)
			var boardTable = $('table#game_board_table tr')
			var currentRow = currentCell.parent()
			var nextCell = $(boardTable[currentRow.index() - 1]).find('td')[currentCell.index()]

 			self.selectCell(nextCell)
		})

		$(document).on("keyup", function(e) {
			e.preventDefault()
			var boardTable = $('table#game_board_table tr')
			var currentCell = $('table#game_board_table').find('.current')
			var currentRow = currentCell.parent()

			// if right arrow pressed
			  if ( e.which == 39 ) {
			  	var nextCell = currentRow.find('td')[currentCell.index() + 1]
			// if left arrow pressed
			  } else if ( e.which == 37){
			  	var nextCell = currentRow.find('td')[currentCell.index() - 1]
			// if down arrow pressed
			  } else if (e.which == 40){
			  	var nextCell = $(boardTable[currentRow.index() + 1]).find('td')[currentCell.index()]
			// if up arrow pressed
			  } else if (e.which == 38){
			  	var nextCell = $(boardTable[currentRow.index() - 1]).find('td')[currentCell.index()]
			  }

			 self.selectCell(nextCell)
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

	clearBoard: function(boardTable){
		var self = this
		var simpleBoardArray = []
		var boardDiv = $('#game_board')
		var tableCells = $('table#game_board_table td')
		simpleBoardArray = simpleBoardArray.concat.apply(simpleBoardArray, self.boardArray)
		boardTable.off()

		$(simpleBoardArray).each(function(cellIndex, cell){
			$(tableCells[cellIndex]).removeClass().attr('class', 'cell')
		})
		boardDiv.removeClass()
	},

	ifSolved: function(){
		if (this.boardArray.compare(Goal.goalArray) == true){
			Game.success()
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
		var gameBoardCells = $('table#game_board_table td')
		var simpleBoardArray = [];
		simpleBoardArray = simpleBoardArray.concat.apply(simpleBoardArray, self.boardArray)
		$(simpleBoardArray).each(function(cellIndex, cell){
			$(gameBoardCells[cellIndex]).addClass("demo")
			$(gameBoardCells[cellIndex]).addClass("i" + cell.toString())
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
		var self = this
		nextCell = $(nextCell)
		var currentCell = $('table#game_board_table').find('.current')
		var currentRow = currentCell.parent()
		var nextRow = nextCell.parent()
		var currentCellIndex = currentCell.index()
		var nextCellIndex = nextCell.index()
		var currentRowIndex = $(currentRow).index()
		var nextRowIndex = nextRow.index()

		// If the selected cell isn't blank and is adjacent to the last cell...
		if (this.boardArray[nextRowIndex][nextCellIndex] != 0 && this.isAdjacent(currentRowIndex,nextRowIndex,currentCellIndex,nextCellIndex) == true){
			// Calculate the new value of the next cell and toggle the selection status.
			var newCellValue = this.calculateNewCellValue(currentRowIndex,nextRowIndex,currentCellIndex,nextCellIndex)
			currentCell.toggleClass('current')
			nextCell.toggleClass('current')     
			Stats.move()
			// Unless the cell calculation returns false(meaning the new cell value is identical to the last cell)      
			if (newCellValue != false){
				nextCell.animate({backgroundSize: "0%"}, 300, function(){
					self.toggleCellValue(newCellValue, nextCell)
					self.boardArray[nextRowIndex][nextCellIndex] = newCellValue
					nextCell.animate({backgroundSize: "100%"}, 300, function(){
						self.boardArray[nextRowIndex][nextCellIndex] = newCellValue  
						self.ifSolved()                              			
					})
				})
			}
		}
	},

	toggleCellValue: function(newCellValue, nextCell){
		nextCell = $(nextCell)
		nextCell.removeClass('i1 i2 i3')
		nextCell.addClass("i" + newCellValue)
	},

	calculateNewCellValue: function(currentRowIndex,nextRowIndex,currentCellIndex,nextCellIndex){
		var lastCell = this.boardArray[currentRowIndex][currentCellIndex]
		var nextCell = this.boardArray[nextRowIndex][nextCellIndex]
		var calculation = lastCell + nextCell
		var newValues = {3: 3, 4: 2, 5: 1}

		if (lastCell == nextCell) {
			return false
		} 

		return newValues[calculation]

	},

	isAdjacent: function(currentRowIndex,nextRowIndex,currentCellIndex,nextCellIndex){
		if (this.isAbove(currentRowIndex,nextRowIndex,currentCellIndex,nextCellIndex) || this.isBelow(currentRowIndex,nextRowIndex,currentCellIndex,nextCellIndex) || this.isToLeft(currentRowIndex,nextRowIndex,currentCellIndex,nextCellIndex) || this.isToRight(currentRowIndex,nextRowIndex,currentCellIndex,nextCellIndex)){
			return true
		} else {
			return false
		}
	},

	isAbove: function(currentRowIndex,nextRowIndex,currentCellIndex,nextCellIndex){
		if ((nextRowIndex == currentRowIndex+1) && nextCellIndex == currentCellIndex){
			return true	
		}
		return false
	},

	isBelow: function(currentRowIndex,nextRowIndex,currentCellIndex,nextCellIndex){
		if ((nextRowIndex == currentRowIndex-1) && nextCellIndex == currentCellIndex){
			return true	
		}
		return false
	},

	isToLeft: function(currentRowIndex,nextRowIndex,currentCellIndex,nextCellIndex){
		if (nextRowIndex == currentRowIndex && (nextCellIndex == currentCellIndex-1)){
			return true	
		}
		return false
	},

	isToRight: function(currentRowIndex,nextRowIndex,currentCellIndex,nextCellIndex){
		if (nextRowIndex == currentRowIndex && (nextCellIndex == currentCellIndex+1)){
			return true	
		}
		return false
	},

}

