<template>
  <v-app :theme="theme">
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
        :icon="theme === 'dark' ? 'mdi-weather-sunny' : 'mdi-weather-night'"
        @click="toggleTheme" />
      <v-btn
        :icon="infoDrawer ? 'mdi-close' : 'mdi-information'"
        @click="infoDrawer = !infoDrawer" />
      <v-btn
        :icon="userId ? 'mdi-account' : 'mdi-account-outline'"
        @click="openLogin" />
    </v-app-bar>
    <v-navigation-drawer
      width="240"
      class="pt-2"
      disable-route-watcher
      permanent
      mini-variant
      app>
      <v-tooltip
        v-for="route in navRoutes"
        :key="`route-link-${route.meta.id}`"
        right>
         <template #activator="{ props }">
          <v-list-item
            v-bind="props"
            :to="route.path">
            <template #prepend>
              <v-icon>{{ route.meta.icon }}</v-icon>
            </template>
            <v-list-item-title>
              {{ route.meta.title }}
            </v-list-item-title>
          </v-list-item>
        </template>
        <span>{{ route.meta.title }}</span>
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
    <login-dialog ref="loginDialog" />
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import { ref, toRef } from 'vue';
import { routes } from '@/router';

import LoginDialog from '@/components/Login.vue';

export default {
  name: 'App',
  components: {
    LoginDialog,
  },
  setup() {
    const theme = toRef(localStorage.getItem('adratcliff-pagetheme') || 'dark');
    const toggleTheme = () => {
      theme.value = theme.value === 'dark' ? 'light' : 'dark';
      localStorage.setItem('adratcliff-pagetheme', theme.value);
    };

    const navRoutes = routes
      .filter(route => !route.meta.disabled && route.meta.position)
      .sort((a, b) => a.meta.position - b.meta.position);

    const loginDialog = ref(null);
    const openLogin = () => loginDialog.value.openLogin();

    const token = localStorage.getItem('adratcliff-user-token');
    const userId = (token || '').slice(0, 64);

    return {
      navRoutes,
      infoDrawer: toRef(false),
      theme,
      toggleTheme,
      loginDialog,
      openLogin,
      userId,
    };
  },
};
</script>

<style lang="scss" scoped>
.info-card {
  height: calc(100% - 102px);
}
</style>