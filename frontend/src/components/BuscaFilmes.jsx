import { useEffect, useState } from 'react';

function BuscarFilmes() {
  const [filmes, setFilmes] = useState([]);
  const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

  useEffect(() => {
    const fetchFilmes = async () => {
      try {
        const res = await fetch(`${apiUrl}/api/buscar?q=batman`);
        const data = await res.json();
        setFilmes(data.results || []);
      } catch (error) {
        console.error("Erro ao buscar filmes:", error);
      }
    };

    fetchFilmes();
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

export default BuscarFilmes;
