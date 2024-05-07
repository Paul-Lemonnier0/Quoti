import React, { FC, useContext, useEffect, useRef, useState } from 'react'
import { Habit } from '../../types/HabitTypes'
import { UserDataBase } from '../../firebase/Database_User_Primitives'
import { Dimensions, StyleSheet, View } from 'react-native'
import cardStyle from '../../styles/StyledCard'
import HabitIcons from '../../data/HabitIcons'
import ItemIcon from '../Icons/ItemIcon'
import ProfilItem from '../Profil/ProfilItem'
import { LittleNormalText, NormalGrayText, NormalText, SubTitleText } from '../../styles/StyledText'
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

interface HabitPostProps {
    habit: Habit,
    user: UserDataBase
}

interface RenderSingleHabitPostProps {
    habit: Habit,
    handleLongPress: () => void,
    handleOnPress: () => void
}

const RenderSingleHabitPost: FC<RenderSingleHabitPostProps> = ({habit, handleLongPress, handleOnPress}) => {

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
                <ItemIcon icon={habit.icon} color={habit.color}/>
            </View>

            <View style={styles.habitTitleStateContainer}>
                <SubTitleText numberOfLines={1} text={habit.titre}/>
                <LittleNormalText style={{color: fontGray}} bold numberOfLines={1} text={habit.description}/>
            </View>
        </TouchableOpacity>
    )
}

interface HabitPostProps extends TestPostHabit {
    onPress: () => void,
    onPressProfil: () => void,
}

const HabitPost: FC<HabitPostProps> = ({
    habit,
    user,
    bio,
    date,
    onPress,
    onPressProfil,
}) => {
    const {theme} = useContext(AppContext)
    const fontGray = useThemeColor(theme, "FontGray")
    const secondary = useThemeColor(theme, "Secondary")
    const font = useThemeColor(theme, "Font")

    const [isLiked, setIsLiked] = useState<boolean>(false)

    const commentsBottomScreenRef = useRef<BottomSheetModal>(null)
    const settingsBottomScreenRef = useRef<BottomSheetModal>(null)
    const scale = useSharedValue(1);

    const handleLike = () => {
        scale.value = withSpring(1.1, {}, () => {
            scale.value = withSpring(1);
        });
        
        BottomScreenOpen_Impact()
        setIsLiked(!isLiked)
    }
    
    const handleOpenComments = () => {
        BottomScreenOpen_Impact()
        commentsBottomScreenRef.current?.present()
    }

    const handleOpenSettings = () => {
        BottomScreenOpen_Impact()
        settingsBottomScreenRef.current?.present()
    }


    const currentDateString = date.toLocaleDateString("fr", {
        month: 'short',
        day: 'numeric',
        year: "numeric"
    })

    return (
        <>
            <View style={[styles.container, {}]}>
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

                    <View style={styles.body}>
                        <RenderSingleHabitPost handleLongPress={handleOpenSettings} handleOnPress={onPress} habit={habit}/> 
                    </View>

                    <View style={styles.footer}>

                        <View style={{flexDirection: "row", justifyContent: 'space-between'}}>
                            <View style={styles.subFooter}>
                                <Animated.View style={{transform: [{scale}]}}>
                                    <IconButton noPadding name={isLiked ? "heart" : "hearto"} color={isLiked ? '#D44C47' : font} provider={IconProvider.AntDesign} onPress={handleLike}/>
                                </Animated.View>
                                <IconButton noPadding name='message1' provider={IconProvider.AntDesign} onPress={handleOpenComments}/>
                            </View>
                        </View>

                        <View style={{gap: 10}}>
                            {
                                bio && 
                                <TouchableOpacity onPress={handleOpenComments}>
                                    <NormalText numberOfLines={1} text={bio}/>
                                </TouchableOpacity>
                            }

                            <LittleNormalText style={{color:fontGray}} bold text={currentDateString}/>
                        </View>

                    </View>
                </View>
            </View>
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
        gap: 40,
        flexDirection: "column",
    },


    userInfos: {
        gap: 40
    },

    userInfosHeader: {
        flexDirection: "row",
        justifyContent: 'space-between',
    },

    body: {
        marginVertical: -10
    },

    footer: {
        paddingHorizontal: 10,
        flexDirection: "column", 
        gap: 20,
    },

    subFooter: {
        flexDirection: "row", 
        gap: 20
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
        gap: 5
    },     
    
    habit: {
        gap: 30,
        flexDirection: "column",
        justifyContent: "space-between",
    },
})

export default HabitPost