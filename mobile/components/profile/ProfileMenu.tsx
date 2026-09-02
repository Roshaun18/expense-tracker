import ProfileMenuItem from "./ProfileMenuItem";
import { useRouter } from "expo-router";
import { View, StyleSheet } from "react-native";
import authService from "../../services/authService";
import {
  colors,
  spacing
} from "../../theme";

export default function ProfileMenu() {
  const router = useRouter();

  const handleLogout = async () => {
    await authService.logout();

    router.replace("/login");
  };

  return (
    <View>
      <ProfileMenuItem
        title="Settings"
        icon="settings"
        iconColor={colors.primary}
        onPress={()=>router.push("/settings")}
      />

      <ProfileMenuItem
        title="Logout"
        icon="log-out-outline"
        iconColor={colors.expense}
        onPress={handleLogout}
      />
    </View>
  );
}