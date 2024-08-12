import { createSlice, configureStore } from "@reduxjs/toolkit";

const securitySlice = createSlice({
  name: "security",
  initialState: {
    adminLoginStatus: false,
    userLoginStatus: false,
    userId: "",
  },
  reducers: {
    setAdminLoginStatus: (state, action) => {
      state.adminLoginStatus = action.payload;
    },
    setUserLoginStatus: (state, action) => {
      state.userLoginStatus = action.payload;
    },
    setUserId: (state, action) => {
      state.userId = action.payload;
    },
  },
});

export const { setUserLoginStatus, setAdminLoginStatus, setUserId } =
  securitySlice.actions;

export default configureStore({
  reducer: securitySlice.reducer,
});
