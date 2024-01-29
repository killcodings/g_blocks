import { __ } from '@wordpress/i18n';
// import { useState } from 'react';
const { useState } = wp.element;
import { apiFetch } from "@wordpress/api-fetch";
import { useBlockProps, RichText, BlockControls, InspectorControls, MediaPlaceholder, InnerBlocks } from '@wordpress/block-editor';
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
} from "@wordpress/components";
const { useSelect } = wp.data;
import v1 from "./version/edit-heroscreen-v1";
import v2 from "./version/edit-heroscreen-v2";
import {useEffect} from "react";
import { select } from '@wordpress/data';
import './editor.scss';

export default function Edit({attributes, setAttributes}) {

/*	const [versionStyle, setVersionStyle] = useState('');
	useEffect(() => {
		const unsubscribe = wp.data.subscribe(() => { // Подписываемся на изменения атрибутов блока
			const blockTypes = wp.data.select('core/blocks').getBlockTypes(); // Получаем доступ к блокам через wp.data
			const cgDdddBlock = blockTypes.find((blockType) => blockType.name === 'cg/heroscreen'); // Ищем блок
			const newVersionStyle = cgDdddBlock.attributes.version; // Доступ к атрибутам блока
			setVersionStyle(newVersionStyle); // Обновление состояния и вёрстки
		});
		return () => unsubscribe(); // Очистка подписчика при размонтировании компонента
	}, []); // Подписка выполняется только при монтировании компонента*/

	if (urban_object['version'] === 'v1') {
		return v1({attributes, setAttributes});
	}
	if (urban_object['version'] === 'v2') {
		return v2({attributes, setAttributes});
	}
}
