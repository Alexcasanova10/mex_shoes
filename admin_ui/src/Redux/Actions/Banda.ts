import api from "../Constants/api";
import { Dispatch } from "redux";

export const FETCH_BAND_INFO = "FETCH_BAND_INFO";

export const bandListAction = () => async (dispatch: Dispatch) => {
  try {
    const response = await api.get("/api/banda/databanda");
    dispatch({ type: FETCH_BAND_INFO, payload: response.data });
  } catch (error) {
    console.error("Error fetching band data:", error);
  }
};
