import { BlockRenderer } from '@/components/BlockRenderer';
import { getPageBySlug } from '@/data/loaders';
import { notFound } from 'next/navigation';

async function loader(slug: string) {
	const { data } = await getPageBySlug(slug); // Деструктурируем объект для получения данных
	if (!data || data.length === 0) {
		notFound(); // Если данных нет или они пусты, показываем 404
	}
	console.log('Loaded data:', data);
	return data[0]; // Возвращаем первый элемент данных
}
interface PageProps {
	params: { slug: string };
}

export default async function DynamicPageRoute({ params }: PageProps) {
	const data = await loader(params.slug);
	const blocks = data?.blocks || []; // Блоки с контентом страницы

	return (
		<div>
			{/* <h1>{data.title}</h1> {/* Заголовок страницы */}
			{/* <p>{data.description}</p> Описание страницы */}
			{/* Рендерим блоки с помощью BlockRenderer */}
			<BlockRenderer blocks={blocks} />
			<div className="container"></div>
		</div>
	);
}

// interface PageProps {
//   params: Promise<{ slug: string }>
// }

// export default async function DynamicPageRoute({ params }: PageProps) {
//   const slug = (await params).slug;

//   return (
//     <div>
//       <h1>Slug: {slug}</h1>
//     </div>
//   );
// }
