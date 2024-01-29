import { registerBlockType } from '@wordpress/blocks';
import './style.scss';
import Edit from './edit';
import save from './save';
import metadata from './block.json';

registerBlockType( metadata.name, {
	icon : {
		src: (
			"block-default"
		),
		background: '#0055ff47',
	},
	edit: Edit,
	// save: () => null,
	save,
} );
