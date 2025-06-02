import MovieCard from "./MovieCard";

export default function FavoritesPage() {
  const favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];

  return (
    <div>
      <h1>Filmes Favoritos</h1>
      {favoritos.length > 0 ? (
        <div className="movies-grid">
          {favoritos.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      ) : (
        <p>Você ainda não adicionou nenhum favorito.</p>
      )}
    </div>
  );
}
