import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentUser: null,
  error: null,
  loading: false
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    signInPending: (state) => {
      state.loading = true;
    },
    signInSuccess: (state, action) => {
      state.loading = false,
      state.currentUser = action.payload;
    },
    signInFailed: (state, action) => {
      state.error = action.payload,
      state.loading = false;
    }
  }
});

export const { signInPending, signInFailed, signInSuccess } = userSlice.actions;
export default userSlice.reducer;