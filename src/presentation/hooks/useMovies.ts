import { useEffect, useState } from "react"
import type { Movie } from "../../core/entities/movie.entity"

import * as UseCases from '../../core/use-cases/index'
import { movieDBFetcher } from "../../config/adapters/movieDB.adapter";


let popularPage = 1;
let upComingPage = 1;
let topRatedPage = 1;
export const useMovies = () => {

    const [isLoading, setIsLoading] = useState(true);
    const [nowPlaying, setNowPlaying] = useState<Movie[]>([])
    const [upComing, setUpComing] = useState<Movie[]>([])
    const [topRated, setTopRated] = useState<Movie[]>([])
    const [popular, setPopular] = useState<Movie[]>([])

    useEffect(() => {
        initialLoad();


    }, [])
    const initialLoad = async () => {

        const nowPlayingMoviesPromise = UseCases.moviesNowPlayingUseCase(movieDBFetcher)
        const upComingPromise = UseCases.UpComingUseCase(movieDBFetcher);
        const topRatedPromise = UseCases.topRatedUseCase(movieDBFetcher);
        const popularPromise = UseCases.popularUseCase(movieDBFetcher);

        const [nowPlayingMovies, upComingMovies, topRatedMovies, popularMovies] = await Promise.all([
            nowPlayingMoviesPromise,
            upComingPromise,
            topRatedPromise,
            popularPromise,
        ])

        setNowPlaying(nowPlayingMovies)
        setUpComing(upComingMovies)
        setPopular(popularMovies)
        setTopRated(topRatedMovies)

        setIsLoading(false);

    }


    return {
        isLoading,
        nowPlaying,
        upComing,
        topRated,
        popular,

        //Methods
        popularNextPage: async () => {
            popularPage++;
            const popularMovies = await UseCases.popularUseCase(movieDBFetcher, {
                page: popularPage,
            })
            setPopular(prev => [...prev, ...popularMovies]);
        },
        upComingNextPage: async () => {
            upComingPage++;
            const upComingMovies = await UseCases.UpComingUseCase(movieDBFetcher, { page: upComingPage });
            setUpComing(prev => [...prev, ...upComingMovies])
        },
        topRatedNextPage: async () => {
            topRatedPage++;
            const topRatedMovies = await UseCases.topRatedUseCase(movieDBFetcher, { page: topRatedPage })

            setTopRated(prev => [...prev, ...topRatedMovies])
        },
    }
}