import { registerBlockType } from '@wordpress/blocks';
import { TextControl, SelectControl } from '@wordpress/components';
import { InnerBlocks } from '@wordpress/block-editor';

registerBlockType('urban/cg-news-sect', {
  title: 'News Section Test',
  icon: 'shield',
  category: 'design',
  attributes: {
    version: {
      type: 'string',
      default: 'v1'
    },
    category: {
      type: 'string',
      default: 'all'
    }
  },
  edit: function(props) {
    const {
      version
    } = props.attributes;

    console.log('fsagrdgsd')

    const updateBlock = () => {
      const globalVersion = urban_object['version'];
      if (globalVersion === 'v1') {
        props.setAttributes({ version: 'v1' });
      } else if (globalVersion === 'v2') {
        props.setAttributes({ version: 'v2' });
      }
    };

    window.addEventListener('urban_object_version_change', updateBlock);

    return (
      <div>
        <TextControl
          label="Version"
          value={version}
          onChange={(value) => setAttributes({ version: value })}
        />
        <SelectControl
          label="Category"
          options={[
            { label: 'All', value: 'all' },
            { label: 'Category 1', value: 'category-1' },
            { label: 'Category 2', value: 'category-2' },
          ]}
        />
        {version === 'v1' ? (
          <div>
            <h2>Version 1 Content</h2>
            <InnerBlocks />
          </div>
        ) : (
          <div>
            <h2>Version 2 Content</h2>
            <InnerBlocks />
          </div>
        )}
      </div>
    );
  },
  save: function() {
    return null;
  }
});
