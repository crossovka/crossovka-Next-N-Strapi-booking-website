import type { Schema, Struct } from '@strapi/strapi';

export interface BlocksFeaturedArticle extends Struct.ComponentSchema {
  collectionName: 'components_blocks_featured_articles';
  info: {
    displayName: 'Featured Article';
  };
  attributes: {
    expert: Schema.Attribute.RichText;
    headline: Schema.Attribute.String;
    image: Schema.Attribute.Media<'images'>;
    link: Schema.Attribute.Component<'elements.link', false>;
  };
}

export interface BlocksHeroSection extends Struct.ComponentSchema {
  collectionName: 'components_blocks_hero_sections';
  info: {
    description: '';
    displayName: 'Hero Section';
  };
  attributes: {
    cta: Schema.Attribute.Component<'elements.link', false>;
    heading: Schema.Attribute.String;
    image: Schema.Attribute.Media<'images' | 'files'>;
    logo: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    theme: Schema.Attribute.Enumeration<['turquoise', 'orange']>;
  };
}

export interface BlocksInfoBlock extends Struct.ComponentSchema {
  collectionName: 'components_blocks_info_blocks';
  info: {
    description: '';
    displayName: 'info Block';
  };
  attributes: {
    content: Schema.Attribute.RichText;
    cta: Schema.Attribute.Component<'elements.link', false>;
    headline: Schema.Attribute.String;
    image: Schema.Attribute.Media<'images'>;
    reversed: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    theme: Schema.Attribute.Enumeration<['turquoise', 'orange']>;
  };
}

export interface BlocksSubscribe extends Struct.ComponentSchema {
  collectionName: 'components_blocks_subscribes';
  info: {
    displayName: 'Subscribe';
  };
  attributes: {
    buttonText: Schema.Attribute.String;
    content: Schema.Attribute.Text;
    headline: Schema.Attribute.String;
    placeholder: Schema.Attribute.String;
  };
}

export interface ElementsLink extends Struct.ComponentSchema {
  collectionName: 'components_elements_links';
  info: {
    description: '';
    displayName: 'Link';
    icon: 'underline';
  };
  attributes: {
    href: Schema.Attribute.String;
    isExternal: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    text: Schema.Attribute.String;
  };
}

export interface ElementsLogo extends Struct.ComponentSchema {
  collectionName: 'components_elements_logos';
  info: {
    description: '';
    displayName: 'logo';
    icon: 'cast';
  };
  attributes: {
    image: Schema.Attribute.Media<'images'>;
    logoText: Schema.Attribute.String;
  };
}

export interface LayoutFooter extends Struct.ComponentSchema {
  collectionName: 'components_layout_footers';
  info: {
    displayName: 'Footer';
  };
  attributes: {
    copy: Schema.Attribute.String;
    logo: Schema.Attribute.Media<'images'>;
    navigation: Schema.Attribute.Component<'elements.link', true>;
    policies: Schema.Attribute.Component<'elements.link', true>;
  };
}

export interface LayoutHeader extends Struct.ComponentSchema {
  collectionName: 'components_layout_headers';
  info: {
    description: '';
    displayName: 'Header';
  };
  attributes: {
    cta: Schema.Attribute.Component<'elements.link', false>;
    logo: Schema.Attribute.Media<'images'>;
    navigation: Schema.Attribute.Component<'elements.link', true>;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'blocks.featured-article': BlocksFeaturedArticle;
      'blocks.hero-section': BlocksHeroSection;
      'blocks.info-block': BlocksInfoBlock;
      'blocks.subscribe': BlocksSubscribe;
      'elements.link': ElementsLink;
      'elements.logo': ElementsLogo;
      'layout.footer': LayoutFooter;
      'layout.header': LayoutHeader;
    }
  }
}
