import React, { FC, useContext, useEffect, useState } from 'react';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { Icon, IconProvider } from '../components/Buttons/IconButtons';
import { StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import { AppContext } from '../data/AppContext';
import { NormalText } from '../styles/StyledText';
import { useThemeColor } from '../components/Themed';
import { BottomScreenOpen_Impact } from '../constants/Impacts';
import  {Animated as Ani} from "react-native"

const TAB_BAR_ITEM_WIDTH = 70

const CustomBottomTabBar: FC<BottomTabBarProps> = (props) => {
    const {theme} = useContext(AppContext)
    const fontGray = useThemeColor(theme, "FontGray")

    const focusedRoute = props.state.routes[props.state.index];
    const focusedDescriptor = props.descriptors[focusedRoute.key];
    const focusedOptions = focusedDescriptor.options;
  
    const { tabBarStyle } = focusedOptions;

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


    const widthValues = [useSharedValue(0), useSharedValue(0), useSharedValue(0)];
    const opacityValues = [useSharedValue(0), useSharedValue(0), useSharedValue(0)];

    const isFocused = (index: number) => {
        return index === props.state.index;
    }

    useEffect(() => {
        const index = props.state.index;

        for(let i = 0; i<3; ++i) {
            widthValues[i].value = withTiming(index === i ? TAB_BAR_ITEM_WIDTH : 0)
            opacityValues[i].value = withTiming(index === i ? 1 : 0, {duration: 600})
        }

    }, [props.state.index]);

    const handleNavigate = (screen: string, index: number) => {
        if(index !== props.state.index) {
            BottomScreenOpen_Impact()
        }

        if(props.state.index === index && props.state.history.length > 1) {
            props.navigation.reset({routes: [{name: screen}]})
        }

        else props.navigation.navigate(screen)
    }

    type TabBarMenus = {
        icon: string,
        provider: IconProvider,
        screen: string,
        label: string,
    }

    const tabBarMenus: TabBarMenus[] = [
        {icon: "user", provider: IconProvider.AntDesign, screen: "Home", label: "Accueil"},
        {icon: "hash", provider: IconProvider.Feather, screen: "Notifs", label: "Social"},
        {icon: "staro", provider: IconProvider.AntDesign, screen: "Abonnement", label: "Plans"},
    ]

    return (
        <>
        {
            isVisible && !isFocused(3) &&
            <Ani.View style={[tabBarStyle, styles.tabBarContainer]}>
                <Animated.View style={[{flexDirection: 'row', width: "100%", justifyContent: 'space-between'}]}>
                    <View style={styles.subTabBarContainer}>
                        {
                            tabBarMenus.map((menu, index) => (
                                <CustomTab key={index}
                                    onPress={() => handleNavigate(menu.screen, index)}
                                    icon={menu.icon} provider={menu.provider}
                                    isSelected={isFocused(index)}
                                    label={menu.label}
                                    opacity={opacityValues[index]}
                                    width={widthValues[index]}
                                />
                            ))
                        }
                    </View>
                    
                    <View style={{marginRight: 20}}>
                        <TouchableWithoutFeedback onPress={() => handleNavigate("Add", 3)}>
                            <View style={styles.addContainer}>
                                <Icon name='plus' size={24} color={fontGray} provider={IconProvider.Feather} />
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </Animated.View>
            </Ani.View>
        }
        </>
    )
}

interface CustomTabProps {
    isSelected?: boolean,
    icon: string,
    provider: IconProvider,
    onPress: () => void,
    label: string,
    width: Animated.SharedValue<number>,
    opacity: Animated.SharedValue<number>,
}

const CustomTab: FC<CustomTabProps> = ({opacity, width, isSelected, icon, provider, onPress, label}) => {
    const {theme} = useContext(AppContext)
    const fontGray = useThemeColor(theme, "FontGray")

    const rStyle = useAnimatedStyle(() => {
        return {
            width: width.value,
            opacity: opacity.value
        }
    })

    return(
        <TouchableWithoutFeedback onPress={onPress}>
            <Animated.View style={[styles.iconContainer, {backgroundColor: isSelected ? "white" : "transparent"}]}>
                <Icon name={icon} size={22} color={isSelected ? "black" : fontGray} provider={provider} />
                <Animated.View style={[rStyle]}>
                {
                    isSelected &&
                    <View style={{paddingLeft: 10}}>
                        <NormalText numberOfLines={1} style={{color: "black", overflow: "hidden"}} text={label}/>
                    </View>
                }
                </Animated.View>
            </Animated.View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    tabBarContainer: {
        position: "absolute", 
        bottom: 30, 
        borderRadius: 50,
        borderTopWidth: 0, 
        paddingBottom: 0,
        flexDirection: 'row', gap: 0,
        justifyContent: 'space-between',
    },
    
    subTabBarContainer: {
        backgroundColor: "#0D0D0D",
        marginLeft: 20,
        overflow: "hidden",
        borderRadius: 50,
        borderTopWidth: 0, 
        paddingBottom: 0,
        paddingHorizontal: 8,
        flexDirection: 'row', gap: 0,
        alignItems: 'center',
        shadowColor: "black",
        shadowOffset: {
          width: 0,
          height: 0,
        },
        shadowOpacity:  0.5,
        shadowRadius: 5,
        elevation: 3
    },

    iconContainer: {
        justifyContent: 'center',
        flexDirection: 'row',
        gap: 0, 
        marginLeft: 0,
        marginVertical: 8, 
        borderRadius: 500, 
        padding: 18,
        flexGrow: 1,
        alignItems: 'center', 
        backgroundColor: "white",
    },


    addContainer: {
        backgroundColor: "#0D0D0D",
        borderRadius: 500,
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
        padding: 18,
        aspectRatio: 1,
        shadowColor: "black",
        shadowOffset: {
          width: 0,
          height: 0,
        },
        shadowOpacity:  0.5,
        shadowRadius: 5,
        elevation: 3
    }
})

export default CustomBottomTabBar;
