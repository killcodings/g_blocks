import { useEffect } from '@wordpress/element';
import { useState } from '@wordpress/element';
import {InnerBlocks, useBlockProps} from '@wordpress/block-editor';
import { useSelect } from '@wordpress/data';
// import {useEffect} from "react";

export default function save( props ) {
	const {
		postsText,
		version
	} = props.attributes;

	const blockProps = useBlockProps.save();

	return (
		<div { ...blockProps }>
			<h1 className='ddddd'>{postsText}</h1>
			<h2 className='ddddd'>{version}</h2>
			{version === 'v1' ? (
				<div className="variation-1">
					<h2 className="cg-news-title">Latest News (Version 1)</h2>
				</div>
			) : (
				<div className="variation-2">
					<h2 className="cg-news-title">Latest News (Version 2)</h2>
				</div>
			)}
		</div>
	);
}
