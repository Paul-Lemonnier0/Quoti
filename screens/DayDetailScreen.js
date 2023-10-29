import React from "react";
import { View, SafeAreaView } from "react-native"
import { HugeText } from "../styles/StyledText"
import { useThemeColor } from "../components/Themed"
import { SimpleIconButton } from "../components/Buttons/IconButton";
import { Feather } from '@expo/vector-icons'; 
import { useNavigation } from "@react-navigation/native";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet"

const DayDetailScreen = ({route}) => {
    
    const fontGray = useThemeColor({}, "FontGray")
    const primary = useThemeColor({}, "Primary")

    const navigation = useNavigation()
    
    const {date} = route.params;
    const options = {year: "numeric", month: "long", day: "numeric"};

    const dateName = date.toLocaleString('fr', options);

    const handleBack = () => navigation.goBack()

    return(
        <BottomSheetModalProvider>
        <SafeAreaView style={{flex: 1}}>
            <View style={{backgroundColor: primary, display:"flex", flex:1, padding: 15}}>
                <View style={{display: "flex", flexDirection: "row", alignItems:"center"}}>

                    <SimpleIconButton onClick={() => handleBack()}>
                        <Feather name="chevron-left" size={20} color={fontGray} />                
                    </SimpleIconButton>

                    <View style={{flex:1, padding: 5, display: "flex", flexDirection: "row", justifyContent: "center", borderRadius: 20 }}>
                    </View>
                </View>

                <View style={{padding: 10, paddingTop: 20}}>
                  <HugeText text={dateName} />
                </View>
            </View>
        </SafeAreaView>
        </BottomSheetModalProvider>)
};

export default DayDetailScreen
