import { GOOGLE_BOOKS_API_BASE_URL, GOOGLE_BOOKS_API_KEY } from './config';

/**
 * Поиск книг через Google Books API
 * @param {string} query - Текст для поиска (например, "Шевченко")
 * @param {string} langRestrict - Ограничение по языку (например, "uk" для украинского)
 * @returns {Promise<Array>} Список книг
 */
export function searchBooks(query, langRestrict = 'uk') {
	const url = new URL(`${GOOGLE_BOOKS_API_BASE_URL}volumes`);
	url.searchParams.append('q', query);
	url.searchParams.append('langRestrict', langRestrict);
	url.searchParams.append('key', GOOGLE_BOOKS_API_KEY);

	return fetch(url)
		.then(response => {
			if (!response.ok) {
				throw new Error(`Ошибка: ${response.status}`);
			}
			return response.json();
		})
		.then(data => data.items || [])
		.catch(error => {
			console.error('Ошибка при запросе данных из Google Books API:', error);
			return [];
		});
}
