import { useBlockProps } from '@wordpress/block-editor';

export default function save( props ) {
	const {
		images,
		style,
		className,
		title,
		description
	} = props.attributes;

	const blockProps = useBlockProps.save(
		{
			className,
			style
		}
	);

	return (
		<div { ...blockProps } >
			<div className="cg-logo-block__pic">
				{ (!!(images && images.length)) && (
					<img src={ images[0].urlMedia  } alt={ images[0].altAttr || '' } />
				) }
			</div>
			{title && <p className="cg-logo-block__title">{title}</p>}
			{description && <p className="cg-logo-block__description">{description}</p>}
		</div>);
}
