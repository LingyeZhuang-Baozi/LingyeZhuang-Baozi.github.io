import React, { Fragment, useState, useEffect, useReducer, createContext, useContext, createRef, useRef } from 'react';
import { Link, useNavigate, useLocation } from "react-router-dom";
//import { HashLink } from 'react-router-hash-link';

import './Home.scss';

/* Foreign Components */
import { btns, /*images*/ } from './assets.js';
import { cases, casesNames, casesGoats, casesByCategory, casesByTimeline } from './cases.js';
import { modeContext, dispatchModeContext, languageContext, dispatchLanguageContext, getLanguageIdContext, cursorTypeContext, dispatchCursorTypeContext, isScrollingContext } from './App.js';
import { ControlBtn, ControlToggle, ControlSwitch, ControlExpandable, A, Emoji, Img } from "./components.js";

/* Important Assets */
import { ReactComponent as AskMyCaseStudies } from "./assets/basic/hintblobs/ask_my_case_studies.svg";
import { ReactComponent as AnonymousObject } from "./assets/cases/_case/_anonymous.svg";
import MyPicWebp1 from "./assets/basic/me/me-1.webp";	import MyPicWebp2 from "./assets/basic/me/me-2.webp";	import MyPicJpg1 from "./assets/basic/me/me-1.jpg";	import MyPicJpg2 from "./assets/basic/me/me-2.jpg";

/* Libraries */
import useIsInViewport from "use-is-in-viewport";
import { isSafari, isIE } from "react-device-detect";
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
			scrollTo(currState.secondary[currState.mode==true ? 0 : 1].content[sortByAction.toSection].title[0]);
			return currState;
		}
		case "observerChingLing": {
			var newState = {...currState};
			newState.secondary[currState.mode==true ? 0 : 1].observer[sortByAction.sectionIdx] = sortByAction.sectionInViewState;
			return newState;
		}
		default: {
			console.error("Error in sort-by mode toggle. Received sortByAction:", sortByAction);
		}
	}
}



export default function Home () {

	/* Restore Scroll */
	const location = useLocation();
	useEffect(() => {
		window.scrollTo(0, 0);
	}, [location.pathname]);

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
			let newCurr = observer.findIndex(item => item==true);
			if (newCurr === -1) { newCurr = 0; }
			if (newCurr != prevCurr) { dispatchSortBy({type: "changeSecondaryByScroll", currSection: newCurr}); }
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
			for (let i = 0; i < sections.length; i++) {
				for (let j = 0; j < sections[i].cases.length; j++) {
					if (sections[i].cases[j] == caseA) { return true; }
					else if (sections[i].cases[j] == caseB) { return false; }
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

	/* Reset Cursor */
	const dispatchCursorType = useContext(dispatchCursorTypeContext);
	useEffect(() => {
		dispatchCursorType({type: "default"});
	}, []);

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
				<Thanks />
		</div>
	);
}



/* Home Section Styler Wrapper Components */

function HomeSection ({children, homeSectionId, className, style}) {

	/* Render */
	return (
		<div className={className} style={style} id={homeSectionId}>
			<div className="home-section-bg-canvas">
				<div className="home-section-bg-container">
					<div className="home-section-bg"></div>
					{children[1]	/* clipped in bg */}
				</div>
			</div>
			<div className="home-section-fg-container">
				{children[0]	/* floating in fg */}
			</div>
		</div>
	);
}

function HomeSectionFancy ({children, homeSectionId, className, style}) {

	/* Render */
	if (isSafari||isIE) {
		return (
			<HomeSection
				children={children}
				homeSectionId={homeSectionId}
				className={className}
				style={style}
			/>
		);
	} else {
		return (
			<div className={"home-section-fancy " + className} style={style}>
				<div className="home-section-bg-canvas">
					<div
						className="home-section-bg-container"
						style={{"clipPath": "url(#home-section-bg-clipper-"+homeSectionId+")"}}
						width="100%" height="100%"
					>
						<svg className="home-section-bg-clipper-container">
							<defs><clipPath id={"home-section-bg-clipper-"+homeSectionId}>
								<rect className="home-section-bg-clipper" />
							</clipPath></defs>
						</svg>
						<div className="home-section-bg"></div>
						{children[1]	/* clipped in bg */}
					</div>
				</div>
				<div className="home-section-fg-container">
					{children[0]	/* floating in fg */}
				</div>
			</div>
		);
	}
}



function Hero ({inViewSetter}) {

	/* Language */
	//const language = useContext(languageContext);	// TODO: wechat contact, QR code?
	const getLanguageId = useContext(getLanguageIdContext);

	/* Switch Content According To Hovered Object */
	const goatsContent = casesGoats.map(caseId => cases[caseId]);
	const [hoveringObjects, setHoveringObjects] = useState(false);
	const [hoveredIdx, setHoveredIdx] = useState(-1);	// -1 = none
	const [shownFg, setShownFg] = useState(-1);	// -1 = hero
	const getHoverState = (idx) => {
		if (hoveredIdx < 0) { return 0; }
		else if (hoveredIdx === idx) { return 1; }
		else { return 2; }
	}
	const hoverObjectStarts = (idx) => {
		setHoveringObjects(true);
		setHoveredIdx(idx);
	};
	const hoverObjectEnds = () => {
		setHoveredIdx(-1);
	}
	const hoverObjectsEnds = (e) => {
		e.preventDefault();
		setHoveringObjects(false);
	}
	useEffect(() => {
		if (hoveringObjects == false) {
			setShownFg(-1);
		} else {
			if (hoveredIdx >= 0) {
				setShownFg(hoveredIdx);
			}
		}
	}, [hoveringObjects, hoveredIdx]);

	/* Proper Content According To Time And Language */
	const getGreeting = () => {
		var curHr = new Date().getHours();
		var inTimeGreeting;
		if (getLanguageId() == "en") {
			if (curHr < 4) { inTimeGreeting = <>Hey! My night owl buddy <Emoji>🦉</Emoji></>; }
			else if (curHr < 12) { inTimeGreeting = <>Morning! <Emoji>😎</Emoji></>; }
			else if (curHr < 18) { inTimeGreeting = <>Good afternoon! <Emoji>🌼</Emoji></>; }
			else { inTimeGreeting = <>Good evening <Emoji>✨</Emoji></>; }
			return (<>{inTimeGreeting} You found my little cabin on the internet!</>);
		} else {
			if (curHr < 4) { inTimeGreeting = <>欢迎你！我的夜猫子同伴 <Emoji>🦉</Emoji></>; }
			else if (curHr < 12) { inTimeGreeting = <>早上好！<Emoji>😎</Emoji></>; }
			else if (curHr < 18) { inTimeGreeting = <>幸会！<Emoji>🌼</Emoji></>; }
			else { inTimeGreeting = <>晚上好 <Emoji>✨</Emoji></>; }
			return (<>{inTimeGreeting} 我是：</>);
		}
	};
	const heroGreeting = getGreeting();
	const heroTitles = getLanguageId() == "en" ?
		<>UX/UI Designer + Frontend Developer</>
	:
		<>设计 / 编程 / 插画 的斜杠青年</>
	;
	const heroSelfIntro = getLanguageId() == "en" ?
		<>
			I design for social good, and I believe practice makes perfect.
			<br/>Walking on the path toward being a full-stack designer.
			<br/>This website is <A href="https://github.com/LingyeZhuang-Baozi/LingyeZhuang-Baozi.github.io/tree/master">hand-coded</A> with React.js and <Emoji>💛</Emoji>.
		</>
	:
		<>
			脚踏实地，勤于自学，好奇心和社会责任感是我的内驱力。
			<br/>目标成为既能设计也会实现的全栈设计师。
			<br/>本作品集网站由本人原创设计并<A href="https://github.com/LingyeZhuang-Baozi/LingyeZhuang-Baozi.github.io/tree/master">独立开发</A>，希望你能喜欢 <Emoji>💛</Emoji>。
		</>
	;

	/* Hero In View Observer */
	const heroRef = useRef(null);
	const [heroInView, heroInViewRef] = useIsInViewport({
		target: heroRef,
		threshold: 0,
		modTop: "-8px",	// give a bit of room for error
	});
	useEffect (() => {
		inViewSetter(heroInView);
	}, [heroInView]);

	/* Render */
	return (
		<div
			ref={heroInViewRef}
			className="home-hero-container"
			style={(shownFg >= 0 && goatsContent[shownFg].theme.color ? {
				"--theme-bgcolor-light": goatsContent[shownFg].theme.color[0],
				"--theme-bgcolor-dark": goatsContent[shownFg].theme.color[2],
			} : {})}
		>
			<HomeSectionFancy
				homeSectionId="home-hero"
				className="home-hero"
			>
				<>
					<div className={
						"home-hero-fg home-hero-fg-hero " +
						(shownFg < 0 ? "curr" : "")
					}>
						<div className="home-hero-mypic-container">
							<Img
								className="home-hero-mypic home-hero-mypic-1"
								srcWebp={MyPicWebp1}
								srcJpg={MyPicJpg1}
								alt=""
							/>
							<Img
								className="home-hero-mypic home-hero-mypic-2"
								srcWebp={MyPicWebp2}
								srcJpg={MyPicJpg2}
								alt="A Photo Of Me"
							/>
						</div>
						<div className="home-hero-selfintro-container">
							<div className="home-hero-selfintro">
								<div className="home-hero-contacts-container">
									<div className="home-hero-selfintro-body">{heroGreeting}</div>
									<div className="home-hero-contacts">
										<HeroContactBtn btnContent="resume" />
										<HeroContactBtn btnContent="email" />
										<HeroContactBtn btnContent="instagram" />
										<HeroContactBtn btnContent="linkedin" />
										{/*{language == false ? <HeroContactBtn btnContent="wechat" /> : null}*/}
									</div>
								</div>
								<div className="home-hero-selfintro-name-container">
									{ getLanguageId() == "en" ? <HeroNameEN /> : <HeroNameCN /> }
									<div className="home-hero-selfintro-title">{heroTitles}</div>
								</div>
								<div className="home-hero-selfintro-body">{heroSelfIntro}</div>
							</div>
							<div className="home-hero-objects-pillar"></div>
						</div>
					</div>
					{goatsContent.map((caseContent, idx) =>
						<div
							key={idx}
							className={
								"home-hero-fg home-hero-fg-cases " +
								(shownFg == idx ? "curr" : "")
							}
							style={(caseContent.theme.color ? {
								"--theme-title-color-light": caseContent.theme.color[1],
								"--theme-title-color-dark": caseContent.theme.color[3],
							} : {})}
						>
							<div className="home-hero-case-img-container">
								{caseContent[getLanguageId()].thumbnail.img ? caseContent[getLanguageId()].thumbnail.img : null}
							</div>
							<div className="home-hero-case-text-container">
								<div className="home-hero-case-title">
									{caseContent[getLanguageId()].title}
								</div>
								<div className="home-hero-case-bio-container">
									<div className="home-hero-case-bio">
										<div className="home-hero-case-bio-entry">
											<div className="home-hero-case-bio-entry-title">My Role:</div>
											{ caseContent[getLanguageId()].bio[1] }
										</div>
										<div className="home-hero-case-bio-entry">
											<div className="home-hero-case-bio-entry-title">Timeline:</div>
											{ caseContent[getLanguageId()].bio[2] }
										</div>
									</div>
									{/*<div className="home-hero-case-brief">
										{caseContent[getLanguageId()].thumbnail.brief.map((bullet, idx) =>
											<Fragment key={idx}>{bullet} </Fragment>
										)}
									</div>*/}
									<div className="home-hero-case-brief">
										<ul>
											{caseContent[getLanguageId()].thumbnail.brief.map((bullet, idx) =>
												<li key={idx}>{bullet}</li>
											)}
										</ul>
									</div>
								</div>
							</div>
						</div>
					)}
				</>
				<>
					<div
						className="home-hero-objects"
						onMouseLeave={hoverObjectsEnds}
					>
						{casesGoats.map((object, idx) =>
							<HeroObject
								key={idx}
								caseId={object}
								hoverState={ getHoverState(idx) }
								hoverStarted={() => { hoverObjectStarts(idx); }}
								hoverEnded={() => { hoverObjectEnds(); }}
							/>
						)}
						<AskMyCaseStudies
							className={
								"home-hero-objects-hintblob " +
								((hoveringObjects == false) ? "hintblob-shown" : "")
							}
						/>
					</div>
				</>
			</HomeSectionFancy>
		</div>
	);
}

function HeroNameEN () {

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

function HeroNameCN () {

	/* Name */
	const name = "庄令晔";

	/* Render */
	return (
		<div className="home-hero-selfintro-name">
			<div className="home-hero-selfintro-name-chargroup">{
				name.split("").map((c, i) =>
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
					"hintblob-left-top " +
					(hovering==true ? "hintblob-shown" : "")
				}
				style={{"--hintblob-left": btnInfo.hintblob.left+"px", "--hintblob-top": btnInfo.hintblob.top+"px"}}
				src={btnInfo.hintblob.blob}
				alt=""
			/>
		</div>
	);
}

function HeroObject ({caseId, hoverState, hoverStarted, hoverEnded}) {	// hoverState: 0 = default, 1 = curr, 2 = noncurr

	const caseContent = cases[caseId];

	/* Cursor */
	const dispatchCursorType = useContext(dispatchCursorTypeContext);

	/* Hover Handler */
	const hoverStarts = (e) => {
		e.preventDefault();
		dispatchCursorType({type: "readmore"});
		hoverStarted();
	}
	const hoverEnds = (e) => {
		e.preventDefault();
		dispatchCursorType({type: "default"});
		hoverEnded();
	}

	/* Render */
	return (
		<Link
			to={"/case-" + caseId}
			className={
				"home-hero-object-container ghost " +
				(hoverState===1 ? "curr" : "") + " " +
				(hoverState===2 ? "noncurr" : "")
			}
			style={(caseContent.theme.color ? {
				"--theme-title-color-light": caseContent.theme.color[1],
				"--theme-title-color-dark": caseContent.theme.color[3],
			} : {})}
			onMouseEnter={hoverStarts}
			onMouseOver={hoverStarts}
			onMouseLeave={hoverEnds}
		>
			{caseContent.theme.object}
		</Link>
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

	/* Cursor */
	const dispatchCursorType = useContext(dispatchCursorTypeContext);

	/* Render */
	return (
		<div className="home-control">
			<div className="control-leftgroup">
				<ControlBarToggle
					btnContent="sortby"
					togglerCurr={currSortByMode}
					togglerUpdateHandler={sortByTogglerUpdateHandler}
					secondaries={currSortBySecondaries}
					secondaryUpdateHandler={sortBySecondaryUpdateHandler}
					newlyClickedSecondary={newlyClickedSecondary}
				/>
			</div>
			<div className="control-rightgroup">
				<div className="control-rightgroup-subgroup">
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
						<ControlBarBtn
							btnContent="totop"
							clickHandler={() => {
								window.scrollTo({
									top: 0,
									left: 0,
									behavior: "smooth",
								});
								dispatchCursorType({type: "default"});
							}}
							itchClass="control-btn-totop-itching"
						/>
					: null }
				</div>
				{departed == true ?
					<div className="control-rightgroup-subgroup">
						<ControlBarBtn
							btnContent="resume"
							overflow={true}
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

function ControlBarBtn ({btnContent, overflow=false, clickHandler=undefined, itchClass="", hoveredObserver=undefined}) {

	/* Validate And Render */
	const content = btns.home.control.btn[btnContent];
	return (<>{content ?
		<ControlBtn
			btnContent={content}
			overflow={overflow}
			clickHandler={clickHandler}
			itchClass={itchClass}
			hoveredObserver={hoveredObserver}
		/>
	: null }</>);
}

function ControlBarToggle ({btnContent, togglerCurr, togglerUpdateHandler, secondaries, secondaryUpdateHandler, newlyClickedSecondary}) {	// togglerCurr: true = toggle to left, false = toggle to right

	/* Validate And Render */
	const content = btns.home.control.toggler[btnContent];
	return (<>{content ?
		<ControlToggle
			btnContent={content}
			togglerCurr={togglerCurr}
			togglerUpdateHandler={togglerUpdateHandler}
			secondaries={secondaries}
			secondaryUpdateHandler={secondaryUpdateHandler}
			newlyClickedSecondary={newlyClickedSecondary}
		/>
	: null }</>);
}

function ControlBarSwitch ({btnContent, curr, updateHandler}) {	// curr: true = circle fg left, false = circle fg right

	/* Validate And Render */
	const content = btns.home.control.switch[btnContent];
	return (<>{content ?
		<ControlSwitch
			btnContent={content}
			curr={curr}
			updateHandler={updateHandler}
		/>
	: null }</>);
}

function ControlBarExpandable ({btnContent}) {

	/* Validate And Render */
	const content = btns.home.control.expandable[btnContent];
	return (<>{content ?
		<ControlExpandable btnContent={content} />
	: null }</>);
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
		// <div className="home-cases-container">
		// 	<Thanks />
			<div className="home-cases">
				{sections.map((section, idx) =>
					<CasesSection
						key={section.title[0]}
						sectionContent={section}
						sectionRef={sortBy.secondary[sortBy.mode==true ? 0 : 1].refs.current[idx]}
						sectionInViewStateSetter={(state) => { sectionInViewStateSetter(idx, state); }}
					/>
				)}
			</div>
		// </div>
	);
}

function CasesSection ({sectionContent, sectionRef, sectionInViewStateSetter}) {	// sectionContent: title, subtitle, cases, bullet

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

	/* Language */
	const getLanguageId = useContext(getLanguageIdContext);

	/* Render */
	return (
		<div
			ref={sectionContentRef}
			id={idCreator(sectionContent.title[0])}
			className="home-cases-section"
		>
			<div
				ref={sectionTitleRef}
				className={
					"home-cases-section-title-container " +
					(titleAllInView==true ? "home-cases-section-title-inview" : "")
				}
			>
				{sectionContent.bullet ?
					sectionContent.bullet
				:
					<div className="home-cases-section-title-bullet-placeholder"></div>
				}
				<div className="home-cases-section-title">
					{sectionContent.title[(getLanguageId() == "en" ? 0 : 1)]}
					{sectionContent.subtitle ?
						<div className="home-cases-section-title-caption">
							{sectionContent.subtitle[(getLanguageId() == "en" ? 0 : 1)]}
						</div>
					: null }
				</div>
			</div>
			<div className="home-cases-section-content">
				{sectionContent.cases.map((caseName, idx) =>
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
	const ID = idCreator(caseId);

	/* Language */
	const getLanguageId = useContext(getLanguageIdContext);

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

	/* Click To Open Case */
	const [hoveringCase, setHoveringCase] = useState(false);
	const dispatchCursorType = useContext(dispatchCursorTypeContext);
	const isScrolling = useContext(isScrollingContext);
	const hoverStarts = (e) => {
		e.preventDefault();
		if (caseContent[getLanguageId()].content) {
			if (isScrolling == true) {
				dispatchCursorType({type: "pointer"});
			} else {
				dispatchCursorType({type: "readmore"});
			}
		} else {
			dispatchCursorType({type: "default"});
		}
		setHoveringCase(true);
	}
	const hoverEnds = (e) => {
		e.preventDefault();
		dispatchCursorType({type: "default"});
		setHoveringCase(false);
	}
	const navigate = useNavigate();
	const clickOpenCase = (e) => {
		e.preventDefault();
		if (caseContent[getLanguageId()].content) {
			navigate("/case-" + caseId);
		}
	}

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

	/* Pause Gif When Inactive */
	useEffect(() => {
		const thumbnailGifHtmlCollection = document.getElementById(ID).getElementsByTagName("video");
		if (thumbnailGifHtmlCollection.length > 0) {
			thumbnailGifHtmlCollection[0].pause();
		}
	}, []);
	useEffect(() => {
		const thumbnailGifHtmlCollection = document.getElementById(ID).getElementsByTagName("video");
		if (thumbnailGifHtmlCollection.length > 0) {
			if (inViewStage === 2) {
				thumbnailGifHtmlCollection[0].play();
			} else {
				thumbnailGifHtmlCollection[0].pause();
			}
		}
	}, [inViewStage]);

	/* Render */
	return (
		<div
			ref={(el) => { caseActiveRef(el); caseBenchRef(el); }}
			id={ID}
			onClick={clickOpenCase}
			onMouseEnter={hoverStarts}
			onMouseOver={hoverStarts}
			onMouseLeave={hoverEnds}
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
					<div className="home-case-img">
						{caseContent[getLanguageId()].thumbnail.img ? caseContent[getLanguageId()].thumbnail.img : null}
					</div>
					<div className="home-case-text-container">
						<div className="home-case-title">
							{caseContent[getLanguageId()].title}
						</div>
						<div className="home-case-bio">
							<div className="home-case-bio-item">{
								caseContent[getLanguageId()].bio[1]//role
							}</div>
							<div className="home-case-bio-item">{
								caseContent[getLanguageId()].bio[2]//duration
							}</div>
						</div>
						<div className="home-case-brief">
							<ul>
								{caseContent[getLanguageId()].thumbnail.brief.map((bullet, idx) =>
									<li key={idx}>{bullet}</li>
								)}
							</ul>
						</div>
					</div>
				</>
				<>
					{caseContent[getLanguageId()].content ?
						<CaseObject
							caseId={caseId}
							caseIsActive={inViewStage===2}
							hoveringCase={hoveringCase}
						/>
					: null }
				</>
			</HomeSection>
		</div>
	);
}

function CaseObject ({caseId, caseIsActive, hoveringCase}) {

	const caseObject = cases[caseId].theme.object;

	/* Cursor */
	const cursorType = useContext(cursorTypeContext);
	const dispatchCursorType = useContext(dispatchCursorTypeContext);

	/* Click-me Hint */
	const hintblobSrc = btns.home.cases.clickme;
	const [hintblobShown, setHintblobShown] = useState(false);
	useEffect(() => {
		if (caseIsActive==true && cursorType != "readmore") {	// avoid overlapping with the cursor blob
			setHintblobShown(true);
		} else {
			setHintblobShown(false);
		}
	}, [caseIsActive, cursorType]);

	/* Render */
	return (
		<div className="home-case-object-container-out ghost">
			<div className="home-case-object-positioner">
				<div className="home-case-object-rotater">
					<div className="home-case-object-container-in">
						{hoveringCase==true ? caseObject : <AnonymousObject />}
					</div>
				</div>
				<img
					className={
						"home-case-object-hintblob " +
						(hintblobShown==true ? "hintblob-shown" : "")// + " " +
					}
					src={hintblobSrc.blob}
					style={{"--hintblob-right": hintblobSrc.right+"px", "--hintblob-top": hintblobSrc.top+"px"}}
					alt=""
				/>
			</div>
		</div>
	);
}



function Thanks () {

	/* Render */
	return (
		<div className="home-thanks-container">
			<div className="home-thanks">
				Thank you for making it this far! You are just amazing!
			</div>
			<div className="home-thanks-msg">
				Maybe there is a chance that we can be friends? I am recently seeking a datapal to complete the <A href="http://www.dear-data.com/theproject">Dear Data challenge</A> with me, and build a lifelong friendship. No matter which part of the world you are in, if this interests you, please <A href="mailto:l1zhuang@ucsd.edu">send me an email</A>! <Emoji>😉</Emoji>
			</div>
		</div>
	);
}
