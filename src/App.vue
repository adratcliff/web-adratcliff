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
    <v-main theme="dark">
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
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
    };
  },
};
</script>
