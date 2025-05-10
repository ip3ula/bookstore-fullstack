import { createSlice } from '@reduxjs/toolkit';

// Safely read and parse user data from localStorage
let savedUser;
try {
  const stored = localStorage.getItem('user');
  savedUser = stored ? JSON.parse(stored) : null;
} catch (e) {
  console.warn('Invalid JSON in localStorage for user:', e);
  savedUser = null;
}

const userSlice = createSlice({
  name: 'user',
  initialState: savedUser,
  reducers: {
    setUser(state, action) {
      try {
        localStorage.setItem('user', JSON.stringify(action.payload));
        console.log('User set in localStorage:', action.payload);
      } catch (e) {
        console.error('Failed to store user in localStorage:', e);
      }
      return action.payload;
    },
    clearUser() {
      localStorage.removeItem('user');
      return null;
    }
  }
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
