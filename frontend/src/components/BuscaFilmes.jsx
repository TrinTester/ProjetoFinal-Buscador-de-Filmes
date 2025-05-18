import React, { useEffect, useState } from 'react';

function BuscaFilmes() {
  const [filmes, setFilmes] = useState([]);
  const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

  useEffect(() => {
    fetch(`${apiUrl}/api/buscar?q=batman`)
      .then((res) => res.json())
      .then((data) => setFilmes(data.results || []))
      .catch((error) => console.error("Erro ao buscar filmes:", error));
  }, [apiUrl]);

  return (
    <div>
      {filmes.length > 0 ? (
        filmes.map((filme) => (
          <div key={filme.id}>{filme.title}</div>
        ))
      ) : (
        <p>Nenhum filme encontrado.</p>
      )}
    </div>
  );
}

export default BuscaFilmes;
