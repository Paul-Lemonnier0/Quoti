import React, { FC, RefObject, useContext } from "react";
import { CustomStaticBottomSheet } from "../../../components/BottomSheets/CustomBottomSheet";
import { StyleSheet, View } from "react-native";
import { BottomSheetCloseButton, CloseButton, IconProvider } from "../../../components/Buttons/IconButtons";
import { BottomSheetModal } from "@gorhom/bottom-sheet";

import { TitleText } from "../../../styles/StyledText";
import Command, { CommandType } from "../../../components/Other/Command";
import { AppContext } from "../../../data/AppContext";
import { useThemeColor } from "../../../components/Themed";

export interface PostSettingsBottomScreenProps {
    bottomSheetModalRef: RefObject<BottomSheetModal>,
    postID: string
}

const PostSettingsBottomScreen: FC<PostSettingsBottomScreenProps> = ({
    bottomSheetModalRef, 
    postID  
}) => {
    
    const {theme} = useContext(AppContext)
    const error = useThemeColor(theme, "Error")

    const closeModal = () => {
        bottomSheetModalRef.current?.close()
    }
    
    const commands: CommandType[] = [
        {icon: "eye-off", provider: IconProvider.Feather, text:"Masquer cette habitude", method: () => {}},
        {icon: "user-minus", provider: IconProvider.Feather, text:"Ne plus suivre", method: () => {}, color: error},
    ]

    return (
        <CustomStaticBottomSheet 
            footerMethod={closeModal}
            footerText="Terminer"
            bottomSheetModalRef={bottomSheetModalRef}>
            <View style={styles.container}>
                <View style={styles.pageTitleContainer}>
                    <TitleText text={"Paramètres"}/>
                    <BottomSheetCloseButton methode={closeModal}/>
                </View>

                <View style={{flexDirection: "column", gap: 40, marginBottom: 10}}>
                    <View>
                    {
                        commands.map((command, index) => <Command {...command} key={index}/>)
                    }
                    </View>
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
        gap: 30,
        marginVertical: 20
    },

    pageTitleContainer: {
        display: "flex", 
        flexDirection: "row", 
        alignItems:"center", 
        justifyContent: "space-between",
        gap: 20,
    },
})

export default PostSettingsBottomScreen
  
