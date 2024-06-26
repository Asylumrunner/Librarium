import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query/react'
import { collectionApi } from './apis/collectionApi';
import { dataFilterReducer, changeMediaType, setSearchTerm, setSortMode } from './slices/dataFilterSlice';
import { currentItemReducer, setCurrentItem, removeCurrentItem } from './slices/currentItemSlice';

export const store = configureStore({
    reducer: {
        dataFilter: dataFilterReducer,
        currentItem: currentItemReducer,
        [collectionApi.reducerPath]: collectionApi.reducer
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware()
            .concat(collectionApi.middleware)
    }
});

setupListeners(store.dispatch);

export { changeMediaType, setSearchTerm, setSortMode, setCurrentItem, removeCurrentItem }
export { useFetchCollectionQuery, useSearchForItemQuery, usePutInCollectionMutation, useRemoveFromCollectionMutation, useEditItemInCollectionMutation } from './apis/collectionApi'