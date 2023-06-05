import request from "../lib/request";
import { AxiosError } from "axios";
import { Task } from "./getTasks";

const stopTask = async (taskId: number): Promise<Task | AxiosError | any> => {
  try {
    const tasks = await request.post(`api/tasks/${taskId}/stop`);
    return tasks.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export default stopTask;
