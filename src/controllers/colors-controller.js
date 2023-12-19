import {colorApi, selectColors} from "../services/color-slice.js";
import {store} from "../store.js";

const { endpoints: {getAllColors, addColor, updateColor, deleteColor } } = colorApi;

export class ColorsController{
    host;

    value = [];
    queryRef = undefined;
    _storeUnsubscribe = undefined;

    constructor(host){
        (this.host = host).addController(this);
    }

    hostConnected(){
        this._storeUnsubscribe = store.subscribe(() => this.stateChanged(store.getState()));
        this.stateChanged(store.getState());

        this.queryRef = this.host.dispatch(getAllColors.initiate());
    }

    hostDisconnected(){
        this._storeUnsubscribe?.();
        this.queryRef?.unsubscribe();
    }

    stateChanged(state){
        this.value = selectColors(state);
    }

    deleteColor(color){
        store.dispatch(deleteColor.initiate(color));
    }

    updateColor(color){
        store.dispatch(updateColor.initiate(color));
    }
}
