import { configureStore } from "@reduxjs/toolkit";

export const getApi = configureStore({
  reducer: {
    data: "data",
  },
});
