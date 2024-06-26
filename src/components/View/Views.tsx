import { useThemeColor } from "../Themed";
import { View, StyleSheet, SafeAreaView, KeyboardAvoidingView, NativeSyntheticEvent, NativeScrollEvent } from "react-native";
import React, { FC, Fragment, ReactNode, useContext, useState } from "react";
import { LinearGradient } from 'expo-linear-gradient';
import { ScrollView } from "react-native-gesture-handler";
import { AppContext } from "../../data/AppContext";
import Animated from "react-native-reanimated";
import { RefreshControl } from "react-native";

export interface BasicViewProps {
    hideMenu?: boolean,
    children: ReactNode
}

export interface UsualScreenProps extends BasicViewProps {
    secondaryBackground?: boolean
}


export const UsualScreen: FC<UsualScreenProps> = ({hideMenu, secondaryBackground, children}) => {
    const {theme} = useContext(AppContext)

    const primary = useThemeColor(theme, "Primary")
    const secondary = useThemeColor(theme, "Secondary")
    const linearGradientOpacityStart = useThemeColor(theme, "LinearGradientOpacityStart")
    const linearGradientOpacityEnd = useThemeColor(theme, "LinearGradientOpacityEnd")

    return(
        <View style={{flex: 1, backgroundColor: primary}}>
            <SafeAreaView style={{ flex: 1, backgroundColor: secondaryBackground ? secondary : primary }}>
                <View style={[styles.container, {paddingBottom: hideMenu ? 20 : 120}]}>
                    {children}
                </View>
            </SafeAreaView>
            {/* {!hideMenu && <LinearGradient colors={[linearGradientOpacityStart, linearGradientOpacityEnd]} style={styles.linearGradient}/>} */}
        </View>
    )
}

interface CustomScrollViewProps extends BasicViewProps {
    onRefresh?: () => void
    refreshing?: boolean
    onScroll?: (e: NativeSyntheticEvent<NativeScrollEvent>) => void
}

export const CustomScrollView: FC<CustomScrollViewProps> = ({
    hideMenu,
    refreshing,
    onRefresh,
    onScroll,
    children
}) => {

    const marginBottom = hideMenu ? 0 : -130
    const marginHorizontal = -25
    /*KeyboardAvoidView => warn override anim*/

    return(
        <ScrollView 
            onScroll={onScroll}
            scrollEventThrottle={50}
            refreshControl={
                onRefresh ? 
                    <RefreshControl 
                        colors={["#9Bd35A", "#689F38"]}
                        refreshing={refreshing ?? false}
                        onRefresh={onRefresh}
                    />          
                    : undefined
                }
            showsVerticalScrollIndicator={false} style={{
                marginBottom, 
                marginHorizontal
            }}>
            <View style={{marginBottom: -marginBottom, paddingHorizontal: -marginHorizontal}}> 
                {children}
            </View>
        </ScrollView>
    )
}

export const AnimatedCustomScrollView: FC<CustomScrollViewProps> = ({
    hideMenu,
    refreshing,
    onRefresh,
    onScroll,
    children
}) => {

    const marginBottom = hideMenu ? 0 : -100
    const marginHorizontal = -25
    /*KeyboardAvoidView => warn override anim*/

    return(
        <Animated.ScrollView 
            onScroll={onScroll}
            scrollEventThrottle={50}
            refreshControl={
                onRefresh ? 
                    <RefreshControl 
                        colors={["#9Bd35A", "#689F38"]}
                        refreshing={refreshing ?? false}
                        onRefresh={onRefresh}
                    />          
                    : undefined
                }
            showsVerticalScrollIndicator={false} style={{
                marginBottom, 
                marginHorizontal
            }}>
            <View style={{marginBottom: -marginBottom, paddingHorizontal: -marginHorizontal}}> 
                {children}
            </View>
        </Animated.ScrollView>
    )
}


const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        paddingTop: 10,
        marginBottom: -20,
        paddingBottom: 0,
        flex:1,
        gap: 0,
        display: "flex",           
    },

    linearGradient: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        height: 150,
      },
})