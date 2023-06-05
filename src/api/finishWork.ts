import request from "../lib/request";
import { AxiosError } from "axios";

export interface Attendance {
  id: number;
  started_at: string;
  ended_at: string;
}

const finishWork = async (): Promise<Attendance | AxiosError | any> => {
  try {
    const attendance = await request.post(`api/finish-work`, {
      password: "secret",
    });

    delete request.defaults.headers.common["Authorization"];
    
    return attendance.data;
  } catch (error) {
    throw error;
  }
};

export default finishWork;
