import { createSlice } from "@reduxjs/toolkit";

// Load initial state from localStorage
const loadAuthState = () => {
  try {
    const serializedState = localStorage.getItem('authState');
    if (serializedState === null) {
      return {
        phoneNumber: "",
        countryCode: "+91",
        isOTPSent: false,
        isVerified: false,
      };
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return {
      phoneNumber: "",
      countryCode: "+91",
      isOTPSent: false,
      isVerified: false,
    };
  }
};

const initialState = loadAuthState();

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setPhoneNumber(state, action) {
      state.phoneNumber = action.payload;
      localStorage.setItem('authState', JSON.stringify(state));
    },
    setCountryCode(state, action) {
      state.countryCode = action.payload;
      localStorage.setItem('authState', JSON.stringify(state));
    },
    sendOTP(state) {
      state.isOTPSent = true;
      localStorage.setItem('authState', JSON.stringify(state));
    },
    verifyOTP(state) {
      state.isVerified = true;
      localStorage.setItem('authState', JSON.stringify(state));
    },
    logout(state) {
      const resetState = {
        phoneNumber: "",
        countryCode: "+91",
        isOTPSent: false,
        isVerified: false,
      };
      localStorage.setItem('authState', JSON.stringify(resetState));
      return resetState;
    },
  },
});

export const { setPhoneNumber, setCountryCode, sendOTP, verifyOTP, logout } =
  authSlice.actions;

export default authSlice.reducer;
