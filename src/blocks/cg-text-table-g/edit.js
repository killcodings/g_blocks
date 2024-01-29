import { InnerBlocks, useBlockProps, useInnerBlocksProps, InspectorControls } from '@wordpress/block-editor';
import ServerSideRender from "@wordpress/server-side-render";
import './editor.scss';
import {ColorPicker, PanelBody, TextControl, ToggleControl} from "@wordpress/components";
// import {useEffect} from "@types/react";
import { useSelect } from '@wordpress/data';
import { useEffect } from "react";
const { Fragment } = wp.element;

export default function Edit( props ) {
	const {
		version,
		isTable
	} = props.attributes;


	console.log(isTable);

	const blockProps = useBlockProps();
	const innerBlocksProps = useInnerBlocksProps(
		{ className: 'cg-text-table-1' },
		{
			allowedBlocks: [
				'core/table'
			],
			template: [
				['core/table', {'className' : 'cg-text-table-props'}]
			],
		},
	);
/*	const MY_TEMPLATE =  [
		['core/table', {'className' : 'cg-text-table-3'}]
	];*/

/*	wp.hooks.addFilter('blocks.getSaveElement', 'urban/remove-table-wrapper', (element, blockType, attributes) => { // убрать обёртку wp-block-table
		if (blockType.name === 'core/table') {
			return (<>{element.props.children}</>);
		}
		return element;
	});*/

	return (
		<Fragment>
			<InspectorControls>
				<PanelBody
					title='Table checked'
					initialOpen={ true }
				>
					<ToggleControl
						label="Toggle table"
						checked={isTable}
						onChange={ ( value ) =>
							props.setAttributes( {
								isTable: value,
							} )
						}
					/>
				</PanelBody>
			</InspectorControls>

			<div { ...blockProps }>
				<div {...innerBlocksProps} />
				{/*<InnerBlocks template={ MY_TEMPLATE } templateLock="all"/>*/}
			</div>
		</Fragment>
	);
}
