import { registerBlockType } from '@wordpress/blocks';
// import './style.scss';
import Edit from './edit';
import save from './save';
import metadata from './block.json';

registerBlockType( metadata.name, {
	icon : {
		src: "fashions-embed-photo",
		background: 'rgba(30,236,236,0.51)',
	},
	edit: Edit,
	save: () => null,
	// save,
} );
