import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

import {
  colors,
  spacing,
 radius,
  typography,
} from "../../theme";

type Props = {
  title: string;
  icon: keyof typeof Ionicons.glyphMap;
  iconColor: string;
  onPress?: () => void;
};

export default function ProfileMenuItem({
  title,
  icon,
  iconColor,
  onPress,
}: Props) {
  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.8}
      onPress={onPress}
    >
      <View style={styles.left}>
        <View
          style={[
            styles.iconContainer,
            {
              backgroundColor: `${iconColor}20`,
            },
          ]}
        >
          <Ionicons
            name={icon}
            size={20}
            color={iconColor}
          />
        </View>

        <Text style={styles.title}>
          {title}
        </Text>
      </View>

      <Ionicons
        name="chevron-forward"
        size={22}
        color={colors.textSecondary}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",

    justifyContent: "space-between",
    alignItems: "center",

    backgroundColor: colors.card,

    borderRadius: radius.lg,

    borderWidth: 1,
    borderColor: colors.border,

    padding: spacing.lg,

    marginBottom: spacing.md,
  },

  left: {
    flexDirection: "row",
    alignItems: "center",
  },

  iconContainer: {
    width: 42,
    height: 42,

    borderRadius: radius.full,

    justifyContent: "center",
    alignItems: "center",

    marginRight: spacing.md,
  },

  title: {
    color: colors.textPrimary,

    fontSize: typography.size.md,

    fontWeight: typography.weight.medium,
  },
});