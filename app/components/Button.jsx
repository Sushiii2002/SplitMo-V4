import { Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import COLORS from '../constants/colors'


const Button = (props) => {
   const filledBgColor = props.color || COLORS.primary;
   const outlinedColor = COLORS.white;
   const bgColor = props.filled ? filledBgColor : outlinedColor;
   const textColor = props.filled ? COLORS.white : COLORS.primary;


   return (
       <TouchableOpacity
           style={{
               ...styles.button,
               ...{ backgroundColor: "#E7B10A" },
               ...props.style
           }}
           onPress={props.onPress}
       >
           <Text style={{ fontSize: 18,  fontWeight: 'bold', ... { color: textColor } }}>{props.title}</Text>
       </TouchableOpacity>
   )
}


const styles = StyleSheet.create({
   button: {
       paddingBottom: 16,
       paddingVertical: 10,
       borderColor: "#E7B10A",
       borderWidth: 2,
       borderRadius: 12,
       alignItems: 'center',
       justifyContent: 'center'
   }
})
export default Button
