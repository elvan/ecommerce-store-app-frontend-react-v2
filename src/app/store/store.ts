import { configureStore, legacy_createStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import { errorApi } from '../../features/about/errorApi';
import { basketApi } from '../../features/basket/basketApi';
import { catalogApi } from '../../features/catalog/catalogApi';
import { catalogSlice } from '../../features/catalog/catalogSlice';
import counterReducer, { counterSlice } from '../../features/contact/counterReducer';
import { uiSlice } from '../layout/uiSlice';

export function configureTheStore() {
  return legacy_createStore(counterReducer);
}

export const store = configureStore({
  reducer: {
    [catalogApi.reducerPath]: catalogApi.reducer,
    [errorApi.reducerPath]: errorApi.reducer,
    [basketApi.reducerPath]: basketApi.reducer,
    counter: counterSlice.reducer,
    ui: uiSlice.reducer,
    catalog: catalogSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(catalogApi.middleware, errorApi.middleware, basketApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
