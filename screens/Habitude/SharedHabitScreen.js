import { useRoute } from "@react-navigation/native"
import { useContext } from "react";
import { HabitsContext } from "../../data/HabitContext";
import { HugeText } from "../../styles/StyledText";
import { UsualScreen } from "../../components/View/Views";

export default SharedHabitScreen = () => {
    const route = useRoute()

    if(!route.params) return null;
    const {habitID, userID} = route.params;

    const {Habits} = useContext(HabitsContext)
    
    if(!Habits.hasOwnProperty(habitID)){
        return(
            <UsualScreen>
                <HugeText text={"Habitude indisponible... id : " + habitID}/>
            </UsualScreen>
        )
    }

    const habit = Habits[habitID]

    return(
        <UsualScreen>
            <HugeText text={"Shared !"}/>
            <HugeText text={"habitID : " + habitID}/>
            <HugeText text={"UserID : " + userID}/>
        </UsualScreen>
    )
}