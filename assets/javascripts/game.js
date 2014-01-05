Array.prototype.contains = function(input){
	for (i in this) {
		if (this[i] == input) return true;
	}
	return false
}

Array.prototype.lacks = function(input){
	for (i in this) {
		if (this[i] == input) return false;
	}
	return true
}


var Board = {

  init: function(){
  	this.startLevel()
  },

  startLevel: function(){
  	var self = this
    var boardTable = $('table')
    this.generateBoardArray()
    this.boardTableArray()
    this.populateBoardTable()

    $('#game_board').on('click', 'td', function(){
    	// $(this).toggleClass('current')
    	self.selectCell(this)
    })

  },

  startGame: function(){
  	this.startLevel()
  },

  generateBoardArray: function(){
  	this.boardArray = [[0,2,1,1,1,0],[0,1,2,2,1,2],[0,2,1,2,1,1],[0,0,2,1,1,2],[1,1,1,1,2,1],[2,2,2,1,2,1]]
  },

  populateBoardTable: function(){
  	var self = this
  	var simpleBoardArray = [];
	simpleBoardArray = simpleBoardArray.concat.apply(simpleBoardArray, self.boardArray)
  	$(simpleBoardArray).each(function(cellIndex, cell){
  		$($('td')[cellIndex]).addClass("demo")
	  	$($('td')[cellIndex]).addClass("i" + cell.toString())
  	})
  },

  boardTableArray: function(){
  	var self = this
  	var outputArray = []
  	$('table tr').each(function(rowIndex, row){
  		var rowArray = []
  		$($(row).find('td')).each(function(cellIndex, cell){
  			rowArray.push(cell)
  		})
  		outputArray.push(rowArray)
  	})
  	  this.tableArray = outputArray
  },

  selectCell: function(nextCell){
  		var currentCell = $('table').find('.current')
   		var currentRow = $('table').find('.current').parent()
   		var nextRow = $(nextCell).parent()
  		var currentCellIndex = currentCell.index()
  		var nextCellIndex = $(nextCell).index()
  		var currentRowIndex = $(currentRow).index()
   		var nextRowIndex = $(nextRow).index()

  		if (this.isAdjacent(currentRowIndex,nextRowIndex,currentCellIndex,nextCellIndex) == true){
  			$(currentCell).toggleClass('current')
     		$(nextCell).toggleClass('current') 			
  		}

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
})