import React from 'react';
import Animated from 'react-native-reanimated';
import { PanGestureHandler, State } from 'react-native-gesture-handler';
import { moving, panGestureHandler } from 'react-native-redash';
import Tab, { TAB_SIZE, TabProps } from './Tab';

const {
  Value,
  add,
  eq,
  cond,
  and,
  set,
  divide,
  multiply,
  max,
  floor,
  useCode,
  block
} = Animated;

interface SortableCardProps extends TabProps {
  index: number;
  offsets: { x: Animated.Value<number>, y: Animated.Value<number> }[];
};

export const withSnap = ({
  offset,
  value,
  state
}: {
  offset: Animated.Value<number>,
  value: Animated.Value<number>,
  state: Animated.Value<State>,
}) => {
  const safeOffset = new Value(0);
  return cond(
    eq(state, State.ACTIVE),
    add(safeOffset, value),
    [
      set(safeOffset, offset),
      safeOffset
    ]
  )
};

export default ({ tab, offsets, index }: SortableCardProps) => {
  const {
    gestureHandler,
    state,
    translationX,
    translationY
  } = panGestureHandler();
  const zIndex = cond(eq(state, State.ACTIVE), 10, 1);
  const currentOffset = offsets[index];
  // Position how far the bpx move
  const translateX = withSnap({
    value: translationX,
    offset: currentOffset.x,
    state
  });
  const translateY = withSnap({
    value: translationY,
    offset: currentOffset.y,
    state
  });
  // Position who offset current box that move
  const offsetX = multiply(
    max(floor(divide(translateX, TAB_SIZE)), 0),
    TAB_SIZE
  );
  const offsetY = multiply(
    max(floor(divide(translateY, TAB_SIZE)), 0),
    TAB_SIZE
  );
  // Swap offset selected box to the current position box
  useCode(block(
    offsets.map(offset => 
      cond(
        and(
          eq(offsetX, offset.x),
          eq(offsetY, offset.y),
          eq(state, State.ACTIVE)
        ),
        [
          set(offset.x, currentOffset.x),
          set(offset.y, currentOffset.y),
          set(currentOffset.x, offsetX),
          set(currentOffset.y, offsetY)
        ]
      )
    )
  ), []);
  return (
    <PanGestureHandler {...gestureHandler}>
      <Animated.View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: TAB_SIZE,
          height: TAB_SIZE,
          justifyContent: 'center',
          alignItems: 'center',
          transform: [{ translateX }, { translateY }],
          zIndex
        }}
      >
        <Tab {...{ tab }} />
      </Animated.View>
    </PanGestureHandler>
  )
}