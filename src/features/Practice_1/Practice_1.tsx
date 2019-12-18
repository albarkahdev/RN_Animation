import React, { useState } from 'react';
import {StyleSheet, View, TouchableWithoutFeedback, Text} from 'react-native';

import Animated, { Easing } from 'react-native-reanimated';
import { bInterpolate, bin, useTransition} from 'react-native-redash';
import { FONTS } from '../../utils/fonts';

const { not } = Animated;
const COLOR_OPTION = {
  FLAT_FLASH: '#fad390',
  MELON_MELODY: '#f8c291',
  LIVID: '#6a89cc',
  SPRAY: '#82ccdd',
  PARADISE_GREEN: '#b8e994'
}

interface ColoSwitchProps {
  color: string;
  currentColor: string;
  changeColor: Function;
}

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  containerColorBox: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
    paddingTop: 50
  },
  colorBox: {
    width: 200,
    height: 200,
    borderRadius: 5,
    margin: 20,
    elevation: 3,
    shadowOpacity: 0.3,
    shadowRadius: 3,
    shadowOffset: {
      height: 0,
      width: 0
    }
  },
  colorSwitch: {
    width: 30,
    height: 30,
    borderRadius: 25
  },
  title: {
    fontSize: 20,
    fontFamily: FONTS.Bold,
    marginBottom: 25
  },
  containerChooseColor: {
    padding: 25
  },
  containerColorSwitch: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: 250
  }
})

const ColoSwitch = ({color, currentColor, changeColor}: ColoSwitchProps) => {
  const isChoosen = color === currentColor;
  // const scale = isChoosen ? 1.5 : 1;
  const transition = useTransition(
    isChoosen,
    not(bin(isChoosen)),
    bin(isChoosen),
    200,
    Easing.inOut(Easing.ease)
  );
  const scale = bInterpolate(
    transition,
    1.5,
    1
  );
  return (
    <TouchableWithoutFeedback onPress={() => changeColor(color)}>
      <Animated.View
        style={[
          Styles.colorSwitch,
          {
            backgroundColor: color,
            transform: [
              {
                scale
              }
            ]
          }
        ]}
      />
    </TouchableWithoutFeedback>
  )
}

export default () => {
  const [color, setColor] = useState('#fff');
  const changeColor = (clr: string) => setColor(clr);
  return (
    <View style={Styles.container}>
      <View style={Styles.containerColorBox}>
        <View style={[Styles.colorBox, { backgroundColor: color }]} />
      </View>
      <View style={Styles.containerChooseColor}>
        <Text style={Styles.title}>Choose Color</Text>
        <View style={Styles.containerColorSwitch}>
          <ColoSwitch
            color={COLOR_OPTION.FLAT_FLASH}
            currentColor={color}
            changeColor={changeColor}
          />
          <ColoSwitch
            color={COLOR_OPTION.MELON_MELODY}
            currentColor={color}
            changeColor={changeColor}
          />
          <ColoSwitch
            color={COLOR_OPTION.LIVID}
            currentColor={color}
            changeColor={changeColor}
          />
          <ColoSwitch
            color={COLOR_OPTION.SPRAY}
            currentColor={color}
            changeColor={changeColor}
          />
          <ColoSwitch
            color={COLOR_OPTION.PARADISE_GREEN}
            currentColor={color}
            changeColor={changeColor}
          />
        </View>
      </View>
    </View>
  )
};
