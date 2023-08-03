import {configureStore, combineReducers, createListenerMiddleware} from '@reduxjs/toolkit';
import { lazyReducerEnhancer } from 'pwa-helpers/lazy-reducer-enhancer';
import {createLogger} from "redux-logger";

import {localServerApi} from "./services/local-server-api.js";
import {setupListeners} from "@reduxjs/toolkit/query";
import requestStatusReducer from "./services/request-status-slice.js";

const logger = createLogger({collapsed: true, duration: true});

export const listenerMiddleware = createListenerMiddleware();

export const store = configureStore({
    reducer: {
        [localServerApi.reducerPath]: localServerApi.reducer,
        'requestStatus': requestStatusReducer,
    },
    enhancers: [lazyReducerEnhancer(combineReducers)],
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({})
        .prepend(listenerMiddleware.middleware)
        .concat(localServerApi.middleware)
        .concat([logger])
});

setupListeners(store.dispatch);
