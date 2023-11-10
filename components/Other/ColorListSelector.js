import { FlatList, StyleSheet, TouchableOpacity, View } from "react-native"
import { useThemeColor } from "../Themed"
import { ColorsList } from "../../data/ColorsList"

export const ColorBlock = ({color, isSelected, setSelectedColor}) => {

    const font = useThemeColor({}, "Font")
    const borderColor = isSelected ? font : color

    return(
        <TouchableOpacity style={styles.colorContainer} onPress={() => setSelectedColor(color)} key={color}>
            <View style={[styles.colorBlock, {backgroundColor: color, borderColor}]}/>
        </TouchableOpacity>
    )
}

export default ColorListSelector = ({selectedColor, setSelectedColor}) => {

    const renderColor = ({ item: color }) => {
        const isSelected = color === selectedColor

        return <ColorBlock color={color} isSelected={isSelected} setSelectedColor={setSelectedColor}/>
    };

    return(
        <FlatList
            data={ColorsList} renderItem={renderColor} 
            scrollEnabled={false}
            numColumns={5}
            contentContainerStyle={styles.colorListContainer}/>
    )
}

const styles = StyleSheet.create({
    colorListContainer: {
        flex: 1,
        justifyContent: "center",
        marginHorizontal: -8,
    },
    
    colorContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding:8,
    },

    colorBlock: {
        borderRadius: 15, 
        width: "100%", 
        borderWidth: 2,
        aspectRatio: 1
    },

    colorBlockPresentation: {
        height: 60, 
        width: 60, 
        borderWidth: 2, 
        borderRadius: 15,
        justifyContent: "center", display: "flex", alignItems: "center"
    },
})