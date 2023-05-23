/*** Portfolio Version 3.0 ***/

import React, { useState, useEffect, useReducer, createContext } from 'react';
//import { createHashRouter, RouterProvider, redirect, ScrollRestoration } from "react-router-dom";

/* Foreign components */
//import './style.css';
import Home from './Home.js';
//import Journey from './Journey.js';
//import CaseSelector from './Case.js';

/* Libraries */
//import { useMediaQuery } from 'react-responsive';



/* Mode Switch 1: Light-dark Mode */
export const dispatchModeContext = createContext(null);
function modeReducer (currMode, modeAction) {
	switch (modeAction.type) {
		case "toggle": {
			return (!currMode);
		}
		default: {
			console.error("Mode switching error. Received modeAction: ", modeAction);
		}
	}
}

/* Mode Switch 2: Language */
export const dispatchLanguageContext = createContext(null);
function languageReducer (currLanguage, languageAction) {
	switch (languageAction.type) {
		case "toggle": {
			return (!currLanguage);
		}
		default: {
			console.error("Language switching error. Received languageAction: ", languageAction);
		}
	}
}



/**
 * App, the entry point
 */
export default function App() {

	/* Mode Switch 1: Light-dark Mode */
	/* TODO: Reference: https://blog.logrocket.com/dark-mode-react-in-depth-guide/ */
	const [mode, dispatchMode] = useReducer(modeReducer, true);	// true = light, false = dark

	/* Mode Switch 2: Language */
	const [language, dispatchLanguage] = useReducer(languageReducer, true);	// true = English, false = Chinese

	/* Render */
	return (
		<div className={"groundfloor " +
			"mode-" + (mode==true ? "light" : "dark") + " " +
			"language-" + (language==true ? "en" : "cn")
		}>
			{mode==true ? <p>light</p> : <p>dark</p> /*DEBUG*/}
			{language==true ? <p>en</p> : <p>cn</p> /*DEBUG*/}
			<dispatchModeContext.Provider value={dispatchMode}><dispatchLanguageContext.Provider value={dispatchLanguage}>
				<Home />
			</dispatchLanguageContext.Provider></dispatchModeContext.Provider>
		</div>
	);
}