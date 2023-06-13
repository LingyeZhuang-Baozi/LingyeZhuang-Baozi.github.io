import React, { useState , useEffect, useContext } from 'react';

/* Foreign components */
import { modeContext, dispatchModeContext, languageContext, dispatchLanguageContext, dispatchCursorTypeContext } from './App.js';



export function A ({children, href, target='_blank', className}) {

	/* Cursor */
	const dispatchCursorType = useContext(dispatchCursorTypeContext);
	const hoverStarts = (e) => {
		e.preventDefault();
		dispatchCursorType({type: "pointer"});
	}
	const hoverEnds = (e) => {
		e.preventDefault();
		dispatchCursorType({type: "default"});
	}

	/* Clicked Handler */
	const [isClicked, setIsClicked] = useState(false);
	const clicked = () => {
		setIsClicked(true);
	}

	/* Render */
	return (
		<a
			className={
				className + " " +
				(clicked==true ? "clicked" : "")
			}
			href={href}
			target={target}
			onMouseEnter={hoverStarts}
			onMouseOver={hoverStarts}
			onMouseLeave={hoverEnds}
			onClick={clicked}
		>
			{children}
		</a>
	);
}

export function Emoji ({children}) {
	return ( <span className="emoji">{children}</span> );
}
