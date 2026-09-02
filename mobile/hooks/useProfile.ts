import { useCallback, useState } from "react";
import { useFocusEffect } from "expo-router";
import userService, { UserProfile } from "../services/userService";


export default function useProfile() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadProfile = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const response = await userService.getProfile();

      console.log("Profile:", response);

      setProfile(response);
    } catch (error) {
      console.error("Profile error:", error);

      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Failed to load profile");
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadProfile();
    }, [loadProfile])
  );

  return {
    profile,
    loading,
    error,
    refresh: loadProfile,
  };
}