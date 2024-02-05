import React, { useEffect, useMemo, useState } from 'react';
import { Keyboard, StyleSheet, TextInput, TouchableWithoutFeedback, View } from 'react-native';
import ColorPicker, { HueSlider, Panel1 } from 'reanimated-color-picker';
import { useThemeColor } from "../../components/Themed";
import { TitleText } from "../../styles/StyledText";
import { Feather } from '@expo/vector-icons'; 
import Separator from '../../components/Other/Separator';
import CustomBottomSheet from "../../components/BottomSheets/CustomBottomSheet";

const CustomColorBottomScreen = ({ bottomSheetModalRef, selectedColor, setSelectedColor }) => {
  const font = useThemeColor({}, "Font");
  const errorColor = useThemeColor({}, "Error") 

  const snapPoints = useMemo(() => ['65%'], []);


  const [hexValue, setHexValue] = useState(selectedColor.substring(1));
  const [isHexWrong, setIsHexWrong] = useState(false);

  useEffect(() => {
    setHexValue(selectedColor.substring(1))
    setIsHexWrong(false)
  }, [selectedColor])

  function isHex(h) {
    var a = parseInt(h,16);
    return ((h.length === 3 || h.length === 6) && a.toString(16) === h.toLowerCase())
    }
  

  const handleHexChange = (text) => {

    if(text.length<7) {
        setHexValue(text);
    } 
  };

  const handleBlur = () => {

    if (isHex(hexValue) && hexValue !== "") {
      setSelectedColor("#" + hexValue)
      setIsHexWrong(false)
    }

    else setIsHexWrong(true)
  };

  const onSelectColor = ({ hex }) => {
    setSelectedColor(hex);
  };
  

  return (
    <CustomBottomSheet bottomSheetModalRef={bottomSheetModalRef} snapPoints={snapPoints} onChange={() => {}}>
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={styles.container}>
                <View style={{marginTop: -10}}>
                    <TitleText text="Couleur personnalisée" />
                </View>

                <View style={styles.body}>
                    <ColorPicker style={styles.contentContainer} thumbSize={30} value={selectedColor} onComplete={onSelectColor}>
                        <View style={styles.displayCenterRow}>
                            <View style={styles.displayCenterRow}>
                                <View style={[styles.textInputContainer, {borderColor: isHexWrong ? errorColor : font}]}>
                                    <Feather name="hash" size={20} color={isHexWrong ? errorColor : font} />

                                    <TextInput style={[styles.textInput, {color: font}]} autoCorrect={false} autoCapitalize='none'
                                        value={hexValue} onBlur={handleBlur} onChangeText={handleHexChange}/>
                                </View>
                            </View>
                        
                            <View style={{backgroundColor: selectedColor, borderRadius: 10, flex: 1, borderWidth: 2, borderColor: font, height: 50}}/>
                        </View>

                        <Separator/>

                        <View style={styles.colorPickerContainer}>
                            <View style={{flex: 1}}>
                                <Panel1 thumbShape="circle" style={{flex: 1, borderRadius: 20}} />
                            </View>

                            <HueSlider vertical thumbSize={20} sliderThickness={25} style={{borderRadius: 10}}/>
                        </View>
                    </ColorPicker>
                </View>
            </View>
        </TouchableWithoutFeedback>
    </CustomBottomSheet>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    gap: 30
  },

  body: {
    width: "100%", 
    height: "80%", 
  },

  colorPickerContainer: {
    display:"flex", 
    flexDirection: "row", 
    flex: 1, 
    gap: 20 
  },

  contentContainer: {
    display:"flex", 
    flexDirection: "column", 
    width: "100%",  
    height: '100%', 
    gap: 20 
  },    

  textInputContainer: {
    display: 'flex', 
    flexDirection: "row", 
    gap: 10, 
    borderWidth: 2,
    borderRadius: 10, 
    padding: 12,
    justifyContent: "space-between", 
    alignItems: "center"
  },

  textInput: {
    borderWidth: 0,
    fontFamily: "fontMedium", 
    borderRadius: 10, 
    fontSize: 14, 
    width: 80
  },

  displayCenterRow: {
    display: 'flex', 
    flexDirection: "row", 
    justifyContent: "center", 
    alignItems: "center",
    gap: 10, 
  }
});

export default CustomColorBottomScreen;
