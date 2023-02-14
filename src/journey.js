import React, { useState , useEffect, useMemo, createRef, useRef, lazy, Suspense } from 'react';
import { useOutletContext } from "react-router-dom";

/* Foreign components */
import { journey } from "./journeys.js";
import { Contents, SectionContent, Explanation } from "./components.js";

/* Libraries */
import useIsInViewport from "use-is-in-viewport";
import { isSafari, isIE } from "react-device-detect";

/* Lazy loads */
const JourneyItem = lazy(() => import('./JourneyItem.js'));



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
	const full_journey_length = full_journey.length;

	// take snapshot of journeyBookmark.
	const [bookmark, set_bookmark] = useState(props.journeyBookmark);

	// form year_list, set refs and viewport trackers to locate each year block and each journey item.
	let year_list = []; // [[ year (str), year_ref (ref) ], [...]]
	const year_refs = useRef([]);
	const journey_refs = useRef([]); // flattened array for all journeys, 2D → 1D
	let journey_dic = []; // [i][j] : index (int) of journey at year i item j

	var year_list_counter = 0;
	var journey_counter = 0;
	//useEffect(() => {
	for (let i = 0; i < full_journey_length; i++) {
		const curr_year_ref = createRef();
		year_refs.current[i] = curr_year_ref;
		year_list[year_list_counter] = [full_journey[i][0][0], curr_year_ref];
		const curr_year_journeys_length = full_journey[i][1].length;
		journey_dic[i]=[];
		for (let j = 0; j < curr_year_journeys_length; j++) {
			journey_dic[i][j] = journey_counter;
			const curr_journey_ref = createRef();
			journey_refs.current[journey_counter] = curr_journey_ref;
			if (bookmark > 0 && journey_counter == bookmark) {
				year_list_counter++;
				year_list[year_list_counter] = ["bookmark", curr_journey_ref];
			}
			journey_counter++;
		}
		year_list_counter++;
	}
	//}, []);

	// scroll detector and journey_timeline switch.
	const [yearInViewportState, setYearInViewportState] = useState(Array(full_journey_length).fill(false));
		// when a year enters the viewport, corresponding index turns true
	const [currYear, setCurrYear] = useState(null);
	const [journeyInViewportState, setJourneyInViewportState] = useState(() => {
		let newJourneyInViewportState = Array(journey_refs.current.length).fill(false);
		if (props.journeyBookmark >= 0 && props.journeyBookmark < newJourneyInViewportState.length-1) {
			newJourneyInViewportState[props.journeyBookmark] = true;
		} /*else if (props.journeyBookmark > newJourneyInViewportState.length) {
			newJourneyInViewportState[newJourneyInViewportState.length-1] = true;
		}*/
		return newJourneyInViewportState;
	});

	useEffect(() => {
		setCurrYear(yearInViewportState.findIndex((state) => state==true));
	}, [yearInViewportState]);

	useEffect(() => {
		props.setJourneyBookmark(journeyInViewportState.findIndex((state) => state==true));
	}, [journeyInViewportState]);

	const firstCaseStudy = useMemo(() => {
		for (let i = 0; i < full_journey_length; i++) {
			const j = full_journey[i][1].findIndex(journey => journey[1].length > 0);
			if (j >= 0) { return ([i,j]); }
		}
		return [];
	}, []);


	/* Modal */
	const [modalSrc, setModalSrc] = useOutletContext();


	/* Render */
	return (<>
		<JourneyNodes
			year_list={year_list}
			currYear={currYear}
			bookmark={bookmark}
			set_bookmark={set_bookmark}
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
				firstCaseStudy={firstCaseStudy}
				setYearInViewportState={setYearInViewportState}
				setJourneyInViewportState={setJourneyInViewportState}
				setModalSrc={setModalSrc}
				mode={props.mode}
			/>
			//: null }</>
		)}
		<div className={
			"journey_behind_the_scene " +
			"journey_behind_the_scene_"+props.mode + " " +
			"content text_"+props.mode
		}><p>
			This website is <a href="https://github.com/LingyeZhuang-Baozi/LingyeZhuang-Baozi.github.io/tree/master" target='_blank'>hand-coded</a> with React.js and ♡.<br/>
			I am so flattered seeing you reading till the end. Thank you!
		</p></div>
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
 *	- firstCaseStudy (array): [i, j] of the first case study
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

	const [explainAnimal, setExplainAnimal] = useState(false);

	return (
		<div
			ref={targetWrapperRef}
			id={"journey_"+props.year[0][0]}
			className="journey_year"
		>
			<div className="journey_year_header">
				<img
					className="journey_year_animal explanation_trigger"
					srcSet={(props.mode==="light" ? props.year[0][1][0] : props.year[0][1][1]) + " 4x"}
					onDragStart={e => e.preventDefault()}
					onMouseEnter={() => { setExplainAnimal(true); }}
					onMouseOver={() => { setExplainAnimal(true); }}
					onMouseLeave={() => { setExplainAnimal(false); }}
				/>
				<div className={"journey_year_num text_"+props.mode}>{props.year[0][0]}</div>
				<Explanation
					text={props.year[0][2]}
					explanationVisible={explainAnimal}
					mode={props.mode}
				/>
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
						firstCaseStudy={props.firstCaseStudy}
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
 *	- [bookmark, set_bookmark]
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

	const [explainBookmark, setExplainBookmark] = useState(false);
	useEffect(() => { setExplainBookmark(false); }, [props.bookmark]);

	return (
		<div className="journey_timeline_nodes dis_select">
			{props.year_list.map ((year, i) =>
				<div
					key={"timeline-"+year[0]}
					className={
						"journey_timeline_node " +
						"journey_timeline_node_"+props.mode + " " +
						(i===props.currYear ? "journey_timeline_node_active" : "")
					}
				>
					<div className={
						"journey_timeline_node_knot " +
						(year[0]==="bookmark" ? "journey_timeline_node_knot_bookmark" : "")
					}/>
					<span
						className={
							"journey_timeline_node_text " +
							(year[0]==="bookmark" ? "journey_timeline_node_bookmark explanation_trigger" : "cursor_pointer")
						}
						onMouseEnter={() => { if (year[0] === "bookmark") { setExplainBookmark(true); } }}
						onMouseOver={() => { if (year[0] === "bookmark") { setExplainBookmark(true); } }}
						onMouseLeave={() => { if (year[0] === "bookmark") { setExplainBookmark(false); } }}
						onClick={(e) => {
							e.preventDefault();
							if (year[0] === "bookmark") {
								handle_click_to_relocate(year[1], "smooth");
								setExplainBookmark(false);
								props.set_bookmark(0); // eliminate the "bookmark" node once clicked
							} else {
								handle_click_to_relocate(year[1], "auto");
							}
						}}
					>
						{year[0]}
					</span>
				</div>
			)}
			<Explanation
				text="continue reading from where you left last time"
				size="s"
				explanationVisible={explainBookmark}
				mode={props.mode}
			/>
		</div>
	);
}