import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import MediaTypes from "../../models/mediaTypes";

const collectionApi = createApi({
    reducerPath: 'data',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://i9i1rkc7vg.execute-api.us-east-1.amazonaws.com/dev',
        credentials: 'same-origin'
    }),
    tagTypes: ['Collection'],
    endpoints(builder) {
        return {
            fetchCollection: builder.query({
                providesTags: ['Collection'],
                query: (includedMediaTypes) => {
                    var queryParamString = ""
                    var formattedQueryParams = includedMediaTypes.map( type => {
                        return `media_type=${type}`
                    })
                    queryParamString = `?${formattedQueryParams.join("&")}`
                    
                    return {
                        url: `/items${queryParamString}`,
                        method: 'GET'
                    }
                }
            }),
            searchForItem: builder.query({
                query: ({title, media_type}) => {
                    return {
                        url: `/search/${title}?media_type=${media_type}`,
                        method: 'GET'
                    }
                }
            }),
            putInCollection: builder.mutation({
                invalidatesTags: ['Collection'],
                query: ({data}) => {
                    return {
                        url: `/items`,
                        method: 'PUT',
                        body: data
                    }
                }
            }),
            removeFromCollection: builder.mutation({
                invalidatesTags: ['Collection'],
                query: ({key}) => {
                    return {
                        url: `/items/${key}`,
                        method: 'DELETE' 
                    }
                }
            }),
            editItemInCollection: builder.mutation({
                invalidatesTags: ['Collection'],
                query: ({guid, data}) => {
                    return {
                        url: `/items/${guid}`,
                        method: 'PUT',
                        body: data
                    }
                }
            })
        }
    }
});

export const { useFetchCollectionQuery, useSearchForItemQuery, usePutInCollectionMutation, useRemoveFromCollectionMutation, useEditItemInCollectionMutation } = collectionApi
export { collectionApi }