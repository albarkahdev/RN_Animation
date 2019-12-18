import React, { useEffect } from 'react';
import { 
  Animated,
  PanResponder,
  ScrollView,
  StyleSheet, View, TouchableWithoutFeedback, Text } from 'react-native';
import RAAnimated, { Easing } from 'react-native-reanimated';
import {interpolateColor, bInterpolate} from 'react-native-redash';


const {
  Value,
  timing,
  interpolate
} = RAAnimated;
export default () => {
  /* Scale Animation, option: scale, scaleX, scaleY [reanimated] */
  const scale = new Value(0);
  const scaleAnimation = () => {
    timing(scale, {
      duration: 1 * 1000,
      toValue: 3,
      easing: Easing.linear,
    }).start();
  }

  /* Opacity Animation, option: opacity [reanimated] */
  const opacity = new Value(1);
  const opacityAnimation = () => {
    timing(opacity, {
      duration: 1000,
      toValue: 0,
      easing: Easing.linear
    }).start(() => {
      timing(opacity, {
        duration: 400,
        toValue: 1,
        easing: Easing.linear
      }).start()
    });
  }

  /* Move Animation, option: translate, translateX, translateY [reanimated] */
  const translate = new Value(0);
  const moveAnimation = () => {
    timing(translate, {
      duration: 450,
      toValue: 300,
      easing: Easing.linear
    }).start(() => {
      timing(translate, {
        duration: 300,
        toValue: 0,
        easing: Easing.linear
      }).start()
    });
  }

  /* Size Animation, option: width, height [reanimated] */
  const lengthBox = new Value(100);
  const widthNHeightAnimation = () => {
    timing(lengthBox, {
      duration: 450,
      toValue: 300,
      easing: Easing.linear
    }).start()
  }

  /* Color Animation, option: backgroundColor, color [reanimated] */
  const colorInterpolate = new Value(0);
  const bgBoxInterpolate = interpolateColor(
    colorInterpolate, {
        inputRange: [0, 1],
        outputRange: [
          { r: 9, g: 132, b: 227 },
          { r: 253, g: 121, b: 168 }
        ]
    }
  );
  const bgTextInterpolate = interpolateColor(
    colorInterpolate, {
        inputRange: [0, 1],
        outputRange: [
          { r: 253, g: 121, b: 168 },
          { r: 9, g: 132, b: 227 }
        ]
    }
  );
  const colorAnimation = () => {
    timing(colorInterpolate, {
      duration: 500,
      toValue: 1,
      easing: Easing.linear
    }).start(() => {
      timing(colorInterpolate, {
        duration: 500,
        toValue: 0,
        easing: Easing.linear
      }).start()
    })
  };

  /* Rotate Animation, option: rotate, rotateX, rotateY [reanimated] */
  const rotate = new Value(0);
  const rotateInterpolate = rotate.interpolate({
    inputRange: [0, 360],
    outputRange: [0, Math.PI * 2]
  });
  const rotateAnimation = () => {
    timing(rotate, {
      duration: 1500,
      toValue: 360,
      easing: Easing.linear
    }).start();
  };

  /* Drag Animation, option: {..._panResponder.panHandlers} */
  const dragableValue = new Animated.ValueXY();
  let _panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => true,
    onPanResponderGrant: () => {
      dragableValue.extractOffset();
    },
    onPanResponderMove: Animated.event([
      null,
      {
        dx: dragableValue.x,
        dy: dragableValue.y
      }
    ]),
    onPanResponderRelease: (e, {vx, vy}) => {
      Animated.decay(dragableValue, {
        velocity: {x: vx, y: vy},
        deceleration: 0.997
      }).start();
    }
  })
  const dragableStyle = {
    transform: dragableValue.getTranslateTransform()
  };

  /* Arithmatic Animation, option: add, divide, multiply */
  const mathAnimeVal = new Animated.Value(0);
  const startMove = () => {
    Animated.timing(mathAnimeVal, {
      duration: 450,
      toValue: 300
    }).start(() => {
      Animated.timing(mathAnimeVal, {
        duration: 300,
        toValue: 0
      }).start();
    })
  };
  const randomValue = new Animated.Value(100);
  const newMathAnimeVal = Animated.add(mathAnimeVal, randomValue);
  const styleMoveAnimation = {
    transform: [{translateY: newMathAnimeVal}]
  };

  /* Arithmatic Modulo Animation, option: modulo */
  const moduloAnimeVal = new Animated.Value(0);
  const startSpinning = () => {
    Animated.parallel([
      Animated.timing(moduloAnimeVal, {
        toValue: 12,
        duration: 3500
      })
    ]).start();
  };
  const randomModuloValue = 3;
  const newModuloAnimeVal = Animated.modulo(moduloAnimeVal, randomModuloValue);
  const moduloInterpolateValue = moduloAnimeVal.interpolate({
    inputRange: [0, 3],
    outputRange: ["0deg", "270deg"]
  });
  const styleSpinningAnimation = {
    transform: [
      {
        rotate: moduloInterpolateValue
      }
    ]
  }

  /* Parallel and Sequence Animation, option: parallel, sequence, stagger(time for stag, []) */
  const spinningValue = new Animated.Value(0);
  const bgAnimeValue = new Animated.Value(0);
  const spinningInterpolate = spinningValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"]
  });
  const bgAnimeInterpolate = bgAnimeValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["rgb(9, 132, 227)", "rgb(253, 121, 168)"]
  });
  const startParallel = () => {
    Animated.stagger(1000, [
      Animated.timing(spinningValue, {
        toValue: 1,
        duration: 500
      }),
      Animated.timing(bgAnimeValue, {
        toValue: 1,
        duration: 300
      })
    ]).start();
  };
  const styleParallel = {
    backgroundColor: bgAnimeInterpolate,
    transform: [{ rotate: spinningInterpolate }]
  };

  
  
  return (
    <View style={styles.container}>
      {/* <TouchableWithoutFeedback onPress={startParallel}> */}
        <Animated.View style={[styles.box, dragableStyle]} {..._panResponder.panHandlers}>
          <Animated.Text>OOOOOOOOOIIIII</Animated.Text>
        </Animated.View>
      {/* </TouchableWithoutFeedback> */}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  box: {
    // flex: 1,
    height: 150,
    width: 150,
    backgroundColor: 'rgb(9, 132, 227)'
  }
})

const ReanimatedView = () => {
  return (
      <TouchableWithoutFeedback>
        <RAAnimated.View style={[
          styles.box
        ]}>
          <RAAnimated.Text style={{ color: 'white', fontSize: 15, fontWeight: 'bold' }}>
            This is really long text. This is really long text.
            This is really long text. This is really long text.
          </RAAnimated.Text>
        </RAAnimated.View>
      </TouchableWithoutFeedback>
  )
};

/* Background Change onScroll Animation, option: backgroundColor */
const onScrollView = () => {
  const backgroundAnimeInit = new Animated.Value(0);
  const bgColorInterpolate = backgroundAnimeInit.interpolate({
    inputRange: [0, 3000],
    outputRange: ["rgb(85, 239, 196)", "rgb(253, 121, 168)"]
  })
  return (
    <ScrollView
      scrollEventThrottle={16}
      onScroll={Animated.event([
        {
          nativeEvent: {
            contentOffset: {
              y: backgroundAnimeInit
            }
          }
        }
      ])}
    >
      <Animated.View style={[styles.box, { backgroundColor: bgColorInterpolate }]} />
    </ScrollView>
  );
};
