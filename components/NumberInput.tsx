import colors from "@/constants/Colors";
import React from "react";
import { TextInput } from "react-native-paper";
import { CustomInputProps } from "./TextInput";


export default function CustomNumberInput({
  label,
  value,
  widthlabel,
  onChangeText,
}: CustomInputProps) {
  return (
    <TextInput
      label={label}
      value={value}
      onChangeText={(text) => {
        const numeriValue = text.replace(/[^0-9]/g, "");
        onChangeText(numeriValue)
      }}
      keyboardType="numeric"
      mode="outlined"
      style={{ width: `${widthlabel}%` }}
      theme={{
        colors: {
          primary: colors.secundatyBlue,
          secondary: colors.blackBlue,
          onSurfaceVariant: colors.gray,
        },
      }}
      outlineStyle={{
        borderRadius: 12,
      }}
    />
  );
}
