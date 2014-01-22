var Stages = [

	{
		name: "Soft Serve Surprise", 
		nicename: "soft_serve_surprise",
		levels: [


		{
			timed: true, 
			time: 70,
			haspar: true,
			par: 60, 
			startingCell: [1,1],
			board: [
			[[0,0,0,0,0,0],
			 [0,1,2,1,1,0],
			 [0,1,2,2,3,0],
			 [0,1,1,1,1,0],
			 [0,3,1,3,2,0],
			 [0,0,0,0,0,0]]
			],
			map: [
			[["o","o","o","o","o","o"],
			 ["o","r","o","o","o","o"],
			 ["o","r","o","o","o","o"],
			 ["o","r","o","o","o","o"],
			 ["o","o","r","r","r","o"],
			 ["o","o","o","o","o","o"]]
			]
		},


		{
			timed: true, 
			time: 70,
			haspar: true,
			par: 60, 
			startingCell: [2,1],
			board: [
			[[1,1,2,2,0,0],
			 [1,1,2,2,0,0],
			 [3,3,0,0,0,0],
			 [3,3,0,0,0,0],
			 [0,0,0,0,0,0],
			 [0,0,0,0,0,0]]
			],
			map: [
			[["r","r","r","r","o","o"],
			 ["r","r","r","r","o","o"],
			 ["s","s","o","o","o","o"],
			 ["s","s","o","o","o","o"],
			 ["o","o","o","o","o","o"],
			 ["o","o","o","o","o","o"]]
			]
		},

		{
			timed: true, 
			time: 70,
			pard: true,
			par: 60, 
			startingCell: [0,0],
			board: [
			[[1,2,0,2,1,0],
			 [2,1,2,3,1,0],
			 [0,1,1,2,0,0],
			 [3,3,2,1,3,0],
			 [1,3,0,1,3,0],
			 [0,0,0,0,0,0]]
			],
			map: [
			[["r","o","o","r","o","o"],
			 ["o","o","r","r","o","o"],
			 ["o","r","r","o","o","o"],
			 ["r","r","r","r","o","o"],
			 ["o","r","o","o","r","o"],
			 ["o","o","o","o","o","o"]]
			]
		}, 

		{
			timed: true, 
			time: 70,
			haspar: false,
			par: 60, 
			startingCell: [0,0],
			board: [
			[[1,2,2,2,1,0],
			 [3,0,0,0,3,0],
			 [2,1,1,1,2,0],
			 [3,0,0,0,3,0],
			 [1,2,2,2,1,0],
			 [0,0,0,0,0,0]]
			],
			map: [
			[["r","s","s","s","r","o"],
			 ["r","o","o","o","r","o"],
			 ["r","s","s","s","r","o"],
			 ["r","o","o","o","r","o"],
			 ["r","s","s","s","r","o"],
			 ["o","o","o","o","o","o"]]
			]
		},

		{
			timed: true, 
			time: 70,
			haspar: false,
			par: 60, 
			startingCell: [0,2],
			board: [
			[[0,0,2,2,0,0],
			 [0,0,2,2,0,0],
			 [1,1,3,3,1,1],
			 [1,1,3,3,1,1],
			 [0,0,2,2,0,0],
			 [0,0,2,2,0,0]]
			],
			map: [
			[["o","o","s","s","o","o"],
			 ["o","o","s","s","o","o"],
			 ["s","s","s","s","s","s"],
			 ["s","s","s","s","s","s"],
			 ["o","o","s","s","o","o"],
			 ["o","o","s","s","o","o"]]
			]
		}


		] // end soft serve surprise levels

	}, // end soft serve surprise stage


	{
		name: "Strawberry Fields", 
		nicename: "strawberry_fields",
		levels: [


		{
			timed: true, 
			time: 71,
			haspar: true,
			par: 60, 
			startingCell: [0,0],
			board: [
			[[3,1,2,2,1,3],
			 [1,3,2,2,3,1],
			 [2,2,3,3,2,2],
			 [2,2,3,3,2,2],
			 [1,3,2,2,3,1],
			 [3,1,2,2,1,3]]
			],
			map: [
			[["r","r","r","r","r","r"],
			 ["r","r","r","r","r","r"],
			 ["r","r","r","r","r","r"],
			 ["r","r","r","r","r","r"],
			 ["r","r","r","r","r","r"],
			 ["r","r","r","r","r","r"]]
			]
		},

		{
			timed: true, 
			time: 55,
			haspar: false,
			par: 60, 
			startingCell: [0,0],
			board: [
			[[0,0,1,0,0,0],
			 [0,2,2,2,0,0],
			 [3,2,0,2,3,0],
			 [0,2,2,2,0,0],
			 [0,0,1,0,0,0],
			 [0,0,0,0,0,0]]
			],
			map: [
			[["o","o","r","o","o","o"],
			 ["o","r","r","r","o","o"],
			 ["s","r","o","r","s","o"],
			 ["o","r","r","r","o","o"],
			 ["o","o","r","o","o","o"],
			 ["o","o","o","o","o","o"]]
			]
		}


		] // end demo2 levels

	} // end demo2 stage

] // end stages