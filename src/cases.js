/**
 * Structure of "cases":
 *	cases {
 *		<case_id> : {
 *			title: <title>(str),
 *			bio: [<client>(str), <role>(str), <duration>(str)],
 *			thumbnail: {
 *				brief: <brief>(str),
 *				img: <thumbnail_img>(img as required path),
 *			},
 *			content: {
 *				overview: (text_object),
 *				challenge: (text_object),
 *				solution: (text_object),
 *				evidence: (text_object),
 *				img: <cover_img>(img as required path),
 *			},
 *			theme: {
 *				object: <object>(img as required path),	// TODO: img(s)
 *				color: [<color-bg-light>(str), <color-title-light>(str), <color-bg-dark>(str), <color-title-dark>(str)],
 *			},
 *			next: <next_case_id>(str),
 *		},
 *		... : {...}
 *	}
 */

import { A } from "./components.js";
import { isSafari, isIE } from "react-device-detect";

export const casesNames = ["AsTheWindBlows", "ALUM", "CheeseClub", "CreativityLab", "TSE", "CharmLife", "LAK", "MAW", "MercuryAlert", "3DCG", "2022Art", "Bitsrealm", "CruzRoja", "ACM", "Atlas", "RehaBuddy", "PadPal", "GroupReads", "2021Art", "ThriveSD", "Neureality", "CellInTheSpace", "2020Art", "GaokaoFighting", "2DCG", "KaonashiRobot", "ChineseUnion"];

export const casesGoats = ["ALUM", "", ""];

export const casesByCategory = [
	[	"UX/UI",
		["ALUM", "Bitsrealm", "CruzRoja", "MercuryAlert", "LAK", "MAW", "ACM", "Atlas", "CharmLife", "GroupReads",],
	],
	[	"Frontend",
		["CheeseClub", "CreativityLab", "2DCG",],
	],
	[	"Graphic",
		["TSE", "2021Art", "2020Art",],
	],
	[	"Illustration",
		["Neureality", "ChineseUnion", "GaokaoFighting",],
	],
	[	"3D",
		["AsTheWindBlows", "3DCG", "CellInTheSpace", "2022Art", "KaonashiRobot",],
	],
	[	"Conceptualization",
		["RehaBuddy", "PadPal", "ThriveSD",],
	],
];

export const casesByTimeline = [
	[	"2023",
		["AsTheWindBlows", "ALUM", "CheeseClub", "CreativityLab", "TSE", "CharmLife",],
		<svg className="home-cases-section-title-bullet" xmlns="http://www.w3.org/2000/svg"> <path className="home-cases-section-title-bullet-color1" d="M0 40H120C164.183 40 200 75.8172 200 120V120C200 164.183 164.183 200 120 200H0V40Z"/> <rect className="home-cases-section-title-bullet-color1" x="168" y="4" width="24" height="80" rx="12" transform="rotate(15 168 4)"/> <rect className="home-cases-section-title-bullet-color1" x="120" width="24" height="80" rx="12"/> <rect className="home-cases-section-title-bullet-color2" x="168" y="72" width="8" height="16" rx="4"/> <rect className="home-cases-section-title-bullet-color2" x="124" y="64" width="8" height="16" rx="4"/> <path className="home-cases-section-title-bullet-color2" fillRule="evenodd" clipRule="evenodd" d="M154.63 103.111V103.111C155.251 102.182 156.751 102.182 157.371 103.111C158.094 104.193 158.926 105.209 159.859 106.142C163.136 109.419 167.433 111.442 172.004 111.9C173.103 112.01 174.001 111.105 174.001 110V110C174.001 108.895 173.102 108.013 172.006 107.875C168.498 107.434 165.214 105.84 162.687 103.314C160.161 100.787 158.566 97.5028 158.126 93.9949C157.988 92.8989 157.105 92 156.001 92V92C154.896 92 154.014 92.8989 153.876 93.9948C153.567 96.4525 152.691 98.8145 151.304 100.889C149.546 103.52 147.047 105.571 144.124 106.782C141.2 107.993 137.983 108.31 134.879 107.693C132.432 107.206 130.142 106.155 128.186 104.636C127.314 103.958 126.054 103.947 125.273 104.728V104.728C124.492 105.509 124.486 106.784 125.341 107.483C127.87 109.551 130.876 110.974 134.099 111.616C137.979 112.387 142 111.991 145.655 110.478C149.309 108.964 152.433 106.4 154.63 103.111Z"/> </svg>,
		"Year of the Rabbit",
	],
	[	"2022",
		["LAK", "MAW", "MercuryAlert", "3DCG", "2022Art",],
		<svg className="home-cases-section-title-bullet" xmlns="http://www.w3.org/2000/svg"> <path className="home-cases-section-title-bullet-color1" d="M0 40H120C164.183 40 200 75.8172 200 120V120C200 164.183 164.183 200 120 200H0V40Z"/> <circle className="home-cases-section-title-bullet-color1" cx="180" cy="60" r="12"/> <circle className="home-cases-section-title-bullet-color1" cx="132" cy="36" r="12"/> <circle className="home-cases-section-title-bullet-color2" cx="152" cy="148" r="32"/> <path className="home-cases-section-title-bullet-color1" d="M144.98 123.25C144.781 123.993 143.852 124.242 143.307 123.698L138 118.391L146.923 116L144.98 123.25Z"/> <rect className="home-cases-section-title-bullet-color2" x="128" y="84" width="24" height="8" rx="4" transform="rotate(30 128 84)"/> <rect className="home-cases-section-title-bullet-color2" x="176" y="104" width="16" height="8" rx="4"/> <path className="home-cases-section-title-bullet-color2" fillRule="evenodd" clipRule="evenodd" d="M153.081 46.983C152.097 46.5407 151 47.2716 151 48.3508V48.3508C151 48.9533 151.358 49.4972 151.907 49.7445C158.342 52.6416 164.338 56.4123 169.729 60.9447C170.632 61.7032 170.839 63.0011 170.249 64.0219V64.0219C169.457 65.3948 167.599 65.681 166.383 64.6637C162.311 61.2566 157.872 58.3133 153.147 55.8885C152.157 55.3804 151 56.112 151 57.2248V57.2248C151 57.8007 151.327 58.3257 151.839 58.5892C156.829 61.1569 161.487 64.329 165.706 68.035C166.573 68.7966 166.76 70.0659 166.183 71.0653V71.0653C165.378 72.4599 163.477 72.7259 162.264 71.6668C159.449 69.2093 156.426 67.0073 153.23 65.0848C152.238 64.4881 151 65.2182 151 66.3758V66.3758C151 66.9175 151.288 67.4172 151.752 67.697C155.936 70.2213 159.809 73.2489 163.28 76.72C165.359 78.7992 167.279 81.0224 169.027 83.3703C169.32 83.764 169.78 84 170.271 84V84C171.497 84 172.218 82.6352 171.487 81.6504C170.403 80.1907 169.256 78.7767 168.049 77.4127C167.31 76.5777 167.165 75.3641 167.723 74.3984V74.3984C168.559 72.9501 170.546 72.6981 171.658 73.9471C174.247 76.8543 176.58 79.9735 178.634 83.2696C178.916 83.7213 179.408 84 179.941 84V84C181.109 84 181.837 82.7394 181.22 81.7468C178.34 77.1148 174.933 72.8167 171.058 68.9419V68.9419C170.989 68.8727 170.975 68.7657 171.024 68.6809L172.77 65.6555C173.152 64.9941 174.054 64.8663 174.594 65.4063V65.4063C179.83 70.6426 184.268 76.6014 187.78 83.0897C188.081 83.6473 188.662 84 189.296 84H190.002C190.553 84 191 83.5532 191 83.0021V83.0021C191 82.8415 190.961 82.6832 190.887 82.541C187.167 75.4568 182.392 68.9623 176.715 63.285C169.887 56.4571 161.877 50.935 153.081 46.983Z"/> </svg>,
		"Year of the Tiger",
	],
	[	"2021",
		["Bitsrealm", "CruzRoja", "ACM", "Atlas", "RehaBuddy", "PadPal", "GroupReads", "2021Art",],
		<svg className="home-cases-section-title-bullet" xmlns="http://www.w3.org/2000/svg"> <path className="home-cases-section-title-bullet-color1" d="M0 40H120C164.183 40 200 75.8172 200 120V120C200 164.183 164.183 200 120 200H0V40Z"/> <path className="home-cases-section-title-bullet-color1" fillRule="evenodd" clipRule="evenodd" d="M100.414 8C101.497 8 102.053 9.94347 101.306 10.7282C99.2576 12.8809 98 15.7936 98 19C98 25.6274 103.373 31 110 31H150C156.627 31 162 25.6274 162 19C162 15.7936 160.742 12.8809 158.694 10.7282C157.947 9.94347 158.503 8 159.586 8H160C171.046 8 180 16.9543 180 28C180 39.0457 171.046 48 160 48C158.758 48 158.335 49.7547 159.415 50.3676C179.02 61.4888 193.466 80.6504 198.269 103.37C200.182 112.419 192.502 120 183.252 120H156C136.118 120 120 103.882 120 84V68C120 56.9543 111.046 48 100 48C88.9543 48 80 39.0457 80 28C80 16.9543 88.9543 8 100 8H100.414Z"/> <rect className="home-cases-section-title-bullet-color2" x="144" y="40" width="8" height="16" rx="4"/> <rect className="home-cases-section-title-bullet-color2" x="120" y="40" width="8" height="16" rx="4"/> </svg>,
		"Year of the Ox",
	],
	[	"2020",
		["ThriveSD", "Neureality", "CellInTheSpace", "2020Art", "GaokaoFighting",],
		<svg className="home-cases-section-title-bullet" xmlns="http://www.w3.org/2000/svg"> <path className="home-cases-section-title-bullet-color1" d="M0 40H120C164.183 40 200 75.8172 200 120V120C200 164.183 164.183 200 120 200H0V40Z"/> <path className="home-cases-section-title-bullet-color1" fillRule="evenodd" clipRule="evenodd" d="M207.141 107.652C212.659 101.326 216.001 93.0533 216.001 83.9999C216.001 64.1176 199.883 47.9999 180.001 47.9999C177.211 47.9999 174.496 48.3171 171.889 48.9176C190.639 62.6278 203.761 83.5771 207.141 107.652Z"/> <path className="home-cases-section-title-bullet-color2" d="M140 69.359C130.813 64.0547 119.894 62.6172 109.647 65.363C99.4001 68.1087 90.6633 74.8126 85.359 84C80.0547 93.1874 78.6172 104.106 81.363 114.353C84.1087 124.6 90.8126 133.337 100 138.641L120 104L140 69.359Z"/> <rect className="home-cases-section-title-bullet-color2" x="176" y="116" width="8" height="16" rx="4"/> <rect className="home-cases-section-title-bullet-color2" x="148" y="136" width="8" height="16" rx="4"/> <path className="home-cases-section-title-bullet-color1" fillRule="evenodd" clipRule="evenodd" d="M206.297 137.318C206.213 137.736 206.404 138.161 206.773 138.374L216.919 144.232C217.397 144.508 218.009 144.344 218.285 143.866C218.561 143.388 218.397 142.776 217.919 142.5L207.773 136.642C207.182 136.301 206.43 136.649 206.297 137.318V137.318ZM207.124 132.468C207.053 132.967 207.363 133.441 207.85 133.571L220.217 136.885C220.75 137.028 221.298 136.711 221.441 136.178C221.584 135.644 221.268 135.096 220.734 134.953L208.368 131.639C207.79 131.484 207.208 131.875 207.124 132.468V132.468ZM207.649 127.912C207.598 128.495 208.054 129 208.64 129L221 129C221.553 129 222 128.552 222 128C222 127.448 221.553 127 221 127H208.64C208.124 127 207.695 127.398 207.649 127.912V127.912Z"/> <path className="home-cases-section-title-bullet-color2" fillRule="evenodd" clipRule="evenodd" d="M135.047 174.019C134.629 173.936 134.204 174.126 133.991 174.495L128.133 184.642C127.857 185.12 128.021 185.731 128.499 186.008C128.978 186.284 129.589 186.12 129.865 185.642L135.723 175.495C136.065 174.904 135.717 174.153 135.047 174.019V174.019ZM139.897 174.847C139.399 174.776 138.925 175.086 138.794 175.573L135.481 187.939C135.338 188.473 135.654 189.021 136.188 189.164C136.721 189.307 137.269 188.99 137.412 188.457L140.726 176.09C140.881 175.512 140.49 174.931 139.897 174.847V174.847ZM144.453 175.372C143.87 175.32 143.365 175.777 143.365 176.363L143.365 188.723C143.365 189.275 143.813 189.723 144.365 189.723C144.918 189.723 145.365 189.275 145.365 188.723L145.365 176.363C145.365 175.847 144.967 175.418 144.453 175.372V175.372Z"/> </svg>,
		"Year of the Rat",
	],
	[	"2019",
	["2DCG"/*Little Soldiers Doodler, Minesweeper, Pixel Letters Typer*/, "KaonashiRobot", "ChineseUnion"],
		<svg className="home-cases-section-title-bullet" xmlns="http://www.w3.org/2000/svg"> <path className="home-cases-section-title-bullet-color1" d="M0 40H120C164.183 40 200 75.8172 200 120V120C200 164.183 164.183 200 120 200H0V40Z"/> <ellipse className="home-cases-section-title-bullet-color2" cx="175.46" cy="114.278" rx="20" ry="16" transform="rotate(-15 175.46 114.278)"/> <circle className="home-cases-section-title-bullet-color1" cx="163.868" cy="117.384" r="4" transform="rotate(-15 163.868 117.384)"/> <circle className="home-cases-section-title-bullet-color1" cx="187.049" cy="111.173" r="4" transform="rotate(-15 187.049 111.173)"/> <path className="home-cases-section-title-bullet-color2" d="M85.3726 98.6274C91.3737 104.629 99.5131 108 108 108C116.487 108 124.626 104.629 130.627 98.6274C136.629 92.6263 140 84.4869 140 76C140 67.5131 136.629 59.3738 130.627 53.3726L108 76L85.3726 98.6274Z"/> <path className="home-cases-section-title-bullet-color1" fillRule="evenodd" clipRule="evenodd" d="M203.992 93.6679C210.575 91.007 216.125 86.2134 219.712 80L191.999 64L183.535 59.1132C192.805 68.7839 199.889 80.5669 203.992 93.6679Z"/> <rect className="home-cases-section-title-bullet-color2" x="124" y="120" width="8" height="16" rx="4"/> </svg>,
		"Year of the Pig",
	],
];

export const cases = {

	"AsTheWindBlows": {
		title: "As The Wind Blows, A PVP Game From Scratch",
		bio: [
			"",
			"3D Modeling and Animation, UI and Graphic Design",
			"10 Weeks Spring 2023",
		],
		thumbnail: {
			brief: <>A Korok fan art game set in the far east, easy to pick up and fun to play. I was in charge of the game art and crafted the characters and map models using Blender. I themed the game world with cel shading and traditional colors inspired by ink wash paintings, and iterated animations until the Koroks appear cute and squishy.</>,
			img: require("./assets/cases/AsTheWindBlows/thumbnail_img.gif"),
		},
		content: {
			overview: [],
			challenge: [],
			solution: [],
			evidence: [],
			img: require("./assets/cases/_case/_img.png"),
		},
		theme: {
			object: require("./assets/cases/_case/_img.png"),
			color: ["#F7EEE5", "#004750", "#253745", "#B7D3DE"],
		},
		next: "",
	},

	"ALUM": {
		title: "ALUM, iOS App To Network Students With Mentors",
		bio: [
			"",
			"UX/UI Design, Lead Designer",
			"September 2022 - June 2023",
		],
		thumbnail: {
			brief: <>Hearing the needs of ALUM, a nonprofit mentorship program at Northwood High School, we designed an iOS app to help students network with alumni mentors, schedule meetings, and pursue their academic and career goals. We maintained an intuitive interface and a vibrant branding to keep the young students engaged. The app is now ready to be launched and facilitate mentorship for 2000+ students.</>,
			img: require("./assets/cases/ALUM/thumbnail_img.png"),
		},
		content: {
			overview: [],
			challenge: [],
			solution: [],
			evidence: [],
			img: require("./assets/cases/_case/_img.png"),
		},
		theme: {
			object: require("./assets/cases/_case/_img.png"),
			color: ["#EBF0FF", "#463EC7", "#302D5D", "#BBCBFF"],
		},
		next: "",
	},

	"CheeseClub": {
		title: "Website For Cheese Club, Where Cheese And Love Are Shared",
		bio: [
			"",
			"UX/UI Design, Webflow Development",
			"May 2023",
		],
		thumbnail: {
			brief: <>My roommates and I founded Cheese Club as a response to the return-to-school challenge following the COVID-19 pandemic. By hosting many cheese-related events, we created a safe space for students to connect and socialize. Check out our website that I designed using Figma and implemented using Webflow: <A href="https://cheese-club-ucsd.webflow.io/">Cheese Club</A></>,
			img: require("./assets/cases/CheeseClub/thumbnail_img.png"),
		},
		content: {
			overview: [],
			challenge: [],
			solution: [],
			evidence: [],
			img: require("./assets/cases/_case/_img.png"),
		},
		theme: {
			object: require("./assets/cases/_case/_img.png"),
			color: ["#FFEDD5", "#99002F", "#641F15", "#FBC477"],
		},
		next: "",
	},

	"CreativityLab": {
		title: "Ubiquitous Gesture Research Project, Database For Gesture Designers",
		bio: [
			"",
			"UX/UI Design, Frontend Development",
			"Summer 2022",
		],
		thumbnail: {
			brief: <>During my internship at <A href="https://creativity.ucsd.edu/">Creativity Lab</A>, an HCI research lab, I led a 4-person team to design and develop a database website using Figma and ReactJS. The objective was to assist analysis of human behavior and guide gesture design in AR settings. Our website enables researchers to upload images capturing human behaviors, and label them with an encoding system we devised based on observation and collection of 2500 photos. Gesture designers can leverage our database to explore real-world human behaviors and occupancy of modalities across different scenarios.</>,
			img: require("./assets/cases/CreativityLab/thumbnail_img.png"),
		},
		content: {
			overview: [],
			challenge: [],
			solution: [],
			evidence: [],
			img: require("./assets/cases/_case/_img.png"),
		},
		theme: {
			object: require("./assets/cases/_case/_img.png"),
			color: ["#DCF7FF", "#00455D", "#00455D", "#8EE2FF"],
		},
		next: "",
	},

	"TSE": {
		title: "Marketing Lead At Triton Software Engineering",
		bio: [
			"",
			"Design System, Digital and Print Graphic Design, Marketing",
			"April 2022 - June 2023",
		],
		thumbnail: {
			brief: <>I wore several hats in TSE, an highly selective student organization at UCSD that has developed software for 20+ nonprofit clients. As the marketing lead, I designed social media posts, flyers, and merchandise, maintaining a branding that upholds professionalism. I co-established the first design system at TSE, standardizing design tokens and fundamental components for future projects.</>,
			img: require("./assets/cases/TSE/thumbnail_img.png"),
		},
		content: {
			overview: [],
			challenge: [],
			solution: [],
			evidence: [],
			img: require("./assets/cases/_case/_img.png"),
		},
		theme: {
			object: require("./assets/cases/_case/_img.png"),
			color: ["#FCF6E5", "#0C2B35", "#0C2B35", "#DEBB01"],
		},
		next: "",
	},

	"CharmLife": {
		title: "User Research And Website Revamp For Charm Life, A Cosmetic Startup",
		bio: [
			"",
			"UX/UI Designer",
			"6 Weeks April 2023",
		],
		thumbnail: {
			brief: <>I took charge of revamping the company's website, setting the stage for the launch of their app. Conducting thorough user research, I crafted user personas that guided our design choices throughout the redesign process.</>,
			img: require("./assets/cases/CharmLife/thumbnail_img.png"),
		},
		content: {
			overview: [],
			challenge: [],
			solution: [],
			evidence: [],
			img: require("./assets/cases/_case/_img.png"),
		},
		theme: {
			object: require("./assets/cases/_case/_img.png"),
			color: ["#FFEAE9", "#532C00", "#323337", "#FFB6B5"],
		},
		next: "",
	},

	"LAK": {
		title: "LAAKTA, Goods Transport Android App For Farmers In Bhutan",
		bio: [
			"",
			"UX/UI Design",
			"November 2021 - June 2023",
		],
		thumbnail: {
			brief: <>To connect farmers and truckers in Bhutan and improve good transportation, we built an Android app similar to Uber Eats. In the app, farmers can post jobs and track delivery progress, and drivers can search for suitable jobs and maximize their profits.</>,
			img: require("./assets/cases/LAK/thumbnail_img.png"),
		},
		content: {
			overview: [],
			challenge: [],
			solution: [],
			evidence: [],
			img: require("./assets/cases/_case/_img.png"),
		},
		theme: {
			object: require("./assets/cases/_case/_img.png"),
			color: ["#FFEAE9", "#900C08", "#900C08", "#FFB6B4"],
		},
		next: "",
	},

	"MAW": {
		title: "Make-A-Wish, Volunteer Hub Webtool To Help Granting Wishes To Children",
		bio: [
			"",
			"UX/UI Design",
			"November 2021 - June 2022",
		],
		thumbnail: {
			brief: <>The mission of the nonprofit Make-A-Wish is to grant wishes to children with critical illness. My team built a volunteer hub that fulfills their needs to coordinate the diverse volunteer base and smoothen the wish-granting process.</>,
			img: require("./assets/cases/MAW/thumbnail_img.png"),
		},
		content: {
			overview: [],
			challenge: [],
			solution: [],
			evidence: [],
			img: require("./assets/cases/_case/_img.png"),
		},
		theme: {
			object: require("./assets/cases/_case/_img.png"),
			color: ["#E6F2FF", "#003E83", "#003E83", "#ACD3FF"],
		},
		next: "",
	},

	"MercuryAlert": {
		title: "Website Revamp And Marketing For Mercury Alert, A Senior Monitoring Startup",
		bio: [
			"",
			"UX/UI Design, Digital and Print Graphic Design, Marketing",
			"15 Weeks Spring 2022",
		],
		thumbnail: {
			brief: <>As the sole designer on the team, I was in charge of everything design-relevant: I initialized a thorough rebrand and redesigned the <A href="https://www.mercuryalert.ai/">product website</A>, enhancing its usability and credibility, attracted a seed funding for the company. I created graphic design for instagram and facebook posts 3 times per week, and increased the like count by 50%. I iterated the sponsorship decks, business card, trifold, and questionnaires. The templates I designed are still in use to date.</>,
			img: require("./assets/cases/MercuryAlert/thumbnail_img.png"),
		},
		content: {
			overview: [],
			challenge: [],
			solution: [],
			evidence: [],
			img: require("./assets/cases/_case/_img.png"),
		},
		theme: {
			object: require("./assets/cases/_case/_img.png"),
			color: ["#E0F5FF", "#054260", "#004465", "#A3D7FF"],
		},
		next: "",
	},

	"3DCG": {
		title: "",
		bio: [
			"",
			"",
			"",
		],
		thumbnail: {
			brief: <></>,
			img: require("./assets/cases/_case/_img.png"),
		},
		content: {
			overview: [],
			challenge: [],
			solution: [],
			evidence: [],
			img: require("./assets/cases/_case/_img.png"),
		},
		theme: {
			object: require("./assets/cases/_case/_img.png"),
			//color: ["#???", "#???", "#???", "#???"],
		},
		next: "",
	},

	"2022Art": {
		title: "",
		bio: [
			"",
			"",
			"",
		],
		thumbnail: {
			brief: <></>,
			img: require("./assets/cases/_case/_img.png"),
		},
		content: {
			overview: [],
			challenge: [],
			solution: [],
			evidence: [],
			img: require("./assets/cases/_case/_img.png"),
		},
		theme: {
			object: require("./assets/cases/_case/_img.png"),
			//color: ["#???", "#???", "#???", "#???"],
		},
		next: "",
	},

	"Bitsrealm": {
		title: "4 Websites For The First Virtual Concert At Bitsrealm Technology",
		bio: [
			"",
			"UI Design",
			"6 Weeks Summer 2021",
		],
		thumbnail: {
			brief: <>Bitsrealm Technology is a VR game company. As the sole designer on the team back then, I worked closely with game writers and developers to craft branding and prototypes for 4 digital products, and enabled a successful debut of the company's virtual concerts.</>,
			img: require("./assets/cases/Bitsrealm/thumbnail_img.png"),
		},
		content: {
			overview: [],
			challenge: [],
			solution: [],
			evidence: [],
			img: require("./assets/cases/_case/_img.png"),
		},
		theme: {
			object: require("./assets/cases/_case/_img.png"),
			color: ["#D9FFDD", "#333333", "#333333", "#95F19E"],
		},
		next: "",
	},

	"CruzRoja": {
		title: "Ambulance Dispatching System Redesign For Red Cross Tijuana",
		bio: [
			"",
			"UI Design",
			"Spring and Fall 2021",
		],
		thumbnail: {
			brief: <>Collaborating with a cross-disciplinary team, I redesigned the UI of an ambulance dispatching system responsible for coordinating emergency services in Tijuana, Mexico. We enhanced usability and information hierarchy of the complex system to optimize efficiency of limited EMS resources, bringing reliable health care to millions of citizens.</>,
			img: require("./assets/cases/CruzRoja/thumbnail_img.png"),
		},
		content: {
			overview: [],
			challenge: [],
			solution: [],
			evidence: [],
			img: require("./assets/cases/_case/_img.png"),
		},
		theme: {
			object: require("./assets/cases/_case/_img.png"),
			color: ["#EBF1F7", "#003B92", "#323334", "#B1D0FF"],
		},
		next: "",
	},

	"ACM": {
		title: "Upgrade Website For ACM@UCSD",
		bio: [
			"",
			"UX/UI Design, Graphic Design, Illustration",
			"",
		],
		thumbnail: {
			brief: <>To help ACM@UCSD attract potential members, my team upgraded its website. We strategically restructured the layout, curated fresh content, and enhanced user interactions for intuitive navigation. Additionally, I created graphic design and illustrations for an internal game app and external marketing.</>,
			img: require("./assets/cases/ACM/thumbnail_img.png"),
		},
		content: {
			overview: [],
			challenge: [],
			solution: [],
			evidence: [],
			img: require("./assets/cases/_case/_img.png"),
		},
		theme: {
			object: require("./assets/cases/_case/_img.png"),
			color: ["#CDFFFF", "#003F7F", "#003F7F", "#7EEDED"],
		},
		next: "",
	},

	"Atlas": {
		title: "Fullfiller Dashboard For Atlas, An E-commerce Startup",
		bio: [
			"",
			"UI Design",
			"June 2021",
		],
		thumbnail: {
			brief: <>Tailoring to Atlas's requirements, I designed and prototyped a full dashboard for e-commerce fullfillers. The dashboard contains data visualization panels, a message inbox, and detailed tracking of products, partners, and payments.</>,
			img: require("./assets/cases/Atlas/thumbnail_img.png"),
		},
		content: {
			overview: [],
			challenge: [],
			solution: [],
			evidence: [],
			img: require("./assets/cases/_case/_img.png"),
		},
		theme: {
			object: require("./assets/cases/_case/_img.png"),
			color: ["#EEEEFC", "#28305F", "#333238", "#C1C9F8"],
		},
		next: "",
	},

	"RehaBuddy": {
		title: "RehaBuddy, Electronic Pet To Motivate Stroke Rehabilitation",
		bio: [
			"",
			"Conceptualization, Illustration",
			"Spring 2021",
		],
		thumbnail: {
			brief: <>Based on interview data and literature reviews, I conceptualized an electronic pet therapy putty device, which would provide stroke patients with ongoing motivation during their upper-limb recovery exercises at home, fostering engagement and progress.</>,
			img: require("./assets/cases/RehaBuddy/thumbnail_img.png"),
		},
		content: {
			overview: [],
			challenge: [],
			solution: [],
			evidence: [],
			img: require("./assets/cases/_case/_img.png"),
		},
		theme: {
			object: require("./assets/cases/_case/_img.png"),
			color: ["#FFEED0", "#00484B", "#303337", "#78EFF3"],
		},
		next: "",
	},

	"PadPal": {
		title: "PadPal, Menstrual Dignity For Girls In Pune, India",
		bio: [
			"",
			"Conceptualization, Graphic design, Illustration",
			"",
		],
		thumbnail: {
			brief: <>In collaboration with Project Kilimanjaro, a nonprofit helping girls and women in Pune, India with menstrual health management, I led the design of a menstrual care bag with an instruction manual. The bag can be easily hand-sewed and used to carry menstrual products safely and sanitarily.</>,
			img: require("./assets/cases/_case/_img.png"),
		},
		content: {
			overview: [],
			challenge: [],
			solution: [],
			evidence: [],
			img: require("./assets/cases/_case/_img.png"),
		},
		theme: {
			object: require("./assets/cases/_case/_img.png"),
			color: ["#FFECDB", "#8C0F00", "#572A00", "#FFB8AF"],
		},
		next: "",
	},

	"GroupReads": {
		title: "GroupReads, App To Encourage Students To Complete Assigned Readings Together",
		bio: [
			"",
			"UX/UI Design, Frontend Development",
			"Winter 2021",
		],
		thumbnail: {
			brief: <>Seeing students constantly overwhelmed by class readings, my team designed and implemented an app to help enhance their engagement with the reading together with their peers and bring back their motivation. We practiced the Double Diamond design process, as well as frontend languages including HTML, CSS, and javascript.</>,
			img: require("./assets/cases/GroupReads/thumbnail_img.png"),
		},
		content: {
			overview: [],
			challenge: [],
			solution: [],
			evidence: [],
			img: require("./assets/cases/_case/_img.png"),
		},
		theme: {
			object: require("./assets/cases/_case/_img.png"),
			color: ["#F8ECF0", "#09444D", "#09444D", "#EEBFB5"],
		},
		next: "",
	},

	"2021Art": {
		title: "",
		bio: [
			"",
			"",
			"",
		],
		thumbnail: {
			brief: <></>,
			img: require("./assets/cases/_case/_img.png"),
		},
		content: {
			overview: [],
			challenge: [],
			solution: [],
			evidence: [],
			img: require("./assets/cases/_case/_img.png"),
		},
		theme: {
			object: require("./assets/cases/_case/_img.png"),
			//color: ["#???", "#???", "#???", "#???"],
		},
		next: "",
	},

	"ThriveSD": {
		title: "ThriveSD, Proposal To Support Small Restaurants And Homeless Individuals During Covid-19",
		bio: [
			"",
			"Conceptualization, Volunteering",
			"Spring 2020",
		],
		thumbnail: {
			brief: <>In response to the Covid-19 outbreak, we proposed a buy-1-give-1 modal to recover the supply and consumption chain, and help small restaurants and homeless individuals survive hard time. I collaborated with a group of problem solvers from various walks of life, practiced design thinking, researched stakeholders, and developed this proposal.</>,
			img: require("./assets/cases/_case/_img.png"),
		},
		content: {
			overview: [],
			challenge: [],
			solution: [],
			evidence: [],
			img: require("./assets/cases/_case/_img.png"),
		},
		theme: {
			object: require("./assets/cases/_case/_img.png"),
			color: ["#FFEAEA", "#183E3E", "#AA0000", "#B1D7D7"],
		},
		next: "",
	},

	"Neureality": {
		title: "Illustrations For Popular Science At Neureality",
		bio: [
			"",
			"Illustration",
			"February 2020 - February 2021",
		],
		thumbnail: {
			brief: <>I crafted stylized illustrations and comics for articles on neuroscience and cognitive science, promoting popularization of the latest discoveries in these fields among the general public. By visually engaging audiences, my work bridged the gap between complex scientific concepts and wider understanding.</>,
			img: require("./assets/cases/Neureality/thumbnail_img.png"),
		},
		content: {
			overview: [],
			challenge: [],
			solution: [],
			evidence: [],
			img: require("./assets/cases/_case/_img.png"),
		},
		theme: {
			object: require("./assets/cases/_case/_img.png"),
			color: ["#CEFFFD", "#333331", "#333331", "#87EAE5"],
		},
		next: "",
	},

	"CellInTheSpace": {
		title: "",
		bio: [
			"",
			"",
			"",
		],
		thumbnail: {
			brief: <></>,
			img: require("./assets/cases/_case/_img.png"),
		},
		content: {
			overview: [],
			challenge: [],
			solution: [],
			evidence: [],
			img: require("./assets/cases/_case/_img.png"),
		},
		theme: {
			object: require("./assets/cases/_case/_img.png"),
			//color: ["#???", "#???", "#???", "#???"],
		},
		next: "",
	},

	"2020Art": {
		title: "",
		bio: [
			"",
			"",
			"",
		],
		thumbnail: {
			brief: <></>,
			img: require("./assets/cases/_case/_img.png"),
		},
		content: {
			overview: [],
			challenge: [],
			solution: [],
			evidence: [],
			img: require("./assets/cases/_case/_img.png"),
		},
		theme: {
			object: require("./assets/cases/_case/_img.png"),
			//color: ["#???", "#???", "#???", "#???"],
		},
		next: "",
	},

	"GaokaoFighting": {
		title: "",
		bio: [
			"",
			"",
			"",
		],
		thumbnail: {
			brief: <></>,
			img: require("./assets/cases/_case/_img.png"),
		},
		content: {
			overview: [],
			challenge: [],
			solution: [],
			evidence: [],
			img: require("./assets/cases/_case/_img.png"),
		},
		theme: {
			object: require("./assets/cases/_case/_img.png"),
			//color: ["#???", "#???", "#???", "#???"],
		},
		next: "",
	},

	"2DCG": {
		title: "",
		bio: [
			"",
			"",
			"",
		],
		thumbnail: {
			brief: <></>,
			img: require("./assets/cases/_case/_img.png"),
		},
		content: {
			overview: [],
			challenge: [],
			solution: [],
			evidence: [],
			img: require("./assets/cases/_case/_img.png"),
		},
		theme: {
			object: require("./assets/cases/_case/_img.png"),
			//color: ["#???", "#???", "#???", "#???"],
		},
		next: "",
	},

	"KaonashiRobot": {
		title: "",
		bio: [
			"",
			"",
			"",
		],
		thumbnail: {
			brief: <></>,
			img: require("./assets/cases/_case/_img.png"),
		},
		content: {
			overview: [],
			challenge: [],
			solution: [],
			evidence: [],
			img: require("./assets/cases/_case/_img.png"),
		},
		theme: {
			object: require("./assets/cases/_case/_img.png"),
			//color: ["#???", "#???", "#???", "#???"],
		},
		next: "",
	},

	"ChineseUnion": {
		title: "",
		bio: [
			"",
			"",
			"",
		],
		thumbnail: {
			brief: <></>,
			img: require("./assets/cases/_case/_img.png"),
		},
		content: {
			overview: [],
			challenge: [],
			solution: [],
			evidence: [],
			img: require("./assets/cases/_case/_img.png"),
		},
		theme: {
			object: require("./assets/cases/_case/_img.png"),
			//color: ["#???", "#???", "#???", "#???"],
		},
		next: "",
	},

}
