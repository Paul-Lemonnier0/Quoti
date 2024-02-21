import AnimatedLottieView from "lottie-react-native";
import LottieView from "lottie-react-native";
import { LegacyRef, forwardRef } from "react";
import { StyleSheet, View } from "react-native";

const Confetti = forwardRef((props, ref: LegacyRef<AnimatedLottieView> | undefined) => {
    return (

        <View style={styles.confetti}>
            <LottieView 
                ref={ref}
                source={require("../../assets/Animations/Confetti-Animation-bis.json")}
                autoPlay
                autoSize
                loop={false}
                style={{flex: 1}} 
            />

        </View>
    );
});

const styles = StyleSheet.create({
    confetti: {
        position: "absolute",
        top: 0, left: 0, bottom: 0, right: 0,
        height: "100%",
        width: "100%",
        zIndex: 1000000000,
        pointerEvents: "none",
    },
});

export default Confetti;
