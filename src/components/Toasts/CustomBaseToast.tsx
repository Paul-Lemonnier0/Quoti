import { View } from "react-native";
import { NormalGrayText, NormalText, SubTitleText } from "../../styles/StyledText";
import React
, { useContext } from "react";
import { ErrorToast, InfoToast, SuccessToast, ToastConfig } from "react-native-toast-message";
import { AppContext } from "../../data/AppContext";
import { useThemeColor } from "../Themed";
export const toastConfig: ToastConfig = {
    success: (props: any) => <SuccessToast {...props} style/>,
    error: (props: any) => <ErrorToast {...props}/>,
    info: (props: any) => {
    
        const {theme} = useContext(AppContext)
        const font = useThemeColor(theme, "Font")
        const fontContrast = useThemeColor(theme, "FontContrast")

        return (
            <InfoToast 
            {...props}
            
            swipeable
            autoHide
            style={{
                height: 60, 
                width: '70%', 
                marginTop: 10, 
                backgroundColor: font,
                flex: 1,
                alignItems: "center",
                borderRadius: 20,
                justifyContent: "center",
                border: "none",
                borderLeftColor:"yellow",
                borderLeftWidth: 0
            }} 

            text1Style={{
                fontFamily: "fontSemiBold",
                fontSize: 16,
                color: fontContrast,
                textAlign: "center"
            }}
            />
        )
    }
}