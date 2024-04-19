import React, { FC } from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import Animated, { FadeInDown, FadeInRight } from 'react-native-reanimated'
import cardStyle from '../../styles/StyledCard'
import { Habit } from '../../types/HabitTypes'
import IconImage from '../Other/IconImage'
import { SubText, SubTitleText } from '../../styles/StyledText'
import { UserDataBase } from '../../firebase/Database_User_Primitives'
import Separator from '../Other/Separator'
import ProfilItem from '../Profil/ProfilItem'

interface HabitRequestBlockProps {
    onPress: () => void,
    index: number,
    habit: Habit,
    user: UserDataBase,
    handleAccept: () => void,
    handleRefuse: () => void
}

const HabitRequestBlock: FC<HabitRequestBlockProps> = ({
    onPress,
    index,
    habit,
    user,
    handleAccept,
    handleRefuse
}) => {

    const handleOnPress = () => {
        onPress()
    }

    const stylesCard = cardStyle()

    return (
        <TouchableOpacity style={{flex: 1}} onPress={handleOnPress} delayLongPress={750}>
            <Animated.View entering={FadeInDown.duration(400).delay(index * 200)} 
                style={[
                    stylesCard.card, 
                    styles.habit,
                ]}>
                    
                <View style={styles.header}>
                    <View style={[styles.iconContainer, {borderColor: habit.color}]}>
                        <IconImage image={habit.icon}/>
                    </View>

                    <View style={styles.titleDescriptionContainer}>
                        <SubTitleText numberOfLines={1} text={habit.titre}/>
                        <SubText bold numberOfLines={1} text={habit.description}/>
                    </View>
                </View>

                <Separator/>

                <ProfilItem
                    user={user}
                    isPrimary
                    isSelected
                    expand/>
            </Animated.View>
        </TouchableOpacity>
    )
}


const styles = StyleSheet.create({
    habit: {
        flex: 1,
        gap: 20,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
    },

    header: {
        gap: 20,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems:"center",
    },

    titleDescriptionContainer: {
        flex:1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
        gap: 5
    },

    footer: {
        gap: 20,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems:"center"
    },

    iconContainer: {
        display: "flex",
        justifyContent: "center", 
        alignItems: "center",
        borderWidth: 2,
        borderRadius: 15 
    }
})

export default HabitRequestBlock