import customAxios from "../lib/customAxios";
import { AxiosError } from "axios";

export interface Attendance {
  id: number;
  started_at: string;
  ended_at: string;
}

const finishWork = async (): Promise<Attendance | AxiosError | any> => {
  try {
    const attendance = await customAxios.post(`api/finish-work`, {
      password: "secret",
    });

    delete customAxios.defaults.headers.common["Authorization"];

    return attendance.data;
  } catch (error) {
    throw error;
  }
};

export default finishWork;
