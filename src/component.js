import {LitElement} from "lit";
import {connect} from "pwa-helpers";
import {store} from "./store.js";

export class ConnectedComponent extends connect(store)(LitElement) {
    dispatch(action) {
        store.dispatch(action);
    }
}
