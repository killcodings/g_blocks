<?php

//$postsText = $attributes['postsText'];
//$version = $attributes['version'];
//$innerBlocks = $attributes['innerBlocks'];
//var_dump($attributes['innerBlocks4'][0]["name"]);


//$innerBlocksContent = apply_filters('the_content', $content); // Теперь $innerBlocksContent содержит содержимое InnerBlocks
//var_dump("content", $content);
//echo InnerBlocks::render_block($attributes['innerBlocks']);


?>

<?php
if($version === 'v1' ) {
//	echo $innerBlocksContent;
	get_template_part("partials/gutenberg-blocks/src/blocks/dddd/render/render", "v1");
	global $post;
	$post_id = $post->ID;
	$block_content = render_block( $attributes['innerBlocks4'][0]["name"] );
	echo $block_content;
//	echo InnerBlocks::output_block_content($innerBlocks);

}
if($version === 'v2' ) {
	get_template_part("partials/gutenberg-blocks/src/blocks/dddd/render/render", "v2");
}
?>
