import { configureStore } from "@reduxjs/toolkit";
import authReducer from "@/app/features/auth/authSlice";
import readerReducer from "@/app/features/readerSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      auth: authReducer,
      reader: readerReducer,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];