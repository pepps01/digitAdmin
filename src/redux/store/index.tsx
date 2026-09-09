import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import uiSlice from "./ui-slice";

import authSlice from "./auth-slice";
import userSlice from "./features/user-slice";
import productSlice from "./features/product-slice";
import withdrawalSlice from "./features/withdrawal-slice";
import serviceSlice from "./features/service-slice";
import proposalSlice from "./features/proposal-slice";
import jobSlice from "./features/job-slice";
import productCategorySlice from "./features/product-category-slice";
import serviceCategorySlice from "./features/service-category-slice";
import orderSlice from "./features/order-slice";
import logSlice from "./features/log-slice";
import transactionSlice from "./features/transaction-slice";
import tripSlice from "./features/trip-slice";
import sosSlice from "./features/sos-slice";

export function makeStore() {
  return configureStore({
    reducer: {
      ui: uiSlice,
      auth: authSlice,
      user: userSlice,
      product: productSlice,
      order: orderSlice,
      service: serviceSlice,
      proposal: proposalSlice,
      withdrawal: withdrawalSlice,
      job: jobSlice,
      log: logSlice,
      transaction: transactionSlice,
      productCategory: productCategorySlice,
      serviceCategory: serviceCategorySlice,
      trip: tripSlice,
      sos: sosSlice,
    },
  });
}

const store = makeStore();

export type RootState = ReturnType<typeof store.getState>;

export type AppState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action<string>
>;
export default store;
