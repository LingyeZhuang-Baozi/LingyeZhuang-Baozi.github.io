import React, { useEffect, lazy, Suspense } from 'react';

/* Foreign components */
import { Img } from "./components.js";

/* Libraries */
import useIsInViewport from "use-is-in-viewport";

/* Lazy loads */
const SectionContent = lazy(() => import('./components.js'));



/**
 * CaseSection
 *
 * props:
 *	- section (array)
 *	- i (int)
 *	- section_ref (ref)
 *	- setSectionInViewportState (func)
 *	- setModalSrc (func)
 *	- mode (str)
 */
export default function CaseSection (props) {

	const [isInViewport, targetWrapperRef] = useIsInViewport({
		target: props.section_ref,
		threshold: 0,
		modTop: "-40px",
		modBottom: "-40px"
	});
	useEffect (() => {
		props.setSectionInViewportState(prev => {
			let newSectionInViewportState = [...prev];
			newSectionInViewportState[props.i] = isInViewport;
			return newSectionInViewportState;
		});
	}, [isInViewport]);

	return (
		<div
			ref={targetWrapperRef}
			id={"section_"+props.i}
			className="case_section scroll_margin"
		>
			<Suspense fallback={<div className={"text_hint_"+props.mode}>Loading...</div>}>
				{(() => {

					switch (props.section[0]) {

						case "intro":
							return (
								<div className="case_section_intro">
									<SectionContent
										content={props.section[2]}
										suffix="case_section_intro"
										setModalSrc={props.setModalSrc}
										mode={props.mode}
									/>
								</div>
							);
							break;

						case "problem":
							return (
								<div className={"case_section_boxed case_section_problem case_section_boxed_"+props.mode}>
									<div
										className={
											"case_section_boxed_title case_section_boxed_title_"+props.mode + " " +
											"case_section_problem_title"
										}
									>
										Problem statement
									</div>
									<SectionContent
										content={props.section[2]}
										suffix="case_section_problem"
										setModalSrc={props.setModalSrc}
										mode={props.mode}
									/>
								</div>
							);
							break;

						case "section":
							return (
								<div className={"case_section_section case_section_section_"+props.mode}>
									<div className={"case_section_section_identifier text_hint text_hint_"+props.mode}>{props.section[1]}</div>
									<SectionContent
										content={props.section[2]}
										suffix="case_section_section"
										title_class={
											"case_section_title case_section_section_title " +
											"case_section_section_title_"+props.mode
										}
										setModalSrc={props.setModalSrc}
										mode={props.mode}
									/>
								</div>
							);
							break;

						case "subsection":
							return (
								<div className={"case_section_boxed case_section_subsection case_section_boxed_"+props.mode}>
									<SectionContent
										content={props.section[2]}
										suffix="case_section_subsection"
										title_class={
											"case_section_boxed_title case_section_boxed_title_"+props.mode + " " +
											"case_section_subsection_title"
										}
										setModalSrc={props.setModalSrc}
										mode={props.mode}
									/>
								</div>
							);
							break;

						case "evidence":
							return (
								<div className={"case_section_boxed case_section_evidence case_section_boxed_"+props.mode}>
									{/*<p>...</p>*/}
									<SectionContent
										content={props.section[2]}
										suffix="case_section_evidence"
										setModalSrc={props.setModalSrc}
										mode={props.mode}
									/>
								</div>
							);
							break;
					}

				})()}
			</Suspense>
		</div>
	);
}