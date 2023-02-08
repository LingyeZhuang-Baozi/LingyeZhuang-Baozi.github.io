import React, { useState , useEffect, createRef, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet, useOutletContext, Link } from "react-router-dom";

/* Foreign components */
import { cases } from "./cases.js";
import { journey } from "./journey.js";
import { Modebtn, SectionContent, Bio, ImgModal } from "./components.js";
// import Nav from "./Nav.js";

/* Assets */
import me1 from "./assets/basic/me-1.jpg";
import me2 from "./assets/basic/me-2.jpg";
import resume from "./assets/basic/resume.png";
import resume_big from "./assets/basic/resume-big.png";
import case_studies_hint_tag from "./assets/basic/case_studies_hint_tag@2x.png";

/* Libraries */
import { isSafari, isIE } from "react-device-detect";
//import { Transition, TransitionGroup, CSSTransition } from 'react-transition-group';
import useIsInViewport from "use-is-in-viewport";
import { GlassMagnifier } from "react-image-magnifiers";
import Spline from '@splinetool/react-spline'; // under experiment

/* Global variables */
const four_devarajas = ["ACM", "Bitsrealm", "RehaBuddy", "CruzRoja"];
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
	// useEffect (() => {
	// 	console.log ("window pathname: '", window.location.pathname, "'\npage hook: '", page, "'"); //DEBUG
	// 	if (window.location.pathname==="/resume" && page!=="resume") {
	// 		setPage("resume");
	// 	} else if (window.location.pathname==="/" && page!=="home") {
	// 		setPage("home");
	// 	} else if (window.location.pathname==="/journey" && page!=="journey") {
	// 		setPage("journey");
	// 	}
	// }, [window.location.href]);

	/* Primary nav tabs and their animation state */
	const PNtabs = ["resume", "home", "journey"];
	const [PNisChanging, setPNisChanging] = useState(false);
	const [PNanimation, setPNanimation] = useState("");
	const handle_PNT_click = (e, tab) => {
		// e.preventDefault(); // no need to preventDefault here since the default is to switch path
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

	/* Case objects and relative functions */
	let caseObjects = [];
	for (let case_name of four_devarajas) {
		caseObjects.push([case_name, ...cases[case_name][2]]);
	}

	const [hoveringObject, setHoveringObject] = useState(false);
	const [hoveredCase, setHoveredCase] = useState(""); // "" or 1 of four_devarajas
	const [newToHome, setNewToHome] = useState(true);
	const [timer, setTimer] = useState(true); // true(tic)*, false(tac)
	const [blinkingObject, setBlinkingObject] = useState("");

	useEffect(() => {
		if (timer==true) {
			setTimer(false);
			setTimeout (() => {
				const random = Math.random() * 5; // min=0 is inclusive, max=5 is exclusive
				if (random < 1) { setBlinkingObject(""); }
				else if (random < 2) { setBlinkingObject(caseObjects[0][0]); }
				else if (random < 3) { setBlinkingObject(caseObjects[1][0]); }
				else if (random < 4) { setBlinkingObject(caseObjects[2][0]); }
				else if (random < 5) { setBlinkingObject(caseObjects[3][0]); }
				setTimer(true);
			}, 2000); // tic-tac every 2s
		}
	}, [timer]);
	// useEffect(() => { console.log (timer==true? "tic" : "tac"); }, [timer]); //DEBUG

	useEffect(() => {
		if (blinkingObject!=="") {
			// console.log (blinkingObject + " blinks"); //DEBUG
			setTimeout (() => { setBlinkingObject(""); }, 135); // blink for var(--delay-s)
		}
	}, [blinkingObject]);

	/* Modal */
	const [modalSrc, setModalSrc] = useState("");

	/* Contact btns and their corresponding links */
	const Cbtns = [
		["email", "mailto:l1zhuang@ucsd.edu"/*link="mailto:zhuanglingye@163.com"*/],
		["instagram", "https://www.instagram.com/juliet_baozi/"],
		["linkedin", "http://linkedin.com/in/lingye-zhuang-a1b4731a1"]
	];

	/* Smooth transition animation helper */
	const [loaded, setLoaded] = useState(false);
	useEffect(() => {
		window.onload = function() {
			document.body.className += " loaded";
		}
	}, []);
	// const AboutMe_ref = useRef(null);
	// const CaseBrief_ref = useRef(null);

	/* Render */
	return (
		<div
			onLoad={() => { setLoaded(true); }}
			className={
				"page page_home " +
				"page_" + props.mode + " " +
				(loaded==true ? "page_loaded" : "")
			}
		>

			<Modebtn mode={props.mode} toggleMode={props.toggleMode} />

			<div className={
				"home_tabs_div_outer home_tabs_primary " +
				(page==="journey" ? "home_tabs_primary_journey" : "")
			}><div className="home_tabs_div_inner">
				<div className={
					"home_tabs_primary_selected " +
					"home_tabs_primary_selected_" + page + " " +
					"home_tabs_primary_selected_" + props.mode + " " +
					PNanimation
				} />
				<div className={
					"home_tabs " +
					(page==="journey" ? "home_tabs_journey" : "")
				}>
					{PNtabs.map(tab =>
						<PNT
							key={"PNtab-"+tab}
							tab={tab}
							active={page===tab}
							onclick={(e) => { handle_PNT_click(e, tab); }}
							mode={props.mode}
							PNisChanging={PNisChanging}
						/>
					)}
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
							if (page === "home") {
								if (hoveringObject==false) {
									return ( <AboutMe mode={props.mode}/> );									
								} else {
									return ( <CaseBrief hoveredCase={hoveredCase} mode={props.mode} /> );
								}
								// return (
								// 	<TransitionGroup>
								// 		<CSSTransition
								// 			// key={hoveringObject==false ? "AboutMe" : "CaseBrief"}
								// 			// nodeRef={hoveringObject==false ? AboutMe_ref : CaseBrief_ref}
								// 			nodeRef={AboutMe_ref}
								// 			timeout={500}
								// 			classNames="animation_fade"
								// 		><div ref={AboutMe_ref}>
								// 			{hoveringObject==false ?
								// 				// <div ref={AboutMe_ref}>
								// 					<AboutMe mode={props.mode} />
								// 				// </div>
								// 			:
								// 				// <div ref={CaseBrief_ref}>
								// 					<CaseBrief hoveredCase={hoveredCase} mode={props.mode} />
								// 				// </div>
								// 			}
								// 		</div></CSSTransition>
								// 	</TransitionGroup>
								// );
							} else {
								return ( <Outlet context={[modalSrc, setModalSrc]}/> );
							}
						})()}
				</div></div>

				<div className={"case_objects_div " + (page==="home" ? "case_objects_div_active" : "")}>
					<CaseObjects
						caseObjects={caseObjects}
						hoveringObject={hoveringObject}
						setHoveringObject={setHoveringObject}
						hoveredCase={hoveredCase}
						setHoveredCase={setHoveredCase}
						newToHome={newToHome}
						setNewToHome={setNewToHome}
						mode={props.mode}
						blinkingObject={blinkingObject}
					/>
				</div>
			</div>

			<div className="home_tabs_div_outer home_tabs_contact"><div className="home_tabs_div_inner"><div className="home_tabs">
				{Cbtns.map(Cbtn_pair =>
					<CB
						key={"Cbtn-"+Cbtn_pair[0]}
						btn={Cbtn_pair[0]}
						link={Cbtn_pair[1]}
						mode={props.mode}
					/>
				)}
			</div></div></div>

			<ImgModal
				modalSrc={modalSrc}
				mode={props.mode}
			/>

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
	return (<>
		<div className="home_tab_div">
			<Link to={(props.tab==="home" ? "/" : ("/"+props.tab))}>
				<div
					className = {
						"home_tab cursor_pointer " +
						"home_tab_primary_" + props.tab + (props.active==true ? "_active" : "") + " " +
						"home_tab_primary_" + (props.active==true ? "active" : "default") + "_" + props.mode + " " +
						(props.PNisChanging ? "home_tab_switching" : "")
					}
					onClick={props.onclick}
				/>
			</Link>
		</div>
		{props.tab==="journey" ?
			<div
				className="journey_timeline_div_outer"
				style={{opacity: props.active==true ? "1" : "0"}}
			>
				<JourneyTimeline mode={props.mode}/>
			</div>
		: null}
	</>);
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
					onDragStart={e => e.preventDefault()}
				/>
				<img
					src={me2}
					alt="A photo of me"
					className="profile_pic profile_pic_active"
					onDragStart={e => e.preventDefault()}
				/>
			</div>

			<div className={"selfintro zlift text_"+props.mode}>
				<p className={"text_"+props.mode}>
					Hey! You found my little cabin on the internet!
				</p>
				<span className="selfintro_name">
					{/*<span className="selfintro_name_word">
						<span>L</span>
						<span>i</span>
						<span>n</span>
						<span>g</span>
						<span>y</span>
						<span>e</span>
					</span>*/}
					<span className="selfintro_name_word">
						<span>J</span>
						<span>u</span>
						<span>l</span>
						<span>i</span>
						<span>e</span>
						<span>t</span>
					</span>
					<span className="selfintro_name_word">
						<span>Z</span>
						<span>h</span>
						<span>u</span>
						<span>a</span>
						<span>n</span>
						<span>g</span>
					</span>
				</span>
				<p className={"text_"+props.mode}>
					UX/UI designer / Graphic designer / Amateur illustrator
				</p>
				<p className={"text_"+props.mode}>
					Recently soaking up development skills, walking on the path towards being a full-stack designer. This website is hand-coded with React.js and ♡.
				</p>
				<p className={"text_"+props.mode}>
					I design like a craftsman, since I believe practise makes perfect.
				</p>
				<p className={"text_"+props.mode}>
					I design for social good, and I enjoy real world challenges.
				</p>
				<span>&nbsp;</span> {/* insert vertical space */}
				{/*<div className="only_mobile">
					<p>Hi, I am <span className="name">Lingye Zhuang</span>.<br>I study cognitive science with HCI at UCSD.<br>I design like a craftsman. I enjoy real world challenges and cross-discipline inspirations.</p>
				</div>*/}
			</div>

		</>
	);
}



/**
 * CaseObjects
 * 
 * props:
 *	- caseObjects (array)
 *	- [hoveringObject, setHoveringObject]
 *	- [hoveredCase, setHoveredCase]
 *	- [newToHome, setNewToHome]
 *	- mode (str)
 *	- blinkingObject (str)
 */
function CaseObjects (props) {

	/* Hover handlers */
	const handle_object_mouseenter = (object_case, e) => {
		if (! (e.buttons == 1 || e.buttons == 3)) {
			props.setHoveringObject(true);
			props.setHoveredCase(object_case);
			props.setNewToHome(false);
		}
	}
	// const handle_object_mouseover = (object_case, e) => {
	// 	console.log("TESTTEST");
	// 	if (props.hoveringObject==false && ! (e.buttons == 1 || e.buttons == 3)) {
	// 		props.setHoveringObject(true);
	// 		props.setHoveredCase(object_case);
	// 	}
	// }
	const handle_object_mouseleave = () => {
		props.setHoveringObject(false);
		props.setHoveredCase("");
	}

	/* Render */
	return (
		<div className="case_objects dis_select">
			{props.caseObjects.map ((item, i) =>
				<div key={"caseobject-"+item[0]} className="case_object_div">
					{(i===2 && props.hoveringObject==false) ?
						<div className="case_object_hint_div">
							<img className="case_object_hint" srcSet={case_studies_hint_tag+" 2x"} />
						</div>
					: null }
					<Link to={"/case-"+item[0]}>
						<div
							className="case_object"
							onMouseEnter={(e) => { handle_object_mouseenter(item[0], e); }}
							//onMouseOver={(e) => { handle_object_mouseover(item[0], e); }}
							onMouseLeave={handle_object_mouseleave}
							onClick={() => { console.log("Clicked ", item[0], ", navigate to corresponding case page."); }} //DEBUG
						>
							<img
								className={
									"case_object_img " +
									((props.hoveringObject==true && props.hoveredCase===item[0]) ? "case_object_img_active cursor_readmore_1 smooth_animation_xl" : "") + " " +
									((i===2 && props.newToHome==true) ? "animation_case_object_bounce" : "")
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
								onDragStart={e => e.preventDefault()}
							/>
						</div>
					</Link>
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

	if (! props.hoveredCase in cases) { return( <></> ); }

	return (
		<div className="casebrief_div">
			<div className={"casebrief_title text_"+props.mode}>{cases[props.hoveredCase][1]["title"]}</div>
			<div className="casebrief">
				<Bio
					list={[...cases[props.hoveredCase][1]["case_brief"]]}
					bullet_type="text"
					mode={props.mode}
				/>
				<span className={"text_"+props.mode}>{cases[props.hoveredCase][1]["description"]}</span>
			</div>
		</div>
	);
}



/**
 * Resume page
 */
function Resume (props) {
	// if (isSafari || isIE) {
		return (
			<div className="resume_div">
				<img
					className="resume"
					src={resume}
					onDragStart={e => e.preventDefault()}
				/>
			</div>
		);
	// } else {
	// 	return (
	// 		<GlassMagnifier
	// 			className="resume_GM"
	// 			imageSrc={resume}
	// 			largeImageSrc={resume}
	// 			imageAlt="My resume! If not showing up, view at: https://drive.google.com/file/d/15mV_lu6YbVqO-gnV1KTIy-s8za3UBpwe/view?usp=sharing"
	// 			magnifierSize={"360px"}
	// 			square={true}
	// 			magnifierBorderSize={2} //2px
	// 			magnifierBorderColor={"rgba(253,96,65,1)"} //var(--color-xihongshi)
	// 			allowOverflow={false}
	// 			// magnifierBackgroundColor={"rgba(253,96,65,1)"} //var(--color-xihongshi)
	// 		/>
	// 	);
	// }
}



/**
 * Journeys
 *
 * props:
 *	- setModalSrc (func)
 *	- mode (str)
 */
function Journey (props) {

	/* Contents setup */

	// fetch full_journey from journey doc.
	const full_journey = [...journey];

	// summarize year_list, set refs and viewport trackers to locate each year block.
	let year_list = []; // [[ year (str), year_ref (ref) ], [...]]
	const year_refs = useRef([]);
	for (let i = 0; i < full_journey.length; i++) {
		const curr_year_ref = createRef();
		year_refs.current[i] = curr_year_ref;
		year_list[i] = [full_journey[i][0], curr_year_ref];
	}

	// scroll detector and journey_timeline switch.
	const [yearInViewportState, setYearInViewportState] = useState(Array(full_journey.length).fill(false));
		// when a year enters the viewport, corresponding index turns true
	const [currYear, setCurrYear] = useState(null);
	useEffect(() => {
		setCurrYear(yearInViewportState.findIndex((state) => state==true));
	}, [yearInViewportState]);

	// modal.
	const [modalSrc, setModalSrc] = useOutletContext();

	// hover - tooltip detection
	//TODO


	/* Render */
	return (<>
		{/*<span className={"text_hint text_hint_"+props.mode}>Yearly journey under construction. See you soon!</span>*/}
		{full_journey.reverse().map ((year, i) =>
			<JourneyYear
				key={year[0][0]}
				year={year}
				i={i}
				year_ref={year_refs.current[i]}
				setYearInViewportState={setYearInViewportState}
				setModalSrc={setModalSrc}
				mode={props.mode}
			/>
		)}
	</>);
}

/**
 * Journey year
 *
 * props:
 *	- year (array)
 *	- i (int)
 *	- year_ref (ref)
 *	- setYearInViewportState (func)
 *	- setModalSrc (func)
 *	- mode (str)
 */
function JourneyYear (props) {

	const [isInViewport, targetWrapperRef] = useIsInViewport({
		target: props.year_ref,
		threshold: 0,
		modTop: "-40px",
		modBottom: "-40px"
	});
	useEffect (() => {
		props.setYearInViewportState(prev => {
			let newYearInViewportState = [...prev];
			newYearInViewportState[props.i] = isInViewport;
			return newYearInViewportState;
		});
	}, [isInViewport]);

	return (
		<div
			ref={targetWrapperRef}
			id={"journey_"+props.year[0][0]}
			className="journey_year"
		>
			<div className="journey_year_header">
				<img
					className="journey_year_animal"
					srcSet={(props.mode==="light" ? props.year[0][1][0] : props.year[0][1][1]) + " 4x"}
					onDragStart={e => e.preventDefault()}
				/>
				<div className={"journey_year_num text_"+props.mode}>{props.year[0][0]}</div>
			</div>
			{props.year[1].map ((journey, j) =>
				<div
					key={props.year[0][0]+"_"+j}
					className={"journey_journey journey_journey_"+props.mode}
				>
					<div className={"journey_journey_header journey_journey_header_"+props.mode}>
						<div className={"journey_journey_title text_"+props.mode}>
							{journey[0][0]}
						</div>
						{journey[0].length > 1 ?
							<div className={"journey_journey_client text_hint text_hint_"+props.mode}>
								{journey[0][1]}
							</div>
						: null }
					</div>
					{journey[1].length !== 0 ?
						<div className="journey_journey_readmore">{/*TODO*/}</div>
					: null }
					<div className={"journey_journey_content content text_"+props.mode}>
						<SectionContent
							content={journey[2]}
							suffix={"journey_" + props.year[0][0] + "_" + j}
							setModalSrc={props.setModalSrc}
							mode={props.mode}
						/>
					</div>
				</div>
			)}
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
		<div className="journey_timeline_div_inner">
			<div className={"journey_timeline_line journey_timeline_line_"+props.mode} />
			<div className="journey_timeline_nodes">
				<div className={"journey_timeline_node journey_timeline_node_"+props.mode}></div>
			</div>
		</div>
	);
}



/* Export */
export { Resume, Journey };