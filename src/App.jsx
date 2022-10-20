import React, { useState, useEffect} from 'react';

import MoviesList from './components/MoviesList';
import './App.css';
import { useCallback } from 'react';
import AddMovie from './components/Addmovie';

// How to send http request from a React App to a Backend

function App() {
  const [isLoading, setIsLoading] = useState(false);

  // const [show , setShow] = useState(false);
const [movies, setMovies] = useState([]);
const [error, setError] = useState(null);


  // function fetchMoviesHandler () {}

  // async function fetchMoviesHandler () {
 const fetchMoviesHandler = useCallback( async () => {
    setError(null);
    setIsLoading(true);

    try {
  const response = await fetch('https://react-practice-e9d43-default-rtdb.firebaseio.com/movies.json');
    
if (!response.ok) {
  throw new Error('something went wrong!');
}
    // .then(response => {
    //   return response.json()
    // })
    // .then((data) => {}
      const data = await response.json();
      // setShow( prevMode => !prevMode)

      const LoadedMovies = [];
      for (const key in data) {
      LoadedMovies.push({
        id: key,
        title: data[key].title,
        openingText: data[key].openingText,
        releaseDate: data[key].releaseDate,
      });
    }
    
    setMovies (LoadedMovies);
  
} catch (error) {
  setError (error.message);
  
}
setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchMoviesHandler ()
  }, [fetchMoviesHandler]);
  
  async function addMovieHandler(movie) {
   const response = await fetch('https://react-practice-e9d43-default-rtdb.firebaseio.com/movies.json', {
method: 'POST',
body: JSON.stringify(movie),
headers: {
  'Content-Type': 'application/json'
}
   }

  )
   const data = await response.json();
   console.log(data);
}

  let content = <p>Found no movies.</p>

if (isLoading) {
  content = <p>Loading...</p>
}
if (error) {
  content = <p>{error}</p>
}
if  (movies.length > 0) {
  content = <MoviesList movies={movies} />;
}

  return (
    <React.Fragment>
       <section>
        <AddMovie onAddMovie={addMovieHandler} />
      </section>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
     {content}
      </section>
    </React.Fragment>
  );
}

export default App;