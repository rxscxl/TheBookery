import { useState } from 'react';
import { BookList } from '../../../features/BookList';
import { CategoryList } from '../../../features/CategoryList';
import styles from './Main.module.scss';

const Main = () => {
	const [activeGenre, setActiveGenre] = useState(null);

	return (
		<main className={styles.main}>
			<div className='container'>
				<div className={styles.mainWrapper}>
					<aside>
						<CategoryList
							activeGenre={activeGenre}
							setActiveGenre={setActiveGenre}
						/>
					</aside>
					<div className={styles.contentWrapper}>
						<img
							className={styles.mainImage}
							src='/src/assets/books.png'
							alt='books'
							height={200}
						/>
						<h3 className={styles.mainTitle}>Популярна література</h3>

						<BookList genreFilter={activeGenre} />
					</div>
				</div>
			</div>
		</main>
	);
};

export { Main };
