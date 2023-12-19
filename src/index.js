
import React, { useRef, useCallback } from 'react';
import { Platform, Pressable, findNodeHandle, Animated } from 'react-native';

export const FocusButton = ({ isTVSelectable, hasTVPreferredFocus, tvParallaxProperties, onPress, onFocus, children, blockFocusRight, blockFocusLeft, style,focusValue }) => {

  const scaleValue = useRef(new Animated.Value(1)).current;
  const handleFocus = () => {
    if (Platform.isTV && Platform.OS === 'android' || Platform.OS === 'web') {
      Animated.spring(scaleValue, {
        toValue: focusValue?focusValue: 1.13, // Scale down to 80%
        useNativeDriver: true,
      }).start();
    }
  };

  const handleBlur = () => {
    if ((Platform.isTV && Platform.OS === 'android') || Platform.OS === 'web') {
      Animated.spring(scaleValue, {
        toValue: 1, // Scale back to 100%
        useNativeDriver: true,
      }).start();
    }
  };

  const touchableHighlightRef = useRef(null);

  const onRef = useCallback((ref) => {
    if (ref) {
      touchableHighlightRef.current = ref;
    }
  }, []);

  if (Platform.isTV && Platform.OS === 'ios') {
    return (
      <Pressable
        onPress={onPress}
        onMouseEnter={() => handleFocus()}
        onMouseLeave={() => handleBlur()}
        onFocus={() => {
          onFocus && onFocus();
          handleFocus()
        }}
        onBlur={handleBlur}
        isTVSelectable={isTVSelectable}
        hasTVPreferredFocus={hasTVPreferredFocus}
        tvParallaxProperties={tvParallaxProperties}
        style={style}
      >
        {children}
      </Pressable>
    )
  }

  return (
    <Animated.View style={[{ transform: [{ scale: scaleValue }] }]}>
      <Pressable
        onPress={onPress}
        ref={onRef}
        nextFocusRight={
          Platform.isTV && Platform.OS === 'android' ? blockFocusRight ? findNodeHandle(touchableHighlightRef.current) : null : findNodeHandle(touchableHighlightRef.current)
        }
        nextFocusLeft={Platform.isTV && Platform.OS === 'android' ? blockFocusLeft ? findNodeHandle(touchableHighlightRef.current) : null : findNodeHandle(touchableHighlightRef.current)}
        onMouseEnter={() => handleFocus()}
        onMouseLeave={() => handleBlur()}
        onFocus={() => {
          onFocus && onFocus();
          handleFocus()
        }}
        onBlur={handleBlur}
        isTVSelectable={isTVSelectable}
        hasTVPreferredFocus={hasTVPreferredFocus}
        tvParallaxProperties={tvParallaxProperties}
        style={style}
      >
        {children}
      </Pressable>
    </Animated.View>
  )
}


export const FocusText = React.memo(({isTVSelectable, hasTVPreferredFocus, tvParallaxProperties, textStyle, containerStyle, value, onPress }) => {
 
  const scaleValue = useRef(new Animated.Value(1)).current;
 
  const animateTextSize = (val) => {
    Animated.timing(
      scaleValue,
      {
        toValue: val,
        duration: 500,
        useNativeDriver: true
      }            
    ).start();
  }
 
 
 
  return (
    <Pressable
        onPress={onPress}
        
        onFocus={() => {
          animateTextSize(1.5)
        }}
        onBlur={()=> animateTextSize(1)}
        // isTVSelectable={isTVSelectable}
        // hasTVPreferredFocus={false}
        // tvParallaxProperties={tvParallaxProperties}
        style={containerStyle}
      >
      <Animated.Text style={[textStyle, {alignSelf: "center", transform: [{ scale: scaleValue }] }]}>
        {value}
      </Animated.Text>
    </Pressable>
  )
})