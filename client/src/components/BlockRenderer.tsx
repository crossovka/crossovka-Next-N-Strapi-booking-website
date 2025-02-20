import type { Block, HeroSectionProps, InfoBlockProps } from '@/types';
import { HeroSection } from '@/components/blocks/HeroSection';
import { InfoBlock } from '@/components/blocks/InfoBlock';

// Рендерим блоки в зависимости от их типа (по типу компонента)
function blockRenderer(block: Block, index: number) {
	switch (block.__component) {
		case 'blocks.hero-section':
			return <HeroSection {...(block as HeroSectionProps)} key={block.id} />;
		case 'blocks.info-block':
			return <InfoBlock {...(block as InfoBlockProps)} key={block.id} />;
		default:
			console.warn(`Неизвестный блок: ${block.__component}`);
			return null; // Если тип блока не поддерживается, возвращаем null
	}
}

export function BlockRenderer({ blocks }: { blocks: Block[] }) {
	return <>{blocks.map(blockRenderer)}</>; // Рендерим все блоки
}
