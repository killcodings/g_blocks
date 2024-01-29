<?php

['selectVersion' => $selectVersion,
 'className' => $className,
 'bageColor' => $bageColor,
 'cgTitleColor' => $cgTitleColor,
 'bgBage' => $bgBage,
 'isBage' => $isBage,
 'isButton' => $isButton,
 'bageText' => $bageText
    ] = $args;


$bageText = $args['bageText'];
$texth1 = $args['texth1'];

['innerBlocksTemplate' => $innerBlocksTemplate, 'innerBlocksTemplateLock' => $innerBlocksTemplateLock] = $args;

$style_array = [
	'bage-bg' => $bgBage ? "--bage-bg:$bgBage" : '',
	'bage-color' => $bageColor ? "--bage-color:$bageColor" : '',
    'cg-title' => $cgTitleColor ? "--cg-title:$cgTitleColor" : ''
];

$style_array = app_array_filter_recursive($style_array);
$style_str = implode(';', $style_array);

if ($style_str) {
	$style_str = "style='$style_str'";
}

//
$inner_blocks = parse_blocks($content);
//var_dump("parse_blocks", $inner_blocks);
var_dump("get_the_content", get_the_content());

$className .= ' cg-section__content';
?>

<section class="<?= $className ?>" <?= $style_str ?>>

    <?php if ($isBage) { ?>
        <div class="cg-bage">
            <p class="icon-bage"><?php echo esc_html($bageText); ?></p>
        </div>
    <?php } ?>
     <?php if($texth1) { ?>
         <h1 class="cg-heroscreen__title"><?= $texth1 ?></h1>
     <?php } ?>


	<?php
//	echo '<div class="inner-blocks-container">';
//	echo do_blocks($innerBlocksTemplate, true);
//	echo '</div>';
	?>

</section>
