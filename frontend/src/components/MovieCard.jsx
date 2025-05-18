<<<<<<< HEAD
export default function MovieCard({ movie }) {
  const imgUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "https://via.placeholder.com/200x300?text=Sem+Imagem";

  return (
    <div className="movie-card">
      <img src={imgUrl} alt={movie.title} className="poster" />
      <h2>{movie.title}</h2>
      <p>{movie.release_date}</p>
    </div>
  );
}
=======
export default function MovieCard({ movie }) {
  const imgUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "https://via.placeholder.com/200x300?text=Sem+Imagem";

  return (
    <div className="movie-card">
      <img src={imgUrl} alt={movie.title} className="poster" />
      <h2>{movie.title}</h2>
      <p>{movie.release_date}</p>
    </div>
  );
}
>>>>>>> master
