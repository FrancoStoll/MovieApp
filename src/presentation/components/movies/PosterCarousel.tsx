import {Text, View} from 'react-native';
import {Movie} from '../../../core/entities/movie.entity';
import {ScrollView} from 'react-native-gesture-handler';
import {MoviePoster} from './MoviePoster';

interface Props {
  movies: Movie[];
  height?: number;
}

export const PosterCarousel = ({height = 440, movies}: Props) => {
  return (
    <View style={{height: height}}>
      <ScrollView showsHorizontalScrollIndicator={false} horizontal>
        {movies.map(movie => (
          <MoviePoster movie={movie} key={movie.id} />
      
        ))}
      </ScrollView>
    </View>
  );
};
