import request from "../../lib/request";
import { AxiosError } from "axios";

export interface RequestConsultation {
  id: number;
}

const requestConsultation = async (): Promise<RequestConsultation[] | AxiosError | any> => {
  try {
    const consultations = await request.post("/api/tasks/:task/request-consultation");
    return consultations.data;
  } catch (error) {
    // console.error(error);
    throw error;
  }
};

export default requestConsultation;
