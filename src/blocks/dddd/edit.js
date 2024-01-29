
import { InnerBlocks, useBlockProps, useInnerBlocksProps  } from '@wordpress/block-editor';
import ServerSideRender from "@wordpress/server-side-render";
import './editor.scss';
import {TextControl} from "@wordpress/components";
// import {useEffect} from "@types/react";
import { useSelect } from '@wordpress/data';
import {useEffect} from "react";

export default function Edit( props ) {
	const {
		postsText,
		version
	} = props.attributes;

	// console.log('version', version);
	// console.log('urban_object', urban_object['version']);
	// console.log("postsText", postsText)


	const blockProps = useBlockProps();

	const frontendContent = document.createElement('div');
	frontendContent.innerHTML = `
            <h1>${postsText}</h1>
            <div class="frontend-content">{version}</div>`;

	const innerBlocksProps = useInnerBlocksProps();

	const innerBlocks4 = useSelect(
		(select) => select('core/block-editor').getBlocks(props.clientId));
	useEffect(() => {
		props.setAttributes({ innerBlocks4 }); // Обновление атрибута innerBlocks4
	}, [innerBlocks4]); // Внутри useEffect, здесь innerBlocks4 будет содержать актуальные данные при изменении вложенных блоков

	return (
		<div { ...blockProps }>
			<h1 className='ddddd'>{postsText}</h1>
			<h2 className='ddddd'>{version}</h2>

			<TextControl
				label='My Text Field'
				value={ postsText }
				onChange={ ( val ) => {
					props.setAttributes( { postsText: val } );
				}}
			/>
			{version === 'v1' ? (
				<div className="variation-1">
					<div {...innerBlocksProps } />
					{/* <div {...innerBlocksProps } /> <InnerBlocks onChange={handleInnerBlocksChange} />*/}
					<h2 className="cg-news-title">Latest News (Version 1)</h2>
					<ul className="cg-news-list">
						<li className="cg-news-item">
							<a href="#">News Item 1 (Version 1)</a>
							<p className="cg-news-description">{postsText}</p>
						</li>
					</ul>
				</div>
			) : (
				<div className="variation-2">
					<h2 className="cg-news-title">Latest News (Version 2)</h2>
					<ul className="cg-news-list">
						<li className="cg-news-item">
							<a href="#">News Item 1 (Version 2)</a>
							<p className="cg-news-description">{postsText}</p>
						</li>
						<li className="cg-news-item">
							<a href="#">News Item 2 (Version 2)</a>
							<p className="cg-news-description">{postsText}</p>
						</li>
					</ul>
				</div>
			)}
		{/*	<ServerSideRender
				block="cg/dddd"
				attributes={version}
			/>*/}
		</div>
	);
}
