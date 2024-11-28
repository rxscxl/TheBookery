import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { SearchProvider } from '../shared/context/SearchContext.jsx';
import BaseLayout from './layouts/BaseLayout.jsx';
import './styles/index.scss';

const rootElement = document.getElementById('root');
const reactRoot = createRoot(rootElement);

reactRoot.render(
	<StrictMode>
		<BrowserRouter>
			<SearchProvider>
				<BaseLayout />
			</SearchProvider>
		</BrowserRouter>
	</StrictMode>
);
