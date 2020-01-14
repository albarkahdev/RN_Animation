import React from 'react';
import { StatusBar } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import { LoadAssets, StyleGuide } from './src/components';
import {COLORS} from './src/utils/colors';
import Home, { examples } from './src/features/Home';
import TinderSwiping, { profiles } from './src/features/TinderSwiping'
import Chrome, { assets as chromeAssets } from './src/features/Chrome';
import Accordion from './src/features/Accordion';
import AngularGradient from './src/features/AngularGradient';
import Animation_1 from './src/features/Animation_1';
import CircularProgress from './src/features/CircularProgress';
import InstagramStories, { avatarStories, storyAssets } from './src/features/InstagramStories';
import FlutterAnimation, { sectionAsset } from './src/features/FlutterAnimation';
import PetAnimal, { animalAsset, iconPetAnimal } from './src/features/PetAnimal';
const assets = [
  ...examples.map(example => example.source),
  ...profiles.map(profile => profile.profile),
  ...chromeAssets,
  ...avatarStories,
  ...storyAssets,
  ...sectionAsset,
  ...animalAsset,
  ...iconPetAnimal
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
        screen: PetAnimal,
        navigationOptions: {
          headerShown: false
          // title: "Chrome Tab Animation"
        }
      },
      AngularGradient: {
        screen: CircularProgress,
        navigationOptions: {
          title: "Angular Gradient"
        }
      },
      Accordion: {
        screen: Accordion,
        navigationOptions: {
          title: "Accordion"
        }
      },
      Todo: {
        screen: Animation_1,
        navigationOptions: {
          title: "Todo"
        }
      }
    },
    {
      defaultNavigationOptions: {
        headerStyle: {
          backgroundColor: COLORS.BLUE,
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

