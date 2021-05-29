const db = firebase.firestore();

function percentCompletion(conquest) {
  return conquest.value / conquest.steps[conquest.steps.length - 1];
}
function isEndedConquest(conquest) {
  return percentCompletion(conquest) >= 1;
}

Vue.component("main-content", {
  template: /* tpl */ `<div class="main-content">
    <h1 class="scratched-title"><span class="yellow-text">Mes conquêtes</span></h1>

    <transition-group name="flip-list" tag="bars">
      <conquest-bar v-for="(conquest, index) in sortedConquests" :key="conquest.id"
        :conquest="conquest"
        :active="userData && userData.activeConquest === conquest.id"
        @activate="activateConquest(conquest)"
        @delete="deleteConquest(conquest)"
        @validate="(conquest) => validateConquest(conquest)"
      ></conquest-bar>
    </transition-group>
    
    <a :href="'/view.html#' + user.uid" rel="noopener" target="_blank" class="see-conquest">
      <g-button>Voir la conquête en cours</g-button>
    </a>
    <g-button @click="addConquest">Ajouter une conquête</g-button>
</div>`,
  props: ["user"],
  data() {
    return {
      active: 0,
      conquests: [],
      userData: {},
    };
  },
  computed: {
    sortedConquests() {
      const sortedConquest = [...this.conquests];

      return sortedConquest.sort((c1, c2) => {
        if (isEndedConquest(c1) && isEndedConquest(c2)) return 0;
        if (isEndedConquest(c1)) return 1;
        if (isEndedConquest(c2)) return -1;

        return percentCompletion(c2) - percentCompletion(c1);
      });
    },
  },
  methods: {
    addConquest() {
      db.collection(`users/${this.user.uid}/conquests`)
        .add({
          title: "Nouvel objectif",
          steps: [1, 2, 3, 4],
          value: 0,
          dirty: false,
        })
        .then((docRef) => {
          console.log("Document written with ID: ", docRef.id);
        })
        .catch((error) => {
          console.error("Error adding document: ", error);
        });
    },
    activateConquest(conquest) {
      db.doc(`users/${this.user.uid}`).set(
        {
          activeConquest: conquest.id,
          dirty: true,
        },
        { merge: true }
      );
    },
    validateConquest(conquest) {
      db.doc(`users/${this.user.uid}/conquests/${conquest.id}`).set(
        {
          ...conquest,
          dirty: true,
        },
        { merge: true }
      );
    },
    deleteConquest(conquest) {
      if (!confirm("Voulez-vous supprimer cet objectif ?")) return;
      db.doc(`users/${this.user.uid}/conquests/${conquest.id}`).delete();
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
