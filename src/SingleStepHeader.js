import { LitElement, html, css } from 'lit-element';
import "@material/mwc-icon";
const check = html `<svg height="16" viewBox="0 0 24 24" width="16"><path d="M0 0h24v24H0z" fill="none"/><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>`;
const edit = html `<svg height="16" viewBox="0 0 24 24" width="16"><path d="M0 0h24v24H0z" fill="none"/><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/><path d="M0 0h24v24H0z" fill="none"/></svg>`;

class SingleStepHeader extends LitElement {
    static get styles() {
        return css`
            :host {
                background-color: #FAFAFA;
                display: grid;
                height: 100%;
                grid-template-columns: auto 1fr;
                grid-template-rows: auto;
                grid-gap: 16px 12px;
                grid-template-areas: "step-number step-name";
            }
            .step-number, .step-name {
                cursor: pointer;
            }
            .step-number {
                border-radius: 50%;
                height: 24px;
                width: 24px;
                font-size: 12px;
                background-color: rgba(0, 0, 0, .38);
                color: #FFFFFF;
                margin: 24px 0;
                display: flex;
                align-items: center;
                justify-content: center;
                grid-area: step-number;
            }
            :host([active]) .step-number, :host([save]) .step-number {
                background-color: var(--step-circle-background-color, #2196F3);
            }
            .step-icon {
                grid-area: step-number;
                display: flex;
                align-items: center;
                justify-content: center;
                fill: white;
            }
            .step-name {
                display: flex;
                flex-direction: column;
                align-items: flex-start;
                justify-content: center;
                grid-area: step-name;
            }
            .label {
                font-size: 14px;
                font-weight: 400;
                color: rgba(0, 0, 0, .38);
            }
            :host([active]) .label, :host([save]) .label {
                font-weight: 700;
                color: rgba(0, 0, 0, .87);
            }
            .optional-label {
                display: none;
                color: rgba(0, 0, 0, .38);
                font-size: 12px;
                font-weight: 400;
            }
            :host([optional]) .optional-label, :host([subtitle]) .optional-label {
                display: block;
            }
            .connector-line { 
                grid-area: connector-line;
                display: flex;
                justify-content: center;
                position: relative;
                align-items: center;
            }
            .connector-line::before {
                display: block;
                content: '';
                position: absolute;
                left: 0;
                right: 0;
                height: 1px;
                background-color: #ccc;
            }
            :host([laststep]) .connector-line {
                display: none;
            }
            :host([laststep]) {
                grid-template-columns: auto 1fr;
                grid-template-areas: "step-number step-name";
            }
            [hidden] {
                display: none !important;
            }
        `;
    }
    static get properties() {
        return {
            active: { type: Boolean, reflect: true },
            locked: { type: Boolean },
            save: { type: Boolean, reflect: true },
            editable: { type: Boolean },
            optional: { type: Boolean, reflect: true },
            lastStep: { type: Boolean, reflect: true },
            idx: { type: Number },
            label: { type: String },
            subtitle: { type: String, reflect: true }
        }
    }
    render() {
        return html`
            <span class="step-number">
                <span ?hidden="${this.locked || (this.save && this.editable) || this.save}">${this.idx + 1}</span>
                <mwc-icon ?hidden="${this._computeIsIconHidden(this.locked, this.save, this.editable)}" class="step-icon">${this._getIcon(this.editable, this.save, this.locked)}</mwc-icon>
            </span>
            
            <div class="step-name">
                <div class="label">${this.label ? this.label : 'Step ' + (this.idx + 1)}</div>
                <div class="optional-label">${this.subtitle ? this.subtitle : ''}${this.optional ? 'Opcional' : ''}</div>
            </div>
        `;
    }
    /**
     * Return: icon name
     */
    _getIcon(editable, save, locked) {
        if (locked) return
        return editable ? edit : check;
    }
    _computeIsIconHidden(locked, save, editable) {
        let b = (locked || (save && editable) || save)
        console.log('computing is icon hidden:', b)
        return !b;
    }
}
window.customElements.define('single-step-header', SingleStepHeader);