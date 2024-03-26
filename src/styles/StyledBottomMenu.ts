import { StyleSheet } from "react-native"

const BottomMenuStyle = () => {
    return StyleSheet.create(
        {
            bottomMenuStyle: {
                backgroundColor: "#000000",
                marginHorizontal: 50,
                position: "absolute", 
                bottom: 35, 
                borderRadius: 20,
                borderTopWidth: 0, 
                paddingBottom: 0,
            }        
    })
}

export default BottomMenuStyle