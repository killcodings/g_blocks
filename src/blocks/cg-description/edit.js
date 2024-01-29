import {useBlockProps, RichText, InspectorControls, InnerBlocks} from '@wordpress/block-editor';
import {
	ToolbarGroup,
	ToolbarButton,
	DropdownMenu,
	ToolbarDropdownMenu,
	SelectControl,
	PanelBody,
	ToggleControl,
	ColorPicker,
	TextControl
} from "@wordpress/components"
import './editor.scss';
import {__} from "@wordpress/i18n";
const { Fragment } = wp.element;

export default function Edit({attributes, setAttributes}) {
	const {text} = attributes; // {text: text} = attributes
	const {сolorText} = attributes;
	const {maxWidth} = attributes;
	const {textAlign} = attributes;
	const { paragraphs } = attributes;

	const addParagraph = () => {
		const newParagraphs = [...paragraphs, { content: '' }];
		setAttributes({ paragraphs: newParagraphs });
	};
	const updateParagraph = (index, content) => {
		const newParagraphs = [...paragraphs];
		newParagraphs[index] = { content };
		setAttributes({ paragraphs: newParagraphs });
	};
	const removeParagraph = (index) => {
		if (paragraphs.length === 0 || paragraphs.length === 1) {
			return;
		}
		const newParagraphs = [...paragraphs];
		newParagraphs.splice(index, 1);
		setAttributes({ paragraphs: newParagraphs });
	};
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
		<Fragment>
			<InspectorControls>
				<PanelBody
					title='Цвет текста'
					initialOpen={ false }
				>
					<ColorPicker
						color={ сolorText }
						onChange={
							(value)=> setAttributes({сolorText: value})
						}
						enableAlpha
					/>
				</PanelBody>
				<PanelBody
					title='Ширина текста'
					initialOpen={ false }
				>
					<TextControl
						label="Ширина текста px"
						value={ maxWidth }
						type="number"
						min="754"
						max="854"
						onChange={
							(value)=> setAttributes({maxWidth: value})
						}
					/>
				</PanelBody>
				<PanelBody
					title={ __( 'Выравнивание текста', 'paragraph-max-width' ) }
					initialOpen={ true }
					>
					<SelectControl
						value={ textAlign }
						options={ [
							{ label: 'Центр', value: 'center' },
							{ label: 'Слева', value: 'left' },
							{ label: 'Справа', value: 'right' },
						] }
						onChange={
							(value)=> setAttributes({textAlign: value})
						}
					/>
				</PanelBody>
			</InspectorControls>

			<div className="cg-description" { ...useBlockPropsAttrs }>
				<div>
				{paragraphs.map((paragraph, index) => (
					<div key={index} className="cg-description__item">
						<RichText
							value={paragraph.content}
							onChange={(value) => updateParagraph(index, value)}
							multiline={false}
							placeholder="Enter your text here..."
						/>
						<button className="add" onClick={addParagraph}>+</button>
						<button className="remove" onClick={() => removeParagraph(index)}>-</button>
					</div>
				))}
				</div>
			</div>
		</Fragment>
	);
}
