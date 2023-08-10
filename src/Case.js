import React, { useState, useEffect, useReducer, createContext, useContext, useRef } from 'react';
import { useParams, useLocation } from "react-router-dom";
//import { HashLink } from 'react-router-hash-link';

import './Case.scss';

/* Foreign Components */
import { btns, /*images*/ } from './assets.js';
import { cases, casesNames, bioStructure } from './cases.js';
import { getLocalStorage, setLocalStorage, modeContext, dispatchModeContext, languageContext, dispatchLanguageContext, getLanguageIdContext, dispatchCursorTypeContext, PageNotFound } from './App.js';
import { Logo, ControlBtn, ControlToggle, ControlSwitch, ControlExpandable, A, Emoji, ImgGallery, ScrollableMobile, ScrollableDesktop } from "./components.js";

/* Important Assets */
import { ReactComponent as OpenExternal } from "./assets/basic/hintblobs/open_external.svg";



const caseIdContext = createContext(null);

export default function CaseSteamer () {

	/* Validate URL */
	// Redirection is handled by PageNotFound.
	const params = useParams();
	const [URLtype, caseId] = params.caseId.split("-");	// standard format of a case URL must be: "case-<caseId>"
	const getLanguageId = useContext(getLanguageIdContext);
	const URLValidator = () => {
		if (
			URLtype=="case"
			&& casesNames.some(cn => cn === caseId)
			&& cases[caseId][getLanguageId()].content
		) { return true; }
		else { return false; }
	}

	/* Guard */
	const [guarded, setGuarded] = useState(cases[caseId].guarded);
	const guardOff = () => {
		setGuarded(false);
		setLocalStorage(2, true);
	}

	/* Restore Scroll */
	const location = useLocation();
	useEffect(() => {
		window.scrollTo(0, 0);
	}, [location.pathname]);

	/* Reset Cursor */
	const dispatchCursorType = useContext(dispatchCursorTypeContext);
	useEffect(() => {
		dispatchCursorType({type: "default"});
	}, []);

	/* Render */
	if (URLValidator() == false) {
		return ( <PageNotFound /> );
	} else if (guarded==true && getLocalStorage(2)==false) {
		return ( <CaseGuard guardOff={guardOff} /> );
	} else {
		return (
			<caseIdContext.Provider value={caseId}>
				<Case />
			</caseIdContext.Provider>
		);
	}
}

function CaseGuard ({guardOff}) {

	/* Handle Input */
	const [approved, setApproved] = useState(false);
	const [knockAttempt, setKnockAttempt] = useState("");
	const observeInput = (e) => {
		setKnockAttempt(e.target.value.toLowerCase());
	}
	useEffect(() => {
		if (knockAttempt == "dumpling") {	// Yes, you found it 😂 Thank you for all the efforts. Go ahead and use this to view my hidden cases. You deserve it.
			setApproved(true);
			setTimeout(() => {
				guardOff();
			}, 550); // $time-l 540ms with a bit of extra
		}
	}, [knockAttempt]);

	/* Maintain Focus */
	const inputRef = useRef(null);
	const toFocus = () => { inputRef.current.focus(); }
	useEffect(() => { toFocus(); }, []);	// auto focus

	/* Render */
	const underlines = [];
	for (let i = 0; i < 8; i++) {
		underlines.push(
			<div
				key={i}
				className={
					"case-guard-input-underline " +
					(i === knockAttempt.length ? "curr" : "")
				}
			></div>
		);
	}
	return (
		<div className="case-guard-container">
			<div className="case-control">
				<div className="control-leftgroup">
					<Logo
						linkTo="/"
						hintblob={btns.case.control.gohome.hintblob}
					/>
				</div>
			</div>
			<div className={
				"case-guard " +
				(knockAttempt == "" ? "empty" : "") + " " +
				(approved ? "approved" : "")
			}>
				<input
					ref={inputRef}
					className="case-guard-input-back"
					name="case-guard-input"
					type="text"
					autoComplete="off"
					maxLength="8"
					value={knockAttempt}
					onChange={observeInput}
					onBlur={toFocus}
				/>
				<div className="case-guard-input-underlines">
					{underlines}
				</div>
				<div className="case-guard-input-front">
					{knockAttempt == "" ?
						<>{
							"password".split('').map((char, idx) =>
								<span key={idx}>{char}</span>
							)
						}</>
					:
						<>{
							knockAttempt.split('').map((char, idx) =>
								<span key={idx}>{char}</span>
							)
						}</>
					}
				</div>
			</div>
		</div>
	);
}

function Case () {

	const caseId = useContext(caseIdContext);
	const caseTheme = cases[caseId].theme;

	/* Render */
	return (
		<div
			key={caseId}
			className={"case case-" + caseTheme.template}
			style={(caseTheme.color ? {
				"--theme-bgcolor-light": caseTheme.color[0],
				"--theme-title-color-light": caseTheme.color[1],
				"--theme-bgcolor-dark": caseTheme.color[2],
				"--theme-title-color-dark": caseTheme.color[3],
			} : {})}
		>
			<ControlBar />
			<Header />
			<Body />
		</div>
	);
}

function ControlBar () {

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

	/* Render */
	return (
		<div className="case-control">
			<div className="control-leftgroup">
				<Logo
					linkTo="/"
					hintblob={btns.case.control.gohome.hintblob}
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
					<ControlBarExpandable
						btnContent="contacts"
					/>
				</div>
			</div>
		</div>
	);
}

function ControlBarSwitch ({btnContent, curr, updateHandler}) {	// curr: true = circle fg left, false = circle fg right

	/* Validate And Render */
	const content = btns.case.control.switch[btnContent];
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
	const content = btns.case.control.expandable[btnContent];
	return (<>{content ?
		<ControlExpandable btnContent={content} />
	: null }</>);
}

function Header ({singleLinePrompt}) {

	const caseId = useContext(caseIdContext);
	const caseContent = cases[caseId];

	/* Language */
	const getLanguageId = useContext(getLanguageIdContext);

	/* Render */
	return (
		<div className="case-header">
			<div className="case-header-img">
				{caseContent[getLanguageId()].content.img ? caseContent[getLanguageId()].content.img : null}
			</div>
			<div className="case-header-title">{caseContent[getLanguageId()].title}</div>
			<div className="case-header-bio-container">
				<div className="case-header-bio">
					{caseContent[getLanguageId()].bio.map((entry, idx) => {
						if (entry != null && entry != "") {
							return (
								<div key={bioStructure[idx]} className="case-header-bio-entry-container">
									<div className="case-header-bio-entry-title">{bioStructure[idx]}</div>
									<div className="case-header-bio-entry-content">{entry}</div>
								</div>
							);
						}
					})}
				</div>
				<div className="case-header-bio-entry-container case-header-bio-tldr">
					<div className="case-header-bio-entry-title">
						{caseContent[getLanguageId()].content.tldr[0] && caseContent[getLanguageId()].content.tldr[0] != "" ?
							caseContent[getLanguageId()].content.tldr[0] : "TL;DR"
						}
					</div>
					<div className="case-header-bio-entry-content">
						{caseContent[getLanguageId()].content.tldr[1]}
						{caseContent[getLanguageId()].content.link ?
							<HeaderObject />
						: null }
					</div>
					{caseContent[getLanguageId()].content.link ?
						<div className="case-header-object-pillar"></div>
					: null }
				</div>
			</div>
		</div>
	);
}

function HeaderObject () {

	const caseId = useContext(caseIdContext);
	const caseContent = cases[caseId];

	/* Language */
	const getLanguageId = useContext(getLanguageIdContext);

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
		<div className="case-header-object-container-out">
			<div className="case-header-object-rotater">
				<a
					href={caseContent[getLanguageId()].content.link[1]}
					className={
						"case-header-object-container-in ghost " +
						(hovering==true ? "curr" : "")
					}
					onMouseEnter={hoverStarts}
					onMouseOver={hoverStarts}
					onMouseLeave={hoverEnds}
				>
					{caseContent.theme.object}
				</a>
			</div>
			<div className="case-header-object-prompt-container">
				<a
					href={caseContent[getLanguageId()].content.link[1]}
					className={
						"case-header-object-prompt ghost " +
						(hovering==true ? "focused" : "")
					}
					onMouseEnter={hoverStarts}
					onMouseOver={hoverStarts}
					onMouseLeave={hoverEnds}
				>
					<div className="case-header-object-prompt-text">{caseContent[getLanguageId()].content.link[0]}</div>
					<OpenExternal className="case-header-object-prompt-icon" />
				</a>
			</div>
		</div>
	);
}

function Body () {

	const caseId = useContext(caseIdContext);

	/* Language */
	const getLanguageId = useContext(getLanguageIdContext);

	/* Render */
	const bodyContent = cases[caseId][getLanguageId()].content.body;
	const caseBody = () => {
		switch (bodyContent[0]) {

			case "challenge-solution": {
				const sectionTitles = ["Challenge", "Solution", "Reflection"];
				return (	// TODO: highlight the "Challenge" and "Solution" sections?
					<>{bodyContent[1].map((section, i) =>
						<div key={"section"+i} className="case-body-section">
							<div className="case-body-section-title case-body-section-title-challenge-solution">{sectionTitles[i]}</div>
							<div className="case-body-section-content">
								{section.map((subsection, j) =>
									<div key={"subsection"+j} className="case-body-subsection">
										{ subsection[0] != "" ? <div className="case-body-subsection-title">{subsection[0]}</div> : null }
										<div className="case-body-subsection-content">{subsection[1]}</div>
									</div>
								)}
							</div>
						</div>
					)}</>
				);
			}

			case "freeform": {
				return (
					<>{bodyContent[1].map((section, idx) =>
						<div key={idx} className="case-body-section">
							<div className="case-body-section-title">{section[0]}</div>
							<div className="case-body-section-content">{section[1]}</div>
						</div>
					)}</>
				);
			}

			case "gallery": {
				return (
					<>{bodyContent[1].map((collection, idx) => 
						<div key={idx} className="case-body-gallery-collection">
							{collection.title ?
								<div className="case-body-section-title">{collection.title}</div>
							: null }
							{collection.spotlight ?
								<>{collection.spotlight[0] == "mobile" ?
									<ScrollableMobile>
										<img
											src={collection.spotlight[1]}
											alt={collection.spotlight[2]}
										/>
									</ScrollableMobile>
								:
									<ScrollableDesktop>
										<img
											src={collection.spotlight[1]}
											alt={collection.spotlight[2]}
										/>
									</ScrollableDesktop>
								}</>
							: null }
							{collection.imgs ?
								<ImgGallery
									imgList={collection.imgs}
									heightId={collection.heightId}
									widthId={collection.widthId}
									wrap={collection.wrap}
									autoplay={collection.autoplay}
									zoomable={collection.zoomable}
								/>
							: null }
						</div>
					)}</>
				);
			}

			default: {
				console.error("Error determining case body structure. Received structure type:", bodyContent[0]);
				return (<></>);
			}
		}
	}

	return (
		<div className="case-body">
			{caseBody()}
		</div>
	);
}
