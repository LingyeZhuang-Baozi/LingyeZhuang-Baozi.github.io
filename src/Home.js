import React, { useState, useEffect, useReducer, createContext, useContext, createRef, useRef } from 'react';
import { Link } from "react-router-dom";
//import { HashLink } from 'react-router-hash-link';

import './Home.scss';

/* Foreign components */
import { btns, images } from './assets.js';
import { cases, casesNames, casesGoats, casesByCategory, casesByTimeline } from './cases.js';
import { modeContext, dispatchModeContext, languageContext, dispatchLanguageContext, dispatchCursorTypeContext } from './App.js';
import { A, Emoji } from "./components.js";
import { ReactComponent as ObjectRandom } from "./assets/basic/object_RANDOM.svg";	// TODO
import { ReactComponent as AskMyCaseStudies } from "./assets/basic/hintblobs/ask_my_case_studies.svg";	// TODO

/* Libraries */
import useIsInViewport from "use-is-in-viewport";
//import { isSafari, isIE } from "react-device-detect";
//import parse from 'html-react-parser';



/* Link Creator */
function idCreator (str) {
	return str.replace(/\//g, '-');
}

/* Navigate to Case and Section */
const controlBarHeight = 80;//px
function scrollTo (target, scrollBehavior="smooth", preserveOffset=false) {
	var prevNetPosition = 0;
	if (preserveOffset == true) {
		const prevElement = document.getElementById(idCreator(target));
		prevNetPosition = prevElement.getBoundingClientRect().top;
	}
	setTimeout (() => {
		var netPosition;
		if (preserveOffset == false) {
			const toElement = document.getElementById(idCreator(target));
			netPosition = toElement.getBoundingClientRect().top;
		} else {
			netPosition = prevNetPosition;
		}
		const offsettedPosition = netPosition + window.pageYOffset - controlBarHeight;
		//console.log(prevNetPosition, netPosition);	//DEBUG
		window.scrollTo({
			top: offsettedPosition,
			behavior: scrollBehavior,
		});
	}, 0);
		// TODO:
		//	① better way to detect did mount
		//	② use ref instead of ref, eg. refs.current[id].current.scrollIntoView(...);
}

/* Curr Case In View */
const caseInViewContext = createContext(null);
const dispatchCaseInViewContext = createContext(null);
function caseInViewReducer (currState, caseInViewAction) {
	switch (caseInViewAction.type) {
		case "restoreCurrCase": {
			if (currState.curr) { scrollTo(currState.curr, "auto", false); }
			return currState;
		}
		case "changeByScroll": {
			var newState = {...currState};
			newState.curr = caseInViewAction.currCase;
			return newState;
		}
		case "observerChingLing": {
			var newState = {...currState};
			newState.observer[caseInViewAction.caseName] = caseInViewAction.caseInViewState;
			return newState;
		}
		default: {
			console.error("Curr case in view error. Received caseInViewAction:", caseInViewAction);
		}
	}
}

/* Sort-By Mode and Secondary Sections */
const sortByContext = createContext(null);
const dispatchSortByContext = createContext(null);
function sortByReducer (currState, sortByAction) {
	switch (sortByAction.type) {
		case "toggle": {
			var newState = {...currState};
			newState.mode = !currState.mode;
			return newState;
		}
		case "changeSecondaryByScroll": {
			var newState = {...currState};
			newState.secondary[currState.mode==true ? 0 : 1].curr = sortByAction.currSection;
			return newState;
		}
		case "changeSecondaryByClick": {
			scrollTo(currState.secondary[currState.mode==true ? 0 : 1].content[sortByAction.toSection][0]);
			return currState;
		}
		case "observerChingLing": {
			var newState = {...currState};
			newState.secondary[currState.mode==true ? 0 : 1].observer[sortByAction.sectionIdx] = sortByAction.sectionInViewState;
			return newState;
		}
		// case "reset": {
		// 	return ({
		// 		...currState,
		// 		mode: false,
		// 		secondary: [0,0],
		// 	});
		// }
		// case "resetSecondary": {
		// 	return ({
		// 		...currState,
		// 		secondary: [0,0],
		// 	});
		// }
		default: {
			console.error("Error in sort-by mode toggle. Received sortByAction:", sortByAction);
		}
	}
}



export default function Home () {

	/* Sort-By Mode and Secondary Sections */
	// Sort-By Hook
		const [sortBy, dispatchSortBy] = useReducer(sortByReducer, {
			mode: false,	// true (left) = by Timeline, false (right) = by Category
			secondary: [
				{	// left
					content: casesByTimeline,
					refs: useRef(Array(casesByTimeline.length)),
					observer: Array(casesByTimeline.length).fill(false),
					curr: 0,
				},
				{	// right
					content: casesByCategory,
					refs: useRef(Array(casesByTimeline.length)),
					observer: Array(casesByTimeline.length).fill(false),
					curr: 0,
				},
			],
		});
	// Section Refs
		const createSectionRefs = (refs) => {
			for (let i = 0; i < refs.current.length; i++) {
				const currSectionRef = createRef();
				refs.current[i] = currSectionRef;
			}
		};
		useEffect(() => {
			createSectionRefs(sortBy.secondary[0].refs);
			createSectionRefs(sortBy.secondary[1].refs);
		}, []);
	// Sections Observers
		const observeSections = (observer, prevCurr) => {
			let newCurr = 0;
			for (let i = 0; i < observer.length; i++) {
				if (observer[i]==false) { newCurr++; }
				else {
					if (newCurr != prevCurr) { dispatchSortBy({type: "changeSecondaryByScroll", currSection: newCurr}); }
					return;
				}
			}
			if (prevCurr != 0) { dispatchSortBy({type: "changeSecondaryByScroll", currSection: 0}); }
		}
		useEffect(() => {
			observeSections(
				sortBy.secondary[sortBy.mode==true ? 0 : 1].observer,
				sortBy.secondary[sortBy.mode==true ? 0 : 1].curr
			);
		}, [sortBy]);
	// Debuggers
		// useEffect(() => { console.log("sortBy:", sortBy); }, [sortBy]);

	/* Curr Case In View */
	// Useful variables
		const numCases = casesNames.length;
		const [sections, setSections] = useState(sortBy.secondary[sortBy.mode==true ? 0 : 1].content);
		useEffect(() => {
			setSections(sortBy.secondary[sortBy.mode==true ? 0 : 1].content);
		}, [sortBy]);
	// Curr Case Hook
		const [caseInView, dispatchCaseInView] = useReducer(caseInViewReducer, {
			refs: useRef({}),
			//refs: useRef(Array(casesByTimeline.length)),
			observer: Array(casesByTimeline.length).fill(false),
			curr: null,
		});
	// Case Refs
		const createCaseRefs = (refs) => {
			for (let i = 0; i < numCases; i++) {
				const currCaseRef = createRef();
				refs.current[casesNames[i]] = currCaseRef;
				//refs.current[i] = currCaseRef;
			}
		};
		useEffect(() => {
			createCaseRefs(caseInView.refs);
		}, []);
	// Cases Observers
		const caseAPrecedesB = (caseA, caseB) => {
			//console.log(caseA, "precedes", caseB, "?");
			for (let i = 0; i < sections.length; i++) {
				for (let j = 0; j < sections[i][1].length; j++) {
					if (sections[i][1][j] == caseA) { /*console.log("yes");*/return true; }
					else if (sections[i][1][j] == caseB) { /*console.log("nah");*/return false; }
					else { continue; }
				}
			}
		}
		const observeCases = (observer, prevCurr) => {
			let newCurr = null;
			for (let i = 0; i < numCases; i++) {
				if (observer[casesNames[i]]==false) { continue; }
				else {
					if (newCurr == null || caseAPrecedesB(casesNames[i], newCurr)) {
						newCurr = casesNames[i];
					}
				}
			}
			if (newCurr != prevCurr) { dispatchCaseInView({type: "changeByScroll", currCase: newCurr}); }
		}
		useEffect(() => {
			observeCases(caseInView.observer, caseInView.curr);
		}, [caseInView]);
	// Debuggers
		// useEffect(() => { console.log("sections:", sections); }, [sections]);
		// useEffect(() => { console.log("caseInView:", caseInView); }, [caseInView]);

	/* Hero Section In View */
	const [heroInView, setHeroInView] = useState(true);

	/* Render */
	return (
		<div className="home">
				<Hero
					inViewSetter={setHeroInView}
				/>
			<sortByContext.Provider value={sortBy}>
			<dispatchSortByContext.Provider value={dispatchSortBy}>
			<caseInViewContext.Provider value={caseInView}>
			<dispatchCaseInViewContext.Provider value={dispatchCaseInView}>
				<ControlBar
					departed={!heroInView}
				/>
				<Cases />
			</dispatchCaseInViewContext.Provider>
			</caseInViewContext.Provider>
			</dispatchSortByContext.Provider>
			</sortByContext.Provider>
				{/*<Thanks />	TODO*/}
		</div>
	);
}



/* Home Section Styler Wrapper Component */
function HomeSection ({children, homeSectionId, className, style}) {
	return (
		<div className={className} style={style}>
			<svg xmlns="http://www.w3.org/2000/svg" className="home-section-bg-canvas">
				<defs><clipPath id={"home-section-bg-clipper-"+homeSectionId}>
					<rect className="home-section-bg-clipper" />
				</clipPath></defs>
				<foreignObject
					className="home-section-bg-container"
					clipPath={"url(#home-section-bg-clipper-"+homeSectionId+")"}
					width="100%" height="100%"
				>
					<div className="home-section-bg"></div>
					{children[1]	/* clipped in bg */}
				</foreignObject>
			</svg>
			<div className="home-section-fg-container">
				{children[0]	/* floating in fg */}
			</div>
		</div>
	);
}

function Hero ({inViewSetter}) {

	/* Proper Greeting According To Time */
	const getInTimeGreeting = () => {
		var curHr = new Date().getHours();
		if (curHr < 12) { return (<>Morning! <Emoji>😎</Emoji></>); }
		else if (curHr < 18) { return (<>Good afternoon! <Emoji>🌼</Emoji></>); }
		else { return (<>Good evening <Emoji>✨</Emoji></>); }
	};
	const inTimeGreeting = getInTimeGreeting();

	/* Hero In View Observer */
	const heroRef = useRef(null);
	const [heroInView, heroInViewRef] = useIsInViewport({
		target: heroRef,
		threshold: 0,
	});
	useEffect (() => {
		inViewSetter(heroInView);
	}, [heroInView]);

	/* Render */
	return (
		<div ref={heroInViewRef}>
			<HomeSection
				homeSectionId="home-hero"
				className="home-hero"
			>
				<>
					<div className="home-hero-mypic-container">
						<img
							className="home-hero-mypic home-hero-mypic-1"
							src={images.home.hero.mypic1}
							alt=""
						/>
						<img
							className="home-hero-mypic home-hero-mypic-2"
							src={images.home.hero.mypic2}
							alt="A Photo Of Me"
						/>
					</div>
					<div className="home-hero-selfintro-container">
						<div className="home-hero-selfintro">
							<div className="home-hero-contacts-container">
								<div className="home-hero-selfintro-body">{inTimeGreeting} You found my little cabin on the internet!</div>
								<div className="home-hero-contacts">
									<HeroContactBtn btnContent="resume" />
									<HeroContactBtn btnContent="email" />
									<HeroContactBtn btnContent="instagram" />
									<HeroContactBtn btnContent="linkedin" />
								</div>
							</div>
							<div className="home-hero-selfintro-name-container">
								<HeroName />
								<div className="home-hero-selfintro-title">
									UX/UI Designer + Frontend Developer
								</div>
							</div>
							<div className="home-hero-selfintro-body">
								I design for social good, and I believe practice makes perfect.
								<br/>Walking on the path toward being a full-stack designer.
								<br/>This website is <A href="https://github.com/LingyeZhuang-Baozi/LingyeZhuang-Baozi.github.io/tree/master" target="_blank">hand-coded</A> with React.js and <Emoji>💛</Emoji>.
							</div>
						</div>
						<div className="home-hero-objects-placeholder"></div>
					</div>
				</>
				<>
					<HeroObjects />
				</>
			</HomeSection>
		</div>
	);
}

function HeroName () {

	/* Name */
	const firstName = "Juliet";
	const lastName = "Zhuang";

	/* Render */
	return (
		<div className="home-hero-selfintro-name">
			<div className="home-hero-selfintro-name-chargroup">{
				firstName.split("").map((c, i) =>
					<HeroNameChar key={i} char={c} />
				)
			}</div>
			<div className="home-hero-selfintro-name-chargroup">{
				lastName.split("").map((c, i) =>
					<HeroNameChar key={i} char={c} />
				)
			}</div>
		</div>
	);
}

function HeroNameChar ({char}) {

	/* Render */
	return (
		<span className="home-hero-selfintro-name-char">
			{char}
		</span>
	);
}

function HeroContactBtn ({btnContent}) {

	const btnInfo = btns.home.hero.contacts[btnContent];

	/* Cursor */
	const dispatchCursorType = useContext(dispatchCursorTypeContext);

	/* Hover Handler */
	const [hovering, setHovering] = useState(false);
	const hoverStarts = (e) => {
		e.preventDefault();
		dispatchCursorType({type: "pointer"});
		setHovering(true);
	}
	const hoverEnds = (e) => {
		e.preventDefault();
		dispatchCursorType({type: "default"});
		setHovering(false);
	}

	/* Render */
	return (
		<div className="home-hero-contacts-button-container">
			<a
				className="home-hero-contacts-button-link ghost"
				href={btnInfo.url}
				target="_blank"
			>
				<div
					className="home-hero-contacts-button"
					onMouseEnter={hoverStarts}
					onMouseOver={hoverStarts}
					onMouseLeave={hoverEnds}
				>
					{btnInfo.icon}
				</div>
			</a>
			<img
				className={
					"home-hero-contacts-button-hintblob " +
					(hovering==true ? "hintblob-shown" : "")
				}
				style={{"--hintblob-left": btnInfo.hintblob.left+"px", "--hintblob-top": btnInfo.hintblob.top+"px"}}
				src={btnInfo.hintblob.blob}
				alt=""
			/>
		</div>
	);
}

function HeroObjects () {

	const objects = casesGoats;

	/* Hover Handler */
	const [hoveredIdx, setHoveredIdx] = useState(-1);	// -1 = none
	const [hoveringObjects, setHoveringObjects] = useState(false);
	const getHoverState = (idx) => {
		if (hoveredIdx < 0) { return 0; }
		else if (hoveredIdx === idx) { return 1; }
		else { return 2; }
	}
	const hoverObjectStarts = (idx) => {
		setHoveringObjects(true);
		setHoveredIdx(idx);
	};
	const hoverObjectEnds = () => { setHoveredIdx(-1); }
	const hoverObjectsEnds = (e) => {
		e.preventDefault();
		setHoveringObjects(false);
	}

	/* Render */
	return (
		<div
			className="home-hero-objects"
			onMouseLeave={hoverObjectsEnds}
		>
			{objects.map((object, idx) =>
				<HeroObject
					key={idx}
					object={object}
					hoverState={ getHoverState(idx) }
					hoverStarted={() => { hoverObjectStarts(idx); }}
					hoverEnded={() => { hoverObjectEnds(); }}
				/>
			)}
			<AskMyCaseStudies
				className={
					"home-hero-objects-hintblob " +
					((hoveredIdx < 0 && hoveringObjects == false) ? "hintblob-shown" : "")
				}
			/>
		</div>
	);
}

function HeroObject ({object, hoverState, hoverStarted, hoverEnded}) {	// hoverState: 0 = default, 1 = curr, 2 = noncurr

	//const objectContent = cases[object];

	/* Cursor */
	const dispatchCursorType = useContext(dispatchCursorTypeContext);

	/* Hover Handler */
	const hoverStarts = (e) => {
		e.preventDefault();
		dispatchCursorType({type: "pointer"});
		hoverStarted();
	}
	const hoverEnds = (e) => {
		e.preventDefault();
		dispatchCursorType({type: "default"});
		hoverEnded();
	}

	/* Render */
	return (
		<div
			className={
				"home-hero-object-container " +
				(hoverState===1 ? "curr" : "") + " " +
				(hoverState===2 ? "noncurr" : "")
			}
			onMouseEnter={hoverStarts}
			onMouseOver={hoverStarts}
			onMouseLeave={hoverEnds}
		>
			<div className="object">
				<ObjectRandom />
			</div>
		</div>
	);
}



function ControlBar ({departed}) {

	/* Mode Switch 1: Light-dark Mode */
	const currMode = useContext(modeContext);
	const dispatchMode = useContext(dispatchModeContext);
	const modeUpdateHandler = () => {
		dispatchMode({type: "toggle"});
	}

	/* Mode Switch 2: Language */
	const currLanguage = useContext(languageContext);
	const dispatchLanguage = useContext(dispatchLanguageContext);
	const languageUpdateHandler = () => {
		dispatchLanguage({type: "toggle"});
	}

	/* Sort-By Mode and Secondary Sections */
	// Sort-by Toggle
	const currSortBy = useContext(sortByContext);
	const {mode: currSortByMode, secondary: currSortBySecondaries} = currSortBy;
	const dispatchSortBy = useContext(dispatchSortByContext);
	const caseInView = useContext(caseInViewContext);
	const dispatchCaseInView = useContext(dispatchCaseInViewContext);
	const sortByTogglerUpdateHandler = (e) => {
		e.preventDefault();
		dispatchSortBy({type: "toggle"});
		dispatchCaseInView({type: "restoreCurrCase"});
	}
	// Secondary Tabs
	const [newlyClickedSecondary, setNewlyClickedSecondary] = useState(-1);	// -1 = secondary is not changing by click just now
	const sortBySecondaryUpdateHandler = (newCurr) => {
		setNewlyClickedSecondary(newCurr);
		dispatchSortBy({type: "changeSecondaryByClick", toSection: newCurr});
	}
	useEffect(() => {
		if (newlyClickedSecondary >= 0) {
			setTimeout(() => { setNewlyClickedSecondary(-1); }, 1000);	// 1s
		}
	}, [newlyClickedSecondary]);

	/* Render */
	return (
		<div className="home-control">
			<div className="home-control-leftgroup">
				<ControlBarToggle
					btnContent="sortby"
					togglerCurr={currSortByMode}
					togglerUpdateHandler={sortByTogglerUpdateHandler}
					secondaries={currSortBySecondaries}
					secondaryUpdateHandler={sortBySecondaryUpdateHandler}
					newlyClickedSecondary={newlyClickedSecondary}
				/>
			</div>
			<div className="home-control-rightgroup">
				<div className="home-control-rightgroup-subgroup">
					<ControlBarSwitch
						btnContent="mode"
						curr={currMode.mode}
						updateHandler={modeUpdateHandler}
					/>
					<ControlBarSwitch
						btnContent="language"
						curr={currLanguage}
						updateHandler={languageUpdateHandler}
					/>
					{departed == true ?
						<ControlBarButton
							btnContent="totop"
							clickHandler={() => { window.scrollTo(0,0); }}
							itchClass="home-control-btn-totop-itching"
						/>
					: null }
				</div>
				{departed == true ?
					<div className="home-control-rightgroup-subgroup">
						<ControlBarButton
							btnContent="resume"
						/>
						<ControlBarExpandable
							btnContent="contacts"
						/>
					</div>
				: null }
			</div>
		</div>
	);
}

function ControlBarButton ({btnContent, clickHandler=undefined, itchClass=""}) {

	const btnInfo = btns.home.control.btn[btnContent];

	/* Cursor */
	const dispatchCursorType = useContext(dispatchCursorTypeContext);

	/* Hover Handler */
	const [hovered, setHovered] = useState(false);
	const hoverStarts = (e) => {
		e.preventDefault();
		if (hovered == false) {
			dispatchCursorType({type: "pointer"});
			setHovered(true);
			setTimeout (() => {
				setHovered(false);
			}, 280); // $home-control-btn-itching-transition time 270ms with a bit of extra
		}
	}

	/* Click Handler */
	const clicked = (e) => {
		if (clickHandler) {
			e.preventDefault();
			clickHandler();
		} else {
			window.open(btnInfo.url, '_blank');
		}
	}

	/* Render */
	return (
		<div
			className={
				"home-control-btn " +
				(itchClass != "" ?
					(hovered ? itchClass : "")
				:
					"home-control-btn-hover-default"
				)
			}
			onMouseEnter={hoverStarts}
			onMouseOver={() => {dispatchCursorType({type: "pointer"});}}
			onMouseLeave={() => {dispatchCursorType({type: "default"});}}
			onClick={clicked}
		>
			{btnInfo.icon}
		</div>
	);
}

function ControlBarToggle ({btnContent, togglerCurr, togglerUpdateHandler, secondaries, secondaryUpdateHandler, newlyClickedSecondary}) {	// togglerCurr: true = toggle to left, false = toggle to right

	const toggleInfo = btns.home.control.toggler[btnContent];
	const toggleSecondary = (togglerCurr==true ? secondaries[0] : secondaries[1]);

	/* Cursor */
	const dispatchCursorType = useContext(dispatchCursorTypeContext);

	/* Toggler Handler */
	const [hoveredTogglerChanging, setHoveredTogglerChanging] = useState(false);
	const [triggeredTogglerChanging, setTriggeredTogglerChanging] = useState(false);
	const togglerHoverStarts = (e) => {
		e.preventDefault();
		if (hoveredTogglerChanging == false && triggeredTogglerChanging == false) {
			dispatchCursorType({type: "pointer"});
			setHoveredTogglerChanging(true);
			setTimeout (() => {
				setHoveredTogglerChanging(false);
			}, 280); // $home-control-btn-itching-transition time 270ms with a bit of extra
		}
	}
	const togglerChangeTriggered = (e) => {
		e.preventDefault();
		if (triggeredTogglerChanging == false) {
			setTriggeredTogglerChanging(true);
			setHoveredTogglerChanging(false);
			togglerUpdateHandler(e);
			setTimeout (() => {
				setTriggeredTogglerChanging(false);
			}, 145); // cooling-off period before next trigger, $time-s 135ms with a bit of extra
		}
	}

	/* Secondary Handler */
	// Hover effect is handled by CSS.
	const secondaryChangeTriggered = (e, newCurr) => {
		e.preventDefault();
		secondaryUpdateHandler(newCurr);
	}

	/* Render */
	return (
		<div className="home-control-toggle">
			<div
				className={
					"home-control-toggler " +
					"home-control-toggler-" + (togglerCurr==true ? "left" : "right") + " " +
					(hoveredTogglerChanging ? "home-control-toggler-itching" : "")
				}
				onMouseEnter={togglerHoverStarts}
				onMouseOver={() => {dispatchCursorType({type: "pointer"});}}
				onMouseLeave={() => {dispatchCursorType({type: "default"});}}
				onClick={togglerChangeTriggered}
			>
				{toggleInfo.bg}
				{toggleInfo.fg}
			</div>
			<div className="home-control-toggle-secondary">
				{toggleSecondary.content.map((tab, idx) =>
					<ControlBarToggleSecondaryTab
						key={idx}
						tabContent={tab[0]}
						curr={
							newlyClickedSecondary===idx
							|| (newlyClickedSecondary<0 && toggleSecondary.curr===idx)
						}
						updateHandler={(e) => { secondaryChangeTriggered(e, idx); }}
					/>
				)}
			</div>
		</div>
	);
}

function ControlBarToggleSecondaryTab ({tabContent, curr, updateHandler}) {

	/* Cursor */
	const dispatchCursorType = useContext(dispatchCursorTypeContext);
	const hoverStarts = (e) => {
		e.preventDefault();
		dispatchCursorType({type: "pointer"});
	}
	const hoverEnds = (e) => {
		e.preventDefault();
		dispatchCursorType({type: "default"});
	}

	/* Render */
	return (
		// <Link	//TODO!!!
		// 	to={"/#" + tabContent}
		// >
			<div
				className={
					"home-control-toggle-secondary-tab " +
					(curr==true ? "home-control-toggle-secondary-tab-curr" : "")
				}
				onMouseEnter={hoverStarts}
				onMouseOver={hoverStarts}
				onMouseLeave={hoverEnds}
				onClick={updateHandler}
			>
				{tabContent}
			</div>
		// </Link>
	);
}

function ControlBarSwitch ({btnContent, curr, updateHandler}) {	// curr: true = circle fg left, false = circle fg right

	const switchIcons = btns.home.control.switch[btnContent];

	/* Cursor */
	const dispatchCursorType = useContext(dispatchCursorTypeContext);

	/* Switch Handler */
	const [hoveredChanging, setHoveredChanging] = useState(false);
	const [triggeredChanging, setTriggeredChanging] = useState(false);
	const hoverStarts = (e) => {
		e.preventDefault();
		if (hoveredChanging == false && triggeredChanging == false) {
			dispatchCursorType({type: "pointer"});
			setHoveredChanging(true);
			setTimeout (() => {
				setHoveredChanging(false);
			}, 280); // $home-control-btn-itching-transition time 270ms with a bit of extra
		}
	}
	const changeTriggered = (e) => {
		e.preventDefault();
		if (triggeredChanging == false) {
			setTriggeredChanging(true);
			setHoveredChanging(false);
			updateHandler();
			setTimeout (() => {
				setTriggeredChanging(false);
			}, 145); // cooling-off period before next trigger, $time-s 135ms with a bit of extra
		}
	}

	/* Render */
	return (
		<div
			className={
				"home-control-switch " +
				"home-control-switch-" + (curr==true ? "left" : "right") + " " +
				(hoveredChanging ? "home-control-switch-itching" : "")
			}
			onMouseEnter={hoverStarts}
			onMouseOver={() => {dispatchCursorType({type: "pointer"});}}
			onMouseLeave={() => {dispatchCursorType({type: "default"});}}
			onClick={changeTriggered}
		>
			{switchIcons}
			<div className="home-control-switch-mask"></div>
		</div>
	);
}

function ControlBarExpandable ({btnContent}) {

	const expandableInfo = btns.home.control.expandable[btnContent];

	/* Expand Handler */
	const [hovered, setHovered] = useState(false);
	const [hoverJustEnded, setHoverJustEnded] = useState(false);
	const [expanded, setExpanded] = useState(false);
	const hoverStarts = (e) => {
		e.preventDefault();
		setHovered(true);
	}
	const hoverEnds = (e) => {
		e.preventDefault();
		setHovered(false);
		setHoverJustEnded(true);
	}
	useEffect(() => {
		if (hoverJustEnded == true) {
			setTimeout (() => {
				if (hovered == false) {
					setHoverJustEnded(false);
				}
			}, 2010); // 2s with a bit of extra
		}
	}, [hoverJustEnded])
	useEffect(() => {
		if (hovered == true || hoverJustEnded == true) {
			setExpanded(true);
		} else {
			setExpanded(false);
		}
	}, [hovered, hoverJustEnded])

	/* Render */
	return (
		<div
			className={
				"home-control-expandable " +
				(expanded == true ? "home-control-expandable-expanded" : "")
			}
			style={{"--num-duckling": expandableInfo[1].length}}
			onMouseEnter={hoverStarts}
			onMouseOver={hoverStarts}
			onMouseLeave={hoverEnds}
		>
			<div className="home-control-expandable-icons">
				<div className="home-control-expandable-motherduck">
					{expandableInfo[0]}
				</div>
				{expandableInfo[1].map((duckling, idx) =>
					<ControlBarButton
						key={idx}
						btnContent={duckling}
					/>
				)}
			</div>
		</div>
	);
}



function Cases () {

	/* Sort-By Mode */
	const sortBy = useContext(sortByContext);
	const dispatchSortBy = useContext(dispatchSortByContext);
	const sections = sortBy.secondary[sortBy.mode==true ? 0 : 1].content;

	/* Curr Section In View */
	const sectionInViewStateSetter = (idx, state) => {
		dispatchSortBy({type: "observerChingLing", sectionIdx: idx, sectionInViewState: state});
	}

	/* Render */
	return (
		<div className="home-cases">
			{sections.map((section, idx) =>
				<CasesSection
					key={section[0]}
					sectionContent={section}
					sectionRef={sortBy.secondary[sortBy.mode==true ? 0 : 1].refs.current[idx]}
					sectionInViewStateSetter={(state) => { sectionInViewStateSetter(idx, state); }}
				/>
			)}
		</div>
	);
}

function CasesSection ({sectionContent, sectionRef, sectionInViewStateSetter}) {	// sectionContent: [0] title, [1] content, [2] bullet, [3] caption

	/* Curr Section In View */
	// Content
	const [contentIsInView, sectionContentRef] = useIsInViewport({
		target: sectionRef,
		threshold: 0,
		modTop: ("-" + (window.innerHeight/2 - 160) + "px"),
			// $home-cases-section-title-bullet-size 160px, the section title should be above the horizontal middle line for the current section to be considered as the top visible one
	});
	useEffect (() => {
		sectionInViewStateSetter(contentIsInView);
	}, [contentIsInView]);
	// Title
	const titleRef = useRef(null);
	const [titleAllInView, sectionTitleRef] = useIsInViewport({
		target: titleRef,
		threshold: 100,
		modTop: ("-" + (controlBarHeight - 8) + "px"),	// leave a bit of room for error
	});

	/* Curr Case In View */
	const caseInView = useContext(caseInViewContext);
	const dispatchCaseInView = useContext(dispatchCaseInViewContext);
	const caseInViewStateSetter = (caseName, state) => {
		dispatchCaseInView({type: "observerChingLing", caseName: caseName, caseInViewState: state});
	}

	/* Render */
	return (
		<div
			ref={sectionContentRef}
			id={idCreator(sectionContent[0])}
			className="home-cases-section"
		>
			<div
				ref={sectionTitleRef}
				className={
					"home-cases-section-title-container " +
					(titleAllInView==true ? "home-cases-section-title-inview" : "")
				}
			>
				{sectionContent.length >= 3 ?
					sectionContent[2]
				:
					<div className="home-cases-section-title-bullet-placeholder"></div>
				}
				<div className="home-cases-section-title">
					{sectionContent[0]}
					{sectionContent.length >= 4 ?
						<div className="home-cases-section-title-caption">{sectionContent[3]}</div>
					: null }
				</div>
			</div>
			<div className="home-cases-section-content">
				{sectionContent[1].map((caseName, idx) =>
					<CaseCard
						key={caseName}
						caseId={caseName}
						caseRef={caseInView.refs[caseName]}
						caseInViewStateSetter={(state) => { caseInViewStateSetter(caseName, state); }}
					/>
				)}
			</div>
		</div>
	);
}

function CaseCard ({caseId, caseRef, caseInViewStateSetter}) {

	const caseContent = cases[caseId];

	/* Curr Case In View */
	const caseInView = useContext(caseInViewContext);
	// Active
	const [isInView, caseActiveRef] = useIsInViewport({
		target: caseRef,
		threshold: 100,
		modTop: ("-" + (controlBarHeight - 0) + "px"),	// $case-card-title-height 0px
		modBottom: ((window.innerHeight) + "px"),	// leaving space for longer cards
	});
	useEffect (() => {
		caseInViewStateSetter(isInView);
	}, [isInView]);
	// Bench
	const [isInViewport, caseBenchRef] = useIsInViewport({
		target: caseRef,
		threshold: 0,
		modTop: ("-" + (controlBarHeight - 0) + "px"),
	});

	/* Styling Helper */
	const [inViewStage, setInViewStage] = useState(0);	// 0 = off bench, 1 = on bench before ever activated, 2 = active, 3 = on banch after activated
	useEffect(() => {
		if (isInViewport == true) {
			if (caseInView.curr == caseId) {
				setInViewStage(2);
			} else {
				if (inViewStage === 0) {
					setInViewStage(1);
				} else if (inViewStage === 2) {
					setInViewStage(3);
				}
			}
		} else {
			setInViewStage(0);
		}
	}, [isInViewport, caseInView]);
	const [inViewStageClass, setInViewStageClass] = useState("");
	const inViewStageClassSwitch = [
		"",
		"home-section-bench",
		"home-section-active",
		"home-section-substituted",
	];
	useEffect(() => {
		if (inViewStage < 0 || inViewStage > 3) {
			console.error("Error during assigning of in-view-stage-classes. caseId:", caseId, ", inViewStage:", inViewStage);
			setInViewStageClass("");
		}
		var classList = "";
		for (let s = 0; s < 4; s++) {
			if (inViewStage >= s) {
				classList += inViewStageClassSwitch[s] + " ";
			} else {
				break;
			}
		}
		setInViewStageClass(classList);
	}, [inViewStage]);

	/* Render */
	return (
		<div
			ref={(el) => { caseActiveRef(el); caseBenchRef(el); }}
			id={idCreator(caseId)}
		>
			<HomeSection
				homeSectionId={caseId}
				className={"home-case " + inViewStageClass}
				style={(caseContent.theme.color ? {
					"--theme-bgcolor-light": caseContent.theme.color[0],
					"--theme-title-color-light": caseContent.theme.color[1],
					"--theme-bgcolor-dark": caseContent.theme.color[2],
					"--theme-title-color-dark": caseContent.theme.color[3],
				} : {})}
			>
				<>
					<div className="home-case-img-container">
						<img
							className="home-case-img"
							src={caseContent.thumbnail.img}
							alt={"case thumbnail of " + caseContent.title}
						/>	{/* TODO: enable pausing gif when inactive */}
					</div>
					<div className="home-case-text-container">
						<div className="home-case-title">
							{caseContent.title}
						</div>
						<div className="home-case-bio">
							<div className="home-case-bio-item">{
								caseContent.bio[1]//role
							}</div>
							<div className="home-case-bio-item">{
								caseContent.bio[2]//duration
							}</div>
						</div>
						<div className="home-case-brief">
							{caseContent.thumbnail.brief}
						</div>
					</div>
				</>
				<>
					<CaseObject />
				</>
			</HomeSection>
		</div>
	);
}

function CaseObject () {
	return (<></>);	//TODO!
}
