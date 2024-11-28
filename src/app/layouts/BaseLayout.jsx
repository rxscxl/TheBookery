import { Route, Routes } from 'react-router-dom';
import { BookPage } from '../../pages/BookPage';
import { HomePage } from '../../pages/HomePage';

function BaseLayout() {
	return (
		<Routes>
			<Route path='/' element={<HomePage />} />
			<Route path='/book/:id' element={<BookPage />} />
		</Routes>
	);
}

export default BaseLayout;
