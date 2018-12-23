<template>
  <v-app>
    <app-navigation></app-navigation>

    <v-content transition="slide-x-transition">
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
// @ is an alias to /src
import AppNavigation from '@/components/AppNavigation.vue';

export default {
  name: 'App',
  components: { AppNavigation }
};
</script>

<style>
</style>
