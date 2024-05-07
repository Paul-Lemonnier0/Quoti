import { FlatList, StyleSheet, TouchableOpacity, View } from "react-native"
import { useThemeColor } from "../Themed"
import { ColorsList } from "../../data/ColorsList"
import { Dispatch, FC, useContext } from "react"
import React from "react"
import { AppContext } from "../../data/AppContext"
import { CustomCarousel } from "../Carousel/CustomCarousel"
import { splitArrayIntoChunks } from "../../primitives/BasicsMethods"

interface ColorBlockProps {
    color: string,
    isSelected: boolean,
    setSelectedColor: Dispatch<string>
}

export const ColorBlock: FC<ColorBlockProps> = ({color, isSelected, setSelectedColor}) => {
    const {theme} = useContext(AppContext)

    const font = useThemeColor(theme, "Font")
    const borderColor = isSelected ? font : color

    return(
        <TouchableOpacity style={styles.colorContainer} onPress={() => setSelectedColor(color)} key={color}>
            <View style={[styles.colorBlock, {backgroundColor: color, borderColor}]}/>
        </TouchableOpacity>
    )
}

export interface ColorListSelectorProps {
    selectedColor: string,
    setSelectedColor: Dispatch<string>
}

interface RenderColorProps extends ColorListSelectorProps {
    item: string,
}

const RenderColor: FC<RenderColorProps> = ({ item, selectedColor, setSelectedColor }) => {
    const isSelected = item === selectedColor

    return <ColorBlock color={item} isSelected={isSelected} setSelectedColor={setSelectedColor}/>
};

interface RenderColorListProps extends ColorListSelectorProps {
    item: string[],
}

const RenderColorList: FC<RenderColorListProps> = ({item, selectedColor, setSelectedColor}) => {
    return(
        <FlatList
            data={item} renderItem={({item}) => 
                <RenderColor 
                    item={item} 
                    selectedColor={selectedColor}
                    setSelectedColor={setSelectedColor}
                />
            } 
            scrollEnabled={false}
            numColumns={5}
            contentContainerStyle={styles.colorListContainer}
        />
    )
}

const ColorListSelector: FC<ColorListSelectorProps> = ({selectedColor, setSelectedColor}) => {

    const splitHabitsColorData = splitArrayIntoChunks(ColorsList, 40);

    return(
        // <CustomCarousel
        //     data={splitHabitsColorData}
        //     pagination={false}
        //     renderItem={({item}) => 
        //         <RenderColorList 
        //             item={item} 
        //             selectedColor={selectedColor}
        //             setSelectedColor={setSelectedColor}
        //         />
        //     }
        // />

        <FlatList
        data={ColorsList} renderItem={({item}) => 
            <RenderColor 
                item={item} 
                selectedColor={selectedColor}
                setSelectedColor={setSelectedColor}
            />
        } 
        scrollEnabled={false}
        numColumns={5}
        contentContainerStyle={styles.colorListContainer}
    />
    )
}

const styles = StyleSheet.create({
    colorListContainer: {
        flex: 1,
        justifyContent: "center",
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
        borderWidth: 3,
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

export default ColorListSelector