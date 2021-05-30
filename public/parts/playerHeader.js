const db = firebase.firestore();

Vue.component("player-header", {
  template: /* tpl */ `<div class="player-header">
  <div class="player-header__left">
    <div class="player-header__basic">
      <strong class="player-header-name yellow-text">
        <template v-if="user">{{ user.displayName }}</template>
      </strong>
    </div>
  </div>
  <div class="player-header__right">
    <template v-if="user">
      <div class="player-header-logout">
        <button class="title yellow-text" @click="$emit('logout')">Déconnexion</button>
      </div>
      <div class="player-header-data">
        Objectifs <strong>{{completedConquests.length}}/{{conquests.length}}</strong>
      </div>
      <div class="player-header-data">Complétion <strong>{{conquestsCompletion}}%</strong></div>
    </template>
    <template v-else>
      <div class="player-header-logout">
        <button class="title yellow-text" @click="$emit('login')">Me connecter</button>
      </div>
    </template>
  </div>
</div>`,
  props: ["user"],
  data() {
    return {
      conquests: [],
    };
  },
  computed: {
    completedConquests() {
      return this.conquests.filter(
        (conquest) =>
          conquest.value >= conquest.steps[conquest.steps.length - 1]
      );
    },
    conquestsCompletion() {
      return (
        Math.floor(
          (this.completedConquests.length / this.conquests.length) * 100
        ) || 0
      );
    },
  },
  watch: {
    "user.uid": {
      immediate: true,
      handler(id) {
        if (id) {
          this.$bind("conquests", db.collection(`users/${id}/conquests`));
        }
      },
    },
  },
});
