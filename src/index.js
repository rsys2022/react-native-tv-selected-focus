
import React, {useState } from 'react';
import {Platform,Pressable } from 'react-native';

export const FocusButton = ({ isTVSelectable, hasTVPreferredFocus, tvParallaxProperties, onPress, onFocus,children }) => {
  const [magnified, Setmagnified] = useState(false);
  const handleFocus = () => {
    console.log('onFocus')
    if (Platform.isTV && Platform.OS === 'android' || Platform.OS === 'web') {
      Setmagnified(true)
    }
  };

  const handleBlur = () => {
    console.log('onBlur')
    if ((Platform.isTV && Platform.OS === 'android') || Platform.OS === 'web') {
      Setmagnified(false)
    }
  };

  return (
    <Pressable
      onPress={onPress}
      onMouseEnter={() => handleFocus()}
      onMouseLeave={() => handleBlur()}
      onFocus={()=>{onFocus();handleFocus()}}
      onBlur={handleBlur}
      isTVSelectable={isTVSelectable}
          hasTVPreferredFocus={hasTVPreferredFocus}
          tvParallaxProperties={tvParallaxProperties}
      style={[magnified ? { transform: [{ scale: 1.09 }] } : {}]}>
      {children}
    </Pressable>
  )
}