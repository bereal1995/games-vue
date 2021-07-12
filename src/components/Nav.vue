<template>
  <nav>
    <b-nav
        defaultActiveKey="/"
        className="flex-column"
        activeKey={location.pathname}
    >
      <b-nav-item to="/" :active="$route.name === 'Home'">
        <h2>
          <b-icon-joystick></b-icon-joystick>
        </h2>
      </b-nav-item>
      <b-nav-item to="/list" :active="$route.name === 'List'">
        <h2>
          <b-icon-card-list></b-icon-card-list>
        </h2>
      </b-nav-item>
      <b-nav-item :active="$route.name === 'Game'" v-on:click="onClickGame()">
        <h2>
          <b-icon-controller></b-icon-controller>
        </h2>
      </b-nav-item>
    </b-nav>
  </nav>
</template>

<script>
import {getItem, setItem} from "@/utlls/storageUtill";

export default {
  methods: {
    onClickGame() {
      const firstKey = Object.keys(this.$store.state.rps.rpsPublics)[0];
      const firstData = this.$store.state.rps.rpsPublics[firstKey];

      if (getItem('game')) {
        this.$router.push(this.$constants.path.PATH_GAME_RPS + '/' + getItem('game').key);
      } else if (firstData) {
        setItem('game', {
          name: 'rockPaperScissors',
          key: firstData.key
        });

        this.$router.push(this.$constants.path.PATH_GAME_RPS + '/' + getItem('game').key);
      } else {
        alert('no play game');
      }
    }
  }
}
</script>