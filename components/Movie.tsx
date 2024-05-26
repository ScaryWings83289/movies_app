//* Packages Imports */
import React from "react";
import {
  Dimensions,
  Image,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

//* Utils Imports */
import { FALLBACK_POSTER_PATH, IMAGE_185_PATH } from "@Utils/urls";

const { width, height } = Dimensions.get("window");

const Movie = ({
  year = 0,
  data,
  handleScroll = () => {}
}: {
  year?: number;
  data: MoviesType[];
  handleScroll?: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
}) => {
  const navigation = useNavigation();

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={Styles.moviesContainer}
      onScroll={(event) => handleScroll(event)}
      scrollEventThrottle={400}
    >
      {year > 0 && <Text style={Styles.yearText}>{year}</Text>}
      {data?.map((movie) => (
        <TouchableWithoutFeedback
          onPress={() => navigation.navigate("Movie", movie.id)}
          key={movie.id}
        >
          <View style={Styles.movieContainer}>
            <Image
              source={{
                uri:
                  `${IMAGE_185_PATH}${movie.poster_path}` ||
                  FALLBACK_POSTER_PATH,
              }}
              style={Styles.imageContainer}
              alt={movie.title}
            />
            <View style={Styles.textContainer}>
              <Text style={Styles.title}>
                {movie.title.length > 16
                  ? movie.title.slice(0, 16) + "..."
                  : movie.title}
              </Text>
              <Text style={Styles.rating}>{movie.vote_average.toFixed(1)}</Text>
            </View>
          </View>
        </TouchableWithoutFeedback>
      ))}
    </ScrollView>
  );
};

export default Movie;

const Styles = StyleSheet.create({
  moviesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    rowGap: 15,
    columnGap: 15,
    paddingVertical: 15,
  },
  yearText: {
    width: "100%",
    fontSize: 20,
    fontWeight: "600",
    color: "#ffffff",
    paddingHorizontal: 16,
  },
  movieContainer: {
    position: "relative",
  },
  imageContainer: {
    borderRadius: 4,
    width: width * 0.44,
    height: height * 0.25,
  },
  textContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: width * 0.44,
    bottom: 0,
    paddingHorizontal: 2,
    paddingVertical: 2,
  },
  title: {
    fontSize: 14,
    color: "#ffffff",
  },
  rating: {
    fontSize: 10,
    color: "#ffffff",
  },
});
