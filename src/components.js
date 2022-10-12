import React, { useState , useEffect } from 'react';

/* Assets */
// import bullet_large_light from "./assets/bullet_large_light@2x.png";



/**
 * Mode button
 * 
 * props:
 *	- mode (str)
 *	- toggleMode (func)
 */
function Modebtn (props) {

	// Play color-transition animation Modebtn is active.
	const [isActive, setIsActive] = useState(false);
	useEffect (() => {
		if (isActive == true) {
			props.toggleMode();
			setTimeout(() => {
				setIsActive(false);
			}, 540);
		}
	}, [isActive]);

	// Modebtn style changes after animation is finished.
	const [btnStyle, setBtnStyle] = useState("light");	// light*, dark
	useEffect (() => {
		if (isActive == true) {
			if (props.mode==="light") { setBtnStyle("dark"); }
			else { setBtnStyle("light"); }
		} else {
			setBtnStyle(props.mode);
		}
	}, [btnStyle, isActive]);

	// Render.
	return (
		<>
			<div
				className={
					"modebtn cursor_pointer zlift smooth_animation_xs " +
					"modebtn_" + btnStyle
				}
				onClick={(e) => {
					e.preventDefault();
					setIsActive(true);
				}}
			>
				<div className="modebtn_icon smooth_animation_xs"></div>
			</div>
			{isActive == true ?
				<div className="modebtn_animation_circle"></div>
			: null }
		</>
	);
}



/**
 * Bio
 *
 * props:
 *	- list (array or 2D array)
 *	- bullet_type (str): large, small*, tiny, text
 *	- mode (str)
 */
function Bio (props) {

	// "text" as bullet → props.list must be 2D array.
	if (props.bullet_type==="text") {
		return (
			<ul className="bio_list bio_list_text">
				{props.list.map (item =>
					<li><span className={"bio_item bio_item_text text_"+props.mode}>
						<div className="bio_fieldname_container">
							<div className={"bio_fieldname bio_fieldname_"+props.mode}>
								{item[0]}
							</div>
						</div>
						{item[1]}
					</span></li>
				)}
			</ul>
		);
	}

	// Use bullet dot → props.list is an array of items.
	else {
		let type = props.bullet_type ? props.bullet_type : "small";
		return (
			<ul className={"bio_list bio_list_" + type + "_" + props.mode}>
				{props.list.map (item =>
					<li><span className={"bio_item text_"+props.mode}>
						{item}
					</span></li>
				)}
			</ul>
		);
	}
}



/**
 * Contents
 *
 * props:
 *	- list (2D array): [ section title (str), hierarchy (int) ]
 *	- object large, small*, tiny, text
 *	- mode (str)
 */
function Contents (props) {

	// "text" as bullet → props.list must be 2D array.
	if (props.bullet_type==="text") {
		return (
			<ul className="bio_list bio_list_text">
				{props.list.map (item =>
					<li><span className={"bio_item bio_item_text text_"+props.mode}>
						<div className="bio_fieldname_container">
							<div className={"bio_fieldname bio_fieldname_"+props.mode}>
								{item[0]}
							</div>
						</div>
						{item[1]}
					</span></li>
				)}
			</ul>
		);
	}

	// Use bullet dot → props.list is an array of items.
	else {
		let type = props.bullet_type ? props.bullet_type : "small";
		return (
			<ul className={"bio_list bio_list_" + type + "_" + props.mode}>
				{props.list.map (item =>
					<li><span className={"bio_item text_"+props.mode}>
						{item}
					</span></li>
				)}
			</ul>
		);
	}
}



/* Export */
export { Modebtn, Bio };