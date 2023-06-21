import request from "../lib/request";
import { AxiosError } from "axios";
import { TaskTime } from "../types";

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
