<template>
  <v-app>
    <v-app-bar
      absolute
      app>
      <v-app-bar-nav-icon
        icon="mdi-home"
        variant="text"
        to="/" />
      <v-app-bar-title text="AD Ratcliff" />
      <v-spacer />
      <v-btn
        :icon="infoDrawer ? 'mdi-close' : 'mdi-information'"
        @click="infoDrawer = !infoDrawer" />
    </v-app-bar>
    <v-navigation-drawer
      width="240"
      disable-route-watcher
      permanent
      mini-variant
      app>
      <v-tooltip
        v-for="route in navRoutes"
        :key="`route-link-${route.id}`"
        right>
         <template #activator="{ props }">
          <v-list-item
            v-bind="props"
            :to="route.path">
            <template #prepend>
              <v-icon>{{ route.icon }}</v-icon>
            </template>
            <v-list-item-title>
              {{ route.title }}
            </v-list-item-title>
          </v-list-item>
        </template>
        <span>{{ route.title }}</span>
      </v-tooltip>
    </v-navigation-drawer>
    <v-navigation-drawer
      v-model="infoDrawer"
      location="right"
      width="360">
      <v-card flat class="h-100">
        <v-card-title>Test</v-card-title>
        <v-divider />
        <v-card-text class="info-card">Random card text</v-card-text>
        <v-divider />
        <v-card-actions>
          <v-spacer />
          <v-btn
            size="small"
            text="Test Action"/>
        </v-card-actions>
      </v-card>
    </v-navigation-drawer>
    <v-main theme="dark">
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import { toRef } from 'vue';

const navRoutes = [
  { id: 'fitness',  title: 'Fitness Tracker', icon: 'mdi-run' },
  { id: 'menus',    title: 'Recipes',         icon: 'mdi-food-turkey' },
  { id: 'secret',   title: 'Secret Santa',    icon: 'mdi-gift', enabled: false },
  { id: 'rgb',      title: 'RGB Switcher',    icon: 'mdi-connection' },
  { id: 'images',   title: 'Quantizer',       icon: 'mdi-image' }, // Quantization
];

export default {
  name: 'App',
  setup() {
    return {
      navRoutes: navRoutes.filter(route => !('enabled' in route) || !!route.enabled),
      infoDrawer: toRef(false),
    };
  },
};
</script>

<style lang="scss" scoped>
.info-card {
  height: calc(100% - 102px);
}
</style>