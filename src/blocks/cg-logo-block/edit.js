import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls, RichText, AlignmentToolbar, BlockControls, MediaPlaceholder } from '@wordpress/block-editor';
import {
	PanelBody,
	TextControl,
	ColorPicker,
	__experimentalBoxControl as BoxControl,
	RangeControl,
	ToolbarGroup,
	ToolbarButton,
	FontSizePicker,
	SelectControl,
} from '@wordpress/components';
import './editor.scss';
import { Fragment } from '@wordpress/element';
// const { Fragment } = wp.element;

export default function Edit( props ) {
	const {
		images,
		className,
		style,
		title,
		description
	} = props.attributes;

	const onChangeColor = (newColor) => {
		// Create new object
		const updatedBgLogo = {
			...style,
			"--bgLogo": newColor,
		};
		// Update attr --bgLogo
		props.setAttributes({ style: updatedBgLogo });
	};

	const blockProps = useBlockProps(
		{
			className,
			style
		}
	);

	return (
		<Fragment>
			<InspectorControls>
				{ !(Boolean(images && images.length)) && <MediaPlaceholder
					allowedTypes={ [ 'image' ] }
					multiple={ false }
					labels={ {
						title: 'Logo',
					} }
					disableDropZone="true"
					onSelect={ ( mediaAdd ) => {
							props.setAttributes( {
								images: [
									{
										urlMedia: mediaAdd.url,
										altAttr: mediaAdd.alt,
										mediaId: mediaAdd.id,
									},
								],
							} )
						}
					}
				/> }
			</InspectorControls>
			{ Boolean(images && images.length) && (
				<InspectorControls>
					<PanelBody
						title='Options pic'
						initialOpen={ false }
					>
						<TextControl
							label="Width px"
							type="number"
							min={ 15 }
							max={ 150 }
							value={ parseInt(style['--widthLogo']) }
							onChange={
							( value ) => {props.setAttributes( { style : {...style, "--widthLogo": `${value}px`}})}
							}
						/>
						<TextControl
							label="Height px"
							type="number"
							min={ 15 }
							max={ 150 }
							value={ parseInt(style['--heightLogo']) }
							onChange={
								( value ) => {props.setAttributes( { style : {...style, "--heightLogo": `${value}px`}})}
							}
						/>
					{/*	<TextControl
							label="Alt"
							type="text"
							value={ images[0].altAttr }
							onChange={ ( value ) =>
								props.setAttributes( {
									"images[0].altAttr": value,
								} )
							}
						/>*/}
					</PanelBody>
					<PanelBody
						title='Background logo'
						initialOpen={ false }
					>
						<ColorPicker
							color={ style['--bgLogo'] }
							onChange={ ( value ) => {
								onChangeColor(value)
							}
							}
							enableAlpha
							allowReset={ false }
						/>
					</PanelBody>
				</InspectorControls>
			) }
			<InspectorControls>
				<PanelBody
					title='Text'
					initialOpen={ false }
				>
					<TextControl
						label="Title"
						type="text"
						placeholder="Title"
						value={ title }
						onChange={ ( value ) =>
							props.setAttributes( {
								title : value
							} )
						}
					/>
					<TextControl
						label="Description"
						type="text"
						placeholder="Description"
						value={ description }
						onChange={ ( value ) =>
							props.setAttributes( {
								description : value
							} )
						}
					/>
				</PanelBody>
			</InspectorControls>

			<BlockControls>
				{ !!(images && images.length) && (
					<ToolbarGroup>
						<ToolbarButton
							onClick={ (mediaRemove) => {
									props.setAttributes({images : images.length = 0})
								}
							}
						>
							Delete image
						</ToolbarButton>
					</ToolbarGroup>
				) }
			</BlockControls>

			<div { ...blockProps } >
				<div className="cg-logo-block__pic">
					{ Boolean(images && images.length) && (
						<img src={ images[0].urlMedia } alt={ images[0].altAttr || '' } />
					) }
					</div>
				<p className="cg-logo-block__title">{title}</p>
				<p className="cg-logo-block__description">{description}</p>
			</div>
		</Fragment>
	);
}
