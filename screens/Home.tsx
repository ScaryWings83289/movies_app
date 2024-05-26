//* Packages Imports */
import React, { useEffect, useState } from "react";
import {
  Image,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import axios from "axios";

//* Components Imports */
import Loader from "@Components/Loader";
import Movie from "@Components/Movie";

//* Utils Imports */
import { MOVIES_PATH, GENRE_PATH } from "@Utils/urls";
import { GENRE_DATA, GENRE_MOVIES_DATA, MOVIES_DATA } from "@Data/Movies";

//* Assets Imports */
import MovieFix from "@Assets/icons/moviefix.png";
import Search from "@Assets/icons/search.png";

const Home = () => {
  const navigation = useNavigation();
  const [movies, setMovies] = useState<MoviesType[]>([]);
  const [genres, setGenres] = useState<GenreType[]>([]);
  const [activeGenre, setActiveGenre] = useState<number>(0);
  const [currentYear, setCurrentYear] = useState<number>(2012);
  const [loading, setLoading] = useState<boolean>(true);

  //* Fetch Movies on the basis of year
  const MOVIES_API = (year: number) =>
    `${MOVIES_PATH}&sort_by=popularity.desc&primary_release_year=${year}&page=1&vote_count.gte=100`;

  //* Fetch movies from API */
  const getMoviesData = async (year: number) => {
    try {
      const response = await axios.get(MOVIES_API(year));
      const data = await response.data;
      setMovies(data.results);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setMovies(MOVIES_DATA);
      setLoading(false);
    }
  };

  //* Handle Scroll data
  const handleScrollEnd = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const { contentOffset, layoutMeasurement, contentSize } = event.nativeEvent;
    const paddingToBottom = 200;
    if (
      layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom
    ) {
      //* End of scroll reached, load more data
      getMoviesData(currentYear + 1);
      setCurrentYear(currentYear + 1);
    }
  };

  //* Fetch All Genre Data
  const getGenreData = async () => {
    try {
      const response = await axios.get(GENRE_PATH);
      const data = await response.data;
      setGenres([{ id: 0, name: "All" }, ...data.genres]);
    } catch (error) {
      console.error(error);
      setGenres(GENRE_DATA);
    }
  };

  //* Fetch Movies on the basis of Genre
  const handleGenre = async (id: number) => {
    setLoading(true);
    setActiveGenre(id);
    if (id === 0) {
      return;
    }

    try {
      const response = await axios.get(`${MOVIES_API(currentYear)}&with_genres=${id}`);
      const data = await response.data;
      setMovies(data.results);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setMovies(GENRE_MOVIES_DATA[id] || MOVIES_DATA);
      setLoading(false);
    }
  };

  useEffect(() => {
    getMoviesData(currentYear);
    getGenreData();

    //* This is to populate data in case API fails to fetch data
    setTimeout(() => {
      setLoading(false);
      setMovies(MOVIES_DATA);
      setGenres(GENRE_DATA);
    }, 4000);
  }, []);

  useEffect(() => {
    //* This is to populate data in case API fails to fetch data
    setTimeout(() => {
      setLoading(false);
      setMovies(GENRE_MOVIES_DATA[activeGenre] || MOVIES_DATA);
    }, 3000);
  }, [activeGenre]);

  return (
    <View style={Styles.rootContainer}>
      {/* //* Logo and searchbar */}
      <SafeAreaView>
        <StatusBar style="light" />
        <View style={Styles.container}>
          <Image source={MovieFix} style={Styles.logo} />
          <TouchableOpacity
            style={Styles.searchIconContainer}
            onPress={() => navigation.navigate("Search")}
          >
            <Image source={Search} style={Styles.searchIcon} />
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={Styles.genreContainer}
      >
        {genres?.map((genre) => (
          <TouchableOpacity
            key={genre.id}
            onPress={() => handleGenre(genre.id)}
          >
            <Text
              style={StyleSheet.compose(
                Styles.genre,
                genre.id === activeGenre ? Styles.active : null
              )}
            >
              {genre.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {loading ? (
        <Loader />
      ) : (
        <Movie
          year={currentYear}
          data={movies.slice(0, 8)}
          handleScroll={handleScrollEnd}
        />
      )}
    </View>
  );
};

export default Home;

const Styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#242424",
    color: "#ffffff",
  },
  container: {
    width: "100%",
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    height: 50,
    paddingHorizontal: 16,
    paddingVertical: 16,
    marginBottom: 3,
  },
  logo: {
    width: 120,
    height: 30,
  },
  searchIconContainer: {
    padding: 4,
  },
  searchIcon: {
    width: 24,
    height: 24,
  },
  genreContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    columnGap: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    height: 60,
  },
  genre: {
    borderRadius: 4,
    backgroundColor: "#484848",
    paddingVertical: 6,
    paddingHorizontal: 16,
    color: "#ffffff",
  },
  active: {
    backgroundColor: "#F0283C",
  },
});
