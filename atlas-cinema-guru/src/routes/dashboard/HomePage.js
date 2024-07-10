import React, { useState, useEffect } from 'react';
import './dashboard.css';
import Filter from '../../components/movies/Filter';
import Button from '../../components/general/Button';
import axios from 'axios';

function HomePage() {
  const [movies, setMovies] = useState([]);
  const [minYear, setMinYear] = useState(1970);
  const [maxYear, setMaxYear] = useState(2022);
  const [genres, setGenres] = useState([]);
  const [sort, setSort] = useState("");
  const [title, setTitle] = useState("");
  const [page, setPage] = useState(1);
  const accessToken = localStorage.getItem('accessToken');

  const loadMovies = async (page) => {
    try {
      const response = await axios.get('http://localhost:8000/api/titles/advancedsearch', {
        headers: {
          Authorization: `Bearer ${accessToken}`
        },
        params: {
          minYear: minYear,
          maxYear: maxYear,
          genres: genres.join(','),
          title: title,
          sort: sort,
          page: page,
        }
      });
      setMovies(prevMovies => [...prevMovies, ...response.data.titles]);
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  };

  useEffect(() => {
    loadMovies(page);
  }, [minYear, maxYear, genres, sort, title, page]);

  return (
    <div className="home-page">
      <Button label="Load More.." onClick={() => setPage(prevPage => prevPage + 1)} />
    </div>
  );
}

export default HomePage;
