<template>
  <v-container>
      <v-btn href="/" color="blue-darken-4" dark class="ml-auto ma-3" v-on="on">
        Lista de usuários
        <v-icon class="ml-2">fa-solid fa-house</v-icon>
      </v-btn>
      <v-btn href="/cadastrar" color="blue-darken-4" dark class="ml-auto ma-3" v-on="on">
        Cadastrar
        <v-icon class="ml-2">fa-solid fa-user-plus</v-icon>
      </v-btn>
    <router-view />
  </v-container>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #2196F3;
}
</style>
