import colors from "@/constants/colors";
import React from "react";
import { TextInput } from "react-native-paper";

export interface CustomInputProps {
  label: string;
  value?: string;
  widthlabel: number
  onChangeText: (text: string) => void;
}

export default function CustomTextInput({
  label,
  value,
  widthlabel,
  onChangeText,
}: CustomInputProps) {
  return (
    <TextInput
      label={label}
      value={value}
      onChangeText={onChangeText}
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
