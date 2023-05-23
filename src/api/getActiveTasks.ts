import customAxios from "../lib/customAxios";
import { AxiosError } from "axios";
import { Task } from "./getTasks";

const getActiveTasks = async (): Promise<Task[] | AxiosError | any> => {
  try {
    const tasks = await customAxios.get("/api/active-tasks");
    return tasks.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default getActiveTasks;
