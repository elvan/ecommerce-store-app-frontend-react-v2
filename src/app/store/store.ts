import { configureStore, legacy_createStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import { errorApi } from '../../features/about/errorApi';
import { accountApi } from '../../features/account/accountApi';
import { basketApi } from '../../features/basket/basketApi';
import { catalogApi } from '../../features/catalog/catalogApi';
import { catalogSlice } from '../../features/catalog/catalogSlice';
import { checkoutApi } from '../../features/checkout/checkoutApi';
import counterReducer, { counterSlice } from '../../features/contact/counterReducer';
import { orderApi } from '../../features/orders/orderApi';
import { uiSlice } from '../layout/uiSlice';

export function configureTheStore() {
  return legacy_createStore(counterReducer);
}

export const store = configureStore({
  reducer: {
    [catalogApi.reducerPath]: catalogApi.reducer,
    [errorApi.reducerPath]: errorApi.reducer,
    [basketApi.reducerPath]: basketApi.reducer,
    [accountApi.reducerPath]: accountApi.reducer,
    [checkoutApi.reducerPath]: checkoutApi.reducer,
    [orderApi.reducerPath]: orderApi.reducer,
    counter: counterSlice.reducer,
    ui: uiSlice.reducer,
    catalog: catalogSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      catalogApi.middleware,
      errorApi.middleware,
      basketApi.middleware,
      accountApi.middleware,
      checkoutApi.middleware,
      orderApi.middleware
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
