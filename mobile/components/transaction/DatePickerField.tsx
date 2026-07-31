import { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Ionicons } from "@expo/vector-icons";

import {
  colors,
  spacing,
  typography,
  radius,
} from "../../theme";

type Props = {
  value: Date;
  onChange: (date: Date) => void;
};

export default function DatePickerField({
  value,
  onChange,
}: Props) {
    const [showPicker, setShowPicker] = useState(false);

  const formattedDate = value.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  const handleChange = (
    event: any,
    selectedDate?: Date
  ) => {
    setShowPicker(false);

    if (selectedDate) {
      onChange(selectedDate);
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Date</Text>

      <TouchableOpacity
        style={styles.field}
        activeOpacity={0.8}
        onPress={()=>setShowPicker(true)}
      >
        <Text style={styles.dateText}>{formattedDate}</Text>

        <Ionicons
          name="calendar-outline"
          size={22}
          color={colors.primary}
        />
      </TouchableOpacity>
      
      {showPicker && (
  <DateTimePicker
    value={value}
    mode="date"
    display="default"
    onChange={handleChange}
  />
)}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.xl,
  },

  label: {
    color: colors.textPrimary,
    fontSize: typography.size.md,
    fontWeight: typography.weight.semibold,
    marginBottom: spacing.sm,
  },

  field: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    height: 56,

    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,

    backgroundColor: colors.input,

    paddingHorizontal: spacing.lg,
  },

  dateText: {
    color: colors.textPrimary,
    fontSize: typography.size.md,
  },
});