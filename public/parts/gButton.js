Vue.component("g-button", {
  template: /* tpl */ `<button v-bind="$attrs" v-on="$listeners" class="g-button">
    <slot></slot>
  </button>`,
  data() {
    return {
      conquest: {
        title: "Archi-méga-super-griffon",
        steps: [20, 30, 40, 50],
        value: 12,
      },
    };
  },
});
