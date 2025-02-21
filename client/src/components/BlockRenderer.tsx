import type {
	Block,
	FeaturedArticleProps,
	HeroSectionProps,
	InfoBlockProps,
	SubscribeProps,
} from '@/types';
import { HeroSection } from '@/components/blocks/HeroSection';
import { InfoBlock } from '@/components/blocks/InfoBlock';
import { FeaturedArticle } from './blocks/FeaturedArticle';
import { Subscribe } from './blocks/Subscribe';

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
		default:
			console.warn(`Неизвестный блок: ${block.__component}`);
			return null;
	}
}

export function BlockRenderer({ blocks }: { blocks: Block[] }) {
	return <>{blocks.map(blockRenderer)}</>;
}
