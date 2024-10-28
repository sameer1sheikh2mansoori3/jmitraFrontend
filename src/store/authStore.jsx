import {create} from 'zustand';
import axios from 'axios';

// Create a Zustand store for authentication
export const useAuthStore = create((set) => ({
  isAuthenticated: false,
  isCheckingAuth: true,
  user: null,
  loading: false,

  // Function to check authentication
  checkAuth: async () => {
    set({ loading: true });
    try {
      const response = await axios.get('https://backendattendance-b2gi.onrender.com/api/auth/admin/me', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (response.data._id) {
        set({ isAuthenticated: true, user: response.data, isCheckingAuth: false });
      } else {
        set({ isAuthenticated: false, user: null, isCheckingAuth: false });
      }
    } catch (error) {
      console.error('❌ Authentication check failed:', error);
      set({ isAuthenticated: false, user: null, isCheckingAuth: false });
    } finally {
      set({ loading: false });
    }
  },

  // Function to log in
  // login: async (email, password) => {
  //   set({ loading: true });
  //   try {
  //     const response = await axios.post('http://localhost:5000/api/auth/admin/login', {
  //       email,
  //       password,
  //     });
  //     localStorage.setItem('token', response.data.token);
  //     set({ isAuthenticated: true, user: response.data.user, loading: false });
  //   } catch (error) {
  //     console.error('❌ Login failed:', error);
  //     set({ loading: false });
  //   }
  // },

  // Function to log out
  // logout: () => {
  //   localStorage.removeItem('token');
  //   set({ isAuthenticated: false, user: null });
  // },

  // Function to update user profile
  // updateUserProfile: async (updatedUserData) => {
  //   set({ loading: true });
  //   try {
  //     const response = await axios.put('http://localhost:5000/api/auth/admin/me', updatedUserData, {
  //       headers: {
  //         Authorization: `Bearer ${localStorage.getItem('token')}`,
  //       },
  //     });
  //     set({ user: response.data });
  //   } catch (error) {
  //     console.error('❌ Update profile failed:', error);
  //   } finally {
  //     set({ loading: false });
  //   }
  // },
}));
