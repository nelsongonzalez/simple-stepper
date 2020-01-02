import { LitElement, html, css } from 'lit-element';
import '@material/mwc-button';
import '@material/mwc-icon';

export class SimpleStep extends LitElement {
    static get styles() {
        return [
            css`
                :host {
                    padding: 0 16px 0 16px;
                    display: grid;
                    height: 100%;
                    grid-template-columns: auto 1fr;
                    grid-template-rows: auto auto auto;
                    grid-gap: 16px 12px;
                    grid-template-areas: "step-number step-name" "connector-line content" "connector-line buttons";
                }
                :host([active]) .buttons {
                    display: flex;
                    height: 48px;
                    align-items: center;
                    justify-content: flex-start;
                    margin-bottom: 40px;
                }
                :host([active]) .content {
                    display: block;
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
                    margin: 8px 0;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    grid-area: step-number;
                }
                :host([active]) .step-number, :host([save]) .step-number {
                    background-color: var(--stepper-theme-primary, #2196F3);
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
                    font-family: Novecento, sans-serif;
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
                }
                .connector-line::before {
                    display: block;
                    margin-top: -16px;
                    content: '';
                    position: absolute;
                    top: 0;
                    bottom: 0;
                    width: 1px;
                    background-color: #ccc;
                }
                :host([laststep]) .connector-line::before {
                    display: none;
                }
                .content {
                    grid-area: content;
                    display: none; 
                }
                mwc-icon {
                    --mdc-icon-size: 16px;
                }
                .buttons { 
                    grid-area: buttons; 
                    display: none;
                }
                mwc-button {
                    margin-right: 8px;
                }
                .continue-btn, .update-btn, .finish-btn {
                    --mdc-theme-primary: var(--stepper-theme-primary, #2196F3);
                    --mdc-theme-on-primary: var(--submit-button-color, #FFFFFF);
                }
                .reset-btn {
                    --mdc-theme-primary: var(--reset-button-color, rgba(0, 0, 0, .87));
                }
                .back-btn {
                    --mdc-theme-primary: var(--back-button-color, rgba(0, 0, 0, .87));
                }
                .skip-btn {
                    --mdc-theme-primary: var(--skip-button-color, rgba(0, 0, 0, .87));
                }
                [hidden], .buttons[hidden] {
                    display: none !important;
                }
                :host([_horizontal]) .connector-line,
                :host([_horizontal]) .step-name,
                :host([_horizontal]) .step-number {
                    display: none !important;
                }
                :host([_horizontal]) {
                    padding: 16px;
                    grid-template-areas: "content" "buttons";
                    grid-template-columns: 1fr;
                    grid-template-rows: auto auto;
                }
                :host([_horizontal]):host(:not([active])) {
                    display: none;
                }
                :host([laststep]):host(:not([active])) {
                    grid-gap: 0 12px;
                }
                :host([_horizontal]) .buttons {
                    margin-bottom: 0;
                }
                /* Wide layout */
                @media (min-width: 768px) {
                    :host {
                        padding: 0 24px 0 24px;
                    }
                }
            `
        ]
    }

    render() {
        return html `
            <span @click="${_ => this._fireEvent('select')}" class="step-number">
                <span ?hidden="${this.locked || (this.save && this.editable) || this.save}">${this._stepIndex + 1}</span>
                <mwc-icon ?hidden="${this._computeIsIconHidden(this.locked, this.save, this.editable)}" class="step-icon">${this._getIcon(this.editable, this.save, this.locked)}</mwc-icon>
            </span>
            <div @click="${_ => this._fireEvent('select')}" class="step-name">
                <div class="label">${this.label ? this.label : `Step ${  this._stepIndex + 1}`}</div>
                <div class="optional-label">${this.subtitle ? this.subtitle : ''}${this.optional ? ' (Optional)' : ''}</div>
            </div>
            <div class="connector-line"></div>
            <div class="content">
                <slot></slot>
            </div>
            <div ?hidden="${this.hideButtons}" class="buttons">
                <mwc-button ?hidden="${!this.save || !this.editable}" @click="${() => this._fireEvent('update')}" class="update-btn" unelevated>${this.updateButtonText ? this.updateButtonText : 'update'}</mwc-button>
                <mwc-button ?hidden="${this.laststep || this.save}" @click="${() => this._fireEvent('continue')}" class="continue-btn" unelevated>${this.continueButtonText ? this.continueButtonText : 'continue'}</mwc-button>
                <mwc-button ?hidden="${!this.optional || this.save}" @click="${() => this._fireEvent('skip')}" class="skip-btn">${this.skipButtonText ? this.skipButtonText : 'skip'}</mwc-button>
                <mwc-button ?hidden="${!this.laststep}"  @click="${() => this._fireEvent('finish')}" class="finish-btn" unelevated>${this.finishButtonText ? this.finishButtonText : 'finish'}</mwc-button>
                <mwc-button ?hidden="${this.hideResetButton}" @click="${_ => this._fireEvent('reset')}" class="reset-btn">${this.resetButtonText ? this.resetButtonText : 'reset'}</mwc-button>
                <mwc-button ?hidden="${this.nonLinear || this._stepIndex === 0 }"  @click="${() => this._fireEvent('back')}" class="back-btn">${this.backButtonText ? this.backButtonText : 'back'}</mwc-button>
            </div>
        `;
    }
    static get properties() {
        return {
            continueButtonText: { type: String },
            resetButtonText: { type: String },
            updateButtonText: { type: String },
            backButtonText: { type: String },
            finishButtonText: { type: String }, 
            hideResetButton: { type: Boolean },
            laststep: { type: Boolean, reflect: true },
            /**
             * String: label for step
             */
            label: { type: String },
            /**
             * String: subtitle for step
             */
            subtitle: { type: String },
            /**
             * Boolean: indicating if the step is currently active
             */
            active: { type: Boolean, reflect: true },
            /**
             * Boolean: indicating if the step is editable.
             */
            editable: { type: Boolean },
            /**
             * Boolean: indicating if the step is locked.
             */
            locked: { type: Boolean },
            /**
             * Boolean: indicating if the step is optional.
             */
            optional: { type: Boolean, reflect: true },
            /**
             * Boolean: indicating if the step is saved.
             */
            save: {
                type: Boolean,
                reflect: true
            },
            /**
             * Boolean: indicating if the step should hide buttons.
             */
            hideButtons: {
                type: Boolean,
                reflect: true
            },
            /**
             * Boolean: indicating if the step is invalid.
             * */
            invalid: { type: Boolean },
            // ////////////// Private properties ////////////////
            /**
             * Number: stores own index in _steps array
             * */
            _stepIndex: { type: Number },
            _horizontal: { type: Boolean, reflect: true }
        }
    }
    constructor() {
        super()
        this._horizontal = this.parentElement.horizontal
    }
    firstUpdated() {
        this.parentElement._registerStep(this)
    }
    updated(changedProps) {
        const activeChanged = changedProps.has('active')
        
        if (activeChanged && this.active) {
            this.parentElement._activeStepIndex = this._stepIndex
        }
    }
    /**
     * Function: fire step-invalid event
     * */
    fireInvalidStep() {
        this.dispatchEvent(new CustomEvent('step-invalid', {
            bubbles: true,
            composed: true
        }));
    }
    /**
     * Function: fire clicked event for button
     */
    _fireEvent(eventName) {
        let payload = {
            bubbles: true,
            composed: true
        }
        if (eventName === 'select') payload.detail = {index: this._stepIndex}
        this.dispatchEvent(new CustomEvent(`${eventName}-clicked`, payload));
    }
    /**
     * Function: makes self active step
     */
    _setActive() {
        this.parentElement.closeAll();
        this.active = true;
    }
    /**
     * Function: checks if can be set to active, if passes call _setActive()
     * */
    _setValidActive() {
        // if already active, locked or saved but not editable quit
        if (this.active || this.locked || (this.save && !this.editable))
            return;
        // if parent is linear and step is ahead of active step or parent is finished quit
        if ((!this.parentElement.nonLinear && this._stepIndex > this.parentElement._activeStepIndex && !this.save) || this.parentElement.finish)
            return;
        this._setActive();
    }
    /**
     * Return: icon name
     */
    _getIcon(editable, save, locked) {
        if (locked) return 'lock'
        return editable ? 'edit' : 'check';
    }
    _computeIsIconHidden(locked, save, editable) {
        const b = (locked || (save && editable) || save)
        console.log('computing is icon hidden:', b)
        return !b;
    }
}