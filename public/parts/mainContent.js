Vue.component("main-content", {
  template: /* tpl */ `<div class="main-content">
    <h1 class="scratched-title"><span class="yellow-text">Mes conquêtes</span></h1>

    <div class="bars">
      <conquest-bar v-for="index in [0,1,2,3,4]" :key="index"
        :conquest="conquest"
        :active="active === index"
        @activate="() => active = index"
      ></conquest-bar>
    </div>
    
    <g-button>Ajouter une conquête</g-button>
</div>`,
  props: ["user"],
  data() {
    return {
      active: 0,
      conquest: {
        title: "Archi-méga-super-griffon",
        steps: [20, 30, 40, 50],
        value: 12,
      },
    };
  },
});
