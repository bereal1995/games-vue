<template>
  <div id="app">
    <Nav></Nav>
    <main>
      <Header></Header>
      <section class="contents">
        <router-view></router-view>
      </section>
    </main>
  </div>
</template>

<script>
import Header from './components/Header.vue'
import Nav from './components/Nav.vue'

export default {
  components: {
    Header,
    Nav,
  }
}
</script>