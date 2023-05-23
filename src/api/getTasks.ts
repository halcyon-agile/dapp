import customAxios from "../lib/customAxios";
import { AxiosError } from "axios";

export interface Task {
  id: number;
  name: string;
  project: {
    id: number;
    name: string;
  };
}

const getTasks = async (): Promise<Task[] | AxiosError | any> => {
  try {
    const tasks = await customAxios.get("/api/tasks");
    return tasks.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default getTasks;
