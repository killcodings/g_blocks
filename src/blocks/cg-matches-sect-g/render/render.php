<?php
$version = 'v1';

//$apps_links = app_get_page_by_template( 'app-page.php' );
//var_dump("apps_links", $apps_links);
//$review_links = app_get_page_by_template( 'review-page.php' );
//var_dump("review_links", $review_links);

//echo "<pre>";
//var_dump( " attributes ", $attributes );
//echo "</pre>";

[
    'title'           => $title,
    'description'     => $description,
    'linkTitle'       => $linkTitle,
    'selectedPageIds' => $selectedPageIds,
    'styleDefault'    => $styleDefault,
    'styleOptions'    => $styleOptions,
    'version'         => $version
] = $attributes;

//echo "<pre>";
//var_dump( " styleOptions ", $styleOptions );
//echo "</pre>";


$partner_link_title = $linkTitle ?: 'Download';
if ($selectedPageIds) {
    foreach ($selectedPageIds as $index => $brand_page_id) {
        if (get_field('brand_setup', $brand_page_id)) {
            $brand_setup                            = get_field('brand_setup', $brand_page_id);
            $table_item['icon']                     = $brand_setup['icon'] ?: '';
            $table_item['name']                     = $brand_setup['name'];
            $table_item['cons']                     = $brand_setup['cons'];
            $table_item['brands-bonus-title']       = $brand_setup['brands-bonus-title'];
            $table_item['bonus']                    = $brand_setup['bonus'];
            $table_item['brands-bonus-description'] = $brand_setup['brands-bonus-description'];

            $table_item['page_link']                = get_permalink($brand_page_id);
            $table_item['rating']                   = $brand_setup['rating'];

            $table_item['is_button_icon']           = 'icon-arrow';
            $table_item['pageIdBookie']             = $brand_page_id;

            if ($brand_setup['choose_link'] === 'input_link') {
                $button_url = $brand_setup['input_link'];
            } else {
                $button_url = $brand_setup['brand_setup_choose_link'];
            }
            $button                     = app_get_button(
                ['url' => $button_url, 'title' => $partner_link_title],
                'cg-bookie__button',
                $brand_setup['link_relations'],
                $custom_colors = null,
                $icon_left = false,
                $icon_right = $table_item['is_button_icon']
            );
            $table_item['partner_link'] = $button;
            $table_item['counter']      = $index + 1;
            $table_arr[]                = $table_item;
        }
    }
}


function style_array_filter($styleOptions)
{
    $style_array = [
        'bookieBg'                   => $styleOptions['bookieBg'] ? "--bookie-bg:{$styleOptions['bookieBg']}" : '',
        'bageBg'                     => $styleOptions['bageBg'] ? "--bage-bg:{$styleOptions['bageBg']}" : '',
        'bageColor'                  => $styleOptions['bageColor'] ? "--bage-color:{$styleOptions['bageColor']}" : '',
        'iconOkBg'                   => $styleOptions['iconOkBg'] ? "--icon-ok-bg:{$styleOptions['iconOkBg']}" : '',
        'iconOkColor'                => $styleOptions['iconOkColor'] ? "--icon-ok-color:{$styleOptions['iconOkColor']}" : '',
        'bookieLogoPicBg'            => $styleOptions['bookieLogoPicBg'] ? "--bookie-logo-pic-bg:{$styleOptions['bookieLogoPicBg']}" : '',
        'bookieLogoNameColor'        => $styleOptions['bookieLogoNameColor'] ? "--bookie-logo-name-color:{$styleOptions['bookieLogoNameColor']}" : '',
        'bookieHighlightsTitleColor' => $styleOptions['bookieHighlightsTitleColor'] ? "--bookie-highlights-title-color:{$styleOptions['bookieHighlightsTitleColor']}" : '',
        'bookieHighlightsListColor'  => $styleOptions['bookieHighlightsListColor'] ? "--bookie-highlights-list-color:{$styleOptions['bookieHighlightsListColor']}" : '',
        'bookieCardBorderColor'      => $styleOptions['bookieCardBorderColor'] ? "--bookie-card-border-color:{$styleOptions['bookieCardBorderColor']}" : '',
        'bookieBonusTitleColor'      => $styleOptions['bookieBonusTitleColor'] ? "--bookie-bonus-title-color:{$styleOptions['bookieBonusTitleColor']}" : '',
        'bookieBonusNumbBg'      => $styleOptions['bookieBonusNumbBg'] ? "--bookie-bonus-numb-bg:{$styleOptions['bookieBonusTitleColor']}" : '',
        'bookieBonusPriceColor'      => $styleOptions['bookieBonusPriceColor'] ? "--bookie-bonus-price-color:{$styleOptions['bookieBonusPriceColor']}" : '',
        'bookieBonusInfoColor'       => $styleOptions['bookieBonusInfoColor'] ? "--bookie-bonus-info-color:{$styleOptions['bookieBonusInfoColor']}" : '',
        'bookieRatingNumbColor'      => $styleOptions['bookieRatingNumbColor'] ? "--bookie-rating-numb-color:{$styleOptions['bookieRatingNumbColor']}" : '',
        'bookieRatingButnColor'      => $styleOptions['bookieRatingButnColor'] ? "--bookie-rating-butn-color:{$styleOptions['bookieRatingButnColor']}" : '',
        'bookieBtnBorderBottom'      => $styleOptions['bookieBtnBorderBottom'] ? "--bookie-btn-border-bottom:{$styleOptions['bookieBtnBorderBottom']}" : '',
    ];

    $style_array = app_array_filter_recursive($style_array);
    $style_str   = implode(';', $style_array);

    if ($style_str) {
        $style_str = "style='$style_str'";
    }

    return $style_str;
}

?>

<?php
if (VERSION_STYLE === 'v1') : ?>

    <section class="cg-bookie-sect cg-bookie-sect-v1 cg-section__content">
        <h2><?= $title ?> </h2>
        <div class="cg-description" style="--text-align:center; --max-width: 754px;">
            <p><?= $description ?></p>
        </div>
        <div class="cg-bookie-sect__cards">
            <?php foreach ($table_arr as $key => $item) :
                if (!$styleOptions[$key]['pageId']) {
                    $style_str = style_array_filter($styleOptions[0]);
                } else {
                    $filteredArray = array_filter($styleOptions, function ($element) use ($item) {
                        if ($element['pageId'] === $item['pageIdBookie']) {
                            return isset($element['pageId']);
                        }
                    });
                    $style_str = style_array_filter(array_values($filteredArray)[0]);
//                    var_dump($item['pageIdBookie']);
                }
            ?>
                <div class="cg-bookie-container" <?= $style_str ?>>
                    <div class="cg-bookie">
                        <div class="cg-bookie__logo-block">
                            <div class="cg-bookie-logo">
                                <?= app_get_image(['id' => $item['icon'], 'classes' => 'cg-bookie-logo__pic']) ?>
                                <p class="cg-bookie-logo__name"><?= $item['name'] ?></p>
                            </div>
                            <div class="cg-bookie-highlights">
                                <p class="cg-bookie-highlights__title"><?= $item['name'] ?> Highlights</p>
                                <?php if ($item['cons']) : ?>
                                    <ul class="cg-bookie-highlights__list">
                                        <?php foreach ($item['cons'] as $con) : ?>
                                            <li class="cg-bookie-highlights__list-item icon-ok">
                                                <?= $con['item'] ?>
                                            </li>
                                        <?php endforeach; ?>
                                    </ul>
                                <?php endif; ?>
                            </div>
                        </div>
                        <div class="cg-bookie-bonus cg-bookie__bonus-block">
                            <?php if ($item['brands-bonus-title']) : ?>
                                <p class="cg-bookie-bonus__title"><?= $item['brands-bonus-title'] ?></p>
                            <?php endif; ?>

                            <?php if ($item['bonus']) : ?>
                                <div class="cg-bookie-bonus__numb">
                                    <div class="cg-bookie-bonus__numb-icon">
                                        <img src="./images/content/cg-bookie-gift-white.svg" alt="bonus-icon">
                                    </div>
                                    <p><?= $item['bonus'] ?></p>
                                </div>
                            <?php endif; ?>

                            <?php if ($item['brands-bonus-description']) : ?>
                                <div class="cg-bookie-bonus__info">
                                    <p><?= $item['brands-bonus-description'] ?></p>
                                </div>
                            <?php endif; ?>
                        </div>
                        <div class="cg-bookie-rating cg-bookie__rating-block">
                            <div class="cg-bookie-rating__stars">
                                <p class="cg-bookie-rating__stars-numb"><?= $item['rating'] ?></p>
                                <span class="cg-stars-container" style="--rating: <?= $item['rating'] * 20 . '%' ?>">
                                    <i class="icon-cg-bookie-star icon-star"></i>
                                    <i class="icon-cg-bookie-star icon-star"></i>
                                    <i class="icon-cg-bookie-star icon-star"></i>
                                    <i class="icon-cg-bookie-star icon-star"></i>
                                    <i class="icon-cg-bookie-star icon-star"></i>
                                </span>
                            </div>
                            <?php if ($item['page_link']) { ?>
                                <a href="<?= $item['page_link'] ?>" class="cg-bookie-rating__stars-butn">Read review</a>
                            <?php } ?>
                        </div>
                        <?php
                        if ($item['partner_link']) : ?>
                            <?= $item['partner_link'] ?>
                        <?php endif; ?>
                    </div>
                    <div class="cg-bage">
                        <p class="icon-bage"><?= $item['counter'] ?></p>
                    </div>
                </div>
            <?php endforeach; ?>
        </div>
    </section>


    <section class="cg-bookie-sect cg-bookie-sect-v1 cg-section__content" style="">
        <h2>Best Cricket Bookie in India</h2>
        <div class="cg-description" style="--text-align:center; --max-width: 754px;">
            <p>Cricketbettingguru.com has picked the best cricket bookie for 2022:</p>
        </div>
        <div class="cg-bookie-sect__cards">
            <div class="cg-bookie-container">
                <div class="cg-bookie" style="background: #681524;">
                    <div class="cg-bookie__logo-block" style="--color:#893645">
                        <div class="cg-bookie-logo">
                            <div class="cg-bookie-logo__pic" style="background: #0F7B5B;">
                                <img src="./images/content/cg-bet365.svg" alt="logo">
                            </div>
                            <p class="cg-bookie-logo__name" style="--color:#FDEEF1;">Bet365</p>
                        </div>
                        <div class="cg-bookie-highlights">
                            <p class="cg-bookie-highlights__title" style="--color:#FDEEF1;">Bet365 Highlights
                            </p>
                            <ul class="cg-bookie-highlights__list" style="--color:#FDEEF1; --icon-ok-bg: #F7A2B133;">
                                <li class="cg-bookie-highlights__list-item icon-ok">
                                    Instant withdrawal
                                </li>
                                <li class="cg-bookie-highlights__list-item icon-ok">
                                    Best Android & iOS App
                                </li>
                                <li class="cg-bookie-highlights__list-item icon-ok">
                                    Best Android & iOS App
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="cg-bookie-bonus cg-bookie__bonus-block" style="--color:#893645">
                        <p class="cg-bookie-bonus__title" style="--color:#FDEEF1;">Welcome bonus 150% up to</p>
                        <div class="cg-bookie-bonus__numb">
                            <div class="cg-bookie-bonus__numb-icon" style="background: #893645;">
                                <img src="./images/content/cg-bookie-gift-white.svg" alt="bonus-icon">
                            </div>
                            <p style="--color:#FDEEF1;">₹30,000</p>
                        </div>
                        <div class="cg-bookie-bonus__info">
                            <p style="--color:#FDEEF1;">New players at Parimatch can get a bonus on their first
                                deposit
                                150% up to
                                ₹30,000.</p>
                        </div>
                    </div>
                    <div class="cg-bookie-rating cg-bookie__rating-block" style="--color:#893645">
                        <div class="cg-bookie-rating__stars">
                            <p class="cg-bookie-rating__stars-numb" style="--color:#FDEEF1;">5.0</p>
                            <span class="cg-stars-container" style="--rating: 90%">
                                <i class="icon-cg-bookie-star icon-star"></i>
                                <i class="icon-cg-bookie-star icon-star"></i>
                                <i class="icon-cg-bookie-star icon-star"></i>
                                <i class="icon-cg-bookie-star icon-star"></i>
                                <i class="icon-cg-bookie-star icon-star"></i>
                            </span>
                        </div>
                        <a href="#" class="cg-bookie-rating__stars-butn" style="--color:#FDEEF1;">Read
                            review</a>
                    </div>
                    <a href="#" class="cg-button cg-bookie__button" style="--bg: #FFF; --color: #D02E4B; --bg-hover: #F7F7F7;">
                        <span class="cg-button__text icon-arrow">Visit
                            Parimatch
                            Website
                        </span>
                    </a>
                </div>
                <div class="cg-bage" style="--color: #FFF;">
                    <p class="icon-bage">1</p>
                </div>
            </div>
            <div class="cg-bookie-container">
                <div class="cg-bookie" style="background: #F7F7F7;">
                    <div class="cg-bookie__logo-block" style="--color:#EAECF0">
                        <div class="cg-bookie-logo">
                            <div class="cg-bookie-logo__pic" style="background: #171717;">
                                <img src="./images/content/cg-parimatch.svg" alt="logo">
                            </div>
                            <p class="cg-bookie-logo__name" style="--color:#000;">Parimatch</p>
                        </div>
                        <div class="cg-bookie-highlights">
                            <p class="cg-bookie-highlights__title" style="--color:#000;">Parimatch Highlights
                            </p>
                            <ul class="cg-bookie-highlights__list" style="--color:#000; --icon-ok-bg: #F7A2B133; --icon-ok-color: #D02E4B;">
                                <li class="cg-bookie-highlights__list-item icon-ok">
                                    Instant withdrawal
                                </li>
                                <li class="cg-bookie-highlights__list-item icon-ok">
                                    Best Android & iOS App
                                </li>
                                <li class="cg-bookie-highlights__list-item icon-ok">
                                    Best Android & iOS App
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="cg-bookie-bonus cg-bookie__bonus-block" style="--color:#EAECF0">
                        <p class="cg-bookie-bonus__title" style="--color:#000;">Welcome bonus 150% up to</p>
                        <div class="cg-bookie-bonus__numb">
                            <div class="cg-bookie-bonus__numb-icon" style="background: #F6D5DB;">
                                <img src="./images/content/cg-bookie-gift-red.svg" alt="bonus-icon">
                            </div>
                            <p style="--color:#000;">₹30,000</p>
                        </div>
                        <div class="cg-bookie-bonus__info">
                            <p style="--color:#909090;">New players at Parimatch can get a bonus on their first
                                deposit
                                150% up to
                                ₹30,000.</p>
                        </div>
                    </div>
                    <div class="cg-bookie-rating cg-bookie__rating-block" style="--color:#EAECF0">
                        <div class="cg-bookie-rating__stars">
                            <p class="cg-bookie-rating__stars-numb" style="--color:#000;">5.0</p>
                            <span class="cg-stars-container" style="--rating: 90%">
                                <i class="icon-cg-bookie-star icon-star"></i>
                                <i class="icon-cg-bookie-star icon-star"></i>
                                <i class="icon-cg-bookie-star icon-star"></i>
                                <i class="icon-cg-bookie-star icon-star"></i>
                                <i class="icon-cg-bookie-star icon-star"></i>
                            </span>
                        </div>
                        <a href="#" class="cg-bookie-rating__stars-butn" style="--color:#475467;">Read
                            review</a>
                    </div>
                    <a href="#" class="cg-button cg-bookie__button" style="--bg: #D02E4B; --color: #FFF; --bg-hover: #B42318;">
                        <span class="cg-button__text icon-arrow">Visit
                            Parimatch
                            Website
                        </span>
                    </a>
                </div>
                <div class="cg-bage" style="--color: #FFF;">
                    <p class="icon-bage">1</p>
                </div>
            </div>
            <div class="cg-bookie-container">
                <div class="cg-bookie" style="background: #F7F7F7;">
                    <div class="cg-bookie__logo-block" style="--color:#EAECF0">
                        <div class="cg-bookie-logo">
                            <div class="cg-bookie-logo__pic" style="background: #171717;">
                                <img src="./images/content/cg-parimatch.svg" alt="logo">
                            </div>
                            <p class="cg-bookie-logo__name" style="--color:#000;">Parimatch</p>
                        </div>
                        <div class="cg-bookie-highlights">
                            <p class="cg-bookie-highlights__title" style="--color:#000;">Parimatch Highlights
                            </p>
                            <ul class="cg-bookie-highlights__list" style="--color:#000; --icon-ok-bg: #F7A2B133; --icon-ok-color: #D02E4B;">
                                <li class="cg-bookie-highlights__list-item icon-ok">
                                    Instant withdrawal
                                </li>
                                <li class="cg-bookie-highlights__list-item icon-ok">
                                    Best Android & iOS App
                                </li>
                                <li class="cg-bookie-highlights__list-item icon-ok">
                                    Best Android & iOS App
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="cg-bookie-bonus cg-bookie__bonus-block" style="--color:#EAECF0">
                        <p class="cg-bookie-bonus__title" style="--color:#000;">Welcome bonus 150% up to</p>
                        <div class="cg-bookie-bonus__numb">
                            <div class="cg-bookie-bonus__numb-icon" style="background: #F6D5DB;">
                                <img src="./images/content/cg-bookie-gift-red.svg" alt="bonus-icon">
                            </div>
                            <p style="--color:#000;">₹30,000</p>
                        </div>
                        <div class="cg-bookie-bonus__info">
                            <p style="--color:#909090;">New players at Parimatch can get a bonus on their first
                                deposit
                                150% up to
                                ₹30,000.</p>
                        </div>
                    </div>
                    <div class="cg-bookie-rating cg-bookie__rating-block" style="--color:#EAECF0">
                        <div class="cg-bookie-rating__stars">
                            <p class="cg-bookie-rating__stars-numb" style="--color:#000;">5.0</p>
                            <span class="cg-stars-container" style="--rating: 90%">
                                <i class="icon-cg-bookie-star icon-star"></i>
                                <i class="icon-cg-bookie-star icon-star"></i>
                                <i class="icon-cg-bookie-star icon-star"></i>
                                <i class="icon-cg-bookie-star icon-star"></i>
                                <i class="icon-cg-bookie-star icon-star"></i>
                            </span>
                        </div>
                        <a href="#" class="cg-bookie-rating__stars-butn" style="--color:#475467;">Read
                            review</a>
                    </div>
                    <a href="#" class="cg-button cg-bookie__button" style="--bg: #D02E4B; --color: #FFF; --bg-hover: #B42318;">
                        <span class="cg-button__text icon-arrow">Visit Parimatch Website</span>
                    </a>
                </div>
                <div class="cg-bage" style="--color: #FFF;">
                    <p class="icon-bage">1</p>
                </div>
            </div>
            <div class="cg-bookie-container">
                <div class="cg-bookie" style="background: #F7F7F7;">
                    <div class="cg-bookie__logo-block" style="--color:#EAECF0">
                        <div class="cg-bookie-logo">
                            <div class="cg-bookie-logo__pic" style="background: #171717;">
                                <img src="./images/content/cg-parimatch.svg" alt="logo">
                            </div>
                            <p class="cg-bookie-logo__name" style="--color:#000;">Parimatch</p>
                        </div>
                        <div class="cg-bookie-highlights">
                            <p class="cg-bookie-highlights__title" style="--color:#000;">Parimatch Highlights
                            </p>
                            <ul class="cg-bookie-highlights__list" style="--color:#000; --icon-ok-bg: #F7A2B133; --icon-ok-color: #D02E4B;">
                                <li class="cg-bookie-highlights__list-item icon-ok">
                                    Instant withdrawal
                                </li>
                                <li class="cg-bookie-highlights__list-item icon-ok">
                                    Best Android & iOS App
                                </li>
                                <li class="cg-bookie-highlights__list-item icon-ok">
                                    Best Android & iOS App
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="cg-bookie-bonus cg-bookie__bonus-block" style="--color:#EAECF0">
                        <p class="cg-bookie-bonus__title" style="--color:#000;">Welcome bonus 150% up to</p>
                        <div class="cg-bookie-bonus__numb">
                            <div class="cg-bookie-bonus__numb-icon" style="background: #F6D5DB;">
                                <img src="./images/content/cg-bookie-gift-red.svg" alt="bonus-icon">
                            </div>
                            <p style="--color:#000;">₹30,000</p>
                        </div>
                        <div class="cg-bookie-bonus__info">
                            <p style="--color:#909090;">New players at Parimatch can get a bonus on their first deposit 150% up to ₹30,000.</p>
                        </div>
                    </div>
                    <div class="cg-bookie-rating cg-bookie__rating-block" style="--color:#EAECF0">
                        <div class="cg-bookie-rating__stars">
                            <p class="cg-bookie-rating__stars-numb" style="--color:#000;">5.0</p>
                            <span class="cg-stars-container" style="--rating: 90%">
                                <i class="icon-cg-bookie-star icon-star"></i>
                                <i class="icon-cg-bookie-star icon-star"></i>
                                <i class="icon-cg-bookie-star icon-star"></i>
                                <i class="icon-cg-bookie-star icon-star"></i>
                                <i class="icon-cg-bookie-star icon-star"></i>
                            </span>
                        </div>
                        <a href="#" class="cg-bookie-rating__stars-butn" style="--color:#475467;">Read
                            review</a>
                    </div>
                    <a href="#" class="cg-button cg-bookie__button" style="--bg: #D02E4B; --color: #FFF; --bg-hover: #B42318;">
                        <span class="cg-button__text icon-arrow">Visit
                            Parimatch
                            Website
                        </span>
                    </a>
                </div>
                <div class="cg-bage" style="--color: #FFF;">
                    <p class="icon-bage">1</p>
                </div>
            </div>
            <div class="cg-bookie-container">
                <div class="cg-bookie" style="background: #F7F7F7;">
                    <div class="cg-bookie__logo-block" style="--color:#EAECF0">
                        <div class="cg-bookie-logo">
                            <div class="cg-bookie-logo__pic" style="background: #171717;">
                                <img src="./images/content/cg-parimatch.svg" alt="logo">
                            </div>
                            <p class="cg-bookie-logo__name" style="--color:#000;">Parimatch</p>
                        </div>
                        <div class="cg-bookie-highlights">
                            <p class="cg-bookie-highlights__title" style="--color:#000;">Parimatch Highlights
                            </p>
                            <ul class="cg-bookie-highlights__list" style="--color:#000; --icon-ok-bg: #F7A2B133; --icon-ok-color: #D02E4B;">
                                <li class="cg-bookie-highlights__list-item icon-ok">
                                    Instant withdrawal
                                </li>
                                <li class="cg-bookie-highlights__list-item icon-ok">
                                    Best Android & iOS App
                                </li>
                                <li class="cg-bookie-highlights__list-item icon-ok">
                                    Best Android & iOS App
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="cg-bookie-bonus cg-bookie__bonus-block" style="--color:#EAECF0">
                        <p class="cg-bookie-bonus__title" style="--color:#000;">Welcome bonus 150% up to</p>
                        <div class="cg-bookie-bonus__numb">
                            <div class="cg-bookie-bonus__numb-icon" style="background: #F6D5DB;">
                                <img src="./images/content/cg-bookie-gift-red.svg" alt="bonus-icon">
                            </div>
                            <p style="--color:#000;">₹30,000</p>
                        </div>
                        <div class="cg-bookie-bonus__info">
                            <p style="--color:#909090;">New players at Parimatch can get a bonus on their first
                                deposit
                                150% up to
                                ₹30,000.</p>
                        </div>
                    </div>
                    <div class="cg-bookie-rating cg-bookie__rating-block" style="--color:#EAECF0">
                        <div class="cg-bookie-rating__stars">
                            <p class="cg-bookie-rating__stars-numb" style="--color:#000;">5.0</p>
                            <span class="cg-stars-container" style="--rating: 90%">
                                <i class="icon-cg-bookie-star icon-star"></i>
                                <i class="icon-cg-bookie-star icon-star"></i>
                                <i class="icon-cg-bookie-star icon-star"></i>
                                <i class="icon-cg-bookie-star icon-star"></i>
                                <i class="icon-cg-bookie-star icon-star"></i>
                            </span>
                        </div>
                        <a href="#" class="cg-bookie-rating__stars-butn" style="--color:#475467;">Read
                            review</a>
                    </div>
                    <a href="#" class="cg-button cg-bookie__button" style="--bg: #D02E4B; --color: #FFF; --bg-hover: #B42318;">
                        <span class="cg-button__text icon-arrow">Visit
                            Parimatch
                            Website
                        </span>
                    </a>
                </div>
                <div class="cg-bage" style="--color: #FFF;">
                    <p class="icon-bage">1</p>
                </div>
            </div>
            <div class="cg-bookie-container">
                <div class="cg-bookie" style="background: #F7F7F7;">
                    <div class="cg-bookie__logo-block" style="--color:#EAECF0">
                        <div class="cg-bookie-logo">
                            <div class="cg-bookie-logo__pic" style="background: #171717;">
                                <img src="./images/content/cg-parimatch.svg" alt="logo">
                            </div>
                            <p class="cg-bookie-logo__name" style="--color:#000;">Parimatch</p>
                        </div>
                        <div class="cg-bookie-highlights">
                            <p class="cg-bookie-highlights__title" style="--color:#000;">Parimatch Highlights
                            </p>
                            <ul class="cg-bookie-highlights__list" style="--color:#000; --icon-ok-bg: #F7A2B133; --icon-ok-color: #D02E4B;">
                                <li class="cg-bookie-highlights__list-item icon-ok">
                                    Instant withdrawal
                                </li>
                                <li class="cg-bookie-highlights__list-item icon-ok">
                                    Best Android & iOS App
                                </li>
                                <li class="cg-bookie-highlights__list-item icon-ok">
                                    Best Android & iOS App
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="cg-bookie-bonus cg-bookie__bonus-block" style="--color:#EAECF0">
                        <p class="cg-bookie-bonus__title" style="--color:#000;">Welcome bonus 150% up to</p>
                        <div class="cg-bookie-bonus__numb">
                            <div class="cg-bookie-bonus__numb-icon" style="background: #F6D5DB;">
                                <img src="./images/content/cg-bookie-gift-red.svg" alt="bonus-icon">
                            </div>
                            <p style="--color:#000;">₹30,000</p>
                        </div>
                        <div class="cg-bookie-bonus__info">
                            <p style="--color:#909090;">New players at Parimatch can get a bonus on their first
                                deposit
                                150% up to
                                ₹30,000.</p>
                        </div>
                    </div>
                    <div class="cg-bookie-rating cg-bookie__rating-block" style="--color:#EAECF0">
                        <div class="cg-bookie-rating__stars">
                            <p class="cg-bookie-rating__stars-numb" style="--color:#000;">5.0</p>
                            <span class="cg-stars-container" style="--rating: 90%">
                                <i class="icon-cg-bookie-star icon-star"></i>
                                <i class="icon-cg-bookie-star icon-star"></i>
                                <i class="icon-cg-bookie-star icon-star"></i>
                                <i class="icon-cg-bookie-star icon-star"></i>
                                <i class="icon-cg-bookie-star icon-star"></i>
                            </span>
                        </div>
                        <a href="#" class="cg-bookie-rating__stars-butn" style="--color:#475467;">Read
                            review</a>
                    </div>
                    <a href="#" class="cg-button cg-bookie__button" style="--bg: #D02E4B; --color: #FFF; --bg-hover: #B42318;">
                        <span class="cg-button__text icon-arrow">Visit
                            Parimatch
                            Website
                        </span>
                    </a>
                </div>
                <div class="cg-bage" style="--color: #FFF;">
                    <p class="icon-bage">1</p>
                </div>
            </div>
        </div>
    </section>


<?php endif;
if (VERSION_STYLE === 'v2') {
    echo "<h2>Hello version 2</h2>";
}
?>
