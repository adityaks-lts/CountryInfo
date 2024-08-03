import React, { createContext, useState } from 'react';

export const SearchContext = createContext();

const SearchProvider = ({ children }) => {
  const [searchHistory, setSearchHistory] = useState([]);

  return (
    <SearchContext.Provider value={{ searchHistory, setSearchHistory }}>
      {children}
    </SearchContext.Provider>
  );
};

export default SearchProvider;
