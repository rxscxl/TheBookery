import { Link } from 'react-router-dom';
import styles from './Breadcrumbs.module.scss';

const Breadcrumbs = ({ category, genre }) => {
	return (
		<div className={styles.breadcrumbs}>
			{category && (
				<>
					<Link to={`/category/${category.query}`}>{category.name}</Link>
					{genre && <span> ${'>'} </span>}
				</>
			)}
			{genre && <span>{genre.name}</span>}
		</div>
	);
};

export { Breadcrumbs };
