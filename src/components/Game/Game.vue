<template>
  <div>
    <Wait v-if="rpsState.state === 'waiting'"></Wait>
    <Play v-if="rpsState.state === 'play'"></Play>
    <Result v-if="rpsState.state === 'result'"></Result>
  </div>
</template>

<script>
import Wait from './Wait.vue'
import Play from './Play.vue'
import Result from './Result.vue'
import {getLastItem} from "@/utlls/urlUtill";

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
  mounted() {
    this.$store.dispatch('rpsListen', getLastItem(this.$route.params.id))
  },
}
</script>