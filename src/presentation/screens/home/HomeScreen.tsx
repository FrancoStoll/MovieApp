import { View } from 'react-native';
import { useMovies } from '../../hooks/useMovies';
import { ScrollView } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { PosterCarousel } from '../../components/movies/PosterCarousel';
import { HorizontalCarousel } from '../../components/movies/HorizontalCarousel';
import { FullScreenLoader } from '../../components/loaders/FullScreenLoader';

export const HomeScreen = () => {
  const {top} = useSafeAreaInsets();

  const {
    isLoading,
    nowPlaying,
    popular,
    topRated,
    upComing,
    popularNextPage,
    upComingNextPage,
    topRatedNextPage,
  } = useMovies();

  if (isLoading) {
    return <FullScreenLoader />
  }

  return (
    <ScrollView>
      <View style={{marginTop: top + 20, paddingBottom: 30}}>
        {/* Principal */}
        <PosterCarousel movies={nowPlaying} />

        {/* Popular */}
        <HorizontalCarousel
          movies={popular}
          title="Populares"
          loadNextPage={popularNextPage}
        />

        {/* TopRated */}
        <HorizontalCarousel
          movies={topRated}
          title="Mejor calificadas"
          loadNextPage={topRatedNextPage}
        />

        {/* upComing */}
        <HorizontalCarousel
          movies={upComing}
          title="Proximamente"
          loadNextPage={upComingNextPage}
        />
      </View>
    </ScrollView>
  );
};
