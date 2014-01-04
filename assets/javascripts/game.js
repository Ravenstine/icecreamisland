var Board = {

  init: function(){
    $('form#new_item').on('ajax:success', this.handleItem)
  }
  
}

$(document).ready(function(){
  Board.init()
})