import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInfo: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null,
  adminInfo: localStorage.getItem("adminInfo")
    ? JSON.parse(localStorage.getItem("adminInfo"))
    : null,
  userForEdit: {}
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.userInfo = action.payload;
      localStorage.setItem("userInfo", JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.userInfo = null;
      localStorage.removeItem("userInfo");
    },
    setAdminCredentials: (state, action) => {
      console.log(action.payload, "this is action.payload");
      state.adminInfo = action.payload;
      localStorage.setItem("adminInfo", JSON.stringify(action.payload));
    },
    adminLogout : (state) => {
        state.adminInfo = null, localStorage.removeItem('adminInfo')
    },
    userDetails:(state,action)=>{
        console.log(action.payload, "payload");
        state.userForEdit= action.payload
    }
  },
});

export const { setCredentials, logout, setAdminCredentials, adminLogout, userDetails } = authSlice.actions;

export default authSlice.reducer;
    