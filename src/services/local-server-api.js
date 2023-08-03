import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query";

export const localServerApi = createApi({
    reducerPath: 'localServerApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3000/colors',
        prepareHeaders: (headers) => {
            headers.set('accept', 'application/json');
            headers.set('Content-Type', 'application/json')
            return headers;
        }
    }),
    tagTypes:['Employee', 'Color'],
    endpoints: builder => ({})
});
