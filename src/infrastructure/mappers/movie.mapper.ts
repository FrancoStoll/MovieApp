import { FullMovie, Movie } from "../../core/entities/movie.entity";
import { MovieDBMovie, Result } from "../interfaces/movie-db.response";


export class MovieMapper {


    static fromMovieDbResultToEntity(result: Result): Movie {

        return {
            id: result.id,
            title: result.title,
            description: result.overview,
            realeaseDate: new Date(result.release_date),
            rating: result.vote_average,
            poster: `https://images.tmdb.org/t/p/w500${result.poster_path}`,
            backdrop: `https://images.tmdb.org/t/p/w500${result.backdrop_path}`,
        }

    }

    static fromMovieDBToEnity(movie: MovieDBMovie): FullMovie {
        
        return {
            id: movie.id,
            title: movie.title,
            description: movie.overview,
            realeaseDate: new Date(movie.release_date),
            rating: movie.vote_average,
            poster: `https://images.tmdb.org/t/p/w500${movie.poster_path}`,
            backdrop: `https://images.tmdb.org/t/p/w500${movie.backdrop_path}`,
            genres: movie.genres.map(gen => gen.name),
            duration: movie.runtime,
            budget: movie.budget,
            originalTitle: movie.original_title,
            productionCompanies: movie.production_companies.map(m => m.name),
        }
    }


}