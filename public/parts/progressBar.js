Vue.component("progress-bar", {
  template: /* tpl */ `<div class="progress-bar">
  <img
    :src="'/img/profile/bars/' + logoColor + '.png'"
    alt="GWENT"
    class="progress-bar__logo"
  />
  <div class="progress-bar__bar" data-max="1311" data-value="1296">
    <div v-for="(step, index) in filteredSteps" :key="index"
      class="progress progress-placeholder" :class="'progress--' + stepColor(index)"
      :style="{ width: percentLength(index) + '%', zIndex: 10-index }"></div>
    <div v-if="value"
      class="progress" :style="{ width: percentCurrentLength + '%', zIndex: 10 }"
      :class="{['progress--' + logoColor]: true, 'progress-placeholder': currentStep === -1}"></div>
    <span class="progress_data" :style="{width: percentCurrentLength + '%'}">
      <strong class="progress_count">{{value}}</strong> /
      <span class="progress_overall">{{filteredSteps[filteredSteps.length -1]}}</span>
    </span>
  </div>
</div>`,
  props: ["steps", "value"],
  computed: {
    filteredSteps() {
      return this.steps.filter((step) => !!+step);
    },
    currentStep() {
      return this.filteredSteps.reduce(
        (step, currentStep, currentIndex) =>
          this.value >= currentStep ? currentIndex : step,
        -1
      );
    },
    logoColor() {
      if (this.currentStep === -1) return "empty";
      return this.value != this.filteredSteps[this.filteredSteps.length - 1]
        ? this.stepColor(this.currentStep) || this.stepColor(0, true)
        : "gwent";
    },
    percentCurrentLength() {
      return Math.max(
        0,
        Math.min(
          100,
          Math.round(
            (this.value / this.filteredSteps[this.filteredSteps.length - 1]) *
              10000
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
            (this.filteredSteps[index] /
              this.filteredSteps[this.filteredSteps.length - 1]) *
              10000
          ) / 100
        )
      );
    },
    stepColor(index, previous) {
      if (index === -1) return "";
      return ["bronze", "silver", "gold", "gwent"].reverse()[
        this.filteredSteps.length - index - 1
      ];
    },
  },
});
