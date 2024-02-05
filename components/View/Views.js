import { useThemeColor } from "../Themed";
import { View, StyleSheet, SafeAreaView, KeyboardAvoidingView } from "react-native";
import { Fragment } from "react";
import { LinearGradient } from 'expo-linear-gradient';
import { ScrollView } from "react-native-gesture-handler";

export const MainView = (props) => {
    const primary = useThemeColor({}, "Primary")
    const secondary = useThemeColor({}, "Secondary")

    return(
        <Fragment>
            <SafeAreaView style={[styles.container, { flex: 0, backgroundColor: secondary }]}/>
            <SafeAreaView style={{ flex: 1, backgroundColor: primary }}>
                <View style={[styles.container]}>
                    {props.children}
                </View>
            </SafeAreaView>
        </Fragment>
    );
}

export const TopScreenView = (props) => {

    const primary = useThemeColor({}, "Primary")
    const secondary = useThemeColor({}, "Secondary")

    return(
        <View style={[styles.headerParentContainer, {backgroundColor:primary}]}>
            <View style={[styles.headerContainer, {backgroundColor:secondary}]}>
                {props.children}
            </View>
        </View>
    );
}

export const UsualScreen = (props) => {

    const primary = useThemeColor({}, "Primary")
    const secondary = useThemeColor({}, "Secondary")
    const linearGradientOpacity = useThemeColor({}, "LinearGradientOpacity")

    return(
        <View style={{flex: 1, backgroundColor: primary}}>
            <SafeAreaView style={{ flex: 1, backgroundColor: props.secondaryBackground ? secondary : primary }}>
                <View style={[styles.container, {paddingBottom: props.hideMenu ? 0 : 120}]}>
                    {props.children}
                </View>
            </SafeAreaView>
            {!props.hideMenu && <LinearGradient colors={linearGradientOpacity} style={styles.linearGradient}/>}
        </View>
    )
}

export const BackgroundView = (props) => {

    const primary = useThemeColor({}, "Primary")

    return(
    <View style={[styles.AltBackgroundView, {backgroundColor: primary}, props.style]}>
            {props.children}
    </View>
    );
}

export const CustomScrollView = ({hiddenMenu, ...props}) => {

    const marginBottom = hiddenMenu ? 0 : -100
    const marginHorizontal = -25

    return(
        <ScrollView showsVerticalScrollIndicator={false} style={{marginBottom, marginHorizontal}} {...props}>
            <KeyboardAvoidingView style={{marginBottom: -marginBottom, paddingHorizontal: -marginHorizontal}}>
                {props.children}
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