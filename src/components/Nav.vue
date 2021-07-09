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
      <b-nav-item :active="$route.name.includes('inGame')">
        <h2>
          <b-icon-controller></b-icon-controller>
        </h2>
      </b-nav-item>
    </b-nav>
  </nav>
</template>

<script>
export default {

}
</script>