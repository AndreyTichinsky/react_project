import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type EntranceState = {
  username: string;
};

export const initialState: EntranceState = {
  username: "Guest",
};

export const entranceSlice = createSlice({
  name: "ENTRANCE",
  initialState,
  reducers: {
    setUsername: (state, action: PayloadAction<any>) => {
      return {
        ...state,
        username: action.payload,
      };
    },
  },
});

export const { reducer, actions } = entranceSlice;
