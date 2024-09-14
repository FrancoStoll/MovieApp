import { StackScreenProps } from '@react-navigation/stack';
import { ScrollView } from 'react-native';
import { RootStackParams } from '../../navigation/Navigation';
import { useMovie } from '../../hooks/useMovie';
import { MovieHeader } from '../../components/movies/movie/MovieHeader';
import { MovieDetails } from '../../components/movies/movie/MovieDetails';
import { FullScreenLoader } from '../../components/loaders/FullScreenLoader';

interface Props extends StackScreenProps<RootStackParams, 'Details'> {}

export const DetailsScreen = ({route}: Props) => {
  const {movieId} = route.params;
  const {isLoading, fullMovie, cast} = useMovie(movieId);

  if (isLoading) return <FullScreenLoader />

  return (
    <ScrollView>
      <MovieHeader
        poster={fullMovie?.poster!}
        title={fullMovie?.title!}
        originalTitle={fullMovie?.originalTitle!}
      />

      <MovieDetails movie={fullMovie!} cast={cast!}/>
    </ScrollView>
  );
};
