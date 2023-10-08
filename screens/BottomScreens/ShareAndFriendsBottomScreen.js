import { BottomSheetModal } from "@gorhom/bottom-sheet"
import CustomBottomSheet from "../../components/BottomSheets/CustomBottomSheet"
import { FlatList, View } from "react-native"
import { AddProfilCircularButton, StepCircularBarProfil } from "../../components/Habitudes/StepCircularBarProfil"
import { StyleSheet } from "react-native"
import { ContributorsHabits } from "../../data/habitudes"
import { SubText, SubTitleText } from "../../styles/StyledText"
import { SimpleButton } from "../../components/Buttons/UsualButton"
import { Feather } from "@expo/vector-icons"
import { useThemeColor } from "../../components/Themed"

const renderFriends = ({item, index, habit}) => {

    if(item.addingButton)
      return <AddProfilCircularButton habit={habit} secondaryInactiveColor={true} id={item.id}/>

    else
        return <StepCircularBarProfil habit={habit} profil={item} secondaryInactiveColor={true} index={index}/>
  }

export const ShareAndFriendsBottomScreen = ({bottomSheetModalRef, snapPoints, handleSheetChanges, habit}) => {

    const fontGray = useThemeColor({}, "FontGray")

    const friendsList = ContributorsHabits.filter((item) => item.habitude.titre === habit.titre)
    friendsList.unshift({addingButton: true, id: "addFriendsButton"})

    return(
        <CustomBottomSheet 
        bottomSheetModalRef={bottomSheetModalRef}
        snapPoints={snapPoints}
        handleSheetChanges={handleSheetChanges}>

            <View style={styles.friendListContainer}>

                <View style={{display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center"}}>
                    <SubTitleText text="Progrès de vos amis"/>

                    <SimpleButton>
                        <Feather name="more-horizontal" size={20} color={fontGray} />                    
                    </SimpleButton>
                </View>

                <FlatList 
                    horizontal={true}
                    renderItem={({ item, index }) => renderFriends({ item, index, habit })}
                    style={styles.FriendsList} key={2}
                    data={friendsList} 
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{gap: 30, paddingHorizontal: 30}}
                />

            </View>

        </CustomBottomSheet>
    )
}

const styles = StyleSheet.create({
    FriendsList: {
        marginHorizontal: -30,
    },

    friendListContainer: {
        gap: 20,
        marginHorizontal: -30, 
        paddingHorizontal: 30
    },
})