import * as SecureStore from "expo-secure-store";
const API_URL="https://expense-tracker-1-dcwp.onrender.com";

export async function apiRequest(
    endpoint: string,
    options: RequestInit={}
){
    const token = await SecureStore.getItemAsync("token");
    const response = await fetch(`${API_URL}${endpoint}`,{
        ...options,
        headers:{
            "Content-Type":"application/json",

            ...(token && {
        Authorization: `Bearer ${token}`,
      }),
            ...options.headers,
        },
    });
    const contentType = response.headers.get("content-type");

const data = contentType?.includes("application/json")
  ? await response.json()
  : await response.text();
    
  if (!response.ok) {
  const message =
    typeof data === "string"
      ? data
      : data.message || "Something went wrong";

  throw new Error(message);
}
    return data;
}