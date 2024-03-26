import { StyleSheet, View } from "react-native"
import { NormalText } from "../../styles/StyledText"
import { addDays } from "date-fns"
import { useThemeColor } from "../Themed"
import React from "react"

const CalendarDayLabels = () => {

    const fontGray = useThemeColor({}, "FontGray")
    const color = fontGray

    const daysLabels: string[] = []
    let currentDateTemp = new Date("2024-01-15")
    
    for(let i = 1; i<8; ++i){
      const currentDayString: string = currentDateTemp.toLocaleDateString("fr", {weekday: "long"}).substring(0,1).toUpperCase()
      daysLabels.push(currentDayString)

      currentDateTemp = addDays(currentDateTemp, 1)
    }

    return(
        <View style={styles.container}>
        {
          daysLabels.map((dayLabel, index) => {
            return(
              <View key={index} style={styles.dayLabel}>
                <NormalText text={dayLabel} style={{color}}/>
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
        paddingLeft: 10,
        paddingRight: 5,
    },

    dayLabel: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    }
})

export default CalendarDayLabels