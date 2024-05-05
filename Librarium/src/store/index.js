import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query/react'
import { collectionApi } from './apis/collectionApi';
import { dataFilterReducer, changeMediaType } from './slices/dataFilterSlice';

export const store = configureStore({
    reducer: {
        dataFilter: dataFilterReducer,
        [collectionApi.reducerPath]: collectionApi.reducer
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware()
            .concat(collectionApi.middleware)
    }
});

setupListeners(store.dispatch);

export { changeMediaType }
export { useFetchCollectionQuery, usePutInCollectionMutation, useRemoveFromCollectionMutation } from './apis/collectionApi'