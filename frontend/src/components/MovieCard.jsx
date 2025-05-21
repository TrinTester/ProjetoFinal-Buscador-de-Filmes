import { useState } from "react";
import "../App.css"; 

function formatarData(dataString) {
  const data = new Date(dataString);
  const dia = String(data.getDate()).padStart(2, '0');
  const mes = String(data.getMonth() + 1).padStart(2, '0'); // Janeiro = 0
  const ano = data.getFullYear();
  return `${dia}-${mes}-${ano}`;
}


export default function MovieCard({ movie }) {
  const [showModal, setShowModal] = useState(false);

  const imgUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "https://via.placeholder.com/200x300?text=Sem+Imagem";

  return (
    <>
      <div
        className="movie-card"
        onClick={() => setShowModal(true)}
        style={{ cursor: "pointer" }}
      >
        <img src={imgUrl} alt={movie.title} className="poster" />
        <h2>{movie.title}</h2>
        <p>{formatarData(movie.release_date)}</p>
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <img src={imgUrl} alt={movie.title} className="poster-large" />
            <h2>{movie.title}</h2>
            <p><strong>Data de Lançamento:</strong> {formatarData(movie.release_date)}</p>
            <p className="overview"><strong>Sinopse:</strong> {movie.overview || "Sem sinopse disponível."}</p>
            <button onClick={() => setShowModal(false)} className="close-button">Fechar</button>
          </div>
        </div>
      )}
    </>
  );
}
