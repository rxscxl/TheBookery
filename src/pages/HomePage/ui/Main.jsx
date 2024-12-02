import { useState } from 'react';
import { Link } from 'react-router-dom';
import { BookList } from '../../../features/BookList';
import { CategoryList } from '../../../features/CategoryList';
import styles from './Main.module.scss';

const genreTranslations = {
	fiction: 'Фікшн',
	history: 'Історія',
	psychology: 'Психологія',
	science: 'Наука',
	'self-help': 'Саморозвиток',
	thriller: 'Трилери',
	classics: 'Класика',
	fantasy: 'Фантастика',
	romance: 'Роман',
	nonfiction: 'Нон-фікшн',
	classic: 'Класика',
	mystery: 'Мистецтво',
	philosophy: 'Філософія',
	literature: 'Література',
};

const categoryMapping = {
	fiction: 'Художня література',
	fantasy: 'Художня література',
	thriller: 'Художня література',
	classics: 'Художня література',
	romance: 'Художня література',
	history: 'Наукова література',
	science: 'Наукова література',
	philosophy: 'Наукова література',
	psychology: 'Наукова література',
	nonfiction: 'Прикладна література',
	mystery: 'Мистецтво',
	'self-help': 'Інше',
};

const Main = () => {
	const [activeGenre, setActiveGenre] = useState(null);

	const translateGenre = genre => {
		if (!genre) return null;
		const translated = genreTranslations[genre] || genre;
		return translated.charAt(0).toUpperCase() + translated.slice(1);
	};

	const getCategoryByGenre = genre => {
		if (!genre) return null;
		return categoryMapping[genre] || 'Інше';
	};

	const handleResetGenre = () => {
		setActiveGenre(null);
	};

	const renderBreadcrumbs = () => {
		const category = getCategoryByGenre(activeGenre);
		return (
			<div className={styles.breadcrumbs}>
				<Link to='/' className={styles.breadcrumb} onClick={handleResetGenre}>
					{`Головна` + ' '}
				</Link>
				<span className={styles.breadcrumbSeparator}>{'>' + ' '}</span>
				{activeGenre ? (
					<>
						{category && (
							<>
								<Link
									to='/'
									className={styles.breadcrumb}
									onClick={handleResetGenre}
								>
									{category + ' '}
								</Link>
								<span className={styles.breadcrumbSeparator}>{'>' + ' '}</span>
							</>
						)}
						<span className={styles.activeBreadcrumb}>
							{translateGenre(activeGenre)}
						</span>
					</>
				) : (
					<span className={styles.activeBreadcrumb}>Популярна література</span>
				)}
			</div>
		);
	};

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

						<h3 className={styles.mainTitle}>{renderBreadcrumbs()}</h3>

						<BookList genreFilter={activeGenre} />
					</div>
				</div>
			</div>
		</main>
	);
};

export { Main };
