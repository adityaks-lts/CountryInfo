import React, { useContext, useEffect } from 'react';
import { FavoriteContext } from '../contexts/FavoriteContext';
import { AuthContext } from '../contexts/AuthContext';
import { getFavorites, removeFavorite } from '../api/favoriteApi';
import CountryCard from '../components/CountryCard';

const FavoritesPage = () => {
  const { favorites, setFavorites } = useContext(FavoriteContext);
  const { auth } = useContext(AuthContext);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const { data } = await getFavorites(auth.token);
        // console.log(data);
        setFavorites(data);
      } catch (err) {
        console.error('Error fetching favorites:', err.message);
      }
    };

    fetchFavorites();
  }, [auth.token, setFavorites]);

  const handleRemoveFavorite = async (id) => {
    if (auth.token) {
      try {
        console.log(id)
        await removeFavorite(id, auth.token);
        setFavorites(favorites.filter(favorite => favorite._id !== id));
      } catch (err) {
        console.error('Error removing favorite:', err.message);
      }
    } else {
      alert('Please log in to remove favorites.');
    }
  };

  return (
    <div className="favorites-page">
      <h1>Your Favorites</h1>
      <div className="country-list" style={{display:"flex", flexWrap:"wrap", gap:"20px", padding:"20px"}}>
        {favorites && favorites.map(favorite => (
          <CountryCard
            key={favorite.cca3}
            country={favorite} 
            onFavorite={() => handleRemoveFavorite(favorite._id)}
            isFavorite={true}
          />
          // <div>{JSON.stringify(favorite)}</div>

        ))}
      </div>
    </div>
  );
};

export default FavoritesPage;
