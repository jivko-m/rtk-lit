import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query";

export const pokemonApi = createApi({
    reducerPath: 'pokemonApi',
    baseQuery: fetchBaseQuery({baseUrl: 'https://pokeapi.co/api/v2/'}),
    endpoints: (builder) => ({
        getAllPokemon: builder.query({
            query: (limit = 10) => `pokemon?limit=${limit}`,
            transformResponse(response) {
                return response.results || [];
            }
        }),
        getPokemonById: builder.query({
            query: (id) => `pokemon/${id}`,
        }),
        getPokemonByName: builder.query({
            query: (name) => `pokemon/${name}`,
        }),
    }),
});

export const selectAllPokemon = (state) => pokemonApi.endpoints.getAllPokemon.select()(state).data || [];
