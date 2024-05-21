import React, { FC, ReactNode } from 'react'
import { View, StyleSheet, Animated } from 'react-native'
import { HugeText } from '../../styles/StyledText';
import Quoti from './Quoti';

interface AnimatedHeaderProps {
  title: string,
  opacity: Animated.AnimatedInterpolation<string | number>,
  children?: ReactNode,
}

const AnimatedHeader: FC<AnimatedHeaderProps> = ({title, opacity, children}) => {
	return (
		<Animated.View style={[styles.header, {opacity}]}>
      
        {
          title === "quoti" ?
          <Quoti/> :
          <HugeText text={title}/>
        }
        
        <View style={{flexDirection: 'row', alignItems: 'center', gap: 0}}>
          {children}
        </View>

		</Animated.View>
	)
}

export default AnimatedHeader

const styles = StyleSheet.create({
	header: {
    paddingLeft: 20,
    paddingTop: 0, 
    paddingBottom: 10, 
		elevation: 8,
		justifyContent: 'space-between',
		alignItems: 'center',
		flexDirection: 'row',
	},
})