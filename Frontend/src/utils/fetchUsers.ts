import client from "./apiClient";

export const fetchAllUsers = async () => {
  try {
    const response = await client.GET("/api/User", {});
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
  }
};
