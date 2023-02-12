/**
 * Structure:
 *	journey [ [
 *		[0]year : [
 *			[0]year (str) : <year>,
 *			[1]animal (array of imgs as required paths) : [ [0]light, [1]dark ]
 *		],
 *		[1]journeys : [ [
 *			[0]journey_name : [
 *				[0]journey_name (str) : <journey_name>,
 *				[(1)]client (str) : <client>,
 *				[(2)]client_link (str) : <client_link>
 *			],
 *			[1]read_more : [
 *				[(0)]case_content (str) : <case_name>,
 *				[(1)]object (array of imgs as required paths) : [ [0]light_default, [1]dark_default, [2]light_figure, [3]dark_figure, [4]light_active, [5]dark_active, [6]light_blink, [7]dark_blink ]
 *			],
 *			[2]journey_content : [ [
 *				[0]item_type (str) : ("text", "img-static", "img-zoomable", "img-scollable", "vid"(mp4), "iframe") ,
 *				[1]item_content (html str, OR img as required path, OR vid as required path) OR [1]iframe_type (str),
 *				[(2)]item_alt (str) OR [2]iframe_src (str or code),
 *				[(3)]item_caption (str) OR [3]iframe_ratio (str, height / width in percentage),
 *				[(4)]img_stylelist (str) OR [(4)]vid_width (str),
 *				[(5)]img_scrollable_width (str) OR [(5)]vid_poster (img as required path)
 *			], [...] ]
 *		], [...] ]
 *	], [...] ]
 */

export const journey = [

	// 2019
	[ ["2019", [require("./assets/journey/zodiacs/animal_pig_light@2x.png"), require("./assets/journey/zodiacs/animal_pig_dark@2x.png")],],

		[
			[ ["Little soldiers doodler", "CSE 8A"], [],
				[
					["text", "A small doodler function implemented with Python turtle, my first computational art ever. The content is based on the dark nursery rhyme \"<a href='https://en.wikipedia.org/wiki/And_Then_There_Were_None#Current_published_version_of_the_rhyme' target='_blank'>Ten Little Soldiers</a>\", in which each little soldier follows a unique manner of death, as drawn in red.",],
					["gallery", [
						["img-static", require("./assets/journey/2019/1_soldiers_doodler/3_soldiers.gif"), "3 littles soldiers doodle result", "when required to doodle 3 little soldiers", {maxWidth:"400px"},],
						["img-static", require("./assets/journey/2019/1_soldiers_doodler/10_soldiers.gif"), "10 littles soldiers doodle result", "doodling all 10 little soldiers", {maxWidth:"400px"},],
					]],
				],
			],

			[ ["Minesweeper & pixel letters typer based on 2D-array", "CSE 8A"], [],
				[
					["text", "When I first learnt about 2D-array, I tried to play with its applications beyond course requirements. I created an oversimplified Minesweeper game, and a pixel letter typer in the Python console. Looking back, they signify the two things that matter equally to me: logic and aesthetics.",],
					["gallery", [
						["img-static", require("./assets/journey/2019/2_minesweeper_typer/minesweeper.gif"), "MineSweeper demo", "playing MineSweeper in the Python console", {maxWidth:"400px"},],
						["img-static", require("./assets/journey/2019/2_minesweeper_typer/typer.jpeg"), "pixel letters typer demo", "<a href='https://youtu.be/xo1VInw-SKc' target='_blank'>Fight Song</a> by Rachel Platten, printed with my pixel letters typer", {maxWidth:"400px"},],
					]],
				],
			],

			[ ["The friendly Kaonashi robot", "CSE 42"], [],
				[
					["text", "A robot Kaonashi (aka No-Face from <a href='https://en.wikipedia.org/wiki/Spirited_Away' target='_blank'>Spirited Away</a>) that used ultrasonic sensor to detect distance, and waved his hand with a servo motor when he approached something or someone. This project involved Arduino programming, circuit design, 3D modeling, 3D printing, and sewing. <a href='https://www.linkedin.com/in/sarah-bodmer-464408190/' target='_blank'>Sarah</a> and I made a great team. Long live our friendship!",],
					["gallery", [
						["img-static", require("./assets/journey/2019/3_kaonashi/team_with_Sarah.jpeg"), "Sarah and I and our Kaonashi", "Great team work!", {maxWidth:"400px"},],
						["img-static", require("./assets/journey/2019/3_kaonashi/kaonashi.gif"), "Kaonashi project process", "from circuit design to 3D modeling, we spent 10 weeks and brought Kaonashi to life", {maxWidth:"400px"},],
					]],
				],
			],

			[ ["Mascot design and Earth Day poster", "Chinese Union"], [],
				[
					["text", "Fall 2019, I led a team of 3 and designed the mascot for <a href='https://www.chineseunion.org/' target='_blank'>Chinese Union</a>, a student organization that helps hundreds of international freshmen get familiar with their life abroad each year. Communicating closely with the executive board for feedback and refining the design accordingly, we ended up with a baby dragon whose tail fur is braided into a Chinese knot.",],
					["gallery", [
						["img-static", require("./assets/journey/2019/4_cu/CU_mascot_turnarounds.jpeg"), "mascot turnarounds", "turnarounds of the baby dragon mascot", {maxWidth:"400px"},],
						["img-static", require("./assets/journey/2019/4_cu/CU_mascot_color_trials.png"), "trails of 3 different color palettes", "3 examples of the color trails we made", {maxWidth:"480px"},],
					]],
					["text", "I also created poster illustrations for events and festivals.",],
					["img-zoomable", require("./assets/journey/2019/4_cu/2020_earth_day_poster.png"), "Earth Day poster", "Earth Day poster", {maxWidth:"400px"},],
				],
			],
		],
	],



	// 2020
	[ ["2020", [require("./assets/journey/zodiacs/animal_rat_light@2x.png"), require("./assets/journey/zodiacs/animal_rat_dark@2x.png")],],

		[
			[ ["Posters - Exploring inward", "VIS 41"], [],
				[
					["gallery", [
						["img-zoomable", require("./assets/journey/2020/1_posters_inward/section_of_gray_matter.jpeg"), "connotation poster side product", "", {maxWidth:"400px"},],
						["img-zoomable", require("./assets/journey/2020/1_posters_inward/text_behind_water.jpeg"), "text behind water", "", {maxWidth:"400px"},],
						["img-zoomable", require("./assets/journey/2020/1_posters_inward/denotation_poster.jpeg"), "denotation poster", "", {maxWidth:"400px"},],
						["img-zoomable", require("./assets/journey/2020/1_posters_inward/connotation_poster.jpeg"), "connotation poster", "", {maxWidth:"400px"},],
						["img-zoomable", require("./assets/journey/2020/1_posters_inward/spirits_in_me.jpeg"), "Xray photo and illustration overlay", "", {maxWidth:"400px"},],
						["img-zoomable", require("./assets/journey/2020/1_posters_inward/exibition_poster.jpeg"), "exibition poster", "", {maxWidth:"400px"},],
					]],
				],
			],

			[ ["MOM, a short fiction film about virtual world and family", "CAT 3"], [],
				[
					["text", "A story about Liam, a teenager in the future, who has a terrible relationship with his Dad. Liam escapes into MoM, the virtual world, whenever he has an argument with Dad. In MoM, Liam sometimes uses a girl avatar to catfish other players for goods and rewards. Until one day he comes across a real scammer, the Fake Game Manager. Scammed by the evil Fake GM and losing all his currencies, Liam bumps into his Dad who has accidentally entered the virtual world. The two bring Fake GM to justice, and during the process they got to resolve misunderstandings and reconcile with each other.",],
					["text", "All 4 of us on the team acted in the short film. I was in charge of video editing for the final production, using Adobe Premiere Pro.",],
					["vid", require("./assets/journey/2020/2_MoM/MoM.mp4"), "", "", "", require("./assets/journey/2020/2_MoM/MoM_thumbnail.png"),],
					["img-static", require("./assets/journey/2020/2_MoM/MoM_storyboard.png"), "MoM storyboard", "storyboard by me", {minWidth:"400px", maxWidth:"640px"},],
				],
			],

			[ ["Perspective sketches", "TDGE 87"], [],
				[
					["gallery", [
						["img-zoomable", require("./assets/journey/2020/3_perspective_sketches/1-point_perspective_sketch.jpeg"), "1-point perspective sketch of a corner of the UCSD campus, near the old student center", "1-point perspective sketch of a corner of campus", {maxWidth:"320px"},],
						["img-zoomable", require("./assets/journey/2020/3_perspective_sketches/2-point_perspective_sketch.jpeg"), "2-point perspective sketch of my dorm - bunk bed above desk", "2-point perspective sketch of my bed and desk", {maxWidth:"480px"},],
					]],
				],
			],

			[ ["Cell in the space, designed and modeled with SketchUp", "TDGE 87"], [],
				[
					["img-zoomable", require("./assets/journey/2020/4_cell_in_the_space/CitS_cover.png"), "cell in the space project cover", "", {maxWidth:"480px"},],
					["text", "A capsule room in an imaginary space where no gravity exists. Any wall can be the floor. Functional areas share the same central space of the cell, but differentiate from each other by orientation. A chaotic yet peaceful shelter. A meaningless but delightful place.",],
					["gallery", [
						["img-zoomable", require("./assets/journey/2020/4_cell_in_the_space/CitS_enter.png"), "cell in the space - enter", "", {maxWidth:"480px"},],
						["img-zoomable", require("./assets/journey/2020/4_cell_in_the_space/CitS_shower.png"), "cell in the space - shower", "", {maxWidth:"480px"},],
						["img-zoomable", require("./assets/journey/2020/4_cell_in_the_space/CitS_work.png"), "cell in the space - work", "", {maxWidth:"480px"},],
						["img-zoomable", require("./assets/journey/2020/4_cell_in_the_space/CitS_sleep.png"), "cell in the space - sleep", "", {maxWidth:"480px"},],
						["img-zoomable", require("./assets/journey/2020/4_cell_in_the_space/CitS_kitchen.png"), "cell in the space - wash and eat", "", {maxWidth:"480px"},],
					]],
				],
			],

			[ ["Egyptian dancers GIF based on stepping feet illusion", "COGS 17"], [],
				[
					["gallery", [
						["img-static", require("./assets/journey/2020/5_neurobiology_of_cognition/dancing_egyptians_illusion.gif"), "two bright-colored egyptian figures move across dense vertical lines, causing a stepping feet illusion", "the egyptian figures seem to dance accross the canvas due to <a href='https://en.wikipedia.org/wiki/Stepping_feet_illusion' target='_blank'>stepping feet illusion</a>", {maxWidth:"400px"},],
						["img-zoomable", require("./assets/journey/2020/5_neurobiology_of_cognition/cell_staining_notes.jpeg"), "my doodle notes on cell staining", "my doodle notes on cell staining", {maxWidth:"400px"},],
					]],
				],
			],

			[ ["Paper summary poster", "COGS 101C"], [],
				[
					["img-zoomable", require("./assets/journey/2020/6_paper_summary_poster/rabbit_hole_paper_summary_poster.jpeg"), "paper summary poster", "", {maxWidth:"400px"},],
				],
			],

			[ ["ThriveSD", "D4SD"], [],
				[
					["text", "Spring 2020, I collaborated with a group of problem solvers from various walks of life, and proposed a solution that could help small restaurants and homeless people survive the outbreak of Covid-19.",],
					["img-static", require("./assets/journey/2020/7_thrivesd/thrivesd_solution_transparent.png"), "ThriveSD solution flow diagram", "recover the supply and consumption chain, buy-1-give-1 to contribute daily to the community", {minWidth:"560px", maxWidth:"800px"/*, filter:"invert(1)"*/},],
				],
			],

			[ ["Illustrations for cognitive science and neuroscience popularization materials", "Neoreality"], [],
				[
					["text", "Since Winter 2020, I have been creating stylized illustrations for articles at Neoreality. Neoreality is a Wechat official account that popularizes knowledge and findings in the fields of cognitive science and neuroscience.",],
					["gallery", [
						["img-zoomable", require("./assets/journey/2020/8_neoreality/rat_1_crystal_skull.jpeg"), "crystal skull rat", "lab rat 1: crystal skull (aka <a href='https://www.sciencedirect.com/science/article/pii/S0165027021000352' target='_blank'>cranial window</a>)", {maxWidth:"320px"},],
						["img-zoomable", require("./assets/journey/2020/8_neoreality/rat_2_tetrode_recording.jpeg"), "tetrode recording rat", "lab rat 2: <a href='https://en.wikipedia.org/wiki/Single-unit_recording' target='_blank'>tetrode recording</a>", {maxWidth:"320px"},],
						["img-zoomable", require("./assets/journey/2020/8_neoreality/the_blind_man_and_the_elephants.jpeg"), "the blind man and the elephants", "the blind man and the elephants, illustrated for an article on perception and the classic thought experiment <a href='https://en.wikipedia.org/wiki/Molyneux%27s_problem' target='_blank'>Molyneux's problem</a>", {maxWidth:"400px"},],
						["img-zoomable", require("./assets/journey/2020/8_neoreality/eeg_1.png"), "EEG illustration 1", "<a href='https://en.wikipedia.org/wiki/Electroencephalography' target='_blank'>EEG</a> 1: speech of mind", {maxWidth:"400px"},],
						["img-zoomable", require("./assets/journey/2020/8_neoreality/eeg_2.png"), "EEG illustration 2", "EEG 2: strings of thoughts", {maxWidth:"320px"},],
						["img-zoomable", require("./assets/journey/2020/8_neoreality/sacculina_carcini.png"), "sacculina carcini in crab", "<a href='https://en.wikipedia.org/wiki/Sacculina' target='_blank'>sacculina</a>, a parasitic castrator that feminizes male crabs", {maxWidth:"480px"},],
					]],
					["text", "During the summer, I co-led the creation of a long-scroll comic post on loneliness, which is Neoreality's first post of this format. I designed the characters and style of the post. Then I spent a month weaving the line art in finest details, pixel by pixel, stroke by stroke, all with my finger on a phone screen. Check out the final post here: <a href='https://mp.weixin.qq.com/s/L-uOl1hxBeGsVr0k_ifKxw' target='_blank'>Loneliness is like an iceberg</a>.",],
					["img-scrollable", require("./assets/journey/2020/8_neoreality/loneliness_longscroll_final_line_drawing.jpeg"), "long-scroll post final line drawing", "", {minWidth:"400px", "--img-scrollable-ratio":"120%"}, "400px",],
					["gallery", [
						["img-zoomable", require("./assets/journey/2020/8_neoreality/loneliness_longscroll_character_design_1.png"), "long-scroll post character design sketches", "", {maxWidth:"240px"},],
						["img-zoomable", require("./assets/journey/2020/8_neoreality/loneliness_longscroll_character_design_3.png"), "long-scroll post illustration style variants", "", {maxWidth:"320px"},],
						["img-zoomable", require("./assets/journey/2020/8_neoreality/loneliness_longscroll_character_design_2.png"), "long-scroll post character design variants", "", {minWidth:"480px", maxWidth:"800px"},],
						["img-zoomable", require("./assets/journey/2020/8_neoreality/loneliness_longscroll_character_design_4.png"), "Tachie of the finalized character design", "", {maxWidth:"320px"},],
						["img-zoomable", require("./assets/journey/2020/8_neoreality/loneliness_longscroll_character_design_5.jpeg"), "illustration to communicate the intended vibe of the character", "", {maxWidth:"400px"},],
					]],
				],
			],

			[ ["Gaokao, Fighting! hand-drawn animation"], [],
				[
					["gallery", [
						["img-static", require("./assets/journey/2020/9_gaokao_fighting/gaokao_fighting_animation_1.gif"), "throw graduation caps, flip calendar", "", {maxWidth:"480px"},],
						["img-static", require("./assets/journey/2020/9_gaokao_fighting/gaokao_fighting_animation_2.gif"), "days pass by as we work hard", "", {maxWidth:"480px"},],
						["img-static", require("./assets/journey/2020/9_gaokao_fighting/gaokao_fighting_animation_3.gif"), "finally, arrives the day of Gaokao", "", {maxWidth:"480px"},],
					]],
					["text", "To every Chinese student in the public education system, Gaokao, the national college entrance exam, is not only an opportunity to test ourselves and fight for our dreams, but also a beam of firework that commemorates all the laughter and tears in our youth. Too many memories. Too many emotions. The fledglings are ready to go their separate ways, and I am here to wish them good luck with all my heart.",],
					["text", "Check out the full video here: <a href='https://www.bilibili.com/video/BV1AD4y1Q7gv/?share_source=copy_web' target='_blank'>2020高考加油</a>.",],
					//["iframe", "bilibili", "<iframe src='//player.bilibili.com/player.html?aid=711083465&bvid=BV1AD4y1Q7gv&amp;cid=204724955&amp;page=1' style='position: absolute; transform: translateX(-50%); left: 50%; top: 0; width: 100%; maxWidth: 800px; height: 100%;' scrolling='no' border='0' frameborder='no' framespacing='0' allowfullscreen='true'> </iframe>",],
				],
			],

			[ ["Play with eggs"], [],
				[
					["gallery", [
						["img-static", require("./assets/journey/2020/10_play_eggs/egg_rolls.jpeg"), "egg rolls with cheese, meat, and pepper", "egg rolls", {maxWidth:"400px"},],
						["img-static", require("./assets/journey/2020/10_play_eggs/egg_crepes_cake.jpeg"), "egg crepes cake with banana and chocolate topping", "egg crepes cake", {maxWidth:"400px"},],
						["img-zoomable", require("./assets/journey/2020/10_play_eggs/egg_crepes_doodle_recipe.png"), "egg crepes doodle recipe", "how to make egg crepes with a rice cooker", {maxWidth:"400px"},],
					]],
				],
			],
		]
	],



	// // 2021
	// [ ["2021", [require("./assets/journey/zodiacs/animal_ox_light@2x.png"), require("./assets/journey/zodiacs/animal_ox_dark@2x.png")],],

	// 	[
	// 		[ ["name", "client"], [],
	// 			[],
	// 		],
	// 	],
	// ],



	// // 2022
	// [ ["2022", [require("./assets/journey/zodiacs/animal_tiger_light@2x.png"), require("./assets/journey/zodiacs/animal_tiger_dark@2x.png")],],

	// 	[
	// 		[ ["name", "client"], [],
	// 			[],
	// 		],
	// 	],
	// ],



	// // 2023
	// [ ["2023", [require("./assets/journey/zodiacs/animal_rabbit_light@2x.png"), require("./assets/journey/zodiacs/animal_rabbit_dark@2x.png")],],

	// 	[
	// 		[ ["name", "client"], [],
	// 			[],
	// 		],
	// 	],
	// ],
]
