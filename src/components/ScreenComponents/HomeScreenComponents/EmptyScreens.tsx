import { Image, StyleSheet, View } from "react-native"
import IllustrationsList, { IllustrationsType } from "../../../data/IllustrationsList"
import { getHeightResponsive, getWidthResponsive } from "../../../styles/UtilsStyles"
import { NormalGrayText, NormalText, SubText, SubTitleText } from "../../../styles/StyledText"
import { PeriodeType } from "../../../types/HomeScreenTypes"
import { FC } from "react"
import { FrequencyTypes } from "../../../types/HabitTypes"
import React from "react"

export interface NothingToDoScreenProps {
    selectedPeriode: FrequencyTypes
}

const NothingToDoScreen: FC<NothingToDoScreenProps> = ({selectedPeriode}) => {

    let sentence = "Rien de prévu "

    switch(selectedPeriode){
        case FrequencyTypes.Quotidien:
            sentence += "ce jour"
            break
        case FrequencyTypes.Hebdo:
            sentence += "cette semaine"
            break
        case FrequencyTypes.Mensuel:
            sentence += "ce mois-ci"
            break
    }
    
    return(
        <View style={styles.loadingAndEmptyScreenContainer}>
            <View style={styles.emptySreenContainer}>
                <Image style={styles.emptyScreenImageContainer} source={IllustrationsList[IllustrationsType.NothingPlanned]}/>
                <View style={styles.emptyScreenSubContainer}>
                    <SubTitleText text={sentence}/>
                    <NormalGrayText text="Profitez en pour vous reposer !"/>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    loadingAndEmptyScreenContainer: {
        flex:1,
        flexGrow: 1,
        marginVertical: getHeightResponsive(50),
        marginHorizontal: getWidthResponsive(50)
    },  

    emptySreenContainer: {
        flex: 1, 
        flexGrow: 1, 
        justifyContent: "space-between", 
        alignItems: "center", 
        gap: getHeightResponsive(30),
        marginTop: getHeightResponsive(20)
    },

    emptyScreenImageContainer: {
        resizeMode: 'contain', 
        aspectRatio: 1, 
        width: "80%", 
        maxHeight: "80%"
    },

    emptyScreenSubContainer: {
        justifyContent: "space-evenly", 
        alignItems: "center",
        gap: 5
    },
})

export {NothingToDoScreen}