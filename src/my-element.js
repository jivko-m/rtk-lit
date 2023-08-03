import { html } from 'lit'
import litLogo from './assets/lit.svg'
import {myElementStyles} from "./styles/my-element-styles.js";
import {ConnectedComponent} from "./component.js";
import {colorApi, selectColors} from './services/color-slice.js';

const actions = {
    getAllColors: colorApi.endpoints.getAllColors.initiate,
    addColor: colorApi.endpoints.addColor.initiate,
    updateColor: colorApi.endpoints.updateColor.initiate,
    deleteColor: colorApi.endpoints.deleteColor.initiate
};

let queryRef;

export class MyElement extends ConnectedComponent {

  connectedCallback() {
      super.connectedCallback();
      queryRef = this.dispatch(actions.getAllColors());
  }

  disconnectedCallback() {
    super.disconnectedCallback();

    if (queryRef)
        queryRef.unsubscribe();
  }

  static get styles(){
    return myElementStyles;
  }

  static get properties() {
    return {
      isLoading: { type: Boolean },
      colors: { type: Array }
    }
  }

  stateChanged(state) {
    this.colors = selectColors(state);
  }

  render() {
    return html`
        <div>
            <a href="https://vitejs.dev" target="_blank">
                <img src="/vite.svg" class="logo" alt="Vite logo"/>
            </a>
            <a href="https://lit.dev" target="_blank">
                <img src=${litLogo} class="logo lit" alt="Lit logo"/>
            </a>
        </div>
        <p class="read-the-docs">
        <section>
            ${this.colors.map((c) => html`
                <div class="card">
                  <h2>${c.title} </h2>
                  <h3>valueMember: ${c.valueMember}</h3>
                  <div>
                    <input type="text" name="valueMember" value="${c.valueMember}"/>
                    <button @click=${(e) => this.handleUpdateClick(e,c)}>update</button>
                  </div>
                </div>`)}
        </section>
        </p>
    `;
  }

  handleUpdateClick(e, item) {
    const val = e.target.parentNode.querySelector('input').value;
    const copiedItem = JSON.parse(JSON.stringify(item));

    copiedItem.valueMember = val;

    this.dispatch(actions.updateColor(copiedItem));
  }
}

window.customElements.define('my-element', MyElement)
