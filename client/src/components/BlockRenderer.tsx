import type {
	Block,
	FeaturedArticleProps,
	HeroSectionProps,
	InfoBlockProps,
	SubscribeProps,
	HeadingProps,
	ParagraphWithImageProps,
	ParagraphProps,
	FullImageProps,
} from '@/types';
import { HeroSection } from '@/components/blocks/HeroSection';
import { InfoBlock } from '@/components/blocks/InfoBlock';
import { FeaturedArticle } from './blocks/FeaturedArticle';
import { Subscribe } from './blocks/Subscribe';
import { Heading } from './blocks/Heading';
import { ParagraphWithImage } from './blocks/ParagraphWithImage';
import { Paragraph } from './blocks/Paragraph';
import { FullImage } from './blocks/FullImage';

function blockRenderer(block: Block, index: number) {
	const uniqueKey = `${block.__component}-${block.id || index}`; // Безопасный ключ

	switch (block.__component) {
		case 'blocks.hero-section':
			return <HeroSection {...(block as HeroSectionProps)} key={uniqueKey} />;
		case 'blocks.info-block':
			return <InfoBlock {...(block as InfoBlockProps)} key={uniqueKey} />;
		case 'blocks.featured-article':
			return (
				<FeaturedArticle {...(block as FeaturedArticleProps)} key={uniqueKey} />
			);
		case 'blocks.subscribe':
			return <Subscribe {...(block as SubscribeProps)} key={uniqueKey} />;
		case 'blocks.heading':
			return <Heading {...(block as HeadingProps)} key={uniqueKey} />;
		case 'blocks.paragraph-with-image':
			return (
				<ParagraphWithImage
					{...(block as ParagraphWithImageProps)}
					key={uniqueKey}
				/>
			);
		case 'blocks.paragraph':
			return <Paragraph {...(block as ParagraphProps)} key={uniqueKey} />;
		case 'blocks.full-image':
			return <FullImage {...(block as FullImageProps)} key={uniqueKey} />;
		default:
			console.warn(`Неизвестный блок: ${block.__component}`);
			return null;
	}
}

export function BlockRenderer({ blocks }: { blocks: Block[] }) {
	return <>{blocks.map(blockRenderer)}</>;
}
