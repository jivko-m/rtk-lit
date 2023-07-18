import {configureStore, combineReducers, createListenerMiddleware} from '@reduxjs/toolkit';
import { lazyReducerEnhancer } from 'pwa-helpers/lazy-reducer-enhancer';
import {createLogger} from "redux-logger";

import {manusApi} from "./services/manus-api.js";
import {setupListeners} from "@reduxjs/toolkit/query";

const logger = createLogger({collapsed: true, duration: true});
export const listenerMiddleware = createListenerMiddleware();

export const store = configureStore({
    reducer: {
        [manusApi.reducerPath]: manusApi.reducer
    },
    enhancers: [lazyReducerEnhancer(combineReducers)],
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({})
        .prepend(listenerMiddleware.middleware)
        .concat(manusApi.middleware)
        .concat([logger])
});

setupListeners(store.dispatch);
