import customAxios from "../lib/customAxios";
import { AxiosError } from "axios";

export interface UserData {
  id: string;
  name: string;
  email: string;
  has_active_task_time?: boolean;
  attendance?: {
    id: number;
    started_at: string;
    ended_at: string;
  };
}

const loginUser = async (
  email: string,
  password: string
): Promise<UserData | AxiosError | any> => {
  try {
    const loginResponse = await customAxios.post("/api/login", {
      email,
      password,
      device_name: "desktop-app",
    });
    customAxios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${loginResponse.data.token}`;
    const userResponse = await customAxios.get("/api/me");
    return userResponse.data as UserData;
  } catch (error: AxiosError | any) {
    throw error;
  }
};

export default loginUser;
