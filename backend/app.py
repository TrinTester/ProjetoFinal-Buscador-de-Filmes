from flask import Flask, request, jsonify
from flask_cors import CORS
from tmdb_api import search_movies, get_popular_movies

app = Flask(__name__)
CORS(app)

@app.route("/api/buscar", methods=["GET"])
def buscar_filmes():
    termo = request.args.get("q", "")
    if not termo:
        return jsonify({"erro": "Parâmetro de busca 'q' é obrigatório"}), 400
    
    resultado = search_movies(termo)
    return jsonify(resultado)

@app.route("/api/filmes-populares", methods=["GET"])
def filmes_populares():
    resultado = get_popular_movies()
    return jsonify(resultado)

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=10000)

from flask import Flask, request, jsonify
from flask_cors import CORS
from tmdb_api import search_movies, get_popular_movies

app = Flask(__name__)
CORS(app)

@app.route("/api/buscar", methods=["GET"])
def buscar_filmes():
    termo = request.args.get("q", "")
    if not termo:
        return jsonify({"erro": "Parâmetro de busca 'q' é obrigatório"}), 400

    resultado = search_movies(termo)
    return jsonify(resultado)

@app.route("/api/filmes-populares", methods=["GET"])
def filmes_populares():
    resultado = get_popular_movies()
    return jsonify(resultado)

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=10000)

