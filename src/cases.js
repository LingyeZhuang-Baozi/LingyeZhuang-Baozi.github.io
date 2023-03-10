/** TODO: tiptool for when cursor:help
 * Structure:
 *	cases {
 *		<case_name> : [
 *			[0]case_name (str) : <case_name>,
 *			[1]brief (array) : {
 *				"title" (str),
 *				"description" (str),
 *				"thumbnail" (img as required path), "thumbnail_light" (img as required path), "thumbnail_dark" (img as required path),
 *				"case_brief" (array): [
 *					["role", <role>],
 *					["duration", <duration>],
 *					["location", <location>],
 *					["workshop", <workshop>],
 *					...
 *				],
 *				"next" (str)
 *			},
 *			[2]object (array of imgs as required paths) : [ [0]light_default, [1]dark_default, [2]light_figure, [3]dark_figure, [4]light_active, [5]dark_active, [6]light_blink, [7]dark_blink ],
 *			[3]case_content : [ [
 *				[0]section_type (str) : ("intro", "problem", "section", "subsection", "evidence") ,
 *				[1]section_identifier (str) : ("Overview", "Need Finding", "User Research", "Design", "Implementation", "Takeaways", "Reflection", "Outcomes", ...)
 *				[2]section_content : [ [
 *					[0]item_type (str) : ("title", "text", "img-static", "img-zoomable", "img-scollable", "vid"(mp4), "iframe", "gallery", "freestyle") ,
 *					[1]item_content (html str, OR img as required path, OR vid as required path) OR [1]iframe_type (str),
 *					[(2)]title_explanation (str) OR item_alt (str) OR [2]iframe_src (str or code),
 *					[(3)]item_caption (str) OR [(3)]iframe_ratio (str, height / width in percentage),
 *					[(4)]img_stylelist (style) OR [(4)]vid_width (str),
 *					[(5)]img_scrollable_width (str) OR [(5)]vid_poster (img as required path)
 *				], [...] ],
 *				[(3)]side_notes: alternative_title for "problem" section_type (str) OR gallery_classlist (str)
 *			], [...] ]
 *		],
 * 		... : [...]
 *	}
 */

import { isSafari, isIE } from "react-device-detect";

export const cases = {

/**--- Four Devarajas ---**/

	"ACM": [
		"ACM",
		{
			"title": "Upgrade website for ACM@UCSD",
			"description": "To help ACM@UCSD attract potential members, my team upgraded its website. We reorganized the layout, collected new contents, and made the interactions more intuitive.",
			"thumbnail": require("./assets/cases/ACM/ACM_thumbnail.png"),
			"thumbnail_light": require("./assets/cases/ACM/ACM_thumbnail_light.png"),
			"thumbnail_dark": require("./assets/cases/ACM/ACM_thumbnail_dark.png"),
			"case_brief": [
				["role", "UX/UI designer"],
				["duration", "February-June, 2021"],
				// ["link", "<a href='https://acmucsd.com/' target='_blank'>ACM@UCSD</a>"],
			],
			"next": "RehaBuddy",
		},
		[require("./assets/cases/ACM/object_ACM_light@2x.png"), require("./assets/cases/ACM/object_ACM_dark@2x.png"), require("./assets/cases/ACM/object_ACM_light_figure@2x.png"), require("./assets/cases/ACM/object_ACM_dark_figure@2x.png"), require("./assets/cases/ACM/object_ACM_light_active@2x.png"), require("./assets/cases/ACM/object_ACM_dark_active@2x.png"), require("./assets/cases/ACM/object_ACM_light_blink@2x.png"), require("./assets/cases/ACM/object_ACM_dark_blink@2x.png"),],
		[
			["intro", "Overview", [
				["text", "ACM@UCSD is a student community for developers and designers. In order to embrace a wider audience, more efficiently and comprehensively introduce ACM@UCSD, we decided to upgrade our website by enriching the content and improving the interactions.",],
			]],
			["problem", "", [
				["text", "The ACM website wants to shift from sponsor-oriented to member-focused. This calls for an upgrade to gather and offer sufficient information, and enhance user experience.",],
			]],
			["intro", "", [
				["img-static", require("./assets/cases/ACM/content/1_1_old_userflow.png"), "old workflow", "old user flow of the ACM website",],
			]],
			["section", "User Research", [
				["title", "See through users' eyes",],
				["text", "What do college students look for on a student organization's website? To understand the needs of potential members, we quickly dived into testing the old website. Our interviewees range from current board members to UCSD students who had never heard of ACM before.",],
				["text", "During the interviews, there were some comments that we heard repeatedly:",],
				["img-static", require("./assets/cases/ACM/content/1_2_feedback_wordcloud.png"), "feedback wordcloud",],
				["text", "The biggest issue in the old website, almost all introductions are too <span style='--color:#51C0C059;'>brief or general</span>. Students new to the organization still can't imagine what ACM is by reading the provided information. Therefore, our first job would be to enrich the website content and ensure the information is specific and descriptive.",],
				["text", "Many interviewees also complained about the <span style='--color:#F9A85759;'>unintuitive naming and flow of the buttons</span>. For example, the \"join us now\" button at the beginning of the home page caused confusion, since the viewer wouldn't have read anything about why they should join by that point.",],
				["text", "Among positive feedback, the <span style='--color:#FF6F6F59;'>aesthetic style</span> of the old website was widely appreciated, so we decided to keep to it.",],
				["text", "These come down to the new workflow:",],
				["img-static", require("./assets/cases/ACM/content/1_3_new_workflow.png"), "new workflow", "", {width:"90vw", minWidth:"800px"},],
			]],
			["section", "Design", [
				["title", "Only after a thousand entreaties does she appear", "A quote from the Chinese poem Song of the Lute Player. It can mean that \"great things take time\"."],
				["text", "I want to tell you about 2 features that I am most proud of. It was through many iterations that we came to these solutions that work the best.",],
			]],
			["subsection", "", [
				["title", "Sub-community page",],
				["text", "On the old website, sub-communities appeared merely as names. The users had to click them one by one to get further information. Even then, some of the links directly led to the sub-communities' discords instead of any description page, which was very unacceptable according to our interviewees.",],
				["img-static", require("./assets/cases/ACM/content/2_1_community_old.png"), "on the old website, the communities section is too insufficient", "sub-communities section in the old website, too brief to be understood", {width:"40%", minWidth:"400px", WebkitFilter:"var(--image-shadow-filter)", filter:"var(--image-shadow-filter)"},],
				["text", "To collectively display introductions to sub-communities, we <span style='--color:#51C0C059;'>added a \"communities\" tab</span> to the website.",],
				["text", "We first planned to put all sub-communities information as an accordion list. The users would be able to read and compare the basic descriptions of all sub-communities just by scrolling. While upon clicking, videos and images of each sub-community's events and projects would expand to show.",],
				["img-scrollable", require("./assets/cases/ACM/content/2_2_community_lowfi.png"), "low-fi prototype of community page", "desktop iteration 1: accordion list", {minWidth:"400px", WebkitFilter:((isSafari||isIE) ? "" : "var(--image-shadow-filter)"), filter:((isSafari||isIE) ? "" : "var(--image-shadow-filter)"), boxShadow:((isSafari||isIE) ? "var(--image-shadow-boxshadow)" : "")},],
				["text", "Then we heard that most sub-communities wanted to customize their own website beyond our main one, since their focuses varied widely. So we decided to only offer the most basic and important information in text on the communities page, with links to each sub-community's social media and own website.",],
				["text", "I took charge of <span style='--color:#816DFF59;'>contacting each sub-community</span> to collect their principles, event types, and social medias for showcase.",],
				["img-scrollable", require("./assets/cases/ACM/content/2_3_community_midfi.png"), "community page without side bar", "desktop iteration 2: brief intro + links", {minWidth:"400px", WebkitFilter:((isSafari||isIE) ? "" : "var(--image-shadow-filter)"), filter:((isSafari||isIE) ? "" : "var(--image-shadow-filter)"), boxShadow:((isSafari||isIE) ? "var(--image-shadow-boxshadow)" : "")},],
				["text", "Now that the paragraphs were up, we noticed the sub-community sections floating in the space of whiteness looked unsettled and indistinguishable. We tried giving each section a background color block, yet again they appeared thick and dirty.",],
				["text", "I thought of shrinking the color block to only a bar on the side. The result turned out pleasing.",],
				["text", "The <span style='--color:#FF6F6F59;'>lovely pastel bars</span> added a cozy feeling to the sub-community sections. They successfully distinguished the sections from each other, while maintaining the minimalist style.",],
				["img-scrollable", require("./assets/cases/ACM/content/2_4_community_final.png"), "community page with color bars", "desktop iteration 3: color bars are added", {minWidth:"400px", WebkitFilter:((isSafari||isIE) ? "" : "var(--image-shadow-filter)"), filter:((isSafari||isIE) ? "" : "var(--image-shadow-filter)"), boxShadow:((isSafari||isIE) ? "var(--image-shadow-boxshadow)" : "")},],
				["text", "When converting to the mobile version, we met a problem: If all contents were still laid out on the same page it became an inefficient long scroll.",],
				["text", "To avoid this, we decided to separate the mobile communities page into <span style='--color:#F9A85759;'>multiple subpages</span>, each of which containing one sub-community. We hoped that the users could read in any order and wouldn't have to go back and forth, so sub-community navigation buttons were made available on every subpage.",],
				["img-static", require("./assets/cases/ACM/content/2_5_community_mobile.png"), "4 iterations of the mobile communities page", "mobile iterations of the communities page", {minWidth:"560px", WebkitFilter:"var(--image-shadow-filter)", filter:"var(--image-shadow-filter)"},],
				["text", "Among the above four iterations, we chose 𝟒 in the end. Compared with 𝟙 and 𝟚, 𝟒 uses space more efficiently. Compared with 𝟛, 𝟒 better leads the users to read the the sub-co description.",],
			]],
			["subsection", "", [
				["title", "Board member section",],
				["text", "ACM had been seeking to introduce its board members to website viewers for long. Our interviewees also agreed that the website would feel more humanized with names and faces shown.",],
				["img-static", require("./assets/cases/ACM/content/3_1_board_old.png"), "on the old website, there was not an actual board section", "the old website prompted people to join the board without informing what the board was like", {width:"40%", minWidth:"400px", WebkitFilter:"var(--image-shadow-filter)", filter:"var(--image-shadow-filter)"},],
				["text", " Our concept for displaying the board was to write each member into a <span style='--color:#51C0C059;'>small profile card</span>. To handle the large size of ACM, we decided to offer a <span style='--color:#F9A85759;'>filter</span>, so the users could search for members from specific sub-co.",],
				["img-static", require("./assets/cases/ACM/content/3_2_board_lowfi.png"), "low-fi prototypes of board filters", "chip filters was preferred over the other alternatives for its vibe of youth", {minWidth:"400px", WebkitFilter:"var(--image-shadow-filter)", filter:"var(--image-shadow-filter)"},],
				["text", "Among different ways to visualize the filter, we chose to use chips. The casual rounded chips brought with them a vibe of youth. Intuitively, we color coded the filters according to the theme colors of each sub-co. Such color coding was applied to the profile cards too.",],
				["img-static", require("./assets/cases/ACM/content/3_3_board_hifi.png"), "board filters variations", "we iterated, compared, and found the most appealing color coding", {minWidth:"400px", WebkitFilter:"var(--image-shadow-filter)", filter:"var(--image-shadow-filter)"},],
				["text", "To make profile cards that could clearly display enough information while align with the minimalist style, we brainstormed many possibilities and <span style='--color:#816DFF59;'>discussed their tradeoffs</span>:<ul><li>A diamond shaped profile photo would be unique and aligns with the shape of ACM's logo, but it could fail upon long title or name;</li><li>Giving pictures rounded corners mimicked physical cards, yet also softened the sense of professionalism;</li><li>Color in the background unitized the card contents, but could be distracting with six different color codes.</li></ul>",],
				["img-static", require("./assets/cases/ACM/content/4_board_card_adjustment.png"), "board member card rough variation", "the many versions of profile cards I made, arrow indicates the one we chose", {minWidth:"480px", WebkitFilter:"var(--image-shadow-filter)", filter:"var(--image-shadow-filter)"},],
			]],
			["section", "Takeaways", [
				["title", "Communication with the development team",],
				["text", "We had regular meetings every other week with the development team, who worked on implementing our design. This was very helpful both in terms of getting valuable feedback and practicing the skill of communicating our design decisions.",],
				["text", "Edge cases that we didn't consider at first were brought up by the development team during actual implementation. For example, what to display when there is no event coming up in the near future, how to arrange very long board titles, how to handle phone screens of different sizes.",],
				["text", "By communicating with the developers, I heard what was easy to do and what was hard. Gradually I got a better sense of the cost-effect efficiency of implementation.",],
			]],
			["evidence", "", [
				["text", "See the ACM website that we upgraded here: <a href='https://acmucsd.com/' target='_blank'>ACM@UCSD</a>.",],
				["text", "Thank you to my designmates <a href='https://michelemurakami.com/index.html' target='_blank'>Michele</a> and <a href='https://linkedin.com/in/tlee016' target='_blank'>Tiffany</a>.",],
			]],
			// ["section", "Reflection", [
			// 	["title", "What will I do differently today?",],
			// 	["text", "...",],
			// ]],
		],
	],

	"RehaBuddy": [
		"RehaBuddy",
		{
			"title": "RehaBuddy, electronic pet for stroke rehabilitation",
			"description": "Conceptualized a haptics tamagotchi therapy putty, to keep stroke patients motivated in performing recovery exercise.",
			"thumbnail": require("./assets/cases/RehaBuddy/RehaBuddy_thumbnail.png"),
			"thumbnail_light": require("./assets/cases/RehaBuddy/RehaBuddy_thumbnail_light.png"),
			"thumbnail_dark": require("./assets/cases/RehaBuddy/RehaBuddy_thumbnail_dark.png"),
			"case_brief": [
				["duration", "March-June, 2021"],
				["workshop", "Idea Lab program"],
			],
			"next": "Bitsrealm",
		},
		[require("./assets/cases/RehaBuddy/object_RehaBuddy_light@2x.png"), require("./assets/cases/RehaBuddy/object_RehaBuddy_dark@2x.png"), require("./assets/cases/RehaBuddy/object_RehaBuddy_light_figure@2x.png"), require("./assets/cases/RehaBuddy/object_RehaBuddy_dark_figure@2x.png"), require("./assets/cases/RehaBuddy/object_RehaBuddy_light_active@2x.png"), require("./assets/cases/RehaBuddy/object_RehaBuddy_dark_active@2x.png"), require("./assets/cases/RehaBuddy/object_RehaBuddy_light_blink@2x.png"), require("./assets/cases/RehaBuddy/object_RehaBuddy_dark_blink@2x.png"),],
		[
			["intro", "", [
				["vid", require("./assets/cases/RehaBuddy/content/presentation.mp4"), "", "", "", require("./assets/cases/RehaBuddy/content/RehaBuddy_thumbnail.png"),],
			]],
			["section", "", [
				["title", "Transcript",],
				["text", "Today I will introduce my conceptual design of RehaBuddy.",],
				["text", "Stroke happens when blood supply to part of the brain is interrupted, typically leading to weakness and numbness in limbs, especially among seniors.",],
				["text", "For upper-limb recovery, patients will do exercises for months, even years. Yet pain, boredness, post-stroke depression, all affect adherence, even knowing that recovery exercise is necessary.",],
				["text", "I am thinking, we cannot avoid having to do these exercises, but maybe we can add more motivation with a device that detects recovery progress and provides encouraging feedback? I ended up with RehaBuddy, a haptics and musical tamagotchi therapy putty, which I will expand on.",],
				["text", "Going back a little bit, let's look at existing products and research on stroke recovery.",],
				["text", "The thing with stroke recovery tools nowadays are:<ul><li>Passive tools or stimulators become boring quickly;</li><li>Responsive technologies are always expensive, and often dependent on a laptop, which is unportable and many elderlies have trouble getting used to it;</li><li>There are curriculums out there, which are fun and cheap. However they have to be performed with a therapist, and thus you cannot have it everyday.</li></ul>",],
				["text", "That is why I try to find a solution to provide motivation that:<ul><li>Could be more affordable;</li><li>Simpler, avoiding computers;</li><li>Avoids having to be over-dependent on other people's assistance, so the practice can be done on a home and daily basis.</li></ul>",],
				["text", "I was recommended the works by Professor Caitlyn Seim from Stanford university, which really inspired me a lot.",],
				["text", "Let me introduce to you my concept RehaBuddy, a small device that you can grab in hand and do recovery exercises while holding it. With the help of some built-in sensors, the device should detect the user‘s movement. So when you are squeezing the surface, or moving around when practicing shoulders and elbows, the sensors within RehaBuddy, probably touch sensors and gyroscope etc, they know you are exercising. And to celebrate this, it will produce enjoyable sound, and vibration feedback.",],
				["text", "Why do I focus on haptics and musical feedback instead of the visual side? When the user is doing physical exercise, it would be uncomfortable to require them to focus their eyes somewhere to receive visual encouragement, but sound in the air and haptics stimuli on the skin from the device surface is not limited by that. Also, musical and haptics stimulation are known to drive neural reconnection and skill acquisition. In fact they are seen applied to many of the existing products for stroke recovery today.",],
				["text", "Among various types of haptics feedback, I pick strong vibration, which is a suitable type of feedback for stroke patients, according to Prof. Caitlyn's research. Since stroke patients have numbness in the affected hand, they are less sensitive to normal level of haptics feedback and more tolerant to strong vibration. So the strong vibration can get into their heart.",],
				["text", "The size and shape of RehaBuddy mimics a therapy putty, which is like a squishy ball for finger recovery, that is commonly used, and thus an already-learnt convention among stroke patients. Compared with glove-shaped devices, which the patient will need help to even put them on and off, a therapy putty shape is simple to grab on and start exercising with. It is straightforward enough that, even if the patient has not used a regular therapy putty before, there is little difficulty in learning it, and such ease to learn is very important for senior users.",],
				["text", "As a motivation strategy, my device works similarly to a tamagotchi pet. If you practice regularly and properly with it, it likes you and grows and enhances feedback. But if you don't practice for too long, the pet might get sick, in other words the feedback level will decline, and you will have to start over again if you stop for too long.",],
				["text", "Moreover, the feedback is not simply repeating each time. This is according to another research which showed that unpredictability, in other words having unpredictable changes, could add to a motivation application.",],
				["text", "Unlike a traditional tamagotchi, you cannot see the image of your digital pet. But as mentioned before, you can hear it and feel it when you do recovery exercise.",],
				["text", "I interviewed therapists and stroke patients. An important thing that I was told by the therapists is that the word \"motivation\" could be a dangerous concept in the field of stroke recovery, since it is easy to slip into ambiguously judging a patient's motivation, or labeling a patient as motivated or not, which is bad. So I want to point out that when I say my product helps motivate stroke patients, my target users are those who have left hospital already, and started home-based recovery, but found it hard to keep up. My product just aims to provide an external source of push when giving up appears to be so easy, and persisting is hard.",],
				["text", "This is merely a conceptual design according to interviews and literature reviews. There are still many problems to solve if we are to actually implement it. For instance:<ul><li>How can we simplify sensors and motors required to fit them into a therapy putty size?</li><li>If the patient stops exercising for a while and RehaBuddy sort of dies, the feedback declines, then what degree of declining would be the most proper, so the user is on one hand motivated to exercise consistently to prevent RehaBuddy from dying, while still willing to start over if they happen to pause exercising for some reason?</li><li>Additionally, for the built-in sensors, one thing that needs to be solved is how to differentiate exercising from simply carrying the device around? Or much harder, how to differentiate the exercising with the stroke-affected arm from exercising with the fine arm?</li></ul>",],
			]],
			// ["section", "Reflection", [
			// 	["title", "What will I do differently today?",],
			// 	["text", "...",],
			// ]],
		],
	],

	"Bitsrealm": [
		"Bitsrealm",
		{
			"title": "UI design internship at Bitsrealm",
			"description": "During my 6-week internship at Bitsrealm, a VR game company in Shanghai, I closely communicated with planners and developers to design a series of 4 websites along the UX flow of a virtual concert.",
			"thumbnail": require("./assets/cases/Bitsrealm/Bitsrealm_thumbnail.png"),
			"thumbnail_light": require("./assets/cases/Bitsrealm/Bitsrealm_thumbnail_light.png"),
			"thumbnail_dark": require("./assets/cases/Bitsrealm/Bitsrealm_thumbnail_dark.png"),
			"case_brief": [
				["role", "UX/UI designer, Front-end developer"],
				["duration", "Summer 2021"],
				["location", "Shanghai, China"],
			],
			"next": "CruzRoja",
		},
		[require("./assets/cases/Bitsrealm/object_Bitsrealm_light@2x.png"), require("./assets/cases/Bitsrealm/object_Bitsrealm_dark@2x.png"), require("./assets/cases/Bitsrealm/object_Bitsrealm_light_figure@2x.png"), require("./assets/cases/Bitsrealm/object_Bitsrealm_dark_figure@2x.png"), require("./assets/cases/Bitsrealm/object_Bitsrealm_light_active@2x.png"), require("./assets/cases/Bitsrealm/object_Bitsrealm_dark_active@2x.png"), require("./assets/cases/Bitsrealm/object_Bitsrealm_light_blink@2x.png"), require("./assets/cases/Bitsrealm/object_Bitsrealm_dark_blink@2x.png"),],
		[
			["intro", "Overview", [
				["text", "When I interned at Bitsrealm, the VR startup only had 6 members. Thanks to the compact size, every member took on a big share of responsibility, and we formed a tight bond among our team. I was the only designer on the team, and I produced branding and prototypes for a series of 4 websites during my 6 weeks internship. I had a glance of the fast pace of the industry, upgraded my design skill, and received precious friendship.",],
			]],
			["problem", "", [
				["text", "Bitsrealm is planning its first virtual concert. It needs 4 UI designs to supplement the event:<ol><li>a main website to introduce the project and attract audience,</li><li>a ticketing flow,</li><li>an control center for the artist during performance,</li><li>a mobile end interface that allows audience without VR device to watch and interact with the concert.</li></ol>",],
				["img-static", require("./assets/cases/Bitsrealm/content/1_4_websites_relationship.png"), "4 website relationship", "relationship between the 4 websites", {maxWidth:"560px"},],
			]],
			["section", "Design", [
				["title", "Branding and design choices",],
				["text", "Branding is identity, branding is promise. To create a sense of futuristic, I decided the theme colors would be neon on dark background, as in the classical impression of cyberpunk. But to emphasize uniqueness and technologicalness, I avoided the banal pink and blue, and chose a fresh light green as the neon color. As a subtle touch, glassmorphism prevented the dark background from over rigidity. Upon the supervisor's request, I maintained a minimalist style in both the color palette and the typography.",],
				["text", "In the following, I will expand on 4 features that I am most proud of - one from each website that I designed.",],
			]],
			["subsection", "", [
				["title", "Main website: navigation bar",],
				["text", "Navigation bar is nothing fancy. The goal is to be simple, precise, efficient. Despite being easily discoverable, it should capture as little attention as possible compared with the content on the page.",],
				["text", "With these principles in mind, I quickly settled the desktop navbar to be the most conventional layout, with logo on the left end and tabs on the right. Each tab is summarized into a two-character word, so it only takes a short glance for the user to form a correct expectation for where all the tabs lead to. The \"login\" button is visually different from the rest of the tabs, since all other tabs lead to webpages, while \"logging in\" is an action.",],
				["img-static", require("./assets/cases/Bitsrealm/content/2_1_navbar_desktop_E.png"), "desktop navigation", "desktop navigation", {minWidth:"792px"/*800px min page width - 4px margin on each side*/},],
				["text", "For the mobile version, it took a few trials to find the most suitable design.",],
				["img-static", require("./assets/cases/Bitsrealm/content/2_2_navbar_mobile_layout.png"), "low-fidelity variations of mobile navigation", "low-fidelity variations of the layout of mobile navigation",],
				["text", "It is unrealistic to lay all the tabs out as the desktop version, since the tabs will be either too small or too crowded, and thus will be prone to user errors.",],
				["text", "Bottom nav is also abandoned. If I was designing for a mobile app, bottom nav might be a good option. But for a mobile website, a bottom nav could cluster with the inbuilt navbar of search engines or the android nav buttons. Additionally, we had secondary tabs under at least one of the pages, and combining bottom nav with another row of tabs may cause confusion.",],
				["text", "Therefore, hamburger menu became the most appealing option. A trade-off is that, the extra tapping needed to pull out the nav menu might reduce its discoverability. Yet this wouldn't be a problem. For most target users who are interested in digital technology, the three lines hamburger icon has already been tightly associated with \"menu\". Even if a user happens to be unfamiliar with this, it only takes one click for them to learn it.",],
				["img-static", require("./assets/cases/Bitsrealm/content/2_3_navbar_mobile.png"), "design decision for mobile navigation", "final design decision for mobile navigation",],
				["text", "I also tried multiple variations for indicating the current page. In the end, I decided to be consistent with the desktop website, but increased the weight of the highlight to be more visible on the mobile site.",],
				["img-static", require("./assets/cases/Bitsrealm/content/2_4_navbar_mobile_current_page_indicator.png"), "mid-fidelity variations of the current page indicator in mobile navigation ", "variations of current page indicator in mobile navigation", {minWidth:"560px"},],
				["text", "Secondary tabs, when needed, would be attached below the header bar. I noticed that, according to the functionality of each primary webpage, some pages have secondary tabs that are different from the others. Specifically, the secondary tabs throughout the website should be further divided into the following 2 types, and I gave each type a different visual design.",],
				["text", "The first type is \"categories\". For example, one of the primary pages in the website is a \"Explore\" page, which shows upcoming virtual events. The secondary tabs on this \"Explore\" page list all available event genres - switching between the tabs, the user can view events with specific genres. The number of this type of tabs, tabs for categories, could increase as the content grows. If in the future more tabs are added, the row should be able to hold all the new tabs by extending beyond the screen into a scrollable carousel.",],
				["img-static", require("./assets/cases/Bitsrealm/content/2_5_secondary_tabs_categories.png"), "secondary \"categories\" tabs for desktop and mobile", "secondary \"categories\" tabs", {maxWidth:"320px"},],
				["text", "The other type of secondary tabs is \"sub-navigation\". For example, each artist user owns a personal hub on the website, which consists of 3 sub-blocks: a hub \"Home\" for self-introduction, an \"Event\" section for advertising the next event, and a \"Chatroom\" for communication with fans. The secondary tabs in this case are used to navigate around those 3 blocks. The artist hub has a settled structure, and the number of secondary tabs here is unlikely to change. So I designed this type of tabs to span the screen width, and provided each tab with a representative icon for higher distinguishability.",],
				["img-static", require("./assets/cases/Bitsrealm/content/2_6_secondary_tabs_subnav.png"), "secondary \"sub-navigation\" tabs for desktop and mobile", "secondary \"sub-navigation\" tabs", {maxWidth:"320px"},],
				//["text", "Here is a demo of the navigation bar:",],
				//["vid", /*require("")*/, "navigation demo",],
			]],
			["subsection", "", [
				["title", "Ticketing site: ticket cards",],
				["text", "Saying goes, \"Stand on the shoulders of giants to see further\". In order to design some perfect ticket cards, I first referred to event websites such as <a href='https://www.huodongxing.com' target='_blank'>HuoDongXing</a> and flight ticket apps like Kayak. I noticed 2 kinds of event cards: One that upholds clarity of information, used mainly on the page for selecting tickets before purchase. This type of ticket cards help the user easily distinguish between ticket types. While the other kind is more visually appealing, usually seen on the confirm page when the user decides whether to purchase a ticket, and after a successful purchase. This second type of ticket cards aims to be attractive or congratulative.",],
				["text", "Saying also goes, \"The best way to have a good idea is to have lots of ideas.\" After reviewing existing designs, I brainstormed a dozen variations. I considered if the shape of the cards should be creative or uniform, as well as how to arrange information in a readable and efficient form.",],
				["img-static", require("./assets/cases/Bitsrealm/content/3_1_tickets_variants.png"), "variations of ticket cards", "the many variations of ticket cards I made",],
				["img-static", require("./assets/cases/Bitsrealm/content/3_2_tickets_final_flow.png"), "final ticket selection and confirm pages for desktop and mobile", "final version of ticket selection and confirm pages", {minWidth:"560px"},],
			]],
			["subsection", "", [
				["title", "Performer's control center: modularized settings",],
				["text", "This was the first virtual concert that Bitsrealm held, so the performer's control center only contained the immediately necessary features. But in the near future, the interface would grow to include more functions as Bitsrealm cooperates with artists from all walks of life. Therefore, to leave space for expansion in the future, I designed the settings in a modularized way, following a consistent style while allowing for flexibility. When more features need to be added, new modules can easily be pieced in, like LEGO bricks.",],
				["img-static", require("./assets/cases/Bitsrealm/content/4_performer_control_center.png"), "", "", {minWidth:"560px"},],
				//["iframe", "figma", "https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Fproto%2FXkKYGcl4JrNqpRxqmnKJrL%2FALUM%3Fpage-id%3D14%253A129%26node-id%3D190%253A799%26viewport%3D197%252C136%252C0.14%26scaling%3Dscale-down%26starting-point-node-id%3D190%253A799"/* TODO: replace with the correct prototype link" */, "216.41%",],
			]],
			["subsection", "", [
				["title", "Mobile audience site: landscape UI",],
				["text", "I was really excited to have the chance to design a game-like interface at the phone's landscape orientation. It was very different from designing non-game mobile apps. Here I summarize the primary differences:<ol><li>Unusual holding positions lead to distinct thumb zones.</li></ol>",],
				["img-static", require("./assets/cases/Bitsrealm/content/5_1_holding_phone.png"), "thumb zones", "different thumb zones when using phone in portrait and landscape orientations<br/>(image source: <a href='https://www.uxmatters.com/mt/archives/2013/02/how-do-users-really-hold-mobile-devices.php' target='_blank'>UX Matters</a>)", {maxWidth:"480px"},],
				["text", "<ol start='2'><li>On a game interface, the user will interact with the same screen layout for a long time. Which differs from on common websites, where the user frequently jumps between links and pages.</li><li>Holding the phone with two hands makes bimanual interaction available and easy. Buttons on both sides of the screen can be pressed or held down simultaneously.</li></ol>",],
				["text", "I looked into the physical ergonomics of touch screen buttons, in order to design the most appropriate sizes, positions, and margins of buttons, so as to ensure accurate and comfortable tapping and reduce potential slips. Besides, I always export a screenshot of my design to my phone and try it out with my own hands to confirm all buttons, and especially the most used ones, are comfortable to reach."/*<a href='' style='cursor:help;'>slips</a>*/,],
				["img-static", require("./assets/cases/Bitsrealm/content/5_2_thumb_size.png"), "button versus average thumb size", "button sizes and margins, in comparism to an average thumb size<br/>(data source: <a href='http://touchlab.mit.edu/publications/2003_009.pdf' target='_blank'>The Touch Lab</a>. image sources: <a href='https://uxmovement.com/mobile/optimal-size-and-spacing-for-mobile-buttons/' target='_blank'>UX Movement</a>, <a href='https://www.justinmind.com/blog/button-design-websites-mobile-apps/' target='_blank'>Justinmind Design</a>)", {minWidth:"480px"},],
				["text", "I carefully split the screen into multiple areas according to thumb zone, and fill functions into the areas according to expected frequency of usage, as well as consideration of which functions might be used simultaneously.",],
				["img-static", require("./assets/cases/Bitsrealm/content/5_3_function_thumb_zone_overlapping.png"), "function areas overlapping with thumb zones", "function areas overlapping with thumb zones", {minWidth:"560px"},],
				//["img-static"/*img-zoomable*/, /*require("")*/, "table of functions with frequency of usage, potential simultaneously usage, etc.",],
			]],
			["section", "Takeaways", [
				["title", "Gratefully gained from my first industry adventure",],
				["text", "I really enjoyed the learning by doing, which is the best term to describe my internship experience. I actively absorbed industry standards and used my own body to test the theories, aiming to create the smoothest user experience.",],
				["text", "Despite the short term of the internship, I was still lucky enough to see part of the front-end being implemented and be involved in the communication with the developer. I also frequently asked my boss to look over my design and give suggestions. The fast pace of industry required me to jump into work mode with someone whose personality and working style were both unfamiliar to me. Therefore, I learnt to be extra detailed in my delivery documentation. However, sometimes back and forth is unavoidable, and I started to see that as a designer, I should be prepared to put as much effort into post-delivery quality control as into the actual design process.",],
				["text", "Half a year after I left, Bitsrealm's first virtual concert took place successfully! The main website that I prototyped for went through more iterations and became implemented. Some design details were changed, but the branding I created has been preserved.",],
			]],
			["evidence", "", [
				["text", "See the event hub of the virtual concert on Bitsrealm's website here: <a href='https://bitsrealm.com/explore/activity-details?id=13' target='_blank'>Bitsrealm: Neo-wulin</a>.",],
			]],
			// ["section", "Reflection", [
			// 	["title", "What will I do differently today?",],
			// 	["text", "...",],
			// ]],
		],
	],

	"CruzRoja": [
		"CruzRoja",
		{
			"title": "Ambulance dispatching system redesign for Cruz Roja",
			"description": "With a cross-disciplinary team, we redesigned the UI of an ambulance dispatching system that arranges emergency service in Tijuana, Mexico. We improved interaction efficiency and information display of the complex system.",
			"thumbnail": require("./assets/cases/CruzRoja/CruzRoja_thumbnail.png"),
			"thumbnail_light": require("./assets/cases/CruzRoja/CruzRoja_thumbnail_light.png"),
			"thumbnail_dark": require("./assets/cases/CruzRoja/CruzRoja_thumbnail_dark.png"),
			"case_brief": [
				["role", "UX/UI designer"],
				["duration", "March-December, 2021"],
				["client", "The Red Cross organization in Tijuana, Mexico"],
			],
			"next": "Neureality",
		},
		[require("./assets/cases/CruzRoja/object_CruzRoja_light@2x.png"), require("./assets/cases/CruzRoja/object_CruzRoja_dark@2x.png"), require("./assets/cases/CruzRoja/object_CruzRoja_light_figure@2x.png"), require("./assets/cases/CruzRoja/object_CruzRoja_dark_figure@2x.png"), require("./assets/cases/CruzRoja/object_CruzRoja_light_active@2x.png"), require("./assets/cases/CruzRoja/object_CruzRoja_dark_active@2x.png"), require("./assets/cases/CruzRoja/object_CruzRoja_light_blink@2x.png"), require("./assets/cases/CruzRoja/object_CruzRoja_dark_blink@2x.png"),],
		[
			["intro", "Overview", [
				["text", "The Red Cross (Cruz Roja) in Tijuana, Mexico offers relief to disaster victims and helps with emergencies. However, being a non-profit organization, budget was constrained for both their ambulances and dispatching system. Our team aimed to develop an efficient and low-cost dispatching system for Cruz Roja, in order to service the large population of Tijuana. Specifically for me, I led the UI sub-team. We worked on improving the speed and accuracy of each dispatch by optimizing the organization and visualization of the complex information on the interface.",],
			]],
			["problem", "", [
				["text", "The old design of the Cruz Roja ambulance dispatching system has many useful features, but the interface is confusing and inefficient. A more organized UI and a more intuitive visualization of information can help reduce dispatch errors and increase efficiency.",],
				["img-static", require("./assets/cases/CruzRoja/content/1_old_site.png"), "Cruz Roja old website design", "the old website", {maxWidth:"560px"},],
			]],
			["section", "Need Finding", [
				["title", "Examine current website, pinpoint problems and determine priorities",],
				["text", "If I were to use two words to describe the first impression that the old website of Cruz Roja left me with, they are <span style='--color:#8897AD33;'>\"confusing\" and \"messy\"</span>. \"Confusing\" because the user could hardly guess the function of many UI elements and where to start dispatching by just looking at the interface. More specifically, this was due to ambiguous wording, poor visual cues, and failure to follow UI conventions. On the other hand, the interface looked \"messy\" because it lacked proper visual hierarchy that could help the user determine the structure of the menus and read the forms.",],
				["text", "My first step was to <span style='--color:#8897AD33;'>understand the existing interface</span>. Since the project had been passed on from hand to hand for a few years, and the project lead was relatively passive, I took the initiative to go through every view of the interface, collected a list of all things that I had confusion on, down to the smallest details, and interviewed the project lead with that list. In the end, I realized that, deeply hidden in the messy interface, the available functionalities were actually quite useful and comprehensive. For example, there were ambulance states filter, past dispatch monitoring, waypoint specification, etc. - Only if the interface was more usable.",],
				["text", "Clearly, the interface needed a good prune. So I organized and listed all features and information that the old interface contained, categorized into 3 types: \"definitely needed\", \"can be removed\", and \"to be improved\". This way, we could get a better sense of the big picture and <span style='--color:#8897AD33;'>determine the priority for our redesign</span>.",],
				["text", "According to the features list, we decided that our 3 most urgent tasks were to:<ol><li>Simplify the ambulances menu,</li><li>Tidy up the ongoing dispatches menu,</li><li>Strengthen the mapping between text and map.</li></ol>",],
				["img-static", require("./assets/cases/CruzRoja/content/2_feature_table.png"), "features table to analyze painpoints of the interface", "",],
			]],
			["section", "Design", [
				["title", "3 tough battles, conquered one by one",],
				["text", "With a small team led by me, we tackled the 3 tasks listed above one by one. In the following I will explain the thought flow behind each task.",],
			]],
			["subsection", "", [
				["title", "Ambulances menu: simplify and enhance functionality",],
				["text", "In the old version, all filters and ambulance states were piled together in the left menu as a dozen of accordions. As a result, when all sections are expanded, it became a really long list to scroll through. It was hard for the user to find the filter or ambulance of interest. We thought of 2 ways to solve this issue and <span style='--color:#8897AD33;'>keep the content in a reasonable range of scroll</span>:<ol><li>Limit the number of sections that could be expanded, in other words use auto-collapse accordions that only shows one section at a time,</li><li>Group elements into packs that are frequently used together or logically belong together, and put those packs under multiple tabs.</li></ol>In order to reduce unnecessary <a href='https://www.nngroup.com/articles/interaction-cost-definition/' target='_blank'>interaction cost</a>, we chose to go with the 2nd option. The same tabs layout was also applied to the calls menu on the right, which suffered from complicated long scroll as well.",],
				["text", "We <span style='--color:#8897AD33;'>divided the ambulances menu</span> on the left of the screen into 2 tabs:<ul><li>An \"ambulances\" tab, for all ambulance states, which is used most frequently,</li><li>A \"settings\" tab, which contains the less used filters, such as filters for service states, ambulance capabilities, and location pins.</li></ul>",],
				["text", "Under the ambulances tab, the states of ambulances used to be over-detailed. After interviewing the client, we were certain that we could compress the \"at waypoint\" and \"waypoint bound\" states into one, because it wouldn't matter to the dispatcher whether an ambulance is on the way to a waypoint or has already arrived. This way, we <span style='--color:#8897AD33;'>simplified the more than 10 ambulance states</span> down to a scannable number of 6.",],
				["img-static", require("./assets/cases/CruzRoja/content/4_1_ambulances_menu.png"), "Cruz Roja evolution of the ambulances menu", "evolution of the ambulances menu", {minWidth:"560px"},],
				["text", "There are some tasks that the computer can do way faster and more accurate than a human, one of which is recommending the most appropriate ambulance to dispatch in a certain situation based on a set of predetermined scales. We ideated <span style='--color:#8897AD33;'>3 features to aid the dispatcher selecting ambulances</span>:",],
				["text", "<span style='--color:#8897AD33;'>Search</span>: In some cases, the dispatcher might have the name of an ambulance in mind. We added a search bar to the ambulances list for the user to find a specific ambulance and check its state.",],
				["text", "<span style='--color:#8897AD33;'>Capability filter</span>: Ambulance capability is the equipment set that an ambulance carries. Dispatchers often want to compare the capability of the available ambulances to decide which one is the most appropriate for the incident at hand. However in the old version, there was no direct way to do so. We added a capability filter to the available ambulances accordion, using which the dispatcher can easily filter for the ambulances with the ideal capability.",],
				["text", "<span style='--color:#8897AD33;'>Auto ordering</span>: We proposed for the available ambulances to be ordered according to 3 variables, priority from high to low:<ol><li>relevance to searched keyword,</li><li>distance to the incident,</li><li>ambulance name alphabetical order.</li></ol>By default, the available ambulances would be arranged by alphabetical order of their names. Once the dispatcher enters an incident location in the dispatch panel, the available ambulances will automatically get sorted according to their distances from the incident. This way, the dispatcher no longer has to manually check which ambulance is the nearest, and thus can launch a dispatch sooner. The few minutes saved here could make a difference in saving the patients' lives. If the user has entered a search keyword, the available ambulances containing the keyword will be highlighted and moved to the very front, even exceeding the priority of distance order.",],
				["img-static", require("./assets/cases/CruzRoja/content/4_2_ambulances_menu_semiautomation.png"), "Cruz Roja semiautomation in selecting proper ambulance to dispatch", "using automation to help fast dispatch", {maxWidth:"240px"},],
				["text", "On the side, we noticed that the menu tabs in the old design were problematic, mainly in 2 ways:<ol><li>The buttons for opening both menus used the same hamburger icon, which were indistinguishable and violate the \"recognition rather than recall\" principle in Jakob Nielsen's <a href='https://www.nngroup.com/articles/ten-usability-heuristics/' target='_blank'>10 usability heuristics</a>,</li><li>The white bar for holding the menu buttons was a waste of space. To improve the visual and save space.</li></ol>As a solution, we removed the redundant white bar and made the menu buttons into tabs on the two sides of the page. To <span style='--color:#8897AD33;'>distinguish the two menu buttons</span>, we tried giving each button an icon according to the functions inside: filter icon and phone icon.",],
				["img-static", require("./assets/cases/CruzRoja/content/4_3_menu_tabs.png"), "Cruz Roja evolution of the menu tabs", "improvement in the menu tabs", {maxWidth:"480px"},],
			]],
			["subsection", "", [
				["title", "Calls menu: rearrange and organize",],
				["text", "Now we are looking at the biggest disaster in the old website: calls menu. This is a call log for all the ongoing dispatches, and it is meant to be the main channel of communication between dispatchers and ambulance crews. However, the UI was too messy and almost inpossible to use.",],
				["img-static", require("./assets/cases/CruzRoja/content/5_1_old_calls_menu.png"), "Cruz Roja old calls menu is extremely messy and hard to use", "old calls menu", {maxWidth:"400px"},],
				["text", "After a thorough examination of the intended userflow, it turned out that <span style='--color:#8897AD33;'>the old menu actually contained many valuable ideas</span>, such as specifying waypoints to guide the ambulance through a chain of locations, sending SNS messages from computer to phone in order to update the ambulance crews with the latest hospital availabilities, etc. These are solid ideas that could potentially lead to useful functionalities. However, like the <a href='https://ghibli.fandom.com/wiki/River_Spirit' target='_blank'>river spirit</a> in Spirited Away, <span style='--color:#8897AD33;'>a descent bath is needed</span>."],
				["img-static", require("./assets/cases/CruzRoja/content/5_2_river_spirit_bath.gif"), "The scene in Spirited Away when the entire bathhouse help cleaning out the trash in the body of the river spirit", "just like the river spirit, our calls menu needs a deep clean", {maxWidth:"400px"},],
				["text", "We summarized 3 main flows that should be handled under the calls menu:<ol><li>Display details of dispatched calls with clear information hierarchy;</li><li>Facilitate updates of calls states with intuitive editing;</li><li>Send timely instructions to ambulance crews by SNS messages.</li></ol>"],
				["text", "Regarding <span style='--color:#8897AD33;'>display of calls details</span>, the challenge was the large amount of information that had to be included, since all of those data would be useful and couldn't simply be removed. Instead of the old design with multiple layers of dropdown and popups, we used an accordion list to organize the calls log, specifically working as follows:<ul><li>The most basic information to identify a call was condensed into a small card, so the dispatcher can efficiently skim the calls list.</li><li>Upon clicking, a call card would expand and reveal full details of the dispatch.</li><li>We flattened the secondary dropdown and popups in the old design all into the same expanded card view, so it took fewer clickings to view (or edit) any field of interest, and no more extra layer would stick out and block the map viewport.</li><li>No more than one call card could stay open at once, which was a choice to find balance between \"glancing the big picture of all calls\" and \"focusing on a particular call\". This won't introduce any complexity, since the dispatcher was very unlikely to pay attention to more than one call at any point in time, according to our interviews.</li></ul>Here is our end product after an inside-out reorganization. Please play with the prototypes and see it for yourself!"],
				["freestyle", (
					<div
						className="ratio_outer"
						style={{paddingBottom:"clamp(480px, 160%, calc(0.88 * 100vh))", marginBlockEnd:"calc(1.5 * var(--lineheight-default))"}}
					>
						<div
							className="ratio_inner"
							style={{width:"640px", transform:"translateX(-50%)", left:"50%", overflow:"hidden", borderRadius:"8px"}}
						>
							<div
								style={{position:"relative", width:"100%", height:"100%"}}
							>
								<iframe
									style={{position:"absolute", width:"1280px", height:"104%", right:"-12%", transform:"translateY(-50%)", top:"50%"}}
									src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Fproto%2FGq9kO2dbnaRXAVyUw5Tzmr%2FL.-Juliet-Zhuang's-website-prototypes%3Fpage-id%3D0%253A1%26node-id%3D5-8294%26viewport%3D64%252C287%252C0.17%26scaling%3Dscale-down%26starting-point-node-id%3D5%253A8294%26hide-ui%3D1"
								></iframe>
					</div></div></div>
				),],
				["text", "We noticed that the 3 flows of \"viewing call details\", \"editing call details\", and \"composing SNS messages\" were independent of one another. Specifically, the first 2 were just the read and write states of the same content, which were exclusive from each other; While the task of typing message required full attention of the dispatcher, and the call details didn't have to be present since the messages were likely to be additional instructions apart from the standard details fields. Knowing this, <span style='--color:#8897AD33;'>the 3 flows can be represented as 3 modes</span> under the expanded view of a call, as shown in the prototype below: view mode as default, then edit mode and message mode. Mode switching was accessed via the three-dot menu at the top right of the call card, following an established convention."],
				["freestyle", (
					<div
						className="ratio_outer"
						style={{paddingBottom:"clamp(480px, 160%, calc(0.88 * 100vh))", marginBlockEnd:"calc(1.5 * var(--lineheight-default))"}}
					>
						<div
							className="ratio_inner"
							style={{width:"640px", transform:"translateX(-50%)", left:"50%", overflow:"hidden", borderRadius:"8px"}}
						>
							<div
								style={{position:"relative", width:"100%", height:"100%"}}
							>
								<iframe
									style={{position:"absolute", width:"1280px", height:"104%", right:"-12%", transform:"translateY(-50%)", top:"50%"}}
									src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Fproto%2FGq9kO2dbnaRXAVyUw5Tzmr%2FL.-Juliet-Zhuang's-website-prototypes%3Fpage-id%3D0%253A1%26node-id%3D27-1962%26viewport%3D148%252C151%252C0.1%26scaling%3Dscale-down%26starting-point-node-id%3D27%253A1962%26hide-ui%3D1"
								></iframe>
					</div></div></div>
				),],
			]],
			// ["subsection", "", [
			// 	["title", "Map: in-context display of ambulance and location info",],
			// ]],
			["section", "Reflection", [
				["title", "Growing abilities and growing perspectives",],
			]],
			["subsection", "", [
				["title", "March 2023",],
				["text", "This was a project that witnessed my growth. Revisiting the old design is like a conversation to my past self. Those senses of \"off\" and flows of thought that I didn't know how to describe or express, I am glad I now have language for them.",],
				["text", "When I first joined Cruz Roja, I was new to the field of UX/UI design, trying to put into use my knowledge from a few design courses. Like a primitive with intuition, I noticed the problem with the old interface, that it was messy. Yet I didn't have enough professional insight to thoroughly analyze and spot the \"why\" behind the messiness. Still, I had intuition and tools such as usability heuristics, so I was able to identify changes I could make to improve the site. I approach the problem from a usability angle, and overall I did a good job. But my eyes were a bit too fixed on details and failed to manage the project from the level of a big picture.",],
				["text", "After my first quarter on the project, I paused and took 2 internships during the summer. So when I came back and spent my second quarter on Cruz Roja, I brought with me a bit more experience. I was able to approach the problems in a more data-driven way, and rethink the interface based on its higher-level purpose. Therefore, I successfully sorted out the key userflow from the muddy calls menu and had it reorganized. I also noticed the flaws in the inter-connection between the map and the menus, which I didn't quite have the skills to fully solve back then. Today when I look back, I see this last issue that I noticed as the most valuable one, because an improvement in the inter-connection would cohere and revolutionize the entire interface, bringing the efficiency and functionality of the dispatch system to a new level.",],
				["text", "Cruz Roja was the most challenging interface that I have redesigned so far, due to the significant amount of information that I had to manage and find an appropriate way to display for. If I were to redo this project, the biggest change I would make is to start looking at existing products and schedule more interviews at an earlier stage, to better understand the needs and the domain of ambulance dispatching.",],
			]],
		],
	],


/**--- Others ---**/

	// "ALUM": [
	// 	"ALUM",
	// 	{
	// 		"title": "Goods transport app for farmers in Bhutan",
	// 		"description": "...",
	// 		"thumbnail": require("./assets/cases/ALUM/ALUM_thumbnail.png"),
	// 		"thumbnail_light": require("./assets/cases/ALUM/ALUM_thumbnail_light.png"),
	// 		"thumbnail_dark": require("./assets/cases/ALUM/ALUM_thumbnail_dark.png"),
	// 		"case_brief": [
	// 			["role", "UX/UI designer"],
	// 			["duration", "November 2022 - present"],
	// 			["client", "ALUM for Northwood"],
	// 		],
	// 		"next": ""/*TODO*/,
	// 	},
	// 	[require("./assets/cases/ALUM/object_ALUM_light@2x.png"), require("./assets/cases/ALUM/object_ALUM_dark@2x.png"), require("./assets/cases/ALUM/object_ALUM_light_figure@2x.png"), require("./assets/cases/ALUM/object_ALUM_dark_figure@2x.png"), require("./assets/cases/ALUM/object_ALUM_light_active@2x.png"), require("./assets/cases/ALUM/object_ALUM_dark_active@2x.png"), require("./assets/cases/ALUM/object_ALUM_light_blink@2x.png"), require("./assets/cases/ALUM/object_ALUM_dark_blink@2x.png"),],
	// 	[],
	// ],

	"LAK": [
		"LAK",
		{
			"title": "Goods transport app for farmers in Bhutan",
			"description": "To connect farmers and truckers in Bhutan and improve good transportation, we built an Android app similar to Uber Eats. In the app, farmers can post jobs and track delivery progress, and drivers can search for suitable jobs and maximize their profits.",
			"thumbnail": require("./assets/cases/LAK/LAK_thumbnail.png"),
			"thumbnail_light": require("./assets/cases/LAK/LAK_thumbnail_light.png"),
			"thumbnail_dark": require("./assets/cases/LAK/LAK_thumbnail_dark.png"),
			"case_brief": [
				["role", "UX/UI designer"],
				["duration", "November 2021 - present"],
				["client", "FirstMile Bhutan"],
			],
			"next": ""/*TODO*/,
		},
		[require("./assets/cases/LAK/object_LAK_light@2x.png"), require("./assets/cases/LAK/object_LAK_dark@2x.png"), require("./assets/cases/LAK/object_LAK_light_figure@2x.png"), require("./assets/cases/LAK/object_LAK_dark_figure@2x.png"), require("./assets/cases/LAK/object_LAK_light_active@2x.png"), require("./assets/cases/LAK/object_LAK_dark_active@2x.png"), require("./assets/cases/LAK/object_LAK_light_blink@2x.png"), require("./assets/cases/LAK/object_LAK_dark_blink@2x.png"),],
		[],
	],

	"MAW": [
		"MAW",
		{
			"title": "Volunteer hub to help granting wishes to children",
			"description": "Make-A-Wish's mission is to grant wishes to children with critical illness. My team built a volunteer hub that fulfills their needs to coordinate the diverse volunteer base and smoothen the wish-granting process.",
			"thumbnail": require("./assets/cases/MAW/MAW_thumbnail.png"),
			"thumbnail_light": require("./assets/cases/MAW/MAW_thumbnail_light.png"),
			"thumbnail_dark": require("./assets/cases/MAW/MAW_thumbnail_dark.png"),
			"case_brief": [
				["role", "UX/UI designer"],
				["duration", "November 2021 - June 2022"],
				["client", "Make-A-Wish"],
			],
			"next": ""/*TODO*/,
		},
		[require("./assets/cases/MAW/object_MAW_light@2x.png"), require("./assets/cases/MAW/object_MAW_dark@2x.png"), require("./assets/cases/MAW/object_MAW_light_figure@2x.png"), require("./assets/cases/MAW/object_MAW_dark_figure@2x.png"), require("./assets/cases/MAW/object_MAW_light_active@2x.png"), require("./assets/cases/MAW/object_MAW_dark_active@2x.png"), require("./assets/cases/MAW/object_MAW_light_blink@2x.png"), require("./assets/cases/MAW/object_MAW_dark_blink@2x.png"),],
		[
			["intro", "", [
				["text", "Make-A-Wish's mission is to grant wishes to children with critical illness. In TSE, my team built a volunteer hub webtool that fulfills their needs to coordinate the diverse volunteer base and smoothen the wish-granting process. Admin members in the organization will post events, manage volunteers, and organize documents on the app. Volunteers can use this website to easily sign up for events, and access documents and resources."],
			]],
		],
	],

	"Neureality": [
		"Neureality",
		{
			"title": "Illustrate for science popularization at Neureality",
			"description": "",
			"thumbnail": require("./assets/cases/Neureality/Neureality_thumbnail.png"),
			"thumbnail_light": require("./assets/cases/Neureality/Neureality_thumbnail_light.png"),
			"thumbnail_dark": require("./assets/cases/Neureality/Neureality_thumbnail_dark.png"),
			"case_brief": [
				["role", "Illustrator, Character designer"],
				["duration", "February 2020 - present"],
			],
			"next": "GroupReads"/*TODO*/,
		},
		[require("./assets/cases/Neureality/object_Neureality_light@2x.png"), require("./assets/cases/Neureality/object_Neureality_dark@2x.png"), require("./assets/cases/Neureality/object_Neureality_light_figure@2x.png"), require("./assets/cases/Neureality/object_Neureality_dark_figure@2x.png"), require("./assets/cases/Neureality/object_Neureality_light_active@2x.png"), require("./assets/cases/Neureality/object_Neureality_dark_active@2x.png"), require("./assets/cases/Neureality/object_Neureality_light_blink@2x.png"), require("./assets/cases/Neureality/object_Neureality_dark_blink@2x.png"),],
		[
			["intro", "", [
				["text", "Since Winter 2020, I have been creating stylized illustrations for articles at Neureality. Neureality is a Wechat official account that popularizes knowledge and findings in the fields of cognitive science and neuroscience.",],
			// ]],
			// ["section", "", [
				["gallery", [
					["gallery", [
						["img-zoomable", require("./assets/cases/Neureality/content/1_1_rat_1_crystal_skull.jpeg"), "crystal skull rat", "lab rat 1: crystal skull (aka <a href='https://www.sciencedirect.com/science/article/pii/S0165027021000352' target='_blank'>cranial window</a>)", {maxWidth:"320px"},],
						["img-zoomable", require("./assets/cases/Neureality/content/1_2_rat_2_tetrode_recording.jpeg"), "tetrode recording rat", "lab rat 2: <a href='https://en.wikipedia.org/wiki/Single-unit_recording' target='_blank'>tetrode recording</a>", {maxWidth:"320px"},],
						["img-zoomable", require("./assets/cases/Neureality/content/2_the_blind_man_and_the_elephants.jpeg"), "the blind man and the elephants", "\"the blind man and the elephants\", illustrated for an article on perception and the classic thought experiment <a href='https://en.wikipedia.org/wiki/Molyneux%27s_problem' target='_blank'>Molyneux's problem</a>", {maxWidth:"400px"},],
						["img-zoomable", require("./assets/cases/Neureality/content/3_1_eeg_1.png"), "EEG illustration 1", "<a href='https://en.wikipedia.org/wiki/Electroencephalography' target='_blank'>EEG</a> 1: speech of mind", {maxWidth:"400px"},],
						["img-zoomable", require("./assets/cases/Neureality/content/3_2_eeg_2.png"), "EEG illustration 2", "EEG 2: strings of thoughts", {maxWidth:"320px"},],
						["img-zoomable", require("./assets/cases/Neureality/content/4_sacculina_carcini.png"), "sacculina carcini in crab", "<a href='https://en.wikipedia.org/wiki/Sacculina' target='_blank'>sacculina</a>, a parasitic castrator that feminizes male crabs", {maxWidth:"480px"},],
					], "helper_neureality_gallery",],
				]],
				["text", "During the summer, I co-led the creation of a long-scroll comic post on loneliness, which is Neureality's first post of this format. I designed the characters and style of the post. Then I spent a month weaving the line art in finest details, pixel by pixel, stroke by stroke, all with my finger on a phone screen. Check out the final post here: <a href='https://mp.weixin.qq.com/s/L-uOl1hxBeGsVr0k_ifKxw' target='_blank'>Loneliness is like an iceberg</a>.",],
				["img-scrollable", require("./assets/cases/Neureality/content/5_0_loneliness_longscroll_final_line_drawing.jpeg"), "long-scroll post final line drawing", "", {minWidth:"400px", "--img-scrollable-ratio":"120%"}, "480px",],
				["gallery", [
					["gallery", [
						["img-zoomable", require("./assets/cases/Neureality/content/5_1_loneliness_longscroll_character_design_1.png"), "long-scroll post character design sketches", "", {maxWidth:"200px"},],
						["img-zoomable", require("./assets/cases/Neureality/content/5_2_loneliness_longscroll_character_design_2.png"), "long-scroll post illustration style variants", "", {maxWidth:"240px"},],
						["img-zoomable", require("./assets/cases/Neureality/content/5_4_loneliness_longscroll_character_design_4.png"), "Tachie of the finalized character design", "", {maxWidth:"320px"},],
						["img-zoomable", require("./assets/cases/Neureality/content/5_5_loneliness_longscroll_character_design_5.jpeg"), "illustration to communicate the intended vibe of the character", "", {maxWidth:"400px"},],
						["img-zoomable", require("./assets/cases/Neureality/content/5_3_loneliness_longscroll_character_design_3.png"), "long-scroll post character design variants", "", {minWidth:"400px", maxWidth:"800px"},],
					], "helper_neureality_gallery",],
				]],
			]],
		],
	],

	"GroupReads": [
		"GroupReads",
		{
			"title": "GroupReads, complete assigned readings together",
			"description": "",
			"thumbnail": require("./assets/cases/GroupReads/GroupReads_thumbnail.png"),
			"thumbnail_light": require("./assets/cases/GroupReads/GroupReads_thumbnail_light.png"),
			"thumbnail_dark": require("./assets/cases/GroupReads/GroupReads_thumbnail_dark.png"),
			"case_brief": [
				["role", "UX/UI designer, Front-end developer"],
				["duration", "January-March, 2021"],
			],
			"next": "PadPal"/*TODO*/,
		},
		[require("./assets/cases/GroupReads/object_GroupReads_light@2x.png"), require("./assets/cases/GroupReads/object_GroupReads_dark@2x.png"), require("./assets/cases/GroupReads/object_GroupReads_light_figure@2x.png"), require("./assets/cases/GroupReads/object_GroupReads_dark_figure@2x.png"), require("./assets/cases/GroupReads/object_GroupReads_light_active@2x.png"), require("./assets/cases/GroupReads/object_GroupReads_dark_active@2x.png"), require("./assets/cases/GroupReads/object_GroupReads_light_blink@2x.png"), require("./assets/cases/GroupReads/object_GroupReads_dark_blink@2x.png"),],
		[
			["intro", "Overview", [
				["text", "This was a class project to practice the Double Diamond design process, as well as my first time programming an app by myself. Toddling, wobbling, this was where everything began.",],
			]],
			["problem", "", [
				["text", "Students are constantly overwhelmed by class readings. We hope that, by presenting students with a way to engage with their reading, we can help bring back their motivation.",],
			], "Point of View"],
			["section", "Design", [
				["title", "Practice the design process",],
				["text", "The point of view statement above is quite vague. To concretely <span style='--color:#4A919E59;'>define</span> the problem space, we interviewed other college students, and noticed one of the reasons why they couldn't finish class readings was that they gave up halfway when came across difficult or complicated paragraphs."],
				["text", "The solution I proposed to such struggle with difficult class readings is a forum where students can casually raise questions and leave comments on the readings. I created a <span style='--color:#4A919E59;'>storyboard</span> to present this nicher problem to the class:",],
				["img-static", require("./assets/cases/GroupReads/content/1_storyboard.png"), "storyboard for reading forum", "", {minWidth:"320px", maxWidth:"400px"},],
				["text", "In the end, we came down to a <span style='--color:#4A919E59;'>workflow</span> for the GroupReads app, as shown below. After the user logs in to the main interface of GroupReads, they can import, organize, and annotate class readings, as well as post question and comments on the forum. Since the app will verify students and their class enrollment information with the school, it has some degree of control over the quality and integrity of the discussion.",],
				["img-static", require("./assets/cases/GroupReads/content/2_workflow.png"), "storyboard for reading forum", "", {minWidth:"640px"},],
				["text", "To test our design, we created <span style='--color:#4A919E59;'>paper prototypes</span> in which the essential features are pseudo-interactive. Following are a few examples of the paper prototypes I made.",],
				["img-static", require("./assets/cases/GroupReads/content/3_1_paper_prototype_search_class.png"), "paper prototype: search class", "", {minWidth:"320px", maxWidth:"520px"},],
				["img-static", require("./assets/cases/GroupReads/content/3_2_paper_prototype_solve_question.png"), "paper prototype: solve question", "", {minWidth:"320px", maxWidth:"560px"},],
				["img-static", require("./assets/cases/GroupReads/content/3_3_paper_prototype_browse_forum.png"), "paper prototype: browse forum with embedded paragraph", "", {minWidth:"320px", maxWidth:"400px"},],
			]],
			["section", "Reflection", [
				["title", "What will I do differently today?",],
			]],
			["subsection", "", [
				["title", "February 2023",],
				["text", "The issue of class reading completion rate is real. According to a <a href='https://www.americanreadingforum.org/_files/ugd/c10ff9_a728b4fc180c413b9cdfd8cb2033342c.pdf#page=7'>study</a> by Baier et al. in 2011, only 24.8% of students read the assigned materials before they went to class. Now 10 years have passed, yet based on personal experience, the situation still has not improved, if not worsened. Therefore, I believe we found a problem that is worth solving for, and still valid even today.",],
				["text", "However, under the overarching problem, there are a wide variety of specific pain points. Some of the pain points are more key and common among the users of interest, while the others are less so. Back in 2021, we rushed into solution-seeking before narrowing down to an important pain point. This is because we relied on the few data points collected by ourselves, which failed to generalize to a wider student group. What we didn't know was that, low completion rate of assigned reading is in fact a well-studied topic in the research field. So if I am to lead the project now, I would give more weight to <span style='--color:#4A919E59;'>literature review</span>, rather than trying to reinvent the wheel. Secondary evidence would be a great source to efficiently reveal the important pain points, and thus guide us onto a more promising track in the first place.",],
				["text", "Suppose we still end up with a similar app structure as the current design, then in terms of user flow, I would prioritize <span style='--color:#4A919E59;'>refining the connection between the uploaded readings and the forum</span>. When the user asks a question on the forum, they might refer to a section of the reading; When the user studies the reading, they might grasp the message more easily by reviewing the existing annotations and questions from their classmates. This should be the core of the app, because it makes GroupReads a better option for discussing class readings compared with some other general-purpose forums, such as Piazza.",],
				["text", "I would include more <span style='--color:#4A919E59;'>ethical considerations</span> in my design process, namely about academic integrity and user privacy. One idea to improve privacy experience is to introduce an anonymous feature when users interact on the forum. Yet an severer concern is that we had slipped into a gray area trying to promote discussion of reading materials and notes sharing online. We proposed this with good will, hoping to motivate students to read by enhancing the sense of engagement. But since the readings are class assignments, an open discussion forum could be taken advantage of and potentially cause academic integrity issues, not to mention copyright concerns related to uploading course materials. These should all be kept in mind throughout the design process.",],
			]],
		],
	],

	"PadPal": [
		"PadPal",
		{
			"title": "PadPal, menstrual dignity for girls in Pune, India",
			"description": "",
			"thumbnail": require("./assets/cases/PadPal/PadPal_thumbnail.png"),
			"thumbnail_light": require("./assets/cases/PadPal/PadPal_thumbnail_light.png"),
			"thumbnail_dark": require("./assets/cases/PadPal/PadPal_thumbnail_dark.png"),
			"case_brief": [
				["role", "Graphic designer, Illustrator"],
				["duration", "January-March, 2021"],
			],
			"next": "ACM"/*TODO*/,
		},
		[require("./assets/cases/PadPal/object_PadPal_light@2x.png"), require("./assets/cases/PadPal/object_PadPal_dark@2x.png"), require("./assets/cases/PadPal/object_PadPal_light_figure@2x.png"), require("./assets/cases/PadPal/object_PadPal_dark_figure@2x.png"), require("./assets/cases/PadPal/object_PadPal_light_active@2x.png"), require("./assets/cases/PadPal/object_PadPal_dark_active@2x.png"), require("./assets/cases/PadPal/object_PadPal_light_blink@2x.png"), require("./assets/cases/PadPal/object_PadPal_dark_blink@2x.png"),],
		[
			["intro", "Overview", [
				["text", "Project Kilimanjaro, a non-profit organization, is helping girls and women in Pune, India with menstrual health management. Together with PK, our team designed a menstrual care bag with an instruction manual. The bag can be easily hand-sewed and used to carry menstrual products safely and sanitarily.",],
				["vid", require("./assets/cases/PadPal/content/1_final_presentation.mp4"), "", "", "", require("./assets/cases/PadPal/content/1_final_presentation_thumbnail.png"),],
			]],
			["problem", "", [
				["text", "Period being a taboo topic prevents girls and women in rural Pune, India from properly managing their menstrual health. But period is a normal and beautiful part of life, and nothing to be ashamed of.",],
			]],
			["section", "Need Finding", [
				["title", "Set direction, weigh anchor",],
				["text", "Menstrual health management is challenging for girls in Pune, India. Causes to this difficulty is complex: expensive menstrual products, lack of awareness, cultural and relogious factors. Secondary disasters include menstrual illness, school dropout, internalized oppression."],
				["text", "Project Kilimanjaro has a few parallel projects, each tackling one aspect of the problem. Typically, one biodegradable pad team is developing sustainable pad product, while an educational team offers a series of curriculums on MHM."],
				["img-static", require("./assets/cases/PadPal/content/2_our_blueocean.png"), "we discovered blueocean", "we found ourselves a spot in Project Kilimanjaro's roadmap", {minWidth:"480px"},],
				["text", "We wanted to maximize our help, so we chose a path that was different from, but could also supplement these existing projects. We decided to design a menstrual bag. In the korean film <a href='https://en.wikipedia.org/wiki/Hope_(2013_film)' target='_blank'>Hope</a>, the father put a handful of candies into Sowon's pocket, covering the noise of her stoma bag, so Sowon is willing to go to school. Our menstrual bag will also give girls in Pune courage, backing them to go back to school or normal daily life during the lady days."],
			]],
			["section", "Design", [
				["title", "Braid a thousand threads into one single slice",],
				["img-static", require("./assets/cases/PadPal/content/brainstorm_notes.png"), "brainstorm sticky notes", "brainstorm session notes on what our bag should accomplish for", {minWidth:"792px"/*800px min page width - 4px margin on each side*/},],
			]],
			["subsection", "", [
				["title", "PadPal bag",],
				["text", "Due to covid-19, we weren't able to travel to India to meet our served community in person. So we relied on interviewing our NGO, secondary research, and downloading India social apps to get a sense of the environment.",],
				["text", "We summarized 5 key criterias that should orient our design: sanitation, sustainability, easy instruction, comfort, dignity.",],
				["text", "We spent a week brainstorming ideas based on these criterias. Then building on a sharing session, we splited into sub-teams to develop 3 bag concepts for comparison. The 3 concepts range on a spectrum from \"the easiest to make\" to \"the most functional\".",],
				["img-static", require("./assets/cases/PadPal/content/3_1_concepts.png"), "3 concepts", "the 3 concepts that we discussed and decided from", {minWidth:"560px"},],
				["img-static", require("./assets/cases/PadPal/content/3_2_my_other_concept.jpg"), "my other concepts", "another concept I sketched during ideation", {minWidth:"480px"},],
				["text", "Decision was settled based on feedback from PK. \"Easy to make\" was an important quality, since a home-makable design would reduce cost for both the users and the non-profit organization. We prototyped out Concept 1 to solidify its making steps, test its function and comfort.",],
				["img-static", require("./assets/cases/PadPal/content/4_materials_to_bag.png"), "from materials to PadPal bag physical prototype", "bag body sewed using 1 piece of fabric + twist baid belt → pretty pad pouch in less than 30 minutes", {minWidth:"400px"},],
			]],
			["subsection", "", [
				["title", "Instruction guide",],
				["text", "Our easy-to-make bag should have its easy-to-read guide.",],
				["text", "We decided to put the manufacture steps into graphics and minimize text explanation, since picture is an international language. When illustrating the graphics, I tried to find a balance between realistic and iconic, so the steps were understandable while the illustrations remained tidy. For each manufacture step, I created a few variations of illustrations, and used a questionnaire to collect feedback on which would be the easiest to understand without caption.",],
				["img-static", require("./assets/cases/PadPal/content/5_questionnaire.jpg"), "questionnaire example", "example for testing question", {minWidth:"400px", maxWidth:"560px"},],
				["text", "Originally, we named our product a \"Pad Bag\", referring to its function of holding pads. Yet we were aware that menstrual topics could be a taboo among our target users, and thus an over straightforward name could be intimidating. Therefore, being culturally sensitive, we changed the naming from \"Pad Bag\" to the cuter \"PadPal\". We hoped our clients would feel more comfortable using our product this way.",],
				["text", "The color scheme of bright orange and blue communicated a sense of beauty and confidence. We also followed the international unit standard used in India and marked the dimensions in our instruction with centimeter instead of inch.",],
				["text", "Here is our final instruction guide:",],
				["img-static", require("./assets/cases/PadPal/content/6_instruction_final.jpg"), "final instruction guide", "", {minWidth:"400px", maxWidth:"560px"},],
			]],
			["section", "Takeaways", [
				["title", "There were waves, but we held tight",],
				["text", "In fact, we didn't expected creating an instruction guide when we started off. This objective was picked up on the halfway.",],
				["text", "Neel, our contact man, directly communicated with us on behalf of PK and conveyed important decisions. Despite being efficient most of the time, this channel with multiple layers led to miscommunication at a point. It was over half of the quarter, and we suddenly had to change our direction from designing an actual menstrual bag product, to providing a guide for users to hand-make it by themselves. As a result, the design of the bag also had to change from partially factory-producible, to the simplest for hand manufacturing.",],
				["text", "Although this shift was sudden, we managed to cope with it and ended up with an instruction guide that satisfied the needs of our NGO.",],
				["text", "Our design received appreciation from PK. Our instruction guide existed in line with PK's educational curriculum, and was simple enough to be ready for adopting into their materials. In the future, PK could use our PadPal to introduce their biodegradable pad into the curriculums. Neel wrote: \"We wanted to say thank you so much for all the work you put in last quarter, we really appreciate all that you have done. We can assure you that your efforts did not go to waste and we believe they will be extremely helpful for our project implementation down the road.\"",],
			]],
			["evidence", "", [
				["text", "See our report here: <a href='https://docs.google.com/document/d/1ZJOeIAyzp8Q9EtlHno1MLMMDJDZc36y0uEWuP0YG8ug/edit?usp=sharing' target='_blank'>Final deliverable</a>.",],
				["text", "I am also the documentor on team. See the tidy meeting notes I took: <a href='https://docs.google.com/document/d/1HON2xh3HEKJjkmuY6OoEk3X_08hc3xMVcFhM-oL092Q/edit?usp=sharing' target='_blank'>Minutes</a>.",],
				["text", "Thanks to my teammates, and PK and Global Ties for the opportunity: <a href='https://www.projectkiliforkids.org/menstrual-health' target='_blank'>Project Kilimanjaro</a>, <a href='https://globalties.ucsd.edu/' target='_blank'>Global TIES</a>.",],
			]],
			// ["section", "Reflection", [
			// 	["title", "What will I do differently today?",],
			// 	["text", "...",],
			// ]],
		],
	],

}
