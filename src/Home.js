import React, { useState , useEffect } from 'react';

/* Foreign components */
import { Modebtn, Bio } from "./components.js";
import Nav from "./Nav.js"

/* Assets */
import me1 from "./assets/me-1.jpg";
import me2 from "./assets/me-2.jpg";

import resume from "./assets/resume.png";
import resume_big from "./assets/resume-big.png";

import object_ACM_light from "./assets/object_ACM_light@2x.png";
import object_ACM_dark from "./assets/object_ACM_dark@2x.png";
import object_ACM_figure_light from "./assets/object_ACM_light_figure@2x.png";
import object_ACM_figure_dark from "./assets/object_ACM_dark_figure@2x.png";
import object_ACM_active_light from "./assets/object_ACM_light_active@2x.png";
import object_ACM_active_dark from "./assets/object_ACM_dark_active@2x.png";
import object_ACM_blink_light from "./assets/object_ACM_light_blink@2x.png";
import object_ACM_blink_dark from "./assets/object_ACM_dark_blink@2x.png";

import object_Bitsrealm_light from "./assets/object_Bitsrealm_light@2x.png";
import object_Bitsrealm_dark from "./assets/object_Bitsrealm_dark@2x.png";
import object_Bitsrealm_figure_light from "./assets/object_Bitsrealm_light_figure@2x.png";
import object_Bitsrealm_figure_dark from "./assets/object_Bitsrealm_dark_figure@2x.png";
import object_Bitsrealm_active_light from "./assets/object_Bitsrealm_light_active@2x.png";
import object_Bitsrealm_active_dark from "./assets/object_Bitsrealm_dark_active@2x.png";
import object_Bitsrealm_blink_light from "./assets/object_Bitsrealm_light_blink@2x.png";
import object_Bitsrealm_blink_dark from "./assets/object_Bitsrealm_dark_blink@2x.png";

import object_RehaBuddy_light from "./assets/object_RehaBuddy_light@2x.png";
import object_RehaBuddy_dark from "./assets/object_RehaBuddy_dark@2x.png";
import object_RehaBuddy_figure_light from "./assets/object_RehaBuddy_light_figure@2x.png";
import object_RehaBuddy_figure_dark from "./assets/object_RehaBuddy_dark_figure@2x.png";
import object_RehaBuddy_active_light from "./assets/object_RehaBuddy_light_active@2x.png";
import object_RehaBuddy_active_dark from "./assets/object_RehaBuddy_dark_active@2x.png";
import object_RehaBuddy_blink_light from "./assets/object_RehaBuddy_light_blink@2x.png";
import object_RehaBuddy_blink_dark from "./assets/object_RehaBuddy_dark_blink@2x.png";

import object_CruzRoja_light from "./assets/object_CruzRoja_light@2x.png";
import object_CruzRoja_dark from "./assets/object_CruzRoja_dark@2x.png";
import object_CruzRoja_figure_light from "./assets/object_CruzRoja_light_figure@2x.png";
import object_CruzRoja_figure_dark from "./assets/object_CruzRoja_dark_figure@2x.png";
import object_CruzRoja_active_light from "./assets/object_CruzRoja_light_active@2x.png";
import object_CruzRoja_active_dark from "./assets/object_CruzRoja_dark_active@2x.png";
import object_CruzRoja_blink_light from "./assets/object_CruzRoja_light_blink@2x.png";
import object_CruzRoja_blink_dark from "./assets/object_CruzRoja_dark_blink@2x.png";

/* Libraries */
import { GlassMagnifier } from "react-image-magnifiers";
import Spline from '@splinetool/react-spline'; // under experiment

/* Global variables */
const objects = "https://prod.spline.design/qOffy9zkxi4id6yS/scene.splinecode"; // under experiment



/**
 * Home
 *
 * props:
 *	- mode (str)
 *	- toggleMode (func)
 */
export default function Home (props) {

	/* Page */
	const [page, setPage] = useState("home");	// resume, home*, journey

	/* Primary nav tabs and their animation state */
	const PNtabs = ["resume", "home", "journey"];
	const [PNisChanging, setPNisChanging] = useState(false);
	const [PNanimation, setPNanimation] = useState("");
	const handle_PNT_click = (tab) => {
		setPage(tab);
		if (page!==tab) {
			setPNisChanging(true);
			setPNanimation("home_tabs_primary_selected_" + page + "_to_" + tab);
			setTimeout(() => {
				setPNanimation("");
				setPNisChanging(false);
			}, 270);
		} else if (page==="resume") {
			window.open("https://drive.google.com/file/d/15mV_lu6YbVqO-gnV1KTIy-s8za3UBpwe/view?usp=sharing", '_blank', 'noopener,noreferrer');
		}
	}

	/* Case object */
	const [hoveringObject, setHoveringObject] = useState(false);
	const [hoveredCase, setHoveredCase] = useState(""); // ACM, Bitsrealm, RehaBuddy, CurzRoja
	const [timer, setTimer] = useState(true); // true(tic)*, false(tac)
	const [blinkingObject, setBlinkingObject] = useState("");

	useEffect(() => {
		if (timer==true) {
			setTimer(false);
			setTimeout (() => {
				const random = Math.random() * 5; // min=0 is inclusive, max=5 is exclusive
				if (random < 1) { setBlinkingObject(""); }
				else if (random < 2) { setBlinkingObject("ACM"); }
				else if (random < 3) { setBlinkingObject("Bitsrealm"); }
				else if (random < 4) { setBlinkingObject("RehaBuddy"); }
				else /*if (random < 5)*/ { setBlinkingObject("CruzRoja"); }
				setTimer(true);
			}, 2000); // tic-tac every 2s
		}
	}, [timer]);
	useEffect(() => { console.log (timer==true? "tic" : "tac"); }, [timer]); //DEBUG

	useEffect(() => {
		if (blinkingObject!=="") {
			console.log (blinkingObject + " blinks"); //DEBUG
			setTimeout (() => { setBlinkingObject(""); }, 135); // blink for var(--delay-s)
		}
	}, [blinkingObject]);

	/* Contact btns and their corresponding links */
	const Cbtns = [
		["email", "mailto:l1zhuang@ucsd.edu"/*link="mailto:zhuanglingye@163.com"*/],
		["instagram", "https://www.instagram.com/juliet_baozi/"],
		["linkedin", "http://linkedin.com/in/lingye-zhuang-a1b4731a1"]
	];

	/* Journey timeline */
	const [journeyYear, setJourneyYear] = useState("2019"); // 2019*, 2020, 2021, 2022

	/* Journey timeline years */
	const JourneyYears = ["2019", "2020", "2021", "2022"];

	/* Render */
	return (
		<div className={"page home_page_"+props.mode}>

			<Modebtn mode={props.mode} toggleMode={props.toggleMode} />

			<div className={
				"home_tabs_div_outer home_tabs_primary zlift " +
				(page==="journey" ? "home_tabs_primary_journey" : "")
			}><div className="home_tabs_div_inner">
				<div className={
					"home_tabs_primary_selected " +
					"home_tabs_primary_selected_" + page + " " +
					"home_tabs_primary_selected_" + props.mode + " " +
					PNanimation
				}></div>
				<div className={
					"home_tabs " +
					(page==="journey" ? "home_tabs_journey" : "")
				}>
					{PNtabs.map(tab =>
						<PNT
							tab={tab}
							active={page===tab}
							onclick={() => { handle_PNT_click(tab); }}
							mode={props.mode}
							PNisChanging={PNisChanging}
						/>
					)}
					{page==="journey" ?
						<JourneyTimeline mode={props.mode}/>
					: null }
				</div>
			</div></div>

			<div className="full_page_container flex_container">
				<div className={
					"home_display_div_outer " +
					"home_display_div_outer_" + page
				}>
					<div className={
						"home_display_div_inner " +
						"home_display_div_inner_" + page + " " +
						(hoveringObject==true ?
							("home_display_div_inner_case home_display_div_inner_")+hoveredCase
						: "") + " " +
						"home_display_div_"+props.mode
					}>
						{(() => {
							if (page === "resume") {
								// window.history.replaceState(null, "Resume", "/resume");
								// window.location.href = "/resume";
								return ( <Resume mode={props.mode}/> );
							} else if (page === "home") {
								if (hoveringObject==false) {
									return (
										<AboutMe mode={props.mode}/>
									);									
								} else {
									return (
										<CaseBrief hoveredCase={hoveredCase} mode={props.mode} />
									);
								}
							} else if (page === "journey") {
								return ( <Journey mode={props.mode}/> );
							}
						})()}
				</div></div>

				<div className={"case_objects_div zlift " + (page==="home" ? "case_objects_div_active" : "")}>
					<CaseObjects
						hoveringObject={hoveringObject}
						setHoveringObject={setHoveringObject}
						hoveredCase={hoveredCase}
						setHoveredCase={setHoveredCase}
						mode={props.mode}
						blinkingObject={blinkingObject}
					/>
				</div>
			</div>

			<div className="home_tabs_div_outer home_tabs_contact zlift"><div className="home_tabs_div_inner"><div className="home_tabs">
				{Cbtns.map(Cbtn_pair =>
					<CB
					btn={Cbtn_pair[0]}
					link={Cbtn_pair[1]}
					mode={props.mode}
				/>
				)}
			</div></div></div>

		</div>
	);
}

/**
 * Primary nav tab
 *
 * props:
 *	- tab (str)
 *	- active (bool)
 *	- onclick (func)
 *	- mode (str)
 *	- PNisChanging (bool)
 */
function PNT (props) {
	return (
		<div className="home_tab_div">
			<div
				className = {
					"home_tab cursor_pointer " +
					"home_tab_primary_" + props.tab + (props.active==true ? "_active" : "") + " " +
					"home_tab_primary_" + (props.active==true ? "active" : "default") + "_" + props.mode + " " +
					(props.PNisChanging ? "home_tab_switching" : "")
				}
				onClick={props.onclick}
			/>
		</div>
	);
}

/**
 * Contact button
 *
 * props:
 *	- btn (str)
 *	- link (str)
 *	- mode (str)
 */
function CB (props) {
	return (
		<div className="home_tab_div home_tab_contact_div">
			<a
				className = {
					"home_tab cursor_pointer " +
					"home_tab_contact_" + props.btn + " " +
					"home_tab_contact_" + props.mode
				}
				href={props.link}
				target="_blank"
			/>
		</div>
	);
}



/**
 * Home page (about me)
 *
 * props:
 *	- mode (str)
 */
function AboutMe (props) {

	const biolist = [
		["Major", "Cognitive Science with specialization in Design and Interaction"],
		["Minor", "Computer Science"],
		["Collage", "University of California, San Diego"],
		["Year", "Senior undergraduate (graduating June 2023)"],
	];

	return (
		<>

			<div className="profile_pic_div dis_select">
				<img
					src={me1}
					alt="A photo of me"
					className="profile_pic profile_pic_static zlift"
				/>
				<img
					src={me2}
					alt="A photo of me"
					className="profile_pic profile_pic_active"
				/>
			</div>

			<div class={"selfintro zlift text_"+props.mode}>
				<p class={"text_"+props.mode}>
					Hey! You found my little cabin on the internet!
				</p>
				<span class="selfintro_name">
					{/*<span class="selfintro_name_word">
						<span>L</span>
						<span>i</span>
						<span>n</span>
						<span>g</span>
						<span>y</span>
						<span>e</span>
					</span>*/}
					<span class="selfintro_name_word">
						<span>J</span>
						<span>u</span>
						<span>l</span>
						<span>i</span>
						<span>e</span>
						<span>t</span>
					</span>
					<span class="selfintro_name_word">
						<span>Z</span>
						<span>h</span>
						<span>u</span>
						<span>a</span>
						<span>n</span>
						<span>g</span>
					</span>
				</span>
				<p class={"text_"+props.mode}>
					UX/UI designer / Graphic designer / Amateur illustrator
				</p>
				<p class={"text_"+props.mode}>
					Recently soaking up development skills, walking on the path towards being a full-stack designer. This website is hand-coded with React.js and ♡.
				</p>
				<p class={"text_"+props.mode}>
					I design like a craftsman, since I believe practise makes perfect.
				</p>
				<p class={"text_"+props.mode}>
					I design for social good, and I enjoy real world challenges.
				</p>
				<span>&nbsp;</span> {/* insert vertical space */}
				<p class={"text_hint text_hint_"+props.mode}>
					Ask my case studies about me ↓
				</p>
				{/*<Bio
					list={biolist}
					bullet_type="text"
					mode={props.mode}
				/>*/}
				{/*<div class="only_mobile">
					<p>Hi, I am <span class="name">Lingye Zhuang</span>.<br>I study cognitive science with HCI at UCSD.<br>I design like a craftsman. I enjoy real world challenges and cross-discipline inspirations.</p>
				</div>*/}
			</div>

		</>
	);
}



/**
 * CaseObjects
 * 
 * props:
 *	- [hoveringObject, setHoveringObject]
 *	- [hoveredCase, setHoveredCase]
 *	- mode (str)
 *	- blinkingObject (str)
 */
function CaseObjects (props) {

	const caseobjects = [ // animation helper: [name, light default, dark default, light figure, dark figure, light active, dark active, light blink, dark blink]
		["ACM", object_ACM_light, object_ACM_dark, object_ACM_figure_light, object_ACM_figure_dark, object_ACM_active_light, object_ACM_active_dark, object_ACM_blink_light, object_ACM_blink_dark],
		["Bitsrealm", object_Bitsrealm_light, object_Bitsrealm_dark, object_Bitsrealm_figure_light, object_Bitsrealm_figure_dark, object_Bitsrealm_active_light, object_Bitsrealm_active_dark, object_Bitsrealm_blink_light, object_Bitsrealm_blink_dark],
		["RehaBuddy", object_RehaBuddy_light, object_RehaBuddy_dark, object_RehaBuddy_figure_light, object_RehaBuddy_figure_dark, object_RehaBuddy_active_light, object_RehaBuddy_active_dark, object_RehaBuddy_blink_light, object_RehaBuddy_blink_dark],
		["CruzRoja", object_CruzRoja_light, object_CruzRoja_dark, object_CruzRoja_figure_light, object_CruzRoja_figure_dark, object_CruzRoja_active_light, object_CruzRoja_active_dark, object_CruzRoja_blink_light, object_CruzRoja_blink_dark]
	];

	const handle_object_mouseenter = (object_case) => {
		props.setHoveringObject(true);
		props.setHoveredCase(object_case);
	}

	const handle_object_mouseleave = () => {
		props.setHoveringObject(false);
		props.setHoveredCase("");
	}

	const handle_object_click = (object_case) => {
		console.log("Clicked!", object_case);
	}

	return (
		<div className="case_objects">
			{caseobjects.map ((item) =>
				<div className="case_object_div">
					<div
						className="case_object cursor_readmore"
						onMouseEnter={() => { handle_object_mouseenter(item[0]); }}
						onMouseLeave={handle_object_mouseleave}
						onClick={() => { handle_object_click(item[0]); }}
					>
						<img
							className={
								"case_object_img " +
								((props.hoveringObject==true && props.hoveredCase===item[0]) ? "case_object_img_active smooth_animation_xl" : "")
							}
							srcSet={
								(props.hoveringObject==false ?
									(props.blinkingObject===item[0] ?
										(props.mode==="light" ? item[7] : item[8])	// blinking
									:
										(props.mode==="light" ? item[1] : item[2])	// default
									)
								:
									(props.hoveredCase===item[0] ?
										(props.mode==="light" ? item[5] : item[6])	// active (hovered)
									:
										(props.mode==="light" ? item[3] : item[4])	// some fellow is active
									)
								)
								+" 4x" // note that size is adjusted as 1/2 original size
							}
						/>
					</div>
				</div>
			)}
		</div>
	);

	// Under experiment:

	// const handle_object_hover = (e) => {
	// 	console.log("Hovered!", e);
	// 	props.setHoveringObject(true);
	// 	props.setHoveredCase(e.target.name);
	// }

	// const handle_object_click = (e) => {
	// 	console.log("Clicked!", e);
	// }

	// return (
	// 	<div className="case_objects zlift">
	// 		<Spline
	// 			scene={objects}
	// 			onMouseHover={handle_object_hover}
	// 			onMouseDown={handle_object_click}
	// 		/>
	// 	</div>
	// );
}

/**
 * Case brief
 *
 * props:
 *	- hoveredCase (str)
 *	- mode (str)
 */
function CaseBrief (props) {

	const case_briefs = [
		["Case", "Title", "Role", "Duration", "Workshop", "Description"],
		["ACM", "Upgrade website ACM", "UX/UI designer", "February-June, 2021", "", "To help ACM@UCSD attract potential members, our team upgraded its website. We reorganized the layout, collected new contents, and made the interactions more intuitive."],
		["Bitsrealm", "Bitsrealm UI design internship", "UX/UI designer, Front-end developer", "Summer 2021", "", "During my 6-week internship at Bitsrealm, a VR game company in Shanghai, I closely communicated with planners and developers to design a series of 4 websites along the UX flow of a virtual concert."],
		["RehaBuddy", "	RehaBuddy, electronic pet for stroke rehabilitation", "", "March-June, 2021", "Idea Lab program", "	Conceptualized a haptics tamagotchi therapy putty, to keep stroke patients motivated in performing recovery exercise."], // TODO
		["CruzRoja", "Cruz Roja project with NGO", "UX/UI designer", "March-December, 2021", "", "Redesigned the UI of an ambulance dispatching system that arranges emergency service in Tijuana, Mexico. Improved interaction efficiency and information display of a complex system."]
	];

	for (let i = 1; i < case_briefs.length; i++) {
		if (case_briefs[i][0]===props.hoveredCase) {
			let case_brief = [];
			for (let j = 2; j < case_briefs[0].length-1; j++) {
				if (case_briefs[i][j]!=="") {
					case_brief.push ([case_briefs[0][j], case_briefs[i][j]]);
				}
			}
			return (
				<div className="casebrief_div">
					<div className={"casebrief_title text_"+props.mode}>{case_briefs[i][1]}</div>
					<div className="casebrief">
						<Bio
							list={case_brief}
							bullet_type="text"
							mode={props.mode}
						/>
						<span className={"text_"+props.mode}>{case_briefs[i][case_briefs[0].length-1]}</span>
					</div>
				</div>
			);
		}
	}
}



/**
 * Resume page
 */
function Resume (props) {
	return (
		<GlassMagnifier
			className="resume"
			imageSrc={resume}
			largeImageSrc={resume}
			imageAlt="My resume! If not showing up, view at: https://drive.google.com/file/d/15mV_lu6YbVqO-gnV1KTIy-s8za3UBpwe/view?usp=sharing"
			magnifierSize={"360px"}
			square={true}
			magnifierBorderSize={2} //2px
			magnifierBorderColor={"rgba(253,96,65,1)"} //var(--color-xihongshi)
			allowOverflow={false}
			// magnifierBackgroundColor={"rgba(253,96,65,1)"} //var(--color-xihongshi)
		/>
	);
}



/**
 * Journeys
 *
 * props:
 *	- mode (str)
 */
function Journey (props) {
	return (
		<div>
			<span class={"text_hint text_hint_"+props.mode}>Yearly journey under construction. See you soon!</span>
		</div>
	);
}

/**
 * Journey timeline
 *
 * props:
 *	- mode (str)
 */
function JourneyTimeline (props) {
	return (
		<div className="journey_timeline_div">
			<div className={"journey_timeline_line journey_timeline_line_"+props.mode}></div>
		</div>
	);
}

