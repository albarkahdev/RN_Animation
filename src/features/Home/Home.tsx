import * as React from "react";
import { ScrollView, StyleSheet } from "react-native";

import {
  NavigationScreenConfigProps,
  NavigationScreenProp
} from "react-navigation";
import { StyleGuide, Thumbnail } from "../../components";

export const examples = [
  {
    screen: 'AngularGradient',
    title: 'Angular Gradient',
    source: require('../../../assets/examples/angular-gradient.png')
  },
  {
    screen: 'Accordion',
    title: 'Accordion',
    source: require('../../../assets/examples/accordion.png')
  },
  {
    screen: 'Todo',
    title: 'Todo',
    source: require('../../../assets/examples/todo.jpg')
  }
];

const styles = StyleSheet.create({
  container: {
    backgroundColor: StyleGuide.palette.background
  },
  content: {
    paddingBottom: 32
  }
});

export default ({
  navigation
}: NavigationScreenConfigProps<NavigationScreenProp<{}>>) => {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {examples.map(thumbnail => (
        <Thumbnail
          key={thumbnail.screen}
          onPress={() => navigation.navigate(thumbnail.screen)}
          {...thumbnail}
        />
      ))}
    </ScrollView>
  );
};
