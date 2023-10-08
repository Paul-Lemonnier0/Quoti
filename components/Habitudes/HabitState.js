import { Feather, FontAwesome } from '@expo/vector-icons';
import React from 'react'
import { StyleSheet } from 'react-native';
import { View, Text } from 'react-native'

const HabitState = ({state}) => {
    
    let color; let icon; let text;

    switch (state) {
        case "skip":
            color = "#00BBEA"
            icon = <Feather name="trending-up" size={16} color={color} />
            text="sauter"
            break;

        case "done":
            color = "#1ED700"
            icon = <Feather name="check" size={16} color={color} />
            text="finit"
            break;

        case "cancel":
            color = "#D72200"
            icon = <Feather name="x" size={16} color={color} />
            text="annuler"
            break;
        
        case "todo":
            color = "#D700D0"
            icon = <FontAwesome name="dot-circle-o" size={16} color={color} />
            text="à faire"
            break;
    }

  return (
    <View style={styles.habitStateContainer}>
        {icon}
        <Text style={{color: color}}>{text}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    habitStateContainer: {
        display: "flex",
        flexDirection: "column",
        alignItems:"center",
        gap: 5
    }
})

export default HabitState