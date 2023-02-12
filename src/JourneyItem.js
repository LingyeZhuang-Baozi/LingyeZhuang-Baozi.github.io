import React, { useEffect, lazy, Suspense } from 'react';

/* Foreign components */
//import { journey } from "./journeys.js";

/* Libraries */
import useIsInViewport from "use-is-in-viewport";

/* Lazy loads */
const SectionContent = lazy(() => import('./components.js'));

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
 * Journey item
 *
 * props:
 *	- journey (array)
 *	- year (str)
 *	- j (int)
 *	- journey_ref (ref)
 *	- setJourneyInViewportState (func)
 *	- journey_dic
 *	- i
 *	- setModalSrc (func)
 *	- mode (str)
 */
export default function JourneyItem (props) {

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

	return (
		<div
			ref={targetWrapperRef}
			id={props.year+"_"+props.j}
			className={"journey_journey journey_journey_"+props.mode}
		>
			<div className={"journey_journey_header journey_journey_header_"+props.mode}>
				<div className={"journey_journey_title text_"+props.mode}>
					{props.journey[0][0]}
				</div>
				{props.journey[0].length > 1 ?
					<div className={"journey_journey_client text_hint text_hint_"+props.mode}>
						{props.journey[0][1]}
					</div>
				: null }
			</div>
			{props.journey[1].length !== 0 ?
				<div className="journey_journey_readmore">{/*TODO*/}</div>
			: null }
			<div className={"journey_journey_content content text_"+props.mode}>
				<Suspense fallback={<div className={"text_hint_"+props.mode}>Loading...</div>}>
					<SectionContent
						content={props.journey[2]}
						suffix={"journey_" + props.year + "_" + props.j}
						setModalSrc={props.setModalSrc}
						mode={props.mode}
					/>
				</Suspense>
			</div>
		</div>
	);
}