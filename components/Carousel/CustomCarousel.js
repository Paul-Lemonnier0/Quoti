import Carousel from "react-native-reanimated-carousel"
import { StyleSheet, Dimensions, View } from "react-native"
import { useState } from "react"
import { createRef } from "react"
import { AddEtapeItem, AddedEtapeItem, EtapeItem } from "../Habitudes/EtapeItem"
import { TitleText } from "../../styles/StyledText"

export const CustomCarousel = ({data, doneSteps, renderItem, defaultIndex, customWidth}) => {

    const renderStep = ({item}) => {

        const handleValidateStep = (index) => {
            const indexToGoOnSwipe = index === maxIndex ? index : index + 1
            carouselRef.current.snapToItem(indexToGoOnSwipe, true);
        }
        //<EtapeItem step={item} index={index} handleValidateStep= {handleValidateStep}/>

        return(
            <View style={{flex: 1, padding: 20}}>
                <EtapeItem step={item} index={index} handleValidateStep= {handleValidateStep}/>            
            </View>
            )
    }

    const carouselRef = createRef()
    const maxIndex = data.length-1

    const SLIDER_WIDTH = Dimensions.get('window').width 
    const ITEM_WIDTH = SLIDER_WIDTH - (customWidth ? customWidth : 0)

    const currentIndex = doneSteps ? doneSteps : (defaultIndex ? defaultIndex : 0)

    const [index, setIndex] = useState(currentIndex)

    console.log(data)

    return(
        <View style={styles.container}>
            <Carousel
            data={data} 
            mode="marquee"
            scrollAnimationDuration={500}
            renderItem={renderItem ? renderItem : renderStep}
            width={SLIDER_WIDTH}
            />

            {/*<Pagination
                containerStyle={{marginTop: 0, marginBottom: 0}}
                dotStyle={styles.dotStyle}
                inactiveDotStyle={styles.inactiveDotStyle}

                dotsLength={data.length > 1 ? data.length : 3}
                activeDotIndex={data.length > 1 ? index : 1}
                inactiveDotOpacity={data.length > 1 ? 0.4 : 0}

                inactiveDotScale={0.6}
                carouselRef={carouselRef}
                tappableDots={true}
            />*/}
        </View>
    )
}

export const AddStepCustomCarousel = ({data, setData, handleOpenAddStep}) => {

    const carouselRef = createRef()
    const maxIndex = data.length-1

    const SLIDER_WIDTH = Dimensions.get('window').width 
    const ITEM_WIDTH = SLIDER_WIDTH

    const currentIndex = 0

    const [index, setIndex] = useState(currentIndex)

    const renderStep = ({item, index}) => {

        const handleValidateStep = (index) => {
            const indexToGoOnSwipe = index === maxIndex ? index : index + 1
            carouselRef.current.snapToItem(indexToGoOnSwipe, true);
        }

        const handleDelete = () => {
            setData((prevData) => {
                const newData = prevData.filter((item, i) => i !== index);
                return newData;
              });
        }

        return(
            <View style={{flex: 1, paddingHorizontal: 20}}>
                {item.addStepItem ? <AddEtapeItem handleOpenAddStep={handleOpenAddStep}/> : <AddedEtapeItem step={item} index={index} handleDelete= {handleDelete}/>}
            </View>
        )
    }

    return(
        <View style={styles.container}>
            <Carousel
                data={data}
                renderItem={renderStep} 
                width={SLIDER_WIDTH}
                scrollAnimationDuration={500}
            />
            
            {/*<Pagination
                containerStyle={{marginTop: -10, marginBottom: -20}}

                dotsLength={data.length > 1 ? data.length : 3}
                activeDotIndex={data.length > 1 ? index : 1}
                inactiveDotOpacity={data.length > 1 ? 0.4 : 0}

                dotStyle={styles.dotStyle}
                inactiveDotStyle={styles.inactiveDotStyle}
                inactiveDotScale={0.6}
                carouselRef={carouselRef}
                tappableDots={true}
                
            />*/}

        </View>
    )
}



const styles= StyleSheet.create({
    dotStyle: {
        width: 20,
        height: 5,
        borderRadius: 5,
        marginHorizontal: 0,
        backgroundColor: "white"
    },

    inactiveDotStyle: {
        width: 10,
        height: 10,
        borderRadius: 5,
        marginHorizontal: 0,
        backgroundColor: "white"   
    },

    container: {
        marginHorizontal: -60, 
        paddingHorizontal: 30, 
        marginBottom: -30, 
        flex: 1
    }
})