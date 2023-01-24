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

import React, { useState , useEffect, createRef, useRef } from 'react';
import { Link } from "react-router-dom";

/* Foreign components */
import { cases } from "./cases.js";
import { Modebtn, Bio, Contents, Img, Vid } from "./components.js";

/* Assets */
import next_case_study_btn from "./assets/basic/next_case_study_btn@2x.png";

/* Libraries */
import useIsInViewport from "use-is-in-viewport";
import parse from 'html-react-parser';
//import { GlassMagnifier } from "react-image-magnifiers";



/**
 * Home
 *
 * props:
 *	- case (str)
 *	- toggleMode (func)
 *	- mode (str)
 */
export default function Case (props) {

	/* Contents setup */

	// fetch full_write up from cases doc.
	const full_writeup = [...cases[props.case][3]];

	// summarize content_list, set refs and viewport trackers to locate each section.
	let content_list = []; // [[ section_identifier (str), section_ref (ref) ], [...]]
	const content_refs = useRef([]);
	let map_to_contentlist = []; // some sections are hidden in the case_left content list
	let curr_bigbro = 0; // index of the latest big-bro section that shows in the case_left content list
	for (let i = 0; i < full_writeup.length; i++) {
		const curr_section_ref = createRef();
		content_refs.current[i] = curr_section_ref;
		content_list[i] = [full_writeup[i][1], curr_section_ref];
		if (full_writeup[i][1]!=="") { curr_bigbro = i; }
		map_to_contentlist[i] = curr_bigbro;
	}

	// scroll detector and case_left switch.
	const [scrolling, setScrolling] = useState(false);
	const [sectionInViewportState, setSectionInViewportState] = useState(Array(full_writeup.length).fill(false));
		// when a section enters the viewport, corresponding index turns true
	const [currSection, setCurrSection] = useState(null);
	useEffect(() => {
		//console.log("sectionInViewportState: ", sectionInViewportState); //DEBUG
		const curr_bellwether = sectionInViewportState.findIndex((state) => state==true);
		setCurrSection(map_to_contentlist[curr_bellwether]);
	}, [sectionInViewportState]);

	// modal.
	const [modalSrc, setModalSrc] = useState("");


	/* Smooth transition animation helper */

	// Onload effect.
	const [loaded, setLoaded] = useState(false);
	useEffect(() => {
		window.onload = function() {
			document.body.className += " loaded";
		}
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

				<div className={"case_content text_"+props.mode}>
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
				</div>

			</div>

			<div className={"case_footer case_footer_"+props.mode}>
				<FooterObject
					object={cases[props.case][2]}
					next={cases[props.case][1]["next"]}
					mode={props.mode}
				/>
				{/* thank you */}
				{/* next */}
				{/* all primary and contact tabs listed (align with home button but snap to bottom) */}
			</div>

		</div>

		<div className={"case_home_div_outer case_home_div_outer_"+props.mode}>
			<div className="case_home_div_inner">
				<Link to="/">
					<div
						className = {
							"case_home cursor_pointer " +
							"case_home_"+props.mode
						}
						onClick={props.onclick}
					/>
				</Link>
			</div>
		</div>

		<Modebtn mode={props.mode} toggleMode={props.toggleMode} />

		{modalSrc !== "" ?
			<div
				className={"modal_div_outer modal_div_outer_"+props.mode+" cursor_zoomout"}
				onClick={(e) => { e.preventDefault(); modalSrc["close"](); }}
			><div className="modal_div_inner">
				<img
					className="modal_img"
					style={{"--img-zoomable-min-width": modalSrc["minWidth"]}}
					src={modalSrc["src"]}
					alt={modalSrc["alt"]}
					onDragStart={e => e.preventDefault()}
				/>
				{/*<GlassMagnifier
					className="modal_img"
					imageSrc={props.src}
					largeImageSrc={props.src}
					magnifierSize={"360px"}
					square={true}
					magnifierBorderSize={2} //2px
					magnifierBorderColor={"rgba(253,96,65,1)"} //var(--color-xihongshi)
					allowOverflow={true}
					magnifierBackgroundColor={"rgba(253,96,65,1)"} //var(--color-xihongshi)
				/>*/}
				{/*TODO: add close/back button*/}
			</div></div>
		: null }

	</>);
}



/**
 * CaseSection
 *
 * props:
 *	- section (array)
 *	- i (int)
 *	- section_ref (ref)
 *	- setSectionInViewportState (func)
 *	- setModalSrc (func)
 *	- mode (str)
 */
function CaseSection (props) {

	const [isInViewport, targetWrapperRef] = useIsInViewport({
		target: props.section_ref,
		threshold: 0,
		modTop: "-40px",
		modBottom: "-40px"
	});
	useEffect (() => {
		props.setSectionInViewportState(prev => {
			let newSectionInViewportState = [...prev];
			newSectionInViewportState[props.i] = isInViewport;
			return newSectionInViewportState;
		});
	}, [isInViewport]);

	return (
		<div
			ref={targetWrapperRef}
			id={"section_"+props.i}
			className="case_section"
		>{(() => {

			switch (props.section[0]) {

				case "intro":
					return (
						<div className="case_section_intro">
							<CaseSectionContent
								content={props.section[2]}
								suffix="case_section_intro"
								setModalSrc={props.setModalSrc}
								mode={props.mode}
							/>
						</div>
					);
					break;

				case "problem":
					return (
						<div className={"case_section_boxed case_section_problem case_section_boxed_"+props.mode}>
							<div
								className={
									"case_section_boxed_title case_section_boxed_title_"+props.mode + " " +
									"case_section_problem_title"
								}
							>
								Problem statement
							</div>
							<CaseSectionContent
								content={props.section[2]}
								suffix="case_section_problem"
								setModalSrc={props.setModalSrc}
								mode={props.mode}
							/>
						</div>
					);
					break;

				case "section":
					return (
						<div className={"case_section_section case_section_section_"+props.mode}>
							<div className={"case_section_section_identifier text_hint text_hint_"+props.mode}>{props.section[1]}</div>
							<CaseSectionContent
								content={props.section[2]}
								suffix="case_section_section"
								title_class={
									"case_section_title case_section_section_title " +
									"case_section_section_title_"+props.mode
								}
								setModalSrc={props.setModalSrc}
								mode={props.mode}
							/>
						</div>
					);
					break;

				case "subsection":
					return (
						<div className={"case_section_boxed case_section_subsection case_section_boxed_"+props.mode}>
							<CaseSectionContent
								content={props.section[2]}
								suffix="case_section_subsection"
								title_class={
									"case_section_boxed_title case_section_boxed_title_"+props.mode + " " +
									"case_section_subsection_title"
								}
								setModalSrc={props.setModalSrc}
								mode={props.mode}
							/>
						</div>
					);
					break;

				case "evidence":
					return (
						<div className={"case_section_boxed case_section_evidence case_section_boxed_"+props.mode}>
							{/*<p>...</p>*/}
							<CaseSectionContent
								content={props.section[2]}
								suffix="case_section_evidence"
								setModalSrc={props.setModalSrc}
								mode={props.mode}
							/>
						</div>
					);
					break;
			}

		})()}</div>
	);
}



/**
 * CaseSectionContent
 *
 * props:
 *	- content (array)
 *	- suffix (str)
 *	- title_class (str)
 *	- setModalSrc (func)
 *	- mode (str)
 */
function CaseSectionContent (props) {
	return (<>
		{props.content.map ((element, i) => {
			const key = props.suffix+i;
			switch (element[0]) { // title, text, img-static, img-zoomable, img-scollable, vid, prototype

				case "title":
					return (
						<div
							key={key}
							className={props.title_class}
						>
							{parse(element[1])}
						</div>
					);
					break;

				case "text":
					return (
						<p
							key={key}
							className={props.suffix.replace(/-/g,"_")+"_text"}
						>
							{parse(element[1])}
						</p>
					);
					break;

				case "img-static":
				case "img-zoomable":
				case "img-scrollable":
					return (
						<Img
							key={key}
							type={element[0].substring(4)} // remove "img-"
							src={element[1]}
							alt={
								element.length >=3
								&& element[2]!==null
								&& element[2]!=="" ?
									element[2]
								: ""
							}
							caption={
								element.length >=4
								&& element[3]!==null
								&& element[3]!=="" ?
									element[3]
								: undefined
							}
							img_stylelist={
								element.length >= 5
								&& element[4]!==null
								&& element[4]!=="" ?
									element[4]
								: undefined
							}
							setModalSrc={props.setModalSrc}
							mode={props.mode}
						/>
					);
					break;

				case "vid":
					return (
						<Vid
							key={key}
							src={element[1]}
							alt={
								element.length >=3
								&& element[2]!==null
								&& element[2]!=="" ?
									element[2]
								: ""
							}
							caption={
								element.length >=4
								&& element[3]!==null
								&& element[3]!=="" ?
									element[3]
								: undefined
							}
							width={
								element.length >= 5
								&& element[4]!==null
								&& element[4]!=="" ?
									element[4]
								: undefined
							}
							mode={props.mode}
						/>
					);
					break;

				case "prototype":
					return (
						<div
							key={key}
							className="ratio_outer"
							style={{"--prototype-ratio": element[2]}}
						>
							<iframe
								className="ratio_inner"
								//style="border: 1px solid rgba(0, 0, 0, 0.1);" width='390' height='844'
								src={element[1]}
								allowFullScreen
							></iframe>
						</div>
					);
					break;
			}
		})}
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
		<Link to={"/case-"+props.next} onClick={() => { setTimeout(()=>{ window.location.reload(); }, 1); }} /*onClick={() => window.location.href="/case-"+props.next}*/> {/*TODO: better way!!!*/}
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