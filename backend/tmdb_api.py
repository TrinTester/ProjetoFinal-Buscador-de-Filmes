import os
import requests
from dotenv import load_dotenv

# Carregar variáveis de ambiente do .env
load_dotenv()

# Obter a chave da API do TMDB
TMDB_API_KEY = os.getenv("TMDB_API_KEY")
TMDB_BASE_URL = "https://api.themoviedb.org/3"

# Buscar filmes com base em uma palavra-chave
def search_movies(query):
    url = f"{TMDB_BASE_URL}/search/movie"
    params = {
        "api_key": TMDB_API_KEY,
        "query": query,
        "language": "pt-BR"
    }
    response = requests.get(url, params=params)
    return response.json()
    data = response.json()
    data["results"] = [movie for movie in data["results"] if movie.get("poster_path")]
    return data

# Obter lista de filmes populares
def get_popular_movies():
    url = f"{TMDB_BASE_URL}/movie/popular"
    params = {
        "api_key": TMDB_API_KEY,
        "language": "pt-BR"
    }
    response = requests.get(url, params=params)
    data = response.json()
    data["results"] = [movie for movie in data["results"] if movie.get("poster_path")]
    return data
