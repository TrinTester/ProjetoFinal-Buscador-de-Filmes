import { useState, useEffect } from "react";
import SearchBar from "./components/SearchBar";
import MovieCard from "./components/MovieCard";

function App() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  // Busca filmes populares na inicialização
  useEffect(() => {
    const fetchPopular = async () => {
      setLoading(true);
      try {
        const response = await fetch("http://localhost:5000/api/filmes-populares");
        const data = await response.json();
        setMovies(data.results || []);
      } catch (error) {
        console.error("Erro ao buscar filmes populares:", error);
      }
      setLoading(false);
    };

    fetchPopular();
  }, []);

  // Busca filmes pelo termo digitado
  const handleSearch = async (query) => {
    if (!query) return;
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:5000/api/buscar?q=${query}`);
      const data = await response.json();
      setMovies(data.results || []);
    } catch (error) {
      console.error("Erro ao buscar filmes:", error);
    }
    setLoading(false);
  };

  return (
    <div className="app-container">
      <h1>Buscador de Filmes</h1>
      <SearchBar onSearch={handleSearch} />

      {loading ? (
        <p>Carregando...</p>
      ) : movies.length > 0 ? (
        <div className="movies-grid">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      ) : (
        <p>Nenhum filme encontrado.</p>
      )}
    </div>
  );
}

export default App;
