Vue.component("main-content", {
  template: /* tpl */ `<div class="l-tabs">
  <div class="l-tabs__content">
    <div class="l-raf is-active">
      <div class="l-raf__borders">
        <h2><span>Mes conquêtes</span></h2>

        <div class="l-faction-bars">
          <div class="l-faction-bars__content">
            <progress-bar :steps="[12,24,32]" :current="0"></progress-bar>
            <progress-bar :steps="[12,24,32]" :current="6"></progress-bar>
            <progress-bar :steps="[12,24,32]" :current="16"></progress-bar>
            <progress-bar :steps="[12,24,32]" :current="28"></progress-bar>
            <progress-bar :steps="[12,24,32]" :current="32"></progress-bar>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>`,
  props: ["user"],
});
