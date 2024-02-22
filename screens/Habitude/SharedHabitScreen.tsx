import { useRoute } from "@react-navigation/native"
import { FC, useContext } from "react";
import { HabitsContext } from "../../data/HabitContext";
import { HugeText } from "../../styles/StyledText";
import { UsualScreen } from "../../components/View/Views";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { HomeStackParamsList } from "../../navigation/BottomTabNavigator";

type SharedHabitScreenProps = NativeStackScreenProps<HomeStackParamsList, "SharedHabitScreen">

const SharedHabitScreen: FC<SharedHabitScreenProps> = ({route}) => {
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

export default SharedHabitScreen