import request from "../../lib/request";
import { AxiosError } from "axios";

export interface RequestConsultation {
  id: number;
}

const requestConsultation = async (id: number): Promise<RequestConsultation[] | AxiosError | any> => {
  try {
    const consultations = await request.post(`/api/tasks/${id}/request-consultation`);
    return consultations.data;
  } catch (error) {
    // console.error(error);
    throw error;
  }
};

export default requestConsultation;
