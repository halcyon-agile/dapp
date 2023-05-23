import customAxios from "../lib/customAxios";
import { AxiosError } from "axios";
import { Task } from "./getTasks";

const startTask = async (taskId: number): Promise<Task | AxiosError | any> => {
  try {
    const tasks = await customAxios.post(`api/tasks/${taskId}/start`);
    return tasks.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export default startTask;
