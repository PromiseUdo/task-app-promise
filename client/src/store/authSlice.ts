import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  user: localStorage.getItem("USER_DETAILS")
    ? JSON.parse(localStorage.getItem("USER_DETAILS")!)
    : null,
};

export type SigninDTO = {
  email: string;
  password: string;
  username?: string;
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.user = action.payload;
      localStorage.setItem("USER_DETAILS", JSON.stringify(action.payload));
      // return action.payload;
    },
    clearCredentials: (state) => {
      state.user = null;
      localStorage.removeItem("USER_DETAILS");
    },
  },
});

export const { setCredentials, clearCredentials } = authSlice.actions;
export default authSlice.reducer;
