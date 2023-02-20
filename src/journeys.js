/**
 * Structure:
 *	journey [ [
 *		[0]year : [
 *			[0]year (str) : <year>,
 *			[1]animal (array of imgs as required paths) : [ [0]light, [1]dark ],
 *			[2]animal_explanation (str): <animal_explanation>
 *		],
 *		[1]journeys : [ [
 *			[0]journey_name : [
 *				[0]journey_name (str) : <journey_name>,
 *				[(1)]client (str) : <client>,
 *				[(2)]client_link (str) : <client_link>
 *			],
 *			[1]read_more : [
 *				[(0)]case_content (str) : <case_name>,
 *				[(1)]object (array of imgs as required paths) : [ [0]light_default, [1]dark_default, [2]light_active, [3]dark_active, [4]light_blink, [5]dark_blink ]
 *			],
 *			[2]journey_content : [ [ [
 *				[0]num_column (int) : (1, 2) ,
 *				[1]column_1 (array of SectionContent's) : [ <group_imgs> ],
 *				[(2)]column_2 (str) : <group_text>
 *			], [...] ], [...] ]
 *		], [...] ]
 *	], [...] ]
 */

export const journey = [

	// 2019
	[ ["2019", [require("./assets/journey/zodiacs/animal_pig_light@2x.png"), require("./assets/journey/zodiacs/animal_pig_dark@2x.png")], "year of the Pig, the 12th animal in the Chinese zodiac"],

		[
			[ ["Little soldiers doodler", "CSE 8A"], [],
				[ [ 2,
					[ ["img-static", require("./assets/journey/2019/1_soldiers_doodler/3_soldiers.gif"), "3 littles soldiers doodle result", "",],
						["img-static", require("./assets/journey/2019/1_soldiers_doodler/10_soldiers.gif"), "10 littles soldiers doodle result", "",], ],
					"A small doodler function implemented with Python turtle, my first computational art ever. The content is based on the dark nursery rhyme \"<a href='https://en.wikipedia.org/wiki/And_Then_There_Were_None#Current_published_version_of_the_rhyme' target='_blank'>Ten Little Soldiers</a>\", in which each little soldier follows a unique manner of death, as drawn in red.",
				], ],
			],

			[ ["Minesweeper & pixel letters typer based on 2D-array", "CSE 8A"], [],
				[ [ 2,
					[ ["img-static", require("./assets/journey/2019/2_minesweeper_typer/minesweeper.gif"), "MineSweeper demo", "",],
						["img-static", require("./assets/journey/2019/2_minesweeper_typer/typer.jpeg"), "pixel letters typer demo", "",], ],
					"When I first learnt about 2D-array, I tried to play with its applications beyond course requirements. I created an oversimplified Minesweeper game, and a pixel letter typer in the Python console. Looking back, they signify the two things that matter equally to me: logic and aesthetics.",
				], ],
			],

			[ ["The friendly Kaonashi robot", "CSE 42"], [],
				[ [ 2,
					[ ["img-static", require("./assets/journey/2019/3_kaonashi/team_with_Sarah.jpeg"), "Sarah and I and our Kaonashi", "",],
						["img-static", require("./assets/journey/2019/3_kaonashi/kaonashi.gif"), "Kaonashi project process", "",], ],
					"A robot Kaonashi (aka No-Face from <a href='https://en.wikipedia.org/wiki/Spirited_Away' target='_blank'>Spirited Away</a>) that used ultrasonic sensor to detect distance, and waved his hand with a servo motor when he approached something or someone. This project involved Arduino programming, circuit design, 3D modeling, 3D printing, and sewing. <a href='https://www.linkedin.com/in/sarah-bodmer-464408190/' target='_blank'>Sarah</a> and I made a great team. Long live our friendship!",
				], ],
			],

			[ ["Mascot design and Earth Day poster", "Chinese Union"], [],
				[ [ 2,
					[ ["img-static", require("./assets/journey/2019/4_cu/CU_mascot_color_trials.png"), "trails of 3 different color palettes", "",],
						["img-static", require("./assets/journey/2019/4_cu/CU_mascot_turnarounds.jpeg"), "mascot turnarounds", "",], ],
					"Fall 2019, I led a team of 3 and designed the mascot for <a href='https://www.chineseunion.org/' target='_blank'>Chinese Union</a>, a student organization that helps hundreds of international freshmen get familiar with their life abroad each year. Communicating closely with the executive board for feedback and refining the design accordingly, we ended up with a baby dragon whose tail fur is braided into a Chinese knot.",
				], [ 2,
					[ ["img-zoomable", require("./assets/journey/2019/4_cu/2020_earth_day_poster.png"), "Earth Day poster", "",], ],
					"I also created poster illustrations for events and festivals. This is a poster for the Earth Day.",
				], ],
			],
		],
	],



	// 2020
	[ ["2020", [require("./assets/journey/zodiacs/animal_rat_light@2x.png"), require("./assets/journey/zodiacs/animal_rat_dark@2x.png")], "year of the Rat, the 1st animal in the Chinese zodiac"],

		[
			[ ["ThriveSD", "D4SD"], [],
				[ [ 2,
					[ ["img-zoomable", require("./assets/journey/2020/1_thrivesd/thrivesd_solution.png"), "ThriveSD solution flow diagram", "",], ],
					"Recover the supply and consumption chain via a \"buy one give one\" modal - This is a solution that we proposed to help small restaurants and homeless people survive the outbreak of Covid-19. During spring 2020, I collaborated with a group of problem solvers from various walks of life, practiced design thinking, researched stakeholders, and came up with this proposal.",
				], ],
			],

			[ ["Illustrations for cognitive science and neuroscience popularization materials", "Neureality"],
				["Neureality", [require("./assets/cases/Neureality/object_Neureality_light@2x.png"), require("./assets/cases/Neureality/object_Neureality_dark@2x.png"), require("./assets/cases/Neureality/object_Neureality_light_active@2x.png"), require("./assets/cases/Neureality/object_Neureality_dark_active@2x.png"), require("./assets/cases/Neureality/object_Neureality_light_blink@2x.png"), require("./assets/cases/Neureality/object_Neureality_dark_blink@2x.png")],],
				[ [ 2,
					[ ["img-static", require("./assets/journey/2020/2_neoreality/rat_1_crystal_skull.jpeg"), "crystal skull rat", "",],
						["img-static", require("./assets/journey/2020/2_neoreality/rat_2_tetrode_recording.jpeg"), "tetrode recording rat", "",],
						["img-static", require("./assets/journey/2020/2_neoreality/eeg.png"), "illustration on the topic of EEG", "",], ],
					"Since Winter 2020, I have been creating stylized illustrations for articles at Neureality, in order to popularizes knowledge and findings in the fields of cognitive science and neuroscience.",
				], ],
			],

			[ ["MOM, a fiction film about virtual world and family", "CAT 3"], [],
				[ [ 2,
					[ ["img-zoomable", require("./assets/journey/2020/3_MoM/MoM_storyboard.png"), "MoM storyboard", "",],
							["vid", require("./assets/journey/2020/3_MoM/MoM.mp4"), "", "", "100%", require("./assets/journey/2020/3_MoM/MoM_thumbnail.png"),], ],
					"A short fiction film by a team of 4. I was in charge of storyboarding, and video editing for the final production using Adobe Premiere Pro.",
				], [ 1,
					[ ["text", "The story is about Liam, a teenager in the future, who has a terrible relationship with his Dad. Liam escapes into MoM, the virtual world, whenever he has an argument with Dad. In MoM, Liam sometimes uses a girl avatar to catfish other players for goods and rewards. Until one day he comes across a real scammer, the Fake Game Manager. Scammed by the evil Fake GM and losing all his currencies, Liam bumps into his Dad who has accidentally entered the virtual world. The two bring Fake GM to justice, and during the process they got to resolve misunderstandings and reconcile with each other."], ],
				], ],
			],

			[ ["Egyptian dancers illusion", "COGS 17"], [],
				[ [ 2,
					[ ["img-static", require("./assets/journey/2020/4_egyptian_dancer/dancing_egyptians_illusion.gif"), "two bright-colored egyptian figures move across dense vertical lines, causing a stepping feet illusion", "",], ],
					"The egyptian figures seem to dance accross the canvas due to <a href='https://en.wikipedia.org/wiki/Stepping_feet_illusion' target='_blank'>stepping feet illusion</a>.",
				], ],
			],

			[ ["Cell in the space", "TDGE 87"], [],
				[ [ 2,
					[ ["img-static", require("./assets/journey/2020/5_cell_in_the_space/CitS_cover.png"), "cell in the space project cover", "",], ],
					"A design and modeling practice with SketchUp. Cell in the space is a capsule room in an imaginary space where no gravity exists. Any wall can be the floor. Functional areas share the same central space of the cell, but differentiate from each other by orientation. A chaotic yet peaceful shelter. A meaningless but delightful place.",
				], [ 1,
					[ ["img-zoomable", require("./assets/journey/2020/5_cell_in_the_space/CitS_enter.png"), "cell in the space - enter", "",],
						["img-zoomable", require("./assets/journey/2020/5_cell_in_the_space/CitS_shower.png"), "cell in the space - shower", "",],
						["img-zoomable", require("./assets/journey/2020/5_cell_in_the_space/CitS_work.png"), "cell in the space - work", "",],
						["img-zoomable", require("./assets/journey/2020/5_cell_in_the_space/CitS_sleep.png"), "cell in the space - sleep", "",],
						["img-zoomable", require("./assets/journey/2020/5_cell_in_the_space/CitS_kitchen.png"), "cell in the space - wash and eat", "",], ],
				], ],
			],

			[ ["Posters - Exploring inward", "VIS 41"], [],
				[ [ 1,
					[ ["img-zoomable", require("./assets/journey/2020/6_posters_inward/section_of_gray_matter.jpeg"), "connotation poster side product", "",],
						["img-zoomable", require("./assets/journey/2020/6_posters_inward/text_behind_water.jpeg"), "text behind water", "",],
						["img-zoomable", require("./assets/journey/2020/6_posters_inward/denotation_poster.jpeg"), "denotation poster", "",],
						["img-zoomable", require("./assets/journey/2020/6_posters_inward/connotation_poster.jpeg"), "connotation poster", "",],
						["img-zoomable", require("./assets/journey/2020/6_posters_inward/spirits_in_me.jpeg"), "Xray photo and illustration overlay", "",],
						["img-zoomable", require("./assets/journey/2020/6_posters_inward/exibition_poster.jpeg"), "exibition poster", "",], ],
				], ],
			],

			[ ["Perspective sketches and doodle notes", "TDGE 87, COGS 17, COGS 101C, recipe"], [],
				[ [ 1,
					[ ["img-zoomable", require("./assets/journey/2020/7_sketches_doodles/1-point_perspective_sketch.jpeg"), "1-point perspective sketch of a corner of the UCSD campus, near the old student center", "",,],
						["img-zoomable", require("./assets/journey/2020/7_sketches_doodles/2-point_perspective_sketch.jpeg"), "2-point perspective sketch of my dorm - bunk bed above desk", "",],
						["img-zoomable", require("./assets/journey/2020/7_sketches_doodles/rabbit_hole_paper_summary_poster.jpeg"), "paper summary poster on cross-cultural sociolinguistics", "",],
						["img-zoomable", require("./assets/journey/2020/7_sketches_doodles/cell_staining_notes.jpeg"), "",],
						["img-zoomable", require("./assets/journey/2020/7_sketches_doodles/egg_crepes_doodle_recipe.png"), "egg crepes doodle recipe", "",], ],
				], ],
			],

			[ ["Gaokao, Fighting! hand-drawn animation", "Shanghai Yan'an High School"], [],
				[ [ 1,
					[ ["text", "To every Chinese student in the public education system, Gaokao, the national college entrance exam, is not only an opportunity to test ourselves and fight for our dreams, but also a beam of firework that commemorates all the laughter and tears in our youth. Too many memories, too many emotions. June 2020, when the fledglings were ready to go their separate ways, I animated a video to wish them good luck with all my heart. Check out the full video here: <a href='https://www.bilibili.com/video/BV1AD4y1Q7gv/?share_source=copy_web' target='_blank'>2020高考加油</a>.",], ],
				], [ 1,
					[ ["img-static", require("./assets/journey/2020/8_gaokao_fighting/gaokao_fighting_animation_1.gif"), "throw graduation caps, flip calendar", "",],
						["img-static", require("./assets/journey/2020/8_gaokao_fighting/gaokao_fighting_animation_2.gif"), "days pass by as we work hard", "",],
						["img-static", require("./assets/journey/2020/8_gaokao_fighting/gaokao_fighting_animation_3.gif"), "finally, arrives the day of Gaokao", "",], ],
				], ],
			],
		]
	],



	// 2021
	[ ["2021", [require("./assets/journey/zodiacs/animal_ox_light@2x.png"), require("./assets/journey/zodiacs/animal_ox_dark@2x.png")], "year of the Ox, the 2nd animal in the Chinese zodiac"],

		[
			[ ["GroupReads, complete assigned readings together", "COGS 120"],
				["GroupReads", [require("./assets/cases/GroupReads/object_GroupReads_light@2x.png"), require("./assets/cases/GroupReads/object_GroupReads_dark@2x.png"), require("./assets/cases/GroupReads/object_GroupReads_light_active@2x.png"), require("./assets/cases/GroupReads/object_GroupReads_dark_active@2x.png"), require("./assets/cases/GroupReads/object_GroupReads_light_blink@2x.png"), require("./assets/cases/GroupReads/object_GroupReads_dark_blink@2x.png")],],
				[ [ 2,
					[ ["img-static", require("./assets/journey/2021/1_groupreads/groupreads_cover_slide.png"), "GroupReads teaser slide", "",],
						["img-static", require("./assets/journey/2021/1_groupreads/groupreads_paper_prototype_1.png"), "paper prototype: solve question", "",],
						["img-static", require("./assets/journey/2021/1_groupreads/groupreads_paper_prototype_2.png"), "paper prototype: browse forum with embedded paragraph", "",], ],
					"My first design + development project. Looking back, there are a lot of things to improve on. But as a first step, GroupReads was definitely a memorable and rewarding learning and teamwork experience! Read my case study for details.",
				], ],
			],

			[ ["Poster design under constraints", "DSGN 100"], [],
				[ [ 2,
					[ ["img-zoomable", require("./assets/journey/2021/2_poster_training/poster_1_process.png"), "poster design 1: using color blocks and visual contrasts to guide the audience's attention", "",],
						["img-zoomable", require("./assets/journey/2021/2_poster_training/poster_2.png"), "poster design 2: mysterious orchid and white colors and gentle thin layers pattern on black background", "",],
						["img-zoomable", require("./assets/journey/2021/2_poster_training/poster_3.png"), "poster design 3: youthful blue and yellow colors and playful diagnal layout", "",], ],
					"A poster design practice. The task was to organize a chunck of heavily worded content and several provided assets into an exhibition poster.",
				], ],
			],
		],
	],



	// // 2022
	// [ ["2022", [require("./assets/journey/zodiacs/animal_tiger_light@2x.png"), require("./assets/journey/zodiacs/animal_tiger_dark@2x.png")], "year of the Tiger, the 3rd animal in the Chinese zodiac"],

	// 	[
	// 		[ ["name", "client"], [],
	// 			[],
	// 		],
	// 	],
	// ],



	// // 2023
	// [ ["2023", [require("./assets/journey/zodiacs/animal_rabbit_light@2x.png"), require("./assets/journey/zodiacs/animal_rabbit_dark@2x.png")], "year of the Rabbit, the 4th animal in the Chinese zodiac"],

	// 	[
	// 		[ ["name", "client"], [],
	// 			[],
	// 		],
	// 	],
	// ],
]
