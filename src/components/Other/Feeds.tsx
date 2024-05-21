import React, { FC, useContext, useEffect } from 'react'
import { Animated, FlatList, Image, StyleSheet, TouchableOpacity, View } from 'react-native'
import { useRef } from 'react'
import { useState } from 'react'

import AnimatedHeader from "./AnimatedHeader";
import { UserDataBase } from '../../firebase/Database_User_Primitives';
import { UserContext } from '../../data/UserContext';
import { AppContext } from '../../data/AppContext';
import { HabitsContext } from '../../data/HabitContext';
import { TestPostHabit } from '../../firebase/Firebase_Posts_Primitives';
import HabitPost from '../Posts/HabitPost';
import Separator from './Separator';
import { useThemeColor } from '../Themed';
import { SocialScreenStackType } from '../../navigation/SocialNavigator';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import BottomMenuStyle from '../../styles/StyledBottomMenu';

const CONTAINER_HEIGHT = 70;

interface FeedsProps {
  navigation: NativeStackNavigationProp<SocialScreenStackType, "SocialScreen", undefined>
}

const Feeds: FC<FeedsProps> = ({navigation}) => {

    const {Habits, addHabit, addGoal} = useContext(HabitsContext);
    const {user} = useContext(UserContext)

    const {theme} = useContext(AppContext)
    const primary = useThemeColor(theme, "Primary")
    const secondary = useThemeColor(theme, "Secondary")

    const [posts, setPosts] = useState<TestPostHabit[]>([
        {
          habit: Object.values(Habits)[0],
          user: user as UserDataBase,
          date: new Date(),
          bio: "Une bonne journée ! Les habitudes rentrent de mieux en mieux dans le quotidien"
        },
        {
          habit: Object.values(Habits)[0],
          user: user as UserDataBase,
          date: new Date(),
        },
    
        {
          habit: Object.values(Habits)[0],
          user: user as UserDataBase,
          date: new Date(),
        },
        {
          habit: Object.values(Habits)[0],
          user: user as UserDataBase,
          date: new Date(),
        },
        {
          habit: Object.values(Habits)[0],
          user: user as UserDataBase,
          date: new Date(),
        },
        {
          habit: Object.values(Habits)[0],
          user: user as UserDataBase,
          date: new Date(),
        },
        {
          habit: Object.values(Habits)[0],
          user: user as UserDataBase,
          date: new Date(),
        },
        {
          habit: Object.values(Habits)[0],
          user: user as UserDataBase,
          date: new Date(),
        },
        {
          habit: Object.values(Habits)[0],
          user: user as UserDataBase,
          date: new Date(),
        }
      ])
    
    const scrollY = useRef(new Animated.Value(0)).current;
    const offsetAnim = useRef(new Animated.Value(0)).current;

    const clampedScroll = Animated.diffClamp(
        Animated.add(
            scrollY.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 1],
                extrapolateLeft: 'clamp',
            }),
            offsetAnim,), 
        0, CONTAINER_HEIGHT
    )

    var _clampedScrollValue = 0;
    var _offsetValue = 0;
    var _scrollValue = 0;
    useEffect(() => {
      scrollY.addListener(({ value }) => {
        const diff = value - _scrollValue;
        _scrollValue = value;
        _clampedScrollValue = Math.min(
          Math.max(_clampedScrollValue + diff, 0),
          CONTAINER_HEIGHT,
        )
      });
      offsetAnim.addListener(({ value }) => {
        _offsetValue = value;
      })
    }, []);
  
    var scrollEndTimer: any = null;
    const onMomentumScrollBegin = () => {
      clearTimeout(scrollEndTimer)
    }
    const onMomentumScrollEnd = () => {

      const toValue = _scrollValue > CONTAINER_HEIGHT &&
        _clampedScrollValue > (CONTAINER_HEIGHT) / 2
        ? _offsetValue + CONTAINER_HEIGHT : _offsetValue - CONTAINER_HEIGHT;
  
      Animated.timing(offsetAnim, {
        toValue,
        duration: 500,
        useNativeDriver: true,
      }).start();
    }
    const onScrollEndDrag = () => {
      scrollEndTimer = setTimeout(onMomentumScrollEnd, 250);
    }

    const headerTranslate = clampedScroll.interpolate({
        inputRange: [0, CONTAINER_HEIGHT],
        outputRange: [0, -CONTAINER_HEIGHT],
        extrapolate: 'clamp',
    })

    const bottomBarTranslate = clampedScroll.interpolate({
      inputRange: [0, CONTAINER_HEIGHT],
      outputRange: [0, CONTAINER_HEIGHT],
      extrapolate: 'clamp',
  })

    const opacity = clampedScroll.interpolate({
        inputRange: [0, CONTAINER_HEIGHT - 20, CONTAINER_HEIGHT],
        outputRange: [1, 0.05, 0],
        extrapolate: 'clamp',
    })

    useEffect(() => {
      navigation.getParent()?.setOptions({
        tabBarStyle: {
          ...BottomMenuStyle().bottomMenuStyle,
          opacity: opacity,
          transform: [{translateY: bottomBarTranslate}]
        }
      });
      return () => navigation.getParent()?.setOptions({
        tabBarStyle: {}
      });
    }, [navigation, opacity, bottomBarTranslate]);
    

    return (
      <View style={{backgroundColor: primary, flex: 1, paddingTop: 10}}>
        <View style={[styles.container, {backgroundColor: primary}]}>
            <Animated.FlatList
                onScroll={Animated.event(
                [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                { useNativeDriver: true }
                )}
                
                onMomentumScrollBegin={onMomentumScrollBegin}
                onMomentumScrollEnd={onMomentumScrollEnd}
                onScrollEndDrag={onScrollEndDrag}
                data={posts}
                renderItem={({ item }) => 
                  <HabitPost 
                    onPress={() => {}}
                    onPressProfil={() => {}}
                    {...item}/>
                  }

                style={{marginHorizontal: 0, marginBottom: 0, paddingTop: 100}}
                contentContainerStyle={{paddingHorizontal: 20, paddingBottom: 260}}
                ItemSeparatorComponent={() =>
                    <View style={{marginVertical: 30, marginHorizontal: -20}}>
                        <Separator/>
                    </View>
                }
                showsVerticalScrollIndicator={false}
                scrollEventThrottle={1}
            />
            <Animated.View style={[styles.view, { 
                top: 0, 
                transform: [{ translateY: headerTranslate }],
                backgroundColor: primary,
                borderBottomColor: secondary,
                borderBottomWidth: 2,
                height: CONTAINER_HEIGHT
            }]}>
                <AnimatedHeader title={"Feed"} opacity={opacity}/>
            </Animated.View>
        </View>
      </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: 40,
      marginBottom: 0
    },
    view: {
      position: 'absolute',
      left: 0,
      right: 0,
      height: CONTAINER_HEIGHT,
    },
    header: {
      borderBottomRightRadius: 16,
      borderBottomLeftRadius: 16,
      marginHorizontal: 4,
    },
    bottomBar: {
      borderTopRightRadius: 16,
      borderTopLeftRadius: 16,
      marginHorizontal: 4,
    },
    contentContainerStyle: {
      paddingTop: CONTAINER_HEIGHT,
      marginTop: 8,
    },
    rowContainer: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-around',
    },
    item: {
      marginHorizontal: 10,
      marginBottom: 12,
      elevation: 6,
      borderRadius: 16,
    },
    title: {
      fontSize: 16,
      fontWeight: '700',
    },
    caption: {
    },
    image: {
      height: 300,
      width: null,
      marginBottom: 1,
      marginHorizontal: 16,
      borderRadius: 16,
    },
    bottomView: {
      alignItems: 'center',
      flexDirection: 'row',
      padding: 16
    },
    content: {
      alignItems: 'center',
      flexDirection: 'row',
      marginHorizontal: 16,
      paddingVertical: 8,
    },
    textContainer: {
      marginHorizontal: 16,
    },
    avatar: {
      height: 35,
      width: 35,
      borderRadius: 20,
    },
    rowView: {
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'space-around',
    },
    icon: {
      marginHorizontal: 10,
    },
  })

export default Feeds