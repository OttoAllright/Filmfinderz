import { useState } from 'react'
import { IntlProvider, useIntl, FormattedMessage } from 'react-intl'
import './App.css'
import Title from './components/title.jsx'
import Header from './components/header.jsx'
import SearchBar from './components/searchbar.jsx'
import Button from './components/button.jsx'
import Footer from './components/footer.jsx'
import enMessages from './translations/en.json'
import esMessages from './translations/es.json'

const messages = {
  en: enMessages,
  es: esMessages
};

function getNavigatorLanguage() {
  const language = navigator.language.split('-')[0];
  return messages[language] ? language : 'en';
}

export function App() {
  const [movieName, setMovieName] = useState('');
  const [movies, setMovies] = useState([]);
  const [language] = useState(getNavigatorLanguage());
  const API_KEY = import.meta.env.VITE_KEY;

  const searchEngine = (movieName) => {
    if (!movieName.trim()) return;

    fetch(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(movieName)}&language=${language}`)
      .then(response => response.json())
      .then(data => {
        const nonAdultMovies = data.results.filter(movie => !movie.adult).slice(0, 18);
        setMovies(nonAdultMovies);
      });
  };

  return (
    <IntlProvider messages={messages[language]} locale={language}>
      <main>
        <Header />
        <Title />
        <SearchBar value={movieName} onChange={setMovieName} />
        <Button onClick={() => searchEngine(movieName)}/>
        <div className="safe-search">
          <span className="safe-icon">🔒</span>
          <span><FormattedMessage id="app.safe.search" /></span>
        </div>
        <div className="movies-grid">
          {movies.map(movie => (
            <div key={movie.id} className="movie-card">
              {movie.poster_path ? (
                <img 
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                />
              ) : (
                <div className="no-image">
                  <FormattedMessage id="app.movie.noImage" />
                </div>
              )}
              <h3>{movie.title}</h3>
              <p><FormattedMessage id="app.movie.popularity" />: {movie.popularity}</p>
              <p><FormattedMessage id="app.movie.release" />: {movie.release_date}</p>
              <p>{movie.overview}</p>
            </div>
          ))}
        </div>
        <Footer />
      </main>
    </IntlProvider>
  )
}

export default App
