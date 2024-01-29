import {InnerBlocks, InspectorControls, RichText, useBlockProps} from "@wordpress/block-editor";
import {ColorPicker, PanelBody, TextControl, ToggleControl} from "@wordpress/components";
import {useEffect} from "react";

export default function v1({attributes, setAttributes}) {
    const { isBage } = attributes;
    const { isButton } = attributes;// {text: text} = attributes
    const { texth1 } = attributes;
    const { bageText } = attributes;
    const { bageColor } = attributes;
    const { cgTitleColor } = attributes;
    const { bgBage } = attributes;
    let { className } = attributes;
    const { selectVersion } = attributes;
    // const { innerBlocksTemplate, innerBlocksTemplateLock } = attributes;


    const TEMPLATE = [
        [ 'cg/cg-description', { placeholder: 'cg-description' } ]
    ];
    { isButton && TEMPLATE.push([ 'cg/cg-block-buttons-gutenberg' ]) }

    /*useEffect(() => {
        const newTemplate = [...TEMPLATE];
        if (isButton) {
            newTemplate.push([ 'cg/cg-block-buttons-gutenberg' ]);
        }
        setAttributes({ innerBlocksTemplate: newTemplate });
    }, [isButton, setAttributes]); */

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
    if (selectVersion === 'v1') {
        className += ' cg-heroscreen-v1';
        componentStyles = {
            '--bage-color': bageColor,
            '--bage-bg': bgBage,
            '--cg-title': cgTitleColor
        };
    }

    const blockProps = useBlockProps({className, style:componentStyles});

    return (
        <>
            <InspectorControls>
                <PanelBody
                    title='Color bage'
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
                <div className={"cg-bage" + (isBage ? ' cg-bage_active' : '')}>
                    <RichText
                        className="icon-bage"
                        onChange={onChangeBage}
                        value={bageText}
                        placeholder={"Text bage"}
                        tagName="p"
                        // allowedFormats={[]}
                    />
                </div>

                <RichText
                    className='cg-heroscreen__title'
                    onChange={(value)=> setAttributes({texth1: value})}
                    value={texth1}
                    placeholder={"Online..."}
                    tagName="h1"
                    allowedFormats={[]}
                />
                {/*<InnerBlocks template={innerBlocksTemplate} templateLock={innerBlocksTemplateLock}/>*/}
                <InnerBlocks template={ TEMPLATE } templateLock="all"/>
            </section>
        </>
    );
}
