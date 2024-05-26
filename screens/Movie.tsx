//* Packages Imports */
import React, { useEffect, useState } from "react";
import {
  Dimensions,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import axios from "axios";

//* Components Imports */
import Loader from "@Components/Loader";

//* Utils Imports */
import {
  FALLBACK_MOVIE_POSTER_PATH,
  IMAGE_500_PATH,
  MOVIE_PATH,
} from "@Utils/urls";
import { MOVIE_DATA } from "@Data/Movies";

const { width, height } = Dimensions.get("window");

const Movie = () => {
  const { params } = useRoute();
  const navigation = useNavigation();
  const [movie, setMovie] = useState<MovieType | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  //* Fetch Movie Data
  const getMovieData = async () => {
    try {
      const response = await axios.get(MOVIE_PATH(params as unknown as number));
      const data = await response.data;
      setMovie(data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getMovieData();

    //* This is to populate data in case API fails to fetch data
    setTimeout(() => {
      setLoading(false);
      setMovie(MOVIE_DATA[params as unknown as string] || MOVIE_DATA["940721"]);
    }, 2000);
  }, []);

  return (
    <ScrollView contentContainerStyle={Styles.movieContainer}>
      <View style={{ width: "100%" }}>
        <SafeAreaView style={Styles.safeAreaContainer}>
          <TouchableOpacity
            style={Styles.iconContainer}
            onPress={() => navigation.goBack()}
          >
            <Text style={Styles.chevronText}>{"<"}</Text>
          </TouchableOpacity>
        </SafeAreaView>

        {loading ? (
          <Loader />
        ) : (
          <View>
            <Image
              source={{
                uri:
                  `${IMAGE_500_PATH}${movie?.poster_path}` ||
                  FALLBACK_MOVIE_POSTER_PATH,
              }}
              style={{ width, height: height * 0.55 }}
            />
            <LinearGradient
              colors={[
                "transparent",
                "rgba(23, 23, 23, 0.8)",
                "rgba(23, 23, 23, 1)",
              ]}
              style={Styles.linearGradient}
              start={{ x: 0.5, y: 0 }}
              end={{ x: 0.5, y: 1 }}
            />
          </View>
        )}
      </View>

      {!loading && (
        <View style={Styles.detailsContainer}>
          <Text style={Styles.titleContainer}>{movie?.title}</Text>

          {movie?.id && (
            <Text style={Styles.statusContainer}>
              {movie?.status} • {movie?.release_date?.split("-")[0] || "N/A"} •{" "}
              {movie?.runtime} min
            </Text>
          )}

          <View style={Styles.genreContainer}>
            {movie?.genres?.map((genre, index) => (
              <Text key={genre.id} style={Styles.genreText}>
                {genre.name} {index !== movie.genres.length - 1 ? "•" : null}
              </Text>
            ))}
          </View>

          <Text style={Styles.description}>{movie?.overview}</Text>
        </View>
      )}
    </ScrollView>
  );
};

export default Movie;

const Styles = StyleSheet.create({
  movieContainer: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#242424",
    color: "#ffffff",
    paddingBottom: 10,
    width: "100%",
    position: "relative",
  },
  safeAreaContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    position: "absolute",
    width: "100%",
    zIndex: 20,
    paddingHorizontal: 10,
    marginTop: Platform.OS == "ios" ? 4 : 0,
  },
  iconContainer: {
    width: 30,
    borderRadius: 4,
    padding: 4,
    backgroundColor: "#eab308",
  },
  chevronText: {
    textAlign: "center",
    fontSize: 16,
    color: "#ffffff",
  },
  linearGradient: {
    width: "100%",
    height: height * 0.4,
    position: "absolute",
    bottom: 0,
  },
  detailsContainer: {
    marginVertical: 4,
  },
  titleContainer: {
    fontSize: 30,
    fontWeight: "700",
    color: "#ffffff",
    textAlign: "center",
    letterSpacing: 0.05,
    marginBottom: 5,
  },
  statusContainer: {
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
    color: "#9ca3af",
  },
  genreContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    marginHorizontal: 1,
    marginBottom: 5,
  },
  genreText: {
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
    color: "#9ca3af",
  },
  description: {
    marginHorizontal: 1,
    color: "#9ca3af",
    letterSpacing: 0.05,
  },
});
