import React, { useState , useEffect, useContext, useRef } from 'react';
import { Link } from "react-router-dom";

/* Foreign Components */
import { btns } from './assets.js';
import { modeContext, dispatchModeContext, languageContext, dispatchLanguageContext, dispatchCursorTypeContext } from './App.js';



export function Logo ({linkTo, clickHandler, hintblob}) {

	/* Cursor */
	const dispatchCursorType = useContext(dispatchCursorTypeContext);

	/* Hover Handler */
	const [hovering, setHovering] = useState(false);
	const hoverStarts = (e) => {
		e.preventDefault();
		dispatchCursorType({type: "pointer"});
		setHovering(true);
	}
	const hoverEnds = (e) => {
		e.preventDefault();
		dispatchCursorType({type: "default"});
		setHovering(false);
	}
	const clicked = () => {
		dispatchCursorType({type: "default"});
		clickHandler();
	}

	/* Render */
	return (
		<Link
			to={linkTo}
			className="logo-container ghost"
			onDragStart={e => e.preventDefault()}
			onMouseEnter={hoverStarts}
			onMouseOver={hoverStarts}
			onMouseLeave={hoverEnds}
			onClick={clickHandler}
		>
			<div
				className={
					"logo " +
					(hovering==true ? "logo-active" : "")
				}
			>
				<svg className="logo-body" xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40">
					<circle className="logo-bg" cx="20" cy="20" r="20"/> <path className="logo-body-dough" d="M19.2674 6.90081C19.5208 7.26294 20.478 7.26291 20.7313 6.90075C21.507 5.79169 22.9811 4.97078 25.529 7.68708C29.5627 11.9874 32.8367 17.2988 35.2057 24.7619C35.6691 26.222 35.9592 27.0388 36.2472 28.5563C36.3741 29.2249 36.4623 30.0186 36.5237 30.7979C36.6869 32.8701 35.3614 34.6964 33.3194 35.0846C30.6444 35.5931 26.2912 36.1451 19.9983 36.1451C13.6559 36.1451 9.28391 35.5844 6.61447 35.0726C4.60389 34.6871 3.28204 32.9013 3.4406 30.8602C3.50284 30.0589 3.59956 29.2396 3.74933 28.5563C4.08587 27.0208 4.32743 26.222 4.79091 24.7619C7.15998 17.2988 10.4328 11.9863 14.4676 7.68708C17.0169 4.97073 18.4915 5.79172 19.2674 6.90081Z"/> <path className="logo-body-stroke" fillRule="evenodd" clipRule="evenodd" d="M17.527 6.85939C17.159 6.85735 16.4026 7.08654 15.1967 8.37141C11.2698 12.5557 8.07046 17.7357 5.74402 25.0645C5.28489 26.5108 5.05339 27.2772 4.72613 28.7704C4.59061 29.3887 4.49829 30.156 4.43757 30.9377C4.31723 32.4868 5.3074 33.8038 6.80274 34.0905C9.40627 34.5896 13.715 35.1451 19.9983 35.1451C26.2326 35.1451 30.523 34.5982 33.1326 34.1021C34.6483 33.814 35.652 32.4661 35.5268 30.8765C35.4667 30.1132 35.3819 29.3601 35.2647 28.7427C35.0249 27.4789 34.7893 26.743 34.4209 25.5922C34.3677 25.4259 34.3117 25.2509 34.2525 25.0645C31.9262 17.7358 28.7257 12.5568 24.7996 8.37122C23.5944 7.08636 22.8385 6.85736 22.4711 6.85939C22.1504 6.86116 21.8497 7.04647 21.5507 7.47391C21.3233 7.79903 21.0015 7.96435 20.7617 8.0483C20.5087 8.1369 20.243 8.17238 19.9994 8.17239C19.7558 8.1724 19.4901 8.13693 19.2371 8.04836C18.9973 7.96443 18.6755 7.79914 18.448 7.47406C18.1491 7.04669 17.8482 6.86117 17.527 6.85939ZM19.9727 6.17169C19.4828 5.53242 18.6912 4.8658 17.538 4.85942C16.3374 4.85278 15.0819 5.57127 13.7384 7.00275C9.59567 11.4169 6.24946 16.862 3.83776 24.4593C3.36993 25.9331 3.1183 26.7644 2.7725 28.3422C2.60848 29.0906 2.50735 29.9619 2.44358 30.7827C2.24681 33.3157 3.90033 35.5704 6.42616 36.0547C9.16152 36.5791 13.5968 37.1451 19.9983 37.1451C26.3499 37.1451 30.7658 36.5879 33.5061 36.067C36.0745 35.5787 37.7218 33.2741 37.5206 30.7194C37.458 29.9241 37.3663 29.0896 37.2297 28.3698C36.966 26.9805 36.6948 26.1341 36.3245 24.9781C36.2714 24.8124 36.2162 24.6403 36.1588 24.4594C33.7471 16.8618 30.3996 11.4179 26.2583 7.00294C24.9156 5.5715 23.6605 4.8528 22.46 4.85942C21.3071 4.86578 20.5156 5.5325 20.026 6.17169C20.0174 6.17214 20.0085 6.17239 19.9993 6.17239C19.9902 6.17239 19.9812 6.17214 19.9727 6.17169Z"/> <path className="logo-body-stroke" fillRule="evenodd" clipRule="evenodd" d="M17.9018 12.2197C17.6626 12.0817 17.5807 11.7759 17.7188 11.5367L18.8854 9.51599C19.0235 9.27684 19.3293 9.1949 19.5684 9.33298C19.8076 9.47105 19.8895 9.77684 19.7514 10.016L18.5848 12.0367C18.4467 12.2759 18.1409 12.3578 17.9018 12.2197Z"/> <path className="logo-body-stroke" fillRule="evenodd" clipRule="evenodd" d="M22.1021 12.2197C22.3413 12.0817 22.4232 11.7759 22.2852 11.5367L21.1185 9.51599C20.9804 9.27684 20.6746 9.1949 20.4355 9.33298C20.1963 9.47105 20.1144 9.77684 20.2525 10.016L21.4191 12.0367C21.5572 12.2759 21.863 12.3578 22.1021 12.2197Z"/> <path className="logo-body-stroke" fillRule="evenodd" clipRule="evenodd" d="M9.58398 18.166C9.58398 17.6137 10.0317 17.166 10.584 17.166H29.4173C29.9696 17.166 30.4173 17.6137 30.4173 18.166C30.4173 18.7183 29.9696 19.166 29.4173 19.166H10.584C10.0317 19.166 9.58398 18.7183 9.58398 18.166Z"/> <path className="logo-body-stroke" d="M14.168 18.166H17.5013V22.4993C17.5013 23.4198 16.7551 24.166 15.8346 24.166V24.166C14.9142 24.166 14.168 23.4198 14.168 22.4993V18.166Z"/> <path className="logo-body-stroke" d="M22.501 18.166H25.8343V22.4993C25.8343 23.4198 25.0881 24.166 24.1676 24.166V24.166C23.2472 24.166 22.501 23.4198 22.501 22.4993V18.166Z"/>
				</svg>
				<svg className="logo-hand-L" xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 11 11">
					<path className="logo-body-dough" d="M1 5.16667C1 2.86548 2.86548 1 5.16667 1V1C7.46785 1 9.33333 2.86548 9.33333 5.16667V5.16667C9.33333 7.46785 7.46785 9.33333 5.16667 9.33333V9.33333C2.86548 9.33333 1 7.46785 1 5.16667V5.16667Z"/> <path className="logo-body-stroke" fillRule="evenodd" clipRule="evenodd" d="M0 5.16667C0 2.3132 2.3132 0 5.16667 0C8.02014 0 10.3333 2.3132 10.3333 5.16667C10.3333 8.02014 8.02014 10.3333 5.16667 10.3333C2.3132 10.3333 0 8.02014 0 5.16667ZM5.16667 2C3.41777 2 2 3.41777 2 5.16667C2 6.91557 3.41777 8.33333 5.16667 8.33333C6.91557 8.33333 8.33333 6.91557 8.33333 5.16667C8.33333 3.41777 6.91557 2 5.16667 2Z"/>
				</svg>
				<svg className="logo-hand-R" xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 11 11">
					<path className="logo-body-dough" d="M1 5.16667C1 2.86548 2.86548 1 5.16667 1V1C7.46785 1 9.33333 2.86548 9.33333 5.16667V5.16667C9.33333 7.46785 7.46785 9.33333 5.16667 9.33333V9.33333C2.86548 9.33333 1 7.46785 1 5.16667V5.16667Z"/> <path className="logo-body-stroke" fillRule="evenodd" clipRule="evenodd" d="M0 5.16667C0 2.3132 2.3132 0 5.16667 0C8.02014 0 10.3333 2.3132 10.3333 5.16667C10.3333 8.02014 8.02014 10.3333 5.16667 10.3333C2.3132 10.3333 0 8.02014 0 5.16667ZM5.16667 2C3.41777 2 2 3.41777 2 5.16667C2 6.91557 3.41777 8.33333 5.16667 8.33333C6.91557 8.33333 8.33333 6.91557 8.33333 5.16667C8.33333 3.41777 6.91557 2 5.16667 2Z"/>
				</svg>
			</div>
			{hintblob ?
				<img
					className={
						"hintblob-left-top " +
						(hovering==true ? "hintblob-shown" : "")
					}
					style={{"--hintblob-left": hintblob.left+"px", "--hintblob-top": hintblob.top+"px"}}
					src={hintblob.blob}
					alt=""
				/>
			: null }
		</Link>
	);
}



export function ControlBtn ({btnContent, overflow=false, clickHandler, itchClass="", hoveredObserver}) {

	/* Cursor */
	const dispatchCursorType = useContext(dispatchCursorTypeContext);

	/* Hover Handler */
	const [hovered, setHovered] = useState(false);
	const [hovering, setHovering] = useState(false);
	const hoverStarts = (e) => {
		e.preventDefault();
		dispatchCursorType({type: "pointer"});
		setHovering(true);
		if (hoveredObserver) { hoveredObserver(true); }
		if (hovered == false) {
			setHovered(true);
			setTimeout (() => {
				setHovered(false);
			}, 280); // $control-btn-itching-transition time 270ms with a bit of extra
		}
	}
	const hoverOver = (e) => {
		e.preventDefault();
		dispatchCursorType({type: "pointer"});
		if (hoveredObserver) { hoveredObserver(true); }
	}
	const hoverEnds = (e) => {
		e.preventDefault();
		dispatchCursorType({type: "default"});
		setHovering(false);
		if (hoveredObserver) { hoveredObserver(false); }
	}

	/* Click Handler */
	const clicked = (e) => {
		if (clickHandler) {
			e.preventDefault();
			clickHandler();
		} else {
			window.open(btnContent.url, '_blank');
		}
	}

	/* Render */
	return (
		<div
			className={
				"control-btn " +
				(itchClass != "" ?
					(hovered ? itchClass : "")
				:
					"control-btn-hover-default"
				)
			}
			style={{"overflow": overflow==true ? "visible" : "hidden"}}
			onMouseEnter={hoverStarts}
			onMouseOver={hoverOver}
			onMouseLeave={hoverEnds}
			onClick={clicked}
		>
			{btnContent.icon}
			{btnContent.hintblob ?
				<img
					className={
						"hintblob-left-top " +
						(hovering==true ? "hintblob-shown" : "")
					}
					style={{"--hintblob-left": btnContent.hintblob.left+"px", "--hintblob-top": btnContent.hintblob.top+"px"}}
					src={btnContent.hintblob.blob}
					alt=""
				/>
			: null }
		</div>
	);
}



export function ControlToggle ({btnContent, togglerCurr, togglerUpdateHandler, secondaries, secondaryUpdateHandler, newlyClickedSecondary}) {	// togglerCurr: true = toggle to left, false = toggle to right

	const toggleSecondary = (togglerCurr==true ? secondaries[0] : secondaries[1]);

	/* Cursor */
	const dispatchCursorType = useContext(dispatchCursorTypeContext);

	/* Hover Handler */
	const [hovering, setHovering] = useState(false);
	const togglerHoverOver  = (e) => {
		e.preventDefault();
		dispatchCursorType({type: "pointer"});
		setHovering(true);
	}
	const togglerHoverEnds  = (e) => {
		e.preventDefault();
		dispatchCursorType({type: "default"});
		setHovering(false);
	}

	/* Toggler Handler */
	const [hoveredTogglerChanging, setHoveredTogglerChanging] = useState(false);
	const [triggeredTogglerChanging, setTriggeredTogglerChanging] = useState(false);
	const togglerHoverStarts = (e) => {
		e.preventDefault();
		dispatchCursorType({type: "pointer"});
		setHovering(true);
		if (hoveredTogglerChanging == false && triggeredTogglerChanging == false) {
			setHoveredTogglerChanging(true);
			setTimeout (() => {
				setHoveredTogglerChanging(false);
			}, 280); // $control-btn-itching-transition time 270ms with a bit of extra
		}
	}
	const togglerChangeTriggered = (e) => {
		e.preventDefault();
		if (triggeredTogglerChanging == false) {
			setTriggeredTogglerChanging(true);
			setHoveredTogglerChanging(false);
			togglerUpdateHandler(e);
			setTimeout (() => {
				setTriggeredTogglerChanging(false);
			}, 145); // cooling-off period before next trigger, $time-s 135ms with a bit of extra
		}
	}

	/* Secondary Handler */
	// Hover effect is handled by CSS.
	const secondaryChangeTriggered = (e, newCurr) => {
		e.preventDefault();
		secondaryUpdateHandler(newCurr);
	}

	/* Render */
	return (
		<div className="control-toggle">
			<div
				className={
					"control-toggler " +
					"control-toggler-" + (togglerCurr==true ? "left" : "right") + " " +
					(hoveredTogglerChanging ? "control-toggler-itching" : "")
				}
				onMouseEnter={togglerHoverStarts}
				onMouseOver={togglerHoverOver}
				onMouseLeave={togglerHoverEnds}
				onClick={togglerChangeTriggered}
			>
				{btnContent.bg}
				{btnContent.fg}
				{btnContent.hintblobs ?
					<img
						className={
							"hintblob-left-top " +
							(hovering==true ? "hintblob-shown" : "")
						}
						style={{
							"--hintblob-left": (togglerCurr==true ? btnContent.hintblobs[0].left : btnContent.hintblobs[1].left)+"px",
							"--hintblob-top": (togglerCurr==true ? btnContent.hintblobs[0].top : btnContent.hintblobs[1].top)+"px",
						}}
						src={togglerCurr==true ? btnContent.hintblobs[0].blob : btnContent.hintblobs[1].blob}
						alt=""
					/>
				: null }
			</div>
			<div className="control-toggle-secondary">
				{toggleSecondary.content.map((tab, idx) =>
					<ControlToggleSecondaryTab
						key={idx}
						tabContent={tab[0]}
						curr={
							newlyClickedSecondary===idx
							|| (newlyClickedSecondary<0 && toggleSecondary.curr===idx)
						}
						updateHandler={(e) => { secondaryChangeTriggered(e, idx); }}
					/>
				)}
			</div>
		</div>
	);
}

function ControlToggleSecondaryTab ({tabContent, curr, updateHandler}) {

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

	/* Render */
	return (
		// <Link	//TODO!!!
		// 	to={"/#" + tabContent}
		// >
			<div
				className={
					"control-toggle-secondary-tab " +
					(curr==true ? "control-toggle-secondary-tab-curr" : "")
				}
				onMouseEnter={hoverStarts}
				onMouseOver={hoverStarts}
				onMouseLeave={hoverEnds}
				onClick={updateHandler}
			>
				{tabContent}
			</div>
		// </Link>
	);
}



export function ControlSwitch ({btnContent, curr, updateHandler}) {	// curr: true = circle fg left, false = circle fg right

	/* Cursor */
	const dispatchCursorType = useContext(dispatchCursorTypeContext);

	/* Switch Handler */
	const [hoveredChanging, setHoveredChanging] = useState(false);
	const [triggeredChanging, setTriggeredChanging] = useState(false);
	const hoverStarts = (e) => {
		e.preventDefault();
		if (hoveredChanging == false && triggeredChanging == false) {
			dispatchCursorType({type: "pointer"});
			setHoveredChanging(true);
			setTimeout (() => {
				setHoveredChanging(false);
			}, 280); // $control-btn-itching-transition time 270ms with a bit of extra
		}
	}
	const changeTriggered = (e) => {
		e.preventDefault();
		if (triggeredChanging == false) {
			setTriggeredChanging(true);
			setHoveredChanging(false);
			updateHandler();
			setTimeout (() => {
				setTriggeredChanging(false);
			}, 145); // cooling-off period before next trigger, $time-s 135ms with a bit of extra
		}
	}

	/* Render */
	return (
		<div
			className={
				"control-switch " +
				"control-switch-" + (curr==true ? "left" : "right") + " " +
				(hoveredChanging ? "control-switch-itching" : "")
			}
			onMouseEnter={hoverStarts}
			onMouseOver={() => {dispatchCursorType({type: "pointer"});}}
			onMouseLeave={() => {dispatchCursorType({type: "default"});}}
			onClick={changeTriggered}
		>
			{btnContent}
			<div className="control-switch-mask"></div>
		</div>
	);
}



export function ControlExpandable ({btnContent}) {

	/* Expand Handler */
	const [hovered, setHovered] = useState(false);
	const [hoverJustEnded, setHoverJustEnded] = useState(false);
	const [expanded, setExpanded] = useState(false);
	const [fullyExpanded, setFullyExpanded] = useState(false);
	const hoverStarts = (e) => {
		e.preventDefault();
		setHovered(true);
	}
	const hoverEnds = (e) => {
		e.preventDefault();
		setHovered(false);
		setHoverJustEnded(true);
	}
	useEffect(() => {
		if (hoverJustEnded == true) {
			setTimeout (() => {
				if (hovered == false) {
					setHoverJustEnded(false);
				}
			}, 2010); // 2s with a bit of extra
		}
	}, [hoverJustEnded])
	useEffect(() => {
		if (hovered == true || hoverJustEnded == true) {
			setExpanded(true);
		} else {
			setExpanded(false);
		}
	}, [hovered, hoverJustEnded])
	useEffect(() => {
		if (expanded == true) {
			setTimeout (() => {
				if (expanded == true) {
					setFullyExpanded(true);
				}
			}, 280);	// $control-expandable-expand-transition-in time 270ms with a bit of extra
		} else {
			setFullyExpanded(false);
		}
	}, [expanded]);

	/* Hintblobs */
	const [hoveredDuckling, setHoveredDuckling] = useState(-1);	// -1 = none is hovered
	const [hoveredDucklingObservers, setHoveredDucklingObservers] = useState(Array(btnContent[1].length));
	const hoveredDucklingObserver = (idx, hovered) => {
		setHoveredDucklingObservers(prev => {
			const newHoveredDucklingObservers = [...prev];
			newHoveredDucklingObservers[idx] = hovered;
			return newHoveredDucklingObservers;
		});
	}
	useEffect(() => {
		for (let i = 0; i < btnContent[1].length; i++) {
			if (hoveredDucklingObservers[i] == true) {
				setHoveredDuckling(i);
				return;
			}
		}
		setHoveredDuckling(-1);
	}, [hoveredDucklingObservers]);

	/* Render */
	return (
		<div className="control-expandable-container">
			<div
				className={
					"control-expandable " +
					(expanded == true ? "control-expandable-expanded" : "")
				}
				style={{"--num-duckling": btnContent[1].length}}
				onMouseEnter={hoverStarts}
				onMouseOver={hoverStarts}
				onMouseLeave={hoverEnds}
			>
				<div className="control-expandable-icons">
					<div className="control-expandable-motherduck">
						{btnContent[0]}
					</div>
					{btnContent[1].map((duckling, idx) =>
						<ControlBtn
							key={idx}
							btnContent={duckling}
							hoveredObserver={(hovered) => { hoveredDucklingObserver(idx, hovered); }}
						/>
					)}
				</div>
			</div>
			{btnContent[2] ?
				btnContent[2].map((hintblob, idx) =>
					<img
						key={idx}
						className={
							"hintblob-left-top " +
							(fullyExpanded==true && hoveredDuckling===idx ? "hintblob-shown" : "")
						}
						style={{"--hintblob-left": hintblob.left+"px", "--hintblob-top": hintblob.top+"px"}}
						src={hintblob.blob}
						alt=""
					/>
				)
			: null }
		</div>
	);
}



export function A ({children, href, target='_blank', className=""}) {

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



export function P ({children}) {
	return ( <div className="paragraph">{children}</div> );
}



export function ExpandablePs ({children, peekHeight="160px", prompt="Read More", defaultExpanded=false}) {

	/* Prompt Hover Handler */
	const dispatchCursorType = useContext(dispatchCursorTypeContext);
	const promptHoverStarts = (e) => {
		e.preventDefault();
		dispatchCursorType({type: "pointer"});
	}
	const promptHoverEnds = (e) => {
		e.preventDefault();
		dispatchCursorType({type: "default"});
	}

	/* Expand Handler */
	const [expanded, setExpanded] = useState(defaultExpanded);
	const expandableContentRef = useRef(null);
	const [contentFullHeight, setContentFullHeight] = useState("auto");
	useEffect(() => {
		if (expandableContentRef.current) {
			setContentFullHeight(expandableContentRef.current.clientHeight + "px");
		}
	}, [expandableContentRef]);
	const expand = (e) => {
		e.preventDefault();
		setExpanded(true);
		dispatchCursorType({type: "default"});
	}
	// const collapse = (e) => {
	// 	e.preventDefault();
	// 	setExpanded(false);
	// }

	/* Render */
	return (
		<div className="paragraph-expandable-container">
			<div
				className={"paragraph-expandable " + (expanded==true ? "expanded" : "")}
				style={{ "height" : expanded==true ? "auto"/*contentFullHeight*/ : peekHeight}}	// TODO: smooth expansion, the current method with contentFullHeight doesn't work with screen resize or large image load.
			>
				<div
					ref={expandableContentRef}
					className="paragraph-expandable-content"
				>
					{children}
				</div>
			</div>
			{expanded==false ?
				<div
					className="paragraph-expandable-prompt"
					onMouseEnter={promptHoverStarts}
					onMouseOver={promptHoverStarts}
					onMouseLeave={promptHoverEnds}
					onClick={expand}
				>
					{prompt}
				</div>
			: null }
		</div>
	);
}



export function Img ({src, alt="", caption="", sizeId=0, zoomable=true}) {

	/* Standardize Size */
	const sizeMap = [
		["100%", "auto"],
		["75%", "auto"],
		["50%", "auto"],
		["125%", "auto"],
		["150%", "auto"],
		["1000%", "auto"],	// CSS will clamp this to page width
		["auto", "100%"],
	];

	/* Zoom Handler */	// TODO: modal

	/* Render */
	return (
		<div className="image-container">
			<img
				className={"image " + (zoomable ? "zoomable" : "")}
				src={src}
				alt={alt}
				style={{"--image-width": sizeMap[sizeId][0], "--image-height": sizeMap[sizeId][1]}}
			/>
			{caption != "" ?
				<div className="image-caption">{caption}</div>
			: null }
		</div>
	);
}



export function ImgGallery ({imgList, heightId=(-1), widthId=(-1), wrap=false, autoplay=true, zoomable=true, style={}}) {	// imgList: [[image as required path, alt], [...]]

	/* Standardize Size */
	const heightMap = ["400px", "600px", "800px", "300px", "200px", "50vh", "100vh"];
	const widthMap = ["400px", "600px", "800px", "300px", "200px", "50vw", "100%"];

	/* Dispatch Render */
	const classList =
		"gallery-container-out " +
		(heightId >= 0 ? "fixed-height" : "") + " " +
		(widthId >= 0 ? "fixed-width" : "") + " " +
		(wrap == true ? "wrap" : "");
	const styleList = {
		...style,
		"--gallery-height": (heightId >= 0 ? heightMap[heightId] : "auto"),
		"--gallery-width": (widthId >= 0 ? widthMap[widthId] : "auto"),
	};
	if (autoplay == false) {
		return (
			<ImgGalleryStatic
				imgList={imgList}
				classList={classList}
				styleList={styleList}
				zoomable={zoomable}
			/>
		);
	} else {
		return (
			<ImgGalleryAutoplay
				imgList={imgList}
				classList={classList}
				styleList={styleList}
				zoomable={zoomable}
			/>
		);
	}
}

function ImgGalleryStatic ({imgList, classList, styleList, zoomable}) {

	/* Zoom Handler */	// TODO: modal

	/* Render */
	return (
		<div
			className={classList + " static"}
			style={styleList}
		>
			<div className="gallery-container-in">
				<div className="gallery">
					{imgList.map((img, idx) => {
						if (img.length < 1) {
							console.error("Error reading image source at index", idx, "of imgList", imgList);
						} else {
							return (
								<img
									key={idx}
									className={"gallery-image " + (zoomable==true ? "zoomable" : "")}
									src={img[0]}
									alt={img.length > 1 ? img[1] : ""}
								/>
							);
						}
					})}
				</div>
			</div>
		</div>
	);
}

function ImgGalleryAutoplay ({imgList, classList, styleList, zoomable}) {

	/* Autoplay If Reasonable */
	const [autoplayOn, setAutoplayOn] = useState(false);
	const galleryRef = useRef(null);
	const numImgs = imgList.length;
	const [allImgLoader, setAllImgLoader] = useState(Array(2 * numImgs).fill(false));
	const [allImgLoaded, setAllImgLoaded] = useState(false);
	useEffect(() => {
		if (!allImgLoader.includes(false)) { setAllImgLoaded(true); }
		else { setAllImgLoaded(false); }
	}, [allImgLoader]);
	const [galleryWidth, setGalleryWidth] = useState();	// since autoplayOn is off by default, galleryWidth only contains 1 copy of the images set
	const [galleryAutoplayTime, setGalleryAutoplayTime] = useState("100000ms");	// $time-inf
	const confirmImgLoaded = (idx) => {
		setAllImgLoader(prev => {
			let newAllImgLoader = [...prev];
			newAllImgLoader[idx] = true;
			return newAllImgLoader;
		});
	}
	useEffect(() => {
		if (galleryRef.current && allImgLoaded == true) {
			const galleryWidth = galleryRef.current.getBoundingClientRect().width;
				// "getBoundingClientRect().width" gets the accurate floating point width value. "clientWidth" only gets int.
			setGalleryWidth(galleryWidth);
			setGalleryAutoplayTime((5 * (2 * galleryWidth + 16) + "ms"));
				// Speed is 0.02pixel/ms, aka 5ms/pixel.
				// Gallery full width when autoplaying will contain 2 copies of the images set, plus middle $gallery-gap 16px.
		}
	}, [galleryRef, allImgLoaded]);
	const {width: viewportWidth} = useViewportDimensions();
	useEffect(() => {
		if (galleryWidth) {
			if (viewportWidth >= galleryWidth) { setAutoplayOn(false); }	// 
			else { setAutoplayOn(true); }
		}		
	}, [galleryWidth, viewportWidth]);

	/* Hover To Stop */
	const [hoveringImg, setHoveringImg] = useState(false);
	const hoverImgStarts = (e) => {
		e.preventDefault();
		setHoveringImg(true);
	}
	const hoverImgEnds = (e) => {
		e.preventDefault();
		setHoveringImg(false);
	}

	/* Zoom Handler */	// TODO: modal

	/* Render */
	return (
		<div
			className={
				classList + " " +
				(autoplayOn ? "autoplay" : "static")
			}
			style={{
				...styleList,
				"--gallery-autoplay-time": galleryAutoplayTime,
			}}
		>
			<div className="gallery-container-in">
				<div
					ref={galleryRef}
					className={"gallery " + (hoveringImg ? "wait" : "")}
					onMouseLeave={hoverImgEnds}
				>
					{imgList.map((img, idx) => {
						if (img.length < 1) {
							console.error("Error reading image source at index", idx, "of imgList", imgList);
						} else {
							return (
								<img
									key={idx}
									className={"gallery-image " + (zoomable==true ? "zoomable" : "")}
									src={img[0]}
									alt={img.length > 1 ? img[1] : ""}
									onLoad={() => { confirmImgLoaded(idx); }}
									onMouseEnter={hoverImgStarts}
									onMouseOver={hoverImgStarts}
									onMouseLeave={hoverImgEnds}
								/>
							);
						}
					})}
					{imgList.map((img, idx) => {
						if (img.length < 1) {
							console.error("Error reading image source at index", idx, "of imgList", imgList);
						} else {
							return (
								<img
									key={numImgs + idx}
									className={
										"gallery-image " +
										(zoomable ? "zoomable" : "")
									}
									style={{"display": autoplayOn==true ? "flex" : "none"}}
									src={img[0]}
									alt={img.length > 1 ? img[1] : ""}
									onLoad={() => { confirmImgLoaded(numImgs + idx); }}
									onMouseEnter={hoverImgStarts}
									onMouseOver={hoverImgStarts}
								/>
							);
						}
					})}
				</div>
			</div>
		</div>
	);
}



function Scrollable ({data, frame, children}) {	// data: [<device height>, <device width>, <screen top>, <screen right>, <screen bottom>, <screen left>]

	/* Scroll Indicator */	// TODO: fading on top and bottom with intersection observer?
	const scrollMeHintblob = btns.components.scrollable.hintblob;
	const [scrolling, setScrolling] = useState(false);
	const timerRef = useRef(null);
	const scrollStarts = () => {
		if(timerRef.current) {
			clearTimeout(timerRef.current);
		}
		setScrolling(true);
		timerRef.current = setTimeout(() => {
			setScrolling(false);
		}, 810);	// $time-xl 800ms with a bit of extra
	}

	/* Render */
	return (
		<div
			className="scrollable-container-out"
			style={{
				"--frame-height": data[0],
				"--frame-width": data[1],
				"--screen-top": data[2],
				"--screen-right": data[3],
				"--screen-bottom": data[4],
				"--screen-left": data[5]
		}}
		>
			<div className="scrollable-container-mid">
				<div className="scrollable-container-in">
					<div
						className="scrollable-content"
						onScroll={scrollStarts}
					>
						{children}
					</div>
					<div className="scrollable-frame-container">
						{frame}
					</div>
					<img
						className={
							"scrollable-hintblob hintblob-right-top " +
							(scrolling==false ? "hintblob-shown" : "")
						}
						src={scrollMeHintblob.blob}
						style={{"--hintblob-right": scrollMeHintblob.right+"px", "--hintblob-top": scrollMeHintblob.top+"px"}}
						alt=""
					/>
				</div>
			</div>
		</div>
	);
}

export function ScrollableMobile ({children}) {	// screen size: 390 x 844

	/* Data */
	const data = ["894", "446", "24", "28", "26", "28"];
	const frame =
		<svg className="scrollable-frame scrollable-mobile-frame" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 446 894">
			<path className="scrollable-frame-fill-1" fillRule="evenodd" clipRule="evenodd" d="M2.53903 231.312C1.71366 231.498 0.723927 231.974 0.195445 232.649C0.0865909 232.788 0.000488281 233.228 0.000488281 233.356C0.000488281 239.742 0.000488281 259.194 0.000488281 291.712C0.000488281 291.848 0.121681 292.534 0.195886 292.701C0.623549 293.66 1.36662 293.892 2.53903 294.446H4.98963C4.98963 292.699 5.01406 233.021 4.98963 231.312H2.53903Z"/> <path className="scrollable-frame-fill-1" fillRule="evenodd" clipRule="evenodd" d="M2.53903 313.925C1.71366 314.11 0.723927 314.586 0.195445 315.261C0.0865909 315.401 0.000488281 315.841 0.000488281 315.968C0.000488281 322.354 0.000488281 341.807 0.000488281 374.324C0.000488281 374.46 0.121681 375.147 0.195886 375.313C0.623549 376.272 1.36662 376.504 2.53903 377.059H4.98963C4.98963 375.311 5.01406 315.633 4.98963 313.925H2.53903Z"/> <path className="scrollable-frame-fill-1" fillRule="evenodd" clipRule="evenodd" d="M2.53903 168.179C1.13703 168.179 0.000488281 169.253 0.000488281 170.577V200.035C0.000488281 201.359 1.13703 202.433 2.53903 202.433H4.98963C4.98963 200.631 5.01406 169.94 4.98963 168.179H2.53903Z"/> <path className="scrollable-frame-fill-1" fillRule="evenodd" clipRule="evenodd" d="M443.461 265C444.863 265 446 268.228 446 272.21V360.79C446 364.772 444.863 368 443.461 368H441.011C441.011 362.582 440.986 270.296 441.011 265H443.461Z"/> <path className="scrollable-frame-fill-0" d="M5 76.6385C5 50.9108 10.975 32.0569 23.2687 19.6248C35.5604 7.19488 54.3514 1 80.3994 1H365.601C391.649 1 410.44 7.19488 422.731 19.6248C435.025 32.0569 441 50.9108 441 76.6385V817.362C441 842.185 434.611 861.052 422.091 873.717C409.573 886.379 390.769 893 365.601 893H80.3994C54.3514 893 35.5603 886.805 23.2687 874.375C10.975 861.943 5 843.089 5 817.362V76.6385ZM138.586 54.1993C130.389 54.1993 124.596 51.2518 120.846 47.1725C117.076 43.0723 115.319 37.7731 115.319 33.0131L115.319 32.8676C115.32 30.7511 115.321 28.262 114.185 26.3289C112.936 24.2034 110.516 23 106.346 23H73.0659C58.8125 23 47.2687 27.3059 39.2869 35.2875C31.3051 43.2691 26.9991 54.8126 26.9991 69.0657L26.9991 822.933C26.9991 837.186 31.3051 848.729 39.2869 856.711C47.2687 864.693 58.8125 868.999 73.0658 868.999H372.933C387.187 868.999 398.73 864.693 406.712 856.711C414.694 848.729 419 837.186 419 822.933L419 69.0657C419 54.8126 414.694 43.2691 406.712 35.2875C398.73 27.3059 387.187 23 372.933 23H339.306C335.136 23 332.709 24.2046 331.462 26.3817C330.869 27.4161 330.596 28.5863 330.464 29.7588C330.333 30.9176 330.333 32.15 330.333 33.329V33.3598C330.333 42.5134 323.361 54.1993 307.066 54.1993H138.586Z"/> <path className="scrollable-frame-stroke-1" d="M5 76.6385C5 50.9108 10.975 32.0569 23.2687 19.6248C35.5604 7.19488 54.3514 1 80.3994 1H365.601C391.649 1 410.44 7.19488 422.731 19.6248C435.025 32.0569 441 50.9108 441 76.6385V817.362C441 842.185 434.611 861.052 422.091 873.717C409.573 886.379 390.769 893 365.601 893H80.3994C54.3514 893 35.5603 886.805 23.2687 874.375C10.975 861.943 5 843.089 5 817.362V76.6385ZM138.586 54.1993C130.389 54.1993 124.596 51.2518 120.846 47.1725C117.076 43.0723 115.319 37.7731 115.319 33.0131L115.319 32.8676C115.32 30.7511 115.321 28.262 114.185 26.3289C112.936 24.2034 110.516 23 106.346 23H73.0659C58.8125 23 47.2687 27.3059 39.2869 35.2875C31.3051 43.2691 26.9991 54.8126 26.9991 69.0657L26.9991 822.933C26.9991 837.186 31.3051 848.729 39.2869 856.711C47.2687 864.693 58.8125 868.999 73.0658 868.999H372.933C387.187 868.999 398.73 864.693 406.712 856.711C414.694 848.729 419 837.186 419 822.933L419 69.0657C419 54.8126 414.694 43.2691 406.712 35.2875C398.73 27.3059 387.187 23 372.933 23H339.306C335.136 23 332.709 24.2046 331.462 26.3817C330.869 27.4161 330.596 28.5863 330.464 29.7588C330.333 30.9176 330.333 32.15 330.333 33.329V33.3598C330.333 42.5134 323.361 54.1993 307.066 54.1993H138.586Z" strokeWidth="2" vectorEffect="non-scaling-stroke"/> <path className="scrollable-frame-fill-1" fillRule="evenodd" clipRule="evenodd" d="M270 40C273.314 40 276 37.3137 276 34C276 30.6863 273.314 28 270 28C266.686 28 264 30.6863 264 34C264 37.3137 266.686 40 270 40Z"/> <path className="scrollable-frame-fill-1" d="M196 34C196 31.5 197.5 30 200 30H246C248.5 30 250 31.5 250 34C250 36.5 248.5 38 246 38H200C197.5 38 196 36.5 196 34Z"/> <line className="scrollable-frame-stroke-1" x1="158" y1="854" x2="288" y2="854" strokeWidth="4" strokeLinecap="round" vectorEffect="non-scaling-stroke"/>
		</svg>;

	/* Render */
	return (
		<Scrollable data={data} frame={frame}>
			{children}
		</Scrollable>
	);
}

export function ScrollableDesktop ({children}) {	// TODO

	/* Data */
	const data = ["832", "1280", "36", "16", "16", "16"];
	const frame =
		<svg className="scrollable-frame scrollable-desktop-frame" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 960 625">
			<path className="scrollable-frame-fill-0" fillRule="evenodd" clipRule="evenodd" d="M960 624H0V6C0 2.68629 2.68631 0 6.00002 0H954C957.314 0 960 2.68628 960 5.99999V624ZM948 12H12V612H948V12Z"/> <path className="scrollable-frame-stroke-1" d="M11 12V11H12H948H949V12V612V613H948H12H11V612V12ZM1 623H959V6C959 3.23859 956.761 1 954 1H6.00002C3.23859 1 1 3.23859 1 6V623Z" strokeWidth="2" vectorEffect="non-scaling-stroke"/> <path className="scrollable-frame-fill-1" d="M960 608V624H944L960 608Z"/> <path className="scrollable-frame-fill-0" d="M6.00002 0H954C957.314 0 960 2.68629 960 6V26.25H0V6C0 2.68629 2.68631 0 6.00002 0Z"/> <path className="scrollable-frame-stroke-1" d="M6.00002 1H954C956.761 1 959 3.23856 959 5.99999V26H1V6C1 3.23858 3.23859 1 6.00002 1Z" strokeWidth="2" vectorEffect="non-scaling-stroke"/> <path className="scrollable-frame-fill-1" fillRule="evenodd" clipRule="evenodd" d="M919.5 18C917.015 18 915 15.9853 915 13.5C915 11.0147 917.015 9 919.5 9C921.985 9 924 11.0147 924 13.5C924 15.9853 921.985 18 919.5 18Z"/> <path className="scrollable-frame-fill-1" fillRule="evenodd" clipRule="evenodd" d="M933 18C930.515 18 928.5 15.9853 928.5 13.5C928.5 11.0147 930.515 9 933 9C935.485 9 937.5 11.0147 937.5 13.5C937.5 15.9853 935.485 18 933 18Z"/> <path className="scrollable-frame-fill-1" fillRule="evenodd" clipRule="evenodd" d="M946.5 18C944.015 18 942 15.9853 942 13.5C942 11.0147 944.015 9 946.5 9C948.985 9 951 11.0147 951 13.5C951 15.9853 948.985 18 946.5 18Z"/>
		</svg>;

	/* Render */
	return (
		<Scrollable data={data} frame={frame}>
			{children}
		</Scrollable>
	);
}



export function Prototype ({src, caption="", frameWidth="100%", frameRatioId=0, prototypeWidth="100%", prototypeHeight="100%", prototypeTop="0%", prototypeLeft="auto", prototypeRight="auto"}) {	// Prototype data should be in percentage.

	/* Cursor */
	const dispatchCursorType = useContext(dispatchCursorTypeContext);
	const cursorOver = (e) => {
		e.preventDefault();
		dispatchCursorType({type: "none"});
	}
	const cursorOut = (e) => {
		e.preventDefault();
		dispatchCursorType({type: "default"});
	}

	/* Frame Ratio */
	const ratioMap = ["1-1", "3-4", "4-3", "1-2", "2-1"];	// height-width

	/* Render */
	return (
		<div
			className={
				"prototype-container-out " +
				"ratio-" + ratioMap[frameRatioId]
			}
			style={{
				"--frame-width": frameWidth,
				"--prototype-width": prototypeWidth,
				"--prototype-height": prototypeHeight,
				"--prototype-top": prototypeTop,
				"--prototype-left": prototypeLeft,
				"--prototype-right": prototypeRight,
			}}
		>
			<div className="prototype-container-mid">
				<div className="prototype-container-in">
					<iframe
						src={src}
						className="prototype"
						onMouseEnter={cursorOver}
						onMouseOver={cursorOver}
						onMouseLeave={cursorOut}
					></iframe>
				</div>
			</div>
			{caption != "" ?
				<div className="image-caption">{caption}</div>
			: null }
		</div>
	);
}



function useViewportDimensions() {	// custom hook must start with "use"
	const [viewportDimensions, setViewportDimensions] = useState(getViewportDimensions());
	useEffect(() => {
		const handleResize = () => { setViewportDimensions(getViewportDimensions()); }
		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, []);
	return viewportDimensions;
}
function getViewportDimensions() {
	const { innerWidth: width, innerHeight: height } = window;
	return { width, height };
}
