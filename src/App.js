/*** Portfolio Version 3.0 ***/

import React, { useState, useEffect, useReducer, createContext, useContext } from 'react';
import { createHashRouter, RouterProvider, useLocation, redirect, /*TODO: ScrollRestoration*/ } from "react-router-dom";

import './_style.scss';

/* Foreign Components */
import Home from './Home.js';
import CaseSteamer from './Case.js';
import { Img } from "./components.js";
import PNFWebpLight from "./assets/basic/404/img_light.webp";	import PNFWebpDark from "./assets/basic/404/img_dark.webp";	import PNFPngLight from "./assets/basic/404/img_light.png";	import PNFPngDark from "./assets/basic/404/img_dark.png";

/* Libraries */
import { isSafari, isIE } from "react-device-detect";
//import { useMediaQuery } from 'react-responsive';



/* Local Storage */
const localStorageName = "lingye_juliet_zhuang_portfolio";
const getLocalStorage = (idx) => {
	return (localStorage.getItem(localStorageName)[idx] == "1" ? true : false);
}
const setLocalStorage = (idx, newValue) => {
	const localStoragePrev = localStorage.getItem(localStorageName);
	localStorage.setItem(localStorageName,
		localStoragePrev.slice(0,idx) +
		(newValue == true ? "1" : "0") +
		localStoragePrev.slice(idx+1)
	);
}

/* Mode Switch 1: Light-dark Mode */
export const modeContext = createContext(null);
export const dispatchModeContext = createContext(null);
function modeReducer (currState, modeAction) {
	switch (modeAction.type) {
		case "toggle": {
			if (currState.changing==false) {
				const newMode = !currState.mode;
				setLocalStorage(0, newMode);
				return ({
					mode: newMode,
					changing: true,
				});
			} else {
				return ({...currState});
			}
		}
		case "changed": {
			return ({
				mode: currState.mode,
				changing: false,
			});
		}
		default: {
			console.error("Mode switching error. Received modeAction:", modeAction);
		}
	}
}

/* Mode Switch 2: Language */
export const languageContext = createContext(null);
export const dispatchLanguageContext = createContext(null);
function languageReducer (currLanguage, languageAction) {
	switch (languageAction.type) {
		case "toggle": {
			const newLanguage = !currLanguage;
			setLocalStorage(1, newLanguage);
			return (newLanguage);
		}
		default: {
			console.error("Language switching error. Received languageAction:", languageAction);
		}
	}
}

/* Modal */
//export const modalContext = createContext(null);
export const dispatchModalContext = createContext(null);
function modalReducer (currModal, modalAction) {
	switch (modalAction.type) {
		case "open": {
			return ({state: true, content: modalAction.content});
		}
		case "close": {
			return ({state: false, content: <></>});
		}
		default: {
			console.error("Modal operation error. Received modalAction:", modalAction);
		}
	}
}

/* Cursor */
export const cursorTypeContext = createContext(null);
export const dispatchCursorTypeContext = createContext(null);
function cursorTypeReducer (currCursorType, cursorTypeAction) {
	switch (cursorTypeAction.type) {
		case "default": { return ("default"); }
		case "pointer": { return ("pointer"); }
		case "zoom-in": { return ("zoom-in"); }
		case "zoom-out": { return ("zoom-out"); }
		case "progress": { return ("progress"); }
		case "readmore": { return ("readmore"); }
		case "none": { return ("none"); }
		default: { return ("default"); }
	}
}



/**
 * App, the entry point
 */
export default function App() {

	/* Local Storage */
	useEffect(() => {
		if (localStorage && !localStorage.getItem(localStorageName)) {
			localStorage.setItem(localStorageName, "11");
				// [0] mode: 1 = true = light, 0 = false = dark
				// [1] language: 1 = true = English, 0 = false = Chinese
		}
	}, []);

	/* Mode Switch 1: Light-dark Mode */
	/* TODO: Reference: https://blog.logrocket.com/dark-mode-react-in-depth-guide/ */
	const [mode, dispatchMode] = useReducer(modeReducer, {
		mode: localStorage && localStorage.getItem(localStorageName) ? getLocalStorage(0) : true,
		changing: false,
	});
	useEffect(() => {
		if (mode.changing == true) {
			setTimeout (() => {
				dispatchMode({type: "changed"});
			}, 550); // $time-l 540ms with a bit of extra
		}
	}, [mode.changing]);

	/* Mode Switch 2: Language */
	const [language, dispatchLanguage] = useReducer(languageReducer,
		localStorage && localStorage.getItem(localStorageName) ? getLocalStorage(1) : true,
	);
	useEffect(() => { document.documentElement.lang = (language==true ? "en" : "zh") }, [language]);

	/* Modal */
	const [modal, dispatchModal] = useReducer(modalReducer, {
		state: false,	// true = on, false = off
		content: <></>,
	});
	const closeModal = (e) => {
		e.preventDefault();
		dispatchModal({type: "close"});
		dispatchCursorType({type: "default"});
	}
	const modalHoverStarts = (e) => {
		e.preventDefault();
		dispatchCursorType({type: "zoom-out"});
	}
	const modalHoverEnds = (e) => {
		e.preventDefault();
		dispatchCursorType({type: "default"});
	}

	/* Cursor */
	const [cursorType, dispatchCursorType] = useReducer(cursorTypeReducer, "default");
	const [cursorPos, setCursorPos] = useState({});
	useEffect(() => {
		const cursorMoveHandler = (e) => {
			setCursorPos({ x: e.clientX, y: e.clientY });
		};
		window.addEventListener("mousemove", cursorMoveHandler);
		return () => {
			window.removeEventListener(
				"mousemove",
				cursorMoveHandler
			);
		};
	}, []);

	/* Routes */
	const router = createHashRouter ([
		{ path: "/",
			element: <Home />,
			//loader: ...,
			/*children: [
				{ index: true,
					element: <AboutMe mode={mode} />,
				},
				{ path: "resume",
					element: <Resume mode={mode} />,
				},
				{ path: "journey",
					element: <Journey mode={mode} journeyBookmark={journeyBookmark} setJourneyBookmark={setJourneyBookmark} />,
				},
			],*/
			errorElement: <PageNotFound />,	//TODO
		},
		{ path: "/:caseId",
			element: <CaseSteamer />,
			key: "haha",
			errorElement: <PageNotFound />,
		},
	]);

	/* Render */
	return (
		<div
			className={"groundfloor " +
				"mode-" + (mode.mode==true ? "light" : "dark") + " " +
				(mode.changing==true ? "mode-changing" : "") + " " +
				"language-" + (language==true ? "en" : "cn") + " " +
				(modal.state==true ? "modal-on" : "") + " " +
				(isSafari||isIE ? "missout-browser" : "")
			}
			onClick={(modal.state==true ? closeModal : null)}
		>
			<modeContext.Provider value={mode}>
			<dispatchModeContext.Provider value={dispatchMode}>
			<languageContext.Provider value={language}>
			<dispatchLanguageContext.Provider value={dispatchLanguage}>
			<dispatchModalContext.Provider value={dispatchModal}>
			<cursorTypeContext.Provider value={cursorType}>
			<dispatchCursorTypeContext.Provider value={dispatchCursorType}>
				<RouterProvider router={router} /*fallbackElement={<BigSpinner />}*/ />
			</dispatchCursorTypeContext.Provider>
			</cursorTypeContext.Provider>
			</dispatchModalContext.Provider>
			</dispatchLanguageContext.Provider>
			</languageContext.Provider>
			</dispatchModeContext.Provider>
			</modeContext.Provider>

			<div
				className={
					"modal-space " +
					(modal.state==true ? "on" : "")
				}
				onMouseEnter={modalHoverStarts}
				onMouseOver={modalHoverStarts}
				onMouseLeave={modalHoverEnds}
			>
				<div className="modal">
					{modal.content}
				</div>
			</div>

			<div className="cursor-space-out"><div className="cursor-space-in">
				<div
					className="cursor-position"
					style={{"--cursorX": cursorPos.x+"px", "--cursorY": cursorPos.y+"px"}}
				>
					<div className="cursor">
						<div className={"cursor-shape cursor-" + cursorType}></div>
					</div>
				</div>
			</div></div>
		</div>
	);
}

export function PageNotFound () {

	/* Dot Timer */
	const [dot1Shown, setDot1Shown] = useState(false);
	const [dot2Shown, setDot2Shown] = useState(false);
	const [dot3Shown, setDot3Shown] = useState(false);

	/* Redirect */
	useEffect(() => {
		setTimeout(() => {
			setDot1Shown(true);
		}, 10); // immediately with a bit of extra
		setTimeout(() => {
			setDot2Shown(true);
		}, 1010); // 1s with a bit of extra
		setTimeout(() => {
			setDot3Shown(true);
		}, 2010); // 2s with a bit of extra
		setTimeout(() => {
			window.location.replace("/#/");
		}, 3010); // 3s with a bit of extra
	}, []);

	/* Stylize By Mode */
	const currMode = useContext(modeContext);

	/* Render */
	return (
		<div className="pnf">
			<div className="pnf-text">
				Empty Wildland Here.
				<div className="pnf-hint">
					Let’s Go Home
					<span className={"pnf-hint-dot " + (dot1Shown==true ? "shown" : "")}>.</span>
					<span className={"pnf-hint-dot " + (dot2Shown==true ? "shown" : "")}>.</span>
					<span className={"pnf-hint-dot " + (dot3Shown==true ? "shown" : "")}>.</span>
				</div>
			</div>
			<Img
				className="pnf-img"
				srcWebp={currMode.mode==true ? PNFWebpLight : PNFWebpDark}
				srcPng={currMode.mode==true ? PNFPngLight : PNFPngDark}
				alt=""
			/>
		</div>
	);
}
