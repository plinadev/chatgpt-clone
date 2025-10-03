import { configureStore } from "@reduxjs/toolkit";
import dashboardReducer from "./components/dashboard/dashboardSlice";

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const store = configureStore({
  reducer: {
    dashboard: dashboardReducer,
  },
});
