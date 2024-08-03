import { Button, Heading } from '@chakra-ui/react';
import React from 'react';

const CountryCard = ({ country, onFavorite, isFavorite }) => {
  return (
    <div className="country-card" style={{textAlign:"center", maxWidth:"300px", padding:"10px", boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px" ,borderRadius:"10px"}}>
      <img  style={{display:"block",margin:'auto'}} src={`https://flagsapi.com/${country.cca2}/shiny/64.png`} alt={`${country.name.common} flag`} />
      <Heading>{country.name.common}</Heading>
      <p>Currency: {Object.keys(country.currencies)[0]}</p>
      <p>Capital: {country.capital[0]}</p>
      <p>Languages: {Object.values(country.languages).join(', ')}</p>
      <Button onClick={onFavorite}>
        {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
      </Button>
    </div>
  );
};

export default CountryCard;
