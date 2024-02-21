import { StyleSheet, View } from "react-native"
import IconImage from "../Other/IconImage"
import { FC, ReactNode } from "react"

interface ItemIconProps {
    icon: string,
    color: string,
    children?: ReactNode
}

const ItemIcon: FC<ItemIconProps> = ({icon, color, children}) => {
    return(
        <View style={[styles.iconContainer, {borderColor: color}]}>
            {children ??  
                <IconImage image={icon}/>}
        </View>
    )
}

const styles = StyleSheet.create({
    iconContainer: {
        justifyContent: "center", 
        alignItems: "center",
        borderWidth: 2,
        borderRadius: 15 ,
    },
})

export default ItemIcon