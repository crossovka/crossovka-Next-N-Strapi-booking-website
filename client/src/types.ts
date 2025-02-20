export type Block = HeroSectionProps | InfoBlockProps;
// | FeaturedArticleProps
// | SubscribeProps
// | HeadingProps
// | ParagraphWithImageProps
// | ParagraphProps
// | FullImageProps;

type ComponentType = 'blocks.hero-section' | 'blocks.info-block';
// | 'blocks.featured-article'
// | 'blocks.subscribe'
// | 'blocks.heading'
// | 'blocks.paragraph-with-image'
// | 'blocks.paragraph'
// | 'blocks.full-image';

interface Base<
	T extends ComponentType,
	D extends object = Record<string, unknown>
> {
	id: number;
	__component?: T;
	documentId?: string;
	createdAt?: string;
	updatedAt?: string;
	publishedAt?: string;
	data?: D;
}

export interface HeroSectionProps extends Base<'blocks.hero-section'> {
	theme: 'turquoise' | 'orange';
	heading: string;
	image: ImageProps;
	cta?: LinkProps;
	logo?: LogoProps;
	author?: string;
	darken?: boolean;
}

export interface InfoBlockProps extends Base<'blocks.info-block'> {
	theme: 'turquoise' | 'orange';
	reversed?: boolean;
	headline: string;
	content: string;
	image: ImageProps;
	cta?: LinkProps;
}

export interface LinkProps {
	id: number;
	text: string;
	href: string;
	isExternal: boolean;
}

export interface ImageProps {
	id: number;
	documentId: string;
	url: string;
	alternativeText: string;
}

export interface LogoProps {
	logoText: string;
	image: ImageProps;
}
