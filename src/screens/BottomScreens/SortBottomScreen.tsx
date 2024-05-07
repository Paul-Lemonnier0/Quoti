import { BottomSheetModal } from "@gorhom/bottom-sheet";
import React, { FC, RefObject, useContext } from "react";
import { AppContext } from "../../data/AppContext";
import { CustomStaticBottomSheet } from "../../components/BottomSheets/CustomBottomSheet";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { BottomSheetCloseButton, CloseButton, Icon, IconProvider } from "../../components/Buttons/IconButtons";
import { NormalGrayText, SubTitleText, TitleText } from "../../styles/StyledText";
import { useThemeColor } from "../../components/Themed";
import Command, { CommandType } from "../../components/Other/Command";

export interface SortBottomScreenProps {
    bottomSheetModalRef: RefObject<BottomSheetModal>,
    sortByName?: () => void,
    sortByNameDesc?: () => void,
    sortByLatestDate?: () => void,
    sortByOldestDate?: () => void,
    noSort: () => void,
}

const SortBottomScreen: FC<SortBottomScreenProps> = ({
    bottomSheetModalRef, 
    sortByName,
    sortByNameDesc,
    sortByLatestDate,
    sortByOldestDate,
    noSort,
}) => {
    
    const {setIsLoading, theme} = useContext(AppContext)
    
    const error = useThemeColor(theme, "Error")

    const commands: CommandType[] = []
    
    sortByName ? commands.push({icon: "sort-alphabetical-ascending", provider: IconProvider.MaterialCommunityIcons, text:"Titre (croissant)", method: sortByName}) : undefined
    sortByNameDesc ? commands.push({icon: "sort-alphabetical-descending", provider: IconProvider.MaterialCommunityIcons, text:"Titre (décroissant)", method: sortByNameDesc}) : undefined
    sortByLatestDate ? commands.push({icon: "sort-calendar-ascending", provider: IconProvider.MaterialCommunityIcons, text:"Date de début (la plus récente)", method: sortByLatestDate}) : undefined
    sortByOldestDate ? commands.push({icon: "sort-calendar-descending", provider: IconProvider.MaterialCommunityIcons, text:"Date de début (la plus ancienne)", method: sortByOldestDate}) : undefined
    commands.push({icon: "sort-variant-remove", provider: IconProvider.MaterialCommunityIcons, text:"Pas de tri", method: noSort, color: error})

    const closeModal = () => {
        bottomSheetModalRef.current?.close()
    }
  
    return (
        <CustomStaticBottomSheet 
            footerMethod={() => bottomSheetModalRef.current?.close()}
            footerText="Terminer"
            bottomSheetModalRef={bottomSheetModalRef}>
            <View style={styles.container}>
                <View style={styles.pageTitleContainer}>
                    <TitleText text="Trier par"/>
                    <BottomSheetCloseButton methode={closeModal}/>
                </View>
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

export default SortBottomScreen
  
