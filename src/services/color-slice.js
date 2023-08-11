import {createSelector} from "@reduxjs/toolkit";
import {localServerApi} from "./local-server-api.js";

export const colorApi = localServerApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllColors: builder.query({
            query: () => '',
            transformResponse(baseQueryReturnValue, meta, arg) {
                return baseQueryReturnValue;
            },
            providesTags: (result) => {
                const tags = result
                    ? [
                        ...result.map(({ id }) => ({ type: 'Color', id })),
                        { type: 'Color', id: 'LIST' },
                    ]
                    : [{ type: 'Color', id: 'LIST' }];

                return tags;
            },
        }),
        addColor: builder.mutation({
            query: (color) => ({
                url: '',
                method: 'POST',
                body: color
            }),
            transformResponse(baseQueryReturnValue, meta, arg) {
                return baseQueryReturnValue;
            },
            invalidatesTags: () => [{ type: 'Color', id: 'LIST' }],
        }),
        updateColor: builder.mutation({
            query(color){
                return {
                    url: `/${color.id}`,
                    method: 'PUT',
                    body: color
                }
            },
            invalidatesTags: (result) => [{type: 'Color', id: result.id}]
        }),
        deleteColor: builder.mutation({
            query: (color) => ({
                url: `/${color.id}`,
                method: 'DELETE'
            }),
            invalidatesTags: (result) => [{ type: 'Color', id: result.id }],
        })
    })
});


// Creates memoized selector
export const selectColors = createSelector(
    [colorApi.endpoints.getAllColors.select()],
    colorResult => colorResult.data || []
)
