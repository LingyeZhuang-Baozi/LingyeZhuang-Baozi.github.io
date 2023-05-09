/**
 * Notes:
 * 
 * React version: 18.2.0.
 */

import React, { useState , useEffect } from 'react';
//import { /*BrowserRouter as Router,*/ HashRouter as Router, Routes, Route, Navigate, ScrollRestoration } from "react-router-dom";
import { createHashRouter, RouterProvider, redirect, ScrollRestoration } from "react-router-dom";

/* Foreign components */
import './style.css';
import Home, { AboutMe, Resume } from './Home.js';
import Journey from './Journey.js';
import CaseSelector from './Case.js';

/* Libraries */
import { useMediaQuery } from 'react-responsive';
import { Transition, SwitchTransition, CSSTransition } from 'react-transition-group';



/**
 * App, the entry point
 */
function App() {

	/* Light mode */
	const [mode, setMode] = useState(localStorage&&localStorage.getItem("zhuanglingye_mode") ? localStorage.getItem("zhuanglingye_mode") : "light");  // light*, dark
	const [modeChanging, setModeChanging] = useState(false);
	useEffect (() => {
		if (localStorage && !localStorage.getItem("zhuanglingye_mode")) {
			localStorage.setItem("zhuanglingye_mode", "light");
		}
	}, []);
	const toggleMode = () => {
		const prev_mode = mode;
		const new_mode = (prev_mode==="light" ? "dark" : "light");
		localStorage.setItem("zhuanglingye_mode", new_mode);
		setMode(new_mode);
		setModeChanging(true);
		setTimeout (() => {
			setModeChanging(false);
		}, 550); // var(--delay-l) 540ms with a bit of extra
	}

	/* Journey bookmark */
	const [journeyBookmark, setJourneyBookmark] = useState(localStorage&&localStorage.getItem("zhuanglingye_journey_bookmark") ? localStorage.getItem("zhuanglingye_journey_bookmark") : null);
	useEffect (() => {
		if (localStorage && !localStorage.getItem("zhuanglingye_journey_bookmark")) {
			localStorage.setItem("zhuanglingye_journey_bookmark", null);
		}
	}, []);
	useEffect (() => {
		if (localStorage) {
			localStorage.setItem("zhuanglingye_journey_bookmark", journeyBookmark);
		}
	}, [journeyBookmark]);

	/* Routes */
	const router = createHashRouter ([
		{ path: "/",
			element: <Home mode={mode} toggleMode={toggleMode} />,
			//loader: ...,
			children: [
				{ index: true,
					element: <AboutMe mode={mode} />,
				},
				{ path: "resume",
					element: <Resume mode={mode} />,
				},
				{ path: "journey",
					element: <Journey mode={mode} journeyBookmark={journeyBookmark} setJourneyBookmark={setJourneyBookmark} />,
				},
			],
		},
		{ path: "/:caseName",
			element: <CaseSelector mode={mode} toggleMode={toggleMode} />
		},
	]);

	/* Breakpoints */
	const isLargeViewport = useMediaQuery({ query: '(min-width: 800px)' });

	/* Preload helper */
	const [isLoading, setIsLoading] = useState(true);
	const batchImport = (requiredImgs) => {
		return requiredImgs.keys().map(requiredImgs);
	}
	var imgsToPreload = batchImport(require.context(
		"./assets/",					// relative path to folder with images to import and preload
		true,									// don't look into subdirectories
		/\.(png|jpe?g|svg)$/	// all possible file extensions
	));
	const cacheImages = async (imgs) => {
		const promises = await imgs.map(imgSrc => {
			return new Promise((resolve, reject) => {
				const img = new Image();
				img.src = imgSrc;
				img.onLoad = resolve();
				img.onerror = reject();
			})
		})
		await Promise.all(promises);
		setIsLoading(false);
		console.log("Finished loading large images.");
	}
	useEffect(() => { cacheImages(imgsToPreload); }, [])

	/* Render */
	return (
		<div
			className={
				"mode_"+mode + (modeChanging==true ? " mode_changing" : "") + " "+
				(isLargeViewport ? "viewport_large" : "viewport_small")
			}
		>
			{isLoading==true ?
				<div>Loading...</div>
			:
				<RouterProvider router={router} /*fallbackElement={<BigSpinner />}*/ />
			}
		</div>
	);
}

export default App;
