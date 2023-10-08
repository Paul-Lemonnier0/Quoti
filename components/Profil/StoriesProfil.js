import { Text, TouchableOpacity, View, Image, StyleSheet } from "react-native"
import { useState } from "react"
import { useThemeColor } from "../Themed"
import { LittleNormalText, SubText } from "../../styles/StyledText"
import { LinearGradient } from "expo-linear-gradient"
export const StoriesProfil = ({profil}) => {

    const secondary = useThemeColor({}, "Secondary")
    const primary = useThemeColor({}, "Primary")
    const contrast = useThemeColor({}, "Contrast")

    const [isLoading, setIsLoading] = useState(true)

    const handleStopLoad = () => {
        setIsLoading(false)
    }

    return(
        <TouchableOpacity style={styles.container}>
            <LinearGradient         colors={[contrast, "#543fd7", "#422db3"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
            style={[styles.imageContainer, {backgroundColor: contrast}]}>
                <View style={[styles.subImageContainer, {backgroundColor: secondary}]}>
                    <Image 
                    onLoadEnd={handleStopLoad}
                    style={[
                        styles.imageStyle, 
                        {
                            backgroundColor: secondary
                        }]} source={profil.image}>
                    </Image>
                </View>

            </LinearGradient>

            <LittleNormalText text={profil.nom}/>
        </TouchableOpacity>
    )
} 

const styles = StyleSheet.create(
    {  
        imageContainer: {
            borderRadius: 50,
            alignItems:"center", 
            justifyContent:"center", 
            width: 75, height: 75
        },

        subImageContainer: {
            margin: 3,
            padding: 3, 
            borderRadius: 50, 
            alignItems:"center", 
            justifyContent:"center"
        },

        imageStyle: {
            alignSelf: 'center',
            justifyContent: 'center',
            resizeMode: 'contain',
            aspectRatio: 1,
            width: "100%", height: "100%",
            borderRadius: 50,
        },

        container: {
            display: "flex", 
            flexDirection:"column", 
            justifyContent:"center", 
            alignItems: "center", 
            gap: 5,
        }
    }
)