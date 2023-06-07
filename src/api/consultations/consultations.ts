import request from "../../lib/request";
import { AxiosError } from "axios";

export interface Consultations {
  id: number;
}

const getConsultations = async (): Promise<Consultations[] | AxiosError | any> => {
  try {
    const consultations = await request.get("/api/consultations");
    return consultations.data;
  } catch (error) {
    // console.error(error);
    throw error;
  }
};

export default getConsultations;
