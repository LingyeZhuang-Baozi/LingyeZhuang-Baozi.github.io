import React, { useState , useEffect, createRef, useRef, lazy, Suspense } from 'react';
import { useOutletContext } from "react-router-dom";

/* Foreign components */
import { cases } from "./cases.js";
import { journey } from "./journeys.js";
import { Contents, SectionContent } from "./components.js";

/* Libraries */
import useIsInViewport from "use-is-in-viewport";
import { isSafari, isIE } from "react-device-detect";

/* Lazy loads */
const JourneyItem = lazy(() => import('./JourneyItem.js'));

/* Global functions */
// const findBookmark = (journeyVisibility) => {
// 	if (journeyVisibility && journeyVisibility[i]) {
// 		const I = journeyVisibility.length;
// 		for (var i = 0; i < I; i++) {
// 			const J = journeyVisibility[i].length;
// 			for (var j = 0; j < J; j++) {
// 				if (journeyVisibility[i][j] == true) {
// 					return [i, j];
// 	}}}}
// 	return null;
// }



/**
 * All journeys
 *
 * props:
 *	- [modalSrc, setModalSrc]
 *	- [journeyBookmark, setJourneyBookmark]
 *	- mode (str)
 */
export default function Journey (props) {

	/* Contents setup */

	// fetch full_journey from journey doc.
	const full_journey = [...journey].reverse();

	// take snapshot of journeyBookmark.
	const [last_time, set_last_time] = useState(props.journeyBookmark);

	// form year_list, set refs and viewport trackers to locate each year block and each journey item.
	let year_list = []; // [[ year (str), year_ref (ref) ], [...]]
	const year_refs = useRef([]);
	const journey_refs = useRef([]); // flattened array for all journeys, 2D → 1D
	let journey_dic = []; // [i][j] : index (int) of journey at year i item j
	var year_list_counter = 0;
	var journey_counter = 0;
	//useEffect(() => {
	for (let i = 0; i < full_journey.length; i++) {
		const curr_year_ref = createRef();
		year_refs.current[i] = curr_year_ref;
		year_list[year_list_counter] = [full_journey[i][0][0], curr_year_ref];
		const curr_year_journeys_length = full_journey[i][1].length;
		journey_dic[i]=[];
		for (let j = 0; j < curr_year_journeys_length; j++) {
			journey_dic[i][j] = journey_counter;
			const curr_journey_ref = createRef();
			journey_refs.current[journey_counter] = curr_journey_ref;
			if (last_time > 0 && journey_counter === last_time) {
				year_list_counter++;
				year_list[year_list_counter] = ["last time", curr_journey_ref];
			}
			journey_counter++;
		}
		year_list_counter++;
	}
	//console.log("journey_refs.current: ", journey_refs.current); //DEBUG
	//console.log("journey_dic: ", journey_dic); //DEBUG
	//}, []);

	// scroll detector and journey_timeline switch.
	const [yearInViewportState, setYearInViewportState] = useState(Array(full_journey.length).fill(false));
		// when a year enters the viewport, corresponding index turns true
	const [currYear, setCurrYear] = useState(null);
	//const [journeyInViewportState, setJourneyInViewportState] = useState(Array(journey_refs.current.length).fill(false));
	const [journeyInViewportState, setJourneyInViewportState] = useState(() => {
		let newJourneyInViewportState = Array(journey_refs.current.length).fill(false);
		if (props.journeyBookmark >= 0 && props.journeyBookmark < newJourneyInViewportState.length-1) {
			newJourneyInViewportState[props.journeyBookmark] = true;
		} /*else if (props.journeyBookmark > newJourneyInViewportState) {
			newJourneyInViewportState[newJourneyInViewportState.length-1] = true;
		}*/
		return newJourneyInViewportState;
	});
	useEffect(() => { setCurrYear(yearInViewportState.findIndex((state) => state==true)); }, [yearInViewportState]);
	useEffect(() => { props.setJourneyBookmark(journeyInViewportState.findIndex((state) => state==true)); }, [journeyInViewportState]);

	/* Modal */
	const [modalSrc, setModalSrc] = useOutletContext();

	// hover - tooltip detection
	//TODO


	/* Render */
	return (<>
		<JourneyNodes
			year_list={year_list}
			currYear={currYear}
			set_last_time={set_last_time}
			mode={props.mode}
		/>
		{full_journey.map ((year, i) =>
			//<>{ (journey_refs && journey_refs.current.length > 0 && journey_dic.length > 0) ?
				<JourneyYear
					key={year[0][0]}
					year={year}
					i={i}
					year_ref={year_refs.current[i]}
					journey_refs={journey_refs.current}
					journey_dic={journey_dic}
					setYearInViewportState={setYearInViewportState}
					setJourneyInViewportState={setJourneyInViewportState}
					setModalSrc={setModalSrc}
					mode={props.mode}
				/>
			//: null }</>
		)}
		{/*意犹未尽？*/}
	</>);
}

/**
 * Journey year
 *
 * props:
 *	- year (array)
 *	- i (int)
 *	- year_ref (ref)
 *	- journey_refs (refs)
 *	- journey_dic (2D array of ints)
 *	- setYearInViewportState (func)
 *	- setJourneyInViewportState (func)
 *	- setModalSrc (func)
 *	- mode (str)
 */
function JourneyYear (props) {

	const [isInViewport, targetWrapperRef] = useIsInViewport({
		target: props.year_ref,
		threshold: 0,
		modTop: "-40px",
		modBottom: "-40px"
	});
	useEffect (() => {
		props.setYearInViewportState(prev => {
			let newYearInViewportState = [...prev];
			newYearInViewportState[props.i] = isInViewport;
			return newYearInViewportState;
		});
		//console.log("JourneyYear props.journey_refs: ", props.journey_refs); //DEBUG
	}, [isInViewport]);

	return (
		<div
			ref={targetWrapperRef}
			id={"journey_"+props.year[0][0]}
			className="journey_year"
		>
			<div className="journey_year_header">
				<img
					className="journey_year_animal"
					srcSet={(props.mode==="light" ? props.year[0][1][0] : props.year[0][1][1]) + " 4x"}
					onDragStart={e => e.preventDefault()}
				/>
				<div className={"journey_year_num text_"+props.mode}>{props.year[0][0]}</div>
			</div>
			<Suspense fallback={<div className={"text_hint_"+props.mode}>Loading...</div>}>
				{props.year[1].map ((journey, j) =>
					<JourneyItem
						key={props.year[0][0]+"_"+j}
						journey={journey}
						year={props.year[0][0]}
						j={j}
						journey_ref={props.journey_refs[props.journey_dic[props.i][j]]}
						setJourneyInViewportState={props.setJourneyInViewportState}
						journey_dic={props.journey_dic}
						i={props.i}
						setModalSrc={props.setModalSrc}
						mode={props.mode}
					/>
				)}
			</Suspense>
		</div>
	);
}



/**
 * Journey nodes
 *
 * props:
 *	- year_list (2D array): [[ section_identifier (str), section_ref (ref) ], [...]]
 *	- currYear (int)
 *	- set_last_time (func)
 *	- mode (str)
 */
function JourneyNodes (props) {

	const handle_click_to_relocate = (ref, behavior) => { // TODO: find an alternative to fix the buggy scroll
		if (isSafari || isIE) {
			ref.current.scrollIntoView(true);
		} else {
			ref.current.scrollIntoView({
				block: "nearest", // start will shift the entire page, bug of scrollIntoView
				inline: "nearest",
				behavior: behavior,
			});
		}
	}

	return (
		<div className="journey_timeline_nodes dis_select">
			{props.year_list.map ((year, i) =>
				<div
					key={"timeline-"+year[0]}
					className={
						"journey_timeline_node " +
						"journey_timeline_node_"+props.mode + " " +
						(i===props.currYear ? "journey_timeline_node_active" : "") + " " +
						"cursor_pointer"
					}
				>
					<div className="journey_timeline_node_knot" />
					<span
						className="journey_timeline_node_text"
						onClick={(e) => {
							e.preventDefault();
							if (year[0] === "last time") {
								handle_click_to_relocate(year[1], "smooth");
								props.set_last_time(0); // eliminate the "last time" node once clicked
							} else {
								handle_click_to_relocate(year[1], "auto");
							}
						}}
					>
						{year[0]}
					</span>
				</div>
			)}
		</div>
	);
}