import { useNavigate } from 'react-router-dom';
import styles from './BookCard.module.scss';

const BookCard = ({ book, bookId }) => {
	const navigate = useNavigate();

	const handleClick = () => {
		navigate(`/book/${bookId}`);
	};

	return (
		<div className={styles.bookCard} onClick={handleClick}>
			<div className={styles.bookCardImage}>
				<img
					height={150}
					src={
						book.imageLinks ? book.imageLinks.thumbnail : '/src/assets/book.png'
					}
					alt={book.title}
				/>
			</div>
			<div className={styles.bookCardInfo}>
				<h3>{book.title}</h3>
				<h4>{book.authors ? book.authors.join(', ') : 'Невідомий автор'}</h4>
				<p>{book.publishedDate}</p>
			</div>
		</div>
	);
};

export { BookCard };
