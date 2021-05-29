Vue.component("conquest-bar", {
  template: /* tpl */ `<div class="conquest-bar">
  <div class="conquest-bar-actions">
    <button class="conquest-bar-active" :class="{'conquest-bar-active--active': active}" @click="$emit('activate')"></button>
  </div>
  <div class="conquest-bar-title">
    <template v-if="editing">
      <input class="input-title" v-model="conquest.title" />
    </template>
    <h2 class="yellow-text" v-else>{{conquest.title}}</h2>
  </div>
  <div class="conquest-bar-progress">
    <template v-if="editing">
      <span class="input-value" v-for="(step, index) in steps" :key="step" :class="'input-value--' + step">
        <input :value="conquest.steps[index]" @input.number="value => conquest.steps[index] = event.target.value" />
      </span>
      <span class="input-value input-value--current">
        <input v-model.number="conquest.value" />
      </span>
    </template>
    <progress-bar v-else :steps="conquest.steps" :value="conquest.value"></progress-bar>
  </div>
  <div class="conquest-bar-actions">
    <button class="conquest-bar-small-button conquest-bar-validate" v-if="editing" @click="editing = false"></button>
    <button class="conquest-bar-small-button conquest-bar-edit" v-else @click="editing = true"></button>
  </div>
</div>`,
  props: ["conquest", "active"],
  data() {
    return {
      editing: false,
      steps: ["bronze", "silver", "gold", "gwent"],
    };
  },
});
