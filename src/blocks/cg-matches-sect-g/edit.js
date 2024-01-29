import {InspectorControls, InnerBlocks, RichText, useBlockProps, useInnerBlocksProps, MediaPlaceholder, MediaUpload } from '@wordpress/block-editor';
import ServerSideRender from "@wordpress/server-side-render";
import './editor.scss';
import Image from './nature-6.jpg';
// http://localhost/aviatoronlineorg20230912.loc/wp-content/themes/urban/partials/gutenberg-blocks/dist/images/nature-5.97f4be93.jpg
// file:///C:/xampp/htdocs/aviatoronlineorg20230912.loc/wp-content/themes/urban/partials/gutenberg-blocks/dist/images/nature-5.97f4be93.jpg
import {PanelBody, TextControl, SelectControl, ColorPicker, ToggleControl, Button, Placeholder } from "@wordpress/components";
// import {useEffect} from "@types/react";
import React, { Fragment, useEffect, useRef, useState } from 'react';
import { useSelect } from '@wordpress/data';

import { Navigation, EffectCoverflow, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react'; // Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';
import 'swiper/css/scrollbar';
/*
let images = [{"mediaId": 1, "urlMedia": "#", "altAttr": "alt"}];

let newImg = [
	{"alt": "bnkj", "caption": "", "id": 17024, "link": "http://localhost/aviatoronlineorg20230912.loc/add-test-3/airplane-3/",
		"mime": "image/png",
		"sizes": {full: {}},
		"subtype": "png",
		"type":"image",
		"url":"http://localhost/aviatoronlineorg20230912.loc/wp-content/uploads/2024/01/airplane.png"},
	{"alt": "bnkj", "caption": "", "id": 17024, "link": "http://localhost/aviatoronlineorg20230912.loc/add-test-3/airplane-3/",
		"mime": "image/png",
		"sizes": {full: {}},
		"subtype": "png",
		"type":"image",
		"url":"http://localhost/aviatoronlineorg20230912.loc/wp-content/uploads/2024/01/airplane.png"},
	{"alt": "bnkj", "caption": "", "id": 17024, "link": "http://localhost/aviatoronlineorg20230912.loc/add-test-3/airplane-3/",
		"mime": "image/png",
		"sizes": {full: {}},
		"subtype": "png",
		"type":"image",
		"url":"http://localhost/aviatoronlineorg20230912.loc/wp-content/uploads/2024/01/airplane.png"}
];*/


export default function Edit( props ) {
	const {
		version,
		title,
		description,
		blocks
	} = props.attributes;

	console.log("blocks", blocks);

	const blockProps = useBlockProps();

/*
	const onColorChange = (color, pageId, key) => {
		const updatedStyleOptions = [...styleOptions]; // Копировать текущие параметры стиля
		const index = updatedStyleOptions.findIndex((styles) => styles?.pageId === pageId);

		if (index !== -1) {
			updatedStyleOptions[index] = {
				...updatedStyleOptions[index],
				[key]: color.hex,
			};
		} else {
			updatedStyleOptions[index] = {
				...pageId,
				[key]: color.hex,
			};
		}
		props.setAttributes({ styleOptions: updatedStyleOptions }); // Установить обновленные параметры стиля
	};
*/

/*
	const addDefaultStylesForSelectedPages = (selectedPages) => {
		const updatedStyleOptions = [...styleOptions];
		selectedPages.forEach((pageId) => {
			const existingStylesIndex = updatedStyleOptions.findIndex((styles) => styles?.pageId === pageId);

			if (existingStylesIndex !== -1) {
				updatedStyleOptions[existingStylesIndex] = { // Если стили уже существуют, обновляем их
					...updatedStyleOptions[existingStylesIndex],
					// ...getDefaultStyles(),
				};
			} else {
				updatedStyleOptions.push({ // Если стилей для страницы нет, добавляем новый объект стилей
					pageId,
					...getDefaultStyles(),
				});
			}
		});
		props.setAttributes({ styleOptions: updatedStyleOptions });
	};
*/

	const addBlock = () => {
		if (blocks.length > 10) {
			return;
		}
		const newArr = [...blocks]
		const newObj = {...blocks[0]};
		newArr.push(newObj); // const newArr = [...blocks, {...blocks[0]}]
		props.setAttributes({ blocks: newArr});
	};

	const updateImgSwiper = (index, media) => {
		const newArrWithImages = [...blocks];
		let mergedImages = media.map(img => ({
			mediaId: img.id,
			urlMedia: img.url,
			altAttr: img.alt
		}));
		// console.log("mergedImages", mergedImages)
		// console.log("newArrWithImages[index].swiperSlideAtr,", newArrWithImages[index].swiperSlideAtr)
		// console.log("blocks_i_sw_length", ...blocks[index].swiperSlideAtr.length)

		newArrWithImages[index].swiperSlideAtr = [
			...mergedImages
		];
		// console.log("newArrWithImages", newArrWithImages)
/*
		newArr[index] = {
			...buttonsArr[index],
			"linkAttr": {
				...buttonsArr[index].linkAttr,
				"targetLink": {
					...buttonsArr[index].linkAttr.targetLink,
					"default": targetValue
				},
				"rel": {
					...buttonsArr[index].linkAttr.rel.default,
					"default": (targetValue === '_blank') ? 'noopener' : '',
				}
			}
		};
*/
		props.setAttributes( { blocks: newArrWithImages } );
	};

	const removeImgSwiper = (index, media) => {
		const newArrWithImages = blocks;
		newArrWithImages[index].swiperSlideAtr.splice(1);
		props.setAttributes( { blocks: newArrWithImages } );
	}

	let componentStyles = {};
	const renderedComponents = blocks.map((block, index) => {
		return (
			<Fragment>
				<div className="wrapper-settings">
					<div className="wrapper-settings__card">
						<div className="wrapper-settings__count">{index + 1}</div>
						<ToggleControl
							label="Enable Swiper"
							onChange={(val) => {
								console.log("block.enableSwiper", block.enableSwiper)
								console.log("block.val", val)
								const newArrWithEnableSwiper = [...blocks];
								newArrWithEnableSwiper[index] = { ...block, enableSwiper: val };
								props.setAttributes({ blocks: newArrWithEnableSwiper });
							}}
						/>
						<button className="remove" onClick={() => console.log()}>REMOVE BLOCK</button>
						<button className="add" onClick={addBlock}>ADD BLOCK</button>
					</div>
					<article key={index} className="cg-media-card" style={componentStyles}>
						{block.enableSwiper ? (
							<>
								<Swiper
									effect={'coverflow'}
									grabCursor={true}
									centeredSlides={true}
									slidesPerView={'auto'}
									coverflowEffect={{
										rotate: 50,
										stretch: 0,
										depth: 100,
										modifier: 1,
										slideShadows: true,
									}}
									pagination={true}
									navigation={true}
									modules={[EffectCoverflow, Pagination, Navigation]}
									className="mySwiper"
								>
									{block.swiperSlideAtr.map((img, imgIndex) => (
										<SwiperSlide key={imgIndex}>
											<img src={img.urlMedia} alt={img.altAttr} />
										</SwiperSlide>
									))}
								</Swiper>
								<MediaPlaceholder
									icon="format-image"
									multiple={ true }
									labels={{
										title: 'Images',
										instructions: 'Upload an SwiperSlide or select from the media library.',
									}}
									onSelect={(media) => {
										return updateImgSwiper(index, media)
									}}
									accept="image/*"
									allowedTypes={['image']}
									notices={
										block.swiperSlideAtr.length > 1  && (
											<Button
												isLink
												isDestructive
												onClick={(media) => {
													return removeImgSwiper(index, media)
												}}
											>
												Remove SwiperSlide Images
											</Button>
										)
									}
								/>
							</>
							) :

							<div className="wrapper">
								<div className="cg-sect-media">
									<MediaPlaceholder
										icon="format-image"
										multiple={ false }
										labels={{
											title: 'Image',
											instructions: 'Upload an image',
										}}
										onSelect={(media) => {
											const newArr = [...blocks];
											const transformedMedia = {
												mediaId: media.id,
												urlMedia: media.url,
												altAttr: media.alt
											};
											newArr[index].sectMediaImg = {
												...transformedMedia
											};
											props.setAttributes( { blocks: newArr } );
										}
										}
										accept="image/*"
										allowedTypes={['image']}
										notices={
											block.sectMediaImg.urlMedia && (
												<Button
													isLink
													isDestructive
													onClick={(media) => {
														block.sectMediaImg = {};
														props.setAttributes( { block: block })
													}}
												>
													Remove Image 1
												</Button>
											)
										}
									/>
									{ Boolean(block.sectMediaImg.urlMedia) && (
										<img src={ block.sectMediaImg.urlMedia } alt={ block.sectMediaImg.altAttr || '' } />
									) }
									<div className="cg-logo-block cg-sect-media__logo">
										<div className="cg-logo-block__logo-pic">
											<MediaUpload
												onSelect={(media) => {


													console.log("block.sectMediaLogoImg.urlMedia", block.sectMediaLogoImg)
														const transformedMedia = {
															mediaId: media.id,
															urlMedia: media.url,
															altAttr: media.alt
														};
														block.sectMediaLogoImg = {
															...transformedMedia
														};
														props.setAttributes( { block: block } );
													}
												}
												allowedTypes={['image']}
												render={({ open }) => (
													<Button onClick={open}>
														Open Media Library
													</Button>
												)}
											/>
											{block.sectMediaLogoImg.urlMedia &&
												<Button
													onClick={(media) => {
														block.sectMediaLogoImg = {};
														props.setAttributes( { block: block })
													}}
														isDestructive>
													Remove Logo Image
												</Button>}
											{ block.sectMediaLogoImg.urlMedia && (
												<img src={ block.sectMediaLogoImg.urlMedia } alt={ block.sectMediaLogoImg.altAttr || '' } />
											) }
										</div>
										<div className="cg-logo-block__logo-text">
											<p>Cricket</p>
											<p>Guru</p>
										</div>
									</div>
								</div>
							</div>
						}
		{/*				<div className="cg-description cg-media-card__text">
							<img src={Image} />
							<TextControl
								label='Media card text'
								value={block.mediaCardText}
								onChange={(val) => {
									const updatedBlocks = [...blocks];
									updatedBlocks[index] = { ...block, mediaCardText: val };
									props.setAttributes({ blocks: updatedBlocks });
								}}
							/>
						</div>*/}
					</article>
				</div>
			</Fragment>
		);
	});

	return (
		<div { ...blockProps }>
{/*			<InspectorControls>
				<PanelBody
					title="Select brand pages"
					initialOpen={ true }
				>
					<SelectControl
						value={ tag }
						options={ [
							{ label: 'offReverse', value: 'offReverse' },
							{ label: 'onReverse', value: 'onReverse' }
						] }
						onChange={ ( value ) =>
							props.setAttributes( {
								tag: value,
							} )
						}
						__nextHasNoMarginBottom
					/>
				</PanelBody>

				<PanelBody
					title="Link title"
					initialOpen={ true }
				>
					<TextControl
						label='Link title'
						value={ linkTitle }
						onChange={ ( val ) => {
							props.setAttributes( { linkTitle: val } );
						}}
					/>
				</PanelBody>
			</InspectorControls>*/}


{/*			<section className="cg-matches-sect cg-section__content">
				<TextControl
					label='Title'
					value={ title }
					onChange={ ( val ) => {
						props.setAttributes( { title: val } );
					}}
				/>
				<div className="cg-description" style={{"--text-align": "center", "--max-width": "754px"}}>
					<TextControl
						label='Description'
						value={ description }
						onChange={ ( val ) => {
							props.setAttributes( { description: val } );
						}}
					/>
				</div>
				<div className="cg-media-card-block">
					{renderedComponents}
					<button className="add" onClick={addBlock}>Add block</button>
				</div>
			</section>*/}

			{renderedComponents}
		</div>
	);
}
