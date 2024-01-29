import { useEffect } from '@wordpress/element';
import { useState } from '@wordpress/element';
import {InnerBlocks, useBlockProps, useInnerBlocksProps} from '@wordpress/block-editor';
import { useSelect } from '@wordpress/data';
// import {useEffect} from "react";

export default function save( props ) {
	const {
		version,
		isTable
	} = props.attributes;
	const blockProps = useBlockProps.save();
	const innerBlocksProps = useInnerBlocksProps.save();

	return (
		<>
			{isTable &&
				(<div { ...blockProps }>
					<div {...innerBlocksProps} />
				</div>)}

			{/*<InnerBlocks.Content />*/}
		</>
	)
}
