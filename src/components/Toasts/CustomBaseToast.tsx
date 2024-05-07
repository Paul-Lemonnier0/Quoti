import React, { useContext } from "react";
import { BaseToast, InfoToast, ToastConfig, ToastProps } from "react-native-toast-message";
import { AppContext } from "../../data/AppContext";
import { useThemeColor } from "../Themed";

interface CustomToastProps extends ToastProps {
    backgroundColor?: string,
    fontColor?: string
}

const CustomBaseToast = (props: CustomToastProps) => {
    const {theme} = useContext(AppContext)
    const font = useThemeColor(theme, "Font")
    const fontContrast = useThemeColor(theme, "FontContrast")

    return (
        <BaseToast
            {...props}
            
            style={{
                height: 60, 
                width: '70%', 
                marginTop: 10, 
                backgroundColor: props.backgroundColor ?? font,
                flex: 1,
                alignItems: "center",
                borderRadius: 20,
                justifyContent: "center",
                borderLeftColor:"yellow",
                borderLeftWidth: 0
            }} 

            text1Style={{
                fontFamily: "fontSemiBold",
                fontSize: 16,
                color: props.fontColor ?? fontContrast,
                textAlign: "center"
            }}
        />
    )
}

export const toastConfig: ToastConfig = {
    success: (props: any) => {
        const {theme} = useContext(AppContext)
        const success = useThemeColor(theme, "Success")
        const font = useThemeColor(theme, "Font")

        return (
            <CustomBaseToast {...props} backgroundColor={success} fontColor={font}/>
        )
    },

    error: (props: any) => {
        const {theme} = useContext(AppContext)
        const error = useThemeColor(theme, "Error")
        const font = useThemeColor(theme, "Font")

        return(
            <CustomBaseToast {...props} backgroundColor={error} fontColor={font}/>
        )
    },

    info: (props: any) => {
        return (
            <CustomBaseToast {...props}/>
        )
    }
}