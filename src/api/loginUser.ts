import request from "../lib/request";
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
    const loginResponse = await request.post("/api/login", {
      email,
      password,
      device_name: "desktop-app",
    });
    localStorage.setItem("token", loginResponse.data.token);
    request.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${loginResponse.data.token}`;
    const userResponse = await request.get("/api/me");
    return userResponse.data as UserData;
  } catch (error: AxiosError | any) {
    throw error;
  }
};

export default loginUser;
