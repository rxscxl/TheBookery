import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { Footer } from '../../../shared/components/Footer';
import { Header } from '../../../shared/components/Header';
import styles from './BookPage.module.scss';

const BookPage = () => {
	const { id } = useParams();
	const [book, setBook] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchBook = async () => {
			try {
				setLoading(true);
				const response = await axios.get(
					`https://www.googleapis.com/books/v1/volumes/${id}`
				);
				setBook(response.data.volumeInfo);
				setLoading(false);
			} catch (err) {
				setError(err.message);
				setLoading(false);
			}
		};

		fetchBook();
	}, [id]);

	if (loading) return <p>Загрузка...</p>;
	if (error) return <p>Помилка: {error}</p>;

	return (
		<div className={styles.bookPage}>
			<div className='wrapper'>
				<Header />

				<div className={`container ${styles.bookWrapper}`}>
					<img
						src={book.imageLinks?.thumbnail || '/src/assets/book.png'}
						alt={book.title}
						className={styles.bookImage}
					/>
					<div className={styles.bookContent}>
						<h1>{book.title}</h1>
						<h3>
							<strong>Автор:</strong>{' '}
							{book.authors?.join(', ') || 'Автор невідомий'}
						</h3>
						<p>
							<strong>Дата публікації:</strong>{' '}
							{book.publishedDate || 'Невідомо'}
						</p>
						<p>
							<strong>Опис:</strong>{' '}
							<span
								dangerouslySetInnerHTML={{
									__html: book.description || 'Опис відсутній',
								}}
							/>
						</p>
						<a href={book.infoLink} target='_blank' rel='noopener noreferrer'>
							Детальніше на Google Books
						</a>
					</div>
				</div>
				<Footer />
			</div>
		</div>
	);
};

export { BookPage };
