const db = firebase.firestore();
const params = new URLSearchParams(location.search);
const viewUid = params.get("u");

Vue.component("create-overlay", {
  template: /* tpl */ `<div class="player-header">
  <div class="player-header__left">
    <div class="player-header__basic">
      <div>
        <h3 class="title green-text"> Créez un overlay de stream </h3>
        <div class="subtitle white-text"> Générez un lien pour votre objectif et ajoutez-le en tant que source Navigateur sur OBS. </div>
      </div>
    </div>
  </div>
  <div class="player-header__right">
    <div class="player-header-data">
      <label>
        Objectif :
        <select v-model="generated.conquest">
          <option :value="null">Objectif en cours (défaut)</option>
          <option :value="conquest.id" v-for="conquest in conquests">{{conquest.title}}</option>
        </select>
      </label>
    </div>
    <div class="player-header-data">
      <label>
        Avec badge :
        <select v-model="generated.badge">
          <option :value="1" selected>Oui (défaut)</option>
          <option :value="0">Non</option>
        </select>
      </label>
    </div>
    <div class="player-header-data">
      <label>
        Position :
        <select v-model="generated.position">
          <option value="c">Centré, sous la barre (défaut)</option>
          <option value="l">A gauche, sous la barre</option>
          <option value="r">A droite, sous la barre</option>
          <option value="a">Au-dessus de la barre, centré</option>
        </select>
      </label>
    </div>
    <div class="player-header-data red-text" v-if="!generated.conquest && userData && userData.activeConquest === -1">
      Aucun objectif en cours
    </div>
    <a v-else :href="generatedLink" rel="noopener" target="_blank" class="player-header-data green-text">
      Générer mon lien
    </a>
  </div>
</div>`,
  props: ["user"],
  data() {
    return {
      conquests: [],
      userData: null,
      generated: { conquest: null, badge: 1, position: "c" },
    };
  },
  computed: {
    generatedLink() {
      const link = new URL("/current.html", location.origin);
      link.searchParams.set("u", viewUid || this.user.uid);
      if (!!this.generated.conquest)
        link.searchParams.set("c", this.generated.conquest);
      if (!!this.generated.badge)
        link.searchParams.set("b", this.generated.badge);
      if (!!this.generated.position)
        link.searchParams.set("p", this.generated.position);

      return link;
    },
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
          this.$bind("userData", db.doc(`users/${id}`));
          this.$bind("conquests", db.collection(`users/${id}/conquests`));
        }
      },
    },
  },
});
