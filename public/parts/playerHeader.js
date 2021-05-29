const template = /* tpl */ `
  <div class="l-player-details">
    <div class="l-player-details__left">
      <div class="l-player-details__basic">
        <strong class="l-player-details__name">
          <template v-if="user">{{ user.displayName }}</template>
          <template v-else>
            <button @click="$emit('login')">Me connecter</button>
          </template>
        </strong>
      </div>
    </div>
    <div class="l-player-details__table l-player-details__table--single" v-if="user">
      <div class="l-player-details__table-ladder">
          <span>Challenges</span>
      </div>
      <div class="l-player-details__table-position">
        Réussis : <strong>12</strong>
      </div>
      <div class="l-player-details__table-mmr">Reste : <strong>9</strong></div>
    </div>
  </div>
`;

export default Vue.component("player-header", {
  template,
  props: ["user"],
});
