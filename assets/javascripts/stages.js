var Stages = [

	{
		name: "Test", 
		nicename: "test",
		levels: [


		{
			timed: false, 
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
			 ["o","o","r","o","o","o"],
			 ["o","o","o","o","o","o"],
			 ["o","o","o","o","o","o"],
			 ["o","o","o","o","o","o"],
			 ["o","o","o","o","o","o"]]
			]
		}


		] // end test levels

	}, // end test stage

	{
		name: "Demo", 
		nicename: "demo",
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
		} 



		] // end demo levels

	}, // end demo stage


	{
		name: "Demo2", 
		nicename: "demo2",
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
		}


		] // end demo2 levels

	} // end demo2 stage

] // end stages