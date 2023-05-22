import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    userList: [],
    loggedInUser: {},
  },
  reducers: {
    signup(state, action) {
      state.userList.push(action.payload);
    },
    setLoggedInUser(state, action) {
      state.loggedInUser = action.payload;
    },
  },
});
export const authAction = authSlice.actions;
export default authSlice;
