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
	[ ["2019", [require("./assets/journey/zodiacs/animal_pig_light@2x.png"), require("./assets/journey/zodiacs/animal_pig_dark@2x.png")], "year of the Pig, the last animal in the Chinese zodiac"],

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
			[ ["UI design internship at Bitsrealm", "Bitsrealm"],
				["Bitsrealm", [require("./assets/cases/Bitsrealm/object_Bitsrealm_light@2x.png"), require("./assets/cases/Bitsrealm/object_Bitsrealm_dark@2x.png"), require("./assets/cases/Bitsrealm/object_Bitsrealm_light_active@2x.png"), require("./assets/cases/Bitsrealm/object_Bitsrealm_dark_active@2x.png"), require("./assets/cases/Bitsrealm/object_Bitsrealm_light_blink@2x.png"), require("./assets/cases/Bitsrealm/object_Bitsrealm_dark_blink@2x.png")],],
				[ [ 2,
					[ ["img-zoomable", require("./assets/journey/2021/1_bitsrealm/mobile_1.png"), "Bitsrealm mobile website prototype 1", "",],
						["img-zoomable", require("./assets/journey/2021/1_bitsrealm/mobile_2.png"), "Bitsrealm mobile website prototype 2", "",],
						["img-zoomable", require("./assets/journey/2021/1_bitsrealm/performer.png"), "Bitsrealm performer-end prototype", "",],
						/*["img-zoomable", require("./assets/journey/2021/1_bitsrealm/audience.png"), "Bitsrealm virtual concert audience-end UI prototype", "",],*/ ],
					"During my 6-week internship at Bitsrealm, a VR game company in Shanghai, I designed a series of 4 websites along the UX flow of a virtual concert, while closely communicating with game writers and developers.",
				], ],
			],

			[ ["Ambulance dispatching system redesign for Cruz Roja", "The Red Cross, Global TIES"],
				["CruzRoja", [require("./assets/cases/CruzRoja/object_CruzRoja_light@2x.png"), require("./assets/cases/CruzRoja/object_CruzRoja_dark@2x.png"), require("./assets/cases/CruzRoja/object_CruzRoja_light_active@2x.png"), require("./assets/cases/CruzRoja/object_CruzRoja_dark_active@2x.png"), require("./assets/cases/CruzRoja/object_CruzRoja_light_blink@2x.png"), require("./assets/cases/CruzRoja/object_CruzRoja_dark_blink@2x.png")],],
				[ [ 2,
					[ ["img-zoomable", require("./assets/journey/2021/2_cruzroja/prototype_1.png"), "CruzRoja prototype 1", "",],
						["img-zoomable", require("./assets/journey/2021/2_cruzroja/prototype_2.png"), "CruzRoja prototype 2", "",], ],
					"With a cross-disciplinary team, we redesigned the UI of an ambulance dispatching system that arranges emergency service in Tijuana, Mexico. We improved interaction efficiency and information display of the complex system.",
				], ],
			],

			[ ["Upgrade website for ACM@UCSD", "ACM@UCSD"],
				["ACM", [require("./assets/cases/ACM/object_ACM_light@2x.png"), require("./assets/cases/ACM/object_ACM_dark@2x.png"), require("./assets/cases/ACM/object_ACM_light_active@2x.png"), require("./assets/cases/ACM/object_ACM_dark_active@2x.png"), require("./assets/cases/ACM/object_ACM_light_blink@2x.png"), require("./assets/cases/ACM/object_ACM_dark_blink@2x.png")],],
				[ [ 2,
					[ ["img-zoomable", require("./assets/journey/2021/3_acm/home.png"), "ACM home page", "",],
						["img-zoomable", require("./assets/journey/2021/3_acm/communities_1.png"), "ACM communities page 1", "",],
						["img-zoomable", require("./assets/journey/2021/3_acm/communities_2.png"), "ACM communities page 2", "",], ],
					"To help ACM@UCSD attract potential members, my team upgraded its website. We reorganized the layout, collected new contents, and made the interactions more intuitive.",
				], ],
			],

			[ ["E-commerce fullfiller dashboard for a startup", "Atlas"], [],
				[ [ 1,
					[ ["img-zoomable", require("./assets/journey/2021/4_atlas/home.png"), "Atlas home page", "",],
						["img-zoomable", require("./assets/journey/2021/4_atlas/inbox.png"), "Atlas home page", "",],
						["img-zoomable", require("./assets/journey/2021/4_atlas/orders.png"), "Atlas orders page", "",],
						["img-zoomable", require("./assets/journey/2021/4_atlas/partners.png"), "Atlas partners page", "",], ],
				], ],
			],

			[ ["RehaBuddy, menstrual dignity for girls in Pune, India", "Idea Lab"],
				["RehaBuddy", [require("./assets/cases/RehaBuddy/object_RehaBuddy_light@2x.png"), require("./assets/cases/RehaBuddy/object_RehaBuddy_dark@2x.png"), require("./assets/cases/RehaBuddy/object_RehaBuddy_light_active@2x.png"), require("./assets/cases/RehaBuddy/object_RehaBuddy_dark_active@2x.png"), require("./assets/cases/RehaBuddy/object_RehaBuddy_light_blink@2x.png"), require("./assets/cases/RehaBuddy/object_RehaBuddy_dark_blink@2x.png")],],
				[ [ 1,
					[ ["img-static", require("./assets/journey/2021/5_rehabuddy/prototype_illustration.png"), "RehaBuddy prototype illustration", "",],
						["img-zoomable", require("./assets/journey/2021/5_rehabuddy/sketch1.jpg"), "RehaBuddy sketch 1", "",],
						["img-zoomable", require("./assets/journey/2021/5_rehabuddy/sketch2.jpg"), "RehaBuddy sketch 2", "",],
						["img-zoomable", require("./assets/journey/2021/5_rehabuddy/sketch3.jpg"), "RehaBuddy sketch 3", "",], ],
				], ],
			],

			[ ["PadPal, menstrual dignity for girls in Pune, India", "Project Kilimanjaro, Global TIES"],
				["PadPal", [require("./assets/cases/PadPal/object_PadPal_light@2x.png"), require("./assets/cases/PadPal/object_PadPal_dark@2x.png"), require("./assets/cases/PadPal/object_PadPal_light_active@2x.png"), require("./assets/cases/PadPal/object_PadPal_dark_active@2x.png"), require("./assets/cases/PadPal/object_PadPal_light_blink@2x.png"), require("./assets/cases/PadPal/object_PadPal_dark_blink@2x.png")],],
				[ [ 2,
					[ ["img-static", require("./assets/journey/2021/6_padpal/bag_showcase.png"), "PadPal bag physical prototype", "",],
						["img-zoomable", require("./assets/journey/2021/6_padpal/instruction_final.jpg"), "instruction flyer", "",], ],
					"Period being a taboo topic prevents girls and women in rural Pune, India from properly managing their menstrual health. But period is a normal and beautiful part of life, and nothing to be ashamed of. Together with non-profit organization Project Kilimanjaro, my team designed a menstrual care bag with an instruction manual, that can be easily hand-sewed and used to carry menstrual products safely and sanitarily.",
				], ],
			],

			[ ["GroupReads, complete assigned readings together", "COGS 120"],
				["GroupReads", [require("./assets/cases/GroupReads/object_GroupReads_light@2x.png"), require("./assets/cases/GroupReads/object_GroupReads_dark@2x.png"), require("./assets/cases/GroupReads/object_GroupReads_light_active@2x.png"), require("./assets/cases/GroupReads/object_GroupReads_dark_active@2x.png"), require("./assets/cases/GroupReads/object_GroupReads_light_blink@2x.png"), require("./assets/cases/GroupReads/object_GroupReads_dark_blink@2x.png")],],
				[ [ 2,
					[ ["img-static", require("./assets/journey/2021/7_groupreads/groupreads_cover_slide.png"), "GroupReads teaser slide", "",],
						["img-static", require("./assets/journey/2021/7_groupreads/groupreads_paper_prototype_1.png"), "paper prototype: solve question", "",],
						["img-static", require("./assets/journey/2021/7_groupreads/groupreads_paper_prototype_2.png"), "paper prototype: browse forum with embedded paragraph", "",], ],
					"My first design + development project. Looking back, there are a lot of things to improve on. But as a first step, GroupReads was definitely a memorable and rewarding learning and teamwork experience! Read my case study for details.",
				], ],
			],

			[ ["Poster design under constraints", "DSGN 100"], [],
				[ [ 2,
					[ ["img-zoomable", require("./assets/journey/2021/8_poster_training/poster_1_process.png"), "poster design 1: using color blocks and visual contrasts to guide the audience's attention", "",],
						["img-zoomable", require("./assets/journey/2021/8_poster_training/poster_2.png"), "poster design 2: mysterious orchid and white colors and gentle thin layers pattern on black background", "",],
						["img-zoomable", require("./assets/journey/2021/8_poster_training/poster_3.png"), "poster design 3: youthful blue and yellow colors and playful diagnal layout", "",], ],
					"A poster design practice. The task was to organize a chunck of heavily worded content and several provided assets into an exhibition poster.",
				], ],
			],

		],
	],



	// 2022
	[ ["2022", [require("./assets/journey/zodiacs/animal_tiger_light@2x.png"), require("./assets/journey/zodiacs/animal_tiger_dark@2x.png")], "year of the Tiger, the 3rd animal in the Chinese zodiac"],

		[
			[ ["Goods transport app for farmers in Bhutan", "FirstMile Bhutan, TSE"],
				[/*"LAK", [require("./assets/cases/LAK/object_LAK_light@2x.png"), require("./assets/cases/LAK/object_LAK_dark@2x.png"), require("./assets/cases/LAK/object_LAK_light_active@2x.png"), require("./assets/cases/LAK/object_LAK_dark_active@2x.png"), require("./assets/cases/LAK/object_LAK_light_blink@2x.png"), require("./assets/cases/LAK/object_LAK_dark_blink@2x.png")],*/],
				[ [ 2,
					[ ["img-zoomable", require("./assets/journey/2022/1_lak/add_job_1.png"), "LAK add job flow 1", "",],
						["img-zoomable", require("./assets/journey/2022/1_lak/add_job_2.png"), "LAK add job flow 1", "",],
						["img-zoomable", require("./assets/journey/2022/1_lak/current_jobs.png"), "LAK current job screen", "",],
						["img-zoomable", require("./assets/journey/2022/1_lak/job_details.png"), "LAK job details screen", "",], ],
					"To connect farmers and truckers in Bhutan and improve good transportation, we built an Android app similar to Uber Eats. In the app, farmers can post jobs and track delivery progress, and drivers can search for suitable jobs and maximize their profits.",
				], ],
			],

			[ ["Volunteer hub to help granting wishes to children", "Make-A-Wish, TSE"],
				[/*"MAW", [require("./assets/cases/MAW/object_MAW_light@2x.png"), require("./assets/cases/MAW/object_MAW_dark@2x.png"), require("./assets/cases/MAW/object_MAW_light_active@2x.png"), require("./assets/cases/MAW/object_MAW_dark_active@2x.png"), require("./assets/cases/MAW/object_MAW_light_blink@2x.png"), require("./assets/cases/MAW/object_MAW_dark_blink@2x.png")],*/],
				[ [ 2,
					[ ["img-zoomable", require("./assets/journey/2022/2_maw/volunteers_management.png"), "MAW volunteers management", "",],
						["img-zoomable", require("./assets/journey/2022/2_maw/wish_granting_document_holder.png"), "MAW wish-granting document page", "",],
						["img-zoomable", require("./assets/journey/2022/2_maw/calendar.png"), "MAW calendar page", "",], ],
					"Make-A-Wish's mission is to grant wishes to children with critical illness. My team built a volunteer hub that fulfills their needs to coordinate the diverse volunteer base and smoothen the wish-granting process.",
				], ],
			],

			[ ["Website revamp and marketing for a senior monitoring startup", "Mercury Health"], [],
				[ [ 2,
					[ ["img-zoomable", require("./assets/journey/2022/3_mercury_health/home.png"), "Mercury Health home page", "",],
						["img-zoomable", require("./assets/journey/2022/3_mercury_health/solution.png"), "Mercury Health solution page", "",], ],
					"I interned for 15 weeks at Mercury Health, a remote senior monitoring start-up. Being the only designer on the team, I was in charge of everything design-relevant:<br/><ul><li>I rebranded and redesigned the <a href='https://www.mercuryalert.ai/' target='_blank'>product website</a>, enhancing its usability and sense of professionalism.</li></ul>",
				],[ 2,
					[ ["img-static", require("./assets/journey/2022/3_mercury_health/business_card.png"), "Mercury Health business card example", "",],
						["img-zoomable", require("./assets/journey/2022/3_mercury_health/trifold.png"), "Mercury Health trifold", "",], ],
					"<ul><li>I iterated the sponsorship decks, business card, trifold, and questionnaires, and managed to attract new sponsors for the company.</li><li>I created graphic design for instagram and facebook posts 3 times per week, and increased the like count by 50%.</li></ul>",
				], [ 1,
					[ ["img-zoomable", require("./assets/journey/2022/3_mercury_health/post1.png"), "Mercury Health post 1", "",],
						["img-zoomable", require("./assets/journey/2022/3_mercury_health/post2.png"), "Mercury Health post 2", "",],
						["img-zoomable", require("./assets/journey/2022/3_mercury_health/post3.png"), "Mercury Health post 3", "",],
						["img-zoomable", require("./assets/journey/2022/3_mercury_health/post4.png"), "Mercury Health post 4", "",],
						["img-zoomable", require("./assets/journey/2022/3_mercury_health/post5.png"), "Mercury Health post 5", "",],
						["img-zoomable", require("./assets/journey/2022/3_mercury_health/post6.png"), "Mercury Health post 6 ", "",], ],
				], ],
			],

			// [ ["...", "Creativity Lab"], [],
			// 	[ [ 2,
			// 		[ ["img-static", require("./assets/journey/2022/4_creativity_lab/....png"), "...", "",], ],
			// 		"..",
			// 	], ],
			// ],

			[ ["Design opportunity seeking presentation on layering", "DSGN 118"], [],
				[ [ 2,
					[ ["vid", require("./assets/journey/2022/5_problem_seeking/layer_problem_presentation.mp4"), "", "", "100%", require("./assets/journey/2022/5_problem_seeking/layer_problem_presentation_thumbnail.png"),], ],
					"The feature of layering in softwares such as Photoshop makes digital content creation flexible and efficient. However, each layer forms an \"uncrossable wall\", preventing easy creation and adjustment of shapes with complex overlapping relationships. I reviewed existing researches on this problem, and proposed \"depth mask\" as a possible solution.",
				], ],
			],

			[ ["3D art", "VIS 3, TDDE 1, CSE 167"], [],
				[ [ 1,
					[ ["img-zoomable", require("./assets/journey/2022/6_3d_art/to_verbalize.png"), "3 of my to-verbalize pieces", "",],
						["img-zoomable", require("./assets/journey/2022/6_3d_art/wearable_mask_of_explosion.jpg"), "mask of explosion", "",],
						["img-zoomable", require("./assets/journey/2022/6_3d_art/monument_seesaw.png"), "20220524 monument - seesaw", "",],
						["img-zoomable", require("./assets/journey/2022/6_3d_art/concept_moodboard.png"), "new A Midsummer Night's Dream 3D concept moodboard", "",],
						["img-zoomable", require("./assets/journey/2022/6_3d_art/mad_hatters_afternoon_tea.png"), "computational art rendering - mad hatter's afternoon tea", "",], ],
				], ],
			],

			[ ["Dear inheritor, interactive artpiece", "VIS 147A"], [],
				[ [ 2,
					[ ["img-static", require("./assets/journey/2022/7_electronic_art/the_inheritor_demo.png"), "the inheritor", "",], ],
					"\"I was standing. You were there. Two worlds collided. And they could never, ever tear us apart.\" May the shared gaze connect souls across the river of time. Art concept implemented with simple Arduino program.",
				], ],
			],

		],
	],



	// 2023
	[ ["2023", [require("./assets/journey/zodiacs/animal_rabbit_light@2x.png"), require("./assets/journey/zodiacs/animal_rabbit_dark@2x.png")], "year of the Rabbit, the 4th animal in the Chinese zodiac"],

		[
			[ ["Mentorship app networking high school students and alumni", "ALUM for Northwood, TSE"],
				[/*"ALUM", [require("./assets/cases/ALUM/object_ALUM_light@2x.png"), require("./assets/cases/ALUM/object_ALUM_dark@2x.png"), require("./assets/cases/ALUM/object_ALUM_light_active@2x.png"), require("./assets/cases/ALUM/object_ALUM_dark_active@2x.png"), require("./assets/cases/ALUM/object_ALUM_light_blink@2x.png"), require("./assets/cases/ALUM/object_ALUM_dark_blink@2x.png")],*/],
				[ [ 2,
					[ ["img-zoomable", require("./assets/journey/2023/1_alum/login.png"), "ALUM add job flow 1", "",],
						["img-zoomable", require("./assets/journey/2023/1_alum/sign-up.png"), "ALUM add job flow 1", "",],
						["img-zoomable", require("./assets/journey/2023/1_alum/profile.png"), "ALUM current job screen", "",],
						["img-zoomable", require("./assets/journey/2023/1_alum/pre-session.png"), "ALUM current job screen", "",],
						["img-zoomable", require("./assets/journey/2023/1_alum/home.png"), "ALUM job details screen", "",], ],
					"Hearing the needs of ALUM for Northwood, we are designing an iOS app to help students in Northwood High School network with alumni mentors, schedule meetings, and pursue their goals. This is an on-going project. Case study is yet to come...",
				], ],
			],

			[ ["Website for Cheese Club, where cheese and love are shared", "Cheese Club"], [],
				[ [ 2,
					[ ["img-zoomable", require("./assets/journey/2023/2_cheese_club/home.png"), "Cheese Club website home page", "",],
						["img-zoomable", require("./assets/journey/2023/2_cheese_club/about.png"), "Cheese Club website about us page", "",],
						["img-zoomable", require("./assets/journey/2023/2_cheese_club/event.png"), "Cheese Club website events page", "",],
						["img-zoomable", require("./assets/journey/2023/2_cheese_club/event_details.png"), "Cheese Club website event details", "",], ],
					"My roommates and I founded Cheese Club as a response to the return-to-school challenge following the COVID-19 pandemic. By hosting many cheese-related events, we aim to create a safe space for students to connect and socialize. Check out our website that I designed using Figma and implemented using Webflow: <a href='https://cheese-club-ucsd.webflow.io/' target='_blank'>Cheese Club</a>.",
				], ],
			],

			[ ["Marketing Lead for Triton Software Engineering", "TSE"], [],
				[ [ 1,
					[ ["img-zoomable", require("./assets/journey/2023/3_tse_marketing/project_spotlight_sample.png"), "TSE marketing project spotlight sample", "",],
						["img-zoomable", require("./assets/journey/2023/3_tse_marketing/appplication_prompt.png"), "TSE marketing application prompt", "",],
						["img-zoomable", require("./assets/journey/2023/3_tse_marketing/recruitment_general_info_flyer.png"), "TSE marketing recruitment general info flyer", "",],
						["img-zoomable", require("./assets/journey/2023/3_tse_marketing/intern_panel_flyer.png"), "TSE marketing intern panel flyer", "",],
						["img-zoomable", require("./assets/journey/2023/3_tse_marketing/internship_spotlight_sample.png"), "TSE marketing internship spotlight sample", "",], ],
				], ],
			],


			// [ ["...", "CSE 169"], [],
			// 	[ [ 1,
			// 		[ ["img-zoomable", require("./assets/journey/2023/4_3d_animation/XXX.png"), "...", "",], ],
			// 	], ],
			// ],

		],
	],

]
