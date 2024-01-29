import { useBlockProps, RichText, InnerBlocks } from '@wordpress/block-editor';
import v1 from "./version/save-heroscreen-v1";
import v2 from "./version/save-heroscreen-v2";
export default function save({attributes}) {
	if (urban_object['version'] === 'v1') {
		return v1({attributes});
	}
	if (urban_object['version'] === 'v2') {
		return v2({attributes});
	}
}
