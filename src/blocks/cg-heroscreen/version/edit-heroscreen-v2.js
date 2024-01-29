import {InnerBlocks, InspectorControls, MediaPlaceholder, RichText, useBlockProps} from "@wordpress/block-editor";
import {ColorPicker, PanelBody, TextControl, ToggleControl} from "@wordpress/components";

export default function v2({attributes, setAttributes}) {
    const { isBage } = attributes;
    const { isButton } = attributes;// {text: text} = attributes
    const { texth1 } = attributes;
    const { bageText } = attributes;
    const { bageColor } = attributes;
    const { cgTitleColor } = attributes;
    const { bgBage } = attributes;
    let { className } = attributes;
    const { selectVersion } = attributes;
    const { heroBgV2Card } = attributes;


    const TEMPLATE = [
        [ 'cg/cg-description', { placeholder: 'cg-description' } ]
    ];

    { isButton && TEMPLATE.push([ 'cg/cg-block-buttons-gutenberg' ]) }
    const onChangeSelectVersion = (() => {
        setAttributes({ selectVersion: urban_object['version'] });
    })();

    const toggleControlButtons = () => {
        setAttributes({ isButton : !isButton });
    }

    const toggleControlBage = () => {
        setAttributes({ isBage : !isBage });
    }

    const onChangeBage = (val) => {
        setAttributes({bageText: val})
    }
    className = `cg-section__content ${className}`;
    let componentStyles = {};
    if (selectVersion === 'v2') {
        className += ' cg-heroscreen-v2';
        componentStyles = {
            '--bage-color': bageColor,
            '--bage-bg': bgBage,
            '--cg-title': cgTitleColor,
            '--heroscreen-v2--content': heroBgV2Card
        };
    }

    const blockProps = useBlockProps({className, style:componentStyles});

    return (
        <>
            <InspectorControls>
                <PanelBody
                    title='Color'
                    initialOpen={ false }
                >
                    <ColorPicker
                        color={ bageColor }
                        onChange={
                            (value)=> setAttributes({bageColor: value})
                        }
                        enableAlpha
                    />
                </PanelBody>
                <PanelBody
                    title='Background bage'
                    initialOpen={ false }
                >
                    <ColorPicker
                        color={ bgBage }
                        onChange={
                            (value)=> setAttributes({bgBage: value})
                        }
                        enableAlpha
                    />
                </PanelBody>
                <PanelBody
                    title='Color title'
                    initialOpen={ false }
                >
                    <ColorPicker
                        color={ cgTitleColor }
                        onChange={
                            (value)=> setAttributes({cgTitleColor: value})
                        }
                        enableAlpha
                    />
                </PanelBody>
                <PanelBody
                    title='Background card v2'
                    initialOpen={ false }
                >
                    <ColorPicker
                        color={ heroBgV2Card }
                        onChange={
                            (value)=> setAttributes({heroBgV2Card: value})
                        }
                        enableAlpha
                    />
                </PanelBody>
                <PanelBody>
                    <ToggleControl
                        label="Toggle bage"
                        checked={isBage}
                        onChange={toggleControlBage}
                    />
                    <ToggleControl
                        label="Toggle button"
                        checked={isButton}
                        onChange={toggleControlButtons}
                    />
                    <TextControl
                        label="Select version"
                        value={selectVersion }
                        onChange={onChangeSelectVersion}
                        readOnly
                    />
                </PanelBody>
            </InspectorControls>

            <section { ...blockProps }>
                <div className="cg-heroscreen-v2__sect">
                    <div className="cg-heroscreen-v2__content">

                        <div className={"cg-bage cg-bage-v2" + (isBage ? ' cg-bage_active' : '')}>
                            <RichText
                                className='icon-bage'
                                onChange={onChangeBage}
                                value={bageText}
                                placeholder={"Text bage"}
                                tagName="p"
                                // allowedFormats={[]}
                            />
                        </div>

                        <RichText
                            className='cg-heroscreen__title h1-v2'
                            onChange={(value)=> setAttributes({texth1: value})}
                            value={texth1}
                            placeholder={"Online..."}
                            tagName="h1"
                            allowedFormats={[]}
                        />
                        <InnerBlocks
                            template={ TEMPLATE }
                            templateLock="all"
                        />

                    </div>
                </div>
                <div className="cg-heroscreen-v2__pic">
                    <MediaPlaceholder
                        allowedTypes={ [ 'image' ] }
                        multiple={ false }
                        labels={ {
                            title: 'Add image',
                        } }
                        disableDropZone="true"
                        onSelect={ ( media ) => updateButtonImg( media )}
                    />
                    {/*<img src="images/content/cg-heroscreen-v2.png" alt="player"/>*/}
                </div>
            </section>
        </>
    );
}
