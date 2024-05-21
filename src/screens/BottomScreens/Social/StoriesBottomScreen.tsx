import React, { FC, RefObject, useCallback, useContext, useEffect, useRef, useState } from 'react'
import { Alert, Dimensions, GestureResponderEvent, View } from 'react-native'
import SimpleFullBottomSheet from '../../../components/BottomSheets/SimpleFullBottomSheet'
import { BottomSheetModal } from '@gorhom/bottom-sheet'
import { Story, UserStory } from '../../../components/Profil/StoriesBar'
import { UsualScreen } from '../../../components/View/Views'
import StepIndicator from '../../../components/Other/StepIndicator'
import { BottomSheetCloseButton } from '../../../components/Buttons/IconButtons'
import ProfilButton from '../../../components/Profil/ProfilButton'
import { HugeText, LittleNormalText, MassiveText, NormalGrayText, NormalText, SubMassiveText, TitleGrayText } from '../../../styles/StyledText'
import { TouchableWithoutFeedback } from 'react-native'
import { AppContext } from '../../../data/AppContext'
import { useThemeColor } from '../../../components/Themed'
import { STORIES } from '../../../constants/StoriesPlaceholder'
import { UserDataBase } from '../../../firebase/Database_User_Primitives'
import type { ICarouselInstance } from 'react-native-reanimated-carousel'
import Carousel from 'react-native-reanimated-carousel'
import Animated from 'react-native-reanimated'
import { useCubeCarouselAnimation } from '../../../hooks/useCubeCarouselAnimation'
import { BottomScreenOpen_Impact } from '../../../constants/Impacts'
import ItemIcon from '../../../components/Icons/ItemIcon'

type StoriesBottomScreenProps = {
    bottomSheetModalRef: RefObject<BottomSheetModal>,
    userStories: UserStory[]
}

const STORY_DURATION = 2000 //en ms
const SCREEN_WIDTH = Dimensions.get("window").width
const SCREEN_HEIGHT = Dimensions.get("window").height

interface StoryListItemProps {
    story: Story
}
const ContentStoryListItem: FC<StoryListItemProps> = ({story}) => {

    const {theme} = useContext(AppContext)
    const fontGray = useThemeColor(theme, "FontGray")

    return(
        <View style={{flex: 1, gap: 50, justifyContent: 'space-between'}}>
            <View>
                <MassiveText text={"Habitude"}/>
                <HugeText text={"Complétée"} style={{color: fontGray}}/>
            </View>

            <View style={{flexDirection: "column", gap: 20, justifyContent: 'space-between'}}>
                <View style={{flexDirection: 'row', justifyContent: "space-between"}}>
                    <ItemIcon icon={story.icon} color={story.color}/>
                </View>

                <View style={{gap: 5, width: "80%"}}>
                    <HugeText numberOfLines={3} text={story.titre}/>
                    <NormalGrayText style={{color: fontGray}} bold numberOfLines={3} text={story.description}/>
                </View>

            </View>
{/* 
            <View style={{flexDirection: "column", gap: 10}}>
                <View style={{flexDirection: "row"}}>
                    <ItemIcon icon={story.icon} color={story.color}/>
                </View>

                <View style={{}}>
                    <SubMassiveText text={story.titre}/>
                    <HugeText style={{color: fontGray}} bold text={story.description}/>
                </View>
            </View> */}
        </View>
    )
}

interface UserStoriesItemProps {
    user: UserDataBase,
    stories: Story[],
    bottomSheetModalRef: RefObject<BottomSheetModal>,
    storiesCarouselRef: RefObject<ICarouselInstance>
}

const UserStoriesItem: FC<UserStoriesItemProps> = ({user, stories, bottomSheetModalRef, storiesCarouselRef}) => {

    const {theme} = useContext(AppContext)
    const secondary = useThemeColor(theme, "Secondary")

    const userStories: Story[] = STORIES

    const closeModal = () => {
        bottomSheetModalRef.current?.close()
    }

    useEffect(() => {
        if(userStories.length === 0) {
           closeModal()
        }
    }, [userStories])

    const [currentUserStoryIndex, setCurrentUserStoryIndex] = useState<number>(0)

    useEffect(() => {
        let timeoutId: NodeJS.Timeout;

        if (currentUserStoryIndex < userStories.length - 1) {
            timeoutId = setTimeout(() => {
                setCurrentUserStoryIndex(prevIndex => prevIndex + 1);
            }, STORY_DURATION);
        }

        return () => {
            clearTimeout(timeoutId)
        }
    }, [currentUserStoryIndex]);
        

    const handleOnPress = (e: GestureResponderEvent) => {
        const { locationX } = e.nativeEvent
        if(locationX > SCREEN_WIDTH / 2) {
            if(currentUserStoryIndex < userStories.length - 1) {
                BottomScreenOpen_Impact()
                setCurrentUserStoryIndex(prevIndex => prevIndex + 1)
            }
                        
            else {
                storiesCarouselRef.current?.next()
            }
        }

        else {
            if(currentUserStoryIndex !== 0) {
                BottomScreenOpen_Impact()
                setCurrentUserStoryIndex(prevIndex => prevIndex - 1)
            }
            
            else {
                storiesCarouselRef.current?.prev()
            }
        }
    }

    return(
        <Animated.View style={[{flex: 1, padding: 20, backgroundColor: secondary, borderRadius: 20}]}>
            <View style={{gap: 20, width: "100%"}}>
                <View style={{flexDirection: "row", justifyContent: 'space-between',}}>
                    <View style={{flexDirection: "row", alignItems: 'center', gap: 10}}>
                        <ProfilButton user={user} onPress={() => {}} noBadge small/>
                        <NormalText text={user.displayName} bold/>
                    </View>
                    <BottomSheetCloseButton methode={closeModal}/>
                </View>

                <StepIndicator 
                    currentStep={currentUserStoryIndex+1} 
                    totalSteps={userStories.length} 
                    customAnimDuration={STORY_DURATION}
                />                    
            </View>

            <TouchableWithoutFeedback  style={{flex: 1}} onPress={handleOnPress}>
                <View style={{flex: 1, marginVertical: 30}}>
                    <ContentStoryListItem story={userStories[currentUserStoryIndex]}/>
                </View>
            </TouchableWithoutFeedback>
        </Animated.View> 
    )
}

const StoriesBottomScreen: FC<StoriesBottomScreenProps> = ({bottomSheetModalRef, userStories}) => {

    const closeModal = () => {
        bottomSheetModalRef.current?.close()
    }

    const PAGE_WIDTH = SCREEN_WIDTH
    const PAGE_HEIGHT = SCREEN_HEIGHT;

    const animationStyle = useCubeCarouselAnimation(PAGE_HEIGHT, PAGE_WIDTH)

    const storiesCarouselRef = useRef<ICarouselInstance>(null)

    return (
        <SimpleFullBottomSheet bottomSheetModalRef={bottomSheetModalRef}>
                <View style={{flex: 1, backgroundColor: "black", paddingVertical: 50}}>
                    <View style={{flex: 1}}>
                        <Carousel
                            ref={storiesCarouselRef}
                            style={{
                                width: PAGE_WIDTH,
                                height: PAGE_HEIGHT - 100,
                                flex: 1
                            }}
                            width={PAGE_WIDTH}
                            height={PAGE_HEIGHT - 100}
                            data={userStories}
                            renderItem={({item}) => <UserStoriesItem {...item} bottomSheetModalRef={bottomSheetModalRef} storiesCarouselRef={storiesCarouselRef}/>}
                            customAnimation={animationStyle}
                        />
                    </View>
                </View>
        </SimpleFullBottomSheet>
    )
}

export default StoriesBottomScreen