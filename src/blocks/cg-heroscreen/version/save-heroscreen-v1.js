import {InnerBlocks, RichText, useBlockProps} from "@wordpress/block-editor";

export default function v1({attributes}) {
    const {texth1} = attributes; // {texth1: text} = attributes
    const { isBage } = attributes;
    const {bageColor} = attributes;
    const { cgTitleColor } = attributes;
    const {bageText} = attributes;
    const { bgBage } = attributes;
    let { className } = attributes;
    const { selectVersion } = attributes;

    className = `cg-section__content ${className}`;

    let componentStyles = '';
    if (selectVersion === 'v1') {
        className += ' cg-heroscreen-v1';
        componentStyles = {
            '--bage-color': bageColor,
            '--bage-bg': bgBage,
            '--cg-title': cgTitleColor
        };
    }

    const blockProps = useBlockProps.save(
        {className, style:componentStyles}
    );

    return (
        <section { ...blockProps }>
            {isBage && (<div className="cg-bage">{bageText && <p className="icon-bage">{bageText}</p>}</div>)}
            <RichText.Content
                className='cg-heroscreen__title'
                tagName ="h1"
                value = {texth1}
            />
            <InnerBlocks.Content />
        </section>
    );
}
