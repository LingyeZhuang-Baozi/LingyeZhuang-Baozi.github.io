import React, { useState, useEffect, useReducer, createContext, useContext, createRef, useRef } from 'react';
import { useParams, useLocation } from "react-router-dom";
//import { HashLink } from 'react-router-hash-link';

import './Case.scss';

/* Foreign Components */
import { btns, images } from './assets.js';
import { cases, casesNames, bioStructure, templateHintblobMap } from './cases.js';
import { modeContext, dispatchModeContext, languageContext, dispatchLanguageContext, cursorTypeContext, dispatchCursorTypeContext, PageNotFound } from './App.js';
import { Logo, ControlBtn, ControlToggle, ControlSwitch, ControlExpandable, A, Emoji } from "./components.js";

/* Important Assets */
import { ReactComponent as VisitWebsiteL } from "./assets/basic/hintblobs/visit_website_L.svg";
import { ReactComponent as VisitWebsiteR } from "./assets/basic/hintblobs/visit_website_R.svg";



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

function Header () {

	const caseId = useContext(caseIdContext);
	const caseContent = cases[caseId];

	/* Render */
	return (
		<div className="case-header">
			<div className="case-header-img-container-out"><div className="case-header-img-container-in">
				<img
					className="case-header-img"
					src={caseContent.content.img}
					alt=""
				/>
			</div></div>
			<div className="case-header-title">{caseContent.title}</div>
			<div className="case-header-bio-container">
				<div className="case-header-bio">
					{caseContent.bio.map((entry, idx) =>
						<>{entry != "" ?
							<div key={bioStructure[idx]} className="case-header-bio-entry-container">
								<div className="case-header-bio-entry-title">{bioStructure[idx]}</div>
								<div className="case-header-bio-entry-content">{entry}</div>
							</div>
						: null }</>
					)}
				</div>
				<div className="case-header-bio-entry-container case-header-bio-tldr">
					<div className="case-header-bio-entry-title">TL;DR</div>
					<div className="case-header-bio-entry-content">
						{caseContent.content.overview.length > 0 ?
							caseContent.content.overview
						:
							caseContent.thumbnail.brief
						}
					</div>
				</div>
				<HeaderObject />
			</div>
		</div>
	);
}

function HeaderObject () {

	const caseId = useContext(caseIdContext);
	const caseContent = cases[caseId];

	/* Render */
	return (<>
		{templateHintblobMap[cases[caseId].theme.template] == true ?
			<VisitWebsiteL
				className={
					"case-header-object-hintblob " //+
					//((hoveredIdx < 0 && hoveringObjects == false) ? "hintblob-shown" : "")
				}
			/>
		:
			<VisitWebsiteR
				className={
					"case-header-object-hintblob " //+
					//((hoveredIdx < 0 && hoveringObjects == false) ? "hintblob-shown" : "")
				}
			/>
		}
	</>);
}
