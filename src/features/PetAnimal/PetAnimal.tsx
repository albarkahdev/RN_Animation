import React, { useState } from 'react';
import {
  Dimensions,
  StyleSheet,
  ScrollView,
  View,
  TouchableWithoutFeedback,
  Text,
  Image
} from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { interpolateColor, bInterpolate } from 'react-native-redash';
import Animated from 'react-native-reanimated';
import { stories } from '../InstagramStories/InstagramStories';
import { icons } from './icons';
import { cats, Cat } from './animals';


const {
  Value,
  set,
  cond,
  eq,
  useCode,
  Clock,
  startClock,
  block
} = Animated;

const BorderRadius = 8;
const { width } = Dimensions.get('window');

interface Category {
  id: number;
  name: string;
  source: number;
}

const categories: Category[] = [
  {
    id: 1,
    name: 'Cats',
    source: icons.cat
  },
  {
    id: 2,
    name: 'Dogs',
    source: icons.dog
  },
  {
    id: 3,
    name: 'Parrots',
    source: icons.parrot
  },
  {
    id: 4,
    name: 'Bunnies',
    source: icons.bunny
  },
  {
    id: 5,
    name: 'Cats',
    source: icons.cat
  },
  {
    id: 6,
    name: 'Dogs',
    source: icons.dog
  },
  {
    id: 7,
    name: 'Parrots',
    source: icons.parrot
  },
  {
    id: 8,
    name: 'Bunnies',
    source: icons.bunny
  }
];

export default () => {
  const placeholder = 'Search pet to adopt';
  return (
    <SafeAreaView style={{ flex: 1 }} forceInset={{bottom: 'never'}}>
      <View style={styles.container}>
        <Header />
        <View style={styles.content}>
          <SearchInput placeholder={placeholder} />
          <ListCategory />
          <View style={styles.containerListDescription}>
            {
              cats.map((cat, index) => (<CardAnimal key={index} cat={cat} />))
            }
          </View>
        </View>
      </View>
    </SafeAreaView>
  )
};

const Header = () => {
  // const animateVal
  return (
    <View style={styles.header}>
      <View style={styles.left}>
        <Image source={icons.menu} style={styles.menu} />
      </View>
      <View style={styles.center}>
        <Text style={styles.locationTitle}>Location</Text>
        <View style={styles.placeArea}>
          <Image source={icons.marker} style={styles.marker} />
          <Text style={styles.location}><Text style={styles.bold}>Kyiv,</Text> Ukraine</Text>
        </View>
      </View>
      <View style={styles.right}>
        <Image source={stories[3].avatar} style={styles.avatar} />
      </View>
    </View>
  );
};

const SearchInput = ({placeholder}: {placeholder: string}) => {
  return (
    <View style={styles.search}>
      <View style={[styles.left, styles.left2side]}>
        <Image source={icons.search} style={styles.iconSearch} />
        <Text style={styles.placeholder}>{placeholder}</Text>
      </View>
      <View style={[styles.right, styles.right2side]}>
        <Image source={icons.filter} style={styles.iconFilter} />
      </View>
    </View>
  );
};

interface CategoryBoxProps extends Category {
  index: number;
  indexCategory: number;
  setIndexCategory: Function;
}

const CategoryBox = ({index, name, source, indexCategory, setIndexCategory}: CategoryBoxProps) => {
  const isFirst = index === 0;
  const isSelected = indexCategory === index;
  const handleSelectCategory = () => setIndexCategory(index);
  const clock = new Clock();
  const state = {
    finished: new Value(0),
    velocity: new Value(0),
    position: new Value(0),
    time: new Value(0)
  };
  const config = {
    toValue: new Value(0),
    damping: 15,
    mass: 1,
    stiffness: 150,
    overshootClamping: false,
    restSpeedThreshold: 1,
    restDisplacementThreshold: 1
  };
  const valAnimate = new Value(0);
  const colorBgInterpolate = interpolateColor(
    valAnimate, {
        inputRange: [0, 1],
        outputRange: [
          { r: 255, g: 255, b: 255 },
          { r: 48, g: 96, b: 96 }
        ]
    }
  );
  const colorShadowInterpolate = interpolateColor(
    valAnimate, {
        inputRange: [0, 1],
        outputRange: [
          { r: 255, g: 255, b: 255 },
          { r: 48, g: 96, b: 96 }
        ]
    }
  );
  const shadowOffset = bInterpolate(valAnimate, 1, 2);
  const shadowOpacity = bInterpolate(valAnimate, 0.25, 1);
  useCode(cond(eq(indexCategory, index), set(valAnimate, 1), set(valAnimate, 0)), [isSelected]);
  return (
    <View style={[styles.category, isFirst && styles.firstBox]}>
      <TouchableWithoutFeedback onPress={handleSelectCategory}>
        <Animated.View style={[styles.boxCategory, {
            backgroundColor: colorBgInterpolate,
            shadowColor: '#306060',
            shadowOffset: { width: 2, height: 2 },
            shadowOpacity
          }]}>
          <Image
            source={source}
            style={[styles.imageCategory, isSelected && styles.selectedImageCategory]}
          />
        </Animated.View>
      </TouchableWithoutFeedback>
      <Text style={styles.textCategory}>{name}</Text>
    </View>
  );
};

const ListCategory = () => {
  const [indexCategory, setIndexCategory] = useState(0);
  return (
    <ScrollView
      contentContainerStyle={styles.scrollview}
      showsHorizontalScrollIndicator={false}
      horizontal
    >
      {
        categories.map((category, index) => (
          <CategoryBox
            key={index}
            index={index}
            setIndexCategory={setIndexCategory}
            {...{ indexCategory: indexCategory, id: category.id, name: category.name, source: category.source, }}
          />
        ))
      }
    </ScrollView>
  );
};

interface CardAnimalProps {
  cat: Cat;
}

const CardAnimal = ({cat}: CardAnimalProps) => {
  const { id, name, species, age, distance, source } = cat;
  const isSecondary = id ===  2;
  return (
    <View style={styles.contentListDescription}>
      <View style={[styles.animalImageArea, isSecondary && styles.secondaryBox]}>
        <Image source={source} style={styles.animalImage} />
      </View>
      <View style={styles.descriptionBox}>
        <View style={styles.contentDescriptionBox}>
          <View style={styles.area}>
            <Text style={styles.name}>{name}</Text>
            <Image source={icons.male} style={styles.genderIcon} />
          </View>
          <Text style={styles.species}>{species}</Text>
          <Text style={styles.age}>{age} years old</Text>
          <View style={[styles.area, styles.areaMap]}>
            <Image source={icons.marker} style={styles.smallMarker} />
            <Text style={styles.distance}>Distance: {distance} km</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const colors = {
  primary: '#306060',
  secondary: '#cdd6da',
  crem: '#ecd5af',
  font: '#616161',
  grey: '#dfdfdf',
  search: '#939393',
  white: '#ffff'
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white
  },
  content: {
    flex: 1,
    backgroundColor: colors.grey,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25
  },


  header: {
    flexDirection: 'row',
    marginBottom: 20
  },
  left: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  center: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center'
  },
  right: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  placeArea: {
    flexDirection: 'row'
  },
  menu: {
    width: 15,
    height: 15,
    tintColor: colors.font
  },
  locationTitle: {
    color: colors.grey,
    fontWeight: 'bold',
    fontSize: 15,
    marginBottom: 5
  },
  marker: {
    tintColor: colors.primary,
    width: 20,
    height: 20
  },
  location: {
    color: colors.font,
    fontSize: 17,
     marginLeft: 5
  },
  bold: {
    fontWeight: 'bold'
  },
  avatar: {
    width: 30,
    height: 30,
    borderRadius: BorderRadius
  },


  search: {
    backgroundColor: colors.white,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: BorderRadius,
    padding: 10,
    marginHorizontal: 16,
    marginVertical: 30
  },
  left2side: {
    flexDirection: 'row',
    justifyContent: 'flex-start'
  },
  right2side: {
    alignItems: 'flex-end'
  },
  iconSearch: {
    width: 20,
    height: 20,
    tintColor: colors.search,
    marginRight: 10
  },
  placeholder: {
    fontSize: 15,
    color: colors.font
  },
  iconFilter: {
    width: 20,
    height: 20,
    tintColor: colors.search
  },

  
  scrollview: {
    marginBottom: 10,
    height: 50
  },
  category: {
    alignItems: 'center',
    margin: 10
  },
  boxCategory: {
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
    borderRadius: BorderRadius,
    width: 60,
    height: 60,
    shadowColor: colors.font,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.25,
    shadowRadius: BorderRadius
  },
  selectedBox: {
    backgroundColor: colors.primary,
    shadowColor: colors.primary,
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 1,
  },
  firstBox: {
    marginLeft: 16
  },
  imageCategory: {
    width: 50,
    height: 50,
    tintColor: colors.font,
    transform: [
      { rotateY: '180deg' }
    ]
  },
  selectedImageCategory: {
    tintColor: colors.white,
  },
  textCategory: {
    color: colors.font,
    fontSize: 15,
    marginVertical: 8
  },


  containerListDescription: {
    flex: 7,
    marginHorizontal: 16
  },
  contentListDescription: {
    height: width * 0.55,
    justifyContent: 'center'
  },
  descriptionBox: {
    height: width * 0.3,
    backgroundColor: colors.white,
    alignItems: 'flex-end',
    borderRadius: BorderRadius,
    shadowColor: colors.font,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.25,
    shadowRadius: BorderRadius
  },
  animalImageArea: {
    backgroundColor: colors.crem,
    position: 'absolute',
    borderRadius: BorderRadius,
    width: width * 0.4,
    height: width * 0.4,
    zIndex: 10
  },
  secondaryBox: {
    backgroundColor: colors.secondary
  },
  animalImage: {
    position: 'absolute',
    top: -90,
    left: -20,
    transform: [
      {scale: 0.75}
    ]
  },
  contentDescriptionBox: {
    justifyContent: 'space-between',
    padding: 15,
    width: width * 0.5
  },
  area: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  areaMap: {
    justifyContent: 'flex-start'
  },
  name: {
    color: colors.font,
    fontSize: 20,
    fontWeight: 'bold'
  },
  genderIcon: {
    width: 30,
    height: 30,
    tintColor: colors.font
  },
  species: {
    fontSize: 15,
    color: colors.font,
    marginBottom: 5
  },
  age: {
    color: colors.font,
    fontSize: 13,
    marginBottom: 8
  },
  smallMarker: {
    tintColor: colors.primary,
    width: 15,
    height: 15,
    marginRight: 5
  },
  distance: {
    fontSize: 13,
    color: colors.font
  },
});
