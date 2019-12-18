import React from 'react';
import { StyleSheet, View } from 'react-native';

import { Text } from '../../components';
import { COLORS } from '../../utils/colors';
import { LIST_ITEM_HEIGHT } from '../../utils/statics';

const Styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.WHITE,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderColor: '#f4f4f6',
    height: LIST_ITEM_HEIGHT
  },
  pointsContainer: {
    backgroundColor: '#44c282',
    padding: 8,
    borderRadius: 8
  }
})

export interface ListItem {
  name: string;
  points: string;
};

interface ListItemProps {
  item: ListItem;
  isLast: boolean;
}

export default ({ item, isLast }: ListItemProps) => {
  const bottomRadius = isLast ? 8 : 0;
  return (
    <View
      style={[
        Styles.container,
        {
          borderBottomLeftRadius: bottomRadius,
          borderBottomRightRadius: bottomRadius
        }
      ]}
    >
      <Text type="callout">{item.name}</Text>
      <View style={Styles.pointsContainer}>
        <Text type="price" dark>{item.points}</Text>
      </View>
    </View>
  )
}
