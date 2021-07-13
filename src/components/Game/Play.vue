<template>
  <div class="rps-button-container">
    <b-button variant="outline-secondary" value="R" v-on:click="onClickButton">
      <img src="@/assets/img/R.png" alt=""/>
    </b-button>
    <b-button variant="outline-secondary" value="P" v-on:click="onClickButton">
      <img src="@/assets/img/P.png" alt=""/>
    </b-button>
    <b-button variant="outline-secondary" value="S" v-on:click="onClickButton">
      <img src="@/assets/img/S.png" alt=""/>
    </b-button>
  </div>
</template>

<script>
  import {getItem} from "@/utlls/storageUtill";

  export default {
    props: {
      myKey: {
        default: null,
      }
    },
    methods: {
      onClickButton(e) {
        const rpsState = this.$store.state.rps.rpsState
        const rpsWho = rpsState.host === getItem('myUUID') ? 'host' : 'challenger';

        this.$store.dispatch('rpsUpdate', {
          key: this.myKey,
          data: e.target.value,
          path: `games/${rpsState.games.length - 1}/${rpsWho}`
        })
      }
    }
  }
</script>