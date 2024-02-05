import { Image, StyleSheet, View } from "react-native"
import IllustrationsList from "../../../data/IllustrationsList"
import { getHeightResponsive, getWidthResponsive } from "../../../styles/UtilsStyles"
import { NormalGrayText, NormalText, SubText, SubTitleText } from "../../../styles/StyledText"

const NothingToDoScreen = ({selectedPeriode}) => {

    let sentence = "Rien de prévu "

    switch(selectedPeriode){
        case "Quotidien":
            sentence += "ce jour"
            break
        case "Hebdo":
            sentence += "cette semaine"
            break
        case "Mensuel":
            sentence += "ce mois-ci"
            break
    }
    
    return(
        <View style={styles.loadingAndEmptyScreenContainer}>
            <View style={styles.emptySreenContainer}>
                <Image style={styles.emptyScreenImageContainer} source={IllustrationsList["NothingPlanned"]}/>
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