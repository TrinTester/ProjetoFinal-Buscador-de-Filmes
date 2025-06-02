import { useState, useEffect } from "react";
import SearchBar from "./components/SearchBar";
import MovieCard from "./components/MovieCard";

function App() {
  const [movies, setMovies] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [activeTab, setActiveTab] = useState("buscar"); // "buscar" ou "favoritos"
  const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

  // Carrega o tema salvo no localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const isDark = savedTheme === "dark";
    setDarkMode(isDark);
    document.body.classList.toggle("dark-mode", isDark);
  }, []);

  // Atualiza body e salva no localStorage ao trocar tema
  useEffect(() => {
    document.body.classList.toggle("dark-mode", darkMode);
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  // Carregar favoritos do localStorage
  useEffect(() => {
    const saved = localStorage.getItem("favoritos");
    if (saved) {
      setFavorites(JSON.parse(saved));
    }
  }, []);

  // Salvar favoritos sempre que mudar
  useEffect(() => {
    localStorage.setItem("favoritos", JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    if (activeTab === "buscar") {
      const fetchPopular = async () => {
        setLoading(true);
        try {
          const response = await fetch(`${apiUrl}/api/filmes-populares`);
          const data = await response.json();
          setMovies(data.results || []);
        } catch (error) {
          console.error("Erro ao buscar filmes populares:", error);
        }
        setLoading(false);
      };
      fetchPopular();
    }
  }, [apiUrl, activeTab]);

  const handleSearch = async (query) => {
    if (!query) return;
    setLoading(true);
    try {
      const response = await fetch(`${apiUrl}/api/buscar?q=${query}`);
      const data = await response.json();
      setMovies(data.results || []);
    } catch (error) {
      console.error("Erro ao buscar filmes:", error);
    }
    setLoading(false);
  };

  // Adicionar ou remover favorito
  const toggleFavorite = (movie) => {
    const exists = favorites.some((fav) => fav.id === movie.id);
    if (exists) {
      setFavorites(favorites.filter((fav) => fav.id !== movie.id));
    } else {
      setFavorites([...favorites, movie]);
    }
  };

  return (
    <div className="app-container">
      <button className="theme-toggle" onClick={() => setDarkMode(!darkMode)}>
        {darkMode ? "☀️ Modo Claro" : "🌙 Modo Escuro"}
      </button>
      <h1 onClick={() => window.location.reload()} style={{ cursor: "pointer" }}>
        MovieWay
      </h1>
      <div className="tabs">
        <button
          className={activeTab === "buscar" ? "active" : ""}
          onClick={() => setActiveTab("buscar")}
        >
          Buscar Filmes
        </button>

        <button
          className={activeTab === "favoritos" ? "active" : ""}
          onClick={() => setActiveTab("favoritos")}
        >
          Meus Favoritos ({favorites.length})
        </button>
      </div>

      {activeTab === "buscar" && (
        <>
          <SearchBar onSearch={handleSearch} />
          {loading ? (
            <p>Carregando...</p>
          ) : movies.length > 0 ? (
            <div className="movies-grid">
              {movies.map((movie) => (
                <MovieCard
                  key={movie.id}
                  movie={movie}
                  isFavorite={favorites.some((fav) => fav.id === movie.id)}
                  onToggleFavorite={() => toggleFavorite(movie)}
                />
              ))}
            </div>
          ) : (
            <p>Nenhum filme encontrado.</p>
          )}
        </>
      )}

      {activeTab === "favoritos" && (
        <>
          <h2>🎬 Meus Favoritos</h2>
          {favorites.length > 0 ? (
            <div className="movies-grid">
              {favorites.map((movie) => (
                <MovieCard
                  key={movie.id}
                  movie={movie}
                  isFavorite={true}
                  onToggleFavorite={() => toggleFavorite(movie)}
                />
              ))}
            </div>
          ) : (
            <p>Você ainda não adicionou nenhum filme à lista de favoritos.</p>
          )}
        </>
      )}
    </div>
  );
}

export default App;
