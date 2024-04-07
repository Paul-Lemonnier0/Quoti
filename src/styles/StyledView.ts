import { StyleSheet } from "react-native";
import { useThemeColor } from '../components/Themed';
import { useContext } from "react";
import { AppContext } from "../data/AppContext";

const viewStyle = () => {
  const {theme} = useContext(AppContext)
  const primary = useThemeColor(theme, "Primary")

  return StyleSheet.create({
    backgroundView: {
        gap: 5,
        flex:1,
        flexGrow:1,
        borderBottomLeftRadius: 50,
        borderBottomRightRadius: 50,
        margin:-30, 
        marginBottom:0, 
        padding:30, 
        paddingVertical: 15, 
        backgroundColor: primary
    },
    
  });
};

export default viewStyle;