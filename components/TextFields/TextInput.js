import { useState } from "react"
import { useThemeColor } from "../Themed"
import { TextInput, View } from "react-native"

export const TextInputCustom = ({ setValue, startingValue, onFocus, onBlur, isWrong, ...props }) => {

    const [isFieldFocus, setIsFieldFocus] = useState(false)
    const secondary = useThemeColor({}, "Secondary") 
    const contrast = useThemeColor({}, "Contrast") 
    const font = useThemeColor({}, "Font") 
    const fontGray = useThemeColor({}, "FontGray") 
    const errorColor = useThemeColor({}, "Error") 

    const [temp_value, temp_setValue] = useState(startingValue ? startingValue : "");

    const handleSetValue = (text) => {
        temp_setValue(text)
        setValue(text)
        console.log(text)
    }

    return(
        <View style={
            {        
            display: 'flex', 
            flexDirection: "column", 
            gap: 20,
            marginVertical: 10, 
            }
        }>

            <TextInput 
                {...props}
                placeholderTextColor={fontGray}
                selectionColor={font}
                keyboardType="visible-password"
                value={temp_value}
                autoCorrect={false}
                onChangeText={text => handleSetValue(text)}

                onFocus={() => {
                    setIsFieldFocus(true);
                    onFocus && onFocus(); // Call the parent onFocus event if provided
                }}
                onBlur={() => {
                    setIsFieldFocus(false);
                    onBlur && onBlur(); // Call the parent onBlur event if provided
                }}
                style={{
                    borderWidth: 2,
                    borderColor: isFieldFocus ? font : (isWrong ? errorColor : secondary),
                    backgroundColor: secondary, 
                    fontFamily: "poppinsLight", 
                    borderRadius: 10, 
                    color: font, 
                    fontSize: 14, 
                    padding: 12, 
                    paddingHorizontal: 15
                }}
            />

        </View>
    )
}
