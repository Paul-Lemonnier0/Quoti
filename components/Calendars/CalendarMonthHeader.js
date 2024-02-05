import { View } from "react-native";
import { SubTitleText } from "../../styles/StyledText";

export default CalendarMonthHeader = ({date}) => {

    const currentDate = new Date(date.current)

    const opt = {
        month: "long", 
        year: "numeric"
    }
    const header = currentDate.toLocaleDateString('fr', opt);

    return (
        <View>
          <SubTitleText text={header}/>
        </View>
    );
}
