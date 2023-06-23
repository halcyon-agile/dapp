import request from "../lib/request";
import { AxiosError } from "axios";
import { Task } from "@/types";

const stopTask = async ({
  taskId,
  hours,
}: {
  taskId: number;
  hours: number;
}): Promise<Task | AxiosError | any> => {
  try {
    const tasks = await request.post(`api/tasks/${taskId}/stop`, {
      estimate_in_hours: hours,
    });
    return tasks.data;
  } catch (error) {
    // console.log(error);
    throw error;
  }
};

export default stopTask;
