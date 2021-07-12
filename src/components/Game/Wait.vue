<template>
  <div>
    <div class="title">
      Wait a challenger
      <b-spinner type="grow" small/>
    </div>
    <b-input-group className="mb-3">
      <b-form-input
          aria-describedby="basic-addon2"
          ref="urlRef"
          :value="gameUrl"
          readOnly
      />
      <b-button
          variant="outline-secondary"
          id="button-addon2"
          v-on:click="onClickCopy"
      >
        Copy
      </b-button>
    </b-input-group>
  </div>
</template>

<script>
export default {
  data() {
    return {
      gameUrl: window.location.href
    }
  },
  methods: {
    onClickCopy() {
      this.$refs.urlRef.select();
      this.$refs.urlRef.setSelectionRange(0, 99999);
      document.execCommand("Copy");
    }
  }
}
</script>