import { Feather } from "@expo/vector-icons"
import { View } from "react-native"
import { useThemeColor } from "../Themed"
import { NormalGrayText, NormalText } from "../../styles/StyledText"
import { TouchableOpacity } from "react-native-gesture-handler"
import { StyleSheet } from "react-native"
import { TextInput } from "react-native"

export const IncrementButtons = ({value, setValue}) => {

    const font = useThemeColor({}, "Font")
    const secondary = useThemeColor({}, "Secondary")
    const primary = useThemeColor({}, "Primary")

    const handleIncrement = () => { if(value < 99) setValue(++value) }

    const handleDecrement = () => { if(value > 1) setValue(--value) }

    const handleChangeValue = (text) => { setValue(text); }

    const handleSetValueToDefault = () => { if(isNaN(parseInt(value))) setValue(1) }

    return(
        <View style={[styles.container, {backgroundColor: secondary}]}>
            
            <TouchableOpacity onPress={handleDecrement} style={styles.buttons}>
                <Feather name="minus" size={20} color={font}/>
            </TouchableOpacity>

            <TextInput style={[{backgroundColor: primary, color: font}, styles.valueContainer]} 
            inputMode="numeric"
            onBlur={handleSetValueToDefault}
            maxLength={2}
            onChangeText={handleChangeValue}
            value={value.toString() ?? ""}/>

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
        <View style={[styles.timeSelectorContainer, {backgroundColor: secondary, borderColor: font}]}>
            
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
        flex: 1, 
        justifyContent: "center", 
        alignItems: "center"
    },

    valueContainer: {
        margin: -5, 
        padding: 10, 
        justifyContent: "center", 
        alignItems: "center", 
        display: "flex",
        flexDirection: 'row',
        paddingHorizontal: 0,
        borderRadius: 10, 
        flex: 1,
        textAlign: "center"
    },

    container: {
        display: "flex", 
        flexDirection: "row", 
        alignItems:"center", 
        justifyContent: "center", 
        gap: 15, 
        borderRadius: 10, 
        padding: 10,
        maxWidth: 165,
        width: 165
    },

    timeSelectorContainer: {
        display: "flex", 
        flexDirection: "row", 
        alignItems:"center", 
        justifyContent: "center", 
        gap: 15, 
        borderRadius: 10, 
        padding: 10,
        borderWidth: 2,
        flex: 1
    }
})