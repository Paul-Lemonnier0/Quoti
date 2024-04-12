import { StyleSheet, View } from "react-native"
import { LittleNormalText, NormalText } from "../../styles/StyledText"
import { addDays } from "date-fns"
import { useThemeColor } from "../Themed"
import React, { useContext } from "react"
import { AppContext } from "../../data/AppContext"

const CalendarDayLabels = () => {
  const {theme} = useContext(AppContext)

    const fontGray = useThemeColor(theme, "FontGray")
    const color = fontGray

    const daysLabels: string[] = []
    let currentDateTemp = new Date("2024-01-15")
    
    for(let i = 1; i<8; ++i){
      const currentDayString: string = currentDateTemp.toLocaleDateString("fr", {weekday: "long"}).substring(0,2)
      daysLabels.push(currentDayString)

      currentDateTemp = addDays(currentDateTemp, 1)
    }

    return(
        <View style={styles.container}>
        {
          daysLabels.map((dayLabel, index) => {
            return(
              <View key={index} style={styles.dayLabel}>
                <LittleNormalText bold text={dayLabel} style={{color}}/>

              </View>
            )
          })
        }
      </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingLeft: 15,
        paddingRight: 5,
        gap: 5
    },

    dayLabel: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    }
})

export default CalendarDayLabels