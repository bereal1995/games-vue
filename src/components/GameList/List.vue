<template>
  <div class="game-list-container">
    <b-table striped hover :items="items" :fields="fields">
      <template #cell(Options)>
          <b-form-select :value="howManyWins" :options="options" v-on:change="onChangeOption"></b-form-select>
      </template>

      <template #cell(Create)>
        <b-button variant="primary" v-on:click="onClickCreate">
          <b-icon-controller></b-icon-controller>
        </b-button>
        <b-form-checkbox v-on:change="onClickPublicCheck" :checked="gamePublic">public</b-form-checkbox>
      </template>

      <template #cell(Join)>
        <b-dropdown variant="success" right>
          <template #button-content>
            <b-icon-controller></b-icon-controller>
            {{Object.keys(rpsPublics).length}}
          </template>
          <b-dropdown-item
              v-for="(item, index) in Object.keys(rpsPublics)"
              :key="index"
              v-on:click="onClickRpsRoom(item)"
          >
            {{item}}
          </b-dropdown-item>
        </b-dropdown>
      </template>
    </b-table>
  </div>
</template>

<script>
import {getItem, setItem} from "@/utlls/storageUtill";

export default {
  computed: {
    rpsPublics() {
      return this.$store.state.rps.rpsPublics
    },
  },
  mounted() {
    if(!getItem('myUUID')) {
      setItem('myUUID', this.$uuid.v1());
    }
    this.$store.dispatch('rpsPublicListen')
  },
  data() {
    return {
      howManyWins: 10,
      gamePublic: true,
      options: Array.from({length: 10}, (v, i) => i+1),
      fields: [
        {
          key: 'Name',
          label: 'Game name'
        },
        {
          key: 'Options',
          label: 'Game Option'
        },
        {
          key: 'Create',
          label: 'Game Create'
        },
        {
          key: 'Join',
          label: 'Game Join'
        }
      ],
      items: [
        { Name: 'Rock Paper Scissors'},
      ]
    }
  },
  methods: {
    onChangeOption(option) {
      this.howManyWins = option;
    },
    onClickCreate() {
      this.$store.dispatch('rpsCreate', {
        howManyWins: this.howManyWins,
        public: this.gamePublic,
        createdAt: this.$moment(new Date()).format(),
        router: this.$router,
        PATH_GAME_RPS: this.$constants.path.PATH_GAME_RPS
      })
    },
    onClickPublicCheck(checked) {
      this.gamePublic = checked;
    },
    onClickRpsRoom(item) {
      this.$router.push(this.$constants.path.PATH_GAME_RPS + '/' + item);
    },
  },
}
</script>