var StagePanel = {

	init: function(){

		var stageIcon = $('#stage-panel #stage_icon')
		var stageNameSpan = $('#stage-panel #stage_name')
		var stageNumberSpan = $('#stage-panel #stage_number')
		var stageTotalSpan = $('#stage-panel #stage_total')

		stageIcon.removeClass()
		stageIcon.addClass(Stages[Player.stage].nicename)

		stageNameSpan.html(Stages[Player.stage].name)

		stageNumberSpan.html(Player.stage + 1)

		stageTotalSpan.html(Stages.length)

        $('#start_button').on('tap', function(){

                    $('#stage-panel').toggleClass('active')
                	$('#game-panel').toggleClass('active')
        })

        $('#share_button').on('tap', function(){
        	FB.api('/me', function(response) {

        		FB.ui(
        		{
        			method: 'feed',
        			name: 'Ice Cream Island',
        			link: 'https://developers.facebook.com/docs/dialogs/',
        			picture: 'http://fbrell.com/f8.jpg',
        			caption: 'Stage Completed',
        			description: response.name + " made it to " + Stages[Player.stage].name + " on Ice Cream Island!",
        			display: 'popup'
        		},
        		function(response) {

        		})
        	})
        })

    }

}

