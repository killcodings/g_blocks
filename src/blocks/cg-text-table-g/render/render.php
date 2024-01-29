<?php
//var_dump($attributes);
//$version = $attributes['version'];
//var_dump("block", $block);
// class change custom_render_block() (partials/gutenberg-blocks/register_wp_block_item.php)

$arr = [
	'content' => $content
];

?>

<?php
if(VERSION_STYLE === 'v1' ) {
	get_template_part("partials/gutenberg-blocks/src/blocks/cg-text-table-g/render/render", "v1", $arr);
}
if(VERSION_STYLE === 'v2' ) {
	get_template_part("partials/gutenberg-blocks/src/blocks/cg-text-table-g/render/render", "v2", $arr);
}
?>
