import { HttpAdapter } from "../../../config/adapters/http/http.adapter";
import { MovieDBMoviesResponse } from "../../../infrastructure/interfaces/movie-db.response";
import { MovieMapper } from "../../../infrastructure/mappers/movie.mapper";
import { Movie } from "../../entities/movie.entity";

interface Options {
    page?: number
}

export const topRatedUseCase = async (fetcher: HttpAdapter, options?: Options): Promise<Movie[]> => {

    const topRated = await fetcher.get<MovieDBMoviesResponse>('/top_rated', {
        params: {
            page: options?.page ?? 1,
        },
    });

    const topRatedResult = topRated.results.map(MovieMapper.fromMovieDbResultToEntity)

    return topRatedResult
}