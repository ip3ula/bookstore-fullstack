import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: 'Paula',
  reducers: {
    setUser(state, action) {
      return action.payload;
    },
    clearUser() {
      return null;
    }
  }
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;