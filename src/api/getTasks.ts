import request from "../lib/request";
import { AxiosError } from "axios";

export interface Task {
  id: number;
  name: string;
  started_at: string;
  ended_at: string;
  project: {
    id: number;
    name: string;
  };
}

const getTasks = async (): Promise<Task[] | AxiosError | any> => {
  try {
    const tasks = await request.get("/api/tasks");
    return tasks.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default getTasks;
