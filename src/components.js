import React, { useState , useEffect } from 'react';

/* Assets */
// import bullet_large_light from "./assets/basic/bullet_large_light@2x.png";

/* Libraries */
import parse from 'html-react-parser';
import { isSafari, isIE } from "react-device-detect";
//import { LazyLoadImage } from 'react-lazy-load-image-component'; import 'react-lazy-load-image-component/src/effects/blur.css';
//import { GlassMagnifier } from "react-image-magnifiers";
import MouseTooltip from 'react-sticky-mouse-tooltip';



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
			}, 540); // var(--delay-l)
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
					"modebtn cursor_pointer smooth_animation_xs " +
					"modebtn_" + btnStyle
				}
				onClick={(e) => {
					e.preventDefault();
					setIsActive(true);
				}}
			>
				<div className="modebtn_icon smooth_animation_xs" />
			</div>
			{isActive == true ?
				<div className="modebtn_animation_circle" />
			: null }
		</>
	);
}



/**
 * SectionContent
 *
 * props:
 *	- content (array)
 *	- suffix (str)
 *	- title_class (str)
 *	- setModalSrc (func)
 *	- mode (str)
 */
export default function SectionContent (props) {
	return (<>
		{props.content.map ((element, i) => {
			const key = props.suffix+i;
			switch (element[0]) { // title, text, img-static, img-zoomable, img-scollable, gallery, vid, iframe

				case "title":
					if (element.length < 3) {
						return (
							<div
								key={key}
								className={props.title_class}
							>
								{parse(element[1])}
							</div>
						);
					} else {
						return (
							<Explainer
								text={element[2]}
								size="l"
								classlist={props.title_class}
								mode={props.mode}
							>
								{parse(element[1])}
							</Explainer>
						);
					}
					break;

				case "text":
					return (
						<p
							key={key}
							className={props.suffix.replace(/-/g,"_")+"_text"}
						>
							{parse(element[1])}
						</p>
					);
					break;

				case "img-static":
				case "img-zoomable":
				case "img-scrollable":
					return (
						<Img
							key={key}
							type={element[0].substring(4)} // remove "img-"
							src={element[1]}
							alt={
								element.length >=3
								&& element[2]!==null
								&& element[2]!=="" ?
									element[2]
								: ""
							}
							caption={
								element.length >=4
								&& element[3]!==null
								&& element[3]!=="" ?
									element[3]
								: undefined
							}
							img_stylelist={
								element.length >= 5
								&& element[4]!==null
								&& element[4]!=="" ?
									element[4]
								: undefined
							}
							width={
								element.length >= 6
								&& element[5]!==null
								&& element[5]!=="" ?
									element[5]
								: undefined
							}
							setModalSrc={props.setModalSrc}
							mode={props.mode}
						/>
					);
					break;

				case "gallery":
					return (
						<div
							key={key}
							className={
								"gallery " +
								(element.length >=3
								&& element[2]!==null
								&& element[2]!=="" ?
									element[2]
								: "")
							}
						>
							<SectionContent
								content={element[1]}
								suffix={key}
								setModalSrc={props.setModalSrc}
								mode={props.mode}
							/>
						</div>
					);
					break;

				case "vid":
					return (
						<Vid
							key={key}
							src={element[1]}
							alt={
								element.length >=3
								&& element[2]!==null
								&& element[2]!=="" ?
									element[2]
								: ""
							}
							caption={
								element.length >=4
								&& element[3]!==null
								&& element[3]!=="" ?
									element[3]
								: undefined
							}
							width={
								element.length >= 5
								&& element[4]!==null
								&& element[4]!=="" ?
									element[4]
								: undefined
							}
							poster={
								element.length >= 6
								&& element[5]!==null
								&& element[5]!=="" ?
									element[5]
								: undefined
							}
							mode={props.mode}
						/>
					);
					break;

				case "iframe":
					return (
						<div
							key={key}
							className="ratio_outer"
							style={{"--iframe-ratio": element[3] ? element[3] : "var(--ratio-default)"}}
						>
							{element[1]==="figma" ?	// prototype
								<iframe
									className="ratio_inner"
									//style="border: 1px solid rgba(0, 0, 0, 0.1);" width='390' height='844'
									src={element[2]}
									allowFullScreen
								></iframe>
							:
								<>{parse(element[2])}</>
							}
						</div>
					);
					break;
			}
		})}
	</>);
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
					<li key={"biolist-text-item-"+item[0]+"-"+item[1]}>
						<span className={"bio_item bio_item_text text_"+props.mode}>
							<div className="bio_fieldname_container">
								<div className={"bio_fieldname bio_fieldname_"+props.mode}>
									{item[0]}
								</div>
							</div>
							{parse(item[1])}
						</span>
					</li>
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
					<li key={"biolist-bullet-item-"+item}>
						<span className={"bio_item text_"+props.mode}>
							{item}
						</span>
					</li>
				)}
			</ul>
		);
	}
}



/**
 * List of contents
 *
 * props:
 *	- list (2D array): [[ section_identifier (str), section_ref (ref) ], [...]]
 *	- currSection (int)
 *	- mode (str)
 *
 * TODO: Note that there will be issue if one of the sections or especially the last section is too short.
 */
function Contents (props) {

	const handle_click_to_relocate = (ref) => {
		if (isSafari || isIE) {
			ref.current.scrollIntoView(true);
		} else {
			ref.current.scrollIntoView({
				block: "start",
				inline: "nearest",
				behavior: "smooth",
			});
		}
	}

	return (
		<ul className="content_list dis_select">
			{props.list.map ((item, i) => {
				if (item[0]!=="") {
					return (
						<li
							key={"contentlist-"+item[0]}
							className={
								"content_list_item " +
								(i===props.currSection ? "content_list_item_active" : "")
							}
						>
							<span
								className={
									"content_list_text cursor_pointer " +
									"text_"+props.mode + " " +
									"content_list_text_"+props.mode + " " +
									(i===props.currSection ? "content_list_text_active" : "")
								}
								onClick={(e) => { e.preventDefault(); handle_click_to_relocate(item[1]); }}
							>
								{item[0]}
							</span>
						</li>
					);
				}
			})}
		</ul>
	);
}



/**
 * Img
 *
 * props:
 *	- type (str)
 *	- src (img as required path)
 *	- alt (str)
 *	- caption (str)
 *	- img_stylelist (style)
 *	- setModalSrc (func)
 *	- mode (str)
 */
function Img (props) {
	switch (props.type) {

		case "static":
			return (<>
				<ImgStatic
					src={props.src}
					alt={props.alt}
					caption={props.caption}
					img_stylelist={props.img_stylelist}
					mode={props.mode}
				/>
			</>);
			break;

		case "zoomable":
			return (<>
				<ImgZoomable
					src={props.src}
					alt={props.alt}
					caption={props.caption}
					img_stylelist={props.img_stylelist}
					setModalSrc={props.setModalSrc}
					mode={props.mode}
				/>
			</>);
			break;

		case "scrollable":
			return (<>
				<ImgScrollable
					src={props.src}
					alt={props.alt}
					caption={props.caption}
					img_stylelist={props.img_stylelist}
					width={props.width}
					mode={props.mode}
				/>
			</>);
			break;
	}
}

/**
 * ImgStatic
 *
 * props:
 *	- src (img as required path)
 *	- alt (str)
 *	- caption (str)
 *	- img_stylelist (style)
 *	- mode (str)
 */
function ImgStatic (props) {
	return (<>
		<div className="img_box">
			<img
				className={
					"img_box_img " +
					"img_box_img_"+props.mode + " " +
					((isSafari || isIE) ? "img_box_img_safari" : "")
				}
				style={props.img_stylelist}
				src={props.src}
				//loading="lazy"
				onDragStart={e => e.preventDefault()}
			/>
			{props.caption ?
				<span className="img_caption">{parse(props.caption)}</span>
			: null }
		</div>
	</>);
}

/**
 * ImgZoomable
 *
 * props:
 *	- src (img as required path)
 *	- alt (str)
 *	- caption (str)
 *	- img_stylelist (style)
 *	- setModalSrc (func)
 *	- mode (str)
 */
function ImgZoomable (props) {

	const [zoomed, setZoomed] = useState(false);

	const open_modal = () => {
		setZoomed(true);
		props.setModalSrc({
			"src": props.src,
			"alt": props.alt,
			"minWidth": (props.img_stylelist && props.img_stylelist["minWidth"]) ? props.img_stylelist["minWidth"] : "0px",
			"close": close_modal,
		});
		document.body.style.overflow = "hidden";
	}
	const close_modal = () => {
		setZoomed(false);
		props.setModalSrc("");
		document.body.style.overflow = "scroll";
	}

	useEffect(() => { if (zoomed==true) {
		const esc_to_close_modal = (e) => {
			if (e.key === 'Escape') {
				close_modal();
			}
		}
		window.addEventListener('keydown', esc_to_close_modal, false);
		return () => window.removeEventListener('keydown', esc_to_close_modal, false);
	}}, [zoomed]);

	return (<>
		<div className="img_box">
			<img
				className={
					"img_box_img zoomable_img cursor_zoomin " +
					"img_box_img_"+props.mode + " " +
					((isSafari || isIE) ? "img_box_img_safari" : "")
				}
				style={props.img_stylelist}
				src={props.src}
				//loading="lazy"
				onClick={(e) => { e.preventDefault(); open_modal(); }}
				onDragStart={e => e.preventDefault()}
			/>
			{/*<GlassMagnifier
				className={"img_box_img img_box_img_"+props.mode + " zoomable_img cursor_zoomin"}
				imageSrc={props.src}
				largeImageSrc={props.src}
				magnifierSize={"360px"}
				square={true}
				magnifierBorderSize={2} //2px
				magnifierBorderColor={"rgba(253,96,65,1)"} //var(--color-xihongshi)
				allowOverflow={true}
				magnifierBackgroundColor={props.mode=="light"? "rgba(255,255,255,1)" : "rgba(51,51,51,1)"} // light:var(--color-white) OR dark:var(--color-gray1-33)
			/>*/}
			{props.caption ?
				<span className="img_caption">{parse(props.caption)}</span>
			: null }
		</div>
	</>);
}

/**
 * ImgModal
 *
 * props:
 *	- modalSrc (str)
 *	- mode (str)
 */
function ImgModal (props) {
	return (<>
		{props.modalSrc !== "" ?
			<div
				className={"modal_div_outer modal_div_outer_"+props.mode+" cursor_zoomout"}
				onClick={(e) => { e.preventDefault(); props.modalSrc["close"](); }}
			><div className="modal_div_inner">
				<img
					className="modal_img"
					style={{"--img-zoomable-min-width": props.modalSrc["minWidth"]}}
					src={props.modalSrc["src"]}
					alt={props.modalSrc["alt"]}
					//loading="lazy"
					onDragStart={e => e.preventDefault()}
				/>
				{/*TODO: add close/back button*/}
				<div className={"modal_close modal_close_"+props.mode} />
			</div></div>
		: null }
	</>);
}

/**
 * ImgScrollable
 *
 * props:
 *	- src (img as required path)
 *	- alt (str)
 *	- caption (str)
 *	- img_stylelist (style)
 *	- width (str)
 *	- mode (str)
 */
function ImgScrollable (props) {
	return (<>
		<div
			className={"img_box img_box_scrollable img_box_scrollable_"+props.mode}
			style={{width: props.width ? props.width : "100%"}}
		>
			<div
				className={"img_box_img_scrollable_container img_box_img_"+props.mode}
				style={props.img_stylelist}
			>
				<img
					className="img_box_img_scrollable"
					src={props.src}
					//loading="lazy"
					onDragStart={e => e.preventDefault()}
				/>
			</div>
			{props.caption ?
				<span className="img_caption">{parse(props.caption)}</span>
			: null }
		</div>
	</>);
}

/**
 * Vid
 *
 * props:
 *	- src (vid as required path)
 *	- alt (str)
 *	- caption (str)
 *	- width (str)
 *	- poster (img as required path)
 *	- mode (str)
 */
function Vid (props) {
	return (
		<div className="img_box">
			<video
				width={props.width ? props.width : "800"}
				poster={props.poster ? props.poster : ""}
				controls
			>
				<source src={props.src} type="video/mp4"/>
				{props.alt ? props.alt : <>Ops, video can't be loaded.</>}
			</video>
		</div>
	);
}



/**
 * Explanation
 * 
 * props:
 *	- text (str)
 *	- size (str): s(160), m(240), l(320)
 *	- explanationVisible (bool)
 *	- mode (str)
 */
function Explanation (props) {
	return (
		<MouseTooltip
			className={
				"explanation_outer " +
				(props.explanationVisible&&props.explanationVisible==true ? "explanation_outer_visible" : "explanation_outer_invisible")
			}
			//visible={props.explanationVisible}
			offsetX={16}
			offsetY={16}
		>
			<div className={
				"explanation_inner " +
				"explanation_inner_"+props.mode + " " +
				(props.size ? "explanation_inner_"+props.size : "explanation_inner_m")
			}>
				<span className={"explanation_text explanation_text_"+props.mode}>{props.text}</span>
			</div>
		</MouseTooltip>
	);
}

/**
 * Explainer, a wrapper that includes both the trigger and the explanation tooltip
 * 
 * props:
 *	- children: trigger
 *	- text (str)
 *	- size (str): s(160), m(240), l(320)
 *	- classlist (str)
 *	- mode (str)
 */
function Explainer (props) {

	const [explanationVisible, setExplanationVisible] = useState(false);

	return (<>
		<div
			className={props.classlist + " explanation_trigger"}
			onMouseEnter={() => { setExplanationVisible(true); }}
			onMouseOver={() => { setExplanationVisible(true); }}
			onMouseLeave={() => { setExplanationVisible(false); }}
		>
			{props.children}
		</div>
		<Explanation
			text={props.text}
			size={props.size}
			explanationVisible={explanationVisible}
			mode={props.mode}
		/>
	</>);
}



/* Export */
export { Modebtn, Bio, Contents, Img, ImgModal, Vid, Explanation, Explainer };