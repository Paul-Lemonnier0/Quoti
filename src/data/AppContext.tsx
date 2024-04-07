import React, { Dispatch, createContext, useEffect, useState } from "react";
import { CustomSpinnerView } from "../components/Spinners/CustomSpinnerView";
import { ThemeProps } from "../components/Themed";
import { useColorScheme } from "react-native";
import Colors from "../constants/Colors";
import AsyncStorage from "@react-native-async-storage/async-storage";

export interface AppContextType {
    setIsLoading: Dispatch<React.SetStateAction<boolean>>,
    theme: ThemeProps,
    handleSetTheme: (theme: ThemeProps) => void,
}

const AppContext = createContext<AppContextType>({
    setIsLoading: () => {},
    theme: {dark: "dark"},
    handleSetTheme: () => {}
})

const AppContextProvider = ({children}) => {

    const [isLoading, setIsLoading] = useState(false)

    const colorScheme = useColorScheme() ?? "light"
    const [theme, setTheme] = useState<ThemeProps>({light: "light"})

    const getDefaultTheme = async() => {
        let defaultTheme: ThemeProps = {}
        
        try {
            const theme = await AsyncStorage.getItem("theme")
            if(theme) {
                defaultTheme[theme] = theme
                return defaultTheme
            }
            
            else {
                defaultTheme[colorScheme] = colorScheme
            }
        }

        catch(e) {
            defaultTheme[colorScheme] = colorScheme
        }

       return defaultTheme
    }

    useEffect(() => {
        const setDefaultTheme = async () => {
          const defaultTheme = await getDefaultTheme();
          setTheme(defaultTheme);
        };
        
        setDefaultTheme();
      }, []);


    const handleSetTheme = (theme: ThemeProps) => {
        if(theme.light) {
            AsyncStorage.setItem("theme", "light")
        }

        else AsyncStorage.setItem("theme", "dark")
        setTheme(theme)
    }

    return(
        <AppContext.Provider value={{setIsLoading, theme, handleSetTheme}}>
            <>
            {children}
            {isLoading && <CustomSpinnerView/>}
            </>
        </AppContext.Provider>
    )
}

export {AppContext, AppContextProvider}