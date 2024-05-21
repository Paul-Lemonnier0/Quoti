import React, { FC, useRef, useState } from 'react'
import { FlatList, View } from 'react-native'
import { UserDataBase } from '../../firebase/Database_User_Primitives'
import ProfilButton from './ProfilButton'
import StoriesBottomScreen from '../../screens/BottomScreens/Social/StoriesBottomScreen'
import { BottomSheetModal } from '@gorhom/bottom-sheet'
import { DEFAULT_SKELETON_SIZE } from 'moti/build/skeleton/shared'

export interface Story {
    date: Date,
    goal?: boolean,
    titre: string,
    description: string,
    icon: string,
    color: string,
    seen?: boolean
}

export type UserStory = {
  user: UserDataBase,
  stories: Story[]
}

type StoriesBarProps = {
    stories: UserStory[]
}

interface StoryButtonItemProps extends UserStory{
  onPress: () => void
}

const StoryButtonItem: FC<StoryButtonItemProps> = ({onPress, user, stories}) => {

  const storiesNotSeen = stories.filter(story => !story.seen)
  const allStoriesSeen = storiesNotSeen.length === 0

  return (
    <View>
      <ProfilButton 
        story allStoriesSeen={allStoriesSeen}
        noBadge
        user={user}
        onPress={onPress}
        label={user.displayName}/>
    </View>
  )
}

const StoriesBar: FC<StoriesBarProps> = ({stories}) => {

  const storiesBottomScreenRef = useRef<BottomSheetModal>(null)
  
  const [startingStoriesIndex, setStartingStoriesIndex] = useState<number>(0)

  function handleOpenStories(startingIndex: number) {
    setStartingStoriesIndex(startingIndex)
    storiesBottomScreenRef.current?.present()
  } 

  return (
    <View>
        <FlatList
          data={stories}
          renderItem={({item, index}) => <StoryButtonItem {...item} onPress={() => handleOpenStories(index)}/>}
          contentContainerStyle={{gap: 15}}
          horizontal showsHorizontalScrollIndicator={false}
        />

        <StoriesBottomScreen
          bottomSheetModalRef={storiesBottomScreenRef}
          userStories={stories}
        />
    </View>
  )
}

export default StoriesBar