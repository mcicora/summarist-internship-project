import { createSlice } from "@reduxjs/toolkit";

type AuthModalMode = "login" | "register";

type AuthState = {
  isModalOpen: boolean;
  modalMode: AuthModalMode;
};

const initialState: AuthState = {
  isModalOpen: false,
  modalMode: "login",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    openLoginModal(state) {
      state.isModalOpen = true;
      state.modalMode = "login";
    },

    openRegisterModal(state) {
      state.isModalOpen = true;
      state.modalMode = "register";
    },

    closeAuthModal(state) {
      state.isModalOpen = false;
    },

    showLogin(state) {
      state.modalMode = "login";
    },

    showRegister(state) {
      state.modalMode = "register";
    },
  },
});

export const {
  openLoginModal,
  openRegisterModal,
  closeAuthModal,
  showLogin,
  showRegister,
} = authSlice.actions;

export default authSlice.reducer;
