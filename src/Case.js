import React, { useState, useEffect, useReducer, createContext, useContext, createRef, useRef } from 'react';
import { useParams, useLocation } from "react-router-dom";
//import { HashLink } from 'react-router-hash-link';

import './Case.scss';

/* Foreign Components */
import { btns, images } from './assets.js';
import { cases, casesNames, bioStructure } from './cases.js';
import { modeContext, dispatchModeContext, languageContext, dispatchLanguageContext, cursorTypeContext, dispatchCursorTypeContext, PageNotFound } from './App.js';
import { Logo, ControlBtn, ControlToggle, ControlSwitch, ControlExpandable, A, Emoji, Img } from "./components.js";

/* Important Assets */
import { ReactComponent as OpenExternal } from "./assets/basic/hintblobs/open_external.svg";



const caseIdContext = createContext(null);

export default function CaseSteamer () {

	/* Validate URL */
	// Redirection is handled by PageNotFound.
	const params = useParams();
	const [URLtype, caseId] = params.caseId.split("-");	// standard format of a case URL must be: "case-<caseId>"
	const location = useLocation();
	const URLValidator = () => {
		if (
			URLtype=="case"
			&& casesNames.some(cn => cn === caseId)
			&& cases[caseId].content
		) { return true; }
		else { return false; }
	}

	/* Restore Scroll */	// TODO: better solution! key didn't work??
	useEffect(() => {
		window.scrollTo(0, 0);
	}, [location.pathname]);

	/* Reset Cursor */
	const dispatchCursorType = useContext(dispatchCursorTypeContext);
	useEffect(() => {
		dispatchCursorType({type: "default"});
	}, []);

	/* Render */
	return (
		<>{URLValidator() == false ?
			<PageNotFound />
		:
			<caseIdContext.Provider value={caseId}>
				<Case />
			</caseIdContext.Provider>
		}</>
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

	/* Render */
	return (
		<div className="case-header">
			<img
				className="case-header-img"
				src={caseContent.content.img}
				alt=""
			/>
			<div className="case-header-title">{caseContent.title}</div>
			<div className="case-header-bio-container">
				<div className="case-header-bio">
					{caseContent.bio.map((entry, idx) => {
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
					<div className="case-header-bio-entry-title">In A Nutshell{/*TL;DR*/}</div>
					<div className="case-header-bio-entry-content">
						{caseContent.content.tldr}
						{caseContent.content.link ?
							<HeaderObject />
						: null }
					</div>
					{caseContent.content.link ?
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
					href={caseContent.content.link[1]}
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
					href={caseContent.content.link[1]}
					className={
						"case-header-object-prompt ghost " +
						(hovering==true ? "focused" : "")
					}
					onMouseEnter={hoverStarts}
					onMouseOver={hoverStarts}
					onMouseLeave={hoverEnds}
				>
					<div className="case-header-object-prompt-text">{caseContent.content.link[0]}</div>
					<OpenExternal className="case-header-object-prompt-icon" />
				</a>
			</div>
		</div>
	);
}

function Body () {

	const caseId = useContext(caseIdContext);
	const bodyContent = cases[caseId].content.body;

	/* Render */
	const caseBody = () => {
		switch (bodyContent[0]) {
			case "challenge-solution": {
				return (<></>);
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
					<div className="case-body-gallery">
						{bodyContent[1].map((img, idx) => {
							if (!img[0]) {
								console.error("Error reading image source at index:", idx);
								return (<></>);
							} else {
								return (
									<Img
										src={img[0]}
										sizeId={img[1] ? img[1] : 0}
										alt={img[2] ? img[2] : ""}
										caption={img[3] ? img[3] : ""}
										zoomable={img[4] ? img[4] : false}
									/>
								);
							}
						})}
					</div>
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
