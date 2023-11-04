import { configureStore } from "@reduxjs/toolkit";
import invoiceListSlice from "./reducer/invoiceReducer";

const store = configureStore({
  reducer: {
    invoiceList: invoiceListSlice,
  },
});

export default store;