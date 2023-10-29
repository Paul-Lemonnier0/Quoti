import { forwardRef, useImperativeHandle, useState } from "react"
import { useThemeColor } from "../Themed"
import { TextInput, View } from "react-native"
import { StyleSheet } from "react-native";
import { NormalText, SubTitleText } from "../../styles/StyledText";

export const TextInputCustom = forwardRef(({ startingValue, labelName, onFocus, onBlur, isWrong, ...props }, ref) => {

    const [value, setValue] = useState(startingValue ? startingValue : "");

    useImperativeHandle(ref, () => ({
        getValue: () => value,
    }));

    const [isFieldFocus, setIsFieldFocus] = useState(false)
    const secondary = useThemeColor({}, "Secondary") 
    const font = useThemeColor({}, "Font") 
    const fontGray = useThemeColor({}, "FontGray") 
    const errorColor = useThemeColor({}, "Error") 


    return(
        <View style={styles.container}>
            <SubTitleText text={labelName}/>
            <TextInput {...props} placeholderTextColor={fontGray} selectionColor={font}
                value={value} onChangeText={setValue} autoCorrect={false}
                
                onFocus={() => {setIsFieldFocus(true); onFocus && onFocus()}}
                onBlur={() => {setIsFieldFocus(false); onBlur && onBlur()}}

                style={[styles.textInput, {
                            borderColor: isFieldFocus ? font : (isWrong ? errorColor : secondary),
                            backgroundColor: secondary, 
                            color: font, 
                        }
                    ]}
            />
        </View>
    )
})

const styles = StyleSheet.create({
    container: {    
        display: 'flex', 
        flexDirection: "column", 
        gap: 10,
        marginVertical: 10,   
    },

    textInput: {
        borderWidth: 2,
        fontFamily: "poppinsLight", 
        borderRadius: 10, 
        fontSize: 14, 
        padding: 12, 
        paddingHorizontal: 15
    }
})
