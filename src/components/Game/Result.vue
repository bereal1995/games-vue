<template>
  <div>
    <div class="result-rps-images">
      <b-button :variant="getGameResult(this.rpsState.games[this.rpsState.games.length - 1], this.rpsWho).host" disabled>
        <img
            :src="findImage(this.rpsState.games[this.rpsState.games.length - 1].host)"
            alt=""
        />
      </b-button>
      <b-button :variant="getGameResult(this.rpsState.games[this.rpsState.games.length - 1], this.rpsWho).challenger" disabled>
        <img
            :src="findImage(this.rpsState.games[this.rpsState.games.length - 1].challenger)"
            alt=""
        />
      </b-button>
    </div>
    <div class="result-table">
      <b-table-simple>
        <b-tbody>
          <b-tr>
            <b-td>wins</b-td>
            <b-td v-if="this.rpsWho === 'host'">
              {{getGamesResult(this.rpsState.games).host.win + ` / ${this.rpsState.howManyWins}`}}
            </b-td>
            <b-td v-else>
              {{getGamesResult(this.rpsState.games).challenger.win + ` / ${this.rpsState.howManyWins}`}}
            </b-td>
          </b-tr>
          <b-tr>
            <b-td>Loosses</b-td>
            <b-td v-if="this.rpsWho === 'host'">
              {{getGamesResult(this.rpsState.games).host.loose}}
            </b-td>
            <b-td v-else>
              {{getGamesResult(this.rpsState.games).challenger.loose}}
            </b-td>
          </b-tr>
          <b-tr>
            <b-td>Draws</b-td>
            <b-td v-if="this.rpsWho === 'host'">
              {{getGamesResult(this.rpsState.games).host.draw}}
            </b-td>
            <b-td v-else>
              {{getGamesResult(this.rpsState.games).challenger.draw}}
            </b-td>
          </b-tr>
        </b-tbody>
      </b-table-simple>
    </div>
    <div
        class="result-box"
        v-if="(getGamesResult(this.rpsState.games).host.win === this.rpsState.howManyWins ||
        getGamesResult(this.rpsState.games).challenger.win === this.rpsState.howManyWins)"
    >
      <p>
        {{
          (getGamesResult(this.rpsState.games).host.win === this.rpsState.howManyWins && this.rpsWho === 'host')
              ? 'winner'
              : 'looser'
        }}
      </p>
    </div>
    <div class="result-box" v-else>
      <b-button v-on:click="onClickAgain" variant="primary">Again</b-button>
    </div>
  </div>
</template>

<script>
  import R from "@/assets/img/R.png";
  import P from "@/assets/img/P.png";
  import S from "@/assets/img/S.png";
  import {getItem} from "@/utlls/storageUtill";

  export default {
    props: {
      myKey: {
        default: null,
      }
    },
    data() {
      return {
        rpsState: this.$store.state.rps.rpsState,
        rpsWho: this.$store.state.rps.rpsState.host === getItem('myUUID') ? 'host' : 'challenger',
      }
    },
    methods: {
      onClickAgain() {
        this.$store.dispatch('rpsUpdate', {
          key: this.myKey,
          path: `again/${this.rpsWho}`,
          data: true,
        })
      },
      findImage(item) {
        if (item === "R") {
          return R
        } else if (item === "P") {
          return P
        } else {
          return S
        }
      },
      getChoice(item) {
        if(item === 'S')
          return 0;
        else if(item === 'R')
          return 1;
        else
          return -1;
      },
      getGamesResult(games) {
        const host = {
          win: 0,
          loose: 0,
          draw: 0,
        }
        const challenger = {
          win: 0,
          loose: 0,
          draw: 0,
        }
        for (let i = 0; i < games.length; i++) {
          if (this.getChoice(games[i].host) - this.getChoice(games[i].challenger) === 0) {
            host.draw += 1;
            challenger.draw += 1;
          } else if (this.getChoice(games[i].host) - this.getChoice(games[i].challenger) === 1
              || this.getChoice(games[i].host) - this.getChoice(games[i].challenger) === -2
          ) {
            host.win += 1;
            challenger.loose += 1;
          } else {
            host.loose += 1;
            challenger.win += 1;
          }
        }

        return {host, challenger}
      },
      getGameResult(game, rpsWho) {
        let host = 'outline-secondary ';
        let challenger = 'outline-secondary';

        if (this.getChoice(game.host) - this.getChoice(game.challenger) === 0) {
          return {host, challenger}
        } else if (this.getChoice(game.host) - this.getChoice(game.challenger) === 1
            || this.getChoice(game.host) - this.getChoice(game.challenger) === -2
        ) {
          rpsWho === 'host' ? host = 'primary' : challenger = 'danger';
        } else {
          rpsWho === 'host' ? host = 'danger' : challenger = 'primary';
        }

        return {host, challenger}
      },
    }
  }
</script>