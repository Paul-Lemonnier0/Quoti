import React, { FC, RefObject } from "react";
import { CustomStaticBottomSheet } from "../../../components/BottomSheets/CustomBottomSheet";
import { StyleSheet, View } from "react-native";
import { BottomSheetCloseButton, CloseButton } from "../../../components/Buttons/IconButtons";
import { BottomSheetModal } from "@gorhom/bottom-sheet";

import { TitleText } from "../../../styles/StyledText";

export interface CommentsBottomScreenProps {
    bottomSheetModalRef: RefObject<BottomSheetModal>,
    postID: string
}

const CommentsBottomScreen: FC<CommentsBottomScreenProps> = ({
    bottomSheetModalRef, 
    postID  
}) => {
    
    const closeModal = () => {
        bottomSheetModalRef.current?.close()
    }

    return (
        <CustomStaticBottomSheet 
            bottomSheetModalRef={bottomSheetModalRef}>
            <View style={styles.container}>
                <View style={styles.pageTitleContainer}>
                    <TitleText text={"Commentaires"}/>
                    <BottomSheetCloseButton methode={closeModal}/>
                </View>

                <View style={{flexDirection: "column", gap: 40, marginBottom: 10}}>

                    <View style={{flexDirection: "row", justifyContent: "space-between"}}>
                   
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

export default CommentsBottomScreen
  
