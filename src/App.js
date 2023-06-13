/*** Portfolio Version 3.0 ***/

import React, { useState, useEffect, useReducer, createContext } from 'react';
import { createHashRouter, RouterProvider, redirect, ScrollRestoration } from "react-router-dom";

import './_style.scss';

/* Foreign components */
import Home from './Home.js';
//import Journey from './Journey.js';
//import CaseSelector from './Case.js';

/* Libraries */
//import { useMediaQuery } from 'react-responsive';



/* Mode Switch 1: Light-dark Mode */
export const modeContext = createContext(null);
export const dispatchModeContext = createContext(null);
function modeReducer (currState, modeAction) {
	switch (modeAction.type) {
		case "toggle": {
			if (currState.changing==false) {
				return ({
					mode: !currState.mode,
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
			return (!currLanguage);
		}
		default: {
			console.error("Language switching error. Received languageAction:", languageAction);
		}
	}
}

/* Cursor */
export const dispatchCursorTypeContext = createContext(null);
function cursorTypeReducer (currCursorType, cursorTypeAction) {
	switch (cursorTypeAction.type) {
		case "default": { return ("default"); }
		case "pointer": { return ("pointer"); }
		case "progress": { return ("progress"); }
		default: { return ("default"); }
	}
}



/**
 * App, the entry point
 */
export default function App() {

	/* Mode Switch 1: Light-dark Mode */
	/* TODO: Reference: https://blog.logrocket.com/dark-mode-react-in-depth-guide/ */
	const [mode, dispatchMode] = useReducer(modeReducer, {
		mode: true,	// true = light, false = dark
		changing: false,
	});
	useEffect (() => {
		if (mode.changing == true) {
			setTimeout (() => {
				dispatchMode({type: "changed"});
			}, 550); // $time-l 540ms with a bit of extra
		}
	}, [mode.changing]);

	/* Mode Switch 2: Language */
	const [language, dispatchLanguage] = useReducer(languageReducer, true);	// true = English, false = Chinese
	useEffect(() => { document.documentElement.lang = (language==true ? "en" : "zh") }, [language]);

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
			//errorElement: <>{() => { redirect("/"); }}</>,	//TODO
		},
		// { path: "/:caseName",
		// 	element: <CaseSelector mode={mode} toggleMode={toggleMode} />,
		// 	//errorElement: <>{() => { redirect("/"); }}</>,
		// },
	]);

	/* Render */
	return (
		<div className={"groundfloor " +
			"mode-" + (mode.mode==true ? "light" : "dark") + " " +
			(mode.changing==true ? "mode-changing" : "") + " " +
			"language-" + (language==true ? "en" : "cn")
		}>
			<modeContext.Provider value={mode}>
			<dispatchModeContext.Provider value={dispatchMode}>
			<languageContext.Provider value={language}>
			<dispatchLanguageContext.Provider value={dispatchLanguage}>
			<dispatchCursorTypeContext.Provider value={dispatchCursorType}>
				<RouterProvider router={router} /*fallbackElement={<BigSpinner />}*/ />
			</dispatchCursorTypeContext.Provider>
			</dispatchLanguageContext.Provider>
			</languageContext.Provider>
			</dispatchModeContext.Provider>
			</modeContext.Provider>

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