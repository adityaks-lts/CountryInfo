import React, { useContext, useState, useEffect, useRef } from 'react';
import { getCountryByCurrencyCode } from '../api/countryApi';
import { AuthContext } from '../contexts/AuthContext';
import { SearchContext } from '../contexts/SearchContext';
import { addFavorite } from '../api/favoriteApi';
import CountryCard from '../components/CountryCard';
import { Button, Input } from '@chakra-ui/react';

const HomePage = () => {
  const { auth } = useContext(AuthContext);
  const { searchHistory, setSearchHistory } = useContext(SearchContext);
  const [search, setSearch] = useState('');
  const [countries, setCountries] = useState([]);
  const searchRef = useRef(null);

  useEffect(() => {
    searchRef.current.focus();
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (search.trim()) {
      try {
        const { data } = await getCountryByCurrencyCode(search);
        setCountries(data);
        console.log(data);
        setSearchHistory([search, ...searchHistory.filter(item => item !== search)].slice(0, 5));
      } catch (err) {
        console.error('Error fetching country data:', err.message);
      }
    }
    
  };

  const handleFavorite = async (country) => {
    if (auth.token) {
      try {
        await addFavorite(country, auth.token);
        console.log(countries)
      } catch (err) {
        console.error('Error adding favorite:', err.message);
      }
    } else {
      alert('Please log in to add favorites.');
    }
  };

  return (
    <div className="home-page">
      <form onSubmit={handleSearch} style={{padding:"20px", width:"fit-content",margin:"auto", display:"flex"}}>
        <Input
          maxW={"400px"}
          type="text"
          placeholder="Enter currency code"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          ref={searchRef}
        />
        <Button type="submit">Search</Button>
      </form>
      <div className="search-history" style={{display:"flex", justifyContent:"center", flexWrap:"wrap", gap:"10px"}}>
        {searchHistory.map((item, index) => (
          <Button key={index} onClick={() => setSearch(item)}>
            {item}
          </Button>
        ))}
      </div>
      <div className="country-list" style={{display:"flex",  flexWrap:"wrap", gap:"20px", padding:"20px"}}>
        {countries.map(country => (
          <CountryCard
            key={country.cca3}
            country={country}
            onFavorite={() => handleFavorite(country)}
            isFavorite={false} 
          />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
