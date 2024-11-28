import { Link } from 'react-router-dom';
import { useSearch } from '../../../../shared/context/SearchContext.jsx';
import styles from './Header.module.scss';

const Header = () => {
	const { searchQuery, setSearchQuery } = useSearch();

	return (
		<header>
			<div className='container'>
				<div className={styles.headerWrapper}>
					<Link to='/' className={styles.headerLogo}>
						<img
							src='/src/assets/Logo.png'
							alt='Logo'
							className={styles.Logo}
						/>
						<span>TheBookery</span>
					</Link>

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
