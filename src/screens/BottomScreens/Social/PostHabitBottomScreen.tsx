import React, { FC, useContext, useRef, useState } from 'react'
import { HabitCompletedBottomScreenStackProps } from '../Habitudes/HabitCompletedBottomScreenNav'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { UsualScreen } from '../../../components/View/Views'
import { Keyboard, StyleSheet } from 'react-native'
import { TouchableWithoutFeedback } from 'react-native'
import { View } from 'react-native'
import { CustomTextInputRefType, TextInputCustom } from '../../../components/TextFields/TextInput'
import { BackgroundTextButton } from '../../../components/Buttons/UsualButton'
import { CloseButton, NavigationActions, NavigationButton } from '../../../components/Buttons/IconButtons'
import { HugeText, NormalGrayText, TitleText } from '../../../styles/StyledText'
import { BottomScreenOpen_Impact, Error_Impact, Success_Impact } from '../../../constants/Impacts'
import Toast from 'react-native-toast-message'
import { postHabitActivity, PostStateType } from '../../../firebase/Firestore_Posts_Primitives'
import { UserContext } from '../../../data/UserContext'
import { BottomSheetModalMethodsContext } from '../../../data/BottomSheetModalContext'
import { AppContext } from '../../../data/AppContext'

type PostHabitScreenProps = NativeStackScreenProps<HabitCompletedBottomScreenStackProps, "PostCompletedHabitScreen">

const PostHabitScreen: FC<PostHabitScreenProps> = ({route}) => {

    const {user} = useContext(UserContext)
    const {closeModal} = useContext(BottomSheetModalMethodsContext)
    const {setIsLoading} = useContext(AppContext)

    const postLegendRef = useRef<CustomTextInputRefType>(null)
    const [isLegendError, setIsLegendError] = useState<boolean>(false)

    const {habit} = route.params

    const handlePost = async() => {
        BottomScreenOpen_Impact()
        
        const legend = postLegendRef.current?.getValue()

        if(legend && legend.trim().length > 0) {
            setIsLoading(true)

            setIsLegendError(false)
            
            if(user && user.email) {
                const postID = await postHabitActivity(user.uid, user.email, habit, legend, PostStateType.Done)
                if(!(postID === null)) {
                    Toast.show({
                        type: "info",
                        text1: "Publication partagée !"
                    })

                    Success_Impact()
                    closeModal()
                }

                else {
                    Toast.show({
                        type: "error",
                        text1: "Erreur lors du partage"
                    })

                    Error_Impact()
                    closeModal()
                }
            }

            setIsLoading(false)
        }

        else setIsLegendError(true)
    }

    return (
        <UsualScreen hideMenu>
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()} style={{flex: 1}}>
                <View style={styles.container}>
                    <View style={{flexDirection: "row", justifyContent: "space-between"}}>
                        <NavigationButton action={NavigationActions.goBack}/>
                    </View>

                    <View style={{flex: 1, gap: 20, paddingBottom: 60}}>
                        <View style={{ gap: 20 }}>
                            <View style={{gap: 10}}>
                                <HugeText text={"Ecrivez une légende"}/>
                                <NormalGrayText bold text={"Partagez votre expérience au travers d'une courte description de celle-ci."}/>
                            </View>
                            
                            <View style={{height: 175}}>
                                <TextInputCustom
                                    showAmountOfChars
                                    hideErrorIcon
                                    isWrong={isLegendError}
                                    placeholder="Décrivez votre expérience..."
                                    ref={postLegendRef}
                                    multiline/>
                            </View>
                        </View>
                    </View>

                    <View style={{}}>
                        <View style={{display: "flex", flexDirection: "row", gap: 20}}>
                            <BackgroundTextButton isFlex text={"Publier"} onPress={handlePost} bold/>
                        </View>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </UsualScreen>
    )
}

const styles = StyleSheet.create({
    container: {
        display: "flex", 
        flexDirection: "column", 
        gap: 20, 
        flex: 1,
    },
})

export default PostHabitScreen