import client from "./apiClient";

export const fetchUserById = async (id: number) => {
  try {
    const response = await client.GET("/api/User/{id}", {
      params: {
        path: { id },
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching user by ID:", error);
    throw error;
  }
};
