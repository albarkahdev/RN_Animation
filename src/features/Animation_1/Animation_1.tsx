import React from 'react';
import { SafeAreaView, View, Text } from 'react-native';
import { Agenda } from 'react-native-calendars';
import Animated from 'react-native-reanimated';

import StyleGuide from '../../components/StyleGuide';
import { FONTS } from '../../utils/fonts';
import { COLORS } from '../../utils/colors';

import { TODO_SIZE_Y, todos, PlusButton } from './Todo';
import { SortableList } from './SortableList';

const { Value } = Animated;

export default () => {
  const offsets = todos.map((_, index) => ({
    x: new Value(0),
    y: new Value(index * 2 * TODO_SIZE_Y)
  }));
  return (
    <SafeAreaView style={{flex: 1}}>
    <View style={{flex: 1, backgroundColor: COLORS.WHITE}}>
      <View style={{margin: 10, marginLeft: 20}}>
        <Text style={[StyleGuide.typography.title1_5, {fontFamily: FONTS.Regular}]}>December</Text>
        <Text style={StyleGuide.typography.title2}>Today</Text>
      </View>
      <Agenda
        items={{}}
        // Max amount of months allowed to scroll to the past. Default = 50
        pastScrollRange={50}
        // Max amount of months allowed to scroll to the future. Default = 50
        futureScrollRange={50}
        // specify how each item should be rendered in agenda
        renderItem={(item, firstItemInDay) => {return (<View />);}}
        // specify how each date should be rendered. day can be undefined if the item is not first in that day.
        renderDay={(day, item) => {return (<View />);}}
        // specify how empty date content with no items should be rendered
        renderEmptyDate={() => {return (<View />);}}
        // specify how agenda knob should look like
        renderKnob={() => {return (<View />);}}
        // specify what should be rendered instead of ActivityIndicator
        renderEmptyData = {() => {return (<View />);}}
        // specify your item comparison function for increased performance
        rowHasChanged={(r1, r2) => {return r1.text !== r2.text}}
        // Hide knob button. Default = false
        hideKnob={true}
        // Add a custom RefreshControl component, used to provide pull-to-refresh functionality for the ScrollView.
        refreshControl={null}
        // agenda theme
        theme={{
          // ...calendarTheme,
          backgroundColor: COLORS.WHITE,
          // calendarBackground: '#ffffff',
          agendaDayTextColor: 'yellow',
          agendaDayNumColor: 'green',
          agendaTodayColor: 'red',
          agendaKnobColor: 'blue'
        }}
        // agenda container style
        style={{backgroundColor: COLORS.WHITE}}
      />
      <View style={{flex: 5.5}}>
        {todos.map((todo, index) => (
          <SortableList key={todo.id} {...{ todo, offsets, index }} />
        ))}
        <PlusButton />
      </View>
    </View>
    </SafeAreaView>
  )
};
