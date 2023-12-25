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
      state.error = null;
    },
    signInFailed: (state, action) => {
      state.error = action.payload,
      state.loading = false;
    },
    updateUserPending: (state) => {
      state.loading = true;
    },
    updateSuccess: (state, action) => {
      state.loading = false,
      state.currentUser = action.payload;
      state.error = null;
    },
    updateFailed: (state, action) => {
      state.error = action.payload,
      state.loading = false;
    },
    deleteUserPending: (state) => {
      state.loading = true;
    },
    deleteSuccess: (state) => {
      state.loading = false,
      state.currentUser = null;
      state.error = null;
    },
    deleteFailed: (state, action) => {
      state.error = action.payload,
      state.loading = false;
    }
  }
});

export const {
  signInPending,
  signInFailed,
  signInSuccess,
  updateUserPending,
  updateSuccess,
  updateFailed,
  deleteUserPending,
  deleteSuccess,
  deleteFailed
} = userSlice.actions;
export default userSlice.reducer;