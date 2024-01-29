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
        background: '#b0ff00',
    },
    edit: Edit,
    // save: () => null,
    save,
} );
