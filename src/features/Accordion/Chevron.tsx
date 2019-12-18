import React from 'react';
import { StyleSheet } from 'react-native';
import { Feather as Icon } from "@expo/vector-icons";

import Animated from 'react-native-reanimated';
import { bInterpolate, bInterpolateColor } from 'react-native-redash';
import { COLORS } from '../../utils/colors';
import { CONTAINER_ICON_SIZE, ICON_SIZE } from '../../utils/statics';

const { interpolate } = Animated;
const Styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.BLUE,
    height: CONTAINER_ICON_SIZE,
    width: CONTAINER_ICON_SIZE,
    borderRadius: CONTAINER_ICON_SIZE / 2,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

interface ChevronProps {
  transition: Animated.Value<number>;
};

export default ({ transition }: ChevronProps) => {
  const rotateZ = bInterpolate(transition, 0, Math.PI);
  // const rotateZ = interpolate(transition, {
  //   inputRange: [0, 0.8],
  //   outputRange: [0, Math.PI / 2]
  // });
  const backgroundColor = bInterpolateColor(
    transition,
    { r: 228, g: 86, b: 69 },
    { r: 82, g: 82, b: 81 }
  ) as Animated.Node<number>;
  return (
    <Animated.View
      style={[Styles.container, { transform: [{ rotateZ }], backgroundColor}]}
    >
      <Icon name="chevron-down" color={COLORS.WHITE} size={ICON_SIZE} />
    </Animated.View>
  )
}
