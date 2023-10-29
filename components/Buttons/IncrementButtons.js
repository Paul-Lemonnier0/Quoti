import { Feather } from "@expo/vector-icons"
import { View } from "react-native"
import { useThemeColor } from "../Themed"
import { NormalGrayText, NormalText } from "../../styles/StyledText"
import { TouchableOpacity } from "react-native-gesture-handler"
import { StyleSheet } from "react-native"
import { TextInput } from "react-native"

export const IncrementButtons = ({value, setValue, isBorderHidden}) => {

    const font = useThemeColor({}, "Font")
    const secondary = useThemeColor({}, "Secondary")

    const handleIncrement = () => { if(value < 99) setValue(++value) }
    const handleDecrement = () => { if(value > 1) setValue(--value) }

    return(
        <View style={[styles.container, {backgroundColor: secondary, borderColor: isBorderHidden ? secondary : font}]}>
            
            <TouchableOpacity onPress={handleDecrement} style={styles.buttons}>
                <Feather name="minus" size={20} color={font}/>
            </TouchableOpacity>

            <View style={[styles.valueContainer]}>
                <NormalText text={value}/>
            </View>

            <TouchableOpacity onPress={handleIncrement} style={styles.buttons}>
                <Feather name="plus" size={20} color={font}/>
            </TouchableOpacity>

        </View>
    )
}

export const IncrementTime = ({value, setValue, isDisabled, isMinutes}) => {

    const font = useThemeColor({}, "Font")
    const fontGray = useThemeColor({}, "FontGray")
    const secondary = useThemeColor({}, "Secondary")

    const suffixe = isMinutes ? " min": " h"

    const handleIncrement = () => {
        isMinutes ? setValue((value + 5) % 60) : setValue((value + 1) % 24)
    }

    const handleDecrement = () => {
        isMinutes ? setValue((value - 5) < 0 ? 55 : (value - 5)) : setValue(value-1 < 0 ? 23 : value-1)
    }

    return(
        <View style={[styles.container, {backgroundColor: secondary, borderColor: font}]}>
            
            <TouchableOpacity onPress={handleDecrement} style={styles.buttons} disabled={isDisabled}>
                <Feather name="minus" size={20} color={isDisabled ? fontGray : font}/>
            </TouchableOpacity>

            <View style={[styles.valueContainer]}>
                {isDisabled ? <NormalGrayText text={value + suffixe}/> : <NormalText text={value + suffixe}/>}
            </View>

            <TouchableOpacity onPress={handleIncrement} style={styles.buttons} disabled={isDisabled}>
                <Feather name="plus" size={20} color={isDisabled ? fontGray : font}/>
            </TouchableOpacity>

        </View>
    )
}

const styles = StyleSheet.create({
    buttons: {
        paddingHorizontal: 5,
        justifyContent: "center", 
        alignItems: "center"
    },

    valueContainer: {
        margin: -5, 
        padding: 10, 
        paddingHorizontal: 0,
        borderRadius: 10, 
        textAlign: "center"
    },

    container: {
        display: "flex", 
        flexDirection: "row", 
        alignItems:"center", 
        justifyContent: "space-between", 
        gap: 15, 
        borderRadius: 10, 
        padding: 10,
        borderWidth: 2,
        flex: 1
    },

})