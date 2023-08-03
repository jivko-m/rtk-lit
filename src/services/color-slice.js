import {createSelector} from "@reduxjs/toolkit";
import {localServerApi} from "./local-server-api.js";

export const colorApi = localServerApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllColors: builder.query({
            query: () => '',
            transformResponse(baseQueryReturnValue, meta, arg) {
                return baseQueryReturnValue;
            },
            providesTags: (result, error, args) => [
                { type: 'Color', id: 'LIST' },
               ...result.map((id) => ({ type: 'Color', id}))
            ],
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
            invalidatesTags: [{ type: 'Color', id: 'LIST' }],
        }),
        updateColor: builder.mutation({
            query: (color) => ({
                url: `/${color.id}`,
                method: 'PUT',
                body: color
            }),
            invalidatesTags: (result, error, arg) => [{ type: 'Color', id: arg.id }],
        }),
        deleteColor: builder.mutation({
            query: (colorId) => ({
                url: `/${colorId}`,
                method: 'DELETE'
            }),
            invalidatesTags: (result, error, arg) => [{ type: 'Color', id: arg.id }],
        })
    })
});

// returns the query result object
export const selectColorResult = colorApi.endpoints.getAllColors.select()

// Creates memoized selector
export const selectColors = createSelector(
    [(state) => selectColorResult(state)],
    colorResult => colorResult.data || []
)
