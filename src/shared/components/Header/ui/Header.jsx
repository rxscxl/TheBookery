import { useSearch } from '../../../../shared/context/SearchContext.jsx';
import styles from './Header.module.scss';

const Header = () => {
	const { searchQuery, setSearchQuery } = useSearch();

	return (
		<header>
			<div className='container'>
				<div className={styles.headerWrapper}>
					<a className={styles.headerLogo} href='/'>
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
					</div>
				</div>
			</div>
		</header>
	);
};

export { Header };
