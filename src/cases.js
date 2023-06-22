/**
 * Structure of "cases":
 *	cases {
 *		<case_id> : {
 *			title: <title>(text_object),
 *			bio: [<client>(text_object), <role>(str), <duration>(text_object)],
 *			thumbnail: {
 *				brief: [...](list of str),
 *				img: <thumbnail_img>(img as required path),
 *			},
 *			content: {
 *				tldr: (text_object),
 *				link?: [<link-prompt>(str), <link>(url str)],
 *				body: [<structure-type | "challenge-solution", "freeform">(str)], [
 *					[
 *						<title>(str),
 *						<content>(text_object),
 *					], [...],
 *				]],
 *				evidence: (text_object),
 *				credits: (text_object),
 *				img: <cover_img>(img as required path),
 *			},
 *			theme: {
 *				object: <object>(img as required path),	// TODO: img(s)
 *				color?: [<color-bg-light>(str), <color-title-light>(str), <color-bg-dark>(str), <color-title-dark>(str)],
 *				template?: <template-id | 0, 1, 2>(int),
 *			},
 *			next: <next_case_id>(str),
 *		},
 *		... : {...}
 *	}
 */

import { A, Emoji, P, ExpandablePs, Img } from "./components.js";
import { isSafari, isIE } from "react-device-detect";

/* Assets */
// Objects
import { ReactComponent as ObjectAsTheWindBlows } from "./assets/cases/_case/_object.svg";
import { ReactComponent as ObjectALUM } from "./assets/cases/_case/_object.svg";
import { ReactComponent as ObjectCheeseClub } from "./assets/cases/CheeseClub/object.svg";
import { ReactComponent as ObjectCreativityLab } from "./assets/cases/_case/_object.svg";
import { ReactComponent as ObjectTSE } from "./assets/cases/TSE/object.svg";
import { ReactComponent as ObjectCharmLife } from "./assets/cases/_case/_object.svg";
import { ReactComponent as ObjectLAK } from "./assets/cases/LAK/object.svg";
import { ReactComponent as ObjectMAW } from "./assets/cases/MAW/object.svg";
import { ReactComponent as ObjectMercuryAlert } from "./assets/cases/MercuryAlert/object.svg";
import { ReactComponent as Object3DCG } from "./assets/cases/_case/_object.svg";	//NAH
import { ReactComponent as Object2022Art } from "./assets/cases/_case/_object.svg";	//NAH
import { ReactComponent as ObjectBitsrealm } from "./assets/cases/Bitsrealm/object.svg";
import { ReactComponent as ObjectCruzRoja } from "./assets/cases/CruzRoja/object.svg";
import { ReactComponent as ObjectACM } from "./assets/cases/ACM/object.svg";
import { ReactComponent as ObjectAtlas } from "./assets/cases/_case/_object.svg";
import { ReactComponent as ObjectRehaBuddy } from "./assets/cases/RehaBuddy/object.svg";
import { ReactComponent as ObjectPadPal } from "./assets/cases/PadPal/object.svg";	//NAH
import { ReactComponent as ObjectGroupReads } from "./assets/cases/GroupReads/object.svg";	//NAH
import { ReactComponent as Object2021Art } from "./assets/cases/_case/_object.svg";	//NAH
import { ReactComponent as ObjectThriveSD } from "./assets/cases/_case/_object.svg";
import { ReactComponent as ObjectNeureality } from "./assets/cases/Neureality/object.svg";
import { ReactComponent as ObjectCellInTheSpace } from "./assets/cases/_case/_object.svg";	//NAH
import { ReactComponent as Object2020Art } from "./assets/cases/_case/_object.svg";	//NAH
import { ReactComponent as ObjectGaokaoFighting } from "./assets/cases/_case/_object.svg";	//NAH
import { ReactComponent as Object2DCG } from "./assets/cases/_case/_object.svg";	//NAH
import { ReactComponent as ObjectKaonashiRobot } from "./assets/cases/_case/_object.svg";	//NAH
import { ReactComponent as ObjectCU } from "./assets/cases/_case/_object.svg";



export const casesNames = ["AsTheWindBlows", "ALUM", "CheeseClub", "CreativityLab", "TSE", "CharmLife", "LAK", "MAW", "MercuryAlert", /*"3DCG",*/ /*"2022Art",*/ "Bitsrealm", "CruzRoja", "ACM", "Atlas", "RehaBuddy", /*"PadPal",*/ /*"GroupReads",*/ /*"2021Art",*/ "ThriveSD", "Neureality", /*"CellInTheSpace",*/ /*"2020Art",*/ /*"GaokaoFighting",*/ /*"2DCG",*/ /*"KaonashiRobot",*/ "CU"];	// Cases are in the same order.

export const casesGoats = ["CreativityLab", "AsTheWindBlows", "ALUM"];

export const casesByCategory = [
	[	"UX/UI",
		["ALUM", "Bitsrealm", "CruzRoja", "MercuryAlert", "LAK", "MAW", "ACM", "Atlas", "CharmLife", /*"GroupReads",*/],
	],
	[	"Frontend",
		["CheeseClub", "CreativityLab",],
	],
	[	"3D",
		["AsTheWindBlows", /*"3DCG",*/ /*"CellInTheSpace",*/],
	],
	[	"Marketing",
		["TSE",],
	],
	[	"Illustration",
		["Neureality", "CU",],
	],
	[	"Conceptualization",
		["RehaBuddy", /*"PadPal",*/ "ThriveSD",],
	],
	// [ "",
	// 	[/*"2DCG",*/ /*"2021Art",*/ /*"2020Art",*/ /*"GaokaoFighting",*/ /*"2022Art",*/ /*"KaonashiRobot",*/],
	// ],
];

export const casesByTimeline = [
	[	"2023",
		["AsTheWindBlows", "ALUM", "CheeseClub", "TSE", "CharmLife",],
		<svg className="home-cases-section-title-bullet" xmlns="http://www.w3.org/2000/svg"> <path className="home-cases-section-title-bullet-color1" d="M0 40H120C164.183 40 200 75.8172 200 120V120C200 164.183 164.183 200 120 200H0V40Z"/> <rect className="home-cases-section-title-bullet-color1" x="168" y="4" width="24" height="80" rx="12" transform="rotate(15 168 4)"/> <rect className="home-cases-section-title-bullet-color1" x="120" width="24" height="80" rx="12"/> <rect className="home-cases-section-title-bullet-color2" x="168" y="72" width="8" height="16" rx="4"/> <rect className="home-cases-section-title-bullet-color2" x="124" y="64" width="8" height="16" rx="4"/> <path className="home-cases-section-title-bullet-color2" fillRule="evenodd" clipRule="evenodd" d="M154.63 103.111V103.111C155.251 102.182 156.751 102.182 157.371 103.111C158.094 104.193 158.926 105.209 159.859 106.142C163.136 109.419 167.433 111.442 172.004 111.9C173.103 112.01 174.001 111.105 174.001 110V110C174.001 108.895 173.102 108.013 172.006 107.875C168.498 107.434 165.214 105.84 162.687 103.314C160.161 100.787 158.566 97.5028 158.126 93.9949C157.988 92.8989 157.105 92 156.001 92V92C154.896 92 154.014 92.8989 153.876 93.9948C153.567 96.4525 152.691 98.8145 151.304 100.889C149.546 103.52 147.047 105.571 144.124 106.782C141.2 107.993 137.983 108.31 134.879 107.693C132.432 107.206 130.142 106.155 128.186 104.636C127.314 103.958 126.054 103.947 125.273 104.728V104.728C124.492 105.509 124.486 106.784 125.341 107.483C127.87 109.551 130.876 110.974 134.099 111.616C137.979 112.387 142 111.991 145.655 110.478C149.309 108.964 152.433 106.4 154.63 103.111Z"/> </svg>,
		"Year of the Rabbit",
	],
	[	"2022",
		["CreativityLab", "LAK", "MAW", "MercuryAlert", /*"3DCG",*/ /*"2022Art",*/],
		<svg className="home-cases-section-title-bullet" xmlns="http://www.w3.org/2000/svg"> <path className="home-cases-section-title-bullet-color1" d="M0 40H120C164.183 40 200 75.8172 200 120V120C200 164.183 164.183 200 120 200H0V40Z"/> <circle className="home-cases-section-title-bullet-color1" cx="180" cy="60" r="12"/> <circle className="home-cases-section-title-bullet-color1" cx="132" cy="36" r="12"/> <circle className="home-cases-section-title-bullet-color2" cx="152" cy="148" r="32"/> <path className="home-cases-section-title-bullet-color1" d="M144.98 123.25C144.781 123.993 143.852 124.242 143.307 123.698L138 118.391L146.923 116L144.98 123.25Z"/> <rect className="home-cases-section-title-bullet-color2" x="128" y="84" width="24" height="8" rx="4" transform="rotate(30 128 84)"/> <rect className="home-cases-section-title-bullet-color2" x="176" y="104" width="16" height="8" rx="4"/> <path className="home-cases-section-title-bullet-color2" fillRule="evenodd" clipRule="evenodd" d="M153.081 46.983C152.097 46.5407 151 47.2716 151 48.3508V48.3508C151 48.9533 151.358 49.4972 151.907 49.7445C158.342 52.6416 164.338 56.4123 169.729 60.9447C170.632 61.7032 170.839 63.0011 170.249 64.0219V64.0219C169.457 65.3948 167.599 65.681 166.383 64.6637C162.311 61.2566 157.872 58.3133 153.147 55.8885C152.157 55.3804 151 56.112 151 57.2248V57.2248C151 57.8007 151.327 58.3257 151.839 58.5892C156.829 61.1569 161.487 64.329 165.706 68.035C166.573 68.7966 166.76 70.0659 166.183 71.0653V71.0653C165.378 72.4599 163.477 72.7259 162.264 71.6668C159.449 69.2093 156.426 67.0073 153.23 65.0848C152.238 64.4881 151 65.2182 151 66.3758V66.3758C151 66.9175 151.288 67.4172 151.752 67.697C155.936 70.2213 159.809 73.2489 163.28 76.72C165.359 78.7992 167.279 81.0224 169.027 83.3703C169.32 83.764 169.78 84 170.271 84V84C171.497 84 172.218 82.6352 171.487 81.6504C170.403 80.1907 169.256 78.7767 168.049 77.4127C167.31 76.5777 167.165 75.3641 167.723 74.3984V74.3984C168.559 72.9501 170.546 72.6981 171.658 73.9471C174.247 76.8543 176.58 79.9735 178.634 83.2696C178.916 83.7213 179.408 84 179.941 84V84C181.109 84 181.837 82.7394 181.22 81.7468C178.34 77.1148 174.933 72.8167 171.058 68.9419V68.9419C170.989 68.8727 170.975 68.7657 171.024 68.6809L172.77 65.6555C173.152 64.9941 174.054 64.8663 174.594 65.4063V65.4063C179.83 70.6426 184.268 76.6014 187.78 83.0897C188.081 83.6473 188.662 84 189.296 84H190.002C190.553 84 191 83.5532 191 83.0021V83.0021C191 82.8415 190.961 82.6832 190.887 82.541C187.167 75.4568 182.392 68.9623 176.715 63.285C169.887 56.4571 161.877 50.935 153.081 46.983Z"/> </svg>,
		"Year of the Tiger",
	],
	[	"2021",
		["Bitsrealm", "CruzRoja", "ACM", "Atlas", "RehaBuddy", /*"PadPal",*/ /*"GroupReads",*/ /*"2021Art",*/],
		<svg className="home-cases-section-title-bullet" xmlns="http://www.w3.org/2000/svg"> <path className="home-cases-section-title-bullet-color1" d="M0 40H120C164.183 40 200 75.8172 200 120V120C200 164.183 164.183 200 120 200H0V40Z"/> <path className="home-cases-section-title-bullet-color1" fillRule="evenodd" clipRule="evenodd" d="M100.414 8C101.497 8 102.053 9.94347 101.306 10.7282C99.2576 12.8809 98 15.7936 98 19C98 25.6274 103.373 31 110 31H150C156.627 31 162 25.6274 162 19C162 15.7936 160.742 12.8809 158.694 10.7282C157.947 9.94347 158.503 8 159.586 8H160C171.046 8 180 16.9543 180 28C180 39.0457 171.046 48 160 48C158.758 48 158.335 49.7547 159.415 50.3676C179.02 61.4888 193.466 80.6504 198.269 103.37C200.182 112.419 192.502 120 183.252 120H156C136.118 120 120 103.882 120 84V68C120 56.9543 111.046 48 100 48C88.9543 48 80 39.0457 80 28C80 16.9543 88.9543 8 100 8H100.414Z"/> <rect className="home-cases-section-title-bullet-color2" x="144" y="40" width="8" height="16" rx="4"/> <rect className="home-cases-section-title-bullet-color2" x="120" y="40" width="8" height="16" rx="4"/> </svg>,
		"Year of the Ox",
	],
	[	"2020",
		["ThriveSD", "Neureality", /*"CellInTheSpace",*/ /*"2020Art",*/ /*"GaokaoFighting",*/],
		<svg className="home-cases-section-title-bullet" xmlns="http://www.w3.org/2000/svg"> <path className="home-cases-section-title-bullet-color1" d="M0 40H120C164.183 40 200 75.8172 200 120V120C200 164.183 164.183 200 120 200H0V40Z"/> <path className="home-cases-section-title-bullet-color1" fillRule="evenodd" clipRule="evenodd" d="M207.141 107.652C212.659 101.326 216.001 93.0533 216.001 83.9999C216.001 64.1176 199.883 47.9999 180.001 47.9999C177.211 47.9999 174.496 48.3171 171.889 48.9176C190.639 62.6278 203.761 83.5771 207.141 107.652Z"/> <path className="home-cases-section-title-bullet-color2" d="M140 69.359C130.813 64.0547 119.894 62.6172 109.647 65.363C99.4001 68.1087 90.6633 74.8126 85.359 84C80.0547 93.1874 78.6172 104.106 81.363 114.353C84.1087 124.6 90.8126 133.337 100 138.641L120 104L140 69.359Z"/> <rect className="home-cases-section-title-bullet-color2" x="176" y="116" width="8" height="16" rx="4"/> <rect className="home-cases-section-title-bullet-color2" x="148" y="136" width="8" height="16" rx="4"/> <path className="home-cases-section-title-bullet-color1" fillRule="evenodd" clipRule="evenodd" d="M206.297 137.318C206.213 137.736 206.404 138.161 206.773 138.374L216.919 144.232C217.397 144.508 218.009 144.344 218.285 143.866C218.561 143.388 218.397 142.776 217.919 142.5L207.773 136.642C207.182 136.301 206.43 136.649 206.297 137.318V137.318ZM207.124 132.468C207.053 132.967 207.363 133.441 207.85 133.571L220.217 136.885C220.75 137.028 221.298 136.711 221.441 136.178C221.584 135.644 221.268 135.096 220.734 134.953L208.368 131.639C207.79 131.484 207.208 131.875 207.124 132.468V132.468ZM207.649 127.912C207.598 128.495 208.054 129 208.64 129L221 129C221.553 129 222 128.552 222 128C222 127.448 221.553 127 221 127H208.64C208.124 127 207.695 127.398 207.649 127.912V127.912Z"/> <path className="home-cases-section-title-bullet-color2" fillRule="evenodd" clipRule="evenodd" d="M135.047 174.019C134.629 173.936 134.204 174.126 133.991 174.495L128.133 184.642C127.857 185.12 128.021 185.731 128.499 186.008C128.978 186.284 129.589 186.12 129.865 185.642L135.723 175.495C136.065 174.904 135.717 174.153 135.047 174.019V174.019ZM139.897 174.847C139.399 174.776 138.925 175.086 138.794 175.573L135.481 187.939C135.338 188.473 135.654 189.021 136.188 189.164C136.721 189.307 137.269 188.99 137.412 188.457L140.726 176.09C140.881 175.512 140.49 174.931 139.897 174.847V174.847ZM144.453 175.372C143.87 175.32 143.365 175.777 143.365 176.363L143.365 188.723C143.365 189.275 143.813 189.723 144.365 189.723C144.918 189.723 145.365 189.275 145.365 188.723L145.365 176.363C145.365 175.847 144.967 175.418 144.453 175.372V175.372Z"/> </svg>,
		"Year of the Rat",
	],
	[	"2019",
	[/*"2DCG",*/ /*"KaonashiRobot",*/ "CU"],
		<svg className="home-cases-section-title-bullet" xmlns="http://www.w3.org/2000/svg"> <path className="home-cases-section-title-bullet-color1" d="M0 40H120C164.183 40 200 75.8172 200 120V120C200 164.183 164.183 200 120 200H0V40Z"/> <ellipse className="home-cases-section-title-bullet-color2" cx="175.46" cy="114.278" rx="20" ry="16" transform="rotate(-15 175.46 114.278)"/> <circle className="home-cases-section-title-bullet-color1" cx="163.868" cy="117.384" r="4" transform="rotate(-15 163.868 117.384)"/> <circle className="home-cases-section-title-bullet-color1" cx="187.049" cy="111.173" r="4" transform="rotate(-15 187.049 111.173)"/> <path className="home-cases-section-title-bullet-color2" d="M85.3726 98.6274C91.3737 104.629 99.5131 108 108 108C116.487 108 124.626 104.629 130.627 98.6274C136.629 92.6263 140 84.4869 140 76C140 67.5131 136.629 59.3738 130.627 53.3726L108 76L85.3726 98.6274Z"/> <path className="home-cases-section-title-bullet-color1" fillRule="evenodd" clipRule="evenodd" d="M203.992 93.6679C210.575 91.007 216.125 86.2134 219.712 80L191.999 64L183.535 59.1132C192.805 68.7839 199.889 80.5669 203.992 93.6679Z"/> <rect className="home-cases-section-title-bullet-color2" x="124" y="120" width="8" height="16" rx="4"/> </svg>,
		"Year of the Pig",
	],
];



export const bioStructure = ["Client", "My Role", "Timeline"];



export const cases = {

	"AsTheWindBlows": {
		title: <>As The Wind Blows, PVP Game From Scratch</>,
		bio: [
			null,
			"3D Modeling and Animation, \nUI and Graphic Design",
			<>10 Weeks Spring 2023</>,
		],
		thumbnail: {
			brief: [
				"3D multiplayer game made from scratch in 10 weeks, demoed to 300+ audience.",
				"Modeled and animated characters and map using Blender, maintaining a stylized game art.",
			],
			img: require("./assets/cases/AsTheWindBlows/thumbnail_img.gif"),
		},
		content: {
			tldr: ["TL;DR",
				<>A Korok fan art game set in the far east, easy to pick up and fun to play. I was in charge of the game art and crafted the characters and map models using Blender. I themed the game world with cel shading and traditional colors inspired by ink wash paintings, and iterated animations until the Koroks appear cute and squishy.</>
			],
			link: ["Watch\nDemo", "https://youtu.be/MUKqqoazBh4"],
			body: ["challenge-solution", []],
			evidence: [],
			credits: [],
			img: require("./assets/cases/_case/_img.png"),
		},
		theme: {
			object: <ObjectAsTheWindBlows />,
			color: ["#F7EEE5", "#004750", "#253745", "#B7D3DE"],
			template: 0,
		},
		next: "",
	},

	"ALUM": {
		title: <>ALUM, iOS App For High School Mentorship</>,
		bio: [
			<><A href="https://alumfornorthwood.org/">ALUM for Northwood</A>,<br/>a nonprofit highschool mentorship program</>,
			"UX/UI Design, \nLead Designer",
			<>September 2022 - June 2023</>,
		],
		thumbnail: {
			brief: [
				"Led the design of an iOS app to connect high school mentees with alumni mentors, facilitating mentorship for 2000+ students.",
				"Agile team, seamless collaboration with PM, EM and developers.",
				"Iterated rapidly based on weekly communicated with the clients.",
			],
			img: require("./assets/cases/ALUM/thumbnail_img.png"),
		},
		content: {
			tldr: ["TL;DR",
				<>ALUM, the mentorship program, seeked to enhance member engagement and simplify meeting scheduling. To address this need, my team designed an iOS app, where students can network with alumni mentors, schedule meetings, and keep track of their academic and career goals. We maintained an intuitive interface and a vibrant branding to keep the young students engaged. The app is now ready to be launched and facilitate mentorship for 2000+ students.</>
			],
			body: ["challenge-solution", []],
			evidence: [],
			credits: [],
			img: require("./assets/cases/_case/_pigeon.png"),
		},
		theme: {
			object: <ObjectALUM />,
			color: ["#EBF0FF", "#463EC7", "#302D5D", "#BBCBFF"],
			template: 0,
		},
		next: "",
	},

	"CheeseClub": {
		title: <>Cheese Club, Friendship And Webflow Site</>,
		bio: [
			<>Cheese Club @UCSD</>,
			"UI Design, \nWebflow Development",
			<>May 2023</>,
		],
		thumbnail: {
			brief: [
				"Co-founded Cheese Club, addressing post-COVID return-to-school challenges with socialization events.",
				"Self-taught Webflow, designed and developed a responsive home site with micro-animations.",
			],
			img: require("./assets/cases/CheeseClub/thumbnail_img.png"),
		},
		content: {
			tldr: ["TL;DR",
				<>As a response to the return-to-school challenge following the COVID-19 pandemic, my roommates and I founded Cheese Club. By hosting many cheese-related events, we created a safe space for students to connect and socialize. I designed and implemented our website using Figma and Webflow.</>
			],
			link: ["Visit\nWebsite", "https://cheese-club-ucsd.webflow.io/"],
			body: ["freeform", [
				["Branding", <>
					<P>We are a club about friendship, sharing, and fun, offering a gentle and warm space for socialization and destressing. To convey this message in the branding, I selected colors and typographies that balance between playfulness and comfort, creating a striking yet welcoming vibe.</P>
					<P>Inspired from <A href="https://www.craftui.com/">Alla Kholmatova</A>'s book Design Systems, I believe naming of elements is also part of the branding, and good names can inform designers when and how to use the elements. Therefore, when naming the colors of Cheese Club, instead of using generic labels like "primary yellow" and "secondary brown", I chose names that are not only descriptive, but also evoke emotions and align with the brand personality. "The Cheese" is obviously the core color for Cheese Club. "The Coffee", a side dish, serve as a complement to "The Cheese". Both "Elegant Gray" and "Wild Magenta" are accent, but "Elegant Gray" is subtle and slightly more formal, while "Wild Magenta" is loud and meant to be used for highlights.</P>
					<Img
						src={require("./assets/cases/CheeseClub/branding_colors.png")}
						sizeId={0}
						alt="color branding guidlines"
						caption="brand colors, with carefully selected names"
						zoomable={false}
					/>
					<P>Each member uses their unique superpower to contribute towards the collective goal of fostering socialization and bonding, and my strength lies in design. By the way, upon my suggestion, we all gave ourselves a cheese name, like secret agents. My cheese name is Mozzarella :></P>
					<Img
						src={require("./assets/cases/CheeseClub/wrappers.png")}
						sizeId={0}
						alt="wrapper patterns"
						caption="wrapper patterns I designed"
						zoomable={false}
					/>
				</>],
				["Responsive Design", <>
					<P>Webflow made building responsive websites very efficient. With my previous fontend practice and familaity with the Figma auto layout system, I quickly picked up Webflow. Starting with sketching multiple ideas, I then crafted a comprehensive prototype using Figma. Once these plannings were completed, the implementation phase progressed smoothly, and I developed the Cheese Club website within a weekend using Webflow.</P>
					<Img
						src={require("./assets/cases/CheeseClub/website_home.png")}
						sizeId={0}
						alt="website home page"
						caption="home page of the Cheese Club website I made"
						zoomable={false}
					/>
					<Img
						src={require("./assets/cases/CheeseClub/website_about.png")}
						sizeId={0}
						alt="website about page"
						caption="about page"
						zoomable={false}
					/>
					<Img
						src={require("./assets/cases/CheeseClub/website_events.png")}
						sizeId={0}
						alt="website events page"
						caption="events page"
						zoomable={false}
					/>
					<Img
						src={require("./assets/cases/CheeseClub/website_individual_event.png")}
						sizeId={0}
						alt="website individual event page"
						caption="individual event page"
						zoomable={false}
					/>
					<Img
						src={require("./assets/cases/CheeseClub/website_cheese_roll.gif")}
						sizeId={0}
						alt="prototype of a fancy navigation bar animation: cheese rolling from bottom to top of the screen"
						caption="A fancy animation of the navigation bar that I designed, abandoned due to time constraint."
						zoomable={false}
					/>
				</>],
			]],
			evidence: [],
			credits: [],
			//img: require("./assets/cases/CheeseClub/logo.png"),
		},
		theme: {
			object: <ObjectCheeseClub />,
			color: ["#FFEDD5", "#7C0F31", "#641F15", "#FBC477"],
			template: 0,
		},
		next: "",
	},

	"CreativityLab": {
		title: <>Creativity Lab, Database For Gesture Designers</>,
		bio: [
			<><A href="https://creativity.ucsd.edu/">Creativity Lab</A>,<br/>an HCI research lab</>,
			"UX/UI Design, \nFrontend Development",
			<>Summer 2022</>,
		],
		thumbnail: {
			brief: [
				"Led a 4-person team, self-taught ReactJS to design and develop a database website that assists analysis of human behavior and guides gesture design in AR settings.",
			],
			img: require("./assets/cases/CreativityLab/thumbnail_img.png"),
		},
		content: {
			tldr: ["TL;DR",
				<>I led a 4-person team to design and develop a database website using Figma and ReactJS. The objective was to assist analysis of human behavior and guide gesture design in AR settings. Our website enables researchers to upload images capturing human behaviors, and label them with an encoding system we devised based on observation and collection of 2500 photos. Gesture designers can leverage our database to explore real-world human behaviors and occupancy of modalities across different scenarios.</>
			],
			body: ["challenge-solution", []],
			evidence: [],
			credits: [],
			img: require("./assets/cases/_case/_img.png"),
		},
		theme: {
			object: <ObjectCreativityLab />,
			color: ["#DCF7FF", "#00455D", "#00455D", "#8EE2FF"],
			template: 0,
		},
		next: "",
	},

	"TSE": {
		title: <>TSE, Marketing Lead And Design System</>,
		bio: [
			<><A href="https://tse.ucsd.edu/">Triton Software Engineering</A>,<br/>a highly selective student club creating software for 20+ nonprofit clients</>,
			"Design System, \nDigital & Print Graphic Design, \nMarketing Lead",
			<>April 2022 - June 2023</>,
		],
		thumbnail: {
			brief: [
				"Crafted social media posts, flyers, and merchandise, attracting 300+ new followers.",
				"Co-established TSE design system, streamlined design tokens and atomic components.",
			],
			img: require("./assets/cases/TSE/thumbnail_img.png"),
		},
		content: {
			tldr: ["In A Nutshell",
				<>I wore several hats in TSE. As the marketing lead, I designed social media posts, flyers, and merchandise, maintaining a branding that upholds professionalism. I co-established the first design system at TSE, standardizing design tokens and fundamental components for future projects.</>
			],
			link: ["Instagram\nPosts", "https://www.instagram.com/ucsd_tse/?hl=en"],
			body: ["gallery", [
				{
					title: "Posts And Flyers",
					heightId: 0,
					widthId: -1,
					wrap: false,
					autoplay: true,
					zoomable: false,
					imgs: [
						[require("./assets/cases/TSE/instagram_FA22_recruitment_application_open.png"), "fall 2022 recruitment instagram graphic when application opens"],
						[require("./assets/cases/TSE/collection_FA22_recruitment.png"), "fall 2022 recruitment materials"],
						[require("./assets/cases/TSE/instagram_FA22_recruitment_application_closing.png"), "fall 2022 recruitment instagram graphic when application is closing"],
						[require("./assets/cases/TSE/flyer_FA23_recruitment.png"), "fall 2023 recruitment flyer"],
						[require("./assets/cases/TSE/flyer_intern_panel.png"), "intern panel flyer"],
						[require("./assets/cases/TSE/instagram_social_events.png"), "social events showcase instagram post"],
						[require("./assets/cases/TSE/instagram_project_showcase.png"), "project showcase instagram post"],
						[require("./assets/cases/TSE/instagram_member_highlight.png"), "member highlight instagram post"],
					]
				},
				{
					title: "Design System",
					heightId: -1,
					widthId: 0,
					wrap: false,
					autoplay: true,
					zoomable: true,
					imgs: [
						[require("./assets/cases/TSE/design_system_card.png"), ""],
						[require("./assets/cases/TSE/design_system_color.png"), ""],
						[require("./assets/cases/TSE/design_system_input.png"), ""],
						[require("./assets/cases/TSE/design_system_modal1.png"), ""],
						[require("./assets/cases/TSE/design_system_modal2.png"), ""],
					]
				},
				{
					title: "Merchandise",
					heightId: 0,
					widthId: -1,
					wrap: true,
					autoplay: false,
					zoomable: false,
					imgs: [
						[require("./assets/cases/TSE/merch_shirt.png"), ""],
						[require("./assets/cases/TSE/merch_sticker_variants.png"), ""],
					]
				},
				{
					title: "Website",
					heightId: -1,
					widthId: 0,
					wrap: true,
					autoplay: false,
					zoomable: true, 
					imgs: [
						[require("./assets/cases/TSE/website_our_approach.png"), ""],
					]
				},
			]],
			evidence: [],
			credits: [],
			img: require("./assets/cases/TSE/thumbnail_img.png"),
		},
		theme: {
			object: <ObjectTSE />,
			color: ["#FCF6E5", "#0C2B35", "#0C2B35", "#DEBB01"],
			template: 0,
		},
		next: "",
	},

	"CharmLife": {
		title: <>Charm Life, Rebrand And Website Revamp</>,
		bio: [
			<>Charm Life,<br/>a cosmetic startup</>,
			"UX/UI Design",
			<>6 Weeks Spring 2023</>,
		],
		thumbnail: {
			brief: [
				"Led the website redesign, preparing for app launch.",
				"Conducted user researches to inform design decisions throughout the process.",
			],
			img: require("./assets/cases/CharmLife/thumbnail_img.png"),
		},
		content: {
			tldr: ["TL;DR",
				<>I took charge of revamping the company's website, setting the stage for the launch of their app. Conducting thorough user research, I crafted user personas that guided our design choices throughout the redesign process.</>
			],
			body: ["challenge-solution", []],
			evidence: [],
			credits: [],
			img: require("./assets/cases/_case/_img.png"),
		},
		theme: {
			object: <ObjectCharmLife />,
			color: ["#FFEAE9", "#532C00", "#323337", "#FFB6B5"],
			template: 0,
		},
		next: "",
	},

	"LAK": {
		title: <>LAAKTA, Android App For Goods Transportation</>,
		bio: [
			<>FirstMile Bhutan,<br/>nonprofit improving good transportation in Bhutan</>,
			"UX/UI Design",
			<>November 2021 - June 2023</>,
		],
		thumbnail: {
			brief: [
				"Designed and delivered an Android app to facilitate connections between farmers and truckers in Bhutan, increasing farmers' access to markets and lowering transport costs.",
			],
			img: require("./assets/cases/LAK/thumbnail_img.png"),
		},
		content: {
			tldr: ["TL;DR",
				<>My team partnered with Firstmile Bhutan to address the challenges of good transportation faced by Bhutanese farmers. We developed an Android app to connect farmers with truckers, ensuring efficient and reliable good transportation. The user journey involves farmers posting job requests, truckers signing up for suitable jobs, and farmers tracking the progress and rating the truckers. Our app enables crowd-sourcing for good transportation, maximizing value for truckers and fostering a connected agricultural community.</>
			],
			body: ["challenge-solution", []],
			evidence: [],
			credits: [],
			img: require("./assets/cases/_case/_img.png"),
		},
		theme: {
			object: <ObjectLAK />,
			color: ["#FFEAE9", "#900C08", "#900C08", "#FFB6B4"],
			template: 0,
		},
		next: "",
	},

	"MAW": {
		title: <>Make-A-Wish, Volunteer Hub Webtool</>,
		bio: [
			<><A href="https://wish.org/sandiego">Make-A-Wish San Diego</A>,<br/>nonprofit granting wishes to children with critical illnesses</>,
			"UX/UI Design",
			<>November 2021 - June 2022</>,
		],
		thumbnail: {
			brief: [
				"Designed a volunteer hub to coordinate Make-A-Wish's diverse volunteer base, optimizing the wish-granting process to children with critical illnesses.",
			],
			img: require("./assets/cases/MAW/thumbnail_img.png"),
		},
		content: {
			tldr: ["TL;DR",
				<>Make-A-Wish needed an efficient solution to coordinate their large and diverse volunteer base. So my team developed a volunteer hub webtool to fulfill their needs and simplify the wish-granting process for children with critical illnesses. Admin members can use the webtool to post events, manage volunteers, and organize documents. Volunteers can easily sign up for events, and access documents and resources.</>
			],
			body: ["challenge-solution", []],
			evidence: [],
			credits: [],
			img: require("./assets/cases/_case/_img.png"),
		},
		theme: {
			object: <ObjectMAW />,
			color: ["#E6F2FF", "#003E83", "#003E83", "#ACD3FF"],
			template: 0,
		},
		next: "",
	},

	"MercuryAlert": {
		title: <>Mercury Alert, Website Revamp And Marketing</>,
		bio: [
			<>Mercury Alert,<br/>a senior healthcare startup</>,
			"UX/UI Design, \nDigital & Print Graphic Design, \nMarketing",
			<>15 Weeks Spring 2022</>,
		],
		thumbnail: {
			brief: [
				"Rebranded thoroughly, with designed system and templates still in use.",
				"Redesigned website, enhanced credibility, attracted a seed funding.",
				"Produced social media posts 3x/week, increased likes by 50%.",
			],
			img: require("./assets/cases/MercuryAlert/thumbnail_img.png"),
		},
		content: {
			tldr: ["TL;DR",
				<>As the sole designer on the team, I was in charge of everything design-relevant, and attracted a seed funding for Mercury Alert. Contributions included:<ul><li>Product website rebrand and redesign, enhancing usability and credibility.</li><li>Graphic design for Instagram and Facebook posts, 3x/week, increased likes by 50%.</li><li>Sponsorship decks, business card, trifold, questionnaires. Templates I designed are still in use to date.</li></ul></>
			],
			link: ["Visit\nWebsite", "https://www.mercuryalert.ai/"],
			body: ["challenge-solution", []],
			evidence: [],
			credits: [],
			img: require("./assets/cases/_case/_img.png"),
		},
		theme: {
			object: <ObjectMercuryAlert />,
			color: ["#E0F5FF", "#054260", "#004465", "#A3D7FF"],
			template: 0,
		},
		next: "",
	},

	"3DCG": {	//NAH
		title: null,
		bio: [
			null,
			null,
			null,
		],
		thumbnail: {
			brief: [],
			img: require("./assets/cases/_case/_img.png"),
		},
		content: {
			tldr: null,
			body: ["challenge-solution", []],
			evidence: [],
			credits: [],
			img: require("./assets/cases/_case/_img.png"),
		},
		theme: {
			object: <Object3DCG />,
			//color: ["#???", "#???", "#???", "#???"],
			template: 0,
		},
		next: "",
	},

	"2022Art": {	//NAH
		title: null,
		bio: [
			null,
			null,
			null,
		],
		thumbnail: {
			brief: [],
			img: require("./assets/cases/_case/_img.png"),
		},
		content: {
			tldr: null,
			body: ["challenge-solution", []],
			evidence: [],
			credits: [],
			img: require("./assets/cases/_case/_img.png"),
		},
		theme: {
			object: <Object2022Art />,
			//color: ["#???", "#???", "#???", "#???"],
			template: 0,
		},
		next: "",
	},

	"Bitsrealm": {
		title: <>Bitsrealm, 4 Websites For Virtual Concert</>,
		bio: [
			<><A href="https://bitsrealm.com/home">Bitsrealm Technology</A>,<br/>a VR game company</>,
			"UX/UI Design",
			<>6 Weeks Summer 2021</>,
		],
		thumbnail: {
			brief: [
				"Branded and prototyped for 4 digital products in 6 weeks, enabled a successful debut of the company's first virtual concert with 300k audience.",
			],
			img: require("./assets/cases/Bitsrealm/thumbnail_img.png"),
		},
		content: {
			tldr: ["TL;DR",
				<>I joined Bitsrealm when it was still a startup. As the sole designer on the team, I worked closely with game writers and developers to craft branding and prototypes for 4 digital products, and enabled a successful debut of the company's virtual concerts. The branding I started is still in use today.</>
			],
			link: ["Visit\nWebsite", "https://bitsrealm.com/home"],
			body: ["challenge-solution", []],
			evidence: [],
			credits: [],
			img: require("./assets/cases/_case/_img.png"),
		},
		theme: {
			object: <ObjectBitsrealm />,
			color: ["#D9FFDD", "#333333", "#333333", "#95F19E"],
			template: 0,
		},
		next: "",
	},

	"CruzRoja": {
		title: <>Cruz Roja, Ambulance Dispatch System</>,
		bio: [
			<>Cruz Roja (Red Cross) Tijuana</>,
			"UX/UI Design, \nLead Designer",
			<>Spring and Fall 2021</>,
		],
		thumbnail: {
			brief: [
				"Redesigned the dispatch system for Red Cross Tijuana.",
				"Prioritized usability and information hierarchy, optimizing efficiency of limited EMS resources, bringing reliable health care to millions of citizens.",
			],
			img: require("./assets/cases/CruzRoja/thumbnail_img.png"),
		},
		content: {
			tldr: ["TL;DR",
				<>Red Cross Tijuana was cultivating an ambulance dispatching system to coordinate the limited emergency service resources. I collaborated with a cross-disciplinary team and redesigned the UI of the dispatching system, prioritizing usability and information hierarchy to optimize efficiency, bringing reliable health care to millions of citizens in Tijuana, Mexico. This project was one of the most complex and rewarding design challenges I have undertaken.</>
			],
			link: ["Read Article\nAbout Us", "https://today.ucsd.edu/story/lifesaving-app"],
			body: ["challenge-solution", []],
			evidence: [],
			credits: [],
			img: require("./assets/cases/_case/_img.png"),
		},
		theme: {
			object: <ObjectCruzRoja />,
			color: ["#EBF1F7", "#003B92", "#323334", "#B1D0FF"],
			template: 0,
		},
		next: "",
	},

	"ACM": {
		title: <>ACM@UCSD, Website Upgrade And More</>,
		bio: [
			<>ACM@UCSD,<br/>UCSD's largest tech community</>,
			"UX/UI Design, \nGraphic Design, \nIllustration",
			<>February 2021 - March 2022</>,
		],
		thumbnail: {
			brief: [
				"Redesigned the website of ACM to attract potential members, reaching 1000+ student.",
				"Produced graphic design and illustrations for external marketing and a Cookie Clicker game.",
			],
			img: require("./assets/cases/ACM/thumbnail_img.png"),
		},
		content: {
			tldr: ["TL;DR",
				<><ul><li>To help ACM@UCSD attract potential members, my team upgraded its website. We strategically restructured the layout, curated fresh content, and enhanced user interactions for intuitive navigation.</li><li>As a personal side project, I also created graphic design for external marketing, and illustrations for a small game.</li></ul></>
			],
			link: ["Visit\nWebsite", "https://acmucsd.com/"],
			body: ["challenge-solution", [
				[],
				[],
			]],
			evidence: [],
			credits: [],
			img: require("./assets/cases/_case/_img.png"),
		},
		theme: {
			object: <ObjectACM />,
			color: ["#CDFFFF", "#003F7F", "#003F7F", "#7EEDED"],
			template: 0,
		},
		next: "",
	},

	"Atlas": {
		title: <>Atlas, E-commerce Fulfillment Dashboard</>,
		bio: [
			<>Atlas,<br/>an e-commerce startup</>,
			"UI Design",
			<>June 2021</>,
		],
		thumbnail: {
			brief: [
				"Designed and prototyped an e-commerce fulfillment dashboard, featuring data visualization, message inbox, and comprehensive tracking of products, partners, and payments.",
			],
			img: require("./assets/cases/Atlas/thumbnail_img.png"),
		},
		content: {
			tldr: ["TL;DR",
				<>Following to Atlas's requirements, I designed and prototyped a full dashboard for e-commerce fullfillers. It featured data visualization panels, a message inbox, and comprehensive tracking of products, partners, and payments. This project sparked my love for fast-paced work environment and laid the foundation for my future journey in multiple startups.</>
			],
			body: ["challenge-solution", []],
			evidence: [],
			credits: [],
			img: require("./assets/cases/Atlas/cover_img.png"),
		},
		theme: {
			object: <ObjectAtlas />,
			color: ["#EEEEFC", "#28305F", "#333238", "#C1C9F8"],
			template: 0,
		},
		next: "",
	},

	"RehaBuddy": {
		title: <>RehaBuddy, Electronic Pet For Stroke Recovery</>,
		bio: [
			null,
			"Conceptualization, \nIllustration",
			<>Spring 2021</>,
		],
		thumbnail: {
			brief: [
				"Analyzed findings from patient research, therapist input, and literature review.",
				"Conceptualized a haptics tamagotchi therapy putty, to motivate post-sroke recovery exercise.",
			],
			img: require("./assets/cases/RehaBuddy/thumbnail_img.png"),
		},
		content: {
			tldr: ["TL;DR",
				<>Based on interview data and literature reviews, I conceptualized an electronic pet therapy putty device, which would provide stroke patients with ongoing motivation during their upper-limb rehabilitation exercises at home, fostering engagement and progress.</>
			],
			link: ["Watch Video\nPresentation", "https://youtu.be/guaNhrMuORA?t=1214"],
			body: ["freeform", [
				["Problem", <>
					<P>Stroke occurs when blood supply to a part of the brain is interrupted, resulting in weakness and numbness in limbs, particularly among seniors. For upper-limb recovery, patients engage in exercises for months or even years. However, pain, boredom, and post-stroke depression can all impact adherence, despite the knowledge that recovery exercises are necessary.</P>
					<P>While these exercises cannot be avoided, maybe we can enhance motivation with a device that detects recovery progress and provides encouraging feedback? This led me to conceptualize RehaBuddy, a haptics and musical therapy putty.</P>
					<Img
						src={require("./assets/cases/RehaBuddy/storyboard2.png")}
						sizeId={1}
						alt="storyboard"
						caption="A bit of additional motivation might help stroke patients in persevering through their recovery journey."
						zoomable={false}
					/>
				</>],
				["Research", <>
					<P>
						I researched the stroke recovery equipment market, and found that existing stroke recovery tools tend to suffer from one or more of the following limitations:
						<ul><li>Passive tools or stimulators become monotonous quickly.</li>
						<li>Responsive technologies are often costly and rely on laptops, which are unportable and pose difficulties for many elderly individuals to adapt to.</li>
						<li>Recovery curriculums, though fun and affordable, require therapist supervision, which reduces accessibility especially for patients that have moved out of hospital and started at-home recovery.</li></ul>
					</P>
					<Img
						src={require("./assets/cases/RehaBuddy/storyboard1.png")}
						sizeId={1}
						alt="a storyboard early on"
						caption="One of the earlier ideas was to integrate music instrument with some rehabilitation gadget."
						zoomable={false}
					/>
					<P>
						Therefore, my objective was to find a solution that:
						<ul><li>Offers greater affordability.</li>
						<li>Is simpler and does not rely on computers.</li>
						<li>Minimizes dependence on others, allowing for at-home daily practice.</li></ul>
					</P>
					<P>
						Besides, I took my mentor's advice to read the works of <A href="https://neuroscience.stanford.edu/people/caitlyn-seim">Professor Caitlyn Seim</A> from Stanford University, which greatly inspired me.
					</P>
					<Img
						src={require("./assets/cases/RehaBuddy/sketch1.png")}
						sizeId={3}
						alt="brainstorming sketches"
						caption="a piece of sketch from the brainstorming stage"
						zoomable={false}
					/>
				</>],
				["Design", <>
					<P>My proposed solution is RehaBuddy, a handheld device for performing recovery exercises. Equipped with built-in sensors, RehaBuddy detects user movement. When you squeeze its surface or practice shoulder and elbow movements, the device's touch sensors and gyroscope recognize your exercises. To celebrate your progress, RehaBuddy emits enjoyable sounds and provides vibration feedback.</P>
					<P>As a motivation strategy, RehaBuddy operates similarly to a tamagotchi pet. Regular and proper practice with RehaBuddy leads to its growth and enhanced feedback. However, if you neglect practice for too long, the pet might "become sad", resulting in reduced feedback. In other words, the feedback level declines, and you will need to start over if you pause for an extended period of time.</P>
					<Img
						src={require("./assets/cases/RehaBuddy/sketch2.png")}
						sizeId={0}
						alt="concept sketches"
						caption="a draft of the RehaBuddy concept"
						zoomable={false}
					/>
					<ExpandablePs prompt="Read More Design Details">
						<P>The feedback provided by RehaBuddy is diverse. Based on research indicating that unpredictability contributes to motivation, RehaBuddy incorporates unpredictable changes into its feedback mechanism.</P>
						<P>Unlike a traditional tamagotchi, you cannot see a visual representation of your digital pet. However, as mentioned earlier, you can hear and feel it during your recovery exercises.</P>
						<P>Why do I focus on haptics and musical feedback instead of visual cues? During physical exercise, requiring users to focus their eyes for visual encouragement can be uncomfortable. However, sound in the air and haptic stimulation on the skin, provided by the device, are not limited in this way. Moreover, musical and haptic stimulation have proven to drive neural reconnection and skill acquisition, as evidenced by their application in many existing stroke recovery products. Among various haptic feedback options, I chose strong vibration, as it suits stroke patients who may experience numbness in their affected hand. They are less sensitive to normal levels of haptic feedback but more responsive to strong vibrations, which can effectively engage them.</P>
						<P>RehaBuddy's size and shape mimic a therapy putty, a common tool used for finger recovery among stroke patients. Compared to glove-shaped devices that require assistance to put on and take off, the therapy putty shape is easy to grasp and start exercising with. Its conventionality allows even those who have not used a therapy putty before to adapt quickly—an essential aspect for senior users.</P>
					</ExpandablePs>
				</>],
				["About \"Motivation\"", <>
					<P>In order to further evaluate the feasibility of RehaBuddy, I conducted interviews with therapists and stroke patients. One crucial point emphasized by the therapists was the potential risks associated with the concept of "motivation" in the field of stroke recovery. There are instances where stroke patients are unable to achieve certain physical goals, despite their strong desire to do so. Therefore, it is important to avoid making hasty judgments about the patient's motivation or labeling them as unmotivated, as such actions can have detrimental effects. This valuable insight provided me with a new perspective, based on which I refined the target user group of RehaBuddy to focus on individuals who have already been discharged from the hospital and have started home-based recovery, yet struggle to persevere. My product aims to serve as an external source of motivation when giving up seems tempting, and persistence becomes challenging.</P>
					<Img
						src={require("./assets/cases/RehaBuddy/sketch3.png")}
						sizeId={3}
						alt="potential implementation sketches"
						caption="some of my naive ideas of potential implementation"
						zoomable={false}
					/>
				</>],
				["Reflection", <>
					<P>RehaBuddy was only a conceptual design based on theoretical knowledge from interviews and literature reviews. A number of challenges remain to be addressed before it can be realized, including:
					<ul><li>Simplifying the sensors and motors to fit within the size of therapy putty.</li>
					<li>Finding the right magnitude of feedback decline if the patient pauses exercising for a few days and RehaBuddy "becomes sad". An appropriate magnitude should be balanced, ensuring that users are motivated to exercise consistently to prevent RehaBuddy from "dying", while still willing to restart if necessary.</li>
					<li>Differentiating between exercise movements and simply carrying the device, or even more challenging, distinguishing exercises performed with the stroke-affected arm from those performed with the unaffected arm.</li></ul></P>
				</>],
			]],
			evidence: [],
			credits: [],
			img: require("./assets/cases/RehaBuddy/cover_img.png"),
		},
		theme: {
			object: <ObjectRehaBuddy />,
			color: ["#FFEED0", "#00484B", "#303337", "#78EFF3"],
			template: 0,
		},
		next: "",
	},

	"PadPal": {	// Abandoned. Way too much arrogant in this project, very bad.
		title: <>PadPal, Menstrual Dignity For Girls In Pune, India</>,
		bio: [
			<><A href="https://www.projectkiliforkids.org/home2">Project Kilimanjaro</A>,<br/>nonprofit promoting health and wellness of women globally</>,
			"Conceptualization, \nGraphic design, \nIllustration",
			<>January - March 2021</>,
		],
		thumbnail: {
			brief: [
				"Led the design of a menstrual care bag, promoting health and wellness of women in Pune, India.",
			],
			img: require("./assets/cases/PadPal/thumbnail_img.png"),
		},
		content: {
			tldr: ["TL;DR",
				<>Period being a taboo topic prevents girls and women in rural Pune, India from properly managing their menstrual health. But period is a normal and beautiful part of life, and nothing to be ashamed of. In collaboration with Project Kilimanjaro, I led the design of a menstrual care bag with an instruction manual. The bag can be easily hand-sewed and used to carry menstrual products safely and sanitarily.</>
			],
			body: ["challenge-solution", []],
			evidence: [],
			credits: [],
			img: require("./assets/cases/_case/_img.png"),
		},
		theme: {
			object: <ObjectPadPal />,
			color: ["#FFECDB", "#8C0F00", "#572A00", "#FFB8AF"],
			template: 0,
		},
		next: "",
	},

	"GroupReads": {	//NAH
		title: <>GroupReads, App Design And Development To Encourage Reading</>,
		bio: [
			null,
			"UX/UI Design, \nFrontend Development",
			<>Winter 2021</>,
		],
		thumbnail: {
			brief: [],
			img: require("./assets/cases/GroupReads/thumbnail_img.png"),
		},
		content: {
			tldr: ["TL;DR",
				<>Seeing students constantly overwhelmed by class readings, my team designed and implemented an app to help enhance their engagement with the reading together with their peers and bring back their motivation. We practiced the Double Diamond design process, as well as frontend languages including HTML, CSS, and javascript.</>
			],
			body: ["challenge-solution", []],
			evidence: [],
			credits: [],
			img: require("./assets/cases/_case/_img.png"),
		},
		theme: {
			object: <ObjectGroupReads />,
			color: ["#F8ECF0", "#09444D", "#09444D", "#EEBFB5"],
			template: 0,
		},
		next: "",
	},

	"2021Art": {	//NAH
		title: null,
		bio: [
			null,
			null,
			null,
		],
		thumbnail: {
			brief: [],
			img: require("./assets/cases/_case/_img.png"),
		},
		content: {
			tldr: null,
			body: ["challenge-solution", []],
			evidence: [],
			credits: [],
			img: require("./assets/cases/_case/_img.png"),
		},
		theme: {
			object: <Object2021Art />,
			//color: ["#???", "#???", "#???", "#???"],
			template: 0,
		},
		next: "",
	},

	"ThriveSD": {
		title: <>ThriveSD, Solution During Pandemic</>,
		bio: [
			null,
			"Conceptualization, \nVolunteering",
			<>Spring 2020</>,
		],
		thumbnail: {
			brief: [
				"Proposed a buy-1-give-1 model to help small restaurants and homeless individuals survive the outbreak of Covid-19. Collaborated with a multi-disciplinary, multi-generational team to develop the solution.",
			],
			img: require("./assets/cases/ThriveSD/thumbnail_img.png"),
		},
		contentNAH: {
			tldr: ["TL;DR",
				<>In response to the Covid-19 outbreak, my team proposed a buy-1-give-1 model to recover the supply and consumption chain, and help small restaurants and homeless individuals survive hard time. This was one of my first real-world projects. I collaborated with a group of problem solvers from various walks of life, practiced design thinking, researched stakeholders, and developed this proposal.</>
			],
			body: ["challenge-solution", []],
			evidence: [],
			credits: [],
			img: require("./assets/cases/_case/_img.png"),
		},
		theme: {
			object: <ObjectThriveSD />,
			color: ["#FFEAEA", "#183E3E", "#AA0000", "#B1D7D7"],
			template: 0,
		},
		next: "",
	},

	"Neureality": {
		title: <>Neureality, Illustrations For Popular Science</>,
		bio: [
			<><A href="https://neu-reality.com/">Neureality</A>,<br/>a digital popular science magazine</>,
			"Illustration",
			<>February 2020 - February 2021</>,
		],
		thumbnail: {
			brief: [
				"Illustrated for popular science articles on neuroscience and cognitive science, engaging 500k online readers.",
			],
			img: require("./assets/cases/Neureality/thumbnail_img.png"),
		},
		content: {
			tldr: ["TL;DR",
			<>I crafted stylized illustrations and comics for articles on neuroscience and cognitive science, promoting popularization of the latest discoveries in these fields among the general public.</>,// By visually engaging audiences, my work bridged the gap between complex scientific concepts and wider understanding.</>
		],
			link: ["Read The\nComic", "https://mp.weixin.qq.com/s/L-uOl1hxBeGsVr0k_ifKxw"],
			body: ["gallery", [
				{
					title: "Illustrations",
					heightId: 0,
					widthId: -1,
					wrap: true,
					autoplay: false,
					zoomable: true,
					imgs: [
						[require("./assets/cases/Neureality/rat_1_crystal_skull.jpeg"), "crystal skull rat"],
						[require("./assets/cases/Neureality/rat_2_tetrode_recording.jpeg"), "tetrode recording rat"],
						[require("./assets/cases/Neureality/the_blind_man_and_the_elephants.jpeg"), "the blind man and the elephants"],
						[require("./assets/cases/Neureality/eeg_1.png"), "EEG illustration 1"],
						[require("./assets/cases/Neureality/eeg_2.png"), "EEG illustration 2"],
						[require("./assets/cases/Neureality/sacculina_carcini.png"), "sacculina carcini in crab"],
					]
				},
				{
					title: "Comic",
					spotlight: ["mobile", require("./assets/cases/Neureality/loneliness_comic_final_line_drawing.jpeg"), "comic post final line drawing"],
					heightId: -1,
					widthId: 3,
					wrap: false,
					autoplay: true,
					zoomable: false,
					imgs: [
						[require("./assets/cases/Neureality/loneliness_comic_character_design_1_1.png"), "comic character design sketches"],
						[require("./assets/cases/Neureality/loneliness_comic_character_design_1_2.png"), "comic character design sketches"],
						[require("./assets/cases/Neureality/loneliness_comic_character_design_2.png"), "comic illustration style variants"],
						[require("./assets/cases/Neureality/loneliness_comic_character_design_3_1.png"), "comic character design variants 1"],
						[require("./assets/cases/Neureality/loneliness_comic_character_design_3_2.png"), "comic character design variants 2"],
						[require("./assets/cases/Neureality/loneliness_comic_character_design_3_3.png"), "comic character design variants 3"],
						[require("./assets/cases/Neureality/loneliness_comic_character_design_4.png"), "Tachie of the finalized character design"],
						[require("./assets/cases/Neureality/loneliness_comic_character_design_5.jpeg"), "illustration to communicate the intended vibe of the character"],
					]
				},
			]],
			evidence: [],
			credits: [],
			//img: require("./assets/cases/Neureality/thumbnail_img.png"),
		},
		theme: {
			object: <ObjectNeureality />,
			color: ["#CEFFFD", "#333331", "#333331", "#87EAE5"],
			template: 0,
		},
		next: "",
	},

	"CellInTheSpace": {	//NAH
		title: null,
		bio: [
			null,
			null,
			null,
		],
		thumbnail: {
			brief: [],
			img: require("./assets/cases/_case/_img.png"),
		},
		content: {
			tldr: null,
			body: ["challenge-solution", []],
			evidence: [],
			credits: [],
			img: require("./assets/cases/_case/_img.png"),
		},
		theme: {
			object: <ObjectCellInTheSpace />,
			//color: ["#???", "#???", "#???", "#???"],
			template: 0,
		},
		next: "",
	},

	"2020Art": {	//NAH
		title: null,
		bio: [
			null,
			null,
			null,
		],
		thumbnail: {
			brief: [],
			img: require("./assets/cases/_case/_img.png"),
		},
		content: {
			tldr: null,
			body: ["challenge-solution", []],
			evidence: [],
			credits: [],
			img: require("./assets/cases/_case/_img.png"),
		},
		theme: {
			object: <Object2020Art />,
			//color: ["#???", "#???", "#???", "#???"],
			template: 0,
		},
		next: "",
	},

	"GaokaoFighting": {	//NAH
		title: null,
		bio: [
			null,
			null,
			null,
		],
		thumbnail: {
			brief: [],
			img: require("./assets/cases/_case/_img.png"),
		},
		content: {
			tldr: null,
			body: ["challenge-solution", []],
			evidence: [],
			credits: [],
			img: require("./assets/cases/_case/_img.png"),
		},
		theme: {
			object: <ObjectGaokaoFighting />,
			//color: ["#???", "#???", "#???", "#???"],
			template: 0,
		},
		next: "",
	},

	"2DCG": {	//NAH
		title: null,
		bio: [
			null,
			null,
			null,
		],
		thumbnail: {
			brief: [],
			img: require("./assets/cases/_case/_img.png"),
		},
		content: {
			tldr: null,
			body: ["challenge-solution", []],
			evidence: [],
			credits: [],
			img: require("./assets/cases/_case/_img.png"),
		},
		theme: {
			object: <Object2DCG />,
			//color: ["#???", "#???", "#???", "#???"],
			template: 0,
		},
		next: "",
	},

	"KaonashiRobot": {	//NAH
		title: null,
		bio: [
			null,
			null,
			null,
		],
		thumbnail: {
			brief: [],
			img: require("./assets/cases/_case/_img.png"),
		},
		content: {
			tldr: null,
			body: ["challenge-solution", []],
			evidence: [],
			credits: [],
			img: require("./assets/cases/_case/_img.png"),
		},
		theme: {
			object: <ObjectKaonashiRobot />,
			//color: ["#???", "#???", "#???", "#???"],
			template: 0,
		},
		next: "",
	},

	"CU": {
		title: <>Chinese Union, Mascot And Posters</>,
		bio: [
			<><A href="https://www.chineseunion.org/">Chinese Union</A></>,
			"Mascot Design, \nIllustration",
			<>December 2020 - March 2021</>,
		],
		thumbnail: {
			brief: [
				"Led a team of 4, designed the mascot for Chinese Union.",
				"Iterated design according to bi-weekly discussion with executive board.",
			],
			img: require("./assets/cases/CU/thumbnail_img.png"),
		},
		content: {
			tldr: ["TL;DR",
				<><ul><li>I led a team of 3 and designed the mascot for Chinese Union, communicating closely with the executive board for feedback and refining the design accordingly.</li><li>I also created poster illustrations for events and festivals</li></ul></>
			],
			body: ["challenge-solution", []],
			evidence: [],
			credits: [],
			img: require("./assets/cases/_case/_img.png"),
		},
		theme: {
			object: <ObjectCU />,
			color: ["#FFEAE9", "#791611", "#791611", "#FFB7B3"],
			template: 0,
		},
		next: "",
	},

	// "Portfolio": {},

}
