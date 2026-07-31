import { Redirect } from "expo-router";

export default function Index() {
  // Later we'll check if the user is logged in.
  return <Redirect href="/(auth)/login" />;
}