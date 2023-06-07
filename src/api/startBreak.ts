import request from "../lib/request";
import { AxiosError } from "axios";

export interface Breaks {
  id: number;
  started_at: string;
  reason: string;
}

const startBreak = async (
  reason: string
): Promise<Breaks | AxiosError | any> => {
  try {
    const response = await request.post(`api/break/start`, { reason });

    return response.data;
  } catch (error) {
    // console.log(error);
    throw error;
  }
};

export default startBreak;
