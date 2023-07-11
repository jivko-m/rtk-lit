import {configureStore, combineReducers, createListenerMiddleware} from '@reduxjs/toolkit';
import { lazyReducerEnhancer } from 'pwa-helpers/lazy-reducer-enhancer';
import {createLogger} from "redux-logger";

import myElementReducer from './features/my-element-red';
import {pokemonApi} from "./services/pokemon-api.js";
import {setupListeners} from "@reduxjs/toolkit/query";

const logger = createLogger({collapsed: true, duration: true});
export const listenerMiddleware = createListenerMiddleware();

export const store = configureStore({
    reducer: {
        myElement: myElementReducer,
        [pokemonApi.reducerPath]: pokemonApi.reducer
    },
    enhancers: [lazyReducerEnhancer(combineReducers)],
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({})
        .prepend(listenerMiddleware.middleware)
        .concat(pokemonApi.middleware)
        .concat([logger])
});

setupListeners(store.dispatch);
