import { View } from "react-native";
import { AddEtapeItem, AddedEtapeItem, EtapeItem } from "../EtapeItem";

export const RenderStepCarouselItem = ({item, index}) => {

    const handleValidateStep = (index) => {
    }

    return(
        <View style={{flex: 1, padding: 20}}>
            <EtapeItem step={item} index={index} handleValidateStep= {handleValidateStep}/>            
        </View>
    )
}

export const RenderAddStepCarouselItem = ({item, index, data, setData, handleOpenAddStep}) => {

    const handleDelete = () => {
        setData((prevData) => {
            const newData = prevData.filter((item, i) => i !== index);
            return newData;
          });
    }

    return(
        <View style={{flex: 1, padding: 20}}>
            {item.addStepItem ? <AddEtapeItem handleOpenAddStep={handleOpenAddStep}/> : <AddedEtapeItem step={item} index={index} handleDelete= {handleDelete}/>}
        </View>
    )
}