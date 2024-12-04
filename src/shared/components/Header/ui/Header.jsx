import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSearch } from '../../../../shared/context/SearchContext.jsx';
import styles from './Header.module.scss';

const Header = () => {
	const { searchQuery, setSearchQuery, searchResults, loading } = useSearch();
	const location = useLocation();

	const isHomePage = location.pathname === '/';

	useEffect(() => {
		if (location.pathname.includes('/book/')) {
			setSearchQuery('');
		}
	}, [location]);

	return (
		<header>
			<div className='container'>
				<div className={styles.headerWrapper}>
					<a href='/' className={styles.headerLogo}>
						<img
							src='/src/assets/Logo.png'
							alt='Logo'
							className={styles.Logo}
						/>
						<span>TheBookery</span>
					</a>

					<div className={styles.headerSearch}>
						<input
							type='text'
							placeholder='Пошук...'
							value={searchQuery}
							onChange={e => setSearchQuery(e.target.value)}
						/>
						<img src='/src/assets/search.png' alt='search' />

						{!isHomePage && searchQuery && (
							<ul className={styles.searchDropdown}>
								{loading ? (
									<p>...</p>
								) : searchResults.length > 0 ? (
									searchResults.map(book => (
										<li key={book.id}>
											<Link
												to={`/book/${book.id}`}
												className={styles.searchItem}
											>
												<span className={styles.searchTitle}>
													{book.volumeInfo.title}
												</span>{' '}
												-{' '}
												<span className={styles.searchAuthor}>
													{book.volumeInfo.authors}
												</span>
											</Link>
										</li>
									))
								) : (
									<p>Нічого не знайдено</p>
								)}
							</ul>
						)}
					</div>
				</div>
			</div>
		</header>
	);
};

export { Header };
