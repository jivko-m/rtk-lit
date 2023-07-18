import { html } from 'lit'
import litLogo from './assets/lit.svg'
import {myElementStyles} from "./styles/my-element-styles.js";
import {ConnectedComponent} from "./component.js";
import {manusApi} from "./services/manus-api.js";

const nodeId = 'e06bfb2c-76e3-44f0-a1ad-c9ef9f360c40';

const { endpoints } = manusApi;
const selectAllEmployees = endpoints.getAllEmployees.select(nodeId);
let queryRef;

export class MyElement extends ConnectedComponent {

  connectedCallback() {
      super.connectedCallback();

      queryRef = this.dispatch(endpoints.getAllEmployees.initiate(nodeId));
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
      employees: { type: Array }
    }
  }

  stateChanged(state) {
    const { data, isLoading } = selectAllEmployees(state);

    this.employees = data;
    this.isLoading = isLoading;
  }

  render() {
    return this.isLoading ? html`
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" class="logo" alt="Vite logo" />
        </a>
        <a href="https://lit.dev" target="_blank">
          <img src=${litLogo} class="logo lit" alt="Lit logo" />
        </a>
      </div>`
        : html`
      <p class="read-the-docs">
        <ul>
          ${this.employees.map(e => html`<li>${e.firstName} ${e.lastName}</li>`)}
        </ul>
      </p>
    `;
  }
}

window.customElements.define('my-element', MyElement)
