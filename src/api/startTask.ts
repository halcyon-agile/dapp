import request from "../lib/request";
import { AxiosError } from "axios";
import { TaskTime } from "./getActiveTasks";

const startTask = async (
  taskId: number
): Promise<TaskTime | AxiosError | any> => {
  try {
    const taskTimeResponse = await request.post(
      `api/tasks/${taskId}/start`
    );

    return taskTimeResponse.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export default startTask;
