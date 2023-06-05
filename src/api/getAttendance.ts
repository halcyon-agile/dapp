import request from "../lib/request";
import { AxiosError } from "axios";
import { Attendance } from "./finishWork";

const getAttendance = async (): Promise<Attendance | AxiosError | any> => {
  try {
    const attendanceResponse = await request.get("/api/attendance");
    return attendanceResponse.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default getAttendance;
