import { StyleSheet, TouchableOpacity, Image, View } from "react-native"
import { useThemeColor } from "../Themed"


import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { SubText } from "../../styles/StyledText"

import { useState } from "react"
import { Feather } from "@expo/vector-icons"

export const CircularBarProfil = ({profil, couleur}) =>
{
    const {nom, pourcentage, image, id} = profil

    const secondary = useThemeColor({}, "Secondary")
    const [isLoading, setIsLoading] = useState(true)

    const handleStopLoad = () => {
        setIsLoading(false)
    }

    return(

        <View style={styles.container}>
            <TouchableOpacity accessibilityLabel={id}>
            <AnimatedCircularProgress
                size={80}
                width={4}
                fill={pourcentage}
                tintColor={couleur}
                lineCap="round"
                backgroundColor={secondary}>
                    {
                        () => {
                        return(
                        <View style={{}}>
                            <Image 
                            onLoadEnd={handleStopLoad}
                            style={[
                                styles.imageStyle, 
                                {
                                    backgroundColor: isLoading ? secondary : "transparent"
                                }]} source={image}>

                            </Image>
                        </View>)    
                        }
                        }
                </AnimatedCircularProgress>
            </TouchableOpacity>

        <SubText text={nom}/>

        </View>

    )
}

export const AddCircularBarProfil = ({nom}) =>
{

    const fontGray = useThemeColor({}, "FontGray")
    const secondary = useThemeColor({}, "Secondary")
    const primary = useThemeColor({}, "Primary")

    return(

        <View style={styles.container}>
            <TouchableOpacity accessibilityLabel={nom}>
            <View
                style={{backgroundColor:secondary, borderRadius: 50, width: 80, height: 80,
                display:"flex", alignItems: "center", justifyContent:"center"}}>
                    <Feather name="plus" size={25} color={fontGray}/>
                </View>
            </TouchableOpacity>

        <SubText text={nom}/>

        </View>

    )
}

const styles = StyleSheet.create(
    {  
        imageStyle: {
            alignSelf: 'center',
            justifyContent: 'center',
            resizeMode: 'contain',
            aspectRatio: 1,
            width: "100%", height: "100%",
            borderRadius: 15,
        },

        container: {
            display: "flex", 
            flexDirection:"column", 
            justifyContent:"center", 
            alignItems: "center", 
            gap: 10
        }
    }
)