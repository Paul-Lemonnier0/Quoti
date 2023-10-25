import { View } from "react-native";
import { AddEtapeItem, AddedEtapeItem } from "../EtapeItem";

export const RenderAddStepCarouselItem = ({item, index, setData, handleOpenAddStep}) => {

    const handleDelete = () => {
        setData((prevData) => {
            const newData = prevData.filter((item, i) => i !== index);
            return newData;
          });
    }

    return(
        <View style={{flex: 1, padding: 30, paddingVertical: 15}}>
            {item.addStepItem ? 
                <AddEtapeItem handleOpenAddStep={handleOpenAddStep}/> : 
                <AddedEtapeItem step={item} index={index} handleDelete= {handleDelete}/>}
        </View>
    )
}