import React from "react";
import { StyleSheet, View } from "react-native";
import Animated, { Easing } from "react-native-reanimated";
import { timing } from "react-native-redash";

import CircularProgress from "./CircularProgress";

const { Clock } = Animated;

export default () => {
  const clock = new Clock();
  const config = {
    clock,
    duration: 10 * 1000,
    from: 0,
    to: 1,
    easing: Easing.linear,
  };
  return (
    <View style={styles.container}>
      <CircularProgress progress={timing(config)} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center",
  },
});
