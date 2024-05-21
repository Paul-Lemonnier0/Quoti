import React, { FC, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { Habit } from '../../types/HabitTypes'
import { UserDataBase } from '../../firebase/Database_User_Primitives'
import { Dimensions, StyleSheet, View } from 'react-native'
import cardStyle from '../../styles/StyledCard'
import HabitIcons from '../../data/HabitIcons'
import ItemIcon from '../Icons/ItemIcon'
import ProfilItem from '../Profil/ProfilItem'
import { HugeText, LittleNormalText, NormalGrayText, NormalText, SubTitleText, TitleText } from '../../styles/StyledText'
import { AppContext } from '../../data/AppContext'
import { useThemeColor } from '../Themed'
import { Icon, IconButton, IconProvider } from '../Buttons/IconButtons'
import { FlatList } from 'react-native'
import { TouchableOpacity } from 'react-native'
import { BottomScreenOpen_Impact, Success_Impact } from '../../constants/Impacts'
import { TestPostHabit } from '../../firebase/Firebase_Posts_Primitives'
import CommentsBottomScreen from '../../screens/BottomScreens/Social/CommentsBottomScreen'
import { BottomSheetModal } from '@gorhom/bottom-sheet'
import PostSettingsBottomScreen from '../../screens/BottomScreens/Social/PostSettingsBottomScreen'
import { TapGestureHandler } from 'react-native-gesture-handler'
import Animated, { useSharedValue, withSpring } from 'react-native-reanimated'
import { HabitPostType, PostStateType } from '../../firebase/Firestore_Posts_Primitives'
import CustomCard from '../Other/Card'
import Separator from '../Other/Separator'
import { PostState } from './PostState'

interface HabitPostProps {
    habit: Habit,
    user: UserDataBase
}

interface RenderSingleHabitPostProps {
    habitPost: HabitPostType,
    handleLongPress: () => void,
    handleOnPress: () => void
}

const RenderSingleHabitPost: FC<RenderSingleHabitPostProps> = ({habitPost, handleLongPress, handleOnPress}) => {

    const {theme} = useContext(AppContext)
    const fontGray = useThemeColor(theme, "FontGray")
    const secondary = useThemeColor(theme, "Secondary")
  
    const styleCard = cardStyle().card
  
    const onPress = () => {
        handleOnPress()
        BottomScreenOpen_Impact()
    }

    return(
        <TouchableOpacity onLongPress={handleLongPress} onPress={onPress} style={[styleCard, {gap: 50, backgroundColor: secondary}]}>
            <View style={{flexDirection: 'row', justifyContent: "space-between", alignItems: 'center'}}>
                <ItemIcon icon={habitPost.icon} color={habitPost.color}/>
            </View>

            <View style={styles.habitTitleStateContainer}>
                <SubTitleText numberOfLines={1} text={habitPost.titre}/>
                <LittleNormalText style={{color: fontGray}} bold numberOfLines={1} text={habitPost.description}/>
            </View>
        </TouchableOpacity>
    )
}

interface HabitPostProps {
    habitPost: HabitPostType,
    user: UserDataBase,
    onPress: () => void,
    onPressProfil: () => void,
}

const HabitPost: FC<HabitPostProps> = ({
    habitPost,
    user,
    onPress,
    onPressProfil,
}) => {
    const {theme} = useContext(AppContext)
    const fontGray = useThemeColor(theme, "FontGray")
    const primary = useThemeColor(theme, "Primary")
    const font = useThemeColor(theme, "Font")
    const tertiary = useThemeColor(theme, "Tertiary")

    const [isLiked, setIsLiked] = useState<boolean>(false)
    const [isSaved, setIsSaved] = useState<boolean>(false)

    const commentsBottomScreenRef = useRef<BottomSheetModal>(null)
    const settingsBottomScreenRef = useRef<BottomSheetModal>(null)
    const scale = useSharedValue(1);
    const saveScale = useSharedValue(1);

    const handleLike = () => {
        scale.value = withSpring(1.1, {}, () => {
            scale.value = withSpring(1);
        });
        
        BottomScreenOpen_Impact()
        setIsLiked(!isLiked)
    }

    const handleSave = () => {
        saveScale.value = withSpring(1.1, {}, () => {
            saveScale.value = withSpring(1);
        });
        
        BottomScreenOpen_Impact()
        setIsSaved(!isSaved)
    }
    
    const handleOpenComments = () => {
        BottomScreenOpen_Impact()
        commentsBottomScreenRef.current?.present()
    }

    const handleOpenSettings = () => {
        BottomScreenOpen_Impact()
        settingsBottomScreenRef.current?.present()
    }

    const date = new Date()

    const currentDateString = date.toLocaleDateString("fr", {
        month: 'short',
        day: 'numeric',
        year: "numeric"
    })

    const states: PostStateType[] = [PostStateType.Done, PostStateType.Ended, PostStateType.Started]

    const randomStateIndex = useMemo(() => Math.floor(Math.random() * 3), []) 
    const randomState = states[randomStateIndex]

    return (
        <>
            <CustomCard style={{borderRadius: 30, paddingVertical: 25, borderColor: tertiary, borderWidth: 2}}>
                <View style={[styles.userInfos]}>
                    <View style={styles.userInfosHeader}>
                        <ProfilItem onPress={onPressProfil} user={user} small boldSubTitle/>
                        <View>
                            <IconButton 
                                noPadding
                                name={"more-horizontal"} 
                                provider={IconProvider.Feather} 
                                onPress={handleOpenSettings} 
                            />
                        </View>
                    </View>
{/* 
                    <View style={{marginHorizontal: -25,marginTop: -20}}>
                        <Separator/>
                    </View> */}

                    <TouchableOpacity style={[styles.body, { margin: -20, padding: 20, backgroundColor: primary,
                        borderColor: tertiary,
                        borderWidth: 2,
                        borderLeftWidth: 0,
                        borderRightWidth: 0,
                    }]}>
                        <View style={{flexDirection: "column", gap: 20, justifyContent: 'space-between'}}>
                            <View style={{flexDirection: 'row', justifyContent: "space-between"}}>
                                <ItemIcon icon={habitPost.icon} color={habitPost.color}/>
                                <PostState state={randomState}/>

                            </View>

                            <View style={styles.habitTitleStateContainer}>
                                <HugeText numberOfLines={1} text={habitPost.titre}/>
                                <LittleNormalText style={{color: fontGray}} bold numberOfLines={1} text={habitPost.description}/>
                            </View>

                        </View>
                    </TouchableOpacity>

                    <View style={styles.footer}>
                        <View style={{flexDirection: "row", justifyContent: 'space-between', alignItems: 'center'}}>
                            <View style={{gap: 5, width: "100%"}}>

                                <View style={{flexDirection: "row", justifyContent: "space-between", marginBottom: 10, marginTop: 5, alignItems: 'center'}}>
                                    <View style={styles.subFooter}>
                                        <Animated.View style={{transform: [{scale}]}}>
                                            <IconButton noPadding name={isLiked ? "heart" : "hearto"} color={isLiked ? '#D44C47' : font} provider={IconProvider.AntDesign} onPress={handleLike}/>
                                        </Animated.View>
                                        <IconButton noPadding name='message1' provider={IconProvider.AntDesign} onPress={handleOpenComments}/>
                                    </View>

                                    <Animated.View style={{transform: [{scale: saveScale}]}}>
                                        <IconButton noPadding name={isSaved ? 'bookmark' : "bookmark-o"} provider={IconProvider.FontAwesome} onPress={handleSave}/>
                                        </Animated.View>
                                </View>

                                {
                                    habitPost.legend && 
                                    <TouchableOpacity onPress={handleOpenComments}>
                                        <SubTitleText bold numberOfLines={1} text={habitPost.legend}/>
                                    </TouchableOpacity>
                                }

                                <LittleNormalText style={{color:fontGray, fontSize: 14}} bold text={currentDateString}/>
                            </View>
                        
                        </View>


                    </View>
                </View>
            </CustomCard>

            <CommentsBottomScreen
                bottomSheetModalRef={commentsBottomScreenRef}
                postID={""}/>

            <PostSettingsBottomScreen
                bottomSheetModalRef={settingsBottomScreenRef}
                postID=""/>
        </>
    )
}

const styles = StyleSheet.create({   
    container: {
        gap: 20,
        flexDirection: "column",
    },


    userInfos: {
        gap: 30,
    },

    userInfosHeader: {
        flexDirection: "row",
        justifyContent: 'space-between',
    },

    body: {
        marginVertical: -10,
    },

    footer: {
        flexDirection: "column", 
        gap: 20,
    },

    subFooter: {
        flexDirection: "row", 
        gap: 20,
    },

    postContent: {
        borderRadius: 16,
        flexDirection: "column",
        gap: 40,
        padding: 20,
    },

    habitTitleStateContainer: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        gap: 5,
        flex: 1
    },     
    
    habit: {
        gap: 30,
        flexDirection: "column",
        justifyContent: "space-between",
    },
})

export default HabitPost