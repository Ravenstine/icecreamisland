var Board = {

	init: function(){
		var self = this
		var boardDiv = $('#game_board')
		var boardTable = $('table#game_board_table')
		this.clearBoard()
		this.generateBoardArray()
		this.boardTableArray()
		this.populateBoardTable()
		this.selectStartingCell()
		this.time = Stages[Player.stage].levels[Player.level].time

		boardDiv.addClass(Player.stage)


		boardTable.one('click', function(){
			Stats.countdown()
		})

		boardTable.on('click', 'td', function(){
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
		var simpleBoardArray = []
		var boardDiv = $('#game_board')
		var tableCells = $('table#game_board_table td')
		simpleBoardArray = simpleBoardArray.concat.apply(simpleBoardArray, self.boardArray)
		$(simpleBoardArray).each(function(cellIndex, cell){
			$(tableCells[cellIndex]).removeClass().attr('class', 'cell')
		})
		boardDiv.removeClass()
	},

	ifSolved: function(){
		if (this.boardArray.compare(Goal.goalArray) == true){
			alert('you won!')
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

			// Unless the cell calculation returns false(meaning the new cell value is identical to the last cell)      
			if (newCellValue != false){
				nextCell.animate({backgroundSize: "0%"}, 300, function(){
					self.toggleCellValue(newCellValue, nextCell)
					self.boardArray[nextRowIndex][nextCellIndex] = newCellValue
					nextCell.animate({backgroundSize: "100%"}, 300, function(){
						self.boardArray[nextRowIndex][nextCellIndex] = newCellValue                                			
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
		if ((nextRowIndex == currentRowIndex+1 || nextRowIndex == currentRowIndex-1) && nextCellIndex == currentCellIndex){
				return true
		} else if (nextRowIndex == currentRowIndex && (nextCellIndex == currentCellIndex+1 || nextCellIndex == currentCellIndex-1)) {
				return true
		} else {
			return false
		}
	}

}

