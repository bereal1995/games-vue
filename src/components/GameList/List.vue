<template>
  <div class="game-list-container">
    <b-table striped hover :items="items" :fields="fields">
      <template #cell(Options)>
          <b-form-select value="10" :options="options" v-on:change="onChangeOption">
          </b-form-select>
      </template>

      <template #cell(Create)>
        <b-button variant="primary" v-on:click="onClickCreate">
          <b-icon-controller></b-icon-controller>
        </b-button>
        <b-form-checkbox v-on:change="onClickPublicCheck">public</b-form-checkbox>
      </template>

      <template #cell(Join)>
        <b-dropdown variant="success">
          <template #button-content>
            <b-icon-controller></b-icon-controller>
            {{getGameList.length}}
          </template>
          <b-dropdown-item v-for="(item, index) in getGameList" :key="index">
            {{item}}
          </b-dropdown-item>
        </b-dropdown>
      </template>
    </b-table>
  </div>
</template>

<script>
export default {
  computed: {
    getGameList() {
      return []
    }
  },
  data() {
    return {
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
      console.log('option',option);
    },
    onClickCreate() {
      console.log('aaaa')
    },
    onClickPublicCheck(checked) {
      console.log('checked',checked);
    },
  },
}
</script>