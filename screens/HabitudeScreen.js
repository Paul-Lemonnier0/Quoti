import { View, SafeAreaView, StyleSheet, FlatList, Image, Text, TouchableOpacity } from "react-native"
import { HugeText, NormalText, SubTitleText, TitleText } from "../styles/StyledText"
import { useThemeColor } from "../components/Themed"
import React from "react";

import { Feather, Octicons } from '@expo/vector-icons'; 

import cardStyle from "../styles/StyledCard";
import { useNavigation, useRoute } from "@react-navigation/native";

import { useState, useRef, useCallback, useMemo } from "react";

import { StepCircularBar } from "../components/Habitudes/StepCircularBar";
import { BackgroundView, MainView, TopScreenView, UsualScreen } from "../components/View/Views";

import Achievements from "../data/Achievements";
import { SubText } from "../styles/StyledText";
import AchievementBox from "../components/Achievements/AchievementBox";
import generateRandomFeeling from "../data/Feelings";
import { FeelingDay } from "../components/Calendars/FeelingDay";
import { CircleBorderButton, GoBackButton, SimpleButton } from "../components/Buttons/UsualButton";

import { EtapeItem } from "../components/Habitudes/EtapeItem";

import { Dimensions } from "react-native";
import { useContext } from "react";
import { HabitsContext } from "../data/HabitContext";
import { CustomCarousel } from "../components/Carousel/CustomCarousel";
import {RenderStepCarouselItem} from '../components/Habitudes/Step/StepCarouselItem'
import { DetailStepCircularBar } from "../components/Habitudes/DetailStepCircularBar";

const HabitudeScreen = () => {

    const {Habits} = useContext(HabitsContext)
    const route = useRoute()

    const font = useThemeColor({}, "Font")
    const fontGray = useThemeColor({}, "FontGray")
    const secondary = useThemeColor({}, "Secondary")

    const {habitIndex} = route.params;

    const habit = Habits[habitIndex]

    const navigation = useNavigation()


    const handleClickOnDate = (date) => {
        navigation.navigate("DayDetailScreen", {date: date, habitude: habit});
    }

    const steps = habit.steps
    const renderFeelingDate = ({item}) => {

        const date = new Date(item.date);
        
        return(
            <FeelingDay feelingDay={item} onPress={() => handleClickOnDate(date)}/>
        )
    }

    const styleCard = cardStyle();

    const randomFeeling = generateRandomFeeling(habit, 10)

    return(
        <UsualScreen hideMenu={true}>
            <View style={[styles.container, {}]}>
                <View style={styles.header}>
                    <View style={styles.subHeader}>
                        <GoBackButton/>
                        
                        <StepCircularBar habit={habit} tall={true}/>

                        <View style={{display: "flex", flexDirection: "row", gap: 10}}>

                            <CircleBorderButton onPress={() => handleOpenShareBottomSheet()}>
                                <Feather name="settings" size={20} color={font} />                                
                            </CircleBorderButton>

                        </View>
                    </View>

                    <View style={{display: "flex", flexDirection: "column", alignItems:"center", justifyContent: "center"}}>
                        <TitleText text={habit.titre}/>
                        <SubText text={habit.description}/>
                    </View>
                </View>

                
                <View style={styles.body}>


                    <View style={styles.detailPanel}>
                        <TouchableOpacity style={[styles.detailPanelItem, styleCard.shadow, {borderColor: fontGray, backgroundColor: secondary}]}>
                            <Feather name="users" size={24} color={font}/>
                            <TitleText text="2"/>
                        </TouchableOpacity>

                        <TouchableOpacity style={[styles.detailPanelItem, styleCard.shadow, {borderColor: fontGray, backgroundColor: secondary}]}>
                            <Octicons name="flame" size={24} color={font}/>
                            <TitleText text="50"/>
                        </TouchableOpacity>

                        <TouchableOpacity style={[styles.detailPanelItem, styleCard.shadow, {borderColor: fontGray, backgroundColor: secondary}]}>
                            <Feather name="award" size={24} color={font}/>
                            <TitleText text="7"/>
                        </TouchableOpacity>

                    </View>


                    <View style={{flex: 1, marginBottom: 0}}>
                        <SubTitleText text="Etapes :"/>
                        <CustomCarousel data={steps} renderItem={RenderStepCarouselItem} pagination={false}/>
                    </View>
                    
                    <View>

                        <View style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                            <SubTitleText text="Historique :"/>
                            <SimpleButton>
                                <SubText text="Tout voir"/>
                            </SimpleButton>
                        </View>

                        <FlatList 
                            horizontal={true} inverted={true}
                            renderItem={renderFeelingDate} key={1}
                            style={styles.FeelingList}
                            data={randomFeeling} 
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={{gap: 15, paddingHorizontal: 20}}
                        />
                    </View>

                    
                                    
                </View>
            </View>
        </UsualScreen>
    )
};

const styles = StyleSheet.create({
    container: {
        display: "flex", 
        flexDirection: "column", 
        gap: 30, 
        flex: 1, 
        marginBottom: 0    
    },

    detailPanel:{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 20
    },

    detailPanelItem: {
        display: "flex", 
        paddingHorizontal: 30, 
        paddingVertical: 15, 
        flex: 1,
        borderRadius: 15, 
        flexDirection: "column", 
        justifyContent: "center", 
        alignItems: "center", 
        gap: 5
    },

    header: {
        display: "flex", 
        flexDirection: "column", 
        gap: 20
    },
    
    subHeader: {
        display: "flex", 
        flexDirection: "row", 
        alignItems:"center", 
        justifyContent: "space-between"
    },

    body: {
        flex: 1, 
        gap: 20,
        justifyContent: "center"
    },

    subBodyContainer: {
        display: 'flex', 
        flexDirection: "column",
        justifyContent: "center",
        gap: 5
    },


    FeelingList: {
        marginHorizontal: -30,
        marginTop: 15, 
    }
})

export default HabitudeScreen
