import { BlockRenderer } from '@/components/BlockRenderer';
import { getHomePage } from '@/data/loaders';
import { notFound } from 'next/navigation';

async function loader() {
	const data = await getHomePage();
	if (!data) notFound();
	return { ...data.data };
}

export default async function HomeRoute() {
	const data = await loader();
	const blocks = data?.blocks || [];

	return (
		<div>
			{/* {data.title} */}
			{/* {data.description} */}
			<BlockRenderer blocks={blocks} />
			<div className="container"></div>
		</div>
	);
}
