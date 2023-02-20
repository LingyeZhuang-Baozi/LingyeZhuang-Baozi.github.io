/**
 * Notes:
 *
 *	... almost all introductions are too {{{brief or general}}}#51C0C0}}} ...
 *
 *	https://flaviocopes.com/how-to-string-contains-substring-javascript/
 *
 *	var parts = "I am a cow; cows say moo. MOOOOO.".split(/(\bmoo+\b)/gi);
 *	for (var i = 1; i < parts.length; i += 2) {
 *		parts[i] = <span className="match" key={i}>{parts[i]}</span>;
 *	}
 *	return <div>{parts}</div>;
 */

import React, { useState , useEffect, createRef, useRef, lazy, Suspense } from 'react';
import { Link, useLocation } from "react-router-dom";

/* Foreign components */
import { cases } from "./cases.js";
import { Modebtn, Bio, Contents, Img, ImgModal, Vid } from "./components.js";

/* Assets */
import next_case_study_btn from "./assets/basic/next_case_study_btn@2x.png";

/* Libraries */
import parse from 'html-react-parser';
import useIsInViewport from "use-is-in-viewport";

/* Lazy loads */
const CaseSection = lazy(() => import('./CaseSection.js'));



/**
 * Case
 *
 * props:
 *	- case (str)
 *	- goBack (bool)
 *	- toggleMode (func)
 *	- mode (str)
 */
export default function Case (props) {

	/* Contents setup */

	// fetch full write up of the current case from cases doc.
	const full_writeup = [...cases[props.case][3]];

	// summarize content_list, set refs and viewport trackers to locate each section.
	let content_list = []; // [[ section_identifier (str), section_ref (ref) ], [...]]
	const content_refs = useRef([]);
	let map_to_contentlist = []; // Some sections are hidden in the case_left content list. These hidden sections will follow their big-bro
	let curr_bigbro = 0; // map_to_contentlist set-up helper. Index of the latest big-bro section that shows in the case_left content list.
	//useEffect(() => {
	for (let i = 0; i < full_writeup.length; i++) {
		const curr_section_ref = createRef();
		content_refs.current[i] = curr_section_ref;
		content_list[i] = [full_writeup[i][1], curr_section_ref];
		if (full_writeup[i][1]!=="") { curr_bigbro = i; }
		map_to_contentlist[i] = curr_bigbro;
	}
	//}, []);

	// scroll detector and case_left switch.
	const [sectionInViewportState, setSectionInViewportState] = useState(Array(full_writeup.length).fill(false));
		// when a section enters the viewport, corresponding index turns true
	const [currSection, setCurrSection] = useState(null);
	useEffect(() => {
		//console.log("sectionInViewportState: ", sectionInViewportState); //DEBUG
		const curr_bellwether = sectionInViewportState.findIndex((state) => state==true);
		setCurrSection(map_to_contentlist[curr_bellwether]);
	}, [sectionInViewportState]);


	/* Heuristics #3/10: user control and freedom */
	const location = useLocation();


	/* Modal */
	const [modalSrc, setModalSrc] = useState("");


	/* Smooth transition animation helper */
	// Onload effect.
	const [loaded, setLoaded] = useState(false);
	useEffect(() => {
		window.onload = function() {
			document.body.className += " loaded";
		}
		if (location.state) { console.log("goBack? ", location.state["goBack"]); } //DEBUG
	}, []);


	/* Render */
	return (<>
		<div
			onLoad={() => { setLoaded(true); }}
			className={
				"page page_case " +
				"page_" + props.mode + " " +
				(loaded==true ? "page_loaded" : "")
			}
		>

			<div className={"case_main case_main_"+props.mode}>

				<div className="case_cover">
					<img
						className="case_cover_img"
						src={cases[props.case][1]["thumbnail"]}
						onDragStart={e => e.preventDefault()}
					/>
					<div className="case_bio_div">
						<div className={"case_title text_"+props.mode}>{cases[props.case][1]["title"]}</div>
						<Bio
							list={[...cases[props.case][1]["case_brief"]]}
							bullet_type="text"
							mode={props.mode}
						/>
					</div>
				</div>

				<div className="case_left_div"><div className="case_left">
					<Contents
						list={content_list}
						currSection={currSection}
						mode={props.mode}
					/>
				</div></div>

				<div className={"case_content content text_"+props.mode}>
					<Suspense fallback={<div className={"text_hint_"+props.mode}>Loading...</div>}>
						{full_writeup.map ((section, i) =>
							<CaseSection
								key={"writeup-"+props.case+"-"+i}
								section={section}
								i={i}
								section_ref={content_refs.current[i]}
								// sectionInViewportState={sectionInViewportState}
								setSectionInViewportState={setSectionInViewportState}
								setModalSrc={setModalSrc}
								mode={props.mode}
							/>
						)}
					</Suspense>
				</div>

			</div>

			{ cases[props.case][1]["next"] !== "" ?
				<div className={"case_footer case_footer_"+props.mode}>
					<FooterObject
						object={cases[props.case][2]}
						next={cases[props.case][1]["next"]}
						mode={props.mode}
					/>
					{/* TODO: all primary and contact tabs listed (align with home button but snap to bottom) */}
				</div>
			: null }

		</div>

		<div className={"case_back_div_outer case_back_div_outer_"+props.mode}>
			<div className="case_back_div_inner">
				{location.state && location.state["goBack"] == true ?

					// from journey → back
					<Link to={-1} onDragStart={e => e.preventDefault()}>
						<div
							className = {
								"case_back case_back_back cursor_pointer " +
								"case_back_"+props.mode
							}
							onClick={props.onclick}
							onDragStart={e => e.preventDefault()}
						/>
					</Link>
				:

					// otherwise → home
					<Link to="/" onDragStart={e => e.preventDefault()}>
						<div
							className = {
								"case_back case_back_home cursor_pointer " +
								"case_back_"+props.mode
							}
							onClick={props.onclick}
							onDragStart={e => e.preventDefault()}
						/>
					</Link>
				}
			</div>
		</div>

		<Modebtn mode={props.mode} toggleMode={props.toggleMode} />

		<ImgModal
			modalSrc={modalSrc}
			mode={props.mode}
		/>

	</>);
}



/**
 * FooterObject
 * 
 * props:
 *	- object (array)
 *	- next (str)
 *	- mode (str)
 */
function FooterObject (props) {

	const [timer, setTimer] = useState(true); // true(tic)*, false(tac)
	const [isBlinking, setIsBlinking] = useState(false);
	const [hoveringObject, setHoveringObject] = useState(false);

	useEffect(() => {
		//console.log("timer: ", timer); //DEBUG
		const random_delay = 2000 + Math.random() * 4000; // blink every 2s - 6s
		if (timer==true) {
			setTimer(false);
			setTimeout (() => {
				setIsBlinking(true);
				setTimer(true);
			}, random_delay);
		}
	}, [timer]);

	useEffect(() => {
		//console.log("isBlinking: ", isBlinking); //DEBUG
		if (isBlinking==true) {
			setTimeout (() => { setIsBlinking(false); }, 135); // blink for var(--delay-s)
		}
	}, [isBlinking]);

	/* Render */
	return (
		<Link
			to={"/case-"+props.next}
			onClick={() => { /*setTimeout(()=>{*/ window.location.reload(); /*}, 0);*/ }}
			/*onClick={() => window.location.href="/case-"+props.next}*/
		> {/*TODO: better way!!!*/}
			<div key={"caseobject-"+props.object[0]} className="case_footer_object_div dis_select">
				<div className="case_footer_hint_div">
					<img className="case_footer_hint" srcSet={next_case_study_btn+" 2x"} />
				</div>
				<div
					className="case_footer_object"
					onMouseEnter={() => { setHoveringObject(true); }}
					onMouseOver={() => { setHoveringObject(true); }}
					onMouseLeave={() => { setHoveringObject(false); }}
					onClick={() => { /*window.scrollTo(0,0);*/ console.log("Clicked ", props.object[0], ", navigate to corresponding case page."); }} //DEBUG
				>
					<img
						className="case_footer_object_img smooth_animation_xl"
						srcSet={
							(hoveringObject==false ?
								(isBlinking==true ?
									(props.mode==="light" ? props.object[6] : props.object[7])	// blinking
								:
									(props.mode==="light" ? props.object[0] : props.object[1])	// default
								)
							:
								(props.mode==="light" ? props.object[4] : props.object[5])	// active (hovered)
							)
							+" 4x" // note that size is adjusted as 1/2 original size
						}
						onDragStart={e => e.preventDefault()}
					/>
				</div>
			</div>
		</Link>
	);
}