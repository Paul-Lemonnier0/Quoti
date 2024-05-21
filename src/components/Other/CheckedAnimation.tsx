import AnimatedLottieView from "lottie-react-native";
import LottieView from "lottie-react-native";
import { LegacyRef, forwardRef } from "react";
import { StyleSheet, View } from "react-native";
import React from "react"

const CheckedAnimation = forwardRef((props, ref: LegacyRef<AnimatedLottieView> | undefined) => {
    return (

        <View style={styles.checkedAnimation}>
            <LottieView 
                ref={ref}
                source={require("../../assets/Animations/Checked-Animation.json")}
                autoPlay
                loop={false}
                style={{flex: 1}} 
                duration={2100}
            />

        </View>
    );
});

const styles = StyleSheet.create({
    checkedAnimation: {
        // position: "absolute",
        // top: 0, left: 0, bottom: 0, right: 0,
        // height: "100%",
        // width: "100%",
        flex: 1,
        zIndex: 1000000000,
        pointerEvents: "none",
    },
});

export default CheckedAnimation;
