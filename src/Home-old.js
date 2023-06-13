import React, { useState, useEffect, createRef, useRef } from 'react';
import { Outlet, Link, useLocation } from "react-router-dom";

/* Foreign components */
import { cases } from "./cases.js";
//import { journey } from "./journeys.js";
import { Modebtn, Bio, ImgModal } from "./components.js";
// import Nav from "./Nav.js";

/* Assets */
import me1 from "./assets/basic/me-1.jpg";
import me2 from "./assets/basic/me-2.jpg";
import resume from "./assets/basic/resume.png";
import case_studies_hint_tag from "./assets/basic/case_studies_hint_tag_1@2x.png";
import journey_hint_tag from "./assets/basic/journey_hint_tag@2x.png";

/* Libraries */
import { isSafari, isIE } from "react-device-detect";
import MediaQuery from "react-responsive";
import { Transition, TransitionGroup, CSSTransition } from "react-transition-group";
import useIsInViewport from "use-is-in-viewport";
import { GlassMagnifier } from "react-image-magnifiers";
//import Spline from '@splinetool/react-spline'; // under experiment

/* Global variables */
const four_devarajas = ["ACM", "RehaBuddy", "Bitsrealm", "CruzRoja"];
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
	const curr_route = useLocation().pathname.substring(1);
	const [page, setPage] = useState(curr_route && ["resume", "home", "journey"].includes(curr_route) ? curr_route : "home");	// resume, home*, journey
	const [newToHome, setNewToHome] = useState(true);
	const [newToJourney, setNewToJourney] = useState(true);
	useEffect(()=>{
		if (page==="journey") {
			setNewToJourney(false);
		}
	},[page]);


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
			}, 270); // var(--delay-m)
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
		["linkedin", "https://www.linkedin.com/in/julietzhuang"]
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

	const [homeDisplayInnerChanging, setHomeDisplayInnerChanging] = useState(false);
	useEffect(() => {
		setHomeDisplayInnerChanging(true);
		setTimeout (() => {
			setHomeDisplayInnerChanging(false);
		}, 270); // var(--delay-m)
	}, [hoveringObject, hoveredCase/*, page*/]);
	useEffect(() => { // insurance
		if (homeDisplayInnerChanging==true) {
			setTimeout (() => {
				setHomeDisplayInnerChanging(false);
			}, 270); // var(--delay-m)
		}
	}, [homeDisplayInnerChanging]);


	/* Render */
	return (<>
		<MediaQuery minWidth={800}>{(match) => match?

			// Large Screen
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
					(page==="journey" ? "home_tabs_primary_journey" : "") + " " +
					(PNisChanging ? "home_tabs_primary_changing" : "")
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
								newToJourney={newToJourney}
								setNewToJourney={setNewToJourney}
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
							(homeDisplayInnerChanging ? "home_display_div_inner_changing" : "")
						}>
							{(() => {
								if (page === "home" && hoveringObject==true) {
									return ( <CaseBrief hoveredCase={hoveredCase} mode={props.mode} /> );
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

		:

			// Small Screen
			<>

				<div
					onLoad={() => { setLoaded(true); }}
					className={
						"page page_home " +
						"page_" + props.mode + " " +
						(loaded==true ? "page_loaded" : "")
					}
				>

					<div className="mobile_hint">
						Please use a wider screen for full experience!
					</div>

					<div className="flex_container flex_container_col">

						<div className={
							"home_display_div_inner " +
							"home_display_div_inner_" + page + " " +
							(hoveringObject==true ?
								("home_display_div_inner_case home_display_div_inner_")+hoveredCase
							: "") + " " +
							(homeDisplayInnerChanging ? "home_display_div_inner_changing" : "")
						}>
							{(() => {
								if (page === "home" && hoveringObject==true) {
									return ( <CaseBrief hoveredCase={hoveredCase} mode={props.mode} /> );
								} else {
									return ( <Outlet context={[modalSrc, setModalSrc]}/> );
								}
							})()}
						</div>

						{/*TODO: <CaseCards?>*/}
					</div>

					<div className="home_tabs">
						{Cbtns.map(Cbtn_pair =>
							<CB
								key={"Cbtn-"+Cbtn_pair[0]}
								btn={Cbtn_pair[0]}
								link={Cbtn_pair[1]}
								mode={props.mode}
							/>
						)}
					</div>

					{/*<ImgModal
						modalSrc={modalSrc}
						mode={props.mode}
					/>*/}

				</div>

				{/*<Modebtn mode={props.mode} toggleMode={props.toggleMode} />*/}
				<div className="home_tabs home_tabs_primary">
					{PNtabs.map(tab =>
						<PNT
							key={"PNtab-"+tab}
							tab={tab}
							active={page===tab}
							onclick={(e) => { handle_PNT_click(e, tab); }}
							newToJourney={newToJourney}
							setNewToJourney={setNewToJourney}
							mode={props.mode}
							PNisChanging={PNisChanging}
						/>
					)}
				</div>

			</>
		}</MediaQuery>
	</>);
}

/**
 * Primary nav tab
 *
 * props:
 *	- tab (str)
 *	- active (bool)
 *	- onclick (func)
 *	- [newToJourney, setNewToJourney]
 *	- PNisChanging (bool)
 *	- mode (str)
 */
function PNT (props) {

	const [longHover, setLongHover] = useState(false);
	let hoverTimer = 0;

	return (<>
		<div
			className="home_tab_div"
			onMouseEnter={() => {
				hoverTimer = setTimeout(() => {
					setLongHover(true);
				}, 540); // var(--delay-l)
			}}
			onMouseLeave={() => {
				clearTimeout(hoverTimer);
				setLongHover(false);
				//console.log ("timer cleared");
			}}
		>
			<Link to={(props.tab==="home" ? "/" : ("/"+props.tab))} onDragStart={e => e.preventDefault()}>
				<div
					className = {
						"home_tab cursor_pointer " +
						(longHover==true && props.active==false && props.PNisChanging==false ? ("cursor_PNT_"+props.tab) : "") + " " +
						"home_tab_primary_" + props.tab + (props.active==true ? "_active" : "") + " " +
						"home_tab_primary_" + (props.active==true ? "active" : "default") + " " +
						(props.PNisChanging==true ? "home_tab_switching" : "")
					}
					onClick={() => {
						props.onclick();
						if (props.tab==="journey") {
							props.setNewToJourney(false);
						}
					}}
					onDragStart={e => e.preventDefault()}
				/>
			</Link>
			{props.newToJourney && props.tab==="journey" ?
				<>{<MediaQuery minWidth={800}>{(match) => match?
					<img className="home_tab_primary_journey_hint" srcSet={journey_hint_tag+" 2x"} />
				: null }</MediaQuery>}</>
			: null}
		</div>
		{props.tab==="journey" ?
			<>{<MediaQuery minWidth={800}>{(match) => match?
				<div
					className="journey_timeline_div_outer"
					style={{opacity: props.active==true ? "1" : "0"}}
				>
					<div className="journey_timeline_div_inner">
						<div className={"journey_timeline_line journey_timeline_line_"+props.mode} />
					</div>
				</div>
			: null }</MediaQuery>}</>
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
					"home_tab home_tab_contact cursor_pointer " +
					"home_tab_contact_" + props.btn
				}
				href={props.link}
				target="_blank"
				onDragStart={e => e.preventDefault()}
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

	const [profilePicGaze, setProfilePicGaze] = useState(false);

	return (
		<>

			<MediaQuery minWidth={800}>{(match) => match?

				<div
					className="profile_pic_div dis_select"
					onMouseEnter={() => { setProfilePicGaze(true); }}
					onMouseOver={() => { setProfilePicGaze(true); }}
					onMouseLeave={() => { // hold the gaze for a while
						setProfilePicGaze(true);
						setTimeout(() => {
							setProfilePicGaze(false);
						}, 540); // var(--delay-l)
					}}
				>
					<img
						src={me1}
						alt="A photo of me"
						className={
							"profile_pic profile_pic_static zlift " +
							(profilePicGaze ? "profile_pic_gaze" : "")
						}
						onDragStart={e => e.preventDefault()}
					/>
					<img
						src={me2}
						alt="A photo of me"
						className="profile_pic profile_pic_active"
						onDragStart={e => e.preventDefault()}
					/>
				</div>

			: null }</MediaQuery>

			<div className={"selfintro zlift text"}>
				<MediaQuery minWidth={800}>{(match) => match?
					<p className={"text"}>
						Hey! You found my little cabin on the internet!
					</p>
				: null }</MediaQuery>
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
					{/*<span className="selfintro_name_word">
						<span>庄</span>
						<span>令</span>
						<span>晔</span>
					</span>*/}
				</span>
				<p className="text_emphasize text">
					UX/UI Designer / Graphic Designer / Illustrator
				</p>
				<p className="text">
					I design for social good, and I believe practice makes perfect.
				</p>
				<p className="text">
					Always embracing new challenges, I am walking on the path toward being a full-stack designer.
				</p>
				<p className="text">
					This website is <a href="https://github.com/LingyeZhuang-Baozi/LingyeZhuang-Baozi.github.io/tree/master" target='_blank'>hand-coded</a> with React.js and ♡.
				</p>
				{/*<span>&nbsp;</span> {/* insert vertical space */}
				{/*<div className="only_mobile">
					<p>Hi, I am <span className="name">Lingye Zhuang</span>.<br/>I study cognitive science with HCI at UCSD.<br/>I design like a craftsman. I enjoy real world challenges and cross-discipline inspirations.</p>
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
					<Link to={"/case-"+item[0]} state={{ goBack: false }} className="cursor_readmore_1">
						<div
							className={
								"case_object " +
								((props.hoveringObject==true && props.hoveredCase===item[0]) ? "case_object_active smooth_animation_xl" : "")
							}
							onMouseEnter={(e) => { handle_object_mouseenter(item[0], e); }}
							//onMouseOver={(e) => { handle_object_mouseover(item[0], e); }}
							onMouseLeave={handle_object_mouseleave}
						>
							<img
								className={
									"case_object_img " +
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
			<div className={"casebrief_title text"}>{cases[props.hoveredCase][1]["title"]}</div>
			<div className="casebrief">
				<Bio
					list={[...cases[props.hoveredCase][1]["case_brief"]]}
					bullet_type="text"
					mode={props.mode}
				/>
				<span className={"text"}>{cases[props.hoveredCase][1]["description"]}</span>
			</div>
		</div>
	);
}



/**
 * Resume page
 */
function Resume (props) {
	// if (isSafari || isIE) {
		return (<>
			<MediaQuery minWidth={800}>{(match) => match?
				<div className="resume_div">
					<img
						className="resume"
						src={resume}
						onDragStart={e => e.preventDefault()}
					/>
				</div>
			:
				<img
					className="resume"
					src={resume}
					onDragStart={e => e.preventDefault()}
				/>
			}</MediaQuery>
		</>);
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



/* Export */
export { AboutMe, Resume };