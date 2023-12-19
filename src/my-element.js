import { html } from 'lit'
import litLogo from './assets/lit.svg'
import {myElementStyles} from "./styles/my-element-styles.js";
import {ConnectedComponent} from "./component.js";
import {colorApi,} from './services/color-slice.js';
import {ClockController} from "./controllers/clock-controller.js";
import {ColorsController} from "./controllers/colors-controller.js";

const actions = {
    getAllColors: colorApi.endpoints.getAllColors.initiate,
    addColor: colorApi.endpoints.addColor.initiate,
    updateColor: colorApi.endpoints.updateColor.initiate,
    deleteColor: colorApi.endpoints.deleteColor.initiate
};

const { endpoints: {getAllColors, addColor, updateColor, deleteColor } } = colorApi;

// let queryRef;

export class MyElement extends ConnectedComponent {
  clock = new ClockController(this, 900);
  colorsController = new ColorsController(this);

  static get styles(){
    return myElementStyles;
  }

  render() {
    return html`
        <div>
            <h1>My Element</h1>
            <p>Current time: ${timeFormat.format(this.clock.currentTime)}</p>
        </div>
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
            ${this.colorsController.value.map((c) => html`
                <div class="card">
                  <h2>${c.title} </h2>
                  <h3>valueMember: ${c.valueMember}</h3>
                  <div>
                    <input type="text" name="valueMember" value="${c.valueMember}"/>
                    <button @click=${(e) => this.handleUpdateClick(e,c)}>update</button>
                      <button @click=${(e) => this.colorsController.deleteColor(c)}>delete</button>
                  </div>
                </div>`)}
        </section>
        </p>
    `;
  }

  handleUpdateClick(e, item) {
      const val = e.target.parentNode.querySelector('input').value;
      this.colorsController.updateColor({...item, valueMember: val});
  }
}

window.customElements.define('my-element', MyElement)


const timeFormat = new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
});
