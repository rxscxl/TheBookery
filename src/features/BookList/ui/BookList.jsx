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
	const [totalPages, setTotalPages] = useState(1);
	const booksPerPage = 10;

	useEffect(() => {
		const fetchBooks = async () => {
			try {
				setLoading(true);

				const query = genreFilter || searchQuery || 'fiction';
				const response = await axios.get(
					'https://www.googleapis.com/books/v1/volumes',
					{
						params: {
							q: query,
							langRestrict: 'uk',
							startIndex: (currentPage - 1) * booksPerPage,
							maxResults: booksPerPage,
							orderBy: 'relevance',
						},
					}
				);

				setBooks(response.data.items || []);
				setTotalPages(
					Math.ceil((response.data.totalItems || 0) / booksPerPage)
				);
				setLoading(false);
			} catch (err) {
				setError(err.message);
				setLoading(false);
			}
		};

		fetchBooks();
	}, [genreFilter, searchQuery, currentPage]);

	const handlePageChange = page => {
		if (page >= 1 && page <= totalPages) {
			setCurrentPage(page);
		}
	};

	const renderPagination = () => {
		const pagination = [];
		const maxButtons = 4;
		const ellipsis = '...';

		let startPage = Math.max(currentPage - Math.floor(maxButtons / 2), 1);
		let endPage = Math.min(startPage + maxButtons - 1, totalPages);

		if (endPage - startPage + 1 < maxButtons) {
			startPage = Math.max(endPage - maxButtons + 1, 1);
		}

		if (startPage > 1) {
			pagination.push(
				<button
					key='ellipsis-start'
					className={styles.paginationEllipsis}
					disabled
				>
					{ellipsis}
				</button>
			);
		}

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

		if (endPage < totalPages) {
			pagination.push(
				<button
					key='ellipsis-end'
					className={styles.paginationEllipsis}
					disabled
				>
					{ellipsis}
				</button>
			);
		}

		if (totalPages > maxButtons) {
			pagination.push(
				<button
					key='last-page'
					className={styles.paginationButton}
					onClick={() => handlePageChange(totalPages)}
				>
					{totalPages}
				</button>
			);
		}

		return pagination;
	};

	if (loading) return <p>Загрузка...</p>;
	if (error) return <p>Помилка: {error}</p>;

	return (
		<div>
			<div className={styles.bookList}>
				{books.length > 0 ? (
					books.map(book => (
						<BookCard key={book.id} bookId={book.id} book={book.volumeInfo} />
					))
				) : (
					<p>Нічого не знайдено</p>
				)}
			</div>
			<div className={styles.pagination}>
				<button
					onClick={() => handlePageChange(currentPage - 1)}
					disabled={currentPage === 1}
					className={styles.paginationButton}
				>
					&lt;
				</button>
				{renderPagination()}
				<button
					onClick={() => handlePageChange(currentPage + 1)}
					disabled={currentPage === totalPages}
					className={styles.paginationButton}
				>
					&gt;
				</button>
			</div>
		</div>
	);
};

export { BookList };
