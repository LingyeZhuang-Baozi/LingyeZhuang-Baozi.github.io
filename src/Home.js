import React, { useState, useEffect, useContext, createRef, useRef } from 'react';
import { dispatchModeContext, dispatchLanguageContext } from './App.js';

export default function Home (props) {

	const dispatchMode = useContext(dispatchModeContext);
	const dispatchLanguage = useContext(dispatchLanguageContext);

	/* Render */
	return (
		<div>
			hELLO wORLD
			<button onClick={() => {
				dispatchMode({type: "toggle"});
			}}>Mode</button>
			<button onClick={() => {
				dispatchLanguage({type: "toggle"});
			}}>Language</button>
		</div>
	);
}