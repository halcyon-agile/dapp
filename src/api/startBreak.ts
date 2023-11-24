import request from "../lib/request";
import { AxiosError } from "axios";
import { Breaks, BreakForm } from "@/types";

const startBreak = async (
  breakForm: BreakForm
): Promise<Breaks | AxiosError | any> => {
  const hourToMinutes = 60 * parseInt(breakForm?.hours.length > 0 ? breakForm.hours : "0")
  try {
    const response = await request.post(`api/break/start`, {
      reason: breakForm.reason,
      minutes: hourToMinutes + breakForm.minutes !== "" ? Number(breakForm.minutes) : 0,
    });

    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export default startBreak;
