import { View, SafeAreaView, StyleSheet } from "react-native"
import { HugeText, NormalText, TitleText } from "../styles/StyledText"
import { useThemeColor } from "../components/Themed"
import React from "react";
import { SimpleIconButton } from "../components/Buttons/IconButton";

import { Feather, Ionicons } from '@expo/vector-icons'; 

import { ProgressBar } from "../components/Graphs/ProgressBar";

import { useNavigation } from "@react-navigation/native";
import { Icon } from "react-native-elements";

import {Calendar, LocaleConfig} from 'react-native-calendars';
import { useState, useRef, useCallback, useMemo } from "react";

import { LayoutAnimation } from "react-native";

import { BottomSheetModal, BottomSheetModalProvider } from "@gorhom/bottom-sheet"

import CalendarCustom from "../components/Calendars/CalendarCustom";
import ContributorsHabitsScreen from "./BottomScreens/ContributorsHabitsScreen";

const DayDetailScreen = ({route}) => {

    const [detailDate, setDetailDate] = useState(new Date());

    const fontGray = useThemeColor({}, "FontGray")
    const secondary = useThemeColor({}, "Secondary")

    const navigation = useNavigation()

    
    const {date} = route.params;

    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };

    const dateName = date.toLocaleString('fr', options);
    const {habitude} = route.params;

    const handleBack = () =>
    {
        navigation.goBack();
    }

    const bottomSheetModalRef = useRef(null);
    const snapPoints = useMemo(() => ['50%'], []);

    const handleOpenShareBottomSheet = useCallback(() => {
        bottomSheetModalRef.current?.present();
      }, []);

    const handleSheetChanges = useCallback((index) => {
        console.log("handleSheetChange", index)
    }, []);

    const bottomSheetDayDetails = useRef(null);
    const snapPointsDayDetails = useMemo(() => ['50%'], []);

    const handleOpenDayDetails = useCallback(() => {
        bottomSheetDayDetails.current?.present();
      }, []);

    const handleSheetDayDetailsChange = useCallback((index) => {
        console.log("handleSheetDayDetailsChange", index)
    }, []);

    const primary = useThemeColor({}, "Primary")
    const [currentDate, setCurrentDate] = useState('');

    const styles = StyleSheet.create({
        container: {
          flex: 1,
          padding: 24,
          justifyContent: 'center',
          backgroundColor: 'grey',
        },
        contentContainer: {
          flex: 1,
          alignItems: 'center',
        },
    })

    return(
        <BottomSheetModalProvider>
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{backgroundColor: primary, display:"flex", flex:1, padding: 15}}>

                <View style={{display: "flex", flexDirection: "row", alignItems:"center"}}>

                    <SimpleIconButton onClick={() => handleBack()}>
                        <Feather name="chevron-left" size={20} color={fontGray} />                
                    </SimpleIconButton>

                    <View style={{flex:1, padding: 5, display: "flex", flexDirection: "row", justifyContent: "center", borderRadius: 20 }}>
                    </View>

                    {/*<SimpleIconButton onClick={() => handleOpenShareBottomSheet()}>
                        <Feather name="settings" size={20} color={fontGray} />                    
    </SimpleIconButton>*/}

                </View>

                <View style={{padding: 10, paddingTop: 20}}>

                  <HugeText text={dateName} />

                </View>
                
            </View>
        </SafeAreaView>
        </BottomSheetModalProvider>)
};

export default DayDetailScreen
