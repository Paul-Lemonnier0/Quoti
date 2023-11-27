import { SubText } from "../../styles/StyledText"
import { AchievementBox } from "../../components/Achievements/AchievementBox"
import CustomBottomSheet from "../../components/BottomSheets/CustomBottomSheet"

const AchievementsScreen = ({bottomSheetModalRef, snapPoints, handleSheetChanges, achievement}) => {
    
    const image = achievement.image
    const titre = achievement.titre
    const description = achievement.description
    const isAchieved = achievement.isAchieved
  
    return (
        <CustomBottomSheet bottomSheetModalRef={bottomSheetModalRef} snapPoints={snapPoints} onChange={handleSheetChanges}>

                <AchievementBox titre={titre} description={description} image={image} isAchieved={isAchieved} whiteText={true}/>
                <SubText text={description} style={{textAlign: "center"}} />
                
      </CustomBottomSheet>
    );
  };
  
export default AchievementsScreen;