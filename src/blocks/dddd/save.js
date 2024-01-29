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
	// console.log('version_save', version);

	// const [versionStyle, setVersionStyle] = useState('');

/*	useEffect(() => {
		const unsubscribe = wp.data.subscribe(() => { // Подписываемся на изменения атрибутов блока
			const blockTypes = wp.data.select('core/blocks').getBlockTypes(); // Получаем доступ к блокам через wp.data
			const cgDdddBlock = blockTypes.find((blockType) => blockType.name === 'cg/dddd'); // Ищем блок с именем 'cg/dddd'
			const newVersionStyle = cgDdddBlock.attributes.version; // Доступ к атрибутам блока
			console.log(newVersionStyle)
			// setVersionStyle(newVersionStyle); // Обновление состояния и вёрстки
		});
		return () => unsubscribe(); // Очистка подписчика при размонтировании компонента
	}, []); // Подписка выполняется только при монтировании компонента


	useEffect(() => { // Вызываем функцию при изменении versionStyle
		console.log("useEffectVersionSave", version)
	}, [version]);*/


/*	const updateFrontend = () => {// Ваш код для обновления фронтенда
		console.log('Updated frontend with version:', versionStyle);// Здесь вы можете использовать versionStyle для динамического формирования вёрстки
	};*/

	return (
		<div { ...blockProps }>
			<h1 className='ddddd'>{postsText}</h1>
			<h2 className='ddddd'>{version}</h2>
			{version === 'v1' ? (
				<div className="variation-1">
					<InnerBlocks.Content />
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
		</div>
	);
}
