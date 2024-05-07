import React, { FC, RefObject, useContext, useState } from "react";
import { AppContext } from "../../../data/AppContext";
import { useThemeColor } from "../../../components/Themed";
import { CustomStaticBottomSheet } from "../../../components/BottomSheets/CustomBottomSheet";
import { Share, StyleSheet, TouchableOpacity, View } from "react-native";
import { SubTitleText, TitleText } from "../../../styles/StyledText";
import { CloseButton, Icon, IconProvider } from "../../../components/Buttons/IconButtons";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { Database_changeBlockUserState, UserDataBase } from "../../../firebase/Database_User_Primitives";
import { auth } from "../../../firebase/InitialisationFirebase";
import { BottomScreenOpen_Impact, Success_Impact } from "../../../constants/Impacts";
import { UserContext } from "../../../data/UserContext";
import Toast from "react-native-toast-message";
import Command, { CommandType } from "../../../components/Other/Command";

export interface UserSettingsBottomScreenProps {
    bottomSheetModalRef: RefObject<BottomSheetModal>,
    detailledUser: UserDataBase
}

const UserSettingsBottomScreen: FC<UserSettingsBottomScreenProps> = ({
    bottomSheetModalRef, 
    detailledUser  
}) => {
    
    const {setIsLoading, theme} = useContext(AppContext)
    const {handleChangeBlockStateForUser} = useContext(UserContext)
    
    const error = useThemeColor(theme, "Error")

    const {user} = useContext(UserContext)
    const [isUserDetailledBlocked, setIsUserDetailledBlocked] = useState<boolean>(user?.blocked?.includes(detailledUser.uid) ?? false)

    const handleBlockChangeState = () => {
        const isToBlock = !isUserDetailledBlocked

        if(auth.currentUser) {
            handleChangeBlockStateForUser(detailledUser.uid, detailledUser.email, isToBlock)
            setIsUserDetailledBlocked(isToBlock)
            Success_Impact()
        }

        Success_Impact()
        Toast.show({
            type: "info",
            text1: ("Utilisateur " + (isToBlock ? "bloqué !" : "débloqué !")),
            position: "top",
            visibilityTime: 3000,
            swipeable: true
        })

        closeModal()
    }

    const handleMaskPostChangeState = () => {

    }

    const handleShareProfil = async() => {
        BottomScreenOpen_Impact()

        const link = user ? `exp://172.20.10.2:8081/--/SharedProfilScreen?userID='50'&userID=${user.uid}` : ""

        try{
            if(user) {
                const result = await Share.share({
                    message: detailledUser.displayName + ", " + detailledUser.firstName + " " + detailledUser.lastName,
                    url: link,
                })
                
                if(result.action === Share.sharedAction){
                    //shared
                }

                else if(result.action === Share.dismissedAction){
                    //Pas shared
                }
            }
        }

        catch(e){
            console.log("Shared Error : ", e)
        }
    }

    const commands: CommandType[] = [
        {icon: "share", provider: IconProvider.Feather, text:"Partager ce profil", method: handleShareProfil},
        {icon: "eye-off", provider: IconProvider.Feather, text:"Masquer ses posts", method: handleMaskPostChangeState},
        {icon: "block", provider: IconProvider.Entypo, text: isUserDetailledBlocked ? "Débloquer" : "Bloquer", method: handleBlockChangeState, color: error}
    ]

    const closeModal = () => {
        bottomSheetModalRef.current?.close()
    }

    return (
        <CustomStaticBottomSheet 
            footerMethod={closeModal}
            footerText="Terminer"
            bottomSheetModalRef={bottomSheetModalRef}>
            <View style={styles.container}>
                <View>
                    {
                        commands.map((command, index) => <Command {...command} key={index}/>)
                    }
                </View>
            </View>
        </CustomStaticBottomSheet>
    );
};

const styles = StyleSheet.create({
    container: {
        display: "flex", 
        flexDirection: "column", 
        justifyContent: "space-between",
        gap: 30, 
        marginBottom: 30,
    },

    displayRow: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 30,
        marginVertical: 20
    },

    pageTitleContainer: {
        display: "flex", 
        flexDirection: "row", 
        alignItems:"center", 
        justifyContent: "space-between",
        gap: 20,
        marginLeft: 5,
    },
})

export default UserSettingsBottomScreen
  
