import React, { useState, useEffect, lazy, Suspense } from 'react';
import { Link } from "react-router-dom";

/* Foreign components */
import { cases } from "./cases.js";
//import { journey } from "./journeys.js";

/* Assets */
import case_studies_hint_tag from "./assets/basic/case_studies_hint_tag_2@2x.png";

/* Libraries */
import parse from 'html-react-parser';
import useIsInViewport from "use-is-in-viewport";

/* Lazy loads */
const SectionContent = lazy(() => import('./components.js'));



/**
 * Journey item
 *
 * props:
 *	- journey (array)
 *	- year (str)
 *	- j (int)
 *	- journey_ref (ref)
 *	- setJourneyInViewportState (func)
 *	- journey_dic
 *	- i (int)
 *	- firstCaseStudy (array)
 *	- setModalSrc (func)
 *	- mode (str)
 */
export default function JourneyItem (props) {

	//useEffect (() => { console.log("JourneyItem ", props.year, " ", props.j, " is rendered", props.journey_ref); }, []); //DEBUG

	/* InViewport checker */
	const [isInViewport, targetWrapperRef] = useIsInViewport({
		target: props.journey_ref,
		threshold: 0,
		modTop: "-40px",
		modBottom: "-40px"
	});
	useEffect (() => {
		props.setJourneyInViewportState(prev => {
			let newJourneyInViewportState = [...prev];
			newJourneyInViewportState[props.journey_dic[props.i][props.j]] = isInViewport;
			return newJourneyInViewportState;
		});
	}, [isInViewport]);

	/* Read more object */
	const [hoveringObject, setHoveringObject] = useState(false);
	const [timer, setTimer] = useState(true); // true(tic)*, false(tac)
	const [isBlinking, setIsBlinking] = useState(false);

	useEffect(() => {
		//console.log("timer: ", timer); //DEBUG
		const random_delay = 4000 + Math.random() * 4000; // blink every 4s - 8s
		if (timer==true) {
			setTimer(false);
			setTimeout (() => {
				setIsBlinking(true);
				setTimer(true);
			}, random_delay);
		}
	}, [timer]);

	useEffect(() => {
		//console.log("isBlinking: ", isBlinking); //DEBUG
		if (isBlinking==true) {
			setTimeout (() => { setIsBlinking(false); }, 135); // blink for var(--delay-s)
		}
	}, [isBlinking]);

	return (
		<div
			ref={targetWrapperRef}
			id={props.year+"_"+props.j}
			className={"journey_journey journey_journey_"+props.mode}
		>
			<div className={
				"journey_journey_header " +
				"journey_journey_header_"+props.mode + " " +
				(props.journey[1].length !== 0 ? "journey_journey_header_with_readmore" : "")
			}>
				<div className={"journey_journey_title text_"+props.mode}>
					{props.journey[0][0]}
				</div>
				{props.journey[0].length > 1 ?
					<div className={"journey_journey_client text_hint text_hint_"+props.mode}>
						{props.journey[0][1]}
					</div>
				: null }

				{props.journey[1].length > 0 ?
					<div className="journey_journey_readmore">
						<div className="journey_journey_object_div_outer">
							<Link to={"/case-"+props.journey[1][0]} state={{ goBack: true }} >
								<div
									className="journey_journey_object cursor_readmore_2"
									onMouseEnter={() => { setHoveringObject(true); }}
									onMouseOver={() => { setHoveringObject(true); }}
									onMouseLeave={() => { setHoveringObject(false); }}
								>
									<img
										className={
											"journey_journey_object_img " +
											(hoveringObject==true ? "journey_journey_object_img_active" : "")
										}
										srcSet={
											(hoveringObject==false ?
												(isBlinking===false ?
													(props.mode==="light" ? props.journey[1][1][0] : props.journey[1][1][1])	// default
												:
													(props.mode==="light" ? props.journey[1][1][4] : props.journey[1][1][5])	// blinking
												)
											:
												(props.mode==="light" ? props.journey[1][1][2] : props.journey[1][1][3])	// active (hovered)
											)
											+" 6x"
										}
										onDragStart={e => e.preventDefault()}
									/>
								</div>
							</Link>
						</div>
					</div>
				: null }

				{/*(props.i==props.firstCaseStudy[0] && props.j==props.firstCaseStudy[1] && hoveringObject==false) ?*/
				(props.journey[1].length > 0 && hoveringObject==false) ?
					<div className="journey_journey_object_hint_div">
						<img className="journey_journey_object_hint" srcSet={case_studies_hint_tag+" 2x"} />
					</div>
				: null }
			</div>

			<div className={"journey_journey_content content text_"+props.mode}>
				{props.journey[2].map ((group, g) => 
					<Suspense fallback={<div className={"text_hint_"+props.mode}>Loading...</div>}>
						{(() => {
							if (group[0] == 1) {
								return (
									<div className="journey_journey_content_group journey_journey_content_group_col1">
										<SectionContent
											content={group[1]}
											suffix="journey"
											setModalSrc={props.setModalSrc}
											mode={props.mode}
										/>
									</div>
								);
							} else if (group[0] == 2) {
								return (
									<div className="journey_journey_content_group journey_journey_content_group_col2">
										<div className="journey_journey_content_group_img">
											<SectionContent
												content={group[1]}
												suffix="journey"
												setModalSrc={props.setModalSrc}
												mode={props.mode}
											/>
										</div>
										<div className="journey_journey_content_group_text">
											<p>{parse(group[2])}</p>
										</div>
									</div>
								);
							}
						})()}
					</Suspense>)}
			</div>
		</div>
	);
}