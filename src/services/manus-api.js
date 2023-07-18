import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query";
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiI5YjYzYTczZC1lZWMwLTRkMWItODkzZS1hNDE4ZDVkMDNjZTAiLCJ1bmlxdWVfbmFtZSI6WyJocmlzdG8iLCJocmlzdG8iXSwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS9hY2Nlc3Njb250cm9sc2VydmljZS8yMDEwLzA3L2NsYWltcy9pZGVudGl0eXByb3ZpZGVyIjoiQVNQLk5FVCBJZGVudGl0eSIsIkFzcE5ldC5JZGVudGl0eS5TZWN1cml0eVN0YW1wIjoiQ0MxQzZBMDQtQjMzOS00QkRBLUFDNjMtNjA0NzEzNkJGQzc4IiwiQ3VsdHVyZSI6ImVuLVVTIiwiQ3VsdHVyZUlkIjoiMTAzMyIsIkRlcGFydG1lbnRJZCI6IiIsIkFnZW5jeUlkIjoiIiwiRW1wbG95ZWVJZCI6ImE2OGQ0NzJmLTMwYWEtNDY2ZC1iMDU1LWRhZTM2MWQyNWEwOSIsIkNvbnRyYWN0Tm9kZUlkIjoiYjI5Zjk4ODgtOGI3YS00NzUyLWI0MGMtZWIyMzFjOTg0ODk5IiwiSWdub3JlTG9nb2ZmUnVsZSI6IlRydWUiLCJJbXBlcnNvbmF0ZUlEIjoiMDAwMDAwMDAtMDAwMC0wMDAwLTAwMDAtMDAwMDAwMDAwMDAwIiwiSW1wZXJzb25hdGVVc2VyTmFtZSI6IiIsInJvbGUiOiIzIiwiTm9kZUlkIjoiOTRiNWFhYWMtMDExMi00YzhiLWE1ZDktNjFlOGQ2NWU4M2M2IiwiQXBwbGljYXRpb25UeXBlIjoiQ2xpZW50IiwibmJmIjoxNjg5NjgxODYxLCJleHAiOjE2ODk3NjgyNjEsImlhdCI6MTY4OTY4MTg2MSwiaXNzIjoiTWFudXNQbHVzIiwiYXVkIjoiQ2xpZW50In0.jMcFzjyUuqvQQX52Y9IU370fIa5SJ1XAlD1LnQbaa00';
export const manusApi = createApi({
    reducerPath: 'manusApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://pwa-dev.manus.plus:19998/api/',
        prepareHeaders: (headers) => {
            headers.set('accept', 'application/vnd.manusplus+json');
            headers.set('Content-Type', 'application/vnd.manusplus+json')
            headers.set('authorization', `Bearer ${token}`)

            return headers;
        }
    }),
    endpoints: (builder) => ({
        getAllEmployees: builder.query({
            query: (nodeId) => `node/${nodeId}/employee?includePhoto=true&future=true`
        })
    }),
});
