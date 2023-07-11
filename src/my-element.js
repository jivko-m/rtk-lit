import { html } from 'lit'
import litLogo from './assets/lit.svg'
import {myElementStyles} from "./styles/my-element-styles.js";
import {ConnectedComponent} from "./component.js";
import {updateCount} from "./features/my-element-red.js";
import {selectAllPokemon} from "./services/pokemon-api.js";

export class MyElement extends ConnectedComponent {
  static get styles(){
    return myElementStyles;
  }

  static get properties() {
    return {
      docsHint: { type: String },
      count: { type: Number },
      pokemons: { type: Array }
    }
  }

  stateChanged(state) {
    this.docsHint = state.myElement.docsHint;
    this.count = state.myElement.count;

    this.pokemons = selectAllPokemon(state);
  }

  render() {
    return html`
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" class="logo" alt="Vite logo" />
        </a>
        <a href="https://lit.dev" target="_blank">
          <img src=${litLogo} class="logo lit" alt="Lit logo" />
        </a>
      </div>
      <slot></slot>
      <div class="card">
        <button @click=${this._onClick} part="button">
          count is ${this.count}
        </button>
      </div>
      <p class="read-the-docs">${this.docsHint}</p>
      <p class="read-the-docs">
        <ul>
          ${this.pokemons.map(pokemon => html`<li>${pokemon.name}</li>`)}
        </ul>
      </p>
    `
  }

  _onClick() {
    this.dispatch(updateCount(this.count + 1));
  }
}

window.customElements.define('my-element', MyElement)
