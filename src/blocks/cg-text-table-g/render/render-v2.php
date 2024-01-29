<?php
[
	'content' => $content
] = $args;

if (!empty($content)) {
	$blocks = parse_blocks($content);
	foreach ($blocks as $block) {
		$render_block = render_block($block);
		echo $render_block;
	}
}
