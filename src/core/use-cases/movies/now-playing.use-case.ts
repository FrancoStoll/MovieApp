import { HttpAdapter } from "../../../config/adapters/http/http.adapter";
import { MovieDBMoviesResponse, NowPlayingResponse } from "../../../infrastructure/interfaces/movie-db.response";
import { MovieMapper } from "../../../infrastructure/mappers/movie.mapper";
import type { Movie } from "../../entities/movie.entity";



export const moviesNowPlayingUseCase = async (fetcher: HttpAdapter): Promise<Movie[]> => {

    try {

        const nowPlaying = await fetcher.get<MovieDBMoviesResponse>('/now_playing');

        return nowPlaying.results.map(MovieMapper.fromMovieDbResultToEntity)

    } catch (error) {
        console.log(error);
        throw new Error('Error fetchin movies - NowPlaying')
    }

}