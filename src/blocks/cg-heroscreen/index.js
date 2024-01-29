import { registerBlockType } from '@wordpress/blocks';
import './style.scss';
import Edit from './edit';
import save from './save';
import metadata from './block.json';
registerBlockType( metadata.name, {
	icon: {
		src: 'superhero',
		background: '#f03',
		foreground: '#fff',
	},
	edit: Edit,
	// save: () => null,
	save,
} );
