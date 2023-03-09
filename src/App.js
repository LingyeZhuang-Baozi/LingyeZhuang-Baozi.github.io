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
import { Breakpoint, BreakpointProvider } from 'react-socks';
import { Transition, SwitchTransition, CSSTransition } from 'react-transition-group';



/**
 * App, the entry point
 */
function App() {

	/* Light mode */
	const [mode, setMode] = useState(localStorage&&localStorage.getItem("zhuanglingye_mode") ? localStorage.getItem("zhuanglingye_mode") : "light");  // light*, dark
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

	/* Render */
	return (
		<div className="mode">
			<RouterProvider router={router} /*fallbackElement={<BigSpinner />}*/ />
		</div>
	);

	// return (
	// 	<div className="mode">
	// 		<Router /*basename={process.env.PUBLIC_URL}*/><Routes>

	// 			{/* Home */}
	// 			<Route path='/' element = {
	// 				<Home
	// 					mode={mode}
	// 					toggleMode={toggleMode}
	// 				/>
	// 			}>
	// 				<Route path="/resume" element={ <Resume mode={mode} /> } />
	// 				<Route path="/journey" element={ <Journey mode={mode} journeyBookmark={journeyBookmark} setJourneyBookmark={setJourneyBookmark} /> }></Route>
	// 			</Route>

	// 			{/* Cases */}
	// 			<Route path="/case-ACM" element={ <Case case="ACM" mode={mode} toggleMode={toggleMode} /> } />
	// 			<Route path="/case-RehaBuddy" element={ <Case case="RehaBuddy" mode={mode} toggleMode={toggleMode} /> } />
	// 			<Route path="/case-Bitsrealm" element={ <Case case="Bitsrealm" mode={mode} toggleMode={toggleMode} /> } />
	// 			<Route path="/case-CruzRoja" element={ <Case case="CruzRoja" mode={mode} toggleMode={toggleMode} /> } />
	// 			<Route path="/case-LAK" element={ <Case case="LAK" mode={mode} toggleMode={toggleMode} /> } />
	// 			<Route path="/case-MAW" element={ <Case case="MAW" mode={mode} toggleMode={toggleMode} /> } />
	// 			<Route path="/case-Neureality" element={ <Case case="Neureality" mode={mode} toggleMode={toggleMode} /> } />
	// 			<Route path="/case-GroupReads" element={ <Case case="GroupReads" mode={mode} toggleMode={toggleMode} /> } />
	// 			<Route path="/case-PadPal" element={ <Case case="PadPal" mode={mode} toggleMode={toggleMode} /> } />

	// 			{/* Default when no match */}
	// 			<Route path="*" element={<Navigate to="/" />} />

	// 		</Routes></Router>
	// 		<ScrollRestoration />
	// 	</div>
	// );
}

export default App;
