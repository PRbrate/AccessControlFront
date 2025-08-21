import React, { useEffect, useRef } from "react";
import { Animated, Easing, View } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import colors from "@/constants/Colors";

const SpinIcon = () => {
  const rotateAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  }, [rotateAnim]);

  const spin = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <Animated.View style={{ transform: [{ rotate: spin }] }}>
      <FontAwesome name="spinner" size={24} color={colors.white} />
    </Animated.View>
  );
};

export default SpinIcon;
