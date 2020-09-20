import { LitElement, html, css } from 'lit-element';

export class StepperButton extends LitElement {
  static get styles() {
    return [
      css`
        :host {
          display: flex;
        }

        button {
          font-family: inherit;
          vertical-align: middle;
          border: none;
          text-transform: uppercase;
          font-size: var(--button-font-size, 0.875rem);
          letter-spacing: 1px;
          font-weight: var(--button-font-weight, 600);
          padding: var(--button-padding, 0 16px);
          border-radius: var(--button-border-radius, 4px);

          min-height: var(--button-height, 36px);
          height: var(--button-height, 36px);
          width: 100%;
          white-space: nowrap;

          display: flex;
          align-items: center;
          justify-content: center;
        }

        :host(:not([disabled])) button:hover {
          cursor: pointer;
        }

        :host([raised]) button {
          color: var(--mdc-theme-on-primary, #181818);
          background-color: var(--mdc-theme-primary);
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
        }

        :host([unelevated]) button {
          color: var(--mdc-theme-on-primary, #181818);
          background-color: var(--mdc-theme-primary);
        }

        :host([disabled]) button {
          color: var(--mdc-theme-disabled, rgba(0, 0, 0, 0.38)) !important;
          border-color: var(--mdc-theme-disabled, rgba(0, 0, 0, 0.38)) !important;
        }

        button:active {
          -webkit-tap-highlight-color: rgba(45, 45, 52, 0.6);
        }

        button:focus {
          outline-color: white;
        }

        :host([outlined]) button {
          background: transparent;
          border: 2px solid var(--mdc-theme-primary, #f5f5f5);
          color: var(--mdc-theme-primary, #f5f5f5);
        }

        :host([dense]) button {
          min-height: 32px;
          height: 32px;
          padding: 0 8px;
          font-size: 0.8125rem;
        }
      `,
    ];
  }

  static get properties() {
    return {
      outlined: {
        type: Boolean,
      },
      dense: {
        type: Boolean,
      },
      unelevated: {
        type: Boolean,
      },
      label: { type: String },
      disabled: { type: Boolean, reflect: true },
    };
  }

  render() {
    return html`
      <button ?disabled="${this.disabled}">
        ${this.label
          ? html`
              <div>${this.label}</div>
            `
          : html`
              <slot name="prefix"></slot>
              <slot></slot>
            `}
      </button>
    `;
  }
}
