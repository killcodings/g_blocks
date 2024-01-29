/**
 * Registers a new block provided a unique name and an object defining its behavior.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */
import { registerBlockType } from '@wordpress/blocks';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * All files containing `style` keyword are bundled together. The code used
 * gets applied both to the front of your site and to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './style.scss';

/**
 * Internal dependencies
 */
import Edit from './edit';
import save from './save';
import metadata from './block.json';

/**
 * Every block starts by registering a new block type definition.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */
registerBlockType( metadata.name, {
	/*"icon": "button"*/
	icon : {
		src: (
			<svg width="174" height="49" viewBox="0 0 174 49" fill="none" xmlns="http://www.w3.org/2000/svg">
				<rect width="174" height="48" transform="translate(0 0.5)" fill="#D02E4B"/>
				<path d="M56 24.516C57.008 24.052 57.488 23.316 57.488 22.18C57.488 20.34 56.256 19.3 54.08 19.3H49.312V30.5H54.144C56.496 30.5 57.856 29.3 57.856 27.332C57.856 25.972 57.264 24.9 56 24.516ZM55.664 22.468C55.664 23.38 55.184 23.908 53.872 23.908H51.12V21.028H53.856C55.152 21.028 55.664 21.492 55.664 22.468ZM54.096 28.772H51.12V25.572H54.08C55.552 25.572 56.032 26.164 56.032 27.188C56.032 28.148 55.568 28.772 54.096 28.772ZM67.0436 19.3V25.924C67.0436 28.1 65.9076 28.964 64.3556 28.964C62.8036 28.964 61.6676 28.1 61.6676 25.924V19.3H59.8276V26.036C59.8276 29.156 61.7796 30.692 64.3556 30.692C66.9316 30.692 68.8836 29.156 68.8836 26.036V19.3H67.0436ZM79.2454 19.3H70.6054V21.028H74.0134V30.5H75.8214V21.028H79.2454V19.3ZM89.0579 19.3H80.4179V21.028H83.8259V30.5H85.6339V21.028H89.0579V19.3ZM95.9369 19.108C92.6569 19.108 90.1289 21.604 90.1289 24.9C90.1289 28.196 92.6569 30.692 95.9369 30.692C99.2169 30.692 101.729 28.196 101.745 24.9C101.729 21.604 99.2169 19.108 95.9369 19.108ZM95.9369 20.836C98.1929 20.836 99.9049 22.564 99.9049 24.9C99.9049 27.236 98.1929 28.964 95.9369 28.964C93.6649 28.964 91.9529 27.236 91.9529 24.9C91.9529 22.564 93.6649 20.836 95.9369 20.836ZM111.363 19.3V23.988L111.523 27.94L105.923 19.3H103.795V30.5H105.603V25.812L105.427 21.844L111.027 30.5H113.171V19.3H111.363ZM123.235 19.3L119.699 20.676V22.452L122.243 21.412V30.5H124.051V19.3H123.235Z" fill="white"/>
			</svg>
		),
		background: 'aliceblue',
		foreground: '#ecf9be',
	},
	/**
	 * @see ./edit.js
	 */
	edit: Edit,

	/**
	 * @see ./save.js
	 */
	save,
} );
