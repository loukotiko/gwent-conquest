const params = new URLSearchParams(location.search);
const uid = params.get("u");

Vue.component("conquest-bar", {
  template: /* tpl */ `<form class="conquest-bar" @submit.prevent="() => {forceEditing = false; $emit('validate', localConquest)}">
  <div class="conquest-bar-actions-left" v-if="editable && self">
    <button class="conquest-bar-active" :class="{'conquest-bar-active--active': active}" @click="$emit('activate')"></button>
  </div>
  <div class="conquest-bar-title">
    <template v-if="editing">
      <input class="input-title" v-model="localConquest.title" />
    </template>
    <h2 class="yellow-text" v-else>{{localConquest.title}}</h2>
  </div>
  <div class="conquest-bar-progress">
    <template v-if="editing">
      <span class="input-value" v-for="(step, index) in steps" :key="step" :class="'input-value--' + step">
        <input :value="localConquest.steps[index]" @input="value => localConquest.steps[index] = +event.target.value" />
      </span>
      <span class="input-value input-value--current">
        <input v-model.number="localConquest.value" />
      </span>
    </template>
    <progress-bar v-else :steps="localConquest.steps" :value="localConquest.value"></progress-bar>
  </div>
  <div class="conquest-bar-actions-right" v-if="editable && self">
    <template v-if="editing">
      <button type="button" class="conquest-bar-small-button conquest-bar-delete" v-if="self" @click="$emit('delete')"></button>
      <button type="submit" class="conquest-bar-small-button conquest-bar-validate"></button>
    </template>
    <button type="button" class="conquest-bar-small-button conquest-bar-edit" v-else @click="forceEditing = true"></button>
  </div>
</div>`,
  props: ["conquest", "active", "self", "editable"],
  data() {
    return {
      forceEditing: false,
      steps: ["bronze", "silver", "gold", "gwent"],
      localConquest: null,
    };
  },
  computed: {
    editing() {
      return this.forceEditing || !this.localConquest.dirty;
    },
  },
  watch: {
    conquest: {
      immediate: true,
      handler(conquest) {
        this.localConquest = { ...conquest, id: conquest.id };
      },
    },
  },
});
