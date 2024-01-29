/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import {
	useBlockProps,
	InspectorControls,
	RichText,
	AlignmentToolbar,
	BlockControls,
	MediaPlaceholder,
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
/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';

import previewImage from './preview.jpg';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {Element} Element to render.
 */
const { Fragment } = wp.element;

export default function Edit( props ) {
	const {
		content,
		tag,
		contentColor,
		backgroundColor,
		contentColorHover,
		backgroundColorHover,
		link,
		targetLink,
		padding,
		radius,
		justifyСontentBtn,
		textAlign,
		url,
		alt,
		mediaSize,
		mediaPosition,
		width,
		fontSize,
	} = props.attributes;
	const TagName = tag;
	const isLink = tag === 'a';

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
		left: 'button_inner--media-left',
		top: 'button_inner--media-top',
		right: 'button_inner--media-right',
		bottom: 'button_inner--media-bottom',
	};

	const alignСontentBtn = {
		center: 'wp-block-item-button--center',
		'flex-start': 'wp-block-item-button--flex-start',
		'flex-end': 'wp-block-item-button--flex-end',
	};

	const alignValues = {
		center: 'button_inner--align-center',
		left: 'button_inner--align-left',
		right: 'button_inner--align-right',
	};

	const useBlockPropsAttrs = {
		style: componentStyles,
	};

	return (
		<Fragment>
			<BlockControls>
				{ url && (
					<ToolbarGroup>
						<ToolbarButton
							onClick={ () =>
								props.setAttributes( {
									url: '',
									alt: '',
									mediaId: '',
								} )
							}
						>
							Удалить картинку
						</ToolbarButton>
					</ToolbarGroup>
				) }
			</BlockControls>
			<InspectorControls>
				<PanelBody
					title={ __( 'Расположение кнопки', 'custom-button' ) }
					initialOpen={ true }
				>
					<SelectControl
						value={ justifyСontentBtn }
						options={ [
							{ label: 'Центр', value: 'center' },
							{ label: 'Слева', value: 'flex-start' },
							{ label: 'Справа', value: 'flex-end' },
						] }
						onChange={ ( value ) =>
							props.setAttributes( {
								justifyСontentBtn: value,
							} )
						}
					/>
				</PanelBody>
				<PanelBody
					title={ __( 'Ширина кнопки', 'custom-button' ) }
					initialOpen={ true }
				>
					<TextControl
						label="Ширина кнопки px"
						value={ width }
						type="number"
						onChange={ ( value ) =>
							props.setAttributes( {
								width: value,
							} )
						}
					/>
				</PanelBody>
				<PanelBody
					title={ __( 'Размер шрифта', 'custom-button' ) }
					initialOpen={ true }
				>
					<TextControl
						label="Размер шрифта px"
						value={ fontSize }
						type="number"
						onChange={ ( value ) =>
							props.setAttributes( {
								fontSize: value,
							} )
						}
					/>
				</PanelBody>
				<PanelBody
					title={ __( 'Текст кнопки', 'custom-button' ) }
					initialOpen={ true }
				>
					<TextControl
						label="Текст кнопки"
						value={ content }
						onChange={ ( value ) =>
							props.setAttributes( {
								content: value,
							} )
						}
					/>
				</PanelBody>
				<PanelBody
					title={ __( 'Выравнивание текста', 'custom-button' ) }
					initialOpen={ true }
				>
					<SelectControl
						value={ textAlign }
						options={ [
							{ label: 'Центр', value: 'center' },
							{ label: 'Слева', value: 'left' },
							{ label: 'Справа', value: 'right' },
						] }
						onChange={ ( value ) =>
							props.setAttributes( {
								textAlign: value,
							} )
						}
					/>
				</PanelBody>
				<PanelBody
					title={ __( 'Тег кнопки', 'custom-button' ) }
					initialOpen={ true }
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
				{ isLink && (
					<PanelBody
						title={ __( 'Ссылка', 'custom-button' ) }
						initialOpen={ true }
					>
						<TextControl
							label="Ссылка"
							value={ link }
							onChange={ ( value ) =>
								props.setAttributes( {
									link: value,
								} )
							}
						/>
					</PanelBody>
				) }
				{ isLink && (
					<PanelBody
						title={ __( 'Атрибут target', 'custom-button' ) }
						initialOpen={ true }
					>
						<SelectControl
							value={ targetLink }
							options={ [
								{ label: '_blank', value: '_blank' },
								{ label: 'auto', value: 'auto' },
							] }
							onChange={ ( value ) =>
								props.setAttributes( {
									targetLink: value,
								} )
							}
							__nextHasNoMarginBottom
						/>
					</PanelBody>
				) }
				{ url && (
					<PanelBody
						title={ __( 'Опции для иконки', 'custom-button' ) }
						initialOpen={ false }
					>
						<SelectControl
							value={ mediaPosition }
							options={ [
								{ label: 'Слева', value: 'left' },
								{ label: 'Сверху', value: 'top' },
								{ label: 'Справа', value: 'right' },
								{ label: 'Снизу', value: 'bottom' },
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
					title={ __( 'Скругление', 'custom-button' ) }
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
					<ColorPicker
						color={ contentColor }
						onChange={ ( value ) =>
							props.setAttributes( {
								contentColor: value,
							} )
						}
						enableAlpha
					/>
				</PanelBody>
				<PanelBody
					title={ __(
						'Цвет текста кнопки при наведении',
						'custom-button'
					) }
					initialOpen={ false }
				>
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
			{ ! url && (
				<MediaPlaceholder
					allowedTypes={ [ 'image' ] }
					multiple={ false }
					labels={ {
						title: 'Add logo',
					} }
					disableDropZone="true"
					onSelect={ ( media ) =>
						props.setAttributes( {
							url: media.url,
							alt: media.alt || '',
							mediaId: media.id,
						} )
					}
				/>
			) }
			<div { ...useBlockProps() }>

				<TagName
					className={ `wp-block-item-button ${ alignСontentBtn[ justifyСontentBtn ] }` }
					{ ...useBlockPropsAttrs }
				>
					<span
						className={ `button_inner ${ mediaPositionValues[ mediaPosition ] } ${ alignValues[ textAlign ] }` }
					>
						{ url && (
							<span className="button_icon" style={ iconStyles }>
								<img src={ url } alt={ alt } />
							</span>
						) }
						<RichText
							className="button_text"
							tagName="span"
							value={ content }
							onChange={ ( value ) =>
								props.setAttributes( {
									content: value,
								} )
							}
							allowedFormats={ [ 'core/bold', 'core/italic' ] }
							style={ {
								textAlign: textAlign,
							} }
						/>
					</span>
				</TagName>

			</div>
		</Fragment>
	);
}
