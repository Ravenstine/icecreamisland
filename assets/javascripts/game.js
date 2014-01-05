var Board = {

  init: function(){
    var boardTable = $('table')
    this.generateBoardArray()
    this.boardTableArray()
    this.populateBoardTable()
    
    $('#game_board').on('click', 'td', function(){
    	$(this).toggleClass('current')
    })

  },

  generateBoardArray: function(){
  	this.boardArray = [[0,2,1,1,1,0],[0,1,2,2,1,2],[0,2,1,2,1,1],[0,0,2,1,1,2],[1,1,1,1,2,1],[2,2,2,1,2,1]]
  },

  populateBoardTable: function(){
  	var self = this
  	simpleBoardArray = []
  	var simpleBoardArray = [];
	simpleBoardArray = simpleBoardArray.concat.apply(simpleBoardArray, self.boardArray)
  	$(simpleBoardArray).each(function(cellIndex, cell){
	  	$($('td')[cellIndex]).addClass("basic" + cell.toString())
  	})

  },

  boardTableArray: function(){
  	var self = this
  	outputArray = []
  	$('table tr').each(function(rowIndex, row){
  		var rowArray = []
  		$($(row).find('td')).each(function(cellIndex, cell){
  			rowArray.push(cell)
  		})
  		outputArray.push(rowArray)
  	})
  	  this.tableArray = outputArray
  }

}

$(document).ready(function(){
  Board.init()
})