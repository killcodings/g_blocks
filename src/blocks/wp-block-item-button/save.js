/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { useBlockProps, RichText } from '@wordpress/block-editor';

/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#save
 *
 * @return {Element} Element to render.
 */
export default function save( props ) {
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
	const isTarget = targetLink !== 'auto';

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

	if ( isLink ) {
		useBlockPropsAttrs[ 'href' ] = link;
		if ( isTarget ) {
			useBlockPropsAttrs[ 'target' ] = targetLink;
		}
	}

	return (
		<div { ...useBlockProps.save() }>
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
					<RichText.Content
						className="button_text"
						tagName="span"
						value={ content }
						style={ {
							textAlign: textAlign,
						} }
					/>
				</span>
			</TagName>
		</div>
	);
}
