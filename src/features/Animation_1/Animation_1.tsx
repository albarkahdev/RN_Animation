import React from 'react';
import {Dimensions, SafeAreaView, View, Text} from 'react-native';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';

import StyleGuide from '../../components/StyleGuide';
import {FONTS} from '../../utils/fonts';
import {COLORS} from '../../utils/colors';

const { width } = Dimensions.get('window');
export default () => {
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
        <BigBox
          headline="Group Meeting"
          description="Make a long-term plan for the company"
          time="8:00AM"
          isFirst
        />
        <BigBox
          headline="Develop A Work Plan"
          description=""
          time="9:00AM"
          isFirst={false}
        />
        <SmallBox headline="Making Salad" isFirst />
        <SmallBox headline="Take Medicine" isFirst={false} />
        <View style={{
          backgroundColor: COLORS.PURE_RED, borderRadius: 25, width: 50, height: 50,
          justifyContent: 'center', alignItems: 'center',
          shadowColor: COLORS.PURE_RED,
          shadowOffset: { width: 1, height: 1 },
          shadowOpacity: 0.5,
          shadowRadius: 2,
          position: 'absolute',
          bottom: width / 10,
          left: width / 2 - 20
        }}>
          <Text style={{color: COLORS.WHITE, fontFamily: FONTS.SemiBold, fontSize: 30}}>+</Text>
        </View>
      </View>
    </View>
    </SafeAreaView>
  )
};

interface BigBoxType {
  headline: string;
  description: string;
  time: string;
  isFirst: boolean;
};

const BigBox = (props: BigBoxType) => {
  const {headline, description, time, isFirst} = props;
  const primaryColor = isFirst ? COLORS.VERY_LIGHT_RED : COLORS.DARK_MODERATE_VIOLET;
  return(
    <View style={{
      backgroundColor: primaryColor, margin: 10, marginVertical: 5, borderRadius: 10,
      justifyContent: 'center', alignItems: 'left'
    }}>
      <View style={{
        // padding: 10,
        margin: 20, marginBottom: 10,
      }}>
        <Text style={[StyleGuide.typography.headline, {color: COLORS.WHITE, fontFamily: FONTS.Bold}]}>{headline}</Text>
        {isFirst && <Text style={[StyleGuide.typography.body, {color: COLORS.WHITE, marginTop: 5}]}>{description}</Text>}
      </View>
      <View style={{
        padding: 10, margin: 20, marginTop: 10, backgroundColor: COLORS.WHITE, borderRadius: 10
      }}>
        <Text style={[StyleGuide.typography.body, {color: primaryColor}]}>{time}</Text>
      </View>
    </View>
  );
};

interface SmallBoxType {
  headline: string;
  isFirst: boolean;
};

const SmallBox = (props: SmallBoxType) => {
  const {headline, isFirst} = props;
  const primaryColor = isFirst ? COLORS.VERY_LIGHT_RED : COLORS.VERY_LIGHT_ORANGE;
  return(
    <View style={{
      backgroundColor: primaryColor, margin: 10, marginVertical: 5, borderRadius: 10,
      justifyContent: 'center', alignItems: 'left'
    }}>
      <View style={{margin: 20}}>
        <Text style={[StyleGuide.typography.headline, {color: COLORS.WHITE, fontFamily: FONTS.Bold}]}>{headline}</Text>
      </View>
    </View>
  );
};
