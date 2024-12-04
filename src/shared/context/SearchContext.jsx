import axios from 'axios';
import { createContext, useContext, useState } from 'react';

const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
	const [searchQuery, setSearchQuery] = useState('');
	const [searchResults, setSearchResults] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	const fetchSearchResults = async query => {
		if (!query) {
			setSearchResults([]);
			return;
		}
		try {
			setLoading(true);
			const response = await axios.get(
				`https://www.googleapis.com/books/v1/volumes?q=${query}`
			);
			setSearchResults(response.data.items || []);
		} catch (err) {
			setError(err.message);
		} finally {
			setLoading(false);
		}
	};

	const handleSearchQueryChange = query => {
		setSearchQuery(query);
		fetchSearchResults(query);
	};

	return (
		<SearchContext.Provider
			value={{
				searchQuery,
				setSearchQuery: handleSearchQueryChange,
				searchResults,
				setSearchResults,
				loading,
				error,
			}}
		>
			{children}
		</SearchContext.Provider>
	);
};

export const useSearch = () => useContext(SearchContext);
