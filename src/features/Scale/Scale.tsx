import React, { useEffect } from 'react';
import { 
  Animated,
  PanResponder,
  ScrollView,
  StyleSheet, View, TouchableWithoutFeedback, Text } from 'react-native';
import RAAnimated, { Easing } from 'react-native-reanimated';
import {interpolateColor, bInterpolate} from 'react-native-redash';
import {interpolateNumber, interpolateRgb} from 'd3-interpolate';
// import { interpolatePath } from 'react-native-redash';
import { interpolatePath } from 'd3-interpolate-path';
// import 
import Svg, {Path} from 'react-native-svg';


const {
  Value,
  timing,
  interpolate
} = RAAnimated;
export default () => {
  /* Scale Animation, option: scale, scaleX, scaleY [reanimated] */
  const scale = new Value(0);
  const startScale = () => {
    timing(scale, {
      duration: 1 * 1000,
      toValue: 3,
      easing: Easing.linear,
    }).start();
  }

  /* Opacity Animation, option: opacity [reanimated] */
  const opacity = new Value(1);
  const startOpacity = () => {
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
  const startTranslate = () => {
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

  /* Parallel and Sequence Animation, option: parallel, sequence, stagger(time for stag, []), delay */
  const spinningValue = new Animated.Value(0);
  const bgAnimeValue = new Animated.Value(0);
  const scaleAnimeValue = new Animated.Value(1);
  const spinningInterpolate = spinningValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"]
  });
  const bgAnimeInterpolate = bgAnimeValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["rgb(9, 132, 227)", "rgb(253, 121, 168)"]
  });
  const startParallel = () => {
    Animated.sequence([
      Animated.timing(scaleAnimeValue, {
        duration: 450,
        toValue: 2
      }),
      Animated.delay(1000),
      Animated.parallel([
        Animated.timing(spinningValue, {
          toValue: 1,
          duration: 500
        }),
        Animated.timing(bgAnimeValue, {
          toValue: 1,
          duration: 300
        })
      ])
    ]).start();
  };
  const styleParallel = {
    backgroundColor: bgAnimeInterpolate,
    transform: [{ rotate: spinningInterpolate }, { scale: scaleAnimeValue }]
  };

  /* Interpolating Interpolate Animation */
  const initIntepolateValue = new Animated.Value(0);
  const translateYInterpolate = initIntepolateValue.interpolate({
    inputRange: [0, 1, 2],
    outputRange: [0, 300, 0]
  });
  const opacityInterpolateTranslate = translateYInterpolate.interpolate({
    inputRange: [0, 300],
    outputRange: [1, .5]
  });
  const translateXInterpolateTranslate = translateYInterpolate.interpolate({
    inputRange: [0, 49, 90, 128, 150, 189, 230, 289, 300],
    outputRange: [0, -40, 80, -100, 37, -90, 81, 53, 70]
  });
  const startInterpolatingInterpolate = () => {
    Animated.timing(initIntepolateValue, {
      toValue: 1,
      duration: 450
    }).start(() => {
      Animated.timing(initIntepolateValue, {
        toValue: 2,
        duration: 500
      }).start();
    });
  }
  const styleInterpolatingInterpolate = {
    opacity: opacityInterpolateTranslate,
    transform: [
      { translateX: translateXInterpolateTranslate },
      { translateY: translateYInterpolate },
    ]
  };

  /* Color Interpolate Animation */
  /* Rotate Interpolate Animation */
  /* Extrapolate Animation, jika timing toValue melebihi batas inputRange maka default dia akan
    mengikuti batas tersebut, tapi kalo kita definisiin extrapolate "clamp" maka animasi value
    tidak akan melebihi range yang di sediakan, ada juga extrapolateLeft: kurang dari range,
    extrapolateRight: lebih dari range */
  /* useNativeDriver, berlaku pada transform dan opacity agar tetap berjalan 60 fps, tetapi
    hal seperti backgroundColor, dan apapun yang berjalan pada layout dengan posisi absolute
    width dan height tidak bisa. onScroll bisa */

  /* Create Animated Component [not recommended], change our component to animatable component with method
    createAnimatedComponent. You can setNativeProps, with this.compRef.setNativeProps(props) */
  let _scroll;
  let enableScroll = true;
  const nativePropsAnimeVal = new Animated.Value(0);
  const nativePropsInterpolate = nativePropsAnimeVal.interpolate({
    inputRange: [0, 3000],
    outputRange: ["rgb(255,99,71)", "rgb(99,71,255)"]
  });
  const nativePropsStyle = {
    backgroundColor: nativePropsInterpolate
  };
  const handleToogle = () => {
    enableScroll = !enableScroll;
    const style = [styles.scroll];

    if (enableScroll) {
      style.push(styles.show);
    } else {
      style.push(styles.hide);
    }

    _scroll.setNativeProps({
      scrollEnabled: enableScroll,
      style
    })
  };

  /* Path Interpolate Animation */
  // let _path;
  // const pathAnimeVal = new Animated.Value(0);
  const startPath = `M45,50a5,5 0 1,0 10,0a5,5 0 1,0 -10,0`;
  // const endPath = `M20,50a30,30 0 1,0 60,0a30,30 0 1,0 -60,0`;
  // const pathInterpolate = interpolatePath(startPath, endPath); // interpolatePath from d3-interpolate-path
  // pathAnimeVal.addListener(({ value }) => {
  //   const path = pathInterpolate(value);
  //   _path.setNativeProps({
  //     d: path
  //   })
  // })
  // const startPathInterpolate = () => {
  //   Animated.sequence([
  //     Animated.timing(pathAnimeVal, {
  //       toValue: 1,
  //       duration: 500
  //     }),
  //     Animated.delay(1500),
  //     Animated.timing(pathAnimeVal, {
  //       toValue: 0,
  //       duration: 500
  //     })
  //   ]).start();
  // };

  let _path;
  // const AnimatedPath = Animated.createAnimatedComponent(Path);
  // const pathAnimeVal = new Animated.Value(0);
  const arrowRightPath = `M265.171,125.577l-80-80c-4.881-4.881-12.797-4.881-17.678,0c-4.882,4.882-4.882,12.796,0,17.678l58.661,58.661H12.5
  c-6.903,0-12.5,5.597-12.5,12.5c0,6.902,5.597,12.5,12.5,12.5h213.654l-58.659,58.661c-4.882,4.882-4.882,12.796,0,17.678
  c2.44,2.439,5.64,3.661,8.839,3.661s6.398-1.222,8.839-3.661l79.998-80C270.053,138.373,270.053,130.459,265.171,125.577z`;
  // const lovePath = `M492.719,166.008c0-73.486-59.573-133.056-133.059-133.056c-47.985,0-89.891,25.484-113.302,63.569
  // c-23.408-38.085-65.332-63.569-113.316-63.569C59.556,32.952,0,92.522,0,166.008c0,40.009,17.729,75.803,45.671,100.178
  // l188.545,188.553c3.22,3.22,7.587,5.029,12.142,5.029c4.555,0,8.922-1.809,12.142-5.029l188.545-188.553
  // C474.988,241.811,492.719,206.017,492.719,166.008z`;
  // // const pathInterpolate = interpolatePath(arrowRightPath, lovePath); // interpolatePath from d3-interpolate-path
  // const pathInterpolate = pathAnimeVal.interpolate({
  //   inputRange: [0, 3000],
  //   outputRange: [arrowRightPath, lovePath]
  // });
  // pathAnimeVal.addListener(({ value }) => {
  //   // const path = pathInterpolate(value);
  //   _path.setNativeProps({
  //     d: pathInterpolate
  //   })
  // });
  // const startPathInterpolate = () => {
  //   Animated.sequence([
  //     Animated.timing(pathAnimeVal, {
  //       toValue: 1,
  //       duration: 500
  //     }),
  //     Animated.delay(1500),
  //     Animated.timing(pathAnimeVal, {
  //       toValue: 0,
  //       duration: 500
  //     })
  //   ]).start();
  // };
  
  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={() => null}>
        <Svg width={100} height={100} viewBox="0 0 800 800">
          <Path d={arrowRightPath} stroke="black" ref={path => (_path = path)} />
        </Svg>
      </TouchableWithoutFeedback>
    </View>
  );
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
  },
  scroll: {
    flex: 1,
    opacity: 1
  },
  fakeContent: {
    height: 3000,
    backgroundColor: 'tomato'
  },
  show: {
    opacity: 1
  },
  hide: {
    opacity: 0
  }
});

const AnimatedWithoutAnimatedView = () => {
  let _view;
  const nativePropsVal = new Animated.Value(0);
  const nativePropsTranslateY = interpolateNumber(0, 300);
  const nativePropsBgColor = interpolateRgb("rgb(255,99,71)", "rgb(99,71,255)");
  nativePropsVal.addListener(({ value }) => {
    const translateYNativeProps = nativePropsTranslateY(value);
    const bgColorNativeProps = nativePropsBgColor(value);

    const styleNativePropWithD3 = [
      styles.box,
      {
        backgroundColor: bgColorNativeProps,
        transform: [
          {
            translateY: translateYNativeProps
          }
        ]
      }
    ];

    _view.setNativeProps({style: styleNativePropWithD3});
  })
  const startNativeProps = () => {
    Animated.timing(nativePropsVal, {
      toValue: 1,
      duration: 1500
    }).start(() => {
      Animated.timing(nativePropsVal, {
        toValue: 0,
        duration: 450
      }).start();
    });
  };
  const styleNativeProps = {
    backgroundColor: nativePropsVal.interpolate({
      inputRange: [0, 1],
      outputRange: ["rgb(255,99,71)", "rgb(99,71,255)"]
    }),
    transform: [
      {
        translateY: nativePropsVal.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 300]
        })
      }
    ]
  };
  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={startNativeProps}>
        <View ref={view => (_view = view)} style={styles.box}>
          <Text>Toogle</Text>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
}

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
