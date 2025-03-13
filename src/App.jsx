import { useState } from 'react'
import './App.css'
import Title from './components/title.jsx'
import Header from './components/header.jsx'
import SearchBar from './components/searchbar.jsx'
import Button from './components/button.jsx'
import Footer from './components/footer.jsx'


export function App() {
  const [movieName, setMovieName] = useState('');
  const [movies, setMovies] = useState([]);
  const API_KEY = import.meta.env.VITE_KEY;


  const searchEngine = (movieName) => {
    if (!movieName.trim()) return;
    
    fetch(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(movieName)}`)
      .then(response => response.json())
      .then(data => {
        const nonAdultMovies = data.results.filter(movie => !movie.adult).slice(0, 18);
        setMovies(nonAdultMovies || []);
        console.log('Movies found:', nonAdultMovies);
      })
  }

  return (
    <main>
      <Header />
      <Title />
      <SearchBar value={movieName} onChange={setMovieName} />
      <Button onClick={() => searchEngine(movieName)}/>
      <div className="safe-search">
        <span className="safe-icon">🔒</span> Family-Friendly Search
      </div>
      <div className="movies-grid">
        {movies.map(movie => (
          <div key={movie.id} className="movie-card">
            <h3>{movie.title}</h3>
            {movie.poster_path ? (
              <img 
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
                alt={movie.title}
              />
            ) : (
              <div className="no-image">
                No Image Available
              </div>
            )}
            <p>Popularity: {movie.popularity}</p>
            <p><b>Release Date:</b> {movie.release_date}</p>
            <p>{movie.overview}</p>
          </div>
        ))}
      </div>
      <Footer />
    </main>
  )
}

export default App
