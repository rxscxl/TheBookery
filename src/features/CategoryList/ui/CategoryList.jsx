import styles from './CategoryList.module.scss';

const CategoryList = ({ activeGenre, setActiveGenre }) => {
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

	const categories = Object.entries(categoryMapping).reduce(
		(acc, [genre, category]) => {
			const genreName = genreTranslations[genre] || genre;
			if (!acc[category]) acc[category] = [];
			acc[category].push({ name: genreName, query: genre });
			return acc;
		},
		{}
	);

	return (
		<div className={styles.categoryList}>
			{Object.entries(categories).map(([categoryName, genres]) => (
				<div key={categoryName}>
					<h3>{categoryName}</h3>
					<ul>
						{genres.map(genre => (
							<li key={genre.query}>
								<button
									className={`${styles.genreButton} ${
										activeGenre === genre.query ? styles.active : ''
									}`}
									onClick={() => setActiveGenre(genre.query)}
								>
									{genre.name}
								</button>
							</li>
						))}
					</ul>
				</div>
			))}
		</div>
	);
};

export { CategoryList };
