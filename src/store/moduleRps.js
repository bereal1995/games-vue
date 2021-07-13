import {fireDatabase} from "@/lib/firebase";
import {getItem} from "@/utlls/storageUtill";

export const moduleRps = {
  state: {
    rpsState: {},
    rpsPublics: {}
  },
  mutations: {
    rpsPublicListen: (state, data) => {
      state.rpsPublics = data;
    },
    rpsListen: (state, data) => {
      state.rpsState = data;
    },
  },
  actions: {
    rpsCreate(thisStore, payload) {
      console.log('this.$fireDatabase',this.$fireDatabase);
      const key = fireDatabase.ref(`rockPaperScissors/`).push({
        host : getItem('myUUID'),
        createdAt: payload.createdAt,
        state : "waiting",
        howManyWins: payload.howManyWins,
        games: [{
          host: '',
          challenger: ''
        }],
        again: {
          host: '',
          challenger: ''
        }
      }).key;
      console.log('key',key);
      if(payload.public) {
        fireDatabase.ref(`rockPaperScissorsPublic/${key}`).update({
          key,
          host: getItem('myUUID'),
          createdAt: payload.createdAt,
        })
      }
      payload.router.push(payload.PATH_GAME_RPS + '/' + key);
    },
    rpsPublicListen(thisStore) {
      fireDatabase.ref(`rockPaperScissorsPublic/`).on('value', data => {
        console.log('rockPaperScissorsPublicListener');
        thisStore.commit('rpsPublicListen', data.val())
      });
    },
    rpsListen(thisStore, key) {
      fireDatabase.ref(`rockPaperScissors/${key}/`).on('value', data => {
        console.log('rockPaperScissorsListener');
        thisStore.commit('rpsListen', data.val())
      });
    },
    rpsUpdate(thisStore, payload){
      fireDatabase.ref(`rockPaperScissors/${payload.key}/${payload.path}`).set(payload.data);
    }
  }
}
