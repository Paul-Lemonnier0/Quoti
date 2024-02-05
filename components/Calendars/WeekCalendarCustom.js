import { Dimensions, View } from "react-native"
import { CalendarProvider, WeekCalendar } from "react-native-calendars"

export default WeekCalendarCustom = () => {

    const width = Dimensions.get("window").width - 10

    return(
        <View style={{flex: 1}}>
            <CalendarProvider date="2022-01-07" style={{flex: 1}}>
                <WeekCalendar hideDayNames calendarWidth={width}/>
            </CalendarProvider>
        </View>
    )
}