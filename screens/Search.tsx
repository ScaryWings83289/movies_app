//* Packages Imports */
import React, { useCallback, useEffect, useState } from "react";
import {
  Image,
  SafeAreaView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

//* Components Imports */
import Loader from "@Components/Loader";
import Movie from "@Components/Movie";

//* Utils Imports */
import debounce from "@Utils/debounce";
import { SEARCH_PATH } from "@Utils/urls";
import { DUMMY_SEARCH_DATA } from "@Data/Movies";

//* Assets Imports */
import Close from "@Assets/icons/close.png";

const Search = () => {
  const navigation = useNavigation();
  const [results, setResults] = useState<MoviesType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  //* Handle Search Input Change
  const handleSearch = async (value: string) => {
    if (value && value.length > 2) {
      setLoading(true);
      try {
        const response = await axios.get(
          `${SEARCH_PATH}&query=${value}&include_adult=false&language=en-US&page=1`
        );
        const data = await response.data;
        setResults(data.results);
        setLoading(false);
      } catch (error) {
        console.log("hii");
        console.error(error);
        setLoading(false);
        setResults([]);
      }
    } else {
      setLoading(false);
      setResults([]);
    }
  };

  //* Debounce Search
  const handleTextInput = useCallback(debounce(handleSearch, 400), []);

  useEffect(() => {
    //* This is to populate data in case API fails to fetch data
    //* Comment this if you're using VPN
    setTimeout(() => {
      setLoading(false);
      setResults(DUMMY_SEARCH_DATA);
    }, 8000);
  }, [loading]);

  return (
    <SafeAreaView style={Styles.searchContainer}>
      <View style={Styles.inputContainer}>
        <TextInput
          onChangeText={handleTextInput}
          placeholder="Search Movie"
          placeholderTextColor={"lightgray"}
          style={Styles.textInput}
        />
        <TouchableOpacity
          onPress={() => navigation.navigate("Home")}
          style={Styles.closeContainer}
        >
          <Image source={Close} style={Styles.closeIcon} />
        </TouchableOpacity>
      </View>

      {loading ? <Loader /> : <Movie  data={results} />}
    </SafeAreaView>
  );
};

export default Search;

const Styles = StyleSheet.create({
  searchContainer: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#242424",
    paddingTop: 40,
  },
  inputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 16,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: "#737373",
    borderRadius: 9999,
  },
  textInput: {
    flex: 1,
    paddingLeft: 20,
    fontSize: 16,
    fontWeight: "600",
    color: "#ffffff",
    letterSpacing: 0.5,
  },
  closeContainer: {
    borderRadius: 9999,
    padding: 4,
    margin: 4,
    backgroundColor: "#737373",
  },
  closeIcon: {
    width: 24,
    height: 24,
  },
});
