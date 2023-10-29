import {StyleSheet, View} from 'react-native';
import { useThemeColor } from '../../components/Themed';
import Animated from 'react-native-reanimated';

export function ProgressBar(props)
{
    const primaryColor = useThemeColor({}, "Primary")
    const pourcentage = props.pourcentage + "%"

    return (
        <View style={[props.style, styles.progressBar, {backgroundColor: primaryColor}]}>
            <Animated.View style={[StyleSheet.absoluteFill, {backgroundColor: props.couleur, width: pourcentage, borderRadius: 20}]}/>
        </View>
    )
}

const styles = StyleSheet.create({
    progressBar: {
        width: "100%",
        height: 4,
        borderRadius: 20,
    }
})