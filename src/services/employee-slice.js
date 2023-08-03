import {createEntityAdapter, createSelector} from "@reduxjs/toolkit";
import {localServerApi} from "./local-server-api.js";

const employeeAdapter = createEntityAdapter({
    selectId: (employee) => employee.employeeId
});

const initialState = employeeAdapter.getInitialState();

export const employeeApi = localServerApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllEmployees: builder.query({
            query: () => '',
            transformResponse(baseQueryReturnValue, meta, arg) {
                return employeeAdapter.setAll(initialState, baseQueryReturnValue)
            },
            providesTags: (result, error, args) => [
                { type: 'Employee', id: 'LIST' },
                ...result.ids.map((id) => ({ type: 'Employee', id}))
            ],
        }),
        addEmployee: builder.mutation({
            query: (employee) => ({
                url: '',
                method: 'POST',
                body: employee
            }),
            invalidatesTags: [{ type: 'Employee', id: 'LIST' }],
        }),
        updateEmployee: builder.mutation({
            query: (employee) => ({
                url: `/${employee.id}`,
                method: 'PUT',
                body: employee
            }),
            invalidatesTags: (result, error, arg) => [{ type: 'Employee', id: arg.employeeId }],
        }),
        deleteEmployee: builder.mutation({
            query: (employeeId) => ({
                url: `/${employeeId}`,
                method: 'DELETE'
            }),
            invalidatesTags: (result, error, arg) => [{ type: 'Employee', id: arg.employeeId }],
        })
    }),
    overrideExisting: false
});

// returns the query result object
export const selectEmployeeResult = employeeApi.endpoints.getAllEmployees.select()

// Creates memoized selector
export const selectEmployeeData = createSelector(
    selectEmployeeResult,
    employeeResult => employeeResult.data // normalized state object with ids & entities
)

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
    selectAll: selectAllEmployees,
    selectIds: selectEmployeeIds,
    // Pass in a selector that returns the posts slice of state
} = employeeAdapter.getSelectors(state => selectEmployeeData(state) ?? initialState)
