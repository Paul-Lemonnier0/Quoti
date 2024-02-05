import { StyleSheet } from "react-native"
import { getWidthResponsive } from "../../../styles/UtilsStyles"
import { FlatList } from "react-native-gesture-handler"
import { BorderIconButton } from "../../Buttons/IconButtons"
import { BackgroundRadioButton } from "../../RadioButtons/RadioButton"

const RenderPeriode = ({periode, selectedPeriode, setPeriode, handleOpenCalendar}) => {

    if(periode === "Calendar") {
      return <BorderIconButton onPress={handleOpenCalendar} name="calendar-range-outline" provider="MaterialCommunityIcons"/>
    }

    const isSelected = periode.frequency === selectedPeriode

    return(
      <BackgroundRadioButton bold isHighlight={isSelected} text={periode.displayedText} number={periode.nbElements}
            handleOnClick={() => setPeriode(periode)}/>
    )
}

export const Periodes = ({periodes, selectedPeriode, setPeriode, handleOpenCalendar}) => {
    return(
        <FlatList 
            data={periodes}

            renderItem={({item}) => (
                <RenderPeriode 
                    periode={item} 
                    setPeriode={setPeriode}
                    selectedPeriode={selectedPeriode} 
                    handleOpenCalendar={handleOpenCalendar}/>
                )
            }

            horizontal={true} 
            showsHorizontalScrollIndicator={false}
            
            style={styles.periodesContainerStyle}
            contentContainerStyle={styles.periodesContentContainerStyle}
        />
    )
}

const styles = StyleSheet.create({
    periodesContainerStyle: {
        marginHorizontal: getWidthResponsive(-30)
    },

    periodesContentContainerStyle: {
        gap: getWidthResponsive(15), 
        paddingHorizontal: getWidthResponsive(30)
    }
})