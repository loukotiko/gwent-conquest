Vue.component("progress-bar", {
  template: /* tpl */ `<div class="c-faction-bar c-faction-bar--gwent">
  <img
    :src="'/img/profile/bars/'+logoColor+'.png'"
    alt="GWENT"
    class="c-faction-bar__logo"
    :class="'c-faction-bar__logo--' + logoColor"
  />
  <div class="c-faction-bar__bar" data-max="1311" data-value="1296">
    <div v-for="(step, index) in steps" :key="index"
      class="stats_progress" :class="'stats_progress--' + stepColor(index)"
      :style="{ width: percentLength(index) + '%', zIndex: 10-index }"></div>
    <div class="stats_progress" :style="{ width: percentCurrentLength + '%', zIndex: 10 }"></div>
    <span :style="{ display: 'inline-block', textAlign: 'center', minWidth: '200px', width: percentCurrentLength + '%' }">
      <strong class="stats_count">{{current}}</strong> /
      <span class="stats_overall">{{steps[steps.length -1]}}</span>
    </span>
  </div>
</div>`,
  props: ["steps", "current"],
  computed: {
    logoColor() {
      return this.current != this.steps[this.steps.length - 1]
        ? "neutral"
        : "gwent";
    },
    percentCurrentLength() {
      return Math.max(
        0,
        Math.min(
          100,
          Math.round(
            (this.current / this.steps[this.steps.length - 1]) * 10000
          ) / 100
        )
      );
    },
  },
  methods: {
    percentLength(index) {
      return Math.max(
        0,
        Math.min(
          100,
          Math.round(
            (this.steps[index] / this.steps[this.steps.length - 1]) * 10000
          ) / 100
        )
      );
    },
    stepColor(index) {
      return ["neutral", "nilfgaard", "syndicate"].reverse()[3 - index - 1];
    },
  },
});
