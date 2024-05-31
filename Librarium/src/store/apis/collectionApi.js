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
                providesTags: (result, error, includedMediaTypes) => {
                    return Object.keys(MediaTypes).filter( type => {
                        includedMediaTypes.includes(type)
                    }).map(type => {
                        return {type:'Collection', id: type}
                    })
                },
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
                invalidatesTags: (result, error, {data}) => {
                    return [{type: 'Collection', id: data.media_type}]
                },
                query: ({data}) => {
                    return {
                        url: `/items`,
                        method: 'PUT',
                        body: data
                    }
                }
            }),
            removeFromCollection: builder.mutation({
                invalidatesTags: (result, error, {media_type}) => {
                    return [{type: 'Collection', id: media_type}]
                },
                query: ({key}) => {
                    return {
                        url: `/items/${key}`,
                        method: 'DELETE' 
                    }
                }
            })
        }
    }
});

export const { useFetchCollectionQuery, useSearchForItemQuery, usePutInCollectionMutation, useRemoveFromCollectionMutation } = collectionApi
export { collectionApi }