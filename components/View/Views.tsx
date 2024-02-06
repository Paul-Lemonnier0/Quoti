import { useThemeColor } from "../Themed";
import { View, StyleSheet, SafeAreaView, KeyboardAvoidingView } from "react-native";
import React, { FC, Fragment, ReactNode } from "react";
import { LinearGradient } from 'expo-linear-gradient';
import { ScrollView } from "react-native-gesture-handler";

interface BasicViewProps {
    hideMenu?: boolean,
    children: ReactNode
}

interface UsualScreenProps extends BasicViewProps {
    secondaryBackground?: boolean
}


export const UsualScreen: FC<UsualScreenProps> = ({hideMenu, secondaryBackground, children}) => {

    const primary = useThemeColor({}, "Primary")
    const secondary = useThemeColor({}, "Secondary")
    const linearGradientOpacity = useThemeColor({}, "LinearGradientOpacity")

    return(
        <View style={{flex: 1, backgroundColor: primary}}>
            <SafeAreaView style={{ flex: 1, backgroundColor: secondaryBackground ? secondary : primary }}>
                <View style={[styles.container, {paddingBottom: hideMenu ? 0 : 120}]}>
                    {children}
                </View>
            </SafeAreaView>
            {!hideMenu && <LinearGradient colors={linearGradientOpacity} style={styles.linearGradient}/>}
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

    headerContainer: {
      margin: -30, 
      marginBottom:0, 
      paddingHorizontal: 30, 
      paddingVertical:15,
      borderBottomLeftRadius: 40, 
      borderBottomRightRadius: 40, 
    },
  
    headerParentContainer: {
      margin: -30, 
      marginBottom:0, 
      padding: 30, 
        
    },

    backgroundView: {
        gap: 5,
        flex:1,
        flexGrow:1,
        borderBottomLeftRadius: 50,
        borderBottomRightRadius: 50,
        margin:-30, 
        marginBottom:0, 
        padding:30, 
        paddingVertical: 15, 
    },

    AltBackgroundView: {
        gap: 5,
        flex:1,
        flexGrow:1,
        margin:-30, 
        marginBottom:0, 
        padding:30,  
        paddingVertical: 15, paddingBottom: 0
    },

    container: {
        padding: 30,
        paddingTop: 10,
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