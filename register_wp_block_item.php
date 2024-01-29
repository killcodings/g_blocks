<?php
//require_once plugin_dir_path( __FILE__ ) . 'wp-block-item-button/wp-block-item-button.php';
//require_once plugin_dir_path( __FILE__ ) . 'wp-block-item-buttons/wp-block-item-buttons.php';
//require_once plugin_dir_path( __FILE__ ) . 'gutenpride/gutenpride.php';

/*function blocks_course_plugin_boilerplate_enqueue_assets() {
	$asset_file = include(plugin_dir_path( __FILE__ ) . 'build/index.asset.php');
	wp_enqueue_script( 'cg-script', plugins_url('build/index.js', __FILE__), $asset_file['dependencies'], $asset_file['version']);
	wp_enqueue_style( 'blocks-course-plugin-boilerplate-style', plugins_url('build/index.css', __FILE__) );
}*/
//add_action( 'enqueue_block_editor_assets', 'blocks_course_plugin_boilerplate_enqueue_assets' );


function register_wp_block_cg_init() {
	$block_directories = glob(__DIR__ . "/dist/*", GLOB_ONLYDIR);

	foreach ($block_directories as $block) {
		$var = 'cg-bookie-sect-g';
		$pattern = "/" . preg_quote($var, '/') . "/";
		if (preg_match($pattern, $block)) {
			$block_json_path = $block . '/block.json';
			$block_metadata = json_decode(file_get_contents($block_json_path), true);
			$args = array(
				'post_type'   => 'page',
				'post_status' => 'publish',
				'fields'      => 'ids',
				'numberposts' => - 1,
				'meta_key'    => '_wp_page_template',
				'meta_value'  => 'brand-page.php',
			);
			$posts = get_posts($args);
			$pageIds = [];
			foreach ($posts as $post) {
				$pageIds[] = array(
					'label' => get_the_title( $post ),
					'value' => $post,
				);
			}
			$block_metadata['attributes']['pageIds'] = array(
				'type'    => 'array',
				'default' => $pageIds,
			);
			$block_metadata['attributes']['version'] = array(
				'type'    => 'string',
				'default' => VERSION_STYLE,
			);

			register_block_type_from_metadata($block_json_path, array(
				'attributes' => $block_metadata['attributes']
			));

		} else if (file_exists($block . '/block.json')) {
			$block_json_path = $block . '/block.json';
			$block_metadata = json_decode(file_get_contents($block_json_path), true);
			$block_metadata['attributes']['version'] = array(
				'type'    => 'string',
				'default' => VERSION_STYLE,
			);
			register_block_type_from_metadata($block_json_path, array(
				'attributes' => $block_metadata['attributes']
			));
		} else {
			register_block_type( $block );
		}
	}
}

add_action( 'init', 'register_wp_block_cg_init' );


// ADD BLOCK CATEGORIES TO TOP OF INSERTER
function custom_block_category( $categories, $post ) {
	return array_merge(
			array(
					array(
						'slug' => 'cg-blocks',
						'title' => 'CG Blocks',
					),
					array(
						'slug' => 'cg-components',
						'title' => 'CG Components',
					),
					array(
						'slug' => 'cg-blocks-gutenberg',
						'title' => 'Cg blocks gutenberg',
					),
			),
			$categories
	);
}
add_filter( 'block_categories_all', 'custom_block_category', 10, 2);

function blocks_enqueue_assets() {
	wp_enqueue_script('cg-blocks-script', get_template_directory_uri() . '/partials/gutenberg-blocks/dist/blocks.js' );
	wp_enqueue_style('cg-blocks-style', get_template_directory_uri() . '/partials/gutenberg-blocks/dist/blocks.css' );
}
add_action('wp_enqueue_scripts', 'blocks_enqueue_assets');
//add_action('enqueue_block_editor_assets', 'blocks_enqueue_assets');


if ( VERSION_STYLE === 'v1' ) {
	function custom_render_block($render_block) {
		$render_block = str_replace('class="wp-block-cg-text-table-g', 'class="cg-text-table', $render_block);
		return $render_block;
	}
	add_filter('render_block', 'custom_render_block', 10, 2);
}
if ( VERSION_STYLE === 'v2' ) {
	function custom_render_block($render_block) {
		$render_block = str_replace('class="wp-block-cg-text-table-g', 'class="cg-text-table cg-text-table-v2', $render_block);
		return $render_block;
	}
	add_filter('render_block', 'custom_render_block', 10, 2);
}
