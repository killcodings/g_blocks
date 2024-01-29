import {InnerBlocks, RichText, useBlockProps} from "@wordpress/block-editor";

export default function v2({attributes}) {
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
    if (selectVersion === 'v2') {
        className += ' cg-heroscreen-v2';
        componentStyles = {
            'bage-color': bageColor,
            '--bage-bg': bgBage,
            '--cg-title': cgTitleColor
        };
    }

    const blockProps = useBlockProps.save(
        {className, style:componentStyles}
    );

    return (
        <section { ...blockProps }>
            <div className="cg-heroscreen-v2__sect">
                <div className="cg-heroscreen-v2__content">
                    <div className="cg-bage cg-bage-v2">
                        {isBage && (<div className="cg-bage cg-bage-v2">{bageText && <p className="icon-bage">{bageText}</p>}</div>)}
                    </div>
                    <RichText.Content
                        className='cg-heroscreen__title h1-v2'
                        tagName ="h1"
                        value = {texth1}
                    />
                    <InnerBlocks.Content />
                </div>
            </div>
            <div className="cg-heroscreen-v2__pic">
                {/*<img src="images/content/cg-heroscreen-v2.png" alt="player"/>*/}
            </div>
        </section>
    );
}
