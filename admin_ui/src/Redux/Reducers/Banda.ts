import { FETCH_BAND_INFO } from "../Actions/Banda";

type BandState = {
  totalBlue: number;
  totalRed: number;
  totalGreen: number;
};

const initialState: BandState = {
  totalBlue: 0,
  totalRed: 0,
  totalGreen: 0,
};

export const bandListReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case FETCH_BAND_INFO:
      return {
        ...state,
        totalBlue: action.payload.totalBlue,
        totalRed: action.payload.totalRed,
        totalGreen: action.payload.totalGreen,
      };
    default:
      return state;
  }
};
