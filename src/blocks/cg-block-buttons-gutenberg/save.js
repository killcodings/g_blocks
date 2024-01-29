import { useBlockProps, RichText } from '@wordpress/block-editor';
export default function save( props ) {
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
		left: 'cg-button-gutenberg__inner--media-left',
		top: 'cg-button-gutenberg__inner--media-top',
		right: 'cg-button-gutenberg__inner--media-right',
		bottom: 'cg-button-gutenberg__inner--media-bottom',
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

	return (
		<div { ...useBlockProps.save({
			className: `cg-block-buttons-gutenberg ${ alignСontentBtn[ justifyСontentBtn ] }`,
			style: {}
		}) }>
			{buttonsArr.map((btn, index) => (
				<>
					<TagName
						key={index}
						className={ `cg-button-gutenberg` }
						{ ...useBlockPropsAttrs }
						{...(linkAttributes ? linkAttributes[index] : {})}
					>
						<span className={ `cg-button-gutenberg__inner ${ mediaPositionValues[ mediaPosition ] }` }>
							{ buttonsArr.length && Boolean(buttonsArr[index]['images']['query']['mediaId'].default) && (
								<span className="button_icon" style={ iconStyles }>
								<img src={ buttonsArr[index]['images']['query']['urlMedia'].default  } alt={ buttonsArr[index]['images']['query']['altAttr'].default } />
							</span>
							) }
							<span>
								{btn.content}
							</span>
						</span>
					</TagName>
				</>
			))}
		</div>
	);
}
