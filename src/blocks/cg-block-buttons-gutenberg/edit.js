import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	InspectorControls,
	RichText,
	AlignmentToolbar,
	BlockControls,
	MediaPlaceholder, BlockAlignmentToolbar,
} from '@wordpress/block-editor';
import {
	PanelBody,
	TextControl,
	SelectControl,
	ColorPicker,
	__experimentalBoxControl as BoxControl,
	RangeControl,
	ToolbarGroup,
	ToolbarButton,
	FontSizePicker,
} from '@wordpress/components';
import './editor.scss';
import previewImage from './preview.jpg';
import {useState} from "react";
const { Fragment } = wp.element;

export default function Edit( props ) {
	const {
		tag,
		contentColor,
		backgroundColor,
		contentColorHover,
		backgroundColorHover,
		padding,
		radius,
		justifyСontentBtn,
		mediaSize,
		mediaPosition,
		width,
		fontSize,
		buttonsArr
	} = props.attributes;

	const TagName = tag;
	const isLink = (tag === 'a');


	let componentStyles = {
		'--customBtn-background-color-hover': backgroundColorHover,
		'--customBtn-color-hover': contentColorHover,
		'--customBtn-background-color': backgroundColor,
		'--customBtn-color': contentColor,
		padding: `${ padding.top } ${ padding.right } ${ padding.bottom } ${ padding.left }`,
		borderRadius: `${ radius }px`,
		fontSize: `${ fontSize }px`,
	};

	if ( !! width ) {
		componentStyles[ 'width' ] = `${ width }px`;
	}

	let iconStyles = {
		width: `${ mediaSize.width }px`,
		height: `${ mediaSize.height }px`,
	};

	if ( mediaPosition === 'top' ) {
		iconStyles = {
			...iconStyles,
			marginBottom: `${ mediaSize.gap }px`,
		};
	}
	if ( mediaPosition === 'right' ) {
		iconStyles = {
			...iconStyles,
			marginLeft: `${ mediaSize.gap }px`,
		};
	}
	if ( mediaPosition === 'bottom' ) {
		iconStyles = {
			...iconStyles,
			marginTop: `${ mediaSize.gap }px`,
		};
	}
	if ( mediaPosition === 'left' ) {
		iconStyles = {
			...iconStyles,
			marginRight: `${ mediaSize.gap }px`,
		};
	}
	const mediaPositionValues = {
		left: 'cg-button-gutenberg--media-left',
		top: 'cg-button-gutenberg--media-top',
		right: 'cg-button-gutenberg--media-right',
		bottom: 'cg-button-gutenberg--media-bottom',
	};

	const alignСontentBtn = {
		'center': 'cg-block-buttons-gutenberg--center',
		'left': 'cg-block-buttons-gutenberg--flex-start',
		'right': 'cg-block-buttons-gutenberg--flex-end',
	};

	const useBlockPropsAttrs = {
		style: componentStyles,
	};

	let linkAttributes = '';
	if (isLink) {
		linkAttributes = buttonsArr.map((button, index) => {
			let updatelinkAttributes = {
				href: buttonsArr[index].linkAttr.link.default,
			};
			const targetValuelinkAttributes = buttonsArr[index].linkAttr.targetLink.default;
			if (targetValuelinkAttributes === '_blank') {
				updatelinkAttributes.target = buttonsArr[index].linkAttr.targetLink.default;
				updatelinkAttributes.rel = buttonsArr[index].linkAttr.rel.default;
			}
			if (buttonsArr[index].linkAttr.rel.default.includes('nofollow')) {
				updatelinkAttributes.rel = buttonsArr[index].linkAttr.rel.default;
			}
			if (buttonsArr[index].linkAttr.rel.default.includes('nofollow') && (targetValuelinkAttributes === '_blank')) {
				updatelinkAttributes.target = buttonsArr[index].linkAttr.targetLink.default;
				updatelinkAttributes.rel = buttonsArr[index].linkAttr.rel.default;
			}

			return updatelinkAttributes;
		});
	}

	const addButton = () => {
		if (buttonsArr.length > 3) {
			return;
		}
		const newArr = [...buttonsArr]
		const newObj = {...buttonsArr[0]};
		newArr.push(newObj);
		// const newArr = [...buttonsArr, {...buttonsArr[0]}]
		props.setAttributes({ buttonsArr: newArr});
	};


	const updateButtonValue = (index, content) => {
		const newButtonContent = [...buttonsArr];
		newButtonContent[index] = {
			...buttonsArr[index],
			"content": content
		};
		props.setAttributes( { buttonsArr: newButtonContent } );
	};

	const updateButtonImg = (index, media) => {
		const newArr = [...buttonsArr];
		newArr[index] = {
			...buttonsArr[index],
			"images": {
				"type": "array",
				"source": "query",
				"selector": "img",
				"query": {
					"mediaId": {
						"type": "number",
						"default": media.id
					},
					"urlMedia": {
						"type": "string",
						"source": "attribute",
						"attribute": "src",
						"default": media.url
					},
					"altAttr": {
						"type": "string",
						"source": "attribute",
						"attribute": "alt",
						"default": media.alt
					}
				}
			}
		};
		props.setAttributes( { buttonsArr: newArr } );
	};

	const removeButtonImg = (index, media) => {
		const newArr = [...buttonsArr];
		newArr[index] = {
			...buttonsArr[index],
			"images": {
				"type": "array",
				"source": "query",
				"selector": "img",
				"query": {
					"mediaId": {
						"type": "number",
						"default": 0
					},
				}
			}
		};
		props.setAttributes( { buttonsArr: newArr } )
	};


	const updateButtonLink = (index, linkValue) => {
		const newArr = [...buttonsArr];
		newArr[index] = {
			...buttonsArr[index],
			"linkAttr": {
				...buttonsArr[index].linkAttr,
				"link": {
					...buttonsArr[index].linkAttr.link,
					"default": linkValue
				}
			}
		};
		props.setAttributes({ buttonsArr: newArr });
	}

	const updateButtonTarget = (index, targetValue) => {
		const newArr = [...buttonsArr];
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
		props.setAttributes({ buttonsArr: newArr });
	}

	const updateButtonRel = (index, targetRel) => {
		let rel = buttonsArr[index].linkAttr.rel.default;
		rel = targetRel;
		if (targetRel === '') {
			rel.replace('nofollow', '')
		}
		const newArr = [...buttonsArr];
		newArr[index] = {
			...buttonsArr[index],
			"linkAttr": {
				...buttonsArr[index].linkAttr,
				"targetLink": {
					...buttonsArr[index].linkAttr.targetLink,
				},
				"rel": {
					...buttonsArr[index].linkAttr.rel.default,
					"default": rel,
				}
			}
		};
		props.setAttributes({ buttonsArr: newArr });
	}

	const removeButton = (index) => {
		if (buttonsArr.length === 0 || buttonsArr.length === 1) {
			return;
		}
		const rmBtn = [...buttonsArr];
		rmBtn.splice(index, 1);
		props.setAttributes({ buttonsArr: rmBtn });
	};

	const fontSizes = [
		{
			name: __( 'Small' ),
			slug: 'small',
			size: 12,
		},
		{
			name: __( 'Big' ),
			slug: 'big',
			size: 26,
		},
	];
	const fallbackFontSize = 16;

	return (
		<Fragment>
			<BlockControls>
				<BlockAlignmentToolbar
					title='Расположение кнопок'
					value={ justifyСontentBtn }
					onChange={(value) =>
						props.setAttributes( {
							justifyСontentBtn: value,
						} )}
				/>
			</BlockControls>

			<InspectorControls>
				<PanelBody
					title='Ширина кнопки'
					initialOpen={ false }
				>
					<TextControl
						label="Ширина кнопки px"
						value={ width }
						type="number"
						min={ 100 }
						max={ 500 }
						onChange={ ( value ) =>
							props.setAttributes( {
								width: value,
							} )
						}
					/>
				</PanelBody>
				<PanelBody
					title={ __( 'Размер шрифта', 'custom-button' ) }
					initialOpen={ false }
				>
					<FontSizePicker
						__nextHasNoMarginBottom
						fontSizes={ fontSizes }
						value={ fontSize }
						fallbackFontSize={ fallbackFontSize }
						onChange={ ( value ) =>
							props.setAttributes( {
								fontSize: value,
							} )
						}
					/>
				</PanelBody>
				<PanelBody
					title={ __( 'Тег кнопки', 'custom-button' ) }
					initialOpen={ false }
				>
					<SelectControl
						value={ tag }
						options={ [
							{ label: 'Button', value: 'button' },
							{ label: 'Div', value: 'div' },
							{ label: 'Link', value: 'a' },
						] }
						onChange={ ( value ) =>
							props.setAttributes( {
								tag: value,
							} )
						}
						__nextHasNoMarginBottom
					/>
				</PanelBody>
				{ buttonsArr.length && (
					<PanelBody
						title='Опции для иконки'
						initialOpen={ false }
					>
						<SelectControl
							value={ mediaPosition }
							options={ [
								{ label: 'Left', value: 'left' },
								{ label: 'Top', value: 'top' },
								{ label: 'Right', value: 'right' },
								{ label: 'Bottom', value: 'bottom' },
							] }
							onChange={ ( value ) =>
								props.setAttributes( {
									mediaPosition: value,
								} )
							}
						/>
						<TextControl
							label="Ширина иконки px"
							type="number"
							value={ mediaSize.width }
							onChange={ ( value ) =>
								props.setAttributes( {
									mediaSize: {
										...mediaSize,
										width: value,
									},
								} )
							}
						/>
						<TextControl
							label="Высота иконки px"
							type="number"
							value={ mediaSize.height }
							onChange={ ( value ) =>
								props.setAttributes( {
									mediaSize: {
										...mediaSize,
										height: value,
									},
								} )
							}
						/>
						<TextControl
							label="Отступ иконки px"
							type="number"
							value={ mediaSize.gap }
							onChange={ ( value ) =>
								props.setAttributes( {
									mediaSize: {
										...mediaSize,
										gap: value,
									},
								} )
							}
						/>
					</PanelBody>
				) }
				<PanelBody
					title={ __(
						'Внутреннние отступы кнопки',
						'custom-button'
					) }
					initialOpen={ false }
				>
					<BoxControl
						values={ padding }
						onChange={ ( value ) =>
							props.setAttributes( {
								padding: value,
							} )
						}
						units={ [] }
					/>
				</PanelBody>
				<PanelBody
					title='Скругление'
					initialOpen={ false }
				>
					<RangeControl
						label="Скругление"
						value={ radius }
						onChange={ ( value ) =>
							props.setAttributes( {
								radius: value,
							} )
						}
						min={ 0 }
						max={ 300 }
					/>
				</PanelBody>
				<PanelBody
					title={ __( 'Цвет кнопки', 'custom-button' ) }
					initialOpen={ false }
				>
					<ColorPicker
						color={ backgroundColor }
						onChange={ ( value ) =>
							props.setAttributes( {
								backgroundColor: value,
							} )
						}
						enableAlpha
						allowReset={ false }
					/>
				</PanelBody>
				<PanelBody
					title={ __( 'Цвет кнопки при наведении', 'custom-button' ) }
					initialOpen={ false }
				>
					<ColorPicker
						color={ backgroundColorHover }
						onChange={ ( value ) =>
							props.setAttributes( {
								backgroundColorHover: value,
							} )
						}
						enableAlpha
						allowReset={ false }
					/>
				</PanelBody>
				<PanelBody
					title={ __( 'Цвет текста кнопки', 'custom-button' ) }
					initialOpen={ false }
				>
					<div>Цвет текста</div>
					<ColorPicker
						color={ contentColor }
						onChange={ ( value ) =>
							props.setAttributes( {
								contentColor: value,
							} )
						}
						enableAlpha
					/>
					<div>Цвет текста при наведении</div>
					<ColorPicker
						color={ contentColorHover }
						onChange={ ( value ) =>
							props.setAttributes( {
								contentColorHover: value,
							} )
						}
						enableAlpha
					/>
				</PanelBody>
			</InspectorControls>

			<div { ...useBlockProps({
				className: `cg-block-buttons-gutenberg ${ alignСontentBtn[ justifyСontentBtn ] }`,
				style: {}
			}) }>

				{buttonsArr.map((buttonArr, index) => (
					<>
						<BlockControls>
							{ buttonsArr.length && Boolean(buttonsArr[index]['images']['query']['mediaId'].default) && (
								<ToolbarGroup>
									<ToolbarButton
										onClick={ () => removeButtonImg(index)}>
										Delete icon {index + 1}
									</ToolbarButton>
								</ToolbarGroup>
							) }
						</BlockControls>
						<button className="remove" onClick={() => removeButton(index)}>REMOVE</button>
						<TagName
							key={index}
							className={ `cg-button-gutenberg` }
							{ ...useBlockPropsAttrs }
							{...(linkAttributes ? linkAttributes[index] : {})}
						>
								<span className={ `cg-button-gutenberg__inner ${ mediaPositionValues[ mediaPosition ] }` }>
									{  buttonsArr.length && Boolean(buttonsArr[index]['images']['query']['mediaId'].default) && (
										<span className="button_icon" style={ iconStyles }><img src={ buttonsArr[index]['images']['query']['urlMedia'].default } alt={ buttonsArr[index]['images']['query']['altAttr'].default } /></span>
									) }
									<InspectorControls>
										{ isLink && (
											<PanelBody
												title={`Settings Link ${index + 1}`}
												initialOpen={ false }
											>
												<TextControl
													label={`Link ${index + 1}`}
													value={ buttonsArr[index].linkAttr.link.default }
													onChange={ ( linkValue ) => updateButtonLink(index, linkValue)}
												/>
												<SelectControl
													value={ buttonsArr[index].linkAttr.targetLink.default }
													options={ [
														{ label: '_blank', value: '_blank' },
														{ label: 'auto', value: 'auto' },
													] }
													onChange={ ( targetValue ) => updateButtonTarget(index, targetValue)}
													__nextHasNoMarginBottom
												/>
												<SelectControl
													value={ buttonsArr[index].linkAttr.rel.default }
													options={ [
														{ label: '', value: '' },
														{ label: 'nofollow', value: 'nofollow' },
													] }
													onChange={ ( targetRel ) => updateButtonRel(index, targetRel)}
													__nextHasNoMarginBottom
												/>
											</PanelBody>
										) }
										{ buttonsArr.length && !Boolean(buttonsArr[index]['images']['query']['mediaId'].default) &&
											(<PanelBody
												title={`Image ${index + 1}`}
												initialOpen={ false }
											>
												Image {index + 1}
												<MediaPlaceholder
													allowedTypes={ [ 'image' ] }
													multiple={ false }
													labels={ {
														title: 'Add image',
													} }
													disableDropZone="true"
													onSelect={ ( media ) => updateButtonImg(index, media)}
												/>
											</PanelBody>)
										}
										<PanelBody
											title={`Text button ${index + 1}`}
											initialOpen={ true }
										>
											<TextControl
												label={`Text button ${index + 1}`}
												value={buttonsArr[index].content}
												onChange={(newText) => updateButtonValue(index, newText)}
											/>
										</PanelBody>
									</InspectorControls>
									<RichText
										tagName="span"
										value={buttonsArr[index].content}
										onChange={(value) => updateButtonValue(index, value)}
									/>
								</span>
						</TagName>
					</>
				))}
				<button className="add" onClick={addButton}>ADD BUTTON</button>
			</div>
		</Fragment>
	);
}
