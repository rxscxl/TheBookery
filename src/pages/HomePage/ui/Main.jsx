import { BookList } from '../../../features/BookList';
import styles from './Main.module.scss';

const Main = () => {
	return (
		<main className={styles.main}>
			<div className='container'>
				<div className={styles.mainWrapper}>
					<aside>
						<ul>
							<li>
								<h3></h3>
							</li>
						</ul>
					</aside>
					<div className={styles.contentWrapper}>
						<img
							className={styles.mainImage}
							src='/src/assets/books.png'
							alt='books'
							height={200}
						/>

						<h3 className={styles.mainTitle}>Популярна література</h3>

						<BookList />
					</div>
				</div>
			</div>
		</main>
	);
};

export { Main };
