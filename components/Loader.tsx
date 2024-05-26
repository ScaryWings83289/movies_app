//* Packages Imports */
import React from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import { CircleSnail } from "react-native-progress";

const { width, height } = Dimensions.get("window");

const Loader = () => (
  <View style={Styles.loader}>
    <CircleSnail thickness={5} size={100} color="#fff" />
  </View>
);

export default Loader;

const Styles = StyleSheet.create({
  loader: {
    position: "absolute",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height,
    width,
  },
});
