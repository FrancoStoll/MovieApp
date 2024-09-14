import { useEffect, useState } from 'react';
import { getMovieByIdUseCase } from '../../core/use-cases/movie/get-by-id.use-case';
import { movieDBFetcher } from '../../config/adapters/movieDB.adapter';
import { FullMovie } from '../../core/entities/movie.entity';
import { getMovieCastUseCase } from '../../core/use-cases/movie/get-cast.use-case';

import { Cast } from '../../core/entities/cast.entity';


export const useMovie = (movieId: number) => {


    const [isLoading, setIsLoading] = useState(true);
    const [fullMovie, setFullMovie] = useState<FullMovie>()
    const [cast, setCast] = useState<Cast[]>()
    useEffect(() => {
        loadMovie();
    }, []);

    const loadMovie = async () => {
        const fullMoviePromise = await getMovieByIdUseCase(movieDBFetcher, movieId)
        const castMoviePromise = await getMovieCastUseCase(movieDBFetcher, movieId)

        const [fullMovieResponse, castResponse] = await Promise.all([
            fullMoviePromise,
            castMoviePromise,
        ])


        setFullMovie(fullMovieResponse)
        setCast(castResponse);
        setIsLoading(false)
    }

    return {
        isLoading,
        fullMovie,
        cast,
    }
}