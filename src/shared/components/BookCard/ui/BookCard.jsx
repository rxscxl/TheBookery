import styles from './BookCard.module.scss';

const BookCard = ({ book }) => {
	return (
		<div className={styles.bookCard}>
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
				<h4>{book.authors ? book.authors.join(', ') : 'Автор неизвестен'}</h4>
				<p>{book.publishedDate}</p>
			</div>
		</div>
	);
};

export { BookCard };
