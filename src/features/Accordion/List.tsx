import React, { useState } from 'react';
import { StyleSheet, TouchableWithoutFeedback } from 'react-native';

import Animated, { Easing } from 'react-native-reanimated';
import { bInterpolate, bin, useTransition} from 'react-native-redash';
import Chevron from './Chevron';
import { Text } from '../../components';
import { COLORS } from '../../utils/colors';
import Item, { ListItem } from './ListItem';
import { LIST_ITEM_HEIGHT } from '../../utils/statics';

const { not, interpolate } = Animated;
const Styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.WHITE,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 16,
    padding: 16,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8
  },
  items: {
    overflow: 'hidden'
  }
})

export interface List {
  name: string;
  items: ListItem[];
};

interface ListProps {
  list: List;
};

export default ({ list }: ListProps) => {
  const lengthItems = list.items.length;
  const [open, setOpen] = useState(true);
  const transition = useTransition(
    open,
    not(bin(open)),
    bin(open),
    400,
    Easing.inOut(Easing.ease)
  );
  const height = bInterpolate(
    transition,
    0,
    LIST_ITEM_HEIGHT * lengthItems,
  );
  const bottomRadius = interpolate(transition, {
    inputRange: [0, 16 / 400],
    outputRange: [8, 0]
  });
  const handleOpenAccordion = () => setOpen(prev => !prev);
  return (
    <>
      <TouchableWithoutFeedback onPress={handleOpenAccordion}>
        <Animated.View
            style={[
              Styles.container,
              {
                borderBottomLeftRadius: bottomRadius,
                borderBottomRightRadius: bottomRadius
              }
            ]}
          >
            <Text type="calloutbold">
              {list.name}
            </Text>
            <Chevron {...{ transition }} />
          </Animated.View>
      </TouchableWithoutFeedback>
      <Animated.View style={[Styles.items, { height }]}>
        {list.items.map((item, key) => (
          <Item {...{ item, key }} isLast={key === lengthItems} />
        ))}
      </Animated.View>
    </>
  )
};
