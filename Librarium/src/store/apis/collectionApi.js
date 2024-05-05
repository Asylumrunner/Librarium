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
                providesTags: (result, error, excludedMediaTypes) => {
                    return MediaTypes.filter( type => {
                        !excludedMediaTypes.includes(type)
                    }).map(type => {
                        return {type:'Collection', id: type}
                    })
                },
                query: (excludedMediaTypes) => {
                    var queryParamString = ""
                    if (excludedMediaTypes.length > 0) {
                        var formattedQueryParams = excludedMediaTypes.map( type => {
                            return `exclude=${type}`
                        })
                        queryParamString = `?${formattedQueryParams.join("&")}`
                    }
                    return {
                        url: `/everything${queryParamString}`,
                        method: 'GET'
                    }
                }
            }),
            fetchMedia: builder.query({
                providesTags: (result, error, media_type) => {
                    return [{type: 'Collection', id: media_type}]
                },
                query: (media_type) => {
                    return {
                        url: `/${media_type}`,
                        method: 'GET'
                    }
                }
            }),
            putInCollection: builder.mutation({
                invalidatesTags: (result, error, {media_type}) => {
                    return [{type: 'Collection', id: media_type}]
                },
                query: ({media_type, key}) => {
                    return {
                        url: `${media_type}/${key}`,
                        method: 'PUT'
                    }
                }
            }),
            removeFromCollection: builder.mutation({
                invalidatesTags: (result, error, {media_type}) => {
                    return [{type: 'Collection', id: media_type}]
                },
                query: ({media_type, key}) => {
                    return {
                        url: `${media_type}/${key}`,
                        method: 'DELETE' 
                    }
                }
            })
        }
    }
});

export const { useFetchCollectionQuery, usePutInCollectionMutation, useRemoveFromCollectionMutation } = collectionApi
export { collectionApi }