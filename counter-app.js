/**
 * Copyright 2025 baabaalyb
 * @license Apache-2.0, see LICENSE for full text.
 */
import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import { I18NMixin } from "@haxtheweb/i18n-manager/lib/I18NMixin.js";

/**
 * `counter-app`
 * 
 * @demo index.html
 * @element counter-app
 */
export class CounterApp extends DDDSuper(I18NMixin(LitElement)) {
  static get tag() {
    return "counter-app";
  }

  constructor() {
    super();
    this.count = 0;
    this.min = 0;
    this.max = 10;
  }

  static get properties() {
    return {
      ...super.properties,
      count: { type: Number, reflect: true },
      min: { type: Number, reflect: true },
      max: { type: Number, reflect: true },
    };
  }

  static get styles() {
    return [
      super.styles,
      css`
        :host {
          display: block;
          color: var(--ddd-theme-primary);
          background-color: var(--ddd-theme-accent);
          font-family: var(--ddd-font-navigation);
          padding: var(--ddd-spacing-2);
          border: var(--ddd-border-md);
          border-radius: var(--ddd-radius-lg);
        }

        .wrapper {
          display: flex;
          flex-direction: column;
          align-items: center; /* Center horizontally */
          padding: var(--ddd-spacing-4);
        }

        .counter {
          font-size: var(--counter-app-label-font-size, var(--ddd-font-size-xxl));
          margin-bottom: var(--ddd-spacing-2);
          color: var(--ddd-theme-primary); /* Default color */
        }

        .buttons {
          display: flex;
          gap: var(--ddd-spacing-1); /* Spacing between buttons */
        }

        button {
          padding: var(--ddd-spacing-2);
          cursor: pointer;
          font-size: var(--ddd-font-size-m);
          background-color: var(--ddd-theme-default-skyLight);
          border: none; /* Remove default border */
          border-radius: var(--ddd-radius-sm); /* Rounded corners */
        }

        button:hover {
          background-color: var(--ddd-theme-default-creekTeal);
        }

        button:focus {
          background-color: var(--ddd-theme-default-keystoneYellow);
        }

        button:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        :host([count="18"]) .counter {
          color: var(--ddd-theme-default-athertonViolet);
        }

        :host([count="21"]) .counter {
          color: var(--ddd-theme-default-athertonViolet);
        }

        :host([count] = "${this.min}") .counter,
        :host([count] = "${this.max}") .counter {
          color: var(--ddd-theme-default-athertonViolet);
        }
      `,
    ];
  }

  render() {
    return html`
      <confetti-container id="confetti" class="wrapper">
        <div class="counter">${this.count}</div>
        <div class="buttons">
          <button @click="${this.decrease}" ?disabled="${this.count <= this.min}">-</button>
          <button @click="${this.increase}" ?disabled="${this.count >= this.max}">+</button>
        </div>
      </confetti-container>
    `;
  }

  increase() {
    if (this.count < this.max) {
      this.count++;
    }
  }

  decrease() {
    if (this.count > this.min) {
      this.count--;
    }
  }

  updated(changedProperties) {
    super.updated(changedProperties);
    if (changedProperties.has('count')) {
      if (this.count === 21) {
        this.makeItRain();
      }
    }
  }

  makeItRain() {
    import("@haxtheweb/multiple-choice/lib/confetti-container.js").then((module) => {
      setTimeout(() => {
        this.shadowRoot.querySelector("#confetti").setAttribute("popped", "");
      }, 0);
    });
  }

  static get haxProperties() {
    return new URL(`./lib/${this.tag}.haxProperties.json`, import.meta.url).href;
  }
}

globalThis.customElements.define(CounterApp.tag, CounterApp);
