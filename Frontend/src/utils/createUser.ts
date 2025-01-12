import client from "./apiClient";
import type { components } from "../lib/api/v1";

type postUser = components["schemas"]["User"];

export const createUser = async (input: postUser) => {
  try {
    const response = await client.POST("/api/User", {
      query: undefined,
      body: input,
    });
    return response.data;
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
};
