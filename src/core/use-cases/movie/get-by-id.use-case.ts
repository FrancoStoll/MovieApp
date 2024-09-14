import { HttpAdapter } from "../../../config/adapters/http/http.adapter";
import { MovieDBMovie } from "../../../infrastructure/interfaces/movie-db.response";
import { MovieMapper } from "../../../infrastructure/mappers/movie.mapper";
import { FullMovie } from "../../entities/movie.entity";


export const getMovieByIdUseCase = async (fetcher: HttpAdapter, movieId: number): Promise<FullMovie> => {

    try {
        // fetcher

        const movie = await fetcher.get<MovieDBMovie>(`/${movieId}`)

        //mappeo
        const fullMovie = MovieMapper.fromMovieDBToEnity(movie);
        // return fullmaped
        return fullMovie;


    } catch (error) {
        throw new Error(`Cannot get movie with the id ${movieId}`)
    }

}