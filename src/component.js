import {LitElement} from "lit";
import {connect} from "pwa-helpers";
import {store} from "./store.js";
import {pokemonApi} from "./services/pokemon-api.js";

var unsubscriber = undefined;
export class ConnectedComponent extends connect(store)(LitElement) {

    connectedCallback() {
        super.connectedCallback();
        unsubscriber = this.dispatch(pokemonApi.endpoints.getAllPokemon.initiate())
    }

    disconnectedCallback() {
        super.disconnectedCallback();

        if (unsubscriber) {
            unsubscriber.unsubscribe();
        }
    }

    dispatch(action) {
        store.dispatch(action);
    }
}
