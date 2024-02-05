import { useRoute } from "@react-navigation/native"
import { useContext } from "react";
import { HabitsContext } from "../../data/HabitContext";
import { MainView } from "../../components/View/Views";
import { HugeText } from "../../styles/StyledText";

export default SharedHabitScreen = () => {
    const route = useRoute()

    if(!route.params) return null;
    const {habitID, userID} = route.params;

    const {Habits} = useContext(HabitsContext)
    
    if(!Habits.hasOwnProperty(habitID)){
        return(
            <MainView>
                <HugeText text={"Habitude indisponible... id : " + habitID}/>
            </MainView>
        )
    }

    const habit = Habits[habitID]

    return(
        <MainView>
            <HugeText text={"Shared !"}/>
            <HugeText text={"habitID : " + habitID}/>
            <HugeText text={"UserID : " + userID}/>
        </MainView>
    )
}