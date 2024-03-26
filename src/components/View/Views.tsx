import { useThemeColor } from "../Themed";
import { View, StyleSheet, SafeAreaView, KeyboardAvoidingView } from "react-native";
import React, { FC, Fragment, ReactNode } from "react";
import { LinearGradient } from 'expo-linear-gradient';
import { ScrollView } from "react-native-gesture-handler";

export interface BasicViewProps {
    hideMenu?: boolean,
    children: ReactNode
}

export interface UsualScreenProps extends BasicViewProps {
    secondaryBackground?: boolean
}


export const UsualScreen: FC<UsualScreenProps> = ({hideMenu, secondaryBackground, children}) => {

    const primary = useThemeColor({}, "Primary")
    const secondary = useThemeColor({}, "Secondary")
    const linearGradientOpacityStart = useThemeColor({}, "LinearGradientOpacityStart")
    const linearGradientOpacityEnd = useThemeColor({}, "LinearGradientOpacityEnd")

    return(
        <View style={{flex: 1, backgroundColor: primary}}>
            <SafeAreaView style={{ flex: 1, backgroundColor: secondaryBackground ? secondary : primary }}>
                <View style={[styles.container, {paddingBottom: hideMenu ? 20 : 120}]}>
                    {children}
                </View>
            </SafeAreaView>
            {!hideMenu && <LinearGradient colors={[linearGradientOpacityStart, linearGradientOpacityEnd]} style={styles.linearGradient}/>}
        </View>
    )
}

export const CustomScrollView: FC<BasicViewProps> = ({hideMenu, children}) => {

    const marginBottom = hideMenu ? 0 : -100
    const marginHorizontal = -25

    return(
        <ScrollView showsVerticalScrollIndicator={false} style={{marginBottom, marginHorizontal}}>
            <KeyboardAvoidingView style={{marginBottom: -marginBottom, paddingHorizontal: -marginHorizontal}}>
                {children}
            </KeyboardAvoidingView>
        </ScrollView>
    )
}


const styles = StyleSheet.create({
    container: {
        padding: 30,
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