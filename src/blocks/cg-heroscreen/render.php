<?php

echo "<pre>";
var_dump(" render ", $attributes);
echo "</pre>";

?>

<?php if(VERSION_STYLE === 'v1' ) {
	get_template_part("partials/gutenberg-blocks/src/blocks/cg-heroscreen/version/render", "v1", $attributes);
}
if(VERSION_STYLE === 'v2' ) {
	get_template_part("partials/gutenberg-blocks/src/blocks/cg-heroscreen/version/render", "v2", $attributes);
} ?>
