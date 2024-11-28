import axios from 'axios';
import { useEffect, useState } from 'react';
import { BookCard } from '../../../shared/components/BookCard/ui/BookCard';
import { useSearch } from '../../../shared/context/SearchContext.jsx';
import styles from './BookList.module.scss';

const BookList = () => {
	const { searchQuery } = useSearch();
	const [books, setBooks] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchBooks = async () => {
			try {
				setLoading(true);

				const query = searchQuery || 'fiction';
				const response = await axios.get(
					'https://www.googleapis.com/books/v1/volumes',
					{
						params: {
							q: query,
							maxResults: 20,
						},
					}
				);
				setBooks(response.data.items || []);
				setLoading(false);
			} catch (err) {
				setError(err.message);
				setLoading(false);
			}
		};

		fetchBooks();
	}, [searchQuery]);

	if (loading) return <p>Загрузка...</p>;
	if (error) return <p>Ошибка: {error}</p>;

	return (
		<div className={styles.bookList}>
			{books.length > 0 ? (
				books.map(book => <BookCard key={book.id} book={book.volumeInfo} />)
			) : (
				<p>Ничего не найдено</p>
			)}
		</div>
	);
};

export { BookList };
