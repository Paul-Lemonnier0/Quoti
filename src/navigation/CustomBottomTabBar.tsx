import { View, Text, TouchableOpacity } from 'react-native';
import React, { FC, useEffect, useState } from 'react';
import BottomMenuStyle from '../styles/StyledBottomMenu';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { BottomTabBar, BottomTabBarProps } from '@react-navigation/bottom-tabs';

const CustomBottomTabBar: FC<BottomTabBarProps> = (props) => {
    const bottomMenuStyle = BottomMenuStyle().bottomMenuStyle
    
    // const { options } = descriptors[route.key]; // RECUPERER LE TABBARSTYLE DU SCREEN ICI

    const focusedRoute = props.state.routes[props.state.index];
    const focusedDescriptor = props.descriptors[focusedRoute.key];
    const focusedOptions = focusedDescriptor.options;
  
    const {
      tabBarShowLabel,
      tabBarHideOnKeyboard = false,
      tabBarVisibilityAnimationConfig,
      tabBarStyle,
      tabBarBackground,
      tabBarActiveTintColor,
      tabBarInactiveTintColor,
      tabBarActiveBackgroundColor,
      tabBarInactiveBackgroundColor,
      
    } = focusedOptions;  

    const [isVisible, setIsVisible] = useState<boolean>(true)

    useEffect(() => {
        if(tabBarStyle &&
            "display" in tabBarStyle && 
            tabBarStyle.display === "none"
        ) {
            setIsVisible(false)
        }

        else if(isVisible === false) setIsVisible(true)

    }, [tabBarStyle])

    return(
        <>
        {
            isVisible &&
            <Animated.View entering={FadeInDown.duration(200)}>
                <BottomTabBar {...props}/>
            </Animated.View>
        }
        </>
    )

//     return (
//     <Animated.View entering={FadeInDown.duration(400)} style={bottomMenuStyle}>
//       {state.routes.map((route, index) => {
//         const { options } = descriptors[route.key];
//         console.log(route)
//         const label =
//           options.tabBarLabel !== undefined
//             ? options.tabBarLabel
//             : options.title !== undefined
//             ? options.title
//             : route.name;

//         const isFocused = state.index === index;

//         const onPress = () => {
//           const event = navigation.emit({
//             type: 'tabPress',
//             target: route.key,
//             canPreventDefault: true,
//           });

//           if (!isFocused && !event.defaultPrevented) {
//             navigation.navigate(route.name, route.params);
//           }
//         };

//         const onLongPress = () => {
//           navigation.emit({
//             type: 'tabLongPress',
//             target: route.key,
//           });
//         };



//         return (
//           <TouchableOpacity
//             key={index}
//             accessibilityRole="button"
//             accessibilityState={isFocused ? { selected: true } : {}}
//             accessibilityLabel={options.tabBarAccessibilityLabel}
//             testID={options.tabBarTestID}
//             onPress={onPress}
//             onLongPress={onLongPress}
//             style={[{ flex: 1, justifyContent: 'center', alignItems: 'center' },]}
//           >
//             <Text style={{ color: isFocused ? '#673ab7' : '#222' }}>
//               {label}
//             </Text>
//           </TouchableOpacity>
//         );
//       })}
//     </Animated.View>
//   );
}

export default CustomBottomTabBar