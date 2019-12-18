import React from 'react';
import { StatusBar } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import { LoadAssets, StyleGuide } from './src/components';
import Home, { examples } from './src/features/Home';
import TinderSwiping, { profiles } from './src/features/TinderSwiping'
import Accordion from './src/features/Accordion';
import AngularGradient from './src/features/AngularGradient';
import Scale from './src/features/Scale/Scale';

const assets = [
  ...examples.map(example => example.source),
  ...profiles.map(profile => profile.profile),
];
const fonts = {
  "SFProText-Bold": require("./assets/fonts/SF-Pro-Text-Bold.otf"),
  "SFProText-Semibold": require("./assets/fonts/SF-Pro-Text-Semibold.otf"),
  "SFProText-Regular": require("./assets/fonts/SF-Pro-Text-Regular.otf")
};

const AppNavigator = createAppContainer(
  createStackNavigator(
    {
      Home: {
        screen: Scale,
        navigationOptions: {
          title: 'Clone the 5 min RN',
          headerBackTitle: null
        }
      },
      AngularGradient: {
        screen: AngularGradient,
        navigationOptions: {
          title: "Angular Gradient"
        }
      },
      Accordion: {
        screen: Accordion,
        navigationOptions: {
          title: "Accordion"
        }
      }
    },
    {
      defaultNavigationOptions: {
        headerStyle: {
          backgroundColor: StyleGuide.palette.primary,
          borderBottomWidth: 0
        },
        headerTintColor: 'white'
      }
    }
  )
)

export default () => (
  <LoadAssets {...{ assets, fonts }}>
    <StatusBar barStyle="light-content" />
    <AppNavigator />
  </LoadAssets>
)

