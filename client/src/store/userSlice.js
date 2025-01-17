import { createSlice } from "@reduxjs/toolkit";

// Initial state for the user slice
const initialState = {
  token: null,
  user: {
    firstName: null,
    lastName: null,
    email: null,
  },
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { token, user } = action.payload;
      if (user) {
        state.token = token || null;
        state.user = {
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
        };
      } else {
        console.error("Invalid payload structure in setUser:", action.payload);
      }
    },
    clearUser: (state) => {
      state.token = null;
      state.user = {
        firstName: null,
        lastName: null,
        email: null,
      };
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;

export default userSlice.reducer;
