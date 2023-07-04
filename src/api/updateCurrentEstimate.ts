import request from "../lib/request";
import { AxiosError } from "axios";
import { Task } from "@/types";

const updateCurrentEstimate = async ({
  taskId,
  estimate,
}: {
  taskId: number;
  estimate: number;
}): Promise<Task | AxiosError | any> => {
  const formData = new FormData()
  formData.append("estimate", estimate.toString())
  const response = await request.post(`api/tasks/${taskId}/update-estimate`, formData);
  return response;
};

export default updateCurrentEstimate;
