// import qs from 'qs';
// import { fetchAPI } from '@/utils/fetch-api';
// import { getStrapiURL } from '@/utils/get-strapi-url';

// const BASE_URL = getStrapiURL();
// const BLOG_PAGE_SIZE = 3;
// // Формируем правильный запрос с параметрами для заполнения блоков
// const homePageQuery = qs.stringify(
// 	{
// 		populate: {
// 			blocks: {
// 				populate: '*', // Заполнение всех вложенных полей в блоках
// 			},
// 		},
// 	},
// 	{ encode: false } // Отключаем кодирование URL
// );

// export async function getHomePage() {
// 	const path = '/api/home-page';
// 	const url = new URL(path, BASE_URL);
// 	url.search = homePageQuery;

// 	return await fetchAPI(url.href, { method: 'GET' });
// }

import qs from 'qs';
import { fetchAPI } from '@/utils/fetch-api';
import { getStrapiURL } from '@/utils/get-strapi-url';

const BASE_URL = getStrapiURL();
const BLOG_PAGE_SIZE = 3;
// Формируем правильный запрос с параметрами для заполнения блоков
const homePageQuery = qs.stringify(
	{
		populate: {
			blocks: {
				populate: '*', // Заполнение всех вложенных полей в блоках
			},
		},
	},
	{ encode: false } // Отключаем кодирование URL
);

export async function getHomePage() {
	const path = '/api/home-page';
	const url = new URL(path, BASE_URL);
	url.search = homePageQuery;

	try {
		const response = await fetchAPI(url.href, { method: 'GET' });

		// Логирование ответа
		console.log('Home page response:', response);

		return response;
	} catch (error) {
		console.error('Error fetching home page data:', error);
		throw error; // Прокидываем ошибку дальше
	}
}

const pageBySlugQuery = (slug: string) =>
	qs.stringify(
		{
			filters: {
				slug: { $eq: slug },
			},
			populate: {
				blocks: {
					populate: '*', // Загружаем все вложенные поля блоков
				},
			},
		},
		{ encode: false } // Отключаем кодирование URL
	);

export async function getPageBySlug(slug: string) {
	const path = '/api/pages';
	const url = new URL(path, BASE_URL);
	url.search = pageBySlugQuery(slug);

	try {
		const response = await fetchAPI(url.href, { method: 'GET' });

		// ✅ Логирование ответа (удобно для дебага)
		console.log(`[getPageBySlug] Response for slug "${slug}":`, response);

		return response;
	} catch (error) {
		console.error(
			`[getPageBySlug] Error fetching page data for slug "${slug}":`,
			error
		);
		throw error;
	}
}

const globalSettingQuery = qs.stringify(
	{
		populate: {
			blocks: {
				populate: '*', // Заполнение всех вложенных полей в блоках
			},
		},
	},
	{ encode: false } // Отключаем кодирование URL
);

export async function getGlobalSettings() {
	const path = '/api/global';
	const url = new URL(path, BASE_URL);
	url.search = globalSettingQuery;

	try {
		const response = await fetchAPI(url.href, { method: 'GET' });
		console.log('getGlobalSettings Response:', response);
		return response;
	} catch (error) {
		console.error('API Fetch Error:', error);
		throw new Error('Failed to fetch global settings');
	}
}

export async function getContent(
	path: string,
	featured?: boolean,
	query?: string,
	page?: string
) {
	const url = new URL(path, BASE_URL);

	url.search = qs.stringify({
		sort: ['createdAt:desc'],
		filters: {
			$or: [
				{ title: { $containsi: query } },
				{ description: { $containsi: query } },
			],
			...(featured && { featured: { $eq: featured } }),
		},
		pagination: {
			pageSize: BLOG_PAGE_SIZE,
			page: parseInt(page || '1'),
		},
		populate: {
			image: {
				fields: ['url', 'alternativeText'],
			},
		},
	});

	console.log('URL object:', url);
	console.log('Fetching content from:', url.href);

	try {
		const response = await fetchAPI(url.href, { method: 'GET' });
		console.log('Response:', response); // Выводим ответ в консоль
		return response;
	} catch (error) {
		console.error('Fetch error:', error);
		throw error;
	}
}

export async function getBlogPosts(page = 1) {
	const url = new URL('/api/articles', BASE_URL);
	url.search = qs.stringify(
		{
			populate: '*', // Загружаем все вложенные поля
			pagination: {
				pageSize: BLOG_PAGE_SIZE,
				page,
			},
			sort: ['publishedAt:desc'],
		},
		{ encode: false }
	);

	try {
		const response = await fetchAPI(url.href, { method: 'GET' });
		console.log('Blog posts response:', response);
		return response;
	} catch (error) {
		console.error('Error fetching blog posts:', error);
		throw error;
	}
}

export async function getContentBySlug(slug: string, path: string) {
	const url = new URL(path, BASE_URL);

	url.search = qs.stringify(
		{
			filters: {
				slug: {
					$eq: slug,
				},
			},
			populate: {
				image: {
					fields: ['url', 'alternativeText'],
				},
				blocks: {
					populate: '*', // Заполнение всех вложенных полей в блоках
				},
			},
		},
		{ encode: false } // Отключаем кодирование URL
	);

	return fetchAPI(url.href, { method: 'GET' });
}
