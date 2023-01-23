/**
 * Notes:
 *
 *	... almost all introductions are too {{{brief or general}}}#51C0C0}}} ...
 *
 *	https://flaviocopes.com/how-to-string-contains-substring-javascript/
 *
 *	var parts = "I am a cow; cows say moo. MOOOOO.".split(/(\bmoo+\b)/gi);
 *	for (var i = 1; i < parts.length; i += 2) {
 *		parts[i] = <span className="match" key={i}>{parts[i]}</span>;
 *	}
 *	return <div>{parts}</div>;
 */

import React, { useState , useEffect } from 'react';

/* Foreign components */
import { cases } from "./cases.js";
import { Modebtn, Bio } from "./components.js";

/**
 * Home
 *
 * props:
 *	- case (str)
 *	- mode (str)
 *	- toggleMode (func)
 */
export default function Case (props) {

	return ( <p className="text_hint">Ops! something went wrong. I will fix this very soon >.&lt;</p> );

	// if (!props.case || props.cases==="") {
	// 	return ( <p className="text_hint">Ops! something went wrong. I will fix this very soon >.&lt;</p> );
	// } else {

	// 	const content_list = [];
	// 	for (let i = 0; i < props.case["content"].length; i++) {
	// 		content_list.push (props.case["content"][i][0]);
	// 	}

	// 	return (<>
	// 		{/*<p>CASE</p>*/}
	// 		<div className="page">
				
	// 			<Modebtn mode={props.mode} toggleMode={props.toggleMode} />

	// 			<div></div>

	// 		</div>
	// 	</>);

	// }
}