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
        Conquêtes <strong>12/103</strong>
      </div>
      <div class="player-header-data">Complétion <strong>14%</strong></div>
    </template>
    <template v-else>
      <div class="player-header-logout">
        <button class="title yellow-text" @click="$emit('login')">Me connecter</button>
      </div>
    </template>
  </div>
</div>`,
  props: ["user"],
});
