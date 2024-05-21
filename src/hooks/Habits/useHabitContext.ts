import { useContext } from "react";
import { HabitContextType, HabitsContext } from "../../data/HabitContext";

export const useHabitContext = (): HabitContextType => {
    const context = useContext(HabitsContext);

    if (!context) {
        throw new Error('useHabitContext must be used within a HabitProvider');
    }
    
    return context;
};