import { ActivityIndicator, Modal, View } from "react-native"
import React from "react"

export const CustomSpinnerView = () => {
    return(
        <Modal animationType="fade" transparent={true}>
            <View style={{backgroundColor: 'rgba(0, 0, 0, 0.33)', justifyContent: 'center', flex: 1}}>
                <ActivityIndicator size="large"/>
            </View>
        </Modal>
    )
}