import React, { Dispatch, FC, RefObject, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { Keyboard, StyleSheet, TextInput, TouchableWithoutFeedback, View } from 'react-native';
import ColorPicker, { HueSlider, Panel1, returnedResults } from 'reanimated-color-picker';
import { useThemeColor } from "../../components/Themed";
import { NormalGrayText, TitleText } from "../../styles/StyledText";
import { Feather } from '@expo/vector-icons'; 
import Separator from '../../components/Other/Separator';
import CustomBottomSheet from "../../components/BottomSheets/CustomBottomSheet";
import { BottomSheetModal, BottomSheetTextInput } from '@gorhom/bottom-sheet';
import { AppContext } from '../../data/AppContext';
import { BottomSheetCloseButton, CloseButton } from '../../components/Buttons/IconButtons';
import { CustomTextInputRefType, TextInputCustom } from '../../components/TextFields/TextInput';
import { hexToRGB, hexToRGBObject, rgbToHex } from '../../primitives/BasicsMethods';

export interface CustomColorBottomScreenProps {
  bottomSheetModalRef: RefObject<BottomSheetModal>,
  selectedColor: string,
  setSelectedColor: Dispatch<string>
}

interface CustomTextRGBProps {
  onChange: (text: string) => void, 
  value: number, 
  isSelected: boolean, 
  setIsSelected: Dispatch<boolean>, 
  label: string
}

const CustomTextRGB: FC<CustomTextRGBProps> = ({
  onChange, 
  value, 
  isSelected, 
  setIsSelected, 
  label
}) => {

  const {theme} = useContext(AppContext)
  
  const font = useThemeColor(theme, "Font");
  const fontGray = useThemeColor(theme, "FontGray");

  return (
    <View style={styles.displayColumn}>
      <TextInput style={[styles.textInput, {
          color: font, 
          fontSize: 16,
          borderWidth: 2,
          aspectRatio: 1,
          borderColor: isSelected ? font : fontGray,
          textAlign: "center"
        }]} 

        inputMode="numeric"
        autoCorrect={false} 
        autoCapitalize='none'
        maxLength={3}

        value={value.toString()} 
        onBlur={() => setIsSelected(false)} 
        onFocus={() => setIsSelected(true)}

        onChangeText={onChange}
      />
      <NormalGrayText bold text={label}/>
    </View>
  )
}

const CustomColorBottomScreen: FC<CustomColorBottomScreenProps> = ({ bottomSheetModalRef, selectedColor, setSelectedColor }) => {
  const {theme} = useContext(AppContext)
  
  const font = useThemeColor(theme, "Font");
  const fontGray = useThemeColor(theme, "FontGray");
  const errorColor = useThemeColor(theme, "Error") 

  const [hexValue, setHexValue] = useState<string>(selectedColor.substring(1));
  const [isHexWrong, setIsHexWrong] = useState<boolean>(false);
  const [hexSelected, setIsHexSelected] = useState<boolean>(false);

  const [redValue, setRedValue] = useState<number>(0);
  const [redSelected, setIsRedSelected] = useState<boolean>(false);

  const [greenValue, setGreenValue] = useState<number>(0);
  const [greenSelected, setIsGreenSelected] = useState<boolean>(false);

  const [blueValue, setBlueValue] = useState<number>(0);
  const [blueSelected, setIsBlueSelected] = useState<boolean>(false);


  useEffect(() => {
    setHexValue(selectedColor.substring(1))
    setIsHexWrong(false)

    const {r,g,b} = hexToRGBObject(selectedColor, 1)

    setRedValue(r)
    setGreenValue(g)
    setBlueValue(b)

  }, [selectedColor])

  function isValidHexaCode(input: string) {

    var hexaPattern = /^#([a-fA-F0-9]{6})$/;
 
    return hexaPattern.test(input);
  }

  const handleHexChange = (text: string) => {

    if(text.length<7) {
        setHexValue(text);
    } 
  };

  const handleBlur = () => {
    if (isValidHexaCode("#" + hexValue) && hexValue !== "") {
      setSelectedColor("#" + hexValue)
      setIsHexWrong(false)
    }

    else setIsHexWrong(true)
  };

  const onSelectColor = (result: returnedResults) => {
    setSelectedColor(result.hex);
  };
  
  const closeModal = () => {
    bottomSheetModalRef.current?.close()
  }

  const handleChangeRed = (text: string) => {
    let redVal: number = 0
    if(text !== "") {
      redVal = parseInt(text) ?? 0
    }

    if(redVal > 255) redVal = 255
    if(redVal < 0) redVal = 0

    const hVal = rgbToHex(redVal, greenValue, blueValue)

    setRedValue(redVal)

    setHexValue(hVal.substring(1))
    setSelectedColor(hVal)
  }

  const handleChangeGreen = (text: string) => {
    let greenVal: number = 0
    if(text !== "") {
      greenVal = parseInt(text) ?? 0
    }

    if(greenVal > 255) greenVal = 255
    if(greenVal < 0) greenVal = 0

    const hVal = rgbToHex(redValue, greenVal, blueValue)

    setGreenValue(greenVal)

    setHexValue(hVal.substring(1))
    setSelectedColor(hVal)
  }

  const handleChangeBlue = (text: string) => {
    let blueVal: number = 0
    if(text !== "") {
      blueVal = parseInt(text) ?? 0
    }

    if(blueVal > 255) blueVal = 255
    if(blueVal < 0) blueVal = 0

    const hVal = rgbToHex(blueVal, greenValue, blueVal)

    setBlueValue(blueVal)

    setHexValue(hVal.substring(1))
    setSelectedColor(hVal)
  }

  const hexColor = hexSelected ? font : (isHexWrong ? errorColor : fontGray)

  return (
    <CustomBottomSheet 
        bottomSheetModalRef={bottomSheetModalRef}
        onDismiss={() => {
          setIsBlueSelected(false)
          setIsRedSelected(false)
          setIsGreenSelected(false)
          setIsHexSelected(false)
        }}>
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()} style={{flex: 1}}>
            <View style={styles.container}>
                <View style={styles.pageTitleContainer}>
                    <TitleText text="Couleur personnalisée"/>
                    <BottomSheetCloseButton methode={closeModal}/>
                </View>

                <View style={styles.body}>
                  <ColorPicker style={styles.contentContainer} thumbSize={30} value={selectedColor} onComplete={onSelectColor}>   

                  <View style={styles.displayCenterRow}>
                    <View style={styles.displayColumn}>
                        <View style={[styles.textInputContainer, {borderColor: hexColor}]}>
                            <Feather name="hash" size={20} color={hexColor} />

                            <TextInput style={[styles.textInput, {
                                color: font, 
                                fontSize: 16
                              }]} 
                              autoCorrect={false} 
                              autoCapitalize='none'
                              value={hexValue} 
                              onBlur={() => {
                                handleBlur()
                                setIsHexSelected(false)
                              }} 
                              onFocus={() => setIsHexSelected(true)}                                      
                              onChangeText={handleHexChange}
                            />
                        </View>

                        <NormalGrayText bold text="Hex"/>
                    </View>     

                    <View style={{flexDirection: "row", gap: 5, flex: 1}}>
                      <CustomTextRGB value={redValue} onChange={handleChangeRed} label="R"
                        isSelected={redSelected} setIsSelected={setIsRedSelected}
                      />

                      <CustomTextRGB value={greenValue} onChange={handleChangeGreen} label="G"
                        isSelected={greenSelected} setIsSelected={setIsGreenSelected}  
                      />

                      <CustomTextRGB value={blueValue} onChange={handleChangeBlue} label="B"
                        isSelected={blueSelected} setIsSelected={setIsBlueSelected}
                      />
                    </View>                   
                  </View>

                  <Separator/>

                  <View style={styles.colorPickerContainer}>
                      <Panel1 thumbShape="circle" 
                        style={{flex: 1, borderRadius: 10}}/>

                      <HueSlider thumbSize={20} sliderThickness={25}
                        style={{borderRadius: 5}}/>
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
    display: "flex",
    flexDirection: "column",
    gap: 30,
    marginBottom: 60,
    marginTop: 20
  },

  body: {
    flex: 1
  },

  colorPickerContainer: {
    display:"flex", 
    flexDirection: "column", 
    flex: 1, 
    gap: 20
  },

  contentContainer: {
    display:"flex", 
    flexDirection: "column", 
    width: "100%",  
    height: '100%', 
    gap: 20,
    flex: 1
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
    flex: 1
  },

  displayCenterRow: {
    display: 'flex', 
    flexDirection: "row", 
    flex: 1,
    gap: 10, 
  },

  pageTitleContainer: {
    display: "flex", 
    flexDirection: "row", 
    alignItems:"center", 
    justifyContent: "space-between",
    gap: 20,
    marginLeft: 5,
  },

  displayColumn: {
    flexDirection: 'column',
    alignItems: 'center', 
    justifyContent: 'center', 
    flex: 1,
    gap: 5
  }
});

export default CustomColorBottomScreen;
