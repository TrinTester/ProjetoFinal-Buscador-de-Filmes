import React, { useEffect, useState } from 'react';

function BuscaFilmes() {
  const [filmes, setFilmes] = useState([]);

  useEffect(() => {
    const apiUrl = process.env.REACT_APP_API_URL;
    fetch(`${apiUrl}/api/buscar?q=batman`)
      .then(res => res.json())
      .then(data => setFilmes(data.results))
      .catch(console.error);
  }, []);

  return (
    <div>
      {filmes.map(filme => (
        <div key={filme.id}>{filme.title}</div>
      ))}
    </div>
  );
}

export default BuscaFilmes;
