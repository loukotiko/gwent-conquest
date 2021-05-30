const params = new URLSearchParams(location.search);
const uid = params.get("u");

const db = firebase.firestore();

function percentCompletion(conquest) {
  return conquest.value / conquest.steps[conquest.steps.length - 1];
}
function isEndedConquest(conquest) {
  return percentCompletion(conquest) >= 1;
}

Vue.component("main-content", {
  template: /* tpl */ `<div class="main-content">
    <h2 class="scratched-title"><span class="yellow-text">
      <template v-if="self">Mes objectifs</template>
      <template v-else>{{userData.displayName}}</template>
    </span></h2>

    <div class="top-left-actions" v-if="self">
      <button class="disactive-button" @click="disactivateConquest">
        <span class="conquest-bar-active" :class="{'conquest-bar-active--active': !userData || userData.activeConquest === -1}"></span>
        <span class="title yellow-text">
          Désactiver l'objectif en cours
        </span>
      </button>
    </div>

    <div class="top-right-actions">
    </div>

    <transition-group name="flip-list" tag="bars">
      <conquest-bar v-for="(conquest, index) in sortedConquests" :key="conquest.id"
        :self="self"
        :editable="editable"
        :conquest="conquest"
        :active="userData && userData.activeConquest === conquest.id"
        @activate="activateConquest(conquest)"
        @delete="deleteConquest(conquest)"
        @validate="(conquest) => validateConquest(conquest)"
      ></conquest-bar>
    </transition-group>
    <div v-if="!sortedConquests.length" class="loading">
      Chargement des objectifs...
    </div>
    
    <div class="actions-bottom" v-if="self">
      <g-button @click="addConquest">Ajouter un objectif</g-button>
      <a :href="'/?u=' + uid" rel="noopener" target="_blank" class="share-conquest">
        <g-button>Partager les objectifs</g-button>
      </a>
    </div>
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
    editable() {
      return this.user;
    },
    self() {
      return this.user && (uid === this.user.uid || !uid);
    },
    uid() {
      return uid || (this.user && this.user.uid);
    },
    sortedConquests() {
      const sortedConquest = [...this.conquests];

      return sortedConquest.sort((c1, c2) => {
        if (isEndedConquest(c1) && isEndedConquest(c2)) return 0;
        if (isEndedConquest(c1)) return 1;
        if (isEndedConquest(c2)) return -1;

        if (c2.dirty === false && c1.dirty === false) return 0;
        if (c1.dirty === false) return 1;
        if (c2.dirty === false) return -1;

        if (this.userData && this.userData.activeConquest === c1.id) return -1;
        if (this.userData && this.userData.activeConquest === c2.id) return 1;

        return percentCompletion(c2) - percentCompletion(c1);
      });
    },
  },
  methods: {
    addConquest() {
      if (!this.self) return;
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
    disactivateConquest() {
      if (!this.self) return;
      db.doc(`users/${this.user.uid}`).set(
        {
          activeConquest: -1,
        },
        { merge: true }
      );
    },
    activateConquest(conquest) {
      if (!this.self) return;
      db.doc(`users/${this.user.uid}`).set(
        {
          activeConquest: conquest.id,
          dirty: true,
        },
        { merge: true }
      );
    },
    validateConquest(conquest) {
      if (this.self) {
        db.doc(`users/${this.user.uid}/conquests/${conquest.id}`).set(
          {
            ...conquest,
            dirty: true,
          },
          { merge: true }
        );
      } else {
        db.doc(
          `users/${uid}/conquests/${conquest.id}/participants/${this.user.uid}`
        ).set(
          {
            ...conquest,
            dirty: true,
          },
          { merge: true }
        );
      }
    },
    deleteConquest(conquest) {
      if (!this.self) return;
      if (!confirm("Voulez-vous supprimer cet objectif ?")) return;
      db.doc(`users/${this.user.uid}/conquests/${conquest.id}`).delete();
    },
  },
  watch: {
    uid: {
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
