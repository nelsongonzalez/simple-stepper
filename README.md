# \<simple-stepper>

> This component is a WIP. Please read the [disclaimer](#Disclaimer) for more context.

Stepper component that (mostly) adheres to Material Design. Built with [lit-element](https://lit-element.polymer-project.org/) and [open-wc](https://github.com/open-wc/open-wc). Built on top off the amazing [l2t-paper-stepper](https://github.com/Link2Twenty/l2t-paper-stepper).

## Installation
```bash
npm i @kr05/simple-stepper
```

## Usage
```html
<script type="module">
  import 'simple-stepper/simple-stepper.js';
  import 'simple-stepper/simple-step.js';
</script>

<simple-stepper>
  <simple-step label="First step" subtitle="Edit me!" editable></simple-step>
  <simple-step label="Second step" subtitle="Please don't skip me." optional></simple-step>
  <simple-step label="Third step" subtitle="I am locked, try opening me." locked></simple-step>
  <simple-step label="Last step" lastStep></simple-step>
</simple-stepper>
```

## Roadmap
There are various milestones I would like to achieve with this component. Currently, these are:
[ ] Replace mwc-button and mwc-icon with with simple components.
[ ] Expose as much css as possible.
[ ] Align implementation as much as possible with the [Gold Standard](https://github.com/webcomponents/gold-standard/wiki) document.

## Disclaimer
This is very much a work in progress, so take precautions if you plan on using ```<simple-stepper>``` in production. That being said, I depend on this component for my business needs, which means that I will continue to update and support this package for the foreseeable future. If you find that it's not working as expected or wish to see some feature added, please submit an issue and I will get right on it.