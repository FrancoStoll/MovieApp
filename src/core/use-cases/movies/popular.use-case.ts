import { HttpAdapter } from "../../../config/adapters/http/http.adapter";
import { NowPlayingResponse } from "../../../infrastructure/interfaces/movie-db.response";
import { MovieMapper } from "../../../infrastructure/mappers/movie.mapper";
import { Movie } from "../../entities/movie.entity";

interface Options {
    page?: number;
    limit?: number;
}

export const popularUseCase = async (fetcher: HttpAdapter, options?: Options): Promise<Movie[]> => {


    const popular = await fetcher.get<NowPlayingResponse>('/popular', {
        params: {
            page: options?.page ?? 1,
        },
    });

    const popularResult = popular.results.map(MovieMapper.fromMovieDbResultToEntity);


    return popularResult;
}