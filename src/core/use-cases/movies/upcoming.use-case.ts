import { HttpAdapter } from "../../../config/adapters/http/http.adapter";
import { MovieDBMoviesResponse } from "../../../infrastructure/interfaces/movie-db.response";
import { MovieMapper } from "../../../infrastructure/mappers/movie.mapper";
import { Movie } from "../../entities/movie.entity";

interface Options {
    page?: number
}

export const UpComingUseCase = async (fetcher: HttpAdapter, options?: Options): Promise<Movie[]> => {


    try {

        const upComing = await fetcher.get<MovieDBMoviesResponse>('/upcoming', {
            params: {
                page: options?.page ?? 1,
            },
        })
        const movies = upComing.results.map(MovieMapper.fromMovieDbResultToEntity)
        return movies

    } catch (error) {

        console.log(error);
        throw new Error('Error fetchin movies - UpComing')

    }



}