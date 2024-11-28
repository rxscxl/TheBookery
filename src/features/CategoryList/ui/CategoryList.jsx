import React from 'react';
import styles from './CategoryList.module.scss';

const categories = [
	{
		name: 'Художня література',
		genres: [
			{ name: 'Трилери', query: 'thriller' },
			{ name: 'Класика', query: 'classic' },
			{ name: 'Фантастика', query: 'fantasy' },
		],
	},
	{
		name: 'Прикладна література',
		genres: [
			{ name: 'Психологія', query: 'psychology' },
			{ name: 'Історія', query: 'history' },
		],
	},
	{
		name: 'Популярна література',
		genres: [{ name: 'Саморозвиток', query: 'self-help' }],
	},
];

const CategoryList = ({ activeGenre, setActiveGenre }) => {
	return (
		<div className={styles.categoryList}>
			{categories.map(category => (
				<div key={category.name}>
					<h3>{category.name}</h3>
					<ul>
						{category.genres.map(genre => (
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
