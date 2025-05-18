import React, { useEffect, useState } from 'react';

function BuscaFilmes() {
  const [filmes, setFilmes] = useState([]);

  useEffect(() => {
<<<<<<< HEAD
    const apiUrl = process.env.REACT_APP_API_URL;
=======
    const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;
>>>>>>> master
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
