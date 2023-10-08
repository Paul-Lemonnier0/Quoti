import { BottomSheetBackdrop, BottomSheetModal, BottomSheetModalProvider } from "@gorhom/bottom-sheet"
import { View, StyleSheet, FlatList } from "react-native"

import { IconButton } from "../../components/Buttons/IconButton"
import { TitleText, NormalText } from "../../styles/StyledText"
import { useRef, useMemo, useCallback, useState } from "react"
import { Feather } from "@expo/vector-icons"
import { useThemeColor } from "../../components/Themed"
import { CircularBarProfil, AddCircularBarProfil } from "../../components/Profil/CircularBarProfil"
import { ContributorsHabits } from "../../data/habitudes"

const ContributorsHabitsScreen = ({bottomSheetModalRef, snapPoints, handleSheetChanges, habitude, couleur}) => {

    const contributorsList = ContributorsHabits.filter((item) => item.habitude === habitude)

    contributorsList.push({addingButton: true})

    const isContributors = contributorsList.length !== 0

    const fontGray = useThemeColor({}, "FontGray")
    const popupColor = useThemeColor({}, "Popup")

    const [backdropPressBehavior, setBackdropPressBehavior] = useState('close');

    const renderBackdrop = useCallback(
      props => (
        <BottomSheetBackdrop {...props} appearsOnIndex={0} disappearsOnIndex={-1} pressBehavior={backdropPressBehavior} />
      ),
      [backdropPressBehavior]
    );

    const renderContributors = ({item}) => {

      if(item.addingButton)
      {
        return(
          <View style={{margin: 20}}>
              <AddCircularBarProfil nom="Ajouter"/>
          </View>
        )
      }

      else
      {
          return(
          <View style={{margin: 20}}>
            <CircularBarProfil profil={item} couleur={couleur}/>
          </View>
        )
      }
    }
  
    // renders
    return (
        <BottomSheetModal
            ref={bottomSheetModalRef}
            style={{display:"flex", flex: 1, alignItems:"center"}}
            backgroundStyle={{backgroundColor: popupColor, borderRadius: 50}}
            handleIndicatorStyle={{backgroundColor: fontGray}}
            index={0}
            enablePanDownToClose={true}
            snapPoints={snapPoints}
            onChange={handleSheetChanges}
            backdropComponent={renderBackdrop}>

            <View style={
              [
                styles.contentContainer,

              ]}>
                <TitleText text="Progrès de vos amis"/>

                {isContributors && <FlatList 
                  renderItem={renderContributors}
                  showsVerticalScrollIndicator={contributorsList.length !== 1}
                  contentContainerStyle={contributorsList.length <= 3 ? styles.styleWhenJustAddBtn : null}
                  style={styles.HabitsList} key={2}
                  data={contributorsList} numColumns={3} 
                  keyExtractor={item => item.id}
                />}                

                {!isContributors && <NormalText text="aucun amis nullos"/>}

            </View>
      </BottomSheetModal>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 24,
      justifyContent: 'center',
      backgroundColor: 'grey',
    },

    backgroundContainer: {
      backgroundColor: '#222',
    },

    handleIndicator: {
      backgroundColor: '#eee',
    },

    contentContainer: {
      padding: 20,
      flex: 1,
      alignItems: 'center',
    },
    
    HabitsList:{
      flex:1,
      flexGrow: 1,
      display: "flex", 
      width: "100%",
      marginTop: 15,
    },

    styleWhenJustAddBtn: {
      alignItems: "center",
      justifyContent: "center",
      marginTop: -15,
      flex: 1,
    },

    styleWhenMoreBtn: {
      justifyContent: "center",
      flex: 1,
      marginTop: -15,
    } 
  });
  
  export default ContributorsHabitsScreen;