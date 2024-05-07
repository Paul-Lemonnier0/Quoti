import React, { FC, ReactNode, useContext, useEffect, useRef } from 'react'
import { Animated, ListRenderItem, StyleSheet, ViewStyle } from 'react-native'
import BottomMenuStyle from '../../styles/StyledBottomMenu'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { useThemeColor } from '../Themed'
import { AppContext } from '../../data/AppContext'
import { ViewToken } from 'react-native'
import { CustomTextInputRefType, SearchBarCustom } from '../TextFields/TextInput'

type AnimatedScrollComponentProps = {
    HeaderComponent?: React.ComponentType<any>,

    headerHeight?: number,

    data?: Array<any>,
    renderItem?: ListRenderItem<any>,

    children?: ReactNode,

    style?: ViewStyle,
    contentContainerStyle?: ViewStyle,
    ItemSeparatorComponent?: React.ComponentType<any> | null,
    showsVerticalScrollIndicator?: boolean,
    scrollEventThrottle?: number,
    navigation?: NativeStackNavigationProp<any>,

    onViewableItemsChanged?: ((info: {
        viewableItems: ViewToken[];
        changed: ViewToken[];
    }) => void) | null | undefined,

    searchBarMethod?: (text: string) => void,
    searchBarPlaceholder?: string,
}

const AnimatedScrollComponent: FC<AnimatedScrollComponentProps> = ({
    HeaderComponent,
    headerHeight,
    data, 
    renderItem,
    children,
    scrollEventThrottle,
    contentContainerStyle,
    style,
    showsVerticalScrollIndicator,
    ItemSeparatorComponent,
    navigation,
    onViewableItemsChanged,
    searchBarMethod,
    searchBarPlaceholder
}) => {

    const CONTAINER_HEIGHT = searchBarMethod ? 80 : (headerHeight ?? 70)

    const {theme} = useContext(AppContext)
    const primary = useThemeColor(theme, "Primary")
    const tertiary = useThemeColor(theme, "Tertiary")

    const searchValueRef = useRef<CustomTextInputRefType>(null)


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

    //Ajout du listener pour vérifier quand l'utilisateur lâche le scroll si il faut replacer la header
    
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
    }, [data]);
  
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

    const opacity = clampedScroll.interpolate({
        inputRange: [0, CONTAINER_HEIGHT - 20, CONTAINER_HEIGHT],
        outputRange: [1, 0.05, 0],
        extrapolate: 'clamp',
    })

    const bottomBarTranslate = clampedScroll.interpolate({
      inputRange: [0, CONTAINER_HEIGHT],
      outputRange: [0, CONTAINER_HEIGHT],
      extrapolate: 'clamp',
  })

    //MAJ de la position / opacitée de la bottom nav bar si la navigation est passée en paramètre

    useEffect(() => {
        if(navigation) {
            navigation.getParent()?.setOptions({
                tabBarStyle: {
                    ...BottomMenuStyle().bottomMenuStyle,
                    opacity: opacity,
                    transform: [{translateY: bottomBarTranslate}]
                }
            });

            return () => navigation.getParent()?.setOptions({
                tabBarStyle: BottomMenuStyle().bottomMenuStyle
            });
        }
    }, [navigation, opacity, bottomBarTranslate]);

    return (
        <>
        {
            (data && renderItem) ?
            
            <Animated.FlatList
                data={data}
                renderItem={renderItem}

                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                    { useNativeDriver: true }
                )}
                    
                onMomentumScrollBegin={onMomentumScrollBegin}
                onMomentumScrollEnd={onMomentumScrollEnd}
                onScrollEndDrag={onScrollEndDrag}

                scrollEventThrottle={scrollEventThrottle ?? 1}
                showsVerticalScrollIndicator={showsVerticalScrollIndicator}
                ItemSeparatorComponent={ItemSeparatorComponent}
                style={[style, {}]}
                contentContainerStyle={contentContainerStyle}

                onViewableItemsChanged={onViewableItemsChanged}
            /> :

            (
                children && 
                <Animated.ScrollView
                    onScroll={Animated.event(
                        [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                        { useNativeDriver: true }
                    )}
                        
                    onMomentumScrollBegin={onMomentumScrollBegin}
                    onMomentumScrollEnd={onMomentumScrollEnd}
                    onScrollEndDrag={onScrollEndDrag}

                    scrollEventThrottle={scrollEventThrottle ?? 1}
                    showsVerticalScrollIndicator={showsVerticalScrollIndicator}
                    style={[{
                        marginHorizontal: -20, paddingHorizontal: 20, 
                        marginBottom: -100, paddingTop: 100
                    }, style]}>
                {children}
                </Animated.ScrollView>
            )
        }
        {
            searchBarMethod &&
            <Animated.View style={[styles.view, { 
                height: CONTAINER_HEIGHT,
                transform: [{ translateY: headerTranslate }],
                backgroundColor: primary,
                borderColor: tertiary,
            }]}>
                <SearchBarCustom
                    placeholder={searchBarPlaceholder}
                    onChangeText={searchBarMethod}
                    ref={searchValueRef}
                    opacity={opacity}
                />
            </Animated.View>
        }
        {
            HeaderComponent && 
            <Animated.View style={[styles.view, { 
                height: CONTAINER_HEIGHT,
                transform: [{ translateY: headerTranslate }],
                backgroundColor: primary,
                borderColor: tertiary,
            }]}>
                <HeaderComponent opacity={opacity}/>
            </Animated.View>
        }
        </>
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
      borderBottomWidth: 2,
      top: 0,
      marginHorizontal: -20,
      paddingHorizontal: 20,
      paddingBottom: 10,
    },
})

export default AnimatedScrollComponent