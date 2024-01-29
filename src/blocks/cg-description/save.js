import {RichText, useBlockProps, InnerBlocks} from '@wordpress/block-editor';
export default function save({attributes}) {
	const {сolorText} = attributes;
	const {maxWidth} = attributes;
	const {textAlign} = attributes;
	const { paragraphs } = attributes;

	let componentStyles = {
		'--cg-text-description': сolorText,
		'--text-align': textAlign
	};

	if ( !! maxWidth ) {
		componentStyles[ '--max-width' ] = `${ maxWidth }px`;
	}

	const useBlockPropsAttrs = {
		style: componentStyles,
	};

	return (
		 !!paragraphs.length && <div className="cg-description" { ...useBlockPropsAttrs }>
			{paragraphs.map((paragraph, index) => (
				<p key={index}>{paragraph.content}</p>
			))}
		</div>
	);
}
