Vue.component("g-button", {
  template: /* tpl */ `<button class="g-button">
    <slot></slot>
  </button>`,
  props: ["user"],
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
