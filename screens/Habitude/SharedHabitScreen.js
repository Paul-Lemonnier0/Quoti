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
    console.log("Habit retrieved : ", habitID)
    
    if(!Habits.hasOwnProperty(habitID)){
        return(
            <MainView>
                <HugeText text={"Habitude indisponible..."}/>
            </MainView>
        )
    }

    const habit = Habits[habitID]

    return(
        <MainView>
            <HugeText text={habit.titre}/>
        </MainView>
    )
}