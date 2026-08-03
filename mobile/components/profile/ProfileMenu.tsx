import ProfileMenuItem from "./ProfileMenuItem";

import {
  colors,
} from "../../theme";

export default function ProfileMenu() {
  return (
    <>
      <ProfileMenuItem
        title="Edit Profile"
        icon="person-outline"
        iconColor={colors.primary}
      />

      <ProfileMenuItem
        title="Notifications"
        icon="notifications-outline"
        iconColor={colors.electric}
      />

      <ProfileMenuItem
        title="Privacy"
        icon="lock-closed-outline"
        iconColor={colors.violet}
      />

      <ProfileMenuItem
        title="Appearance"
        icon="moon-outline"
        iconColor={colors.primary}
      />

      <ProfileMenuItem
        title="Help & Support"
        icon="help-circle-outline"
        iconColor={colors.income}
      />

      <ProfileMenuItem
        title="Logout"
        icon="log-out-outline"
        iconColor={colors.expense}
      />
    </>
  );
}