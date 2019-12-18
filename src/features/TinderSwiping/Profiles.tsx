// import * as React from 'react';
// import {
//   SafeAreaView, StyleSheet, View, Dimensions, StyleProp
// } from 'react-native';
// import { Feather as Icon } from '@expo/vector-icons';
// import { PanGestureHandler, State } from 'react-native-gesture-handler';
// import Animated from 'react-native-reanimated';

// import Card from './Card';
// import {styles, Profile} from './TinderSwiping';


// function runSpring(clock, value, dest) {
//   const state = {
//     finished: new Value(0),
//     velocity: new Value(0),
//     position: new Value(0),
//     time: new Value(0),
//   };

//   const config = {
//     damping: 20,
//     mass: 1,
//     stiffness: 100,
//     overshootClamping: false,
//     restSpeedThreshold: 1,
//     restDisplacementThreshold: 0.5,
//     toValue: new Value(0),
//   };

//   return [
//     cond(clockRunning(clock), 0, [
//       set(state.finished, 0),
//       set(state.velocity, 0),
//       set(state.position, value),
//       set(config.toValue, dest),
//       startClock(clock),
//     ]),
//     spring(clock, state, config),
//     cond(state.finished, stopClock(clock)),
//     state.position,
//   ];
// }

// const { width, height } = Dimensions.get("window");
// const toRadians = (angle: number) => angle * (Math.PI / 180);
// const rotatedWidth = width * Math.sin(toRadians(90 - 15)) + height * Math.sin(toRadians(15));
// const {
//   add,
//   multiply,
//   neq,
//   spring,
//   cond,
//   eq,
//   event,
//   lessThan,
//   greaterThan,
//   and,
//   call,
//   set,
//   clockRunning,
//   startClock,
//   stopClock,
//   Clock,
//   Value,
//   concat,
//   interpolate,
//   Extrapolate,
// } = Animated;

// interface ProfilesProps  {
//   profiles: Profile[]
// };

// interface ProfilesState  {
//   profiles: Profile[]
// };

// // export default (props: ProfilesProp) => {
// //   const [profileList, setProfileList] = React.useState(props.profiles);
// //   const [lastProfile, ...profiles] = profileList;
// //   const translationX = new Value(0);
// //   const translationY = new Value(0);
// //   const velocityX = new Value(0);
// //   const offsetY = new Value(0);
// //   const offsetX = new Value(0);
// //   let translateY;
// //   let translateX;
// //   const gestureState = new Value(State.UNDETERMINED);
// //   const onGestureEvent = event(
// //     [
// //       {
// //         nativeEvent: {
// //           translationX: translationX,
// //           translationY: translationY,
// //           velocityX: velocityX,
// //           state: gestureState,
// //         },
// //       },
// //     ],
// //     { useNativeDriver: true },
// //   );
// //   const swipped = () => {
// //     setProfileList(profiles);
// //     init();
// //   };
// //   // const rotateZ = concat(
// //   //   interpolate(translateX, {
// //   //     inputRange: [-width / 2, width / 2],
// //   //     outputRange: [15, -15],
// //   //     extrapolate: Extrapolate.CLAMP,
// //   //   }),
// //   //   "deg",
// //   // );
// //   const init = () => {
// //     const clockX = new Clock();
// //     const clockY = new Clock();
// //     // gestureState.setValue(State.UNDETERMINED);
// //     // translationX.setValue(0);
// //     // translationY.setValue(0);
// //     // velocityX.setValue(0);
// //     // offsetY.setValue(0);
// //     // offsetX.setValue(0);

// //     const finalTranslateX = add(translationX, multiply(0.2, velocityX));
// //     const translationThreshold = width / 4;
// //     const snapPoint = cond(
// //       lessThan(finalTranslateX, -translationThreshold),
// //       -rotatedWidth,
// //       cond(greaterThan(finalTranslateX, translationThreshold), rotatedWidth, 0),
// //     );
// //     // TODO: handle case where the user drags the card again before the spring animation finished
// //     translateY = cond(
// //       eq(gestureState, State.END),
// //       [
// //         set(translationY, runSpring(clockY, translationY, 0)),
// //         set(offsetY, translationY),
// //         translationY,
// //       ],
// //       cond(eq(gestureState, State.BEGAN), [stopClock(clockY), translationY], translationY),
// //     );
// //     translateX = cond(
// //       eq(gestureState, State.END),
// //       [
// //         set(translationX, runSpring(clockX, translationX, snapPoint)),
// //         set(offsetX, translationX),
// //         cond(and(eq(clockRunning(clockX), 0), neq(translationX, 0)), [
// //           call([translationX], swipped),
// //         ]),
// //         translationX,
// //       ],
// //       cond(eq(gestureState, State.BEGAN), [stopClock(clockX), translationX], translationX),

// //     );
// //   };
// //   // React.useEffect(() => {
// //   //   init();
// //   // }, [])
// //   const style = {
// //     ...StyleSheet.absoluteFillObject,
// //     zIndex: 900,
// //     transform: [
// //       { translateX: translationX },
// //       { translateY: translationY },
// //       // { rotateZ },
// //     ],
// //   };
// //   return (
// //     <SafeAreaView style={styles.container}>
// //       <View style={styles.header}>
// //           <Icon name="user" size={32} color="gray" />
// //           <Icon name="message-circle" size={32} color="gray" />
// //       </View>

// //       <View style={styles.cards}>
// //         {
// //             profiles.reverse().map(profile => (
// //               <Card key={profile.id} {...{ profile }} />
// //             ))
// //         }
// //         <PanGestureHandler
// //           onHandlerStateChange={onGestureEvent}
// //           {...{ onGestureEvent }}
// //         >
// //           <Animated.View {...{ style }}>
// //             <Card profile={lastProfile} />
// //           </Animated.View>
// //         </PanGestureHandler>
// //       </View>

// //       <View style={styles.footer}>
// //         <View style={styles.circle}>
// //           <Icon name="x" size={32} color="#ec5288" />
// //         </View>
// //         <View style={styles.circle}>
// //           <Icon name="heart" size={32} color="#6ee3b4" />
// //         </View>
// //       </View>
// //     </SafeAreaView>
// //   )
// // }


// export default class Profiles extends React.PureComponent<ProfilesProps, ProfilesState> {
//   constructor(props: ProfilesProps) {
//     super(props);
//     const { profiles } = props;
//     this.state = { profiles };
//     this.translationX = new Value(0);
//     this.translationY = new Value(0);
//     this.velocityX = new Value(0);
//     this.offsetY = new Value(0);
//     this.offsetX = new Value(0);
//     this.gestureState = new Value(State.UNDETERMINED);
//     this.onGestureEvent = event(
//       [
//         {
//           nativeEvent: {
//             translationX: this.translationX,
//             translationY: this.translationY,
//             velocityX: this.velocityX,
//             state: this.gestureState,
//           },
//         },
//       ],
//       { useNativeDriver: true },
//     );
//     this.init();
//   }

//   init = ()  => {
//     const clockX = new Clock();
//     const clockY = new Clock();
//     const {
//       translationX, translationY, velocityX, gestureState, offsetY, offsetX,
//     } = this;
//     gestureState.setValue(State.UNDETERMINED);
//     translationX.setValue(0);
//     translationY.setValue(0);
//     velocityX.setValue(0);
//     offsetY.setValue(0);
//     offsetX.setValue(0);

//     const finalTranslateX = add(translationX, multiply(0.2, velocityX));
//     const translationThreshold = width / 4;
//     const snapPoint = cond(
//       lessThan(finalTranslateX, -translationThreshold),
//       -rotatedWidth,
//       cond(greaterThan(finalTranslateX, translationThreshold), rotatedWidth, 0),
//     );
//     // TODO: handle case where the user drags the card again before the spring animation finished
//     this.translateY = cond(
//       eq(gestureState, State.END),
//       [
//         set(translationY, runSpring(clockY, translationY, 0)),
//         set(offsetY, translationY),
//         translationY,
//       ],
//       cond(eq(gestureState, State.BEGAN), [stopClock(clockY), translationY], translationY),
//     );
//     this.translateX = cond(
//       eq(gestureState, State.END),
//       [
//         set(translationX, runSpring(clockX, translationX, snapPoint)),
//         set(offsetX, translationX),
//         cond(and(eq(clockRunning(clockX), 0), neq(translationX, 0)), [
//           call([translationX], this.swipped),
//         ]),
//         translationX,
//       ],
//       cond(eq(gestureState, State.BEGAN), [stopClock(clockX), translationX], translationX),

//     );
//   };

//   swipped = ([translationX]) => {
//     console.log({ likes: translationX > 0 });
//     const { profiles: [lastProfile, ...profiles] } = this.state;
//     this.setState({ profiles }, this.init);
//   }

//   render() {
//     const { onGestureEvent, translateX, translateY } = this;
//     const { profiles: [lastProfile, ...profiles] } = this.state;
//     const rotateZ = concat(
//       interpolate(translateX, {
//         inputRange: [-width / 2, width / 2],
//         outputRange: [15, -15],
//         extrapolate: Extrapolate.CLAMP,
//       }),
//       "deg",
//     );
//     const likeOpacity = interpolate(translateX, {
//       inputRange: [0, width / 4],
//       outputRange: [0, 1],
//     });
//     const nopeOpacity = interpolate(translateX, {
//       inputRange: [-width / 4, 0],
//       outputRange: [1, 0],
//     });
//     const style = {
//       ...StyleSheet.absoluteFillObject,
//       zIndex: 900,
//       transform: [
//         { translateX },
//         { translateY },
//         { rotateZ },
//       ],
//     };
//     return (
//       <SafeAreaView style={styles.container}>
//         <View style={styles.header}>
//           <Icon name="user" size={32} color="gray" />
//           <Icon name="message-circle" size={32} color="gray" />
//         </View>
//         <View style={styles.cards}>
//           {
//               profiles.reverse().map(profile => (
//                 <Card key={profile.id} {...{ profile }} />
//               ))
//           }
//           <PanGestureHandler
//             onHandlerStateChange={onGestureEvent}
//             {...{ onGestureEvent }}
//           >
//             <Animated.View {...{ style }}>
//               <Card profile={lastProfile} {...{ likeOpacity, nopeOpacity }} />
//             </Animated.View>
//           </PanGestureHandler>
//         </View>
//         <View style={styles.footer}>
//           <View style={styles.circle}>
//             <Icon name="x" size={32} color="#ec5288" />
//           </View>
//           <View style={styles.circle}>
//             <Icon name="heart" size={32} color="#6ee3b4" />
//           </View>
//         </View>
//       </SafeAreaView>
//     );
//   }
// }


export default () => {
  return null;
}
