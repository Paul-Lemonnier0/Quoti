import React, { FC, useContext } from 'react'
import { Icon, IconProvider } from '../Buttons/IconButtons'
import { StyleSheet, Switch, TouchableOpacity } from 'react-native'
import { SubTitleText } from '../../styles/StyledText'
import { AppContext } from '../../data/AppContext'
import { useThemeColor } from '../Themed'
import { View } from 'react-native'
import { BottomScreenOpen_Impact } from '../../constants/Impacts'

export type CommandType = {
    icon: string,
    provider: IconProvider,
    text: string,
    method: () => void,
    color?: string,
    chevron?: boolean,
    switchButton?: boolean,
    switchButtonValue?: boolean,
}

const Command: FC<CommandType> = ({
    icon,
    provider,
    text,
    method,
    color,
    chevron,
    switchButton,
    switchButtonValue
}) => {

    const {theme} = useContext(AppContext)
    const fontGray = useThemeColor(theme, "FontGray")
    const font = useThemeColor(theme, "Font")
    const secondary = useThemeColor(theme, "Secondary")

    const handleOnPress = () => {
        if(switchButton) {
            BottomScreenOpen_Impact()
        }

        method()
    }

    return (
        <TouchableOpacity onPress={method} style={styles.commandContainer}>
            <View style={{flexDirection: "row", gap: 20, alignItems: "center", flex: 1}}>
                <Icon name={icon} provider={provider ?? IconProvider.Feather} color={color ?? fontGray}/>
                <SubTitleText text={text} style={{color: color ?? font}}/>
            </View>
            <View>
            {
                chevron && !switchButton ?
                    <Icon provider={IconProvider.Feather} name={"chevron-right"} color={fontGray}/>
                    :
                switchButton && 
                    <Switch 
                        value={switchButtonValue} 
                        onValueChange={handleOnPress} 
                        trackColor={{false: secondary, true: secondary}}/>
            }
            </View>
        </TouchableOpacity>     
    )
}

const styles = StyleSheet.create({
    commandContainer: {
        display: "flex",
        flexDirection: "row",
        gap: 30,
        marginVertical: 20
    },
})

export default Command