import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type AuthModalMode = "login" | "register";

export type AuthUser = {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  isAnonymous: boolean;
};

type AuthState = {
  isModalOpen: boolean;
  modalMode: AuthModalMode;
  user: AuthUser | null;
  isAuthLoading: boolean;
};

const initialState: AuthState = {
  isModalOpen: false,
  modalMode: "login",
  user: null,
  isAuthLoading: true,
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

    setAuthUser(state, action: PayloadAction<AuthUser | null>) {
      state.user = action.payload;
      state.isAuthLoading = false;
    },
  },
});

export const {
  openLoginModal,
  openRegisterModal,
  closeAuthModal,
  showLogin,
  showRegister,
  setAuthUser,
} = authSlice.actions;

export default authSlice.reducer;