import React from 'react';
import { Dimensions, View, Text } from 'react-native';

import StyleGuide from '../../components/StyleGuide';
import { FONTS } from '../../utils/fonts';
import { COLORS } from '../../utils/colors';

export const WIDTH = Dimensions.get('window').width;
export const TODO_SIZE_HEIGHT = WIDTH * 0.1;
export const TODO_SIZE_WIDTH = WIDTH / 3;
export const TODO_SIZE_Y = WIDTH * 0.06;
const PLUS_SYMBOL = '+';


interface Todo {
  id: number;
  headline: string;
  description: string;
  time: string;
};

export const todos: Todo[] = [
  {
    id: 1,
    headline: '1 Minum Obat',
    description: 'Minum obat gigi',
    time: '08:00AM'
  },
  {
    id: 2,
    headline: '2 Makan Siang',
    description: 'Makan siang dengan ayam',
    time: '01:00PM'
  },
  {
    id: 3,
    headline: '3 Olahraga Sore',
    description: 'Olahraga sore setelah bekerja',
    time: '05:00PM'
  },
  {
    id: 4,
    headline: '4 Kerja',
    description: 'Minum obat gigi',
    time: '08:00AM'
  },
  {
    id: 5,
    headline: '5 Mencuci',
    description: 'Makan siang dengan ayam',
    time: '01:00PM'
  },
  {
    id: 6,
    headline: '6 Sarapan',
    description: 'Olahraga sore setelah bekerja',
    time: '05:00PM'
  }
];

export interface SmallBoxType {
  todo: Todo;
};

export const SmallBox = ({todo: {headline}}: SmallBoxType) => {
  const primaryColor = COLORS.VERY_LIGHT_RED;
  return(
    <View style={{
      backgroundColor: primaryColor, 
      padding: 10,
      width: '100%',
      borderRadius: 10,
      justifyContent: 'center'
    }}>
        <Text style={[StyleGuide.typography.headline, {color: COLORS.WHITE, fontFamily: FONTS.Bold}]}>{headline}</Text>
    </View>
  );
};

export interface BigBoxType {
  todo: Todo;
};

export const BigBox = (props: BigBoxType) => {
  const {headline, description, time} = props.todo;
  // const primaryColor = isFirst ? COLORS.VERY_LIGHT_RED : COLORS.DARK_MODERATE_VIOLET;
  const primaryColor = COLORS.DARK_MODERATE_VIOLET;
  return(
    <View style={{
      backgroundColor: primaryColor, margin: 10, marginVertical: 5, borderRadius: 10,
      justifyContent: 'center'
    }}>
      <View style={{
        margin: 20, marginBottom: 10,
      }}>
        <Text style={[StyleGuide.typography.headline, {color: COLORS.WHITE, fontFamily: FONTS.Bold}]}>{headline}</Text>
        {/* {isFirst && <Text style={[StyleGuide.typography.body, {color: COLORS.WHITE, marginTop: 5}]}>{description}</Text>} */}
      </View>
      <View style={{
        padding: 10, margin: 20, marginTop: 10, backgroundColor: COLORS.WHITE, borderRadius: 10
      }}>
        <Text style={[StyleGuide.typography.body, {color: primaryColor}]}>{time}</Text>
      </View>
    </View>
  );
};

export const PlusButton = () => {
  return (
    <View style={{
      backgroundColor: COLORS.PURE_RED, borderRadius: 25, width: 50, height: 50,
      justifyContent: 'center', alignItems: 'center',
      shadowColor: COLORS.PURE_RED,
      shadowOffset: { width: 1, height: 1 },
      shadowOpacity: 0.5,
      shadowRadius: 2,
      position: 'absolute',
      bottom: WIDTH / 10,
      left: WIDTH / 2 - 20
    }}>
      <Text style={{color: COLORS.WHITE, fontFamily: FONTS.SemiBold, fontSize: 30}}>{PLUS_SYMBOL}</Text>
    </View>
  );
};
