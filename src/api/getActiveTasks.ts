import request from "../lib/request";
import { AxiosError } from "axios";
export interface TaskTime {
  consultation_id: number;
  id: number;
  name: string;
  started_at: string;
  ended_at: string;
  task: {
    id: number;
    name: string;
    started_at: string;
    ended_at: string;
    project: {
      id: number;
      name: string;
    };
  };
}

const getActiveTasks = async (): Promise<TaskTime[] | AxiosError | any> => {
  try {
    const tasks = await request.get("/api/active-tasks");
    return tasks.data;
  } catch (error) {
    // console.error(error);
    throw error;
  }
};

export default getActiveTasks;
