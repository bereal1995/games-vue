<template>
  <div>
    <Wait v-if="rpsState.state === 'waiting'"></Wait>
    <Play v-if="rpsState.state === 'play'" :myKey="this.key"></Play>
    <Result v-if="rpsState.state === 'result'"></Result>
  </div>
</template>

<script>
import Wait from './Wait.vue'
import Play from './Play.vue'
import Result from './Result.vue'
import {getLastItem} from "@/utlls/urlUtill";
import {getItem} from "@/utlls/storageUtill";

export default {
  components: {
    Wait,
    Play,
    Result,
  },
  computed: {
    rpsState() {
      return this.$store.state.rps.rpsState
    },
  },
  data() {
    return {
      key: getLastItem(this.$route.params.id),
    }
  },
  mounted() {
    this.$store.dispatch('rpsListen', this.key)
  },
  updated() {
    const rpsState = this.$store.state.rps.rpsState;

    if (rpsState.state === 'waiting' && rpsState.host !== getItem('myUUID')) {
      rpsState.challenger = getItem('myUUID');
      rpsState.state = 'play';
      this.$store.dispatch('rpsUpdate', {
        key: this.key,
        data: rpsState,
        path: ''
      })
    }else if (rpsState.state === 'play' && rpsState.host !== getItem('myUUID')
        && rpsState.games[rpsState.games.length - 1].host
        && rpsState.games[rpsState.games.length - 1].challenger
    ) {
      this.$store.dispatch('rpsUpdate', {
        key: this.key,
        path: 'state',
        data: 'result',
      })
    }
  },
}
</script>