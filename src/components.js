import React, { useState , useEffect } from 'react';

/* Assets */
// import bullet_large_light from "./assets/basic/bullet_large_light@2x.png";

/* Libraries */
import { GlassMagnifier } from "react-image-magnifiers";
import parse from 'html-react-parser';



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
					"modebtn cursor_pointer smooth_animation_xs " +
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
 * Contents
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
		ref.current.scrollIntoView({
			block: "start",
			inline: "nearest",
			behavior: "smooth",
		});
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
 *	- img_stylelist (str)
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
 *	- img_stylelist (str)
 *	- mode (str)
 */
function ImgStatic (props) {
	return (<>
		<div className="img_box">
			<img
				className={"img_box_img img_box_img_"+props.mode}
				style={props.img_stylelist}
				src={props.src}
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
 *	- img_stylelist (str)
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
			"minWidth": props.img_stylelist["minWidth"] ? props.img_stylelist["minWidth"] : "0px",
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
				className={"img_box_img img_box_img_"+props.mode + " zoomable_img cursor_zoomin"}
				style={props.img_stylelist}
				src={props.src}
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
 * ImgScrollable
 *
 * props:
 *	- src (img as required path)
 *	- alt (str)
 *	- caption (str)
 *	- img_stylelist (str)
 *	- mode (str)
 */
function ImgScrollable (props) {
	return (<>
		<div className={"img_box img_box_scrollable img_box_scrollable_"+props.mode}>
			<div
				className={"img_box_img_scrollable_container img_box_img_"+props.mode}
				style={props.img_stylelist}
			>
				<img
					className="img_box_img_scrollable"
					src={props.src}
				/>
			</div>
			{props.caption ?
				<span className="img_caption">{parse(props.caption)}</span>
			: null }
		</div>
	</>);
}



/**
 * Explanation
 * 
 * props:
 *	- text (str)
 *	- mode (str)
 */
function Explanation (props) {}



/* Export */
export { Modebtn, Bio, Contents, Img };