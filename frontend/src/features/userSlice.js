import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

//create async thunk
export const fetchUser = createAsyncThunk(
  "user/fetchUser",
  async (userId) => {
    const response = await fetch(`XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX${userId}`);
    const data = await response.json();
    return data;
  }
);

//create initial values
const initialState = {
  user: {
    _id: "",
    firstName: "",
    lastName: "",
    email: "",
    image: "",
    status: { isAdmin: false },
  },
  isLoggedIn: false,
  error: null,
};

//user slice
export const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    login: (state, actions) => {
      state.user = actions.payload;
      state.isLoggedIn = true;
       },
    logout: (state) => {
      //just reset to initial value
      state.value = initialState;
      state.isLoggedIn = false;
    },

  },
});
export const { login,logout } = userSlice.actions;

export default userSlice.reducer;
