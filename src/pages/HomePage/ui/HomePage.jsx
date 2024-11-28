import { Footer } from '../../../shared/components/Footer';
import { Header } from '../../../shared/components/Header';
import { Main } from './Main';

const HomePage = () => {
	return (
		<div className='wrapper'>
			<Header />
			<Main />
			<Footer />
		</div>
	);
};

export { HomePage };
