import axios from 'axios';
import { useEffect, useState } from 'react';
import { BookCard } from '../../../shared/components/BookCard/ui/BookCard';
import { useSearch } from '../../../shared/context/SearchContext.jsx';
import styles from './BookList.module.scss';

const BookList = ({ genreFilter }) => {
	const { searchQuery } = useSearch();
	const [books, setBooks] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [currentPage, setCurrentPage] = useState(1);
	const [totalItems, setTotalItems] = useState(0);
	const [prevQuery, setPrevQuery] = useState('');
	const booksPerPage = 10;

	useEffect(() => {
		setCurrentPage(1);
	}, [genreFilter, searchQuery]);
	const totalPages = Math.ceil(totalItems / booksPerPage - 1);

	useEffect(() => {
		const fetchBooks = async () => {
			try {
				setLoading(true);

				const query = genreFilter || searchQuery || '*';
				const response = await axios.get(
					'https://www.googleapis.com/books/v1/volumes',
					{
						params: {
							q: query,
							startIndex: (currentPage - 1) * booksPerPage,
							maxResults: booksPerPage,
							orderBy: 'relevance',
						},
					}
				);
				console.log(response.data);

				const fetchedBooks = response.data.items || [];
				setBooks(fetchedBooks);

				if (query !== prevQuery) {
					setTotalItems(response.data.totalItems || 0);
					setPrevQuery(query);
				}

				setLoading(false);
			} catch (err) {
				setError(err.message);
				setLoading(false);
			}
		};

		fetchBooks();
	}, [genreFilter, searchQuery, currentPage, prevQuery]);

	const hasPrevPage = currentPage > 1;
	const hasNextPage = currentPage < totalPages;

	const handlePageChange = page => {
		if (page >= 1 && page <= totalPages) {
			setCurrentPage(page);
		}
	};

	const renderPagination = () => {
		const pagination = [];
		const maxButtons = 5;
		const range = 2;

		let startPage = Math.max(currentPage - range, 1);
		let endPage = Math.min(currentPage + range, totalPages);

		if (endPage - startPage + 1 < maxButtons) {
			startPage = Math.max(endPage - maxButtons + 1, 1);
		}

		pagination.push(
			<button
				onClick={() => handlePageChange(currentPage - 1)}
				disabled={!hasPrevPage}
				className={styles.paginationButton}
			>
				&lt;
			</button>
		);

		for (let page = startPage; page <= endPage; page++) {
			pagination.push(
				<button
					key={page}
					className={`${styles.paginationButton} ${
						page === currentPage ? styles.active : ''
					}`}
					onClick={() => handlePageChange(page)}
				>
					{page}
				</button>
			);
		}

		pagination.push(
			<button
				onClick={() => handlePageChange(currentPage + 1)}
				disabled={!hasNextPage}
				className={styles.paginationButton}
			>
				&gt;
			</button>
		);

		return pagination;
	};

	if (loading) return <p>Загрузка...</p>;
	if (error) return <p>Помилка: {error}</p>;

	return (
		<div className={styles.bookListWrapper}>
			<div className={styles.bookList}>
				{books.length > 0 ? (
					books.map(book => (
						<BookCard key={book.id} bookId={book.id} book={book.volumeInfo} />
					))
				) : (
					<p>Нічого не знайдено</p>
				)}
			</div>
			{totalPages > 1 && (
				<ul className={styles.paginationWrapper}>{renderPagination()}</ul>
			)}
		</div>
	);
};

export { BookList };
