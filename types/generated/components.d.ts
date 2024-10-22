import type { Struct, Schema } from '@strapi/strapi';

export interface ConfigurationCategory extends Struct.ComponentSchema {
  collectionName: 'components_configuration_categories';
  info: {
    displayName: 'category';
    icon: 'code';
  };
  attributes: {
    title: Schema.Attribute.String;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'configuration.category': ConfigurationCategory;
    }
  }
}
